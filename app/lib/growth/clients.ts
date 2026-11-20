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
