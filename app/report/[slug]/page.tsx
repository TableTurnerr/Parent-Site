import { createClient } from "@/app/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

type LocationCard = {
  reportSlug: string;
  reportMonth: string;
  locationName: string | null;
  locationAddress: string | null;
  publishedAt: string | null;
  overallScore: number | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: client } = await supabase
    .from("clients")
    .select("name")
    .eq("slug", slug)
    .maybeSingle();
  if (!client) return { title: "Report | TableTurnerr", robots: { index: false, follow: false } };
  return {
    title: `${client.name} — Digital Presence Reports | TableTurnerr`,
    robots: { index: false, follow: false },
  };
}

export default async function PublicReportLandingPage({
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
    .maybeSingle();

  if (client) {
    const { data: locReports } = await supabase
      .from("client_reports")
      .select(
        "client_slug, report_month, published_at, grader_data, locations ( name, address, is_primary )",
      )
      .eq("client_id", client.id)
      .eq("status", "published")
      .in("visibility", ["public", "unlisted"])
      .order("report_month", { ascending: false });

    const rows = (locReports ?? []) as Array<{
      client_slug: string;
      report_month: string;
      published_at: string | null;
      grader_data: { overallScore?: number } | null;
      locations: { name: string; address: string | null; is_primary: boolean } | null;
    }>;

    const latestBySlug = new Map<string, LocationCard>();
    for (const r of rows) {
      if (latestBySlug.has(r.client_slug)) continue;
      latestBySlug.set(r.client_slug, {
        reportSlug: r.client_slug,
        reportMonth: r.report_month,
        locationName: r.locations?.name ?? null,
        locationAddress: r.locations?.address ?? null,
        publishedAt: r.published_at,
        overallScore:
          typeof r.grader_data?.overallScore === "number"
            ? r.grader_data.overallScore
            : null,
      });
    }

    const cards = Array.from(latestBySlug.values());

    if (cards.length === 1) {
      const only = cards[0];
      redirect(`/report/${only.reportSlug}/${only.reportMonth.slice(0, 7)}`);
    }

    if (cards.length > 1) {
      return <BrandLanding client={client} cards={cards} />;
    }
    // No published reports — fall through to legacy lookup
  }

  // Legacy: per-location client_slug like "taco-delphia-22nd-walnut"
  const { data: latest } = await supabase
    .from("client_reports")
    .select("report_month")
    .eq("client_slug", slug)
    .eq("status", "published")
    .in("visibility", ["public", "unlisted"])
    .order("report_month", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!latest) notFound();

  redirect(`/report/${slug}/${latest.report_month.slice(0, 7)}`);
}

function BrandLanding({
  client,
  cards,
}: {
  client: { name: string; url: string };
  cards: LocationCard[];
}) {
  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-20">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-warm-gray)]">
            TableTurnerr · Digital Presence Reports
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-charcoal)] sm:text-4xl">
            {client.name}
          </h1>
          {client.url && (
            <p className="mt-2 text-sm text-[var(--color-warm-gray)]">{client.url}</p>
          )}
          <p className="mt-4 max-w-xl text-sm text-[var(--color-warm-gray)]">
            Choose a location to view its latest monthly report.
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2">
          {cards.map((c) => {
            const monthLabel = new Date(c.reportMonth).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            });
            return (
              <li key={c.reportSlug}>
                <Link
                  href={`/report/${c.reportSlug}/${c.reportMonth.slice(0, 7)}`}
                  className="group flex h-full flex-col justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-all hover:border-[var(--color-charcoal)] hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-start gap-2 text-[var(--color-charcoal)]">
                      <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--color-warm-gray)]" />
                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold leading-tight">
                          {c.locationName ?? "Location"}
                        </h2>
                        {c.locationAddress && (
                          <p className="mt-0.5 text-xs text-[var(--color-warm-gray)]">
                            {c.locationAddress}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-3 border-t border-[var(--color-border)] pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--color-warm-gray-light)]">
                        Latest report
                      </p>
                      <p className="text-sm font-medium text-[var(--color-charcoal)]">
                        {monthLabel}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {c.overallScore !== null && (
                        <span className="text-sm font-semibold tabular-nums text-[var(--color-charcoal)]">
                          {c.overallScore}/100
                        </span>
                      )}
                      <ArrowRight className="h-4 w-4 text-[var(--color-warm-gray)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-charcoal)]" />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
