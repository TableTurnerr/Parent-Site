// Competitor "alternative" pages, the dominant organic play in this niche.
// IMPORTANT (FTC compliance): every comparison claim is about how the
// competitor is STRUCTURED (e.g. priced per location, priced per technician,
// generic vs vertical), which is high-confidence and durable, we deliberately
// avoid publishing specific competitor dollar figures, which are time-sensitive
// and partly vendor-reported (see docs/new-site/research/niche-analysis-2026-06).
// Claims about TableTurnerr are factual statements about our own product.
// Marketing-agency entries (kind: "marketing-agency": Scorpion, Hibu, Thryv, added 2026-11-27) are different: owners
// searching "<agency> alternative" want contract and price facts, so they quote a competitor price or term ONLY where
// it was read on the vendor's own page, and complaint themes only from dated public review pages. Every such fact is
// listed in `sources` with the date checked. TableTurnerr prices come from PRICE_TEXT (app/lib/pricing.ts), never typed.
// Never state what happens to a client's website/domain when they leave TableTurnerr (not confirmed by the owner).

import { PRICE_TEXT } from "./pricing";

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
  // Optional, for the marketing-agency entries. Undefined means "review-software" (the original five pages).
  // AlternativePage can use `kind` to pick AGENCY_OPTIONS instead of OTHER_OPTIONS (app/lib/alternatives-others.ts)
  // and to swap the review-specific copy; `sources` and `related` are meant to render as linked lists.
  kind?: "review-software" | "marketing-agency";
  // Third-party facts used on the page, each with the date it was checked.
  sources?: { label: string; url: string; checked: string }[];
  // Internal links for the page (how to switch, pricing, proof).
  related?: { href: string; label: string }[];
}

export const ALTERNATIVES: Record<string, Alternative> = {
  "birdeye-alternative": {
    slug: "birdeye-alternative",
    competitor: "Birdeye",
    category: "Enterprise reputation platform",
    metaTitle: "Birdeye Alternatives for Home Services (2026) | TableTurnerr",
    metaDescription:
      "A Birdeye alternative built for home-service shops, not enterprise chains. Five fixed packages, month to month, for HVAC, roofing, plumbing and electrical.",
    tagline: "The Birdeye alternative built for home-service shops",
    intro:
      "Birdeye is a broad, enterprise reputation platform aimed at large multi-location brands. If you run an HVAC, roofing, plumbing or electrical business, TableTurnerr gives you the review automation you actually need, without enterprise pricing, per-location math, or an annual contract.",
    fairTake:
      "Birdeye is a capable, wide-ranging platform with a large customer base, and it makes sense for big multi-location organizations with a marketing team to run it. It's priced and packaged for that buyer: per location, typically on an annual contract with an implementation process.",
    ourAngle:
      "TableTurnerr does one job exceptionally well for the trades: turn every completed job into a Google review request, reply to every review with AI, text back missed calls, and hand you NFC review cards and a monthly report. We run it for you. Five fixed packages, month to month.",
    termsNote:
      "Birdeye is generally sold per location on annual contracts with an implementation fee. TableTurnerr is five fixed packages, month to month, with no contract.",
    compare: [
      { f: "Built specifically for home-service trades", us: true, them: false },
      { f: "Fixed package prices (not per location)", us: true, them: false },
      { f: "Month-to-month, no annual contract", us: true, them: false },
      { f: "Done for you: we set it up and run it", us: true, them: "partial" },
      { f: "AI replies to every Google review", us: true, them: true },
      { f: "Missed-call text-back included", us: true, them: "partial" },
      { f: "Never gates or filters reviews", us: true, them: true },
    ],
    reasons: [
      {
        t: "Priced for a shop, not a chain",
        b: "No per-location pricing and no annual commitment. You pick one of five fixed packages, pay month to month, and can cancel anytime.",
      },
      {
        t: "Set up for you, not by you",
        b: "We connect your job software (or import your customer list) and start asking for reviews after your next completed jobs. No onboarding project on your side.",
      },
      {
        t: "Made for the trades",
        b: "Requests timed to the end of each job, AI replies, missed-call text-back and NFC review cards your crew can hand to customers, in one package.",
      },
    ],
    faqs: [
      {
        q: "Is TableTurnerr a good Birdeye alternative for a small home-service business?",
        a: "Yes. Birdeye is built for enterprise and multi-location brands and priced per location. TableTurnerr is built for independent HVAC, roofing, plumbing and electrical shops, with five fixed packages, month to month, and no implementation project.",
      },
      {
        q: "Does TableTurnerr cover as many review sites as Birdeye?",
        a: "No. We focus on Google, where most homeowners pick a contractor, rather than monitoring hundreds of directories. If you need dozens of review sites tracked across many locations, Birdeye covers more ground.",
      },
      {
        q: "Do I have to sign a contract?",
        a: "No. TableTurnerr is month-to-month and you can cancel anytime.",
      },
    ],
  },

  "nicejob-alternative": {
    slug: "nicejob-alternative",
    competitor: "NiceJob",
    category: "Review software",
    metaTitle: "NiceJob Alternatives for Home Services (2026) | TableTurnerr",
    metaDescription:
      "A NiceJob alternative for the trades: Google review requests run for you, AI replies, missed-call text-back, NFC review cards and a strict no-gating policy.",
    tagline: "A NiceJob alternative made for the trades",
    intro:
      "NiceJob is a solid review tool for service businesses. TableTurnerr is built for home-service trades and done for you: we run the review requests, reply to every review with AI, text back missed calls, and keep a firm no-gating policy that stays on the right side of Google and the FTC.",
    fairTake:
      "NiceJob is a well-known, affordable review tool with month-to-month terms and the integrations most shops need. It's a reasonable starting point for a lot of small businesses.",
    ourAngle:
      "TableTurnerr is the done-for-you version: we set up and run the requests, AI replies to every review, missed calls get an instant text back, your crew gets NFC review cards, and you get a monthly report. And we never route unhappy customers away from public reviews.",
    termsNote:
      "Both tools are month-to-month with no long-term contract. The difference is focus: TableTurnerr is built around home-service trades and a no-gating, compliance-first approach.",
    compare: [
      { f: "Built specifically for home-service trades", us: true, them: "partial" },
      { f: "Done for you: we set it up and run it", us: true, them: false },
      { f: "AI replies to every Google review", us: true, them: "partial" },
      { f: "Missed-call text-back included", us: true, them: false },
      { f: "Never routes unhappy customers to a private form", us: true, them: "partial" },
      { f: "Connects to Jobber, Housecall Pro & ServiceTitan (others via Zapier or Make)", us: true, them: true },
      { f: "Month-to-month, no contract", us: true, them: true },
    ],
    reasons: [
      {
        t: "Compliance-first, no gating",
        b: "Some review tools include a 'feedback funnel' that sends unhappy customers to a private form before the public review step. The FTC now restricts that practice. TableTurnerr never does it, every customer gets the same public ask.",
      },
      {
        t: "Nothing for you to run",
        b: "A self-serve tool still needs someone to set it up and watch it. We do that part, and reply to every review for you.",
      },
      {
        t: "More than review requests",
        b: "Missed-call text-back and NFC review cards come in the same package, so fewer calls and fewer happy customers slip through.",
      },
    ],
    faqs: [
      {
        q: "How is TableTurnerr different from NiceJob?",
        a: "Both automate review requests, but TableTurnerr is built specifically for home-service trades. NiceJob is self-serve software; we run the whole thing for you, reply to every review with AI, add missed-call text-back and NFC review cards, and keep a strict no-gating policy.",
      },
      {
        q: "What does 'no review gating' mean?",
        a: "Review gating is when a tool asks customers how they feel first and only sends the happy ones to leave a public review. Google and the FTC restrict it. TableTurnerr asks every customer for a public review the same way, no filtering.",
      },
      {
        q: "Can I switch from NiceJob easily?",
        a: "Yes. We connect your job software or import your customer list, and review requests start after your next completed jobs. It's month to month.",
      },
    ],
  },

  "podium-alternative": {
    slug: "podium-alternative",
    competitor: "Podium",
    category: "SMB messaging & reviews",
    metaTitle: "Podium Alternatives for Home Services (2026) | TableTurnerr",
    metaDescription:
      "A focused Podium alternative for home services: Google review requests after every job, AI replies and missed-call text-back, run for you, month to month.",
    tagline: "The Podium alternative focused on reviews that win jobs",
    intro:
      "Podium is a broad messaging platform for small businesses, with reviews as one feature among many. TableTurnerr is purpose-built for home-service review automation, so every completed job becomes reviews on the sites that actually win you the next customer.",
    fairTake:
      "Podium is a capable omnichannel messaging suite, and if your main need is a shared inbox and payments across many channels, it covers a lot of ground for a general small business.",
    ourAngle:
      "If what you really want is more 5-star reviews from every finished job, TableTurnerr is built for exactly that, for the trades. Requests triggered by completed jobs, AI replies to every review, missed-call text-back and NFC review cards, run for you, without paying for a full messaging platform you won't use.",
    termsNote:
      "TableTurnerr is five fixed packages, month to month, with no contract, and review automation is in every package, not a paid add-on.",
    compare: [
      { f: "Built specifically for home-service trades", us: true, them: false },
      { f: "Review automation is the core product", us: true, them: "partial" },
      { f: "Done for you: we set it up and run it", us: true, them: false },
      { f: "AI replies to every Google review", us: true, them: "partial" },
      { f: "Triggered automatically by completed jobs", us: true, them: "partial" },
      { f: "Month-to-month, no contract", us: true, them: false },
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
        b: "Request timing, text wording and NFC review cards are set up around how home-service jobs end, not around a retail checkout.",
      },
    ],
    faqs: [
      {
        q: "Is TableTurnerr a good Podium alternative for contractors?",
        a: "Yes, if your priority is reviews. Podium is a broad messaging platform with reviews as one feature. TableTurnerr is purpose-built review automation for home-service trades, triggered automatically by completed jobs.",
      },
      {
        q: "Does TableTurnerr include texting and a shared inbox like Podium?",
        a: "TableTurnerr sends review requests by text and email automatically, but it isn't a full omnichannel messaging suite. It's focused on turning finished jobs into reviews, which keeps it simpler and more affordable for a shop.",
      },
      {
        q: "How quickly can I get started?",
        a: "We do the setup: connect your job software or import your customer list, then requests go out after your next completed jobs. Month to month.",
      },
    ],
  },

  "gatherup-alternative": {
    slug: "gatherup-alternative",
    competitor: "GatherUp",
    category: "Reputation software",
    metaTitle: "GatherUp Alternatives for Home Services (2026)",
    metaDescription:
      "A GatherUp alternative built for the trades: Google review requests run for you, AI replies, missed-call text-back and five fixed monthly packages.",
    tagline: "A GatherUp alternative built around the trades",
    intro:
      "GatherUp is a general-purpose reputation tool that works for all kinds of small and multi-location businesses. TableTurnerr is built around one buyer, the home-service shop, so the features, timing, and reporting all fit how the trades actually win work.",
    fairTake:
      "GatherUp is a feature-rich, month-to-month reputation platform that sets a high table-stakes bar across many industries. For a generalist agency or a mixed portfolio of businesses, it's a strong option.",
    ourAngle:
      "TableTurnerr trades breadth for fit. You get review requests timed to the end of each job, AI replies, missed-call text-back, NFC review cards and a no-gating policy, set up and run for you, in five fixed packages.",
    termsNote:
      "Both are month-to-month with no contract. TableTurnerr's edge is vertical fit: everything is tuned for home-service trades rather than spread across every industry.",
    compare: [
      { f: "Built specifically for home-service trades", us: true, them: false },
      { f: "Done for you: we set it up and run it", us: true, them: false },
      { f: "Missed-call text-back included", us: true, them: false },
      { f: "Connects to Jobber, Housecall Pro & ServiceTitan (others via Zapier or Make)", us: true, them: "partial" },
      { f: "Fixed package prices, no per-location math", us: true, them: false },
      { f: "Month-to-month, no contract", us: true, them: true },
    ],
    reasons: [
      {
        t: "Vertical focus beats breadth",
        b: "Instead of a generic tool for every industry, you get one tuned for the trades: request timing, text wording and a monthly report that match how shops work.",
      },
      {
        t: "Simple, fixed pricing",
        b: "Five fixed packages, month to month, with no per-location tiers to track as you grow.",
      },
      {
        t: "Your crew can ask in person too",
        b: "NFC review cards let a tech tap a customer's phone to open your review page, so the ask can happen on the spot.",
      },
    ],
    faqs: [
      {
        q: "Why choose TableTurnerr over GatherUp?",
        a: "GatherUp is a strong generalist reputation tool. TableTurnerr is built for home-service trades and run for you, with requests timed to completed jobs, AI replies, missed-call text-back and NFC review cards.",
      },
      {
        q: "Does TableTurnerr work with my field-service CRM?",
        a: "Yes. Jobber has an official integration, Housecall Pro connects on its plan that allows integrations, and ServiceTitan, Workiz, QuickBooks and others connect through Zapier or Make, so completed jobs automatically trigger review requests.",
      },
      {
        q: "Is there a contract?",
        a: "No. TableTurnerr is month-to-month and you can cancel anytime.",
      },
    ],
  },

  "pulsem-alternative": {
    slug: "pulsem-alternative",
    competitor: "PulseM",
    category: "Technician-centric reviews",
    metaTitle: "PulseM Alternatives for Home Services (2026) | TableTurnerr",
    metaDescription:
      "A PulseM alternative priced by package, not per technician: Google review requests run for you, AI replies, missed-call text-back and NFC review cards.",
    tagline: "A PulseM alternative that doesn't charge per technician",
    intro:
      "PulseM popularized technician-based review requests. TableTurnerr takes a different approach: requests go out after every completed job, run for you, in fixed packages whose price doesn't grow every time you hire.",
    fairTake:
      "PulseM is well-known for technician-centric review requests with tech bios, and shops that live inside ServiceTitan often hear about it first.",
    ourAngle:
      "TableTurnerr doesn't do technician bios or per-tech leaderboards. If that's what motivates your crew, PulseM is the better fit. What we do is run the requests for you, reply to every review with AI, text back missed calls and give your crew NFC review cards, priced by package so a bigger crew doesn't mean a bigger bill.",
    termsNote:
      "PulseM is generally priced per technician/user, so the cost climbs as you add techs. TableTurnerr is five fixed packages, month to month, and the price doesn't change with the size of your crew.",
    compare: [
      { f: "Package price (not per technician)", us: true, them: false },
      { f: "Technician bios and leaderboards", us: false, them: true },
      { f: "Done for you: we set it up and run it", us: true, them: "partial" },
      { f: "Missed-call text-back included", us: true, them: false },
      { f: "Works beyond a single CRM", us: true, them: "partial" },
      { f: "Built specifically for home-service trades", us: true, them: true },
      { f: "Month-to-month, no contract", us: true, them: true },
    ],
    reasons: [
      {
        t: "Growth doesn't raise your bill",
        b: "Per-technician pricing punishes hiring, a bigger crew means a bigger bill every month. TableTurnerr's package price stays the same no matter how many techs you run.",
      },
      {
        t: "Your crew can still ask in person",
        b: "NFC review cards let a tech tap a customer's phone to open your review page before leaving the job.",
      },
      {
        t: "More than review requests",
        b: "AI replies to every review and missed-call text-back come in the same package.",
      },
    ],
    faqs: [
      {
        q: "How is TableTurnerr different from PulseM?",
        a: "Both use technicians to drive reviews, but PulseM is generally priced per technician, so your cost grows as you hire. TableTurnerr is five fixed packages, month to month, run for you. We don't offer technician bios or leaderboards; PulseM does.",
      },
      {
        q: "Does TableTurnerr have technician leaderboards?",
        a: "No. We don't offer technician bios or leaderboards. If those matter most to your crew, PulseM is built around them.",
      },
      {
        q: "Is TableTurnerr tied to one CRM?",
        a: "No. Jobber has an official integration, Housecall Pro connects on its plan that allows integrations, and ServiceTitan, Workiz, QuickBooks and others connect through Zapier or Make. No software? We import your customer list.",
      },
    ],
  },

  // ---- Marketing-agency competitors (added 2026-11-27). See the header note: vendor-page facts and dated reviews only.
  "scorpion-alternative": {
    slug: "scorpion-alternative",
    kind: "marketing-agency",
    competitor: "Scorpion",
    category: "Full-service marketing agency",
    metaTitle: "Scorpion Alternatives for Contractors (2026) | TableTurnerr",
    metaDescription:
      "Scorpion alternatives for HVAC, plumbing and roofing owners: published prices, contract terms, where Scorpion fits best and how to switch. Checked Nov 2026.",
    tagline: "Scorpion alternatives for owner-run home-service companies",
    intro:
      `Scorpion is a large marketing and technology company, and its FAQ says SEO and its marketing technology usually come with a 12-month contract. If you run a smaller HVAC, plumbing, roofing or electrical shop and want published prices and no annual commitment, TableTurnerr offers ${PRICE_TEXT.plans}.`,
    fairTake:
      "Scorpion has worked with home-service companies for years, alongside legal, healthcare and franchise brands, and it has a big in-house team for websites, SEO, ads and reporting. For an established, multi-truck or multi-location company with a real marketing budget and someone to manage the relationship, that depth can be worth a 12-month term. Its Trustpilot reviews (3.9 out of 5 from 36 reviews, checked November 2026) include owners who credit it with strong growth and responsive account managers.",
    ourAngle:
      `TableTurnerr is built for the owner-operator. You see the price before you call: ${PRICE_TEXT.plans}. The work is done for you: review requests after every job, your website and Google Business Profile, AI answering, follow-ups, and AI search optimization in Complete (${PRICE_TEXT.aeo}). Google Ads and LSA management is in Partner, ${PRICE_TEXT.ads}.`,
    termsNote:
      "Scorpion doesn't publish prices, and its FAQ says it usually requires a 12-month contract for its marketing technology and services like SEO, and that you own your website after the length of your contract (checked November 2026). TableTurnerr is five fixed packages, month to month, no contract. If you cancel, you can buy your website from us for a one-time fee; our CRM, backend and automations stay with us. Whoever you hire, ask who owns the domain, website and ad accounts, and get the answer in writing.",
    compare: [
      { f: "Prices published on the website", us: true, them: false },
      { f: "Month to month, no annual contract", us: true, them: "12 mo. typical" },
      { f: "Focused only on home-service trades", us: true, them: "partial" },
      { f: "Website, Google profile and reviews in one plan", us: true, them: true },
      { f: "Google Ads & LSA management", us: "Partner pkg", them: true },
      { f: "AI search (ChatGPT, AI Mode) optimization", us: "Complete pkg", them: "Ask" },
      { f: "Large in-house team for multi-location brands", us: false, them: true },
    ],
    reasons: [
      {
        t: "Know the price before the sales call",
        b: `We offer ${PRICE_TEXT.plans}. No custom quote to decode, and anything outside the packages is a straight "call us for custom pricing".`,
      },
      {
        t: "No 12-month lock-in",
        b: "You stay because the work is paying off, not because a contract says so. If a month doesn't earn its keep, you can stop.",
      },
      {
        t: "Fast, checkable wins first",
        b: "Presidential Roofing went from 27 to 43 Google reviews in 20 days. Cooling Comfort's Google profile was verified 3 days after one free call, after months stuck. SEO still takes months, and we say so.",
      },
    ],
    faqs: [
      {
        q: "Does Scorpion require a contract?",
        a: "Scorpion's FAQ says it usually requires a 12-month contract for its marketing technology and services like SEO (checked November 2026). Read your own agreement for the exact term and renewal rules.",
      },
      {
        q: "Do I own my website with Scorpion?",
        a: "Scorpion's FAQ says you own your website after the length of your contract with Scorpion is complete. Before you give notice, confirm in writing who the domain is registered to and what files you will receive.",
      },
      {
        q: "When is Scorpion the better choice?",
        a: "When you run a larger or multi-location company, want one big agency for website, SEO, ads and reporting, and are comfortable with a 12-month term. Smaller owner-run shops that want published prices usually fit a month-to-month option better.",
      },
      {
        q: "How do I switch from Scorpion without losing my Google profile or phone numbers?",
        a: "Before cancelling, make sure you are the primary owner of your Google Business Profile, you have admin access to your Google Ads and LSA accounts, and you know who controls your domain and tracking numbers. Our guide on how to leave your marketing agency walks through each step and includes an email to send.",
      },
      {
        q: "What does TableTurnerr cost compared to Scorpion?",
        a: `Scorpion quotes each client and doesn't publish prices. TableTurnerr offers ${PRICE_TEXT.plans}, with no contract.`,
      },
    ],
    sources: [
      { label: "Scorpion FAQs (contract length, website ownership)", url: "https://www.scorpion.co/faqs/", checked: "November 2026" },
      { label: "Scorpion reviews on Trustpilot (3.9 from 36 reviews)", url: "https://www.trustpilot.com/review/scorpion.co", checked: "November 2026" },
    ],
    related: [
      { href: "/guides/how-to-leave-your-marketing-agency", label: "How to leave your marketing agency and take your stuff" },
      { href: "/guides/home-service-marketing-companies-compared", label: "Home service marketing companies: prices and contracts" },
      { href: "/guides/home-service-marketing-agency-cost", label: "What a home service marketing agency should cost" },
      { href: "/pricing", label: "TableTurnerr pricing" },
      { href: "/results", label: "Client results" },
      { href: "/free-google-maps-audit", label: "Free Google Maps audit" },
    ],
  },

  "hibu-alternative": {
    slug: "hibu-alternative",
    kind: "marketing-agency",
    competitor: "Hibu",
    category: "Local marketing provider",
    metaTitle: "Hibu Alternatives for Contractors (2026) | TableTurnerr",
    metaDescription:
      "Hibu alternatives for home-service owners: who publishes prices, contract questions to ask, where Hibu fits best and how to switch safely. Checked Nov 2026.",
    tagline: "Hibu alternatives for contractors who want to see the price first",
    intro:
      `Hibu sells websites, SEO, paid search and social to small local businesses, priced per customer. If you run a home-service company and want a published price and a plan built around the trades, TableTurnerr offers ${PRICE_TEXT.plans}.`,
    fairTake:
      "Hibu serves a very wide range of local businesses and pairs owners with a rep who builds the website and runs listings, search and social. Plenty of owners are happy with it: Hibu holds 4.6 out of 5 on Trustpilot from more than 1,100 reviews (checked November 2026), with praise for responsive reps and easy website edits. If you want one local-marketing provider for a non-trade business, or you value a long-standing rep relationship, it can be a good fit.",
    ourAngle:
      `TableTurnerr works only with home-service businesses, so the plan is built around how trades win jobs: a review request after every finished job, missed-call text-back, your Google Business Profile and website, AI answering for calls you can't pick up, and follow-ups on open estimates. Prices are on the website: ${PRICE_TEXT.plans}.`,
    termsNote:
      "Hibu's pricing page asks you to request custom pricing rather than listing prices (checked November 2026), so ask for the term length, renewal rule, price-increase rule and cancellation method in writing before you sign. TableTurnerr is five fixed packages, month to month, no contract. If you cancel, you can buy your website from us for a one-time fee; our CRM, backend and automations stay with us. Whoever you hire, ask who owns the domain, website and ad accounts, and get the answer in writing.",
    compare: [
      { f: "Prices published on the website", us: true, them: false },
      { f: "Month to month, no contract", us: true, them: "Ask" },
      { f: "Focused only on home-service trades", us: true, them: "partial" },
      { f: "Website, listings and Google profile handled for you", us: true, them: true },
      { f: "Review request sent after every finished job", us: true, them: "Ask" },
      { f: "AI answering for missed and after-hours calls", us: "Growth pkg", them: "Ask" },
      { f: "Official Jobber integration", us: true, them: "Ask" },
    ],
    reasons: [
      {
        t: "A price you can read today",
        b: `We offer ${PRICE_TEXT.plans}. No quote to wait on: you can compare packages before you ever talk to us.`,
      },
      {
        t: "Built for jobs, not just listings",
        b: "Review requests go out when the job is done, missed calls get a text back, and estimates get follow-ups. Jobber has an official integration; other job software connects through Zapier or Make.",
      },
      {
        t: "Proof you can check",
        b: "Presidential Roofing went from 27 to 43 Google reviews in 20 days. Cooling Comfort's Google profile was verified 3 days after one free call, after months stuck.",
      },
    ],
    faqs: [
      {
        q: "How much does Hibu cost?",
        a: "Hibu doesn't list prices on its site; its pricing page asks you to request custom pricing (checked November 2026). Get the monthly price, term and renewal rules in writing before signing.",
      },
      {
        q: "What do Hibu's unhappy reviewers complain about?",
        a: "Most of Hibu's Trustpilot reviews are positive. The 1-star reviews from November 2026 mention billing that started before an agreed start date, a 10% price increase, account managers changing, and worry about losing the website after leaving.",
      },
      {
        q: "When is Hibu the better choice?",
        a: "When your business isn't a home-service trade, or you want a long-term local rep to run your website, listings and ads and you're comfortable with a custom-priced agreement.",
      },
      {
        q: "How do I leave Hibu and keep my Google profile and domain?",
        a: "Before you cancel, check who the domain is registered to, make sure you are the primary owner of your Google Business Profile, get admin access to any ad accounts, and save a copy of your site content. Our guide on how to leave your marketing agency covers each step and includes an email to send.",
      },
      {
        q: "Is TableTurnerr month to month?",
        a: `Yes. TableTurnerr is ${PRICE_TEXT.plans}, with no contract and 2 months free if you pay yearly.`,
      },
    ],
    sources: [
      { label: "Hibu One pricing page (custom pricing, no published price)", url: "https://www.hibu.com/digital-marketing/pricing", checked: "November 2026" },
      { label: "Hibu reviews on Trustpilot (4.6 from 1,136 reviews; 1-star themes from Nov 2026)", url: "https://www.trustpilot.com/review/corporate.hibu.com", checked: "November 2026" },
      { label: "Hibu complaints on BBB (more than 120 complaints in the last 3 years)", url: "https://www.bbb.org/us/ia/cedar-rapids/profile/digital-marketing/hibu-inc-0664-32057924/complaints", checked: "November 2026" },
    ],
    related: [
      { href: "/guides/how-to-leave-your-marketing-agency", label: "How to leave your marketing agency and take your stuff" },
      { href: "/guides/home-service-marketing-companies-compared", label: "Home service marketing companies: prices and contracts" },
      { href: "/guides/home-service-marketing-agency-cost", label: "What a home service marketing agency should cost" },
      { href: "/pricing", label: "TableTurnerr pricing" },
      { href: "/results", label: "Client results" },
      { href: "/free-google-maps-audit", label: "Free Google Maps audit" },
    ],
  },

  "thryv-alternative": {
    slug: "thryv-alternative",
    kind: "marketing-agency",
    competitor: "Thryv",
    category: "Small-business software + marketing",
    metaTitle: "Thryv Alternatives for Contractors (2026) | TableTurnerr",
    metaDescription:
      "Thryv alternatives for home-service owners: Thryv's published plans and renewal terms, where it fits best, done-for-you options and how to switch. Nov 2026.",
    tagline: "Thryv alternatives for contractors who want it done for them",
    intro:
      `Thryv is small-business software for listings, reviews, websites and social, with done-for-you marketing sold as add-ons. If you'd rather have a team run it for your home-service company, TableTurnerr offers ${PRICE_TEXT.plans}.`,
    fairTake:
      "Thryv publishes its software prices, which many competitors don't: Starter at $99 a month and Signature at $399 a month, with Signature adding an SEO and AEO website, social management and Google Business Profile help (checked November 2026). Listings go out to 60+ directories. If you're comfortable running software yourself and want one app for many kinds of local business, Thryv is a reasonable choice.",
    ourAngle:
      `TableTurnerr is done for you and built only for home-service trades: review requests after every job, missed-call text-back, your website and Google Business Profile, AI answering, follow-ups on open estimates, and AI search optimization in Complete (${PRICE_TEXT.aeo}). It's ${PRICE_TEXT.plans}, with no contract.`,
    termsNote:
      "Thryv's terms (effective December 1, 2026) say your subscription period is set when you order and renews automatically unless you cancel at least 30 days before it ends, in writing through its contact page; disputes go to binding arbitration. Its done-for-you Boosts aren't priced on the site (checked November 2026). TableTurnerr is five fixed packages, month to month, no contract. If you cancel, you can buy your website from us for a one-time fee; our CRM, backend and automations stay with us. Whoever you hire, ask who owns the domain, website and ad accounts, and get the answer in writing.",
    compare: [
      { f: "Prices published on the website", us: true, them: true },
      { f: "Month to month, no contract", us: true, them: "Term set at order" },
      { f: "Renews automatically unless you cancel 30 days ahead", us: false, them: true },
      { f: "Done for you, not software you run", us: true, them: "Add-on" },
      { f: "Focused only on home-service trades", us: true, them: "partial" },
      { f: "Listings sent to 60+ directories", us: "Ask", them: true },
      { f: "Official Jobber integration", us: true, them: "Ask" },
    ],
    reasons: [
      {
        t: "We do the work",
        b: "No app to learn on a Sunday night. We set up and run your reviews, Google profile, website and follow-ups, and you get a monthly report in plain words.",
      },
      {
        t: "No renewal window to watch",
        b: "TableTurnerr is month to month with no contract, so there's no term to track and no 30-day notice date to miss.",
      },
      {
        t: "Built around the trades",
        b: "Jobber has an official integration, Housecall Pro connects on its plan that allows integrations, and other job software connects through Zapier or Make, so finished jobs trigger review requests automatically.",
      },
    ],
    faqs: [
      {
        q: "How much does Thryv cost?",
        a: "Thryv's pricing page lists Starter at $99 a month and Signature at $399 a month, with a Custom plan and done-for-you Boosts priced by quote (checked November 2026).",
      },
      {
        q: "How do I cancel Thryv?",
        a: "Thryv's terms say to give written notice through its contact page at least 30 days before your current subscription period ends, including your business name, phone and address. Keep a copy of the request and the confirmation.",
      },
      {
        q: "What do Thryv's unhappy reviewers complain about?",
        a: "Thryv holds 2.6 out of 5 on Trustpilot from 458 reviews (checked November 2026). Recent 1-star reviews describe trouble cancelling, charges after a cancellation request, and add-ons with their own six-month terms. Some reviewers praise friendly onboarding staff.",
      },
      {
        q: "When is Thryv the better choice?",
        a: "When you want software you run yourself, at a published price, covering listings, reviews, a website and social for any kind of local business. If you'd rather hand the work to a team that only serves home-service trades, a done-for-you option fits better.",
      },
      {
        q: "How do I switch from Thryv without losing anything?",
        a: "Check your renewal date first, then make sure you are the primary owner of your Google Business Profile, export your contacts, and confirm who controls your domain. Thryv's terms say its SMS number ends with the subscription, so plan for a new texting number. Our guide on how to leave your marketing agency walks through every step.",
      },
    ],
    sources: [
      { label: "Thryv pricing (Starter $99/mo, Signature $399/mo)", url: "https://www.thryv.com/pricing/", checked: "November 2026" },
      { label: "Thryv terms, effective Dec 1, 2026 (renewal, cancellation, arbitration, SMS number)", url: "https://www.thryv.com/thryv-ba-terms/", checked: "November 2026" },
      { label: "Thryv reviews on Trustpilot (2.6 from 458 reviews)", url: "https://www.trustpilot.com/review/thryv.com", checked: "November 2026" },
      { label: "Thryv complaints on BBB (more than 350 complaints in the last 3 years)", url: "https://www.bbb.org/us/tx/dallas/profile/marketing-software/thryv-0875-90044496/complaints", checked: "November 2026" },
    ],
    related: [
      { href: "/guides/how-to-leave-your-marketing-agency", label: "How to leave your marketing agency and take your stuff" },
      { href: "/guides/best-aeo-services-for-contractors", label: "Best AEO services for contractors, compared" },
      { href: "/guides/home-service-marketing-companies-compared", label: "Home service marketing companies: prices and contracts" },
      { href: "/services/ai-search-optimization", label: "AI search optimization" },
      { href: "/pricing", label: "TableTurnerr pricing" },
      { href: "/results", label: "Client results" },
    ],
  },
};

export const ALTERNATIVE_SLUGS = Object.keys(ALTERNATIVES);
export const getAlternative = (slug: string): Alternative | undefined =>
  ALTERNATIVES[slug];
export const ALL_ALTERNATIVES = Object.values(ALTERNATIVES);
