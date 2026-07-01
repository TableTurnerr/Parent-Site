"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, ChevronDown, ScrollText } from "lucide-react";
import { LogLevelBadge } from "./LogLevelBadge";
import type { Tables } from "@/app/lib/supabase/types";

export type LogRow = Tables<"system_logs">;

type Filters = { service: string; level: string; q: string; since: string };
type ServiceOption = { key: string; name: string };

const LEVEL_TABS: { key: string; label: string }[] = [
  { key: "", label: "All" },
  { key: "debug", label: "Debug" },
  { key: "info", label: "Info" },
  { key: "warn", label: "Warn" },
  { key: "error", label: "Error" },
  { key: "fatal", label: "Fatal" },
];

const SINCE_TABS: { key: string; label: string }[] = [
  { key: "1h", label: "Last hour" },
  { key: "24h", label: "24 hours" },
  { key: "7d", label: "7 days" },
];

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return iso;
  const sec = Math.round((Date.now() - then) / 1000);
  if (sec < 0) return "just now";
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const days = Math.round(hr / 24);
  return `${days}d ago`;
}

function buildHref(
  filters: Filters,
  page: number,
  overrides: Partial<Filters>
): string {
  const merged = { ...filters, ...overrides };
  const params = new URLSearchParams();
  if (merged.service) params.set("service", merged.service);
  if (merged.level) params.set("level", merged.level);
  if (merged.q) params.set("q", merged.q);
  if (merged.since && merged.since !== "24h") params.set("since", merged.since);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/admin/logs${qs ? `?${qs}` : ""}`;
}

const pagerEnabled =
  "rounded-lg border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream-dark)]";
const pagerDisabled =
  "rounded-lg border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray-light)] opacity-50";

export function LogsTable({
  rows,
  count,
  page,
  pageSize,
  filters,
  serviceOptions,
}: {
  rows: LogRow[];
  count: number;
  page: number;
  pageSize: number;
  filters: Filters;
  serviceOptions: ServiceOption[];
}) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const from = count === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, count);

  function toggle(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 overflow-x-auto rounded-lg bg-[var(--color-cream-dark)] p-1">
            {LEVEL_TABS.map((tab) => (
              <Link
                key={tab.key || "all"}
                href={buildHref(filters, 1, { level: tab.key })}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  filters.level === tab.key
                    ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                    : "text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          <div className="flex gap-1 rounded-lg bg-[var(--color-cream-dark)] p-1">
            {SINCE_TABS.map((tab) => (
              <Link
                key={tab.key}
                href={buildHref(filters, 1, { since: tab.key })}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  filters.since === tab.key
                    ? "bg-white text-[var(--color-charcoal)] shadow-sm"
                    : "text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          <select
            value={filters.service}
            onChange={(e) =>
              router.push(buildHref(filters, 1, { service: e.target.value }))
            }
            aria-label="Filter by service"
            className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
          >
            <option value="">All services</option>
            {serviceOptions.map((s) => (
              <option key={s.key} value={s.key}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <form action="/admin/logs" className="relative">
          {filters.service && (
            <input type="hidden" name="service" value={filters.service} />
          )}
          {filters.level && (
            <input type="hidden" name="level" value={filters.level} />
          )}
          {filters.since !== "24h" && (
            <input type="hidden" name="since" value={filters.since} />
          )}
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-warm-gray-light)]" />
          <input
            type="search"
            name="q"
            defaultValue={filters.q}
            placeholder="Search messages..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2 pl-10 pr-4 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none sm:w-64"
          />
        </form>
      </div>

      {/* Table */}
      {rows.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-white">
          <div className="px-6 py-16 text-center">
            <ScrollText className="mx-auto h-10 w-10 text-[var(--color-warm-gray-light)]" />
            <p className="mt-4 text-sm font-medium text-[var(--color-charcoal)]">
              No logs found
            </p>
            <p className="mt-1 text-xs text-[var(--color-warm-gray)]">
              Try widening the time range or clearing the filters.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="w-8 px-4 py-2" />
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Time
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Level
                </th>
                <th className="hidden px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] sm:table-cell">
                  Service
                </th>
                <th className="hidden px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] md:table-cell">
                  Event
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {rows.map((row) => {
                const isOpen = expanded.has(row.id);
                return (
                  <Fragment key={row.id}>
                    <tr
                      onClick={() => toggle(row.id)}
                      className="cursor-pointer transition-colors hover:bg-[var(--color-cream)]"
                    >
                      <td className="px-4 py-2 align-top">
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4 text-[var(--color-warm-gray)]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[var(--color-warm-gray)]" />
                        )}
                      </td>
                      <td
                        className="whitespace-nowrap px-4 py-2 align-top text-sm text-[var(--color-warm-gray)]"
                        title={row.created_at}
                      >
                        {relativeTime(row.created_at)}
                      </td>
                      <td className="px-4 py-2 align-top">
                        <LogLevelBadge level={row.level} />
                      </td>
                      <td className="hidden px-4 py-2 align-top text-sm text-[var(--color-charcoal)] sm:table-cell">
                        {row.service_key}
                      </td>
                      <td className="hidden px-4 py-2 align-top text-sm text-[var(--color-warm-gray)] md:table-cell">
                        {row.event ?? "—"}
                      </td>
                      <td className="px-4 py-2 align-top text-sm text-[var(--color-charcoal)]">
                        <span
                          className="block max-w-md truncate"
                          title={row.message}
                        >
                          {row.message}
                        </span>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="bg-[var(--color-cream)]">
                        <td colSpan={6} className="px-4 pb-4">
                          <div className="space-y-2">
                            <p className="text-xs text-[var(--color-warm-gray)] sm:hidden">
                              {row.service_key}
                              {row.event ? ` · ${row.event}` : ""}
                            </p>
                            <pre className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white p-4 text-xs leading-relaxed text-[var(--color-charcoal)]">
                              {JSON.stringify(row.context ?? {}, null, 2)}
                            </pre>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pager */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-[var(--color-warm-gray)]">
          {count === 0 ? "No results" : `Showing ${from}-${to} of ${count}`}
        </p>
        <div className="flex items-center gap-2">
          {page > 1 ? (
            <Link href={buildHref(filters, page - 1, {})} className={pagerEnabled}>
              Previous
            </Link>
          ) : (
            <span className={pagerDisabled}>Previous</span>
          )}
          <span className="text-xs tabular-nums text-[var(--color-warm-gray)]">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={buildHref(filters, page + 1, {})} className={pagerEnabled}>
              Next
            </Link>
          ) : (
            <span className={pagerDisabled}>Next</span>
          )}
        </div>
      </div>
    </div>
  );
}
