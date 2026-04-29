import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { FileBarChart2, Search, ExternalLink, Copy } from "lucide-react";

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
    .select("id, client_name, client_slug, client_url, status, created_at, published_at, grader_data")
    .order("created_at", { ascending: false });

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

  const statusColors: Record<string, string> = {
    draft: "bg-amber-100 text-amber-700",
    published: "bg-green-100 text-green-700",
    archived: "bg-gray-100 text-gray-600",
  };

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
            in Claude to create new ones.
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

      {/* Reports table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-x-auto">
        {reports && reports.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Client
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] md:table-cell">
                  Website
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] sm:table-cell">
                  Grade
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] sm:table-cell">
                  Status
                </th>
                <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] lg:table-cell">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {reports.map((report) => {
                const grader = report.grader_data as { overallScore?: number } | null;
                const score = grader?.overallScore ?? null;
                const scoreColor =
                  score === null
                    ? "text-[var(--color-warm-gray-light)]"
                    : score >= 70
                    ? "text-green-600"
                    : score >= 40
                    ? "text-amber-600"
                    : "text-red-600";

                return (
                  <tr
                    key={report.id}
                    className="transition-colors hover:bg-[var(--color-cream)]"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/reports/${report.id}`}
                        className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-accent)]"
                      >
                        {report.client_name}
                      </Link>
                    </td>
                    <td className="hidden px-6 py-4 md:table-cell">
                      <a
                        href={`https://${report.client_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
                      >
                        {report.client_url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <span className={`text-sm font-semibold tabular-nums ${scoreColor}`}>
                        {score !== null ? `${score}/100` : "—"}
                      </span>
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          statusColors[report.status] ?? statusColors.draft
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="hidden px-6 py-4 lg:table-cell">
                      <span className="text-sm text-[var(--color-warm-gray-light)]">
                        {new Date(report.published_at ?? report.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {report.status === "published" && (
                          <a
                            href={`/report/${report.client_slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-1.5 text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
                            title="View public report"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <Link
                          href={`/admin/reports/${report.id}`}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-16 text-center">
            <FileBarChart2 className="mx-auto h-10 w-10 text-[var(--color-warm-gray-light)]" />
            <p className="mt-4 text-sm font-medium text-[var(--color-charcoal)]">
              {searchQuery ? `No reports found for "${searchQuery}"` : "No reports yet"}
            </p>
            <p className="mt-1 text-xs text-[var(--color-warm-gray)]">
              Run{" "}
              <code className="rounded bg-[var(--color-cream-dark)] px-1 py-0.5 font-mono">
                /generate-client-report
              </code>{" "}
              in Claude to create your first report.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
