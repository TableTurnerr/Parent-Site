"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Loader2, Archive, ArchiveRestore, Eye, EyeOff } from "lucide-react";

type SubmissionStatus = "new" | "read" | "archived";

export type SiteSubmissionRow = {
  id: string;
  form_type: string;
  payload: unknown;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  source: string;
  status: SubmissionStatus;
  created_at: string;
  read_at: string | null;
  location_name: string | null;
  location_slug: string | null;
};

const statusColors: Record<SubmissionStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-gray-100 text-gray-600",
  archived: "bg-slate-100 text-slate-500",
};

const FORM_TYPE_COLORS: Record<string, string> = {
  contact: "bg-violet-100 text-violet-700",
  catering: "bg-rose-100 text-rose-700",
  reservation: "bg-emerald-100 text-emerald-700",
  feedback: "bg-amber-100 text-amber-700",
};

function formTypeChip(t: string) {
  return FORM_TYPE_COLORS[t.toLowerCase()] ?? "bg-[var(--color-cream-dark)] text-[var(--color-warm-gray)]";
}

function payloadPreviewFields(payload: unknown): Array<[string, string]> {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return [];
  const entries = Object.entries(payload as Record<string, unknown>);
  return entries.slice(0, 3).map(([k, v]) => {
    let display: string;
    if (v === null || v === undefined) display = "—";
    else if (typeof v === "string") display = v;
    else if (typeof v === "number" || typeof v === "boolean") display = String(v);
    else display = JSON.stringify(v);
    if (display.length > 80) display = display.slice(0, 80) + "…";
    return [k, display];
  });
}

export function SiteSubmissionsTable({
  clientId,
  submissions: initial,
}: {
  clientId: string;
  submissions: SiteSubmissionRow[];
}) {
  const [rows, setRows] = useState<SiteSubmissionRow[]>(initial);
  const [working, setWorking] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function patchStatus(submissionId: string, status: SubmissionStatus) {
    const before = rows.find((r) => r.id === submissionId);
    if (!before) return;

    setRows((prev) =>
      prev.map((r) =>
        r.id === submissionId
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
    setWorking((prev) => new Set(prev).add(submissionId));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[submissionId];
      return next;
    });

    try {
      const res = await fetch(`/api/clients/${clientId}/site-submissions/${submissionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Update failed (${res.status})`);
      }
    } catch (e) {
      setRows((prev) => prev.map((r) => (r.id === submissionId ? before : r)));
      setErrors((prev) => ({
        ...prev,
        [submissionId]: e instanceof Error ? e.message : String(e),
      }));
    } finally {
      setWorking((prev) => {
        const next = new Set(prev);
        next.delete(submissionId);
        return next;
      });
    }
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-white px-6 py-16 text-center">
        <p className="text-sm font-medium text-[var(--color-charcoal)]">No submissions yet.</p>
        <p className="mt-1 text-xs text-[var(--color-warm-gray)]">
          External sites POST to{" "}
          <code className="rounded bg-[var(--color-cream-dark)] px-1.5 py-0.5 font-mono">
            /api/ingest/form-submissions
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
              Form
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Created
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Contact
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
              Payload
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
          {rows.map((s) => {
            const busy = working.has(s.id);
            const err = errors[s.id];
            const previewFields = payloadPreviewFields(s.payload);
            return (
              <tr key={s.id} className="align-top hover:bg-[var(--color-cream)]">
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${formTypeChip(s.form_type)}`}
                  >
                    {s.form_type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-sm text-[var(--color-charcoal)]">
                  {new Date(s.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  <p className="text-xs text-[var(--color-warm-gray-light)]">
                    {new Date(s.created_at).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </td>
                <td className="px-6 py-3">
                  <div className="text-sm font-medium text-[var(--color-charcoal)]">
                    {s.contact_name ?? <span className="text-[var(--color-warm-gray-light)]">—</span>}
                  </div>
                  {s.contact_email && (
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-[var(--color-warm-gray)]">
                      <Mail className="h-3 w-3" />
                      <a
                        href={`mailto:${s.contact_email}`}
                        className="hover:text-[var(--color-charcoal)]"
                      >
                        {s.contact_email}
                      </a>
                    </div>
                  )}
                  {s.contact_phone && (
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-[var(--color-warm-gray)]">
                      <Phone className="h-3 w-3" />
                      {s.contact_phone}
                    </div>
                  )}
                </td>
                <td className="max-w-md px-6 py-3">
                  {previewFields.length === 0 ? (
                    <span className="text-xs text-[var(--color-warm-gray-light)]">—</span>
                  ) : (
                    <dl className="space-y-0.5 text-xs">
                      {previewFields.map(([k, v]) => (
                        <div key={k} className="flex gap-2">
                          <dt className="shrink-0 font-medium text-[var(--color-warm-gray)]">{k}:</dt>
                          <dd className="break-words text-[var(--color-charcoal)]">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <details className="mt-2 text-xs text-[var(--color-warm-gray)]">
                    <summary className="cursor-pointer hover:text-[var(--color-charcoal)]">
                      View full payload
                    </summary>
                    <pre className="mt-1 max-h-72 overflow-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-2 font-mono text-[11px] leading-relaxed text-[var(--color-charcoal)]">
                      {JSON.stringify(s.payload, null, 2)}
                    </pre>
                  </details>
                </td>
                <td className="hidden px-6 py-3 md:table-cell">
                  {s.location_name ? (
                    <span className="inline-flex items-center gap-1 text-sm text-[var(--color-charcoal)]">
                      <MapPin className="h-3 w-3 text-[var(--color-warm-gray)]" />
                      {s.location_name}
                    </span>
                  ) : (
                    <span className="text-sm text-[var(--color-warm-gray-light)]">—</span>
                  )}
                </td>
                <td className="hidden px-6 py-3 lg:table-cell">
                  <span className="inline-flex rounded-full bg-[var(--color-cream-dark)] px-2 py-0.5 text-xs font-medium text-[var(--color-warm-gray)]">
                    {s.source}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[s.status]}`}
                  >
                    {busy && <Loader2 className="h-3 w-3 animate-spin" />}
                    {s.status}
                  </span>
                  {err && (
                    <p className="mt-1 max-w-[180px] text-xs text-red-600">{err}</p>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right">
                  <RowActions
                    status={s.status}
                    busy={busy}
                    onMarkRead={() => patchStatus(s.id, "read")}
                    onMarkNew={() => patchStatus(s.id, "new")}
                    onArchive={() => patchStatus(s.id, "archived")}
                    onUnarchive={() => patchStatus(s.id, "new")}
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

function RowActions({
  status,
  busy,
  onMarkRead,
  onMarkNew,
  onArchive,
  onUnarchive,
}: {
  status: SubmissionStatus;
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
