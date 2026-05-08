"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, FileBarChart2, X, Loader2, ChevronDown } from "lucide-react";

type ReportStatus = "draft" | "published" | "archived";
type ReportVisibility = "public" | "unlisted" | "private" | "client_only";

export type ReportRow = {
  id: string;
  client_name: string;
  client_slug: string;
  client_url: string;
  report_month: string;
  status: ReportStatus;
  visibility: ReportVisibility;
  created_at: string;
  published_at: string | null;
  grader_data: { overallScore?: number } | null;
};

const statusColors: Record<ReportStatus, string> = {
  draft: "bg-amber-100 text-amber-700",
  published: "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-600",
};

const visibilityColors: Record<ReportVisibility, string> = {
  public: "bg-blue-100 text-blue-700",
  unlisted: "bg-slate-100 text-slate-700",
  private: "bg-rose-100 text-rose-700",
  client_only: "bg-violet-100 text-violet-700",
};

const visibilityLabels: Record<ReportVisibility, string> = {
  public: "Public",
  unlisted: "Unlisted",
  private: "Private",
  client_only: "Client Only",
};

const visibilityDescriptions: Record<ReportVisibility, string> = {
  public: "Visible to everyone with the link",
  unlisted: "Direct link only, not surfaced anywhere",
  private: "Hidden — team-only via /admin",
  client_only: "Team + clients with email-granted portal access",
};

const STATUSES: ReportStatus[] = ["draft", "published", "archived"];
const VISIBILITIES: ReportVisibility[] = ["public", "unlisted", "private", "client_only"];

export function ReportsBulkTable({
  reports,
  searchQuery,
}: {
  reports: ReportRow[];
  searchQuery: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [working, setWorking] = useState(false);
  const [rowWorking, setRowWorking] = useState<Set<string>>(new Set());
  const [openMenu, setOpenMenu] = useState<string | null>(null); // `${id}:status` or `${id}:visibility`

  const allSelected = useMemo(
    () => reports.length > 0 && selected.size === reports.length,
    [reports.length, selected.size]
  );
  const someSelected = selected.size > 0 && !allSelected;

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) =>
      prev.size === reports.length ? new Set() : new Set(reports.map((r) => r.id))
    );
  }

  function clearSelection() {
    setSelected(new Set());
  }

  async function patchReport(id: string, body: Record<string, unknown>) {
    setRowWorking((prev) => new Set(prev).add(id));
    const res = await fetch(`/api/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setRowWorking((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error ?? "Update failed");
      return;
    }
    router.refresh();
  }

  async function applyBulk(body: Record<string, unknown>, label: string) {
    if (selected.size === 0) return;
    if (!confirm(`Apply ${label} to ${selected.size} report${selected.size === 1 ? "" : "s"}?`)) {
      return;
    }
    setWorking(true);
    const ids = Array.from(selected);
    const results = await Promise.allSettled(
      ids.map((id) =>
        fetch(`/api/reports/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then((r) => {
          if (!r.ok) throw new Error(`${id}: ${r.status}`);
          return r.json();
        })
      )
    );
    setWorking(false);
    const failures = results.filter((r) => r.status === "rejected");
    if (failures.length > 0) {
      alert(`${failures.length} update(s) failed. Check console for details.`);
      console.error("Bulk update failures:", failures);
    }
    clearSelection();
    router.refresh();
  }

  if (reports.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
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
      </div>
    );
  }

  return (
    <>
      {/* Bulk action toolbar */}
      {selected.size > 0 && (
        <div className="sticky top-0 z-10 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] px-4 py-3 text-white shadow-lg">
          <button
            onClick={clearSelection}
            className="rounded-md p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            title="Clear selection"
          >
            <X className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium">
            {selected.size} selected
          </span>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <BulkMenu
              label="Set visibility"
              disabled={working}
              options={VISIBILITIES.map((v) => ({
                key: v,
                label: visibilityLabels[v],
                onClick: () => applyBulk({ visibility: v }, `visibility "${visibilityLabels[v]}"`),
              }))}
            />
            <BulkMenu
              label="Set status"
              disabled={working}
              options={STATUSES.map((s) => ({
                key: s,
                label: s.charAt(0).toUpperCase() + s.slice(1),
                onClick: () => applyBulk({ status: s }, `status "${s}"`),
              }))}
            />
            {working && <Loader2 className="h-4 w-4 animate-spin text-white/80" />}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="w-12 px-4 py-3">
                <SelectAllCell
                  allSelected={allSelected}
                  someSelected={someSelected}
                  onToggle={toggleAll}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                Month
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] lg:table-cell">
                Website
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] sm:table-cell">
                Grade
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] sm:table-cell">
                Status
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] md:table-cell">
                Visibility
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
            {reports.map((report, index) => {
              const score = report.grader_data?.overallScore ?? null;
              const scoreColor =
                score === null
                  ? "text-[var(--color-warm-gray-light)]"
                  : score >= 70
                  ? "text-green-600"
                  : score >= 40
                  ? "text-amber-600"
                  : "text-red-600";
              const isSelected = selected.has(report.id);
              const isRowBusy = rowWorking.has(report.id);
              return (
                <tr
                  key={report.id}
                  className={`transition-colors ${
                    isSelected ? "bg-[var(--color-cream)]" : "hover:bg-[var(--color-cream)]"
                  }`}
                >
                  <td className="px-4 py-4">
                    <IndexCheckboxCell
                      index={index + 1}
                      checked={isSelected}
                      onToggle={() => toggleOne(report.id)}
                      label={report.client_name}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/reports/${report.id}`}
                      className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-accent)]"
                    >
                      {report.client_name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-charcoal)]">
                    {new Date(report.report_month).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="hidden px-6 py-4 lg:table-cell">
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
                    <ChipDropdown
                      open={openMenu === `${report.id}:status`}
                      onOpenChange={(o) =>
                        setOpenMenu(o ? `${report.id}:status` : null)
                      }
                      busy={isRowBusy}
                      chipClassName={`${
                        statusColors[report.status] ?? statusColors.draft
                      } capitalize`}
                      label={report.status}
                      title={`Click to change status (${report.status})`}
                      options={STATUSES.map((s) => ({
                        key: s,
                        label: s.charAt(0).toUpperCase() + s.slice(1),
                        active: s === report.status,
                        onClick: () => patchReport(report.id, { status: s }),
                      }))}
                    />
                  </td>
                  <td className="hidden px-6 py-4 md:table-cell">
                    <ChipDropdown
                      open={openMenu === `${report.id}:visibility`}
                      onOpenChange={(o) =>
                        setOpenMenu(o ? `${report.id}:visibility` : null)
                      }
                      busy={isRowBusy}
                      chipClassName={
                        visibilityColors[report.visibility] ?? visibilityColors.public
                      }
                      label={visibilityLabels[report.visibility] ?? report.visibility}
                      title={`Click to change visibility (${
                        visibilityLabels[report.visibility]
                      })`}
                      menuWidth={260}
                      options={VISIBILITIES.map((v) => ({
                        key: v,
                        label: visibilityLabels[v],
                        description: visibilityDescriptions[v],
                        active: v === report.visibility,
                        onClick: () => patchReport(report.id, { visibility: v }),
                      }))}
                    />
                  </td>
                  <td className="hidden px-6 py-4 lg:table-cell">
                    <span className="text-sm text-[var(--color-warm-gray-light)]">
                      {new Date(report.published_at ?? report.created_at).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {report.status === "published" &&
                        (report.visibility === "public" || report.visibility === "unlisted") && (
                          <a
                            href={`/report/${report.client_slug}/${report.report_month.slice(0, 7)}`}
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
                        Manage
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function IndexCheckboxCell({
  index,
  checked,
  onToggle,
  label,
}: {
  index: number;
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  // When checked, always show the checkbox.
  // When unchecked, show the index number; on hover, swap to a checkbox.
  return (
    <div className="group relative flex h-5 w-5 items-center justify-center">
      {!checked && (
        <span className="text-xs font-medium tabular-nums text-[var(--color-warm-gray-light)] transition-opacity group-hover:opacity-0">
          {index}
        </span>
      )}
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        aria-label={`Select ${label}`}
        className={`absolute inset-0 m-auto h-4 w-4 cursor-pointer rounded border-[var(--color-border)] accent-[var(--color-charcoal)] transition-opacity ${
          checked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
    </div>
  );
}

function SelectAllCell({
  allSelected,
  someSelected,
  onToggle,
}: {
  allSelected: boolean;
  someSelected: boolean;
  onToggle: () => void;
}) {
  const checked = allSelected || someSelected;
  return (
    <div className="group relative flex h-5 w-5 items-center justify-center">
      {!checked && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray-light)] transition-opacity group-hover:opacity-0">
          #
        </span>
      )}
      <input
        type="checkbox"
        checked={allSelected}
        ref={(el) => {
          if (el) el.indeterminate = someSelected;
        }}
        onChange={onToggle}
        aria-label="Select all reports"
        className={`absolute inset-0 m-auto h-4 w-4 cursor-pointer rounded border-[var(--color-border)] accent-[var(--color-charcoal)] transition-opacity ${
          checked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
    </div>
  );
}

type ChipOption = {
  key: string;
  label: string;
  description?: string;
  active?: boolean;
  onClick: () => void;
};

function ChipDropdown({
  open,
  onOpenChange,
  busy,
  chipClassName,
  label,
  title,
  options,
  menuWidth = 180,
  align = "left",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  busy?: boolean;
  chipClassName: string;
  label: string;
  title?: string;
  options: ChipOption[];
  menuWidth?: number;
  align?: "left" | "right";
}) {
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        disabled={busy}
        title={title}
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-opacity hover:opacity-80 disabled:opacity-50 ${chipClassName}`}
      >
        {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
        {label}
        <ChevronDown className="h-3 w-3 opacity-70" />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => onOpenChange(false)}
          />
          <div
            className={`absolute top-full z-50 mt-1 rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-xl ${
              align === "right" ? "right-0" : "left-0"
            }`}
            style={{ minWidth: menuWidth }}
          >
            {options.map((o) => (
              <button
                key={o.key}
                type="button"
                disabled={o.active}
                onClick={() => {
                  onOpenChange(false);
                  if (!o.active) o.onClick();
                }}
                className={`group flex w-full flex-col items-start gap-0.5 border-l-4 px-3 py-2 text-left text-sm transition-colors disabled:cursor-default ${
                  o.active
                    ? "border-[var(--color-charcoal)] bg-[var(--color-cream-dark)] text-[var(--color-charcoal)]"
                    : "border-transparent text-[var(--color-charcoal)] hover:border-[#43403D] hover:bg-[#43403D] hover:text-[#FAFAF8]"
                }`}
              >
                <span className="flex w-full items-center justify-between gap-2 font-medium">
                  <span>{o.label}</span>
                  {o.active && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray)] group-hover:text-[#D4D0CB]">
                      Current
                    </span>
                  )}
                </span>
                {o.description && (
                  <span className="text-xs font-normal leading-snug text-[var(--color-warm-gray)] group-hover:text-[#D4D0CB]">
                    {o.description}
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function BulkMenu({
  label,
  options,
  disabled,
}: {
  label: string;
  options: { key: string; label: string; onClick: () => void }[];
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-50"
      >
        {label}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-1 min-w-[160px] overflow-hidden rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-xl">
            {options.map((o) => (
              <button
                key={o.key}
                onClick={() => {
                  setOpen(false);
                  o.onClick();
                }}
                className="block w-full border-l-4 border-transparent px-3 py-2 text-left text-sm font-medium text-[var(--color-charcoal)] transition-colors hover:border-[#43403D] hover:bg-[#43403D] hover:text-[#FAFAF8]"
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
