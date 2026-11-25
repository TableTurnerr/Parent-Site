import type { AnalyticsEvent, AnalyticsProperties } from "./events";

const SENSITIVE_QUERY_KEYS = /token|code|email|id|key|secret|password|auth|session/i;
let posthog: typeof import("posthog-js").default | null = null;
let initializing: Promise<void> | null = null;
/** Events from the moment before the SDK finished loading (the first page view is always one of them). */
let pending: { event: string; properties: AnalyticsProperties; timestamp: Date }[] = [];
let paused = false;

export function analyticsEnabled() {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" &&
    (process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true");
}

export function sanitizeUrl(value: string) {
  try {
    const url = new URL(value, window.location.origin);
    [...url.searchParams.keys()].forEach((key) => {
      if (SENSITIVE_QUERY_KEYS.test(key) || /@/.test(url.searchParams.get(key) ?? "")) url.searchParams.delete(key);
    });
    return `${url.pathname}${url.search}${url.hash}`;
  } catch { return "/"; }
}

export async function startAnalytics() {
  if (!analyticsEnabled() || !process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;
  if (!initializing) {
    initializing = import("posthog-js").then(({ default: sdk }) => {
      posthog = sdk;
      sdk.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        defaults: "2026-05-30",
        capture_pageview: false, // sent by AnalyticsProvider, so private pages stay out
        capture_pageleave: true,
        disable_session_recording: true, // recordings are Microsoft Clarity's job
        autocapture: false,
        capture_exceptions: true,
        persistence: "localStorage+cookie",
        sanitize_properties: (properties) => properties,
      });
    });
  }
  paused = false;
  await initializing;
  if (paused) return; // consent was withdrawn while it loaded
  posthog?.opt_in_capturing({ captureEventName: false });
  for (const { event, properties, timestamp } of pending) posthog?.capture(event, properties, { timestamp });
  pending = [];
}

export function stopAnalytics() {
  paused = true;
  pending = [];
  posthog?.opt_out_capturing();
}

export function capture(event: AnalyticsEvent, properties: AnalyticsProperties = {}) {
  const props = { ...properties, page_path: sanitizeUrl(window.location.href) };
  if (posthog) posthog.capture(event, props);
  else if (initializing && !paused && pending.length < 50) {
    pending.push({ event, properties: { ...props, $current_url: window.location.href, $pathname: window.location.pathname }, timestamp: new Date() });
  }
}
