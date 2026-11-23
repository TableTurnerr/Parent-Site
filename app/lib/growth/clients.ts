// Real clients we can name on the site. Only add a client here once they've agreed to be named, and only state
// what we actually do for them. Facts below were confirmed by the owner on 2026-11-20 and, for review counts,
// read from the client's own website schema the same day.
export interface Client {
  name: string;
  type: string;
  city: string;
  state: string;
  url: string;
  whatWeDo: string;
  fact?: string;
}

export const TEXAS_CLIENTS: Client[] = [
  {
    name: "Al-Baghdady Bakery & Café",
    type: "Iraqi bakery and breakfast café",
    city: "Richardson",
    state: "TX",
    url: "https://www.albaghdadybakery.com",
    whatWeDo: "We build and run their website.",
    fact: "Nearly 1,900 customer reviews",
  },
  {
    name: "WafflePop Dallas",
    type: "Dessert shop",
    city: "Dallas",
    state: "TX",
    url: "https://wafflepopdallas.com",
    // TODO (owner): say what we do for WafflePop (website? Google profile? reviews?) so this line can be specific.
    whatWeDo: "A TableTurnerr client in Dallas.",
  },
];

/** Texas city pages that sit in the same Dallas–Fort Worth metro as our Texas clients. */
export const DFW_SLUGS = new Set(["dallas", "fort-worth", "arlington", "plano", "irving", "garland", "frisco", "mckinney", "denton"]);

// "Businesses powered by TableTurnerr": the logo wall. Names and the websites we built were confirmed by the owner on
// 2026-11-23 (Presidential Roofing, Cooling Comfort, Auto Mow and NW Premier Vancouver sites added the same day). Logos were taken from each client's own website (public/images/clients). Clients without a live website
// show a monogram instead and are not linked. Only say "Website by TableTurnerr" where we actually built the site.
export interface PortfolioClient {
  name: string;
  trade: string;
  place: string;
  /** Where a click on the logo goes: the client's site, or our case study. Omit when there's nothing to link to. */
  href?: string;
  logo?: string;
  /** Wide, short logo (gets a wider tile in the logo strip). */
  wide?: boolean;
  /** Light-colored logo that needs a dark tile. */
  darkLogo?: boolean;
  /** Short line under the name. */
  tag: string;
}

export const PORTFOLIO: PortfolioClient[] = [
  { name: "Advanced Home Repairs LLC", trade: "Handyman", place: "Inglewood, CA", href: "https://advancedhomerepairsllc.com/", logo: "/images/clients/advanced.webp", tag: "Website by TableTurnerr" },
  { name: "Nalu Window Cleaning", trade: "Window cleaning", place: "Hilo, HI", href: "https://naluwindows.com/", logo: "/images/clients/nalu.webp", tag: "Website by TableTurnerr" },
  { name: "NW Premier Tree Services", trade: "Tree service", place: "Vancouver, WA & Portland, OR", href: "https://www.vancouverwatreeservices.com/", logo: "/images/clients/nw-premier.webp", wide: true, tag: "Marketing client" },
  { name: "Presidential Roofing", trade: "Roofing", place: "Syracuse, UT", href: "https://www.presidentialroofingutah.com/", logo: "/images/clients/presidential-roofing.webp", wide: true, tag: "27 to 43 Google reviews in 20 days" },
  { name: "Auto Mow Co", trade: "Landscaping & lawn care", place: "Carlsbad & Albuquerque, NM", href: "https://www.automowco.com/", logo: "/images/clients/auto-mow.webp", darkLogo: true, tag: "Marketing client" },
  { name: "Cooling Comfort Inc.", trade: "HVAC", place: "Inglewood, CA", href: "https://coolingcomforthvac.com/", logo: "/images/clients/cooling-comfort.webp", tag: "Website by TableTurnerr" },
  { name: "Ready Remodeling LLC", trade: "Remodeling", place: "Port Angeles, WA", tag: "Marketing client" },
  { name: "Al-Baghdady Bakery & Café", trade: "Bakery & café", place: "Richardson, TX", href: "https://www.albaghdadybakery.com/", logo: "/images/clients/albaghdady.webp", tag: "Website by TableTurnerr" },
  { name: "WafflePop Dallas", trade: "Dessert shop", place: "Dallas, TX", href: "https://wafflepopdallas.com/", logo: "/images/clients/wafflepop.webp", tag: "Website by TableTurnerr" },
  { name: "Sunshine & Pineapple", trade: "Breakfast & brunch café", place: "Honolulu, HI", href: "https://sunshineandpineapplecafe.com/", logo: "/images/clients/sunshine.webp", tag: "Website by TableTurnerr" },
];
