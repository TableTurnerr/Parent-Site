"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Plus, X } from "lucide-react";

export interface OriginRow {
  id: string;
  origin: string;
  label: string | null;
  created_at: string;
}

export default function OriginsPanel({
  clientId,
  initialOrigins,
}: {
  clientId: string;
  initialOrigins: OriginRow[];
}) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [originValue, setOriginValue] = useState("");
  const [labelValue, setLabelValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/clients/${clientId}/origins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: originValue,
          label: labelValue.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error ?? "Failed to add origin");
        return;
      }
      setOriginValue("");
      setLabelValue("");
      setAdding(false);
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (originId: string, origin: string) => {
    if (!confirm(`Remove "${origin}"? Requests from this origin will be blocked.`)) return;
    const res = await fetch(`/api/clients/${clientId}/origins/${originId}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  };

  return (
    <div className="space-y-5">
      {!adding ? (
        <button
          type="button"
          onClick={() => {
            setAdding(true);
            setErr(null);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)]"
        >
          <Plus className="h-3.5 w-3.5" />
          Add origin
        </button>
      ) : (
        <form onSubmit={submit} className="space-y-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3">
          <div>
            <label className="block text-xs font-medium text-[var(--color-charcoal)]">
              Origin URL
            </label>
            <input
              type="url"
              required
              autoFocus
              value={originValue}
              onChange={(e) => setOriginValue(e.target.value)}
              placeholder="https://www.al-baghdady.com"
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-mono text-sm text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-charcoal)]">
              Label <span className="text-[var(--color-warm-gray-light)]">(optional)</span>
            </label>
            <input
              type="text"
              maxLength={80}
              value={labelValue}
              onChange={(e) => setLabelValue(e.target.value)}
              placeholder="Production site"
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy || !originValue.trim()}
              className="rounded-lg bg-[var(--color-charcoal)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {busy ? "Adding…" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                setOriginValue("");
                setLabelValue("");
                setErr(null);
              }}
              disabled={busy}
              className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
            >
              Cancel
            </button>
          </div>
          {err && <p className="text-xs text-red-700">{err}</p>}
          <p className="text-xs text-[var(--color-warm-gray)]">
            Include the protocol (https://) and no trailing path. Subdomains and ports are kept; the value is matched exactly against the request&apos;s <code className="font-mono">Origin</code> header.
          </p>
        </form>
      )}

      {initialOrigins.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-warm-gray)]">
          <p>Origins are the websites allowed to use this client&apos;s API keys.</p>
          <p className="mt-1 text-xs text-[var(--color-warm-gray-light)]">
            The request&apos;s Origin header must match exactly.
            <br />
            Example: <code className="font-mono">https://www.al-baghdady.com</code>
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] bg-white">
          {initialOrigins.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 shrink-0 text-[var(--color-warm-gray)]" />
                  <code className="break-all font-mono text-sm text-[var(--color-charcoal)]">
                    {o.origin}
                  </code>
                </div>
                {o.label && (
                  <p className="mt-0.5 pl-5 text-xs text-[var(--color-warm-gray)]">{o.label}</p>
                )}
                <p className="mt-0.5 pl-5 text-xs text-[var(--color-warm-gray-light)]">
                  Added {new Date(o.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(o.id, o.origin)}
                aria-label={`Remove ${o.origin}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
              >
                <X className="h-3 w-3" />
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
