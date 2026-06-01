import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import AssignCompanyForm from "@/app/components/admin/AssignCompanyForm";
import AddOwnerForm from "@/app/components/admin/AddOwnerForm";
import AddOwnerLauncher from "@/app/components/admin/AddOwnerLauncher";

interface OwnerRow {
  email: string;
  joinedAt: string | null;
  hasProfile: boolean;
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

  const [{ data: grants }, { data: clientProfiles }, { data: companies }] = await Promise.all([
    supabase
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
      .order("invited_at", { ascending: false }),
    supabase
      .from("profiles")
      .select("id, email, created_at")
      .eq("role", "client"),
    supabase
      .from("clients")
      .select("id, name")
      .order("name", { ascending: true }),
  ]);

  // Group by email, starting with all client-role profiles so users without
  // any active grant still appear.
  const byEmail = new Map<string, OwnerRow>();
  for (const p of clientProfiles ?? []) {
    if (!p.email) continue;
    byEmail.set(p.email, {
      email: p.email,
      joinedAt: p.created_at,
      hasProfile: true,
      invites: [],
    });
  }

  for (const g of grants ?? []) {
    const existing = byEmail.get(g.email) ?? {
      email: g.email,
      joinedAt: g.accepted_at,
      hasProfile: false,
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

  const owners = Array.from(byEmail.values()).sort((a, b) => {
    // Unassigned first, then by email alphabetically
    if (a.invites.length === 0 && b.invites.length > 0) return -1;
    if (a.invites.length > 0 && b.invites.length === 0) return 1;
    return a.email.localeCompare(b.email);
  });

  const companyList = companies ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-charcoal)]">Owners</h1>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
            People with portal access — including clients not yet assigned to a company.
          </p>
        </div>
        {owners.length > 0 && companyList.length > 0 && (
          <AddOwnerLauncher companies={companyList} />
        )}
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        {owners.length > 0 ? (
          <ul className="divide-y divide-[var(--color-border)]">
            {owners.map((o) => {
              const assignedIds = new Set(o.invites.map((i) => i.clientId));
              const remainingCompanies = companyList.filter((c) => !assignedIds.has(c.id));
              return (
                <li key={o.email} className="px-5 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-[var(--color-charcoal)]">{o.email}</p>
                      <p className="text-xs text-[var(--color-warm-gray-light)]">
                        {o.hasProfile
                          ? o.joinedAt
                            ? `Joined ${new Date(o.joinedAt).toLocaleDateString()}`
                            : "Signed up"
                          : o.joinedAt
                            ? `Joined ${new Date(o.joinedAt).toLocaleDateString()}`
                            : "Not yet signed in"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {o.invites.length > 0 && (
                        <span className="text-xs text-[var(--color-warm-gray)]">
                          {o.invites.length} {o.invites.length === 1 ? "company" : "companies"}
                        </span>
                      )}
                      {remainingCompanies.length > 0 && (
                        <AssignCompanyForm
                          email={o.email}
                          companies={remainingCompanies}
                          triggerLabel={o.invites.length === 0 ? "No companies" : "Assign more"}
                          className=""
                          menuAlign="right"
                        />
                      )}
                    </div>
                  </div>
                  {o.invites.length > 0 && (
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
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <AddOwnerForm companies={companyList} />
        )}
      </div>
    </div>
  );
}
