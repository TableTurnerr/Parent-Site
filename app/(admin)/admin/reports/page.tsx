import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { Search } from "lucide-react";
import { ReportsBulkTable, type ReportRow } from "@/app/components/admin/ReportsBulkTable";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const statusFilter = params.status ?? "all";
  const searchQuery = params.q ?? "";

  let query = supabase
    .from("client_reports")
    .select(
      "id, client_id, location_id, client_name, client_slug, client_url, report_month, " +
      "status, visibility, created_at, published_at, grader_data, " +
      "clients ( name, slug ), locations ( name, slug, is_primary )"
    )
    .order("report_month", { ascending: false })
    .order("client_name");

  if (statusFilter !== "all") {
    query = query.eq("status", statusFilter as "draft" | "published" | "archived");
  }

  if (searchQuery) {
    query = query.ilike("client_name", `%${searchQuery}%`);
  }

  const { data: reports } = await query;

  const statusTabs = [
    { key: "all", label: "All" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Drafts" },
    { key: "archived", label: "Archived" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-charcoal)]">
            Client Reports
          </h1>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
            SEO reports generated for clients. Use{" "}
            <code className="rounded bg-[var(--color-cream-dark)] px-1.5 py-0.5 text-xs font-mono">
              /generate-client-report
            </code>{" "}
            in Claude to create new ones. Select rows to bulk-update visibility or status.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg bg-[var(--color-cream-dark)] p-1 overflow-x-auto">
          {statusTabs.map((tab) => (
            <Link
              key={tab.key}
              href={`/admin/reports${tab.key === "all" ? "" : `?status=${tab.key}`}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                statusFilter === tab.key
                  ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                  : "text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <form className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-warm-gray-light)]" />
          <input
            type="search"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search clients..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2 pl-10 pr-4 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none sm:w-64"
          />
        </form>
      </div>

      <ReportsBulkTable
        reports={(((reports ?? []) as unknown) as Array<Record<string, unknown> & {
          clients?: { name: string; slug: string } | null;
          locations?: { name: string; slug: string; is_primary: boolean } | null;
        }>).map((r) => ({
          id: r.id as string,
          client_name: r.client_name as string,
          client_slug: r.client_slug as string,
          client_url: r.client_url as string,
          report_month: r.report_month as string,
          status: r.status as ReportRow["status"],
          visibility: r.visibility as ReportRow["visibility"],
          created_at: r.created_at as string,
          published_at: (r.published_at as string | null) ?? null,
          grader_data: (r.grader_data as ReportRow["grader_data"]) ?? null,
          company_name: r.clients?.name ?? null,
          company_slug: r.clients?.slug ?? null,
          location_name: r.locations?.name ?? null,
          location_slug: r.locations?.slug ?? null,
          is_primary_location: r.locations?.is_primary ?? null,
        }))}
        searchQuery={searchQuery}
      />
    </div>
  );
}
