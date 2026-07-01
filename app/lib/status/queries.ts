import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Enums } from "@/app/lib/supabase/types";

type UptimeStatus = Enums<"uptime_status">;
type ServiceKind = Enums<"service_kind">;

export type ServiceStatus = {
  key: string;
  name: string;
  kind: ServiceKind;
  latestStatus: UptimeStatus | null;
  latestLatencyMs: number | null;
  lastCheckedAt: string | null;
  version: string | null;
  uptime24h: number | null;
  uptime7d: number | null;
};

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Builds a per-service status summary for the admin Status dashboard.
 *
 * Resilient by design: each sub-query is isolated so a single failure
 * degrades to `null` for that field instead of throwing the whole page.
 */
export async function getServiceStatuses(
  supabase: SupabaseClient<Database>
): Promise<ServiceStatus[]> {
  const { data: services, error } = await supabase
    .from("monitored_services")
    .select("id, key, name, kind")
    .eq("enabled", true)
    .order("name");

  if (error || !services) return [];

  const now = Date.now();
  const since24h = new Date(now - DAY_MS).toISOString();
  const since7d = new Date(now - 7 * DAY_MS).toISOString();

  return Promise.all(
    services.map(async (service) => {
      const [latest, version, uptime24h, uptime7d] = await Promise.all([
        getLatestCheck(supabase, service.id),
        getHeartbeatVersion(supabase, service.id),
        getUptimePct(supabase, service.id, since24h),
        getUptimePct(supabase, service.id, since7d),
      ]);

      return {
        key: service.key,
        name: service.name,
        kind: service.kind,
        latestStatus: latest.status,
        latestLatencyMs: latest.latencyMs,
        lastCheckedAt: latest.checkedAt,
        version,
        uptime24h,
        uptime7d,
      };
    })
  );
}

async function getLatestCheck(
  supabase: SupabaseClient<Database>,
  serviceId: string
): Promise<{
  status: UptimeStatus | null;
  latencyMs: number | null;
  checkedAt: string | null;
}> {
  const { data, error } = await supabase
    .from("uptime_checks")
    .select("status, latency_ms, checked_at")
    .eq("service_id", serviceId)
    .order("checked_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return { status: null, latencyMs: null, checkedAt: null };
  }

  return {
    status: data.status,
    latencyMs: data.latency_ms,
    checkedAt: data.checked_at,
  };
}

async function getHeartbeatVersion(
  supabase: SupabaseClient<Database>,
  serviceId: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from("service_heartbeats")
    .select("version")
    .eq("service_id", serviceId)
    .maybeSingle();

  if (error || !data) return null;
  return data.version;
}

async function getUptimePct(
  supabase: SupabaseClient<Database>,
  serviceId: string,
  sinceIso: string
): Promise<number | null> {
  const { count: total, error: totalError } = await supabase
    .from("uptime_checks")
    .select("*", { head: true, count: "exact" })
    .eq("service_id", serviceId)
    .gte("checked_at", sinceIso);

  if (totalError || !total) return null;

  const { count: up, error: upError } = await supabase
    .from("uptime_checks")
    .select("*", { head: true, count: "exact" })
    .eq("service_id", serviceId)
    .eq("status", "up")
    .gte("checked_at", sinceIso);

  if (upError || up === null) return null;

  return Math.round((100 * up) / total);
}
