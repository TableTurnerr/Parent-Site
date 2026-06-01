import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Eye, MapPin, Star } from "lucide-react";
import ImpersonateButton from "@/app/components/admin/ImpersonateButton";
import ShareAccessPanel from "@/app/components/admin/ShareAccessPanel";
import { ReportStatusChip } from "@/app/components/admin/ReportStatusChip";
import EditableCompanyName from "@/app/components/admin/EditableCompanyName";

type ReportRow = {
  id: string;
  location_id: string;
  client_slug: string;
  report_month: string;
  status: "draft" | "published" | "archived";
  visibility: string;
  published_at: string | null;
  updated_at: string;
};

type LocationRow = {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  is_primary: boolean;
};

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

  const [
    { data: locations },
    { data: reports },
    { data: grants },
    { count: newReviewsCount },
    { count: newSubmissionsCount },
    { count: activeKeysCount },
  ] = await Promise.all([
    supabase
      .from("locations")
      .select("id, name, slug, address, is_primary")
      .eq("client_id", client.id)
      .order("is_primary", { ascending: false })
      .order("name"),
    supabase
      .from("client_reports")
      .select("id, location_id, client_slug, report_month, status, visibility, published_at, updated_at")
      .eq("client_id", client.id)
      .order("report_month", { ascending: false }),
    supabase
      .from("client_access")
      .select("id, email, invited_at, accepted_at, revoked_at")
      .eq("client_id", client.id)
      .order("invited_at", { ascending: false }),
    supabase
      .from("site_reviews")
      .select("id", { count: "exact", head: true })
      .eq("client_id", client.id)
      .eq("status", "new"),
    supabase
      .from("site_form_submissions")
      .select("id", { count: "exact", head: true })
      .eq("client_id", client.id)
      .eq("status", "new"),
    supabase
      .from("client_api_keys")
      .select("id", { count: "exact", head: true })
      .eq("client_id", client.id)
      .is("revoked_at", null),
  ]);

  const locationList = (locations ?? []) as LocationRow[];
  const reportsByLocation = new Map<string, ReportRow[]>();
  for (const r of (reports ?? []) as ReportRow[]) {
    const arr = reportsByLocation.get(r.location_id) ?? [];
    arr.push(r);
    reportsByLocation.set(r.location_id, arr);
  }

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
        <p className="mt-1 text-xs text-[var(--color-warm-gray-light)]">
          slug: <code>{client.slug}</code>  ·  id: <code>{client.id}</code>
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <a
            href={`/report/${client.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium text-[var(--color-warm-gray)] hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)]"
          >
            <Eye className="h-3 w-3" /> Brand page
          </a>
          <ImpersonateButton clientId={client.id} clientName={client.name} clientSlug={client.slug} />
        </div>
      </div>

      <nav className="flex flex-wrap items-center gap-1 border-b border-[var(--color-border)] pb-3">
        <span className="rounded-md bg-[var(--color-charcoal)] px-3 py-1.5 text-xs font-medium text-white">
          Overview
        </span>
        <Link
          href={`/admin/companies/${client.slug}/reviews`}
          className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)]"
        >
          Reviews
          {(newReviewsCount ?? 0) > 0 && (
            <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[10px] font-semibold text-white">
              {newReviewsCount}
            </span>
          )}
        </Link>
        <Link
          href={`/admin/companies/${client.slug}/submissions`}
          className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)]"
        >
          Submissions
          {(newSubmissionsCount ?? 0) > 0 && (
            <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[10px] font-semibold text-white">
              {newSubmissionsCount}
            </span>
          )}
        </Link>
        <Link
          href={`/admin/companies/${client.slug}/integration`}
          className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)]"
        >
          Integration
          <span className="text-[10px] text-[var(--color-warm-gray-light)]">
            {activeKeysCount ?? 0} {activeKeysCount === 1 ? "key" : "keys"}
          </span>
        </Link>
      </nav>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Locations + reports — 2 columns */}
        <section className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
              Locations &amp; Monthly Reports
            </h2>
            <Link
              href={`/admin/reports?client=${client.slug}`}
              className="text-xs text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
            >
              All reports view →
            </Link>
          </div>

          {locationList.length === 0 ? (
            <div className="rounded-xl border border-[var(--color-border)] bg-white px-5 py-10 text-center text-sm text-[var(--color-warm-gray)]">
              No locations yet. Locations are created automatically the first time you push a report.
            </div>
          ) : (
            <div className="space-y-4">
              {locationList.map((loc) => {
                const locReports = reportsByLocation.get(loc.id) ?? [];
                return (
                  <div
                    key={loc.id}
                    className="rounded-xl border border-[var(--color-border)] bg-white"
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-[var(--color-border)] px-5 py-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-[var(--color-warm-gray)]" />
                          <span className="font-medium text-[var(--color-charcoal)]">{loc.name}</span>
                          {loc.is_primary && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-700">
                              <Star className="h-2.5 w-2.5" /> Primary
                            </span>
                          )}
                        </div>
                        {loc.address && (
                          <p className="mt-0.5 text-xs text-[var(--color-warm-gray)]">{loc.address}</p>
                        )}
                        <p className="mt-0.5 text-[10px] text-[var(--color-warm-gray-light)]">
                          slug: <code>{loc.slug}</code>  ·  id: <code>{loc.id}</code>
                        </p>
                      </div>
                      <div className="text-right text-xs text-[var(--color-warm-gray)]">
                        {locReports.length} report{locReports.length === 1 ? "" : "s"}
                      </div>
                    </div>

                    {locReports.length > 0 ? (
                      <ul className="divide-y divide-[var(--color-border)]">
                        {locReports.map((r) => {
                          const month = new Date(r.report_month).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          });
                          const monthSegment = r.report_month.slice(0, 7);
                          const previewHref = `/report/${r.client_slug}/${monthSegment}`;
                          const canPreview = r.status === "published";
                          return (
                            <li
                              key={r.id}
                              className="flex items-center justify-between gap-3 px-5 py-3"
                            >
                              <div className="min-w-0">
                                <Link
                                  href={`/admin/reports/${r.id}`}
                                  className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-accent)]"
                                >
                                  {month}
                                </Link>
                                <p className="text-xs text-[var(--color-warm-gray-light)]">
                                  Updated {new Date(r.updated_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <ReportStatusChip reportId={r.id} status={r.status} />
                                {canPreview ? (
                                  <a
                                    href={previewHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Preview public report"
                                    aria-label="Preview public report"
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-warm-gray)] hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)]"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </a>
                                ) : (
                                  <span
                                    title="Preview available once published"
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-warm-gray-light)] opacity-60"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </span>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="px-5 py-6 text-center text-xs text-[var(--color-warm-gray)]">
                        No reports for this location yet.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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
