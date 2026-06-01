export interface PortfolioClient {
  /** Display name of the restaurant. */
  name: string;
  /** Live site URL (no protocol needed; https assumed). e.g. "grillshack.com" */
  url: string;
  /** One-line descriptor: cuisine / what we did. */
  blurb: string;
}

/**
 * Rented client restaurant sites built by TableTurnerr. These are TT-owned
 * properties (clients rent them), so featuring them + linking out is fully
 * legitimate, and each one carries a reciprocal "Marketing by TableTurnerr"
 * backlink on the client site.
 *
 * Screenshots auto-generate from these URLs via thum.io, so the preview stays
 * current with no manual image work.
 *
 * Note (Aleee): blurbs are descriptive guesses from the brand names. Tweak any
 * that are off.
 */
export const PORTFOLIO_CLIENTS: PortfolioClient[] = [
  {
    name: "Grill Shack",
    url: "grillshackuk.com",
    blurb: "Website design and local SEO for a grill and burger spot.",
  },
  {
    name: "Suntea Mix",
    url: "sunteamix.co",
    blurb: "Custom site for a bubble tea and specialty drinks brand.",
  },
  {
    name: "Waikiki Chicken in Paradise",
    url: "waikikichickeninparadise.com",
    blurb: "Website built for a Hawaiian-style chicken restaurant.",
  },
  {
    name: "Waffle Pop Dallas",
    url: "wafflepopdallas.com",
    blurb: "Site and local SEO for a Dallas waffle and dessert shop.",
  },
  {
    name: "The Battle Brand",
    url: "thebattlebrand.com",
    blurb: "Brand-forward website for a specialty cheesecake maker.",
  },
];

/** Build a thum.io live-screenshot URL for a client's homepage. */
export function screenshotUrl(siteUrl: string): string {
  const clean = siteUrl.replace(/^https?:\/\//, "");
  // width 1200, cropped to a 900px-tall card, with a small wait for load.
  return `https://image.thum.io/get/width/1200/crop/900/wait/2/https://${clean}`;
}

/** True once at least one real (non-placeholder) URL is set. */
export function hasRealPortfolio(): boolean {
  return PORTFOLIO_CLIENTS.some((c) => c.url && c.url !== "example.com");
}
