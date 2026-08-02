"use client";
import { useEffect, useState } from "react";
import { CONSENT_KEY, readConsent, type Consent } from "./AnalyticsProvider";
const ACCEPT: Consent = { analytics: true, replay: true, advertising: false };
const REJECT: Consent = { analytics: false, replay: false, advertising: false };
export default function ConsentManager({ trigger = false }: { trigger?: boolean }) {
  const [open, setOpen] = useState(trigger); const [preferences, setPreferences] = useState<Consent>(REJECT);
  useEffect(() => { const saved = readConsent(); setPreferences(saved || REJECT); if (!saved && !trigger) setOpen(true); }, [trigger]);
  const save = (next: Consent) => { localStorage.setItem(CONSENT_KEY, JSON.stringify(next)); setPreferences(next); setOpen(false); dispatchEvent(new Event("tt-consent-changed")); };
  if (trigger) return <button type="button" onClick={() => setOpen(true)} className="text-sm text-ink-soft hover:text-ink underline">Privacy choices</button>;
  if (!open) return null;
  return <div role="dialog" aria-modal="true" aria-label="Privacy choices" className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 shadow-2xl"><p className="font-semibold text-ink">Privacy choices</p><p className="mt-2 text-sm text-ink-soft">We use privacy-friendly Cloudflare Web Analytics where permitted. Optional PostHog analytics and session replay stay off until you choose them. Form contents are never recorded.</p><label className="mt-4 flex gap-2 text-sm"><input type="checkbox" checked={preferences.analytics} onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked, replay: e.target.checked ? preferences.replay : false })} /> Analytics</label><label className="mt-2 flex gap-2 text-sm"><input type="checkbox" disabled={!preferences.analytics} checked={preferences.replay} onChange={(e) => setPreferences({ ...preferences, replay: e.target.checked })} /> Session replay and heatmaps</label><div className="mt-5 flex flex-wrap gap-2"><button className="btn btn-primary text-sm" onClick={() => save(ACCEPT)}>Accept all</button><button className="btn btn-ghost text-sm" onClick={() => save(REJECT)}>Reject non-essential</button><button className="btn btn-ghost text-sm" onClick={() => save(preferences)}>Save choices</button></div></div>;
}
