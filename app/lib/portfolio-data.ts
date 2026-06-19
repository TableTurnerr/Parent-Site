export interface PortfolioClient {
  /** Display name of the restaurant. */
  name: string;
  /** Live site URL (no protocol needed; https assumed). e.g. "grillshack.com" */
  url: string;
  /** One-line descriptor: cuisine / what we did. */
  blurb: string;
  /** Static screenshot in /public/images/work/. Falls back to a name card if missing. */
  image?: string;
  /** Set when the site blocks iframe embedding (X-Frame-Options / Cloudflare),
   *  so the live preview degrades to a branded name card instead of a blank frame. */
  noFrame?: boolean;
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
    image: "/images/work/grill-shack.webp",
  },
  {
    name: "Suntea Mix",
    url: "sunteamix.co",
    blurb: "Custom site for a bubble tea and specialty drinks brand.",
    image: "/images/work/suntea-mix.webp",
    noFrame: true,
  },
  {
    name: "Waikiki Chicken in Paradise",
    url: "waikikichickeninparadise.com",
    blurb: "Website built for a Hawaiian-style chicken restaurant.",
    image: "/images/work/waikiki-chicken.webp",
    noFrame: true,
  },
  {
    name: "Waffle Pop Dallas",
    url: "wafflepopdallas.com",
    blurb: "Site and local SEO for a Dallas waffle and dessert shop.",
    image: "/images/work/waffle-pop-dallas.webp",
  },
  {
    name: "The Battle Brand",
    url: "thebattlebrand.com",
    blurb: "Brand-forward website for a specialty cheesecake maker.",
    image: "/images/work/battle-brand.webp",
    noFrame: true,
  },
  {
    name: "Al-Baghdady Bakery & Café",
    url: "www.albaghdadybakery.com",
    blurb: "Website and local SEO for an authentic Iraqi bakery and café in Richardson, TX.",
    image: "/images/work/al-baghdady.webp",
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
