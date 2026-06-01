"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, KeyRound, Plus } from "lucide-react";

export interface ApiKeyRow {
  id: string;
  key_prefix: string;
  label: string;
  created_at: string;
  last_used_at: string | null;
  revoked_at: string | null;
}

interface NewKey {
  id: string;
  key_prefix: string;
  label: string;
  created_at: string;
  plaintext: string;
}

export default function ApiKeysPanel({
  clientId,
  initialKeys,
}: {
  clientId: string;
  initialKeys: ApiKeyRow[];
}) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<NewKey | null>(null);
  const [copied, setCopied] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/clients/${clientId}/api-keys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error ?? "Failed to generate key");
        return;
      }
      setRevealed(data.apiKey);
      setLabel("");
      setAdding(false);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const revoke = async (keyId: string) => {
    if (!confirm("Revoke this API key? Any sites using it will stop working immediately.")) return;
    const res = await fetch(`/api/clients/${clientId}/api-keys/${keyId}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  };

  const copyKey = async () => {
    if (!revealed) return;
    try {
      await navigator.clipboard.writeText(revealed.plaintext);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setErr("Copy failed — select the key and copy manually");
    }
  };

  const dismissRevealed = () => {
    setRevealed(null);
    setCopied(false);
    router.refresh();
  };

  return (
    <div className="space-y-5">
      {revealed && (
        <div className="rounded-lg border-2 border-amber-400 bg-amber-50 p-4">
          <div className="flex items-start gap-2">
            <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-amber-900">
                Copy this key now — it won&apos;t be shown again
              </p>
              <p className="mt-0.5 text-xs text-amber-800">
                Store it somewhere safe (password manager, secret store). We only keep a hash, so we can&apos;t recover it later.
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-amber-200 bg-white px-3 py-2">
            <code className="flex-1 break-all font-mono text-xs text-[var(--color-charcoal)]">
              {revealed.plaintext}
            </code>
            <button
              type="button"
              onClick={copyKey}
              className="inline-flex items-center gap-1 rounded-md bg-[var(--color-charcoal)] px-2.5 py-1 text-xs font-medium text-white"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-xs text-amber-800">
              Label: <span className="font-medium">{revealed.label}</span>
            </p>
            <button
              type="button"
              onClick={dismissRevealed}
              className="rounded-md bg-amber-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-800"
            >
              Done, I&apos;ve saved it
            </button>
          </div>
        </div>
      )}

      {!adding ? (
        <button
          type="button"
          onClick={() => {
            setAdding(true);
            setErr(null);
          }}
          disabled={!!revealed}
          className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)] disabled:opacity-50"
        >
          <Plus className="h-3.5 w-3.5" />
          Generate new key
        </button>
      ) : (
        <form onSubmit={submit} className="space-y-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] p-3">
          <label className="block text-xs font-medium text-[var(--color-charcoal)]">
            Label
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              required
              maxLength={80}
              autoFocus
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Al-Baghdady main site"
              className="flex-1 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={busy || !label.trim()}
                className="rounded-lg bg-[var(--color-charcoal)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {busy ? "Generating…" : "Generate"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdding(false);
                  setLabel("");
                  setErr(null);
                }}
                disabled={busy}
                className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
              >
                Cancel
              </button>
            </div>
          </div>
          {err && <p className="text-xs text-red-700">{err}</p>}
          <p className="text-xs text-[var(--color-warm-gray)]">
            A descriptive label helps you identify keys later. You&apos;ll see the full key once after generating.
          </p>
        </form>
      )}

      {initialKeys.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-warm-gray)]">
          No API keys yet. Generate one to let an external website push data here.
        </div>
      ) : (
        <ul className="divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] bg-white">
          {initialKeys.map((k) => {
            const isRevoked = !!k.revoked_at;
            return (
              <li key={k.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-sm font-medium ${isRevoked ? "text-[var(--color-warm-gray-light)] line-through" : "text-[var(--color-charcoal)]"}`}>
                      {k.label}
                    </span>
                    <code className="rounded bg-[var(--color-cream-dark)] px-1.5 py-0.5 font-mono text-xs text-[var(--color-warm-gray)]">
                      {k.key_prefix}…
                    </code>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--color-warm-gray-light)]">
                    Created {new Date(k.created_at).toLocaleDateString()}
                    {" · "}
                    Last used {k.last_used_at ? new Date(k.last_used_at).toLocaleDateString() : "Never"}
                  </p>
                </div>
                {isRevoked ? (
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-red-700">
                    Revoked
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => revoke(k.id)}
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Revoke
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
