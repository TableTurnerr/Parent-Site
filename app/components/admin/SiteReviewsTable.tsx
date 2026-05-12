"use client";

import { useState, useMemo } from "react";
import { Star, Mail, Phone, MapPin, Loader2, Archive, ArchiveRestore, Eye, EyeOff } from "lucide-react";

type ReviewStatus = "new" | "read" | "archived";

export type SiteReviewRow = {
  id: string;
  rating: number;
  feedback: string;
  reviewer_name: string;
  reviewer_email: string | null;
  reviewer_phone: string | null;
  source: string;
  status: ReviewStatus;
  created_at: string;
  read_at: string | null;
  location_name: string | null;
  location_slug: string | null;
};

const statusColors: Record<ReviewStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-gray-100 text-gray-600",
  archived: "bg-slate-100 text-slate-500",
};

const FEEDBACK_PREVIEW_LIMIT = 200;

export function SiteReviewsTable({
  clientId,
  reviews: initial,
}: {
  clientId: string;
  reviews: SiteReviewRow[];
}) {
  const [rows, setRows] = useState<SiteReviewRow[]>(initial);
  const [working, setWorking] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  async function patchStatus(reviewId: string, status: ReviewStatus) {
    const before = rows.find((r) => r.id === reviewId);
    if (!before) return;

    setRows((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              status,
              read_at:
                status === "read"
                  ? new Date().toISOString()
                  : status === "new"
                  ? null
                  : r.read_at,
            }
          : r,
      ),
    );
    setWorking((prev) => new Set(prev).add(reviewId));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[reviewId];
      return next;
    });

    try {
      const res = await fetch(`/api/clients/${clientId}/site-reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Update failed (${res.status})`);
      }
    } catch (e) {
      setRows((prev) => prev.map((r) => (r.id === reviewId ? before : r)));
      setErrors((prev) => ({
        ...prev,
        [reviewId]: e instanceof Error ? e.message : String(e),
      }));
    } finally {
      setWorking((prev) => {
        const next = new Set(prev);
        next.delete(reviewId);
        return next;
      });
    }
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const sourceChips = useMemo(() => {
    const m = new Map<string, string>();
    for (const r of rows) {
      if (!m.has(r.source)) m.set(r.source, r.source);
    }
    return m;
  }, [rows]);

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-white px-6 py-16 text-center">
        <p className="text-sm font-medium text-[var(--color-charcoal)]">No reviews yet.</p>
        <p className="mt-1 text-xs text-[var(--color-warm-gray)]">
          External sites POST to{" "}
          <code className="rounded bg-[var(--color-cream-dark)] px-1.5 py-0.5 font-mono">
            /api/ingest/reviews
          </code>{" "}
          to land here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white">
      <table className="w-full min-w-full">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Rating
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Created
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Reviewer
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Feedback
            </th>
            <th className="hidden px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] md:table-cell">
              Location
            </th>
            <th className="hidden px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] lg:table-cell">
              Source
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Status
            </th>
            <th className="px-6 py-2 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {rows.map((r) => {
            const isLong = r.feedback.length > FEEDBACK_PREVIEW_LIMIT;
            const isExpanded = expanded.has(r.id);
            const busy = working.has(r.id);
            const err = errors[r.id];
            return (
              <tr key={r.id} className="align-top hover:bg-[var(--color-cream)]">
                <td className="px-6 py-3">
                  <StarRating value={r.rating} />
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-sm text-[var(--color-charcoal)]">
                  {new Date(r.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  <p className="text-xs text-[var(--color-warm-gray-light)]">
                    {new Date(r.created_at).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </td>
                <td className="px-6 py-3">
                  <div className="text-sm font-medium text-[var(--color-charcoal)]">
                    {r.reviewer_name}
                  </div>
                  {r.reviewer_email && (
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-[var(--color-warm-gray)]">
                      <Mail className="h-3 w-3" />
                      <a
                        href={`mailto:${r.reviewer_email}`}
                        className="hover:text-[var(--color-charcoal)]"
                      >
                        {r.reviewer_email}
                      </a>
                    </div>
                  )}
                  {r.reviewer_phone && (
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-[var(--color-warm-gray)]">
                      <Phone className="h-3 w-3" />
                      {r.reviewer_phone}
                    </div>
                  )}
                </td>
                <td className="max-w-md px-6 py-3">
                  <p className="whitespace-pre-wrap break-words text-sm text-[var(--color-charcoal)]">
                    {isLong && !isExpanded
                      ? r.feedback.slice(0, FEEDBACK_PREVIEW_LIMIT) + "…"
                      : r.feedback}
                  </p>
                  {isLong && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(r.id)}
                      className="mt-1 text-xs font-medium text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </td>
                <td className="hidden px-6 py-3 md:table-cell">
                  {r.location_name ? (
                    <span className="inline-flex items-center gap-1 text-sm text-[var(--color-charcoal)]">
                      <MapPin className="h-3 w-3 text-[var(--color-warm-gray)]" />
                      {r.location_name}
                    </span>
                  ) : (
                    <span className="text-sm text-[var(--color-warm-gray-light)]">—</span>
                  )}
                </td>
                <td className="hidden px-6 py-3 lg:table-cell">
                  <span className="inline-flex rounded-full bg-[var(--color-cream-dark)] px-2 py-0.5 text-xs font-medium text-[var(--color-warm-gray)]">
                    {sourceChips.get(r.source) ?? r.source}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[r.status]}`}
                  >
                    {busy && <Loader2 className="h-3 w-3 animate-spin" />}
                    {r.status}
                  </span>
                  {err && (
                    <p className="mt-1 max-w-[180px] text-xs text-red-600">{err}</p>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right">
                  <RowActions
                    status={r.status}
                    busy={busy}
                    onMarkRead={() => patchStatus(r.id, "read")}
                    onMarkNew={() => patchStatus(r.id, "new")}
                    onArchive={() => patchStatus(r.id, "archived")}
                    onUnarchive={() => patchStatus(r.id, "new")}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StarRating({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, value));
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${v} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= v
              ? "fill-amber-400 text-amber-400"
              : "text-[var(--color-warm-gray-light)]"
          }`}
        />
      ))}
      <span className="ml-1 text-xs font-medium tabular-nums text-[var(--color-warm-gray)]">
        {v}/5
      </span>
    </div>
  );
}

function RowActions({
  status,
  busy,
  onMarkRead,
  onMarkNew,
  onArchive,
  onUnarchive,
}: {
  status: ReviewStatus;
  busy: boolean;
  onMarkRead: () => void;
  onMarkNew: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
}) {
  return (
    <div className="inline-flex items-center justify-end gap-1">
      {status === "new" && (
        <ActionBtn busy={busy} onClick={onMarkRead} icon={<Eye className="h-3.5 w-3.5" />} label="Mark read" />
      )}
      {status === "read" && (
        <ActionBtn busy={busy} onClick={onMarkNew} icon={<EyeOff className="h-3.5 w-3.5" />} label="Mark new" />
      )}
      {status !== "archived" && (
        <ActionBtn busy={busy} onClick={onArchive} icon={<Archive className="h-3.5 w-3.5" />} label="Archive" />
      )}
      {status === "archived" && (
        <ActionBtn
          busy={busy}
          onClick={onUnarchive}
          icon={<ArchiveRestore className="h-3.5 w-3.5" />}
          label="Unarchive"
        />
      )}
    </div>
  );
}

function ActionBtn({
  busy,
  onClick,
  icon,
  label,
}: {
  busy: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)] disabled:opacity-50"
    >
      {icon}
      {label}
    </button>
  );
}
