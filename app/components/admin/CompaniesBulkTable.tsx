"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Mail,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CompanyRow = {
  id: string;
  name: string;
  slug: string;
  url: string;
  reportCount: number;
  ownerCount: number;
  locationCount: number;
};

export function CompaniesBulkTable({ companies }: { companies: CompanyRow[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [working, setWorking] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [shareStep, setShareStep] = useState<"form" | "confirm" | "success">("form");
  const [shareMsg, setShareMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ email: string; count: number } | null>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  function resetShare() {
    setShareOpen(false);
    setShareStep("form");
    setShareMsg(null);
    setSuccessInfo(null);
  }

  useEffect(() => {
    if (!shareOpen) return;
    const onClick = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        resetShare();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [shareOpen]);

  const allSelected = useMemo(
    () => companies.length > 0 && selected.size === companies.length,
    [companies.length, selected.size]
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
      prev.size === companies.length ? new Set() : new Set(companies.map((c) => c.id))
    );
  }

  function clearSelection() {
    setSelected(new Set());
  }

  async function applyBulkDelete() {
    if (selected.size === 0) return;
    const count = selected.size;
    const totalReports = companies
      .filter((c) => selected.has(c.id))
      .reduce((acc, c) => acc + c.reportCount, 0);
    const totalOwners = companies
      .filter((c) => selected.has(c.id))
      .reduce((acc, c) => acc + c.ownerCount, 0);
    const tail =
      totalReports || totalOwners
        ? `\n\nThis will also delete ${totalReports} report${
            totalReports === 1 ? "" : "s"
          } and revoke ${totalOwners} owner grant${totalOwners === 1 ? "" : "s"}.`
        : "";
    if (
      !confirm(
        `Permanently delete ${count} compan${count === 1 ? "y" : "ies"}? This cannot be undone.${tail}`
      )
    ) {
      return;
    }
    setWorking(true);
    const ids = Array.from(selected);
    const results = await Promise.allSettled(
      ids.map((id) =>
        fetch(`/api/clients/${id}`, { method: "DELETE" }).then((r) => {
          if (!r.ok) throw new Error(`${id}: ${r.status}`);
          return r.json();
        })
      )
    );
    setWorking(false);
    const failures = results.filter((r) => r.status === "rejected");
    if (failures.length > 0) {
      alert(`${failures.length} delete(s) failed. Check console for details.`);
      console.error("Bulk delete failures:", failures);
    }
    clearSelection();
    router.refresh();
  }

  function reviewBulkShare(e: React.FormEvent) {
    e.preventDefault();
    setShareMsg(null);
    const trimmed = shareEmail.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setShareMsg({ kind: "err", text: "Enter a valid email." });
      return;
    }
    if (selected.size === 0) return;
    setShareEmail(trimmed);
    setShareStep("confirm");
  }

  async function confirmBulkShare() {
    const trimmed = shareEmail.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed) || selected.size === 0) return;
    const countAtSend = selected.size;
    setShareMsg(null);
    setWorking(true);
    try {
      const res = await fetch("/api/clients/share-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, clientIds: Array.from(selected) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setShareMsg({ kind: "err", text: data.error ?? "Failed" });
        setShareStep("form");
      } else if (data.alreadyGranted) {
        setSuccessInfo({ email: trimmed, count: countAtSend });
        setShareMsg({ kind: "ok", text: "This owner already had access to every selected company." });
        setShareStep("success");
        router.refresh();
      } else if (!data.emailSent) {
        setShareMsg({ kind: "err", text: "Access granted, but the invite email failed to send." });
        setShareStep("form");
      } else {
        setSuccessInfo({
          email: trimmed,
          count: typeof data.grantedCount === "number" ? data.grantedCount : countAtSend,
        });
        setShareEmail("");
        clearSelection();
        setShareStep("success");
        router.refresh();
      }
    } catch (err) {
      setShareMsg({ kind: "err", text: err instanceof Error ? err.message : String(err) });
      setShareStep("form");
    } finally {
      setWorking(false);
    }
  }

  if (companies.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-white">
        <div className="px-6 py-16 text-center">
          <Building2 className="mx-auto h-10 w-10 text-[var(--color-warm-gray-light)]" />
          <p className="mt-4 text-sm font-medium text-[var(--color-charcoal)]">No companies yet</p>
          <p className="mt-1 text-xs text-[var(--color-warm-gray)]">
            Run{" "}
            <code className="rounded bg-[var(--color-cream-dark)] px-1 py-0.5 font-mono">
              /generate-client-report
            </code>{" "}
            to create your first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {selected.size > 0 && (
        <div className="sticky top-0 z-10 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] px-4 py-3 text-white shadow-lg">
          <button
            onClick={clearSelection}
            className="rounded-md p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            title="Clear selection"
          >
            <X className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium">{selected.size} selected</span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div className="relative" ref={shareRef}>
              <button
                onClick={() => {
                  if (shareOpen) {
                    resetShare();
                  } else {
                    setShareOpen(true);
                    setShareStep("form");
                    setShareMsg(null);
                  }
                }}
                disabled={working}
                className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-50"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Share access
              </button>
              {shareOpen && (
                <div className="absolute right-0 top-full z-30 mt-2 w-[560px] max-w-[calc(100vw-2rem)] rounded-xl border border-[var(--color-border)] bg-white p-5 text-[var(--color-charcoal)] shadow-xl">
                  {shareStep === "form" && (
                    <>
                      <p className="text-sm font-semibold text-[var(--color-charcoal)]">
                        Share {selected.size} {selected.size === 1 ? "company" : "companies"}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--color-warm-gray)]">
                        Send a portal invite to an owner email.
                      </p>
                      <form onSubmit={reviewBulkShare} className="mt-3 space-y-2">
                        <input
                          type="email"
                          value={shareEmail}
                          onChange={(e) => setShareEmail(e.target.value)}
                          placeholder="owner@example.com"
                          autoComplete="email"
                          autoFocus
                          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
                        />
                        <button
                          type="submit"
                          disabled={working || !shareEmail.trim()}
                          className="w-full rounded-lg bg-[var(--color-charcoal)] px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
                        >
                          Review invite
                        </button>
                        {shareMsg && shareMsg.kind === "err" && (
                          <p className="text-center text-xs text-red-700">{shareMsg.text}</p>
                        )}
                      </form>
                    </>
                  )}

                  {shareStep === "confirm" && (
                    <>
                      <p className="text-sm font-semibold text-[var(--color-charcoal)]">
                        Confirm invite
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--color-warm-gray)]">
                        We&apos;ll grant portal access and email an invite to:
                      </p>
                      <div className="mt-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3">
                        <div className="flex items-center gap-2 text-sm text-[var(--color-charcoal)]">
                          <Mail className="h-4 w-4 text-[var(--color-warm-gray)]" />
                          <span className="truncate font-medium">{shareEmail}</span>
                        </div>
                        <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                          Access to{" "}
                          <span className="font-medium text-[var(--color-charcoal)]">
                            {selected.size} {selected.size === 1 ? "company" : "companies"}
                          </span>
                          .
                        </p>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShareStep("form");
                            setShareMsg(null);
                          }}
                          disabled={working}
                          className="flex-1 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-medium text-[var(--color-charcoal)] transition-colors hover:bg-[var(--color-cream)] disabled:opacity-50"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={confirmBulkShare}
                          disabled={working}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--color-charcoal)] px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
                        >
                          {working ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              Sending…
                            </>
                          ) : (
                            "Send invite"
                          )}
                        </button>
                      </div>
                      {shareMsg && shareMsg.kind === "err" && (
                        <p className="mt-2 text-center text-xs text-red-700">{shareMsg.text}</p>
                      )}
                    </>
                  )}

                  {shareStep === "success" && successInfo && (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                          <CheckCircle2 className="h-5 w-5 text-green-700" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[var(--color-charcoal)]">
                            Invite sent
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-[var(--color-warm-gray)]">
                            <span className="font-medium text-[var(--color-charcoal)]">
                              {successInfo.email}
                            </span>{" "}
                            now has access to{" "}
                            <span className="font-medium text-[var(--color-charcoal)]">
                              {successInfo.count}{" "}
                              {successInfo.count === 1 ? "company" : "companies"}
                            </span>
                            .
                          </p>
                          {shareMsg && shareMsg.kind === "ok" && (
                            <p className="mt-1 text-xs text-[var(--color-warm-gray)]">
                              {shareMsg.text}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={resetShare}
                        className="mt-4 w-full rounded-lg bg-[var(--color-charcoal)] px-3 py-2 text-sm font-medium text-white"
                      >
                        Done
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={applyBulkDelete}
              disabled={working}
              className="inline-flex items-center gap-1.5 rounded-md bg-red-500/90 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-500 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
            {working && <Loader2 className="h-4 w-4 animate-spin text-white/80" />}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[var(--color-border)] bg-white overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="w-12 px-4 py-2">
                <SelectAllCell
                  allSelected={allSelected}
                  someSelected={someSelected}
                  onToggle={toggleAll}
                />
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                Company
              </th>
              <th className="hidden px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)] md:table-cell">
                Website
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                Locations
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                Reports
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                Owners
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {companies.map((c, index) => {
              const isSelected = selected.has(c.id);
              return (
                <tr
                  key={c.id}
                  className={`group/row transition-colors ${
                    isSelected ? "bg-[var(--color-cream)]" : "hover:bg-[var(--color-cream)]"
                  }`}
                >
                  <td className="px-4 py-1.5">
                    <IndexCheckboxCell
                      index={index + 1}
                      checked={isSelected}
                      onToggle={() => toggleOne(c.id)}
                      label={c.name}
                    />
                  </td>
                  <td className="px-6 py-1.5">
                    <Link
                      href={`/admin/companies/${c.slug}`}
                      className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-accent)]"
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="hidden px-6 py-1.5 md:table-cell">
                    <a
                      href={c.url.startsWith("http") ? c.url : `https://${c.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
                    >
                      {c.url} <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="px-6 py-1.5 text-sm tabular-nums text-[var(--color-charcoal)]">
                    {c.locationCount}
                  </td>
                  <td className="px-6 py-1.5 text-sm tabular-nums text-[var(--color-charcoal)]">
                    {c.reportCount}
                  </td>
                  <td className="px-6 py-1.5 text-sm tabular-nums text-[var(--color-charcoal)]">
                    {c.ownerCount}
                  </td>
                  <td className="px-6 py-1.5 text-right">
                    <Link
                      href={`/admin/companies/${c.slug}`}
                      className="rounded-lg px-2.5 py-1 text-xs font-medium text-[var(--color-warm-gray)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]"
                    >
                      Manage
                    </Link>
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
  return (
    <div className="group/cell relative flex h-5 w-5 items-center justify-center">
      {!checked && (
        <span className="text-xs font-medium tabular-nums text-[var(--color-warm-gray-light)] transition-opacity group-hover/row:opacity-0 group-hover/cell:opacity-0">
          {index}
        </span>
      )}
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        aria-label={`Select ${label}`}
        className={`absolute inset-0 m-auto h-4 w-4 cursor-pointer rounded border-[var(--color-border)] accent-[var(--color-charcoal)] transition-opacity ${
          checked
            ? "opacity-100"
            : "opacity-0 group-hover/row:opacity-100 group-hover/cell:opacity-100"
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
    <div className="group/head relative flex h-5 w-5 items-center justify-center">
      {!checked && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray-light)] transition-opacity group-hover/head:opacity-0">
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
        aria-label="Select all companies"
        className={`absolute inset-0 m-auto h-4 w-4 cursor-pointer rounded border-[var(--color-border)] accent-[var(--color-charcoal)] transition-opacity ${
          checked ? "opacity-100" : "opacity-0 group-hover/head:opacity-100"
        }`}
      />
    </div>
  );
}
