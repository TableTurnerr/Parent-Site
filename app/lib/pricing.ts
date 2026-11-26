// Single source of truth for pricing, shared by the homepage pricing section, the /pricing page, the pricing
// calculator, service pages, /pricing.md and llms-full.txt. Plain data (no server imports) so client components can use it.
//
// Packages only (owner, 2026-11-26): five fixed packages, each includes everything in the one before it. Nothing is
// sold piece by piece and there's no pick-and-choose; anyone who needs something different calls or books a call for a
// custom price. Content files use {{PRICE:<key>}} tokens (see PRICE_TEXT below), so a price change here updates every page.

export const AI_MINUTE_RATE = 0.4;
export const DEMO_PHONE_E164 = "+12702079006";
export const DEMO_PHONE_DISPLAY = "(270) 207-9006";
export const PRICES_CHECKED = "2026-11-25";

export interface Plan {
  id: "reviews" | "starter" | "growth" | "complete" | "partner";
  name: string;
  price: number;
  /** AI answering minutes included each month (0 = AI answering not in this package). */
  aiMinutes: number;
  /** Shown as the recommended package. */
  popular?: boolean;
  forWho: string;
  /** What this package adds on top of the one before it. */
  adds: string[];
}

export const PLANS: Plan[] = [
  {
    id: "reviews",
    name: "Reviews",
    price: 97,
    aiMinutes: 0,
    forWho: "More 5-star Google reviews, and no missed call left hanging.",
    adds: [
      "Review requests after every job, by text and email",
      "AI replies to every review",
      "Missed-call text-back",
      "Custom NFC review cards, free",
      "Monthly report in plain English",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 297,
    aiMinutes: 0,
    forWho: "Look trusted everywhere people check you out.",
    adds: [
      "A website built for Google and AI search, with hosting and edits included",
      "Google Business Profile management with weekly posts",
      "Social media posting on Facebook and Instagram",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 597,
    aiMinutes: 150,
    popular: true,
    forWho: "Every call answered and every estimate followed up.",
    adds: [
      "AI answering, 24/7, with 150 minutes a month included",
      "CRM connected to your field-service software",
      "Estimate reminders and AI follow-ups",
      "Seasonal campaigns to past customers: tune-ups, referrals, repeat jobs",
      "One inbox for calls, texts, chat and social messages",
    ],
  },
  {
    id: "complete",
    name: "Complete",
    price: 797,
    aiMinutes: 150,
    forWho: "Show up for every service, in every town, and in AI answers.",
    adds: [
      "4 new service-and-town pages every month",
      "Optimization for AI search: ChatGPT, Gemini and Google AI",
    ],
  },
  {
    id: "partner",
    name: "Partner",
    price: 1797,
    aiMinutes: 400,
    forWho: "A marketing team that grows profit, not just leads.",
    adds: [
      "Google Ads and Local Services Ads management (ad spend billed separately)",
      "A marketing strategy for your business, reviewed every month",
      "Bigger average jobs: upsells, bundles, good/better/best quotes",
      "Maintenance plans, memberships and referral programs",
      "8 pages a month and 400 AI answering minutes",
      "A monthly strategy call with the founders",
    ],
  },
];

export const planById = (id: Plan["id"]) => PLANS.find((p) => p.id === id)!;
export const yearlyPrice = (p: Plan) => p.price * 10;

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const pkg = (id: Plan["id"]) => `our ${usd(planById(id).price)}/mo ${planById(id).name} package`;
/** "$597 a month as part of our Growth package", for prose that reads "It costs ...". */
const costs = (id: Plan["id"]) => `${usd(planById(id).price)} a month as part of our ${planById(id).name} package`;
const CUSTOM = "Need something different? Call us for custom pricing";

/**
 * Text that replaces {{PRICE:<key>}} in content files (services, trade pages, guides). Written to read naturally after
 * "It costs ..." or "... is ...". Packages only: nothing is sold piece by piece; custom pricing is on a call.
 */
export const PRICE_TEXT: Record<string, string> = {
  ai: `${costs("growth")}, with 150 AI answering minutes included and $0.40 for each extra minute`,
  aiShort: `${usd(planById("growth").price)}/mo Growth package, 150 min incl., then $0.40/min`,
  textback: `${costs("reviews")}, which also includes review automation, and it's in every package`,
  reviews: `${costs("reviews")}, which also includes missed-call text-back`,
  gbp: `${costs("starter")}, together with your website and social posting`,
  social: `included with Google Business Profile management in ${pkg("starter")}`,
  website: `${costs("starter")}, with hosting, edits, Google Business Profile management and social posting included`,
  campaigns: `${costs("growth")}, together with the CRM, follow-ups and 24/7 AI answering`,
  crm: `${costs("growth")}, with follow-ups, seasonal campaigns and 24/7 AI answering included`,
  seo: `${costs("complete")}: 4 new service-and-town pages a month plus AI search work`,
  aeo: `${costs("complete")}, together with local SEO pages`,
  ads: `managed in ${pkg("partner")}, with ad spend billed separately`,
  minute: "$0.40",
  // Growth package total at a given number of AI minutes, e.g. {{PRICE:aiAt300}} -> "$657".
  ...Object.fromEntries([100, 200, 300, 600, 1000].map((m) => [`aiAt${m}`, usd(Math.round(planById("growth").price + Math.max(0, m - planById("growth").aiMinutes) * AI_MINUTE_RATE))])),
  plans: `five packages from ${usd(PLANS[0].price)} to ${usd(PLANS[PLANS.length - 1].price)} a month, month to month`,
};

const DEMO_LINK = `<a href="tel:${DEMO_PHONE_E164}">${DEMO_PHONE_DISPLAY}</a>`;

/** Replace {{PRICE:key}} and {{DEMO}} tokens in a content string (HTML allowed). Unknown keys fall back to the plans line. */
export function fillPriceTokens(s: string, html = true): string {
  return s
    .replace(/\{\{PRICE:([a-zA-Z0-9]+)\}\}/g, (_m, k: string) => PRICE_TEXT[k] ?? PRICE_TEXT.plans)
    .replace(/\{\{DEMO\}\}/g, html ? DEMO_LINK : DEMO_PHONE_DISPLAY);
}

/** Price line shown on each service page, by service slug. */
export const SERVICE_PRICE: Record<string, string> = {
  "ai-answering-service": `Included in ${pkg("growth")} and up, with 150 minutes a month, then $0.40 a minute. ${CUSTOM}`,
  "missed-call-text-back": `Included in every package, from ${pkg("reviews")}`,
  "review-generation": `Included in every package, from ${pkg("reviews")}`,
  "google-business-profile": `Included from ${pkg("starter")}`,
  "social-media-posting": `Included from ${pkg("starter")}, with Google Business Profile management`,
  "contractor-websites": `Included from ${pkg("starter")}, with hosting and edits`,
  "crm-automation": `Included from ${pkg("growth")}`,
  "email-sms-campaigns": `Included from ${pkg("growth")}. Carrier and message fees depend on volume`,
  "local-seo": `Included from ${pkg("complete")}`,
  "ai-search-optimization": `Included from ${pkg("complete")}, with local SEO`,
};
/** Services that run on the CRM: included from the Growth package. */
export const ON_CRM_PRICE = `Runs on the CRM, included from ${pkg("growth")}. We confirm what's included, and any usage or processing fees, in writing before you start`;

export const PRICING_TERMS = [
  ["Move up or down any time", "Slow season? Drop a package. Busy season? Step back up. No contracts and no penalties."],
  ["2 months free on yearly", "Pay 12 months up front and you pay for 10."],
  ["Custom packages on a call", "Just one service, a different mix or more than one location? Book a call or call us and we'll price it for you."],
];

export const PRICING_FAQS = [
  {
    q: "How much does TableTurnerr cost?",
    a: `Five packages, month to month: ${PLANS.map((p) => `${p.name} ${usd(p.price)}`).join(", ")} a month. Each includes everything in the one before it. Need something different for your business? Call us or book a call for custom pricing.`,
  },
  {
    q: "How much does the AI answering service cost?",
    a: `It's included in the Growth (${usd(planById("growth").price)}) and Complete (${usd(planById("complete").price)}) packages with 150 minutes a month, and in Partner (${usd(planById("partner").price)}) with 400 minutes. Extra minutes are $0.40. Need AI answering on its own? Call us for custom pricing. Hear it on our demo line, ${DEMO_PHONE_DISPLAY}.`,
  },
  {
    q: "Can I pick and choose services?",
    a: `No, to keep pricing simple every package is fixed. If none of them fits, call us or book a call and we'll give you a custom price for your business.`,
  },
  {
    q: "Can I get an exact price for my business?",
    a: "Yes. Book a 15-minute call or call us. We'll look at what your business needs and give you a custom price.",
  },
  {
    q: "Is there a contract?",
    a: "No. Move up or down whenever you need. Slow season? Drop a package. Busy season? Step back up. No contracts and no penalties.",
  },
  {
    q: "Is there a discount for paying yearly?",
    a: "Yes. Pay 12 months up front and get 2 months free.",
  },
  {
    q: "What are the free review cards?",
    a: "Custom NFC review cards with your logo, designed and shipped free to new clients. Your crew hands one to the customer after the job. The customer taps it with their phone, or scans the QR code, and lands on your Google review page.",
  },
  {
    q: "Do you run ads?",
    a: `Yes, on the Partner package: Google Ads and Local Services Ads management, with ad spend billed separately. Every other package works without an ad budget.`,
  },
  {
    q: "Does it work with my job software?",
    a: "Yes. We connect to Jobber, Housecall Pro and GorillaDesk, so review requests and follow-ups go out when a job is marked done.",
  },
];
