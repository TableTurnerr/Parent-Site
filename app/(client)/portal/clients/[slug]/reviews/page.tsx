import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, MapPin, Star } from "lucide-react";
import CompanyTabs from "@/app/components/portal/CompanyTabs";

type ReviewStatus = "new" | "read" | "archived";

type ReviewRow = {
  id: string;
  rating: number;
  feedback: string;
  reviewer_name: string;
  reviewer_email: string | null;
  reviewer_phone: string | null;
  source: string;
  status: ReviewStatus;
  created_at: string;
  locations: { name: string; slug: string } | null;
};

const statusPill: Record<ReviewStatus, string> = {
  new: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  read: "bg-[var(--color-cream-dark)] text-[var(--color-warm-gray)]",
  archived: "bg-[var(--color-cream)] text-[var(--color-warm-gray-light)]",
};

export default async function ClientReviewsPage({
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

  const [{ data: rawReviews }, { count: newSubmissionsCount }, { count: clientCount }] =
    await Promise.all([
      supabase
        .from("site_reviews")
        .select(
          "id, rating, feedback, reviewer_name, reviewer_email, reviewer_phone, source, status, created_at, locations ( name, slug )",
        )
        .eq("client_id", client.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("site_form_submissions")
        .select("id", { count: "exact", head: true })
        .eq("client_id", client.id)
        .eq("status", "new"),
      supabase.from("clients").select("id", { count: "exact", head: true }),
    ]);

  const reviews = (rawReviews ?? []) as ReviewRow[];
  const newReviewsCount = reviews.filter((r) => r.status === "new").length;
  const showAllCompanies = (clientCount ?? 0) > 1;

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 lg:px-8 lg:py-12">
      <div>
        {showAllCompanies && (
          <Link
            href="/portal"
            className="text-xs text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
          >
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
        current="reviews"
        newReviewsCount={newReviewsCount}
        newSubmissionsCount={newSubmissionsCount ?? 0}
      />

      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
          Reviews
        </h2>

        {reviews.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-10 text-center">
            <p className="text-sm text-[var(--color-warm-gray)]">No reviews yet.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r) => {
              const dateStr = new Date(r.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });
              const locationName = r.locations?.name ?? null;
              return (
                <li
                  key={r.id}
                  className="relative rounded-2xl border border-[var(--color-border)] bg-white p-6"
                >
                  <span
                    className={`absolute right-4 top-4 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${statusPill[r.status]}`}
                  >
                    {r.status}
                  </span>

                  <div className="flex flex-wrap items-center gap-3 pr-20">
                    <StarRating value={r.rating} />
                    <span className="text-xs text-[var(--color-warm-gray-light)]">·</span>
                    <span className="text-xs text-[var(--color-warm-gray)]">{dateStr}</span>
                    {locationName && (
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--color-warm-gray)]">
                        <MapPin className="h-3 w-3" />
                        {locationName}
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-semibold text-[var(--color-charcoal)]">
                      {r.reviewer_name}
                    </p>
                    {(r.reviewer_email || r.reviewer_phone) && (
                      <p className="mt-0.5 text-xs text-[var(--color-warm-gray)]">
                        {r.reviewer_email}
                        {r.reviewer_email && r.reviewer_phone && (
                          <span className="text-[var(--color-warm-gray-light)]"> · </span>
                        )}
                        {r.reviewer_phone}
                      </p>
                    )}
                  </div>

                  <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[var(--color-charcoal)]">
                    {r.feedback}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function StarRating({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, value));
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${v} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= v ? "fill-amber-400 text-amber-400" : "text-[var(--color-warm-gray-light)]"
          }`}
        />
      ))}
      <span className="ml-1 text-xs font-medium tabular-nums text-[var(--color-warm-gray)]">
        /5
      </span>
    </div>
  );
}
