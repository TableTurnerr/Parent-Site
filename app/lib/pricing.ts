// Single source of truth for pricing, shared by the homepage pricing section, the /pricing page and the pricing
// calculator. Plain data (no server imports) so the client-side calculator can use it.
//
// Set by the owner on 2026-11-23: four fixed prices, month to month, no ads and no $1,000 level.
//   Reviews only                                   $97
//   Reviews + website, or reviews + posting         $297   (posting = Google Business Profile + social media)
//   Reviews + website + posting                     $397
//   Anything from the growth engine (SEO, AEO,      $497   (and everything above is included)
//   missed-call text-back, AI answering, follow-ups)

export interface Tier {
  id: "reviews" | "starter" | "growth" | "complete";
  name: string;
  price: number;
  forWho: string;
  features: string[];
}

export const DFY_TIERS: Tier[] = [
  {
    id: "reviews",
    name: "Reviews",
    price: 97,
    forWho: "More 5-star Google reviews, on autopilot.",
    features: [
      "We ask for honest reviews from every eligible customer after each job, by text and email, with a personalized photo of you or your crew",
      "Replies to every review, written for you",
      "Integrates with your CRM, FSM, or invoicing/accounting software, so requests go out on their own",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 297,
    forWho: "Reviews, plus a website or regular posting.",
    features: [
      "Everything in Reviews",
      "Plus one: an SEO and AEO optimized website, or Google Business Profile management with social posting",
      "Monthly report in plain English",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 397,
    forWho: "Reviews, your website and your Google profile, all handled.",
    features: [
      "Everything in Starter",
      "An SEO and AEO optimized website that turns visitors into calls",
      "Google Business Profile management: optimized profile, posts and updates, shared to social",
    ],
  },
  {
    id: "complete",
    name: "Complete",
    price: 497,
    forWho: "Everything that turns searches into booked jobs, so no lead slips through.",
    features: [
      "Everything in Growth",
      "Local SEO pages for every service and town you serve",
      "AI search optimization (AEO), so ChatGPT, Gemini and Google's AI answers can recommend you",
      "Missed-call text-back, so no caller goes cold",
      "AI answering service for after-hours calls, with 150 minutes a month free",
      "CRM with AI follow-ups, appointment reminders and estimate reminders",
      "Seasonal campaigns to past customers",
    ],
  },
];

/** Calculator options. Reviews are always included; "engine" options move the plan to Complete. */
export interface PriceOption {
  id: string;
  label: string;
  desc: string;
  group: "basics" | "engine";
}

export const PRICE_OPTIONS: PriceOption[] = [
  { id: "website", label: "Website", desc: "Fast, SEO and AEO optimized, built to turn visitors into calls", group: "basics" },
  { id: "gbp", label: "Google Business Profile management", desc: "Optimized profile, regular posts and updates", group: "basics" },
  { id: "social", label: "Social media posts", desc: "The same content on Facebook and Instagram", group: "basics" },
  { id: "seo", label: "Local SEO", desc: "Pages for every service and town you serve", group: "engine" },
  { id: "aeo", label: "AI search (AEO)", desc: "Get recommended by ChatGPT, Gemini and Google AI", group: "engine" },
  { id: "textback", label: "Missed-call text-back", desc: "Every missed call gets a text in seconds", group: "engine" },
  { id: "ai", label: "AI answering service", desc: "After-hours calls answered and booked. 150 minutes a month free", group: "engine" },
  { id: "followup", label: "CRM and follow-ups", desc: "Estimate reminders and AI follow-ups that run on their own", group: "engine" },
  { id: "seasonal", label: "Seasonal campaigns", desc: "Tune-up reminders and offers to past customers", group: "engine" },
];

/** Which plan a set of selected option ids lands on. */
export function tierFor(selected: Iterable<string>): Tier {
  const s = new Set(selected);
  const byId = (id: Tier["id"]) => DFY_TIERS.find((t) => t.id === id)!;
  if (PRICE_OPTIONS.some((o) => o.group === "engine" && s.has(o.id))) return byId("complete");
  const posting = s.has("gbp") || s.has("social");
  if (s.has("website") && posting) return byId("growth");
  if (s.has("website") || posting) return byId("starter");
  return byId("reviews");
}

export const PRICING_FAQS = [
  {
    q: "How much does TableTurnerr cost?",
    a: "Four fixed prices, month to month. Reviews only is $97/mo. Reviews plus an SEO and AEO optimized website, or reviews plus Google Business Profile management and social posting, is $297/mo. Reviews, website and Google Business Profile management together is $397/mo. Complete is $497/mo: everything, including local SEO, AI search (AEO), missed-call text-back, an after-hours AI answering service and CRM follow-ups.",
  },
  {
    q: "Which plan should I pick?",
    a: "The free Google Maps audit tells you. If you only need more reviews, start with Reviews. If your website is the weak spot, add it. If you're missing calls or leads go cold after an estimate, Complete fixes that.",
  },
  {
    q: "What are the free review cards?",
    a: "Every new client gets them free. When you sign up, we design custom NFC review cards with your logo and ship them to you, free. Your crew hands one to the customer after the job. The customer taps it with their phone, or scans the QR code, and lands right on your Google review page.",
  },
  {
    q: "Do you run ads?",
    a: "No. We focus on what brings calls without an ad budget and what we can show results for: reviews, your website, your Google profile, AI search and follow-up.",
  },
  {
    q: "Is there a contract?",
    a: "No. Every plan is month to month, so you can move up, move down or stop.",
  },
  {
    q: "Is the software included?",
    a: "Yes. The review automation, CRM, missed-call text-back and AI tools we built are part of the plans. We set them up and run them, so there's nothing extra to buy or learn.",
  },
  {
    q: "Does it work with my job software?",
    a: "Yes. We connect to Jobber, Housecall Pro and GorillaDesk, so review requests and follow-ups go out when a job is marked done.",
  },
];
