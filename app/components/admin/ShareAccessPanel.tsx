"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Grant {
  id: string;
  email: string;
  invitedAt: string;
  acceptedAt: string | null;
  revokedAt: string | null;
}

export default function ShareAccessPanel({
  clientId,
  grants,
}: {
  clientId: string;
  grants: Grant[];
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/clients/${clientId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg({ kind: "err", text: data.error ?? "Failed" });
      } else if (data.alreadyGranted) {
        setMsg({ kind: "ok", text: "Already has access — no email re-sent." });
      } else {
        setMsg({
          kind: data.emailSent ? "ok" : "err",
          text: data.emailSent
            ? `Invite sent to ${email}.`
            : `Access granted but email failed: ${data.emailError ?? "unknown"}`,
        });
        setEmail("");
        router.refresh();
      }
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  };

  const revoke = async (grantId: string) => {
    if (!confirm("Revoke this person's access?")) return;
    const res = await fetch(`/api/clients/${clientId}/access/${grantId}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  };

  const active = grants.filter((g) => !g.revokedAt);
  const revoked = grants.filter((g) => g.revokedAt);

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="space-y-2">
        <label className="block text-xs font-medium text-[var(--color-charcoal)]">
          Share access by email
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="owner@restaurant.com"
            className="flex-1 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-charcoal)] focus:border-[var(--color-charcoal)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy || !email}
            className="rounded-lg bg-[var(--color-charcoal)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {busy ? "Sending…" : "Share"}
          </button>
        </div>
        {msg && (
          <p className={`text-xs ${msg.kind === "ok" ? "text-green-700" : "text-red-700"}`}>{msg.text}</p>
        )}
        <p className="text-xs text-[var(--color-warm-gray)]">
          They'll get an email with a link to sign in. Once they sign in, they're auto-linked to this company.
        </p>
      </form>

      {active.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-warm-gray)]">
            Active ({active.length})
          </h3>
          <ul className="divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] bg-white">
            {active.map((g) => (
              <li key={g.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[var(--color-charcoal)]">{g.email}</p>
                  <p className="text-xs text-[var(--color-warm-gray-light)]">
                    Invited {new Date(g.invitedAt).toLocaleDateString()}
                    {g.acceptedAt ? ` · Joined ${new Date(g.acceptedAt).toLocaleDateString()}` : " · Not yet signed in"}
                  </p>
                </div>
                <button
                  onClick={() => revoke(g.id)}
                  className="text-xs font-medium text-red-600 hover:underline"
                >
                  Revoke
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {revoked.length > 0 && (
        <details className="text-xs text-[var(--color-warm-gray)]">
          <summary className="cursor-pointer">Revoked ({revoked.length})</summary>
          <ul className="mt-2 space-y-1 pl-4">
            {revoked.map((g) => (
              <li key={g.id}>
                {g.email} — revoked {g.revokedAt ? new Date(g.revokedAt).toLocaleDateString() : ""}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
