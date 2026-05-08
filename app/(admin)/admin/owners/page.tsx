import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { Users } from "lucide-react";

interface OwnerRow {
  email: string;
  joinedAt: string | null;
  invites: Array<{
    grantId: string;
    clientId: string;
    clientName: string;
    clientSlug: string;
    invitedAt: string;
    acceptedAt: string | null;
  }>;
}

export default async function OwnersPage() {
  const supabase = await createClient();

  const { data: grants } = await supabase
    .from("client_access")
    .select(`
      id,
      email,
      invited_at,
      accepted_at,
      client_id,
      clients!inner ( name, slug )
    `)
    .is("revoked_at", null)
    .order("invited_at", { ascending: false });

  // Group by email
  const byEmail = new Map<string, OwnerRow>();
  for (const g of grants ?? []) {
    const existing = byEmail.get(g.email) ?? {
      email: g.email,
      joinedAt: g.accepted_at,
      invites: [],
    };
    if (g.accepted_at && (!existing.joinedAt || g.accepted_at < existing.joinedAt)) {
      existing.joinedAt = g.accepted_at;
    }
    existing.invites.push({
      grantId: g.id,
      clientId: g.client_id,
      clientName: (g.clients as { name: string; slug: string }).name,
      clientSlug: (g.clients as { name: string; slug: string }).slug,
      invitedAt: g.invited_at,
      acceptedAt: g.accepted_at,
    });
    byEmail.set(g.email, existing);
  }

  const owners = Array.from(byEmail.values());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-charcoal)]">Owners</h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          People with portal access to one or more companies.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        {owners.length > 0 ? (
          <ul className="divide-y divide-[var(--color-border)]">
            {owners.map((o) => (
              <li key={o.email} className="px-5 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="font-medium text-[var(--color-charcoal)]">{o.email}</p>
                    <p className="text-xs text-[var(--color-warm-gray-light)]">
                      {o.joinedAt ? `Joined ${new Date(o.joinedAt).toLocaleDateString()}` : "Not yet signed in"}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--color-warm-gray)]">
                    {o.invites.length} {o.invites.length === 1 ? "company" : "companies"}
                  </span>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {o.invites.map((inv) => (
                    <li key={inv.grantId}>
                      <Link
                        href={`/admin/companies/${inv.clientSlug}`}
                        className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1 text-xs text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)]"
                      >
                        {inv.clientName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-16 text-center">
            <Users className="mx-auto h-10 w-10 text-[var(--color-warm-gray-light)]" />
            <p className="mt-4 text-sm font-medium text-[var(--color-charcoal)]">No owners yet</p>
            <p className="mt-1 text-xs text-[var(--color-warm-gray)]">
              Share a company with someone via the company detail page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
