import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SiteSubmissionsTable,
  type SiteSubmissionRow,
} from "@/app/components/admin/SiteSubmissionsTable";

type StatusFilter = "new" | "read" | "archived" | "all";
const VALID_STATUSES: StatusFilter[] = ["new", "read", "archived", "all"];

export default async function CompanySubmissionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ status?: string; type?: string }>;
}) {
  const { slug } = await params;
  const { status: statusParam, type: typeParam } = await searchParams;
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
  const formType = typeParam && typeParam !== "all" ? typeParam : null;

  const [{ data: rawSubs }, { data: counts }, { data: typeRows }] = await Promise.all([
    (async () => {
      let q = supabase
        .from("site_form_submissions")
        .select(
          "id, form_type, payload, contact_name, contact_email, contact_phone, source, status, created_at, read_at, locations ( name, slug )",
        )
        .eq("client_id", client.id)
        .order("created_at", { ascending: false });
      if (status !== "all") q = q.eq("status", status);
      if (formType) q = q.eq("form_type", formType);
      return await q;
    })(),
    supabase
      .from("site_form_submissions")
      .select("status")
      .eq("client_id", client.id),
    supabase
      .from("site_form_submissions")
      .select("form_type")
      .eq("client_id", client.id),
  ]);

  const submissions: SiteSubmissionRow[] = ((rawSubs ?? []) as Array<
    Record<string, unknown> & {
      locations?: { name: string; slug: string } | null;
    }
  >).map((r) => ({
    id: r.id as string,
    form_type: r.form_type as string,
    payload: r.payload as unknown,
    contact_name: (r.contact_name as string | null) ?? null,
    contact_email: (r.contact_email as string | null) ?? null,
    contact_phone: (r.contact_phone as string | null) ?? null,
    source: r.source as string,
    status: r.status as SiteSubmissionRow["status"],
    created_at: r.created_at as string,
    read_at: (r.read_at as string | null) ?? null,
    location_name: r.locations?.name ?? null,
    location_slug: r.locations?.slug ?? null,
  }));

  const tally = { total: 0, new: 0, read: 0, archived: 0 };
  for (const c of (counts ?? []) as Array<{ status: SiteSubmissionRow["status"] }>) {
    tally.total += 1;
    tally[c.status] += 1;
  }

  const distinctFormTypes = Array.from(
    new Set(((typeRows ?? []) as Array<{ form_type: string }>).map((r) => r.form_type)),
  ).sort();

  const tabs: Array<{ key: StatusFilter; label: string; count: number }> = [
    { key: "new", label: "New", count: tally.new },
    { key: "read", label: "Read", count: tally.read },
    { key: "archived", label: "Archived", count: tally.archived },
    { key: "all", label: "All", count: tally.total },
  ];

  const clientSlug = client.slug;
  function buildHref(next: { status?: StatusFilter; type?: string | null }) {
    const sp = new URLSearchParams();
    const s = next.status ?? status;
    const t = next.type === undefined ? formType : next.type;
    if (s) sp.set("status", s);
    if (t) sp.set("type", t);
    const qs = sp.toString();
    return `/admin/companies/${clientSlug}/submissions${qs ? `?${qs}` : ""}`;
  }

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
          Submissions — {client.name}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          Contact, catering, and other form submissions captured from the company&apos;s website.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryTile label="Total" value={tally.total} />
        <SummaryTile label="New" value={tally.new} accent={tally.new > 0} />
        <SummaryTile label="Read" value={tally.read} />
        <SummaryTile label="Archived" value={tally.archived} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[var(--color-cream-dark)] p-1">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={buildHref({ status: t.key })}
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

        {distinctFormTypes.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-[var(--color-warm-gray)]">
            <span className="font-semibold uppercase tracking-wider">Form type</span>
            <div className="flex flex-wrap gap-1">
              <Link
                href={buildHref({ type: null })}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  !formType
                    ? "bg-[var(--color-charcoal)] text-white"
                    : "bg-white text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
                }`}
              >
                All
              </Link>
              {distinctFormTypes.map((ft) => (
                <Link
                  key={ft}
                  href={buildHref({ type: ft })}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                    formType === ft
                      ? "bg-[var(--color-charcoal)] text-white"
                      : "bg-white text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
                  }`}
                >
                  {ft}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <SiteSubmissionsTable clientId={client.id} submissions={submissions} />
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
