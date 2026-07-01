import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/app/lib/supabase/server";
import {
  evaluateUptimeTransition,
  evaluateLogSpikes,
  type UptimeStatus,
} from "@/app/lib/alerts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cron endpoint: probes every enabled monitored_service, records an uptime_check
 * row, and routes status transitions through the alerting module. Also runs the
 * log-spike detector and prunes uptime_checks older than 30 days.
 *
 * Auth mirrors /api/cron/publish-scheduled: requires CRON_SECRET and an
 * `Authorization: Bearer <CRON_SECRET>` header.
 *
 * Trigger: Vercel Hobby cannot run sub-daily crons, so this is NOT in
 * vercel.json. Drive it every ~5 min from an external scheduler that sends the
 * bearer, e.g. an always-on box cron:
 *   *\/5 * * * * curl -fsS -H "Authorization: Bearer $CRON_SECRET" \
 *     https://tableturnerr.com/api/cron/uptime-check >/dev/null
 * or a free hosted scheduler (cron-job.org) with the same header. On Vercel
 * Pro, re-add `{ "path": "/api/cron/uptime-check", "schedule": "*\/5 * * * *" }`
 * to vercel.json and drop the external trigger.
 */

const FETCH_TIMEOUT_MS = 10_000;
const RETENTION_DAYS = 30;

interface CheckResult {
  status: UptimeStatus;
  status_code: number | null;
  latency_ms: number | null;
  error: string | null;
}

/** Probe an HTTP service by GETting its health_url. */
async function checkHttp(service: {
  health_url: string | null;
  degraded_latency_ms: number;
}): Promise<CheckResult> {
  if (!service.health_url) {
    return {
      status: "down",
      status_code: null,
      latency_ms: null,
      error: "No health_url configured",
    };
  }

  const start = performance.now();
  try {
    const res = await fetch(service.health_url, {
      method: "GET",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      redirect: "manual",
    });
    const latency = Math.round(performance.now() - start);

    // With redirect:"manual" a 3xx surfaces as an opaque redirect (status 0).
    // The host still responded, so treat it as reachable. Anything <400 is up.
    const isOpaqueRedirect = res.type === "opaqueredirect";
    const code = isOpaqueRedirect ? null : res.status;
    const responded =
      isOpaqueRedirect || (res.status >= 200 && res.status < 400);

    if (responded) {
      const status: UptimeStatus =
        latency <= service.degraded_latency_ms ? "up" : "degraded";
      return { status, status_code: code, latency_ms: latency, error: null };
    }

    return {
      status: "down",
      status_code: code,
      latency_ms: latency,
      error: `HTTP ${res.status}`,
    };
  } catch (err) {
    const latency = Math.round(performance.now() - start);
    let message: string;
    if (err instanceof Error) {
      message =
        err.name === "TimeoutError" || err.name === "AbortError"
          ? `Timed out after ${FETCH_TIMEOUT_MS}ms`
          : err.message;
    } else {
      message = String(err);
    }
    return { status: "down", status_code: null, latency_ms: latency, error: message };
  }
}

/** Probe a push service by inspecting its latest heartbeat. */
async function checkPush(
  admin: Awaited<ReturnType<typeof createAdminClient>>,
  service: { id: string; expected_interval_seconds: number | null }
): Promise<CheckResult> {
  const { data: hb } = await admin
    .from("service_heartbeats")
    .select("last_beat_at, status")
    .eq("service_id", service.id)
    .maybeSingle();

  if (!hb) {
    return {
      status: "down",
      status_code: null,
      latency_ms: null,
      error: "No heartbeat recorded",
    };
  }

  const intervalSec = service.expected_interval_seconds ?? 0;
  const ageMs = Date.now() - new Date(hb.last_beat_at).getTime();
  if (intervalSec > 0 && ageMs > intervalSec * 1000) {
    return {
      status: "down",
      status_code: null,
      latency_ms: null,
      error: `Last heartbeat ${Math.round(
        ageMs / 1000
      )}s ago (expected within ${intervalSec}s)`,
    };
  }

  // Map the self-reported status: explicit down/degraded honoured, else up.
  const selfStatus = (hb.status ?? "").toLowerCase();
  const status: UptimeStatus =
    selfStatus === "down"
      ? "down"
      : selfStatus === "degraded"
        ? "degraded"
        : "up";
  return { status, status_code: null, latency_ms: null, error: null };
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 503 }
    );
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = await createAdminClient();

  const { data: services, error } = await admin
    .from("monitored_services")
    .select("*")
    .eq("enabled", true);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const list = services ?? [];
  const nowIso = new Date().toISOString();

  // Each service is isolated in its own settled promise so a single failure
  // never aborts the whole run.
  const settled = await Promise.allSettled(
    list.map(async (service) => {
      const result =
        service.kind === "push"
          ? await checkPush(admin, service)
          : await checkHttp(service);

      // Record the observation (best-effort; insert errors are non-fatal).
      const { error: insErr } = await admin.from("uptime_checks").insert({
        service_id: service.id,
        service_key: service.key,
        status: result.status,
        status_code: result.status_code,
        latency_ms: result.latency_ms,
        error: result.error,
        checked_at: nowIso,
      });
      if (insErr) {
        console.error(
          `[uptime-check] failed to record check for ${service.key}:`,
          insErr.message
        );
      }

      // Route any status transition through the alerting module (never throws).
      await evaluateUptimeTransition(
        { key: service.key, name: service.name },
        result.status,
        {
          latency_ms: result.latency_ms,
          status_code: result.status_code,
          error: result.error,
        }
      );

      return {
        key: service.key,
        status: result.status,
        latency_ms: result.latency_ms,
      };
    })
  );

  const results = settled
    .filter(
      (
        s
      ): s is PromiseFulfilledResult<{
        key: string;
        status: UptimeStatus;
        latency_ms: number | null;
      }> => s.status === "fulfilled"
    )
    .map((s) => s.value);

  // Detect error/fatal log spikes across all services.
  await evaluateLogSpikes();

  // Prune old check rows so the table stays bounded.
  const cutoffIso = new Date(
    Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();
  const { error: pruneErr } = await admin
    .from("uptime_checks")
    .delete()
    .lt("checked_at", cutoffIso);
  if (pruneErr) {
    console.error("[uptime-check] prune failed:", pruneErr.message);
  }

  return NextResponse.json({ checked: list.length, results });
}
