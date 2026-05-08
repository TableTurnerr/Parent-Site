import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import ShareAccessPanel from "@/app/components/admin/ShareAccessPanel";
import { ReportStatusChip } from "@/app/components/admin/ReportStatusChip";
import EditableCompanyName from "@/app/components/admin/EditableCompanyName";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!client) notFound();

  const { data: reports } = await supabase
    .from("client_reports")
    .select("id, report_month, status, visibility, published_at, updated_at")
    .eq("client_id", client.id)
    .order("report_month", { ascending: false });

  const { data: grants } = await supabase
    .from("client_access")
    .select("id, email, invited_at, accepted_at, revoked_at")
    .eq("client_id", client.id)
    .order("invited_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/companies" className="text-xs text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]">
          ← Companies
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <EditableCompanyName clientId={client.id} name={client.name} slug={client.slug} />
          <a
            href={client.url.startsWith("http") ? client.url : `https://${client.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
          >
            {client.url} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <p className="mt-1 text-xs text-[var(--color-warm-gray-light)]">slug: <code>{client.slug}</code></p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Reports — 2 columns */}
        <section className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
              Monthly Reports
            </h2>
            <Link
              href={`/admin/reports?client=${client.slug}`}
              className="text-xs text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
            >
              All reports view →
            </Link>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-white">
            {reports && reports.length > 0 ? (
              <ul className="divide-y divide-[var(--color-border)]">
                {reports.map((r) => {
                  const month = new Date(r.report_month).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  });
                  return (
                    <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-4">
                      <div className="min-w-0">
                        <Link href={`/admin/reports/${r.id}`} className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-accent)]">
                          {month}
                        </Link>
                        <p className="text-xs text-[var(--color-warm-gray-light)]">
                          Updated {new Date(r.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <ReportStatusChip
                        reportId={r.id}
                        status={r.status as "draft" | "published" | "archived"}
                      />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="px-5 py-10 text-center text-sm text-[var(--color-warm-gray)]">
                No reports yet. Run <code className="rounded bg-[var(--color-cream-dark)] px-1 py-0.5 font-mono">/generate-client-report</code>.
              </p>
            )}
          </div>
        </section>

        {/* Access panel — 1 column */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
            Owner Access
          </h2>
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-5">
            <ShareAccessPanel
              clientId={client.id}
              grants={(grants ?? []).map((g) => ({
                id: g.id,
                email: g.email,
                invitedAt: g.invited_at,
                acceptedAt: g.accepted_at,
                revokedAt: g.revoked_at,
              }))}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
