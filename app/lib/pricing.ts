// Single source of truth for pricing, shared by the homepage pricing section, the /pricing page, the pricing
// calculator, service pages, /pricing.md and llms-full.txt. Plain data (no server imports) so client components can use it.
//
// Packages: the owner's seven plans (2026-11-25) were regrouped on 2026-11-26 into five packages, the way the site
// priced them before (each includes everything in the one before it). Single services are still sold on their own and
// shown in the custom-pricing bar; on a call we tailor the package up or down. Content files use {{PRICE:<key>}} tokens
// (see PRICE_TEXT below), so a price change here updates every page.

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

/** One service on its own. `plan` is the first plan that includes it. */
export interface Standalone {
  id: string;
  name: string;
  price: number;
  note: string;
  plan: Plan["id"];
  href: string;
}

export const STANDALONE: Standalone[] = [
  { id: "ai", name: "AI answering service", price: 197, note: "24/7, 150 minutes included, then $0.40 a minute", plan: "growth", href: "/services/ai-answering-service" },
  { id: "textback", name: "Missed-call text-back", price: 49, note: "Every missed call gets a text in seconds", plan: "reviews", href: "/services/missed-call-text-back" },
  { id: "reviews", name: "Review automation", price: 97, note: "The Reviews plan: requests, AI replies, text-back, NFC cards", plan: "reviews", href: "/services/review-generation" },
  { id: "gbp", name: "Google Business Profile management", price: 147, note: "Weekly posts, photos, services and Q&A", plan: "starter", href: "/services/google-business-profile" },
  { id: "website", name: "Website", price: 197, note: "Built for Google and AI search, hosting and edits included", plan: "starter", href: "/services/contractor-websites" },
  { id: "crm", name: "CRM, follow-ups and campaigns", price: 197, note: "Estimate reminders, AI follow-ups, seasonal campaigns", plan: "growth", href: "/services/crm-automation" },
  { id: "seo", name: "Local SEO and AI search", price: 397, note: "4 new service-and-town pages a month, plus AEO", plan: "complete", href: "/services/local-seo" },
];

const sa = (id: string) => STANDALONE.find((s) => s.id === id)!;
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const fromPlan = (id: Plan["id"]) => `the ${usd(planById(id).price)} ${planById(id).name} plan`;

/**
 * Text that replaces {{PRICE:<key>}} in content files (services, trade pages, guides). Written to read naturally after
 * "It costs ..." or "... is ...". Keep these in sync with the plans above; they're generated, so they normally are.
 */
export const PRICE_TEXT: Record<string, string> = {
  ai: `${usd(sa("ai").price)} a month on its own with 150 minutes included, then $0.40 a minute, and it's included in plans from ${usd(planById("growth").price)} a month`,
  aiShort: `${usd(sa("ai").price)}/mo incl. 150 min, then $0.40/min`,
  textback: `${usd(sa("textback").price)} a month on its own, and it's included in every plan from ${fromPlan("reviews")}`,
  reviews: `${usd(planById("reviews").price)} a month on the Reviews plan, which also includes missed-call text-back`,
  gbp: `${usd(sa("gbp").price)} a month on its own, and it's included in plans from ${fromPlan("starter")}`,
  social: `included with Google Business Profile management, from ${fromPlan("starter")}`,
  website: `${usd(sa("website").price)} a month on its own with hosting and edits, and it's included in plans from ${fromPlan("starter")}`,
  campaigns: `${usd(sa("crm").price)} a month on its own together with the CRM and follow-ups, and it's included in plans from ${fromPlan("growth")}`,
  crm: `${usd(sa("crm").price)} a month on its own with follow-ups and seasonal campaigns, and it's included in plans from ${fromPlan("growth")}`,
  seo: `${usd(sa("seo").price)} a month on its own for 4 new pages a month plus AI search work, and it's included in ${fromPlan("complete")}`,
  aeo: `part of local SEO and AI search, ${usd(sa("seo").price)} a month on its own, and it's included in ${fromPlan("complete")}`,
  ads: `managed on ${fromPlan("partner")}, with ad spend billed separately`,
  minute: "$0.40",
  // Standalone AI answering total at a given number of minutes, e.g. {{PRICE:aiAt300}} -> "$257".
  ...Object.fromEntries([100, 200, 300, 600, 1000].map((m) => [`aiAt${m}`, usd(Math.round(sa("ai").price + Math.max(0, m - 150) * AI_MINUTE_RATE))])),
  plans: `from ${usd(PLANS[0].price)} to ${usd(PLANS[PLANS.length - 1].price)} a month, month to month`,
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
  "ai-answering-service": `${usd(sa("ai").price)}/mo on its own with 150 minutes included, then $0.40 a minute. Included from ${fromPlan("growth")}`,
  "missed-call-text-back": `${usd(sa("textback").price)}/mo on its own. Included in every plan from ${fromPlan("reviews")}`,
  "review-generation": `${usd(planById("reviews").price)}/mo on the Reviews plan, included in every plan`,
  "google-business-profile": `${usd(sa("gbp").price)}/mo on its own. Included from ${fromPlan("starter")}`,
  "social-media-posting": `Comes with Google Business Profile management, from ${fromPlan("starter")}`,
  "contractor-websites": `${usd(sa("website").price)}/mo on its own with hosting and edits. Included from ${fromPlan("starter")}`,
  "crm-automation": `${usd(sa("crm").price)}/mo on its own. Included from ${fromPlan("growth")}`,
  "email-sms-campaigns": `Included from ${fromPlan("growth")}, or ${usd(sa("crm").price)}/mo on its own with the CRM. Carrier and message fees depend on volume`,
  "local-seo": `${usd(sa("seo").price)}/mo on its own. Included in ${fromPlan("complete")}`,
  "ai-search-optimization": `Comes with local SEO, ${usd(sa("seo").price)}/mo on its own. Included in ${fromPlan("complete")}`,
};
/** Services that run on the CRM: priced on the call, from the Growth package. */
export const ON_CRM_PRICE = `Runs on the CRM, included from ${fromPlan("growth")}. We confirm what's included, and any usage or processing fees, in writing before you start`;

/** Calculator options. Each maps to the first plan that includes it; the result is the highest of those. */
export interface PriceOption {
  id: string;
  label: string;
  desc: string;
  plan: Plan["id"];
}

export const PRICE_OPTIONS: PriceOption[] = [
  { id: "textback", label: "Missed-call text-back", desc: "Every missed call gets a text in seconds", plan: "reviews" },
  { id: "gbp", label: "Google Business Profile + social posts", desc: "Weekly posts so you look open and busy", plan: "starter" },
  { id: "website", label: "Website", desc: "Built for Google and AI search, hosting and edits included", plan: "starter" },
  { id: "followup", label: "CRM and follow-ups", desc: "Estimate reminders and AI follow-ups", plan: "growth" },
  { id: "seasonal", label: "Seasonal campaigns", desc: "Tune-ups, referrals and repeat jobs from past customers", plan: "growth" },
  { id: "ai", label: "AI answering, 24/7", desc: "Every call answered and booked. 150 minutes included", plan: "growth" },
  { id: "seo", label: "New service-and-town pages", desc: "4 pages a month for local search", plan: "complete" },
  { id: "aeo", label: "AI search (ChatGPT, Gemini)", desc: "Get recommended in AI answers", plan: "complete" },
  { id: "ads", label: "Google Ads and LSA management", desc: "Plus strategy and a monthly founders' call", plan: "partner" },
];

/** The smallest plan that includes every selected option (reviews are always included). */
export function planFor(selected: Iterable<string>): Plan {
  let idx = 0;
  for (const id of selected) {
    const o = PRICE_OPTIONS.find((x) => x.id === id);
    if (o) idx = Math.max(idx, PLANS.findIndex((p) => p.id === o.plan));
  }
  return PLANS[idx];
}

/** Monthly cost of AI answering minutes on a plan (plan price + extra minutes). */
export function monthlyWithMinutes(p: Plan, minutes: number): { total: number; extraMinutes: number; extra: number } {
  const extraMinutes = p.aiMinutes > 0 ? Math.max(0, minutes - p.aiMinutes) : 0;
  const extra = Math.round(extraMinutes * AI_MINUTE_RATE * 100) / 100;
  return { total: p.price + extra, extraMinutes, extra };
}

export const PRICING_TERMS = [
  ["Move up or down any time", "Slow season? Drop a package. Busy season? Step back up. No contracts and no penalties."],
  ["2 months free on yearly", "Pay 12 months up front and you pay for 10."],
  ["Custom packages on a call", "Just one service, a different mix or more than one location? Book a call or call us and we'll price it for you."],
];

export const PRICING_FAQS = [
  {
    q: "How much does TableTurnerr cost?",
    a: `Five packages, month to month: ${PLANS.map((p) => `${p.name} ${usd(p.price)}`).join(", ")} a month. Each includes everything in the one before it. Need just one service or a different mix? We price that on a call. Single services start at ${usd(Math.min(...STANDALONE.map((x) => x.price)))} a month, such as AI answering for ${usd(sa("ai").price)} a month.`,
  },
  {
    q: "How much does the AI answering service cost?",
    a: `${usd(sa("ai").price)} a month on its own, with 150 minutes included and $0.40 for each extra minute. It's also included in the Growth (${usd(planById("growth").price)}) and Complete (${usd(planById("complete").price)}) packages with 150 minutes, and in Partner (${usd(planById("partner").price)}) with 400 minutes. Call our demo line, ${DEMO_PHONE_DISPLAY}, to hear it.`,
  },
  {
    q: "Can I buy just one thing?",
    a: `Yes. AI answering, missed-call text-back, review automation, Google Business Profile management, a website, CRM and follow-ups, and local SEO are each sold on their own. Ask on a call for the price. The packages cost less than buying the same pieces separately.`,
  },
  {
    q: "Can I get an exact price for my business?",
    a: "Yes. Book a 15-minute call or call us. We'll look at what you need and build a custom package, up or down, so you don't pay for parts you won't use.",
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
