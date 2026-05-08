"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, ChevronDown } from "lucide-react";

interface Company {
  id: string;
  name: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AddOwnerForm({
  companies,
  heading = "Add an owner",
  description = "Send a portal invite by email and assign them to one or more companies.",
}: {
  companies: Company[];
  heading?: string;
  description?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [open, setOpen] = useState(false);
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
    setMsg(null);
    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setMsg({ kind: "err", text: "Enter a valid email." });
      return;
    }
    if (selected.size === 0) {
      setMsg({ kind: "err", text: "Select at least one company." });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/clients/share-bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, clientIds: Array.from(selected) }),
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
            ? `Invite sent — assigned ${data.grantedCount} ${data.grantedCount === 1 ? "company" : "companies"}.`
            : "Assigned but email failed.",
        });
        setEmail("");
        setSelected(new Set());
        router.refresh();
      }
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  };

  const summary =
    selected.size === 0
      ? "Select companies"
      : selected.size === 1
        ? (companies.find((c) => selected.has(c.id))?.name ?? "1 selected")
        : `${selected.size} companies selected`;

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream-dark)] text-[var(--color-charcoal)]">
          <UserPlus className="h-5 w-5" />
        </div>
        <p className="mt-3 text-sm font-medium text-[var(--color-charcoal)]">{heading}</p>
        <p className="mt-1 text-xs text-[var(--color-warm-gray)]">{description}</p>
      </div>

      <form onSubmit={submit} className="mx-auto mt-5 max-w-md space-y-3">
        <div>
          <label className="sr-only" htmlFor="add-owner-email">Email</label>
          <input
            id="add-owner-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="owner@example.com"
            autoComplete="email"
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray-light)] focus:border-[var(--color-charcoal)] focus:outline-none"
          />
        </div>

        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            disabled={companies.length === 0}
            className="flex w-full items-center justify-between rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-left text-sm text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)] disabled:opacity-50"
          >
            <span className={selected.size === 0 ? "text-[var(--color-warm-gray)]" : ""}>
              {companies.length === 0 ? "No companies available" : summary}
            </span>
            <ChevronDown className="h-4 w-4 text-[var(--color-warm-gray)]" />
          </button>

          {open && companies.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-lg border border-[var(--color-border)] bg-white py-1 shadow-xl">
              <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
                Select companies
              </p>
              <ul className="max-h-56 overflow-y-auto border-t border-[var(--color-border)]">
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
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={busy || selected.size === 0 || !email.trim()}
          className="w-full rounded-lg bg-[var(--color-charcoal)] px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {busy ? "Sending…" : "Send invite"}
        </button>

        {msg && (
          <p className={`text-center text-xs ${msg.kind === "ok" ? "text-green-700" : "text-red-700"}`}>
            {msg.text}
          </p>
        )}
      </form>
    </div>
  );
}
