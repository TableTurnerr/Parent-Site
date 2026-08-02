import type { AnalyticsEvent, AnalyticsProperties } from "./events";

const SENSITIVE_QUERY_KEYS = /token|code|email|id|key|secret|password|auth|session/i;
let posthog: typeof import("posthog-js").default | null = null;
let initializing: Promise<void> | null = null;

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

export async function startAnalytics(replayAllowed: boolean) {
  if (!analyticsEnabled() || !process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;
  if (!initializing) {
    initializing = import("posthog-js").then(({ default: sdk }) => {
      posthog = sdk;
      sdk.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        defaults: "2026-05-30",
        capture_pageview: false,
        autocapture: false,
        capture_exceptions: true,
        persistence: "localStorage+cookie",
        session_recording: { maskAllInputs: true, maskTextSelector: "[data-analytics-mask]" },
        sanitize_properties: (properties) => properties,
      });
    });
  }
  await initializing;
  posthog?.opt_in_capturing();
  if (replayAllowed) posthog?.startSessionRecording(); else posthog?.stopSessionRecording();
}

export function stopAnalytics() {
  posthog?.opt_out_capturing();
  posthog?.stopSessionRecording();
}

export function capture(event: AnalyticsEvent, properties: AnalyticsProperties = {}) {
  if (!posthog) return;
  posthog.capture(event, { ...properties, page_path: sanitizeUrl(window.location.href) });
}
