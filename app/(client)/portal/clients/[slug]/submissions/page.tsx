import { createClient } from "@/app/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import CompanyTabs from "@/app/components/portal/CompanyTabs";

type SubmissionStatus = "new" | "read" | "archived";

type SubmissionRow = {
  id: string;
  form_type: string;
  payload: unknown;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  source: string;
  status: SubmissionStatus;
  created_at: string;
  locations: { name: string; slug: string } | null;
};

const statusPill: Record<SubmissionStatus, string> = {
  new: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  read: "bg-[var(--color-cream-dark)] text-[var(--color-warm-gray)]",
  archived: "bg-[var(--color-cream)] text-[var(--color-warm-gray-light)]",
};

function renderValue(v: unknown): { kind: "inline" | "block"; text: string } {
  if (v === null || v === undefined) return { kind: "inline", text: "—" };
  if (typeof v === "string") return { kind: "inline", text: v };
  if (typeof v === "number" || typeof v === "boolean") return { kind: "inline", text: String(v) };
  return { kind: "block", text: JSON.stringify(v, null, 2) };
}

function payloadEntries(payload: unknown): Array<[string, unknown]> {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return [];
  return Object.entries(payload as Record<string, unknown>);
}

export default async function ClientSubmissionsPage({
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

  const [{ data: rawSubmissions }, { count: newReviewsCount }, { count: clientCount }] =
    await Promise.all([
      supabase
        .from("site_form_submissions")
        .select(
          "id, form_type, payload, contact_name, contact_email, contact_phone, source, status, created_at, locations ( name, slug )",
        )
        .eq("client_id", client.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("site_reviews")
        .select("id", { count: "exact", head: true })
        .eq("client_id", client.id)
        .eq("status", "new"),
      supabase.from("clients").select("id", { count: "exact", head: true }),
    ]);

  const submissions = (rawSubmissions ?? []) as SubmissionRow[];
  const newSubmissionsCount = submissions.filter((s) => s.status === "new").length;
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
        current="submissions"
        newReviewsCount={newReviewsCount ?? 0}
        newSubmissionsCount={newSubmissionsCount}
      />

      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
          Submissions
        </h2>

        {submissions.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-10 text-center">
            <p className="text-sm text-[var(--color-warm-gray)]">No submissions yet.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {submissions.map((s) => {
              const dateStr = new Date(s.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });
              const locationName = s.locations?.name ?? null;
              const entries = payloadEntries(s.payload);
              return (
                <li
                  key={s.id}
                  className="relative rounded-2xl border border-[var(--color-border)] bg-white p-6"
                >
                  <span
                    className={`absolute right-4 top-4 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${statusPill[s.status]}`}
                  >
                    {s.status}
                  </span>

                  <div className="flex flex-wrap items-center gap-3 pr-20">
                    <span className="inline-flex rounded-full bg-[var(--color-cream-dark)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
                      {s.form_type}
                    </span>
                    <span className="text-xs text-[var(--color-warm-gray-light)]">·</span>
                    <span className="text-xs text-[var(--color-warm-gray)]">{dateStr}</span>
                    {locationName && (
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--color-warm-gray)]">
                        <MapPin className="h-3 w-3" />
                        {locationName}
                      </span>
                    )}
                  </div>

                  {(s.contact_name || s.contact_email || s.contact_phone) && (
                    <div className="mt-3">
                      {s.contact_name && (
                        <p className="text-sm font-semibold text-[var(--color-charcoal)]">
                          {s.contact_name}
                        </p>
                      )}
                      <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[var(--color-warm-gray)]">
                        {s.contact_email && (
                          <span className="inline-flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <a
                              href={`mailto:${s.contact_email}`}
                              className="hover:text-[var(--color-charcoal)]"
                            >
                              {s.contact_email}
                            </a>
                          </span>
                        )}
                        {s.contact_phone && (
                          <span className="inline-flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {s.contact_phone}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {entries.length > 0 && (
                    <dl className="mt-4 space-y-2 border-t border-[var(--color-border)] pt-4 text-sm">
                      {entries.map(([k, v]) => {
                        const rendered = renderValue(v);
                        return (
                          <div
                            key={k}
                            className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-3"
                          >
                            <dt className="text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] sm:pt-0.5">
                              {k}
                            </dt>
                            <dd className="min-w-0 text-[var(--color-charcoal)]">
                              {rendered.kind === "inline" ? (
                                <span className="break-words">{rendered.text}</span>
                              ) : (
                                <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-2 font-mono text-xs leading-relaxed">
                                  {rendered.text}
                                </pre>
                              )}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
