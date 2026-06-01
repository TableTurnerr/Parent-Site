"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Loader2 } from "lucide-react";

type ReportStatus = "draft" | "published" | "archived";

const STATUSES: ReportStatus[] = ["draft", "published", "archived"];

const statusColors: Record<ReportStatus, string> = {
  draft: "bg-amber-100 text-amber-700",
  published: "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-600",
};

export function ReportStatusChip({
  reportId,
  status,
}: {
  reportId: string;
  status: ReportStatus;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function setStatus(next: ReportStatus) {
    setOpen(false);
    if (next === status) return;
    setBusy(true);
    const res = await fetch(`/api/reports/${reportId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setBusy(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error ?? "Update failed");
      return;
    }
    router.refresh();
  }

  return (
    <div className="inline-flex items-center gap-2">
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          disabled={busy}
          title={`Click to change status (${status})`}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium capitalize transition-opacity hover:opacity-80 disabled:opacity-50 ${statusColors[status]}`}
        >
          {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
          {status}
          <ChevronDown className="h-3 w-3 opacity-70" />
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div
              className="absolute left-0 top-full z-50 mt-1 rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-xl"
              style={{ minWidth: 180 }}
            >
              {STATUSES.map((s) => {
                const active = s === status;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={active}
                    onClick={() => setStatus(s)}
                    className={`group flex w-full flex-col items-start gap-0.5 border-l-4 px-3 py-2 text-left text-sm transition-colors disabled:cursor-default ${
                      active
                        ? "border-[var(--color-charcoal)] bg-[var(--color-cream-dark)] text-[var(--color-charcoal)]"
                        : "border-transparent text-[var(--color-charcoal)] hover:border-[#43403D] hover:bg-[#43403D] hover:text-[#FAFAF8]"
                    }`}
                  >
                    <span className="flex w-full items-center justify-between gap-2 font-medium capitalize">
                      <span>{s}</span>
                      {active && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray)] group-hover:text-[#D4D0CB]">
                          Current
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
      <Link
        href={`/admin/reports/${reportId}`}
        className="rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
      >
        Manage
      </Link>
    </div>
  );
}
