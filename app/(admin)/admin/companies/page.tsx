import { createClient } from "@/app/lib/supabase/server";
import { CompaniesBulkTable, type CompanyRow } from "@/app/components/admin/CompaniesBulkTable";

type ClientStatus = "prospect" | "client" | "template";

export default async function CompaniesPage() {
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, slug, url, primary_contact_email, status, created_at")
    .order("name");

  // Counts: reports + active grants + locations per client
  const ids = (clients ?? []).map((c) => c.id);
  const reportCounts = new Map<string, number>();
  const grantCounts = new Map<string, number>();
  const locationCounts = new Map<string, number>();
  if (ids.length) {
    const { data: reports } = await supabase
      .from("client_reports")
      .select("client_id")
      .in("client_id", ids);
    for (const r of reports ?? []) {
      reportCounts.set(r.client_id, (reportCounts.get(r.client_id) ?? 0) + 1);
    }
    const { data: grants } = await supabase
      .from("client_access")
      .select("client_id, revoked_at")
      .in("client_id", ids)
      .is("revoked_at", null);
    for (const g of grants ?? []) {
      grantCounts.set(g.client_id, (grantCounts.get(g.client_id) ?? 0) + 1);
    }
    const { data: locations } = await supabase
      .from("locations")
      .select("client_id")
      .in("client_id", ids);
    for (const l of locations ?? []) {
      locationCounts.set(l.client_id, (locationCounts.get(l.client_id) ?? 0) + 1);
    }
  }

  const rows: CompanyRow[] = (clients ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    url: c.url,
    status: (c.status as ClientStatus) ?? "prospect",
    reportCount: reportCounts.get(c.id) ?? 0,
    ownerCount: grantCounts.get(c.id) ?? 0,
    locationCount: locationCounts.get(c.id) ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-charcoal)]">Prospects &amp; Clients</h1>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
            Every restaurant we work with starts as a <strong>prospect</strong>. Promote a prospect to <strong>client</strong> once they sign on, and only clients show up in the wireframe tool. Use the tabs below to filter.
          </p>
        </div>
      </div>

      <CompaniesBulkTable companies={rows} />
    </div>
  );
}
