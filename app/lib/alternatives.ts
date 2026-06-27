// Competitor "alternative" pages — the dominant organic play in this niche.
// IMPORTANT (FTC compliance): every comparison claim is about how the
// competitor is STRUCTURED (e.g. priced per location, priced per technician,
// generic vs vertical), which is high-confidence and durable — we deliberately
// avoid publishing specific competitor dollar figures, which are time-sensitive
// and partly vendor-reported (see docs/new-site/research/niche-analysis-2026-06).
// Claims about TableTurnerr are factual statements about our own product.

export type Cell = boolean | "partial" | string;

export interface Alternative {
  slug: string; // e.g. "birdeye-alternative"
  competitor: string; // "Birdeye"
  category: string; // short label of what they are
  metaTitle: string;
  metaDescription: string;
  tagline: string; // hero H1
  intro: string; // hero lead
  // A fair, non-disparaging acknowledgement of where the competitor fits, so the
  // page reads as honest comparison rather than a hit piece.
  fairTake: string;
  // Why a home-service shop tends to pick us instead.
  ourAngle: string;
  // The terms/pricing framing for the callout band (structure, not dollars).
  termsNote: string;
  compare: { f: string; us: Cell; them: Cell }[];
  reasons: { t: string; b: string }[];
  faqs: { q: string; a: string }[];
}

export const ALTERNATIVES: Record<string, Alternative> = {
  "birdeye-alternative": {
    slug: "birdeye-alternative",
    competitor: "Birdeye",
    category: "Enterprise reputation platform",
    metaTitle: "Birdeye Alternative for Home Services | TableTurnerr",
    metaDescription:
      "Looking for a Birdeye alternative built for home-service shops, not enterprise chains? TableTurnerr is flat, month-to-month review automation for HVAC, roofing, plumbing & electrical — no per-location pricing, no annual contract.",
    tagline: "The Birdeye alternative built for home-service shops",
    intro:
      "Birdeye is a broad, enterprise reputation platform aimed at large multi-location brands. If you run an HVAC, roofing, plumbing or electrical business, TableTurnerr gives you the review automation you actually need — without enterprise pricing, per-location math, or an annual contract.",
    fairTake:
      "Birdeye is a capable, wide-ranging platform with a large customer base, and it makes sense for big multi-location organizations with a marketing team to run it. It's priced and packaged for that buyer: per location, typically on an annual contract with an implementation process.",
    ourAngle:
      "TableTurnerr does one job exceptionally well for the trades: turn every completed job into reviews across Google, Facebook, Yelp and Angi, with technician leaderboards and map-pack tracking. One flat price, month-to-month, live the same day.",
    termsNote:
      "Birdeye is generally sold per location on annual contracts with an implementation fee. TableTurnerr is one flat monthly price, month-to-month, with no setup fee and no contract.",
    compare: [
      { f: "Built specifically for home-service trades", us: true, them: false },
      { f: "Flat price (not per location)", us: true, them: false },
      { f: "Month-to-month, no annual contract", us: true, them: false },
      { f: "Live the same day, no implementation project", us: true, them: false },
      { f: "Reviews across Google, Facebook, Yelp & Angi", us: true, them: true },
      { f: "Technician leaderboards", us: true, them: "partial" },
      { f: "Map-pack rank tracking", us: true, them: true },
      { f: "Never gates or filters reviews", us: true, them: true },
      { f: "90-day results guarantee", us: true, them: false },
    ],
    reasons: [
      {
        t: "Priced for a shop, not a chain",
        b: "No per-location pricing and no annual commitment. You pay one flat monthly price and can cancel anytime.",
      },
      {
        t: "Set up in minutes, not weeks",
        b: "Connect your CRM, import your customers, and start asking for reviews on your next completed job — no onboarding project required.",
      },
      {
        t: "Made for the trades",
        b: "Technician leaderboards, big-ticket job timing, and map-pack tracking are built in, not bolted on.",
      },
    ],
    faqs: [
      {
        q: "Is TableTurnerr a good Birdeye alternative for a small home-service business?",
        a: "Yes. Birdeye is built for enterprise and multi-location brands and priced per location. TableTurnerr is built for independent HVAC, roofing, plumbing and electrical shops, with one flat month-to-month price and no implementation project.",
      },
      {
        q: "Does TableTurnerr cover the same review sites as Birdeye?",
        a: "For the platforms that matter to home services — Google, Facebook, Yelp and Angi — yes. We focus on the sites your customers actually use to choose a contractor, rather than monitoring hundreds of directories you'll never need.",
      },
      {
        q: "Do I have to sign a contract?",
        a: "No. TableTurnerr is month-to-month and you can cancel anytime. We also back it with a 90-day results guarantee: more reviews in 90 days or your next month is free.",
      },
    ],
  },

  "nicejob-alternative": {
    slug: "nicejob-alternative",
    competitor: "NiceJob",
    category: "Review software",
    metaTitle: "NiceJob Alternative for Home Services | TableTurnerr",
    metaDescription:
      "A NiceJob alternative for HVAC, roofing, plumbing & electrical pros: multi-platform review automation with technician leaderboards, map-pack tracking, and a strict no-review-gating policy. Month-to-month, no contract.",
    tagline: "A NiceJob alternative made for the trades",
    intro:
      "NiceJob is a solid review tool for service businesses. TableTurnerr is built specifically for home-service trades — with technician leaderboards, map-pack rank tracking, broader platform coverage, and a firm no-gating policy that keeps you on the right side of Google and the FTC.",
    fairTake:
      "NiceJob is a well-known, affordable review tool with month-to-month terms and the integrations most shops need. It's a reasonable starting point for a lot of small businesses.",
    ourAngle:
      "TableTurnerr goes deeper for the trades: per-technician leaderboards to motivate the crew, map-pack rank tracking so you can see the local-search payoff, coverage across Google, Facebook, Yelp and Angi, and a strict policy of never routing unhappy customers away from public reviews.",
    termsNote:
      "Both tools are month-to-month with no long-term contract. The difference is focus: TableTurnerr is built around home-service trades and a no-gating, compliance-first approach.",
    compare: [
      { f: "Built specifically for home-service trades", us: true, them: "partial" },
      { f: "Reviews across Google, Facebook, Yelp & Angi", us: true, them: "partial" },
      { f: "Technician leaderboards", us: true, them: false },
      { f: "Map-pack rank tracking", us: true, them: false },
      { f: "Never routes unhappy customers to a private form", us: true, them: "partial" },
      { f: "Connects to Jobber, Housecall Pro & ServiceTitan", us: true, them: true },
      { f: "Month-to-month, no contract", us: true, them: true },
      { f: "90-day results guarantee", us: true, them: false },
    ],
    reasons: [
      {
        t: "Compliance-first, no gating",
        b: "Some review tools include a 'feedback funnel' that sends unhappy customers to a private form before the public review step. The FTC now restricts that practice. TableTurnerr never does it — every customer gets the same public ask.",
      },
      {
        t: "Built for the crew",
        b: "Technician leaderboards turn reviews into friendly competition, so your techs actually make the ask on every job.",
      },
      {
        t: "See the local-search payoff",
        b: "Map-pack rank tracking shows your Google ranking climbing as the reviews come in — not just a count of reviews.",
      },
    ],
    faqs: [
      {
        q: "How is TableTurnerr different from NiceJob?",
        a: "Both automate review requests, but TableTurnerr is built specifically for home-service trades. You get per-technician leaderboards, map-pack rank tracking, coverage across Google, Facebook, Yelp and Angi, and a strict no-gating policy.",
      },
      {
        q: "What does 'no review gating' mean?",
        a: "Review gating is when a tool asks customers how they feel first and only sends the happy ones to leave a public review. Google and the FTC restrict it. TableTurnerr asks every customer for a public review the same way — no filtering.",
      },
      {
        q: "Can I switch from NiceJob easily?",
        a: "Yes. Connect your CRM, we import your customers, and review requests start on your next completed job. It's month-to-month with a 90-day results guarantee.",
      },
    ],
  },

  "podium-alternative": {
    slug: "podium-alternative",
    competitor: "Podium",
    category: "SMB messaging & reviews",
    metaTitle: "Podium Alternative for Home Services | TableTurnerr",
    metaDescription:
      "A focused Podium alternative for HVAC, roofing, plumbing & electrical: review automation that turns completed jobs into 5-star reviews across Google, Facebook, Yelp & Angi — with technician leaderboards and map-pack tracking. Month-to-month.",
    tagline: "The Podium alternative focused on reviews that win jobs",
    intro:
      "Podium is a broad messaging platform for small businesses, with reviews as one feature among many. TableTurnerr is purpose-built for home-service review automation — so every completed job becomes reviews on the sites that actually win you the next customer.",
    fairTake:
      "Podium is a capable omnichannel messaging suite, and if your main need is a shared inbox and payments across many channels, it covers a lot of ground for a general small business.",
    ourAngle:
      "If what you really want is more 5-star reviews from every finished job, TableTurnerr is built for exactly that — for the trades. Job-completion-triggered requests, technician leaderboards, map-pack tracking, and coverage across Google, Facebook, Yelp and Angi, without paying for a full messaging platform you won't use.",
    termsNote:
      "TableTurnerr is one flat monthly price, month-to-month, with no contract — and review automation is the whole product, not a paid add-on.",
    compare: [
      { f: "Built specifically for home-service trades", us: true, them: false },
      { f: "Review automation is the core product", us: true, them: "partial" },
      { f: "Reviews across Google, Facebook, Yelp & Angi", us: true, them: true },
      { f: "Technician leaderboards", us: true, them: false },
      { f: "Map-pack rank tracking", us: true, them: false },
      { f: "Triggered automatically by completed jobs", us: true, them: "partial" },
      { f: "Month-to-month, no contract", us: true, them: false },
      { f: "90-day results guarantee", us: true, them: false },
    ],
    reasons: [
      {
        t: "Reviews, not a whole platform",
        b: "You're not paying for a full messaging-and-payments suite. TableTurnerr does review automation for the trades and does it well.",
      },
      {
        t: "Triggered by the work itself",
        b: "Connect your field-service CRM and every completed job automatically asks that customer for a review at the right moment.",
      },
      {
        t: "Built for the trades",
        b: "Technician leaderboards and map-pack tracking are designed around how home-service shops actually grow.",
      },
    ],
    faqs: [
      {
        q: "Is TableTurnerr a good Podium alternative for contractors?",
        a: "Yes, if your priority is reviews. Podium is a broad messaging platform with reviews as one feature. TableTurnerr is purpose-built review automation for home-service trades, triggered automatically by completed jobs.",
      },
      {
        q: "Does TableTurnerr include texting and a shared inbox like Podium?",
        a: "TableTurnerr sends review requests by text and email automatically, but it isn't a full omnichannel messaging suite. It's focused on turning finished jobs into reviews — which keeps it simpler and more affordable for a shop.",
      },
      {
        q: "How quickly can I get started?",
        a: "About a minute to connect your CRM. We import your customers and start sending review requests on your next completed job, month-to-month with a 90-day results guarantee.",
      },
    ],
  },

  "gatherup-alternative": {
    slug: "gatherup-alternative",
    competitor: "GatherUp",
    category: "Reputation software",
    metaTitle: "GatherUp Alternative for Home Services | TableTurnerr",
    metaDescription:
      "A GatherUp alternative built for the trades: home-service review automation with technician leaderboards, map-pack tracking, and coverage across Google, Facebook, Yelp & Angi. Flat, month-to-month pricing.",
    tagline: "A GatherUp alternative built around the trades",
    intro:
      "GatherUp is a general-purpose reputation tool that works for all kinds of small and multi-location businesses. TableTurnerr is built around one buyer — the home-service shop — so the features, timing, and reporting all fit how the trades actually win work.",
    fairTake:
      "GatherUp is a feature-rich, month-to-month reputation platform that sets a high table-stakes bar across many industries. For a generalist agency or a mixed portfolio of businesses, it's a strong option.",
    ourAngle:
      "TableTurnerr trades breadth for fit. You get technician leaderboards, big-ticket job timing, map-pack rank tracking, and a no-gating policy — built specifically for HVAC, roofing, plumbing and electrical, with one flat price.",
    termsNote:
      "Both are month-to-month with no contract. TableTurnerr's edge is vertical fit: everything is tuned for home-service trades rather than spread across every industry.",
    compare: [
      { f: "Built specifically for home-service trades", us: true, them: false },
      { f: "Technician leaderboards", us: true, them: false },
      { f: "Map-pack rank tracking", us: true, them: "partial" },
      { f: "Reviews across Google, Facebook, Yelp & Angi", us: true, them: true },
      { f: "Connects to Jobber, Housecall Pro & ServiceTitan", us: true, them: "partial" },
      { f: "Flat price, no per-location math", us: true, them: false },
      { f: "Month-to-month, no contract", us: true, them: true },
      { f: "90-day results guarantee", us: true, them: false },
    ],
    reasons: [
      {
        t: "Vertical focus beats breadth",
        b: "Instead of a generic tool for every industry, you get one tuned for the trades — timing, leaderboards, and reporting that match how shops grow.",
      },
      {
        t: "Flat, simple pricing",
        b: "One price, month-to-month, with no per-location tiers to track as you grow.",
      },
      {
        t: "Built-in motivation",
        b: "Technician leaderboards make review-getting a team sport, so the ask happens on every job.",
      },
    ],
    faqs: [
      {
        q: "Why choose TableTurnerr over GatherUp?",
        a: "GatherUp is a strong generalist reputation tool. TableTurnerr is built specifically for home-service trades, with technician leaderboards, map-pack tracking, and job-completion timing tuned for HVAC, roofing, plumbing and electrical.",
      },
      {
        q: "Does TableTurnerr work with my field-service CRM?",
        a: "Yes — we connect directly to Jobber, Housecall Pro, ServiceTitan, Workiz and QuickBooks, so completed jobs automatically trigger review requests.",
      },
      {
        q: "Is there a contract?",
        a: "No. TableTurnerr is month-to-month and backed by a 90-day results guarantee: more reviews in 90 days or your next month is free.",
      },
    ],
  },

  "pulsem-alternative": {
    slug: "pulsem-alternative",
    competitor: "PulseM",
    category: "Technician-centric reviews",
    metaTitle: "PulseM Alternative for Home Services | TableTurnerr",
    metaDescription:
      "A PulseM alternative with flat pricing that doesn't punish growth: home-service review automation with technician leaderboards, map-pack tracking, and multi-platform coverage. Month-to-month, no per-technician fees.",
    tagline: "A PulseM alternative that doesn't charge per technician",
    intro:
      "PulseM popularized technician-based review requests. TableTurnerr gives you the same per-technician motivation — with leaderboards and personalized requests — but on a flat price that doesn't grow every time you hire, plus broader platform coverage.",
    fairTake:
      "PulseM is well-known for technician-centric review requests with tech bios, and shops that live inside ServiceTitan often hear about it first.",
    ourAngle:
      "TableTurnerr keeps the technician angle — leaderboards and per-tech attribution — but prices it flat instead of per technician, so growing your crew doesn't grow your bill. You also get coverage across Google, Facebook, Yelp and Angi and map-pack rank tracking.",
    termsNote:
      "PulseM is generally priced per technician/user, so the cost climbs as you add techs. TableTurnerr is one flat monthly price, month-to-month, no matter how big your crew gets.",
    compare: [
      { f: "Flat price (not per technician)", us: true, them: false },
      { f: "Technician leaderboards & attribution", us: true, them: true },
      { f: "Reviews across Google, Facebook, Yelp & Angi", us: true, them: "partial" },
      { f: "Map-pack rank tracking", us: true, them: false },
      { f: "Works beyond a single CRM", us: true, them: "partial" },
      { f: "Built specifically for home-service trades", us: true, them: true },
      { f: "Month-to-month, no contract", us: true, them: true },
      { f: "90-day results guarantee", us: true, them: false },
    ],
    reasons: [
      {
        t: "Growth doesn't raise your bill",
        b: "Per-technician pricing punishes hiring — a bigger crew means a bigger bill every month. TableTurnerr is one flat price no matter how many techs you run.",
      },
      {
        t: "Keep the technician motivation",
        b: "You still get per-tech attribution and leaderboards, so the crew competes to earn 5-star reviews on every job.",
      },
      {
        t: "Broader reach",
        b: "Reviews across Google, Facebook, Yelp and Angi, plus map-pack rank tracking — not just a single platform.",
      },
    ],
    faqs: [
      {
        q: "How is TableTurnerr different from PulseM?",
        a: "Both use technicians to drive reviews, but PulseM is generally priced per technician, so your cost grows as you hire. TableTurnerr is one flat month-to-month price with the same leaderboards and per-tech attribution, plus broader platform coverage.",
      },
      {
        q: "Do I still get technician leaderboards?",
        a: "Yes. Per-technician attribution and leaderboards are built in, so you can see which techs earn the most 5-star reviews and turn it into friendly competition.",
      },
      {
        q: "Is TableTurnerr tied to one CRM?",
        a: "No. We connect to Jobber, Housecall Pro, ServiceTitan, Workiz and QuickBooks, so you're not locked to a single platform.",
      },
    ],
  },
};

export const ALTERNATIVE_SLUGS = Object.keys(ALTERNATIVES);
export const getAlternative = (slug: string): Alternative | undefined =>
  ALTERNATIVES[slug];
export const ALL_ALTERNATIVES = Object.values(ALTERNATIVES);
