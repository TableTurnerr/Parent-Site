"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

interface Company {
  id: string;
  name: string;
}

export default function AssignCompanyForm({
  email,
  companies,
  triggerLabel = "No companies",
  className = "mt-3",
  menuAlign = "left",
}: {
  email: string;
  companies: Company[];
  triggerLabel?: string;
  className?: string;
  menuAlign?: "left" | "right";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.size === 0) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/clients/share-bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, clientIds: Array.from(selected) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg({ kind: "err", text: data.error ?? "Failed" });
      } else if (data.alreadyGranted) {
        setMsg({ kind: "ok", text: "Already had access." });
        router.refresh();
      } else {
        setMsg({
          kind: data.emailSent ? "ok" : "err",
          text: data.emailSent
            ? `Assigned ${data.grantedCount} ${data.grantedCount === 1 ? "company" : "companies"}.`
            : `Assigned but email failed.`,
        });
        setSelected(new Set());
        setOpen(false);
        router.refresh();
      }
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-full border border-dashed border-[var(--color-border)] bg-white px-3 py-1 text-xs text-[var(--color-warm-gray)] hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)]"
      >
        <Plus className="h-3 w-3" />
        {triggerLabel}
      </button>

      {open && (
        <div className={`absolute ${menuAlign === "right" ? "right-0" : "left-0"} top-full z-20 mt-1 w-72 rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-xl`}>
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
            Select companies
          </p>
          <div className="max-h-56 overflow-y-auto border-t border-[var(--color-border)]">
            {companies.length === 0 ? (
              <p className="px-3 py-3 text-xs text-[var(--color-warm-gray)]">No companies available.</p>
            ) : (
              <ul>
                {companies.map((c) => {
                  const checked = selected.has(c.id);
                  return (
                    <li key={c.id}>
                      <label
                        className={`group flex w-full cursor-pointer items-center gap-2 border-l-4 px-3 py-2 text-sm transition-colors ${
                          checked
                            ? "border-[var(--color-charcoal)] bg-[var(--color-cream-dark)] text-[var(--color-charcoal)]"
                            : "border-transparent text-[var(--color-charcoal)] hover:border-[#43403D] hover:bg-[#43403D] hover:text-[#FAFAF8]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(c.id)}
                          className="h-3.5 w-3.5 rounded border-[var(--color-border)] accent-[var(--color-charcoal)]"
                        />
                        <span className="truncate font-medium">{c.name}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <form onSubmit={submit} className="flex items-center justify-between gap-2 border-t border-[var(--color-border)] px-3 py-2">
            <span className="text-xs text-[var(--color-warm-gray)]">
              {selected.size} selected
            </span>
            <button
              type="submit"
              disabled={busy || selected.size === 0}
              className="rounded-lg bg-[var(--color-charcoal)] px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
            >
              {busy ? "Assigning…" : "Assign"}
            </button>
          </form>
          {msg && (
            <p className={`px-3 pb-2 text-xs ${msg.kind === "ok" ? "text-green-700" : "text-red-700"}`}>
              {msg.text}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
