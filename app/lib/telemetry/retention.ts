import { createAdminClient } from "@/app/lib/supabase/server";

const RETENTION_DAYS = 14;
const PRUNE_PROBABILITY = 0.05;

type AdminClient = Awaited<ReturnType<typeof createAdminClient>>;

/**
 * Opportunistically prunes system_logs older than the retention window.
 *
 * Mirrors the rateLimit cleanup: roughly 5% of calls fire a delete, and the
 * delete is fire-and-forget (never awaited, never throws) so it can never block
 * or fail an ingest request. Pass the route's existing admin client to avoid
 * spinning up a second one; otherwise one is created lazily.
 */
export function maybePruneSystemLogs(admin?: AdminClient): void {
  if (Math.random() >= PRUNE_PROBABILITY) return;

  const cutoffIso = new Date(
    Date.now() - RETENTION_DAYS * 24 * 3600 * 1000,
  ).toISOString();

  void (async () => {
    try {
      const client = admin ?? (await createAdminClient());
      void client.from("system_logs").delete().lt("created_at", cutoffIso);
    } catch {
      // Fire-and-forget: retention failures must never affect ingestion.
    }
  })();
}
