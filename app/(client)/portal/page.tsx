import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { Building2, FileBarChart2, ArrowRight } from "lucide-react";

export default async function PortalDashboard() {
  const supabase = await createClient();

  // RLS naturally restricts to clients the user has access to
  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, slug, url")
    .order("name");

  const ids = (clients ?? []).map((c) => c.id);
  type ReportRow = { id: string; client_id: string; report_month: string; published_at: string | null; status: string };
  let reportsByClient = new Map<string, ReportRow[]>();
  if (ids.length) {
    const { data: reports } = await supabase
      .from("client_reports")
      .select("id, client_id, report_month, published_at, status")
      .in("client_id", ids)
      .eq("status", "published")
      .order("report_month", { ascending: false });
    reportsByClient = (reports ?? []).reduce((acc, r) => {
      const arr = acc.get(r.client_id) ?? [];
      arr.push(r);
      acc.set(r.client_id, arr);
      return acc;
    }, new Map<string, ReportRow[]>());
  }

  if (!clients || clients.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-10 text-center">
        <Building2 className="mx-auto h-10 w-10 text-[var(--color-warm-gray-light)]" />
        <h1 className="mt-4 text-lg font-semibold text-[var(--color-charcoal)]">No reports yet</h1>
        <p className="mt-2 max-w-md mx-auto text-sm text-[var(--color-warm-gray)]">
          You don't have access to any reports yet. Once your TableTurnerr account manager grants you access, your reports will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">Your reports</h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          Monthly digital presence reports for your restaurants.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {clients.map((c) => {
          const rs = reportsByClient.get(c.id) ?? [];
          const latest = rs[0];
          const latestMonth = latest?.report_month
            ? new Date(latest.report_month).toLocaleDateString("en-US", { month: "long", year: "numeric" })
            : null;

          return (
            <Link
              key={c.id}
              href={`/portal/clients/${c.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-all hover:border-[var(--color-charcoal)] hover:shadow-sm"
            >
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-charcoal)]">{c.name}</h2>
                <p className="mt-1 text-sm text-[var(--color-warm-gray)]">{c.url}</p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--color-warm-gray-light)]">
                    {rs.length} {rs.length === 1 ? "report" : "reports"}
                  </p>
                  {latestMonth && (
                    <p className="mt-0.5 text-sm font-medium text-[var(--color-charcoal)]">
                      Latest: {latestMonth}
                    </p>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 text-[var(--color-warm-gray)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-charcoal)]" />
              </div>
              {rs.length === 0 && (
                <div className="flex items-center gap-2 rounded-lg bg-[var(--color-cream)] px-3 py-2 text-xs text-[var(--color-warm-gray)]">
                  <FileBarChart2 className="h-3.5 w-3.5" />
                  Your first report is being prepared.
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
