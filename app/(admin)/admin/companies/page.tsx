import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { Building2, ExternalLink } from "lucide-react";

export default async function CompaniesPage() {
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, slug, url, primary_contact_email, created_at")
    .order("name");

  // Counts: reports + active grants per client
  const ids = (clients ?? []).map((c) => c.id);
  const reportCounts = new Map<string, number>();
  const grantCounts = new Map<string, number>();
  if (ids.length) {
    const { data: reports } = await supabase
      .from("client_reports")
      .select("client_id")
      .in("client_id", ids);
    for (const r of reports ?? []) {
      reportCounts.set(r.client_id, (reportCounts.get(r.client_id) ?? 0) + 1);
    }
    const { data: grants } = await supabase
      .from("client_access")
      .select("client_id, revoked_at")
      .in("client_id", ids)
      .is("revoked_at", null);
    for (const g of grants ?? []) {
      grantCounts.set(g.client_id, (grantCounts.get(g.client_id) ?? 0) + 1);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-charcoal)]">Companies</h1>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
            Restaurants under management. Each company has monthly reports and a list of owners with portal access.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-x-auto">
        {clients && clients.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">Company</th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] md:table-cell">Website</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">Reports</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">Owners</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {clients.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-[var(--color-cream)]">
                  <td className="px-6 py-4">
                    <Link href={`/admin/companies/${c.slug}`} className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-accent)]">
                      {c.name}
                    </Link>
                  </td>
                  <td className="hidden px-6 py-4 md:table-cell">
                    <a href={c.url.startsWith("http") ? c.url : `https://${c.url}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]">
                      {c.url} <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm tabular-nums text-[var(--color-charcoal)]">{reportCounts.get(c.id) ?? 0}</td>
                  <td className="px-6 py-4 text-sm tabular-nums text-[var(--color-charcoal)]">{grantCounts.get(c.id) ?? 0}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/companies/${c.slug}`} className="rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-16 text-center">
            <Building2 className="mx-auto h-10 w-10 text-[var(--color-warm-gray-light)]" />
            <p className="mt-4 text-sm font-medium text-[var(--color-charcoal)]">No companies yet</p>
            <p className="mt-1 text-xs text-[var(--color-warm-gray)]">
              Run <code className="rounded bg-[var(--color-cream-dark)] px-1 py-0.5 font-mono">/generate-client-report</code> to create your first.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
