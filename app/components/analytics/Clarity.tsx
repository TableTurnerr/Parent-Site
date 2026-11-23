"use client";
// Microsoft Clarity (free): heatmaps, session recordings, scroll depth and time on page.
// Mounted only in the marketing layout, so admin, portal and report pages are never recorded.
// Loads only after the visitor turns on "Session replay and heatmaps" in Privacy choices, and tells Clarity
// when that consent is withdrawn. Clarity masks form inputs by default.
import { useEffect } from "react";
import { readConsent } from "./AnalyticsProvider";

// Public project ID from clarity.microsoft.com (not a secret). The env var wins if set.
const CLARITY_PROJECT_ID = "zidcdfs3e5";

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
declare global {
  interface Window { clarity?: ClarityFn }
}

function load(id: string) {
  if (window.clarity) return;
  const fn: ClarityFn = (...args) => { (fn.q = fn.q || []).push(args); };
  window.clarity = fn;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

export default function Clarity() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || CLARITY_PROJECT_ID;
    if (!id) return;
    const apply = () => {
      const allowed = Boolean(readConsent()?.replay);
      if (allowed) load(id);
      window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: allowed ? "granted" : "denied" });
    };
    apply();
    window.addEventListener("tt-consent-changed", apply);
    return () => window.removeEventListener("tt-consent-changed", apply);
  }, []);
  return null;
}
