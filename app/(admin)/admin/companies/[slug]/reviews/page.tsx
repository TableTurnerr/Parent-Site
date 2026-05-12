import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteReviewsTable, type SiteReviewRow } from "@/app/components/admin/SiteReviewsTable";

type StatusFilter = "new" | "read" | "archived" | "all";
const VALID_STATUSES: StatusFilter[] = ["new", "read", "archived", "all"];

export default async function CompanyReviewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { slug } = await params;
  const { status: statusParam } = await searchParams;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("id, name, slug")
    .eq("slug", slug)
    .single();

  if (!client) notFound();

  const status: StatusFilter =
    statusParam && (VALID_STATUSES as string[]).includes(statusParam)
      ? (statusParam as StatusFilter)
      : "new";

  const [{ data: rawReviews }, { data: counts }] = await Promise.all([
    (async () => {
      let q = supabase
        .from("site_reviews")
        .select(
          "id, rating, feedback, reviewer_name, reviewer_email, reviewer_phone, source, status, created_at, read_at, locations ( name, slug )",
        )
        .eq("client_id", client.id)
        .order("created_at", { ascending: false });
      if (status !== "all") q = q.eq("status", status);
      return await q;
    })(),
    supabase
      .from("site_reviews")
      .select("status")
      .eq("client_id", client.id),
  ]);

  const reviews: SiteReviewRow[] = ((rawReviews ?? []) as Array<
    Record<string, unknown> & {
      locations?: { name: string; slug: string } | null;
    }
  >).map((r) => ({
    id: r.id as string,
    rating: r.rating as number,
    feedback: r.feedback as string,
    reviewer_name: r.reviewer_name as string,
    reviewer_email: (r.reviewer_email as string | null) ?? null,
    reviewer_phone: (r.reviewer_phone as string | null) ?? null,
    source: r.source as string,
    status: r.status as SiteReviewRow["status"],
    created_at: r.created_at as string,
    read_at: (r.read_at as string | null) ?? null,
    location_name: r.locations?.name ?? null,
    location_slug: r.locations?.slug ?? null,
  }));

  const tally = { total: 0, new: 0, read: 0, archived: 0 };
  for (const c of (counts ?? []) as Array<{ status: SiteReviewRow["status"] }>) {
    tally.total += 1;
    tally[c.status] += 1;
  }

  const tabs: Array<{ key: StatusFilter; label: string; count: number }> = [
    { key: "new", label: "New", count: tally.new },
    { key: "read", label: "Read", count: tally.read },
    { key: "archived", label: "Archived", count: tally.archived },
    { key: "all", label: "All", count: tally.total },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/admin/companies/${client.slug}`}
          className="text-xs text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
        >
          ← {client.name}
        </Link>
        <h1 className="mt-2 text-xl font-bold text-[var(--color-charcoal)] sm:text-2xl">
          Reviews — {client.name}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          Reviews posted from the company&apos;s website land here. Mark them read or archive once handled.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryTile label="Total" value={tally.total} />
        <SummaryTile label="New" value={tally.new} accent={tally.new > 0} />
        <SummaryTile label="Read" value={tally.read} />
        <SummaryTile label="Archived" value={tally.archived} />
      </div>

      <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[var(--color-cream-dark)] p-1">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={`/admin/companies/${client.slug}/reviews?status=${t.key}`}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              status === t.key
                ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                : "text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
            }`}
          >
            {t.label}
            <span className="ml-1.5 text-xs tabular-nums text-[var(--color-warm-gray-light)]">
              {t.count}
            </span>
          </Link>
        ))}
      </div>

      <SiteReviewsTable clientId={client.id} reviews={reviews} />
    </div>
  );
}

function SummaryTile({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-semibold tabular-nums ${
          accent ? "text-[var(--color-accent)]" : "text-[var(--color-charcoal)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
