import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApiKeysPanel, { type ApiKeyRow } from "@/app/components/admin/ApiKeysPanel";
import OriginsPanel, { type OriginRow } from "@/app/components/admin/OriginsPanel";

export default async function CompanyIntegrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("id, name, slug")
    .eq("slug", slug)
    .single();

  if (!client) notFound();

  const [{ data: apiKeys }, { data: origins }] = await Promise.all([
    supabase
      .from("client_api_keys")
      .select("id, key_prefix, label, created_at, last_used_at, revoked_at")
      .eq("client_id", client.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("client_site_origins")
      .select("id, origin, label, created_at")
      .eq("client_id", client.id)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/admin/companies/${client.slug}`}
          className="text-xs text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
        >
          ← {client.name}
        </Link>
        <h1 className="mt-2 text-xl sm:text-2xl font-bold text-[var(--color-charcoal)]">
          Integration
        </h1>
        <p className="mt-1 text-xs text-[var(--color-warm-gray-light)]">
          {client.name} · slug: <code>{client.slug}</code>
        </p>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] p-4 text-sm text-[var(--color-charcoal)]">
        <p>
          API keys and allowed origins together let an external website push live data into this company&apos;s
          dashboard. The site must send the key in an <code className="font-mono text-xs">X-Api-Key</code> header,
          and its <code className="font-mono text-xs">Origin</code> header must match an entry in the allowed
          origins list.
        </p>
        <ul className="mt-2 space-y-1 text-xs text-[var(--color-warm-gray)]">
          <li>
            <span className="font-medium text-[var(--color-charcoal)]">Reviews:</span>{" "}
            <code className="font-mono">POST /api/ingest/reviews</code>
          </li>
          <li>
            <span className="font-medium text-[var(--color-charcoal)]">Form submissions:</span>{" "}
            <code className="font-mono">POST /api/ingest/form-submissions</code>
          </li>
        </ul>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
            API Keys
          </h2>
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-5">
            <ApiKeysPanel
              clientId={client.id}
              initialKeys={(apiKeys ?? []) as ApiKeyRow[]}
            />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
            Allowed Origins
          </h2>
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-5">
            <OriginsPanel
              clientId={client.id}
              initialOrigins={(origins ?? []) as OriginRow[]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
