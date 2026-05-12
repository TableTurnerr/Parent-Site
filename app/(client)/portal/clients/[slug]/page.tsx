import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import CompanyTabs from "@/app/components/portal/CompanyTabs";

function monthSegment(month: string): string {
  return month.slice(0, 7); // "YYYY-MM-DD" → "YYYY-MM"
}

export default async function ClientCompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("id, name, slug, url")
    .eq("slug", slug)
    .single();

  if (!client) notFound();

  const [
    { data: reportsRaw },
    { count: locationCount },
    { count: clientCount },
    { count: newReviewsCount },
    { count: newSubmissionsCount },
  ] = await Promise.all([
    supabase
      .from("client_reports")
      .select("id, report_month, published_at, grader_data, locations ( name, slug, is_primary )")
      .eq("client_id", client.id)
      .eq("status", "published")
      .order("report_month", { ascending: false }),
    supabase
      .from("locations")
      .select("id", { count: "exact", head: true })
      .eq("client_id", client.id),
    supabase
      .from("clients")
      .select("id", { count: "exact", head: true }),
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
  ]);

  const reports = (reportsRaw ?? []) as Array<{
    id: string;
    report_month: string;
    published_at: string | null;
    grader_data: { overallScore?: number } | null;
    locations: { name: string; slug: string; is_primary: boolean } | null;
  }>;

  const showLocationName = (locationCount ?? 0) > 1;
  const showAllCompanies = (clientCount ?? 0) > 1;

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 lg:px-8 lg:py-12">
      <div>
        {showAllCompanies && (
          <Link href="/portal" className="text-xs text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]">
            ← All companies
          </Link>
        )}
        <div className="mt-2 flex flex-wrap items-baseline gap-3">
          <h1 className="text-2xl font-bold text-[var(--color-charcoal)]">{client.name}</h1>
          <a
            href={client.url.startsWith("http") ? client.url : `https://${client.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
          >
            {client.url} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <CompanyTabs
        slug={client.slug}
        current="reports"
        newReviewsCount={newReviewsCount ?? 0}
        newSubmissionsCount={newSubmissionsCount ?? 0}
      />

      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
          Monthly reports
        </h2>
        {reports && reports.length > 0 ? (
          <ul className="divide-y divide-[var(--color-border)] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            {reports.map((r) => {
              const month = new Date(r.report_month).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              });
              const score = r.grader_data?.overallScore;
              const locationName = r.locations?.name ?? null;
              const locationSlug = r.locations?.slug ?? null;
              const href = locationSlug
                ? `/portal/clients/${client.slug}/${monthSegment(r.report_month)}?loc=${locationSlug}`
                : `/portal/clients/${client.slug}/${monthSegment(r.report_month)}`;
              return (
                <li key={r.id}>
                  <Link
                    href={href}
                    className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-[var(--color-cream)]"
                  >
                    <div>
                      <p className="font-medium text-[var(--color-charcoal)]">
                        {month}
                        {showLocationName && locationName && (
                          <span className="ml-2 text-sm font-normal text-[var(--color-warm-gray)]">
                            · {locationName}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-[var(--color-warm-gray-light)]">
                        Published {r.published_at ? new Date(r.published_at).toLocaleDateString() : "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {typeof score === "number" && (
                        <span className="text-sm font-semibold tabular-nums text-[var(--color-charcoal)]">
                          {score}/100
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 text-[var(--color-warm-gray)] transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-10 text-center">
            <p className="text-sm text-[var(--color-warm-gray)]">
              Your first report is being prepared. We'll email you when it's ready.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
