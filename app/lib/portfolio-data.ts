export interface PortfolioClient {
  /** Display name of the restaurant. */
  name: string;
  /** Live site URL (no protocol needed; https assumed). e.g. "grillshack.com" */
  url: string;
  /** One-line descriptor: cuisine / city / what we did. */
  blurb: string;
}

/**
 * Rented client restaurant sites built by TableTurnerr. These are TT-owned
 * properties (clients rent them), so featuring them + linking out is fully
 * legitimate, and each one carries a reciprocal "Marketing by TableTurnerr"
 * backlink.
 *
 * ⚠️ ACTION (Aleee): replace the placeholder `url` values with the real live
 * domains. The screenshots auto-generate from these URLs via thum.io, so once
 * the URL is correct the preview is correct, no manual image work.
 */
export const PORTFOLIO_CLIENTS: PortfolioClient[] = [
  {
    name: "Grill Shack",
    url: "example.com", // TODO(Aleee): real live URL
    blurb: "Website design and local SEO for a neighborhood grill.",
  },
  {
    name: "Miss Mat Cafe",
    url: "example.com", // TODO(Aleee): real live URL
    blurb: "Brand-forward cafe site built to convert browsers into guests.",
  },
  {
    name: "Texbbq",
    url: "example.com", // TODO(Aleee): real live URL
    blurb: "BBQ joint site tuned for online orders and Google visibility.",
  },
  {
    name: "Qadeer Coffee",
    url: "example.com", // TODO(Aleee): real live URL
    blurb: "Coffee shop website with a clean, mobile-first ordering flow.",
  },
];

/** Build a thum.io live-screenshot URL for a client's homepage. */
export function screenshotUrl(siteUrl: string): string {
  const clean = siteUrl.replace(/^https?:\/\//, "");
  // width 1200, cropped to a 900px-tall card, with a small wait for load.
  return `https://image.thum.io/get/width/1200/crop/900/wait/2/https://${clean}`;
}

/** True once Aleee has filled in at least one real (non-placeholder) URL. */
export function hasRealPortfolio(): boolean {
  return PORTFOLIO_CLIENTS.some((c) => c.url && c.url !== "example.com");
}
