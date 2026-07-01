import { createAdminClient } from "@/app/lib/supabase/server";
import { sendEmail } from "@/app/lib/email/send";
import { getSiteUrl } from "@/app/lib/email/client";
import type { Json } from "@/app/lib/supabase/types";

/**
 * Alerting module.
 *
 * Fans alerts out to Discord (webhook embed) and email (Resend). Both channels
 * are best-effort: a failure in one never blocks the other and nothing here ever
 * throws, so callers (the uptime cron) can fire-and-forget.
 *
 * State transitions are tracked in the `alert_state` table (keyed by alert_key)
 * so we only notify on real edges (up<->down<->degraded) and can damp flapping.
 *
 * Env vars consumed:
 *   DISCORD_ALERT_WEBHOOK_URL  Discord incoming webhook; unset = Discord skipped.
 *   ALERT_EMAIL_TO             Recipient(s), comma-separated; unset = email skipped.
 *   ALERT_MIN_INTERVAL_SEC     Flap-damping window in seconds (default 300).
 *   LOG_SPIKE_WINDOW_MIN       Error-spike lookback window in minutes (default 10).
 *   LOG_SPIKE_THRESHOLD        Error count that trips a spike alert (default 10).
 */

export type UptimeStatus = "up" | "down" | "degraded";

type AlertSeverity = "critical" | "warning" | "recovery";

const DISCORD_COLORS: Record<AlertSeverity, number> = {
  critical: 0xdc2626, // red
  warning: 0xf59e0b, // amber
  recovery: 0x16a34a, // green
};

/** POST a single embed to the Discord webhook. Never throws. */
async function sendDiscord(payload: {
  title: string;
  description: string;
  severity: AlertSeverity;
}): Promise<void> {
  const webhook = process.env.DISCORD_ALERT_WEBHOOK_URL;
  if (!webhook) {
    console.warn(
      "[alerts] DISCORD_ALERT_WEBHOOK_URL not set; skipping Discord alert."
    );
    return;
  }
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: payload.title,
            description: payload.description,
            color: DISCORD_COLORS[payload.severity],
          },
        ],
      }),
      signal: AbortSignal.timeout(10000),
    });
  } catch (err) {
    console.error(
      "[alerts] Discord webhook failed:",
      err instanceof Error ? err.message : err
    );
  }
}

/** Send the alert email via Resend. Never throws. */
async function sendAlertEmail(
  subject: string,
  html: string,
  text: string
): Promise<void> {
  const to = process.env.ALERT_EMAIL_TO?.trim();
  if (!to) {
    console.warn("[alerts] ALERT_EMAIL_TO not set; skipping alert email.");
    return;
  }
  try {
    const result = await sendEmail({ to, subject, html, text });
    if (!result.ok) {
      console.error("[alerts] Alert email failed:", result.error);
    }
  } catch (err) {
    console.error(
      "[alerts] Alert email threw:",
      err instanceof Error ? err.message : err
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Fire an alert on every channel. Uses Promise.allSettled so a failure in one
 * channel never blocks the other. Never throws.
 */
async function dispatchAlert(alert: {
  alertKey: string;
  title: string;
  description: string;
  severity: AlertSeverity;
}): Promise<void> {
  const subject = `[${alert.severity.toUpperCase()}] ${alert.title}`;
  const siteUrl = getSiteUrl();
  const html =
    `<div style="font-family:system-ui,-apple-system,sans-serif;color:#111827">` +
    `<h2 style="margin:0 0 8px">${escapeHtml(alert.title)}</h2>` +
    `<p style="white-space:pre-wrap;margin:0 0 12px;font-size:14px">${escapeHtml(
      alert.description
    )}</p>` +
    `<p style="color:#6b7280;font-size:12px;margin:0">Alert key: ${escapeHtml(
      alert.alertKey
    )} &middot; <a href="${siteUrl}">${siteUrl}</a></p>` +
    `</div>`;
  const text = `${alert.title}\n\n${alert.description}\n\nAlert key: ${alert.alertKey}\n${siteUrl}`;

  await Promise.allSettled([
    sendDiscord({
      title: alert.title,
      description: alert.description,
      severity: alert.severity,
    }),
    sendAlertEmail(subject, html, text),
  ]);
}

/** Map a status to the severity it carries when we transition INTO it. */
function severityForStatus(newStatus: UptimeStatus): AlertSeverity {
  // Transitioning to up is always a recovery; to down is critical; degraded is a
  // warning. The more specific to-up / to-down rules take precedence over the
  // generic "to/from degraded = warning" case, which is exactly what we want.
  if (newStatus === "down") return "critical";
  if (newStatus === "up") return "recovery";
  return "warning";
}

/**
 * Evaluate an uptime status transition for one service and notify on real edges.
 * Persists the latest detail to alert_state regardless of whether we notify.
 * Never throws.
 */
export async function evaluateUptimeTransition(
  service: { key: string; name: string },
  newStatus: UptimeStatus,
  detail: {
    latency_ms?: number | null;
    status_code?: number | null;
    error?: string | null;
  }
): Promise<void> {
  try {
    const admin = await createAdminClient();
    const alertKey = `uptime:${service.key}`;
    const nowIso = new Date().toISOString();
    const lastValue = detail as Json;

    const { data: row } = await admin
      .from("alert_state")
      .select("*")
      .eq("alert_key", alertKey)
      .maybeSingle();

    const prior = row?.state ?? null;

    // No transition: just refresh the recorded detail, never notify.
    if (prior === newStatus) {
      await admin.from("alert_state").upsert(
        {
          alert_key: alertKey,
          state: newStatus,
          last_value: lastValue,
          updated_at: nowIso,
        },
        { onConflict: "alert_key" }
      );
      return;
    }

    const severity = severityForStatus(newStatus);
    let notify = true;

    // First-ever observation that is healthy: record the baseline silently. We
    // don't want a notification storm of "service is up" on the first cron run.
    if (prior === null && newStatus === "up") {
      notify = false;
    }

    // Flap damping: if we notified very recently, swallow the notification (but
    // always let recoveries through so an "all clear" is never suppressed).
    if (notify && row && severity !== "recovery" && row.last_notified_at) {
      const minIntervalSec =
        Number(process.env.ALERT_MIN_INTERVAL_SEC ?? 300) || 300;
      const elapsedMs = Date.now() - new Date(row.last_notified_at).getTime();
      if (elapsedMs < minIntervalSec * 1000) {
        notify = false;
      }
    }

    const title = `${service.name} is ${newStatus.toUpperCase()}`;
    const parts: string[] = [
      `Service "${service.name}" (${service.key}) changed from ${
        prior ?? "unknown"
      } to ${newStatus}.`,
    ];
    if (detail.latency_ms != null) {
      parts.push(`Latency: ${Math.round(detail.latency_ms)}ms.`);
    }
    if (detail.status_code != null) {
      parts.push(`HTTP status: ${detail.status_code}.`);
    }
    if (detail.error) {
      parts.push(`Error: ${detail.error}`);
    }
    const description = parts.join(" ");

    // Build the upsert payload. We always advance `since` because this branch
    // only runs on a real transition. `last_notified_at` is only set when we
    // actually notify; otherwise it is omitted so the prior value is preserved
    // on update (and stays null on first insert).
    const payload: {
      alert_key: string;
      state: string;
      since: string;
      last_value: Json;
      updated_at: string;
      last_notified_at?: string;
    } = {
      alert_key: alertKey,
      state: newStatus,
      since: nowIso,
      last_value: lastValue,
      updated_at: nowIso,
    };
    if (notify) {
      payload.last_notified_at = nowIso;
    }

    await admin
      .from("alert_state")
      .upsert(payload, { onConflict: "alert_key" });

    if (notify) {
      await dispatchAlert({ alertKey, title, description, severity });
    }
  } catch (err) {
    console.error(
      `[alerts] evaluateUptimeTransition failed for ${service.key}:`,
      err instanceof Error ? err.message : err
    );
  }
}

/**
 * Scan recent system_logs for error/fatal spikes per service and alert when a
 * service crosses the threshold. Uses hysteresis (clears at half the threshold)
 * so we don't flap between spiking/ok. Never throws.
 */
export async function evaluateLogSpikes(): Promise<void> {
  try {
    const admin = await createAdminClient();
    const windowMin = Number(process.env.LOG_SPIKE_WINDOW_MIN ?? 10) || 10;
    const threshold = Number(process.env.LOG_SPIKE_THRESHOLD ?? 10) || 10;
    const windowStartIso = new Date(
      Date.now() - windowMin * 60_000
    ).toISOString();

    // Find which services logged any error/fatal in the window, then dedupe.
    const { data: rows, error } = await admin
      .from("system_logs")
      .select("service_key")
      .in("level", ["error", "fatal"])
      .gte("created_at", windowStartIso);
    if (error || !rows) {
      if (error) console.error("[alerts] log spike scan failed:", error.message);
      return;
    }

    const serviceKeys = Array.from(new Set(rows.map((r) => r.service_key)));

    for (const serviceKey of serviceKeys) {
      try {
        const { count } = await admin
          .from("system_logs")
          .select("*", { count: "exact", head: true })
          .eq("service_key", serviceKey)
          .in("level", ["error", "fatal"])
          .gte("created_at", windowStartIso);
        const errorCount = count ?? 0;

        const alertKey = `logspike:${serviceKey}`;
        const { data: row } = await admin
          .from("alert_state")
          .select("*")
          .eq("alert_key", alertKey)
          .maybeSingle();
        const prior = row?.state ?? null;
        const nowIso = new Date().toISOString();
        const lastValue: Json = { count: errorCount, window_min: windowMin };

        if (errorCount >= threshold && prior !== "spiking") {
          // New spike.
          await admin.from("alert_state").upsert(
            {
              alert_key: alertKey,
              state: "spiking",
              since: nowIso,
              last_value: lastValue,
              last_notified_at: nowIso,
              updated_at: nowIso,
            },
            { onConflict: "alert_key" }
          );
          await dispatchAlert({
            alertKey,
            title: `Error spike: ${serviceKey}`,
            description: `${errorCount} error/fatal logs from "${serviceKey}" in the last ${windowMin}m (threshold ${threshold}).`,
            severity: "warning",
          });
        } else if (errorCount < threshold / 2 && prior === "spiking") {
          // Hysteresis: errors fell well below the threshold; clear the spike.
          await admin.from("alert_state").upsert(
            {
              alert_key: alertKey,
              state: "ok",
              since: nowIso,
              last_value: lastValue,
              last_notified_at: nowIso,
              updated_at: nowIso,
            },
            { onConflict: "alert_key" }
          );
          await dispatchAlert({
            alertKey,
            title: `Error spike resolved: ${serviceKey}`,
            description: `Error/fatal logs from "${serviceKey}" dropped to ${errorCount} in the last ${windowMin}m.`,
            severity: "recovery",
          });
        } else if (row) {
          // No state change; just refresh the recorded count.
          await admin.from("alert_state").upsert(
            {
              alert_key: alertKey,
              state: prior ?? "ok",
              last_value: lastValue,
              updated_at: nowIso,
            },
            { onConflict: "alert_key" }
          );
        }
      } catch (err) {
        console.error(
          `[alerts] log spike eval failed for ${serviceKey}:`,
          err instanceof Error ? err.message : err
        );
      }
    }
  } catch (err) {
    console.error(
      "[alerts] evaluateLogSpikes failed:",
      err instanceof Error ? err.message : err
    );
  }
}
