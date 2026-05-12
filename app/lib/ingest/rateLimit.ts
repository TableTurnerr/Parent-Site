import { createAdminClient } from "@/app/lib/supabase/server";

const DEFAULT_MAX = 10;
const DEFAULT_WINDOW_SEC = 60;
const CLEANUP_RETENTION_HOURS = 24;
const CLEANUP_PROBABILITY = 0.05;

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfter: number };

export async function checkAndRecordRateLimit(
  ip: string | null,
  route: string,
  options: { max?: number; windowSec?: number } = {},
): Promise<RateLimitResult> {
  if (!ip) return { ok: true };

  const max = options.max ?? DEFAULT_MAX;
  const windowSec = options.windowSec ?? DEFAULT_WINDOW_SEC;
  const cutoffIso = new Date(Date.now() - windowSec * 1000).toISOString();

  const admin = await createAdminClient();

  const { count } = await admin
    .from("ingest_rate_events")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .eq("route", route)
    .gte("created_at", cutoffIso);

  if ((count ?? 0) >= max) {
    return { ok: false, retryAfter: windowSec };
  }

  await admin.from("ingest_rate_events").insert({ ip, route });

  if (Math.random() < CLEANUP_PROBABILITY) {
    const oldCutoff = new Date(
      Date.now() - CLEANUP_RETENTION_HOURS * 3600 * 1000,
    ).toISOString();
    void admin.from("ingest_rate_events").delete().lt("created_at", oldCutoff);
  }

  return { ok: true };
}
