import { createClient } from "@/app/lib/supabase/server";
import { LogsTable } from "@/app/components/admin/LogsTable";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

const SINCE_MS: Record<string, number> = {
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
};

const LOG_LEVELS = ["debug", "info", "warn", "error", "fatal"] as const;
type LogLevel = (typeof LOG_LEVELS)[number];

function isLogLevel(value: string): value is LogLevel {
  return (LOG_LEVELS as readonly string[]).includes(value);
}

export default async function LogsPage({
  searchParams,
}: {
  searchParams: Promise<{
    service?: string;
    level?: string;
    q?: string;
    since?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const service = params.service ?? "";
  const level: LogLevel | "" =
    params.level && isLogLevel(params.level) ? params.level : "";
  const q = params.q ?? "";
  const since = params.since && params.since in SINCE_MS ? params.since : "24h";
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);

  const sinceIso = new Date(Date.now() - SINCE_MS[since]).toISOString();
  const offset = (page - 1) * PAGE_SIZE;

  let query = supabase
    .from("system_logs")
    .select("*", { count: "exact" })
    .gte("created_at", sinceIso)
    .order("created_at", { ascending: false });

  if (service) query = query.eq("service_key", service);
  if (level) query = query.eq("level", level);
  if (q) query = query.ilike("message", `%${q}%`);

  const { data: rows, count } = await query.range(offset, offset + PAGE_SIZE - 1);

  const { data: serviceList } = await supabase
    .from("monitored_services")
    .select("key, name")
    .order("name");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">
          System Logs
        </h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          Structured logs emitted by monitored services. Filter by level, time
          range, or service, and expand a row to inspect its context.
        </p>
      </div>

      <LogsTable
        rows={rows ?? []}
        count={count ?? 0}
        page={page}
        pageSize={PAGE_SIZE}
        filters={{ service, level, q, since }}
        serviceOptions={serviceList ?? []}
      />
    </div>
  );
}
