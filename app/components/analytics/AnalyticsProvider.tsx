"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { capture, startAnalytics, stopAnalytics, sanitizeUrl } from "@/app/lib/analytics/client";
import { ANALYTICS_EVENTS } from "@/app/lib/analytics/events";

export type Consent = { analytics: boolean; replay: boolean; advertising: boolean };
export const CONSENT_KEY = "tt-consent-v1";
export function readConsent(): Consent | null {
  try { const raw = localStorage.getItem(CONSENT_KEY); return raw ? JSON.parse(raw) as Consent : null; } catch { return null; }
}

function attribution() {
  const params = new URLSearchParams(window.location.search);
  const current = { landing_page: sanitizeUrl(window.location.href), referrer_domain: document.referrer ? new URL(document.referrer).hostname : "direct", utm_source: params.get("utm_source"), utm_medium: params.get("utm_medium"), utm_campaign: params.get("utm_campaign"), utm_content: params.get("utm_content"), utm_term: params.get("utm_term") };
  const key = "tt-attribution-v1";
  const first = JSON.parse(sessionStorage.getItem(key) || localStorage.getItem(key) || "null") || current;
  localStorage.setItem(key, JSON.stringify(first)); sessionStorage.setItem(key, JSON.stringify(current));
  return { ...current, first_touch_source: first.utm_source || first.referrer_domain, last_touch_source: current.utm_source || current.referrer_domain };
}

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null>(null);
  const pageRef = useRef("");
  useEffect(() => { setConsent(readConsent()); const handler = () => setConsent(readConsent()); window.addEventListener("tt-consent-changed", handler); return () => window.removeEventListener("tt-consent-changed", handler); }, []);
  useEffect(() => { if (consent?.analytics) void startAnalytics(consent.replay); else stopAnalytics(); }, [consent]);
  useEffect(() => { if (!consent?.analytics || pageRef.current === pathname) return; pageRef.current = pathname; capture(ANALYTICS_EVENTS.pageViewed, { page_title: document.title, viewport_category: innerWidth < 768 ? "mobile" : innerWidth < 1200 ? "tablet" : "desktop", ...attribution() }); }, [pathname, consent]);
  useEffect(() => {
    if (!consent?.analytics) return;
    const click = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const text = (link.textContent || "").trim().slice(0, 80);
      if (/^https?:/i.test(href) && !href.includes(location.hostname)) capture(ANALYTICS_EVENTS.outboundLinkClicked, { destination: sanitizeUrl(href), link_text: text });
      else capture(ANALYTICS_EVENTS.navigationClicked, { destination: href.startsWith("/") ? href : "anchor", link_text: text });
    };
    addEventListener("click", click);
    return () => removeEventListener("click", click);
  }, [consent]);
  useEffect(() => {
    if (!consent?.analytics) return;
    const onError = (event: ErrorEvent) => capture(ANALYTICS_EVENTS.frontendError, { message: String(event.message).slice(0, 180), source: sanitizeUrl(event.filename || "") });
    const onRejection = (event: PromiseRejectionEvent) => capture(ANALYTICS_EVENTS.frontendError, { message: String(event.reason).slice(0, 180), kind: "unhandled_rejection" });
    addEventListener("error", onError); addEventListener("unhandledrejection", onRejection);
    return () => { removeEventListener("error", onError); removeEventListener("unhandledrejection", onRejection); };
  }, [consent]);
  return <EngagementTracker enabled={Boolean(consent?.analytics)} />;
}

function EngagementTracker({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const seen = new Set<number>(); const started = performance.now(); let maxDepth = 0;
    const onScroll = () => { const depth = Math.round((scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100); maxDepth = Math.max(maxDepth, depth); [10,25,50,75,90,100].forEach((milestone) => { if (depth >= milestone && !seen.has(milestone)) { seen.add(milestone); capture(ANALYTICS_EVENTS.scrollMilestone, { milestone, time_to_reach_ms: Math.round(performance.now() - started) }); } }); };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => { removeEventListener("scroll", onScroll); };
  }, [enabled]);
  return <SectionTracker enabled={enabled} />;
}

function SectionTracker({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    let order = 0; const states = new Map<Element, { entered?: number; visible: number; entries: number; max: number; viewed: boolean }>();
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { const id = entry.target.getAttribute("data-analytics-section"); if (!id) return; const state = states.get(entry.target) || { visible: 0, entries: 0, max: 0, viewed: false }; state.max = Math.max(state.max, entry.intersectionRatio); if (entry.isIntersecting && entry.intersectionRatio >= .5 && !document.hidden) { if (!state.entered) { state.entered = performance.now(); state.entries++; setTimeout(() => { if (state.entered && !state.viewed) { state.viewed = true; capture(ANALYTICS_EVENTS.sectionViewed, { section_id: id, view_order: ++order }); } }, 1000); } } else if (state.entered) { state.visible += performance.now() - state.entered; state.entered = undefined; } states.set(entry.target, state); }), { threshold: [.5, .75, 1] });
    const sections = [...document.querySelectorAll("[data-analytics-section]")]; sections.forEach((section) => observer.observe(section));
    const flush = () => states.forEach((state, element) => { const id = element.getAttribute("data-analytics-section"); const visible = state.visible + (state.entered && !document.hidden ? performance.now() - state.entered : 0); if (id && visible >= 1000) capture(ANALYTICS_EVENTS.sectionEngagement, { section_id: id, visible_time_ms: Math.round(visible), entries: state.entries, max_visibility_percent: Math.round(state.max * 100) }); });
    const visibility = () => { if (document.hidden) flush(); };
    addEventListener("pagehide", flush); document.addEventListener("visibilitychange", visibility);
    return () => { flush(); observer.disconnect(); removeEventListener("pagehide", flush); document.removeEventListener("visibilitychange", visibility); };
  }, [enabled]);
  return null;
}
