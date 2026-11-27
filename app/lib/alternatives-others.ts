// "Other options" list for the /alternatives/[slug] pages, so each page reads as an honest list of choices
// (what AI assistants and searchers for "<competitor> alternatives" expect) rather than a one-on-one comparison.
// IMPORTANT (FTC compliance, same rule as app/lib/alternatives.ts): claims are structural and fair (who it's built
// for, how it's priced, what it connects to). Dollar figures appear only where they were read on the vendor's own
// pricing page, dated. Facts checked on each vendor's own site on 2026-11-27; they match the listicle in
// app/lib/growth/guides11.mjs ("best-review-management-software-for-contractors"), so update both together.
// `name` matches ALTERNATIVES[slug].competitor exactly for the five compared competitors, so a page can drop its
// own competitor with OTHER_OPTIONS.filter((o) => o.name !== alt.competitor).
// TableTurnerr is deliberately NOT in this list: the page itself presents it. ALT_META counts therefore equal
// (OTHER_OPTIONS minus the page's competitor) + 1 for TableTurnerr = 13 for every current page.

export interface OtherOption {
  name: string;
  url: string;
  bestFor: string;
  note: string;
  pricing: string;
}

export const OTHER_OPTIONS: OtherOption[] = [
  {
    name: "Jobber Reviews",
    url: "https://www.getjobber.com/features/reviews/",
    bestFor: "Jobber users who just need Google review requests sent automatically",
    note: "Sends requests after a visit, a completed job or a paid invoice, with AI-drafted replies and a Google rating dashboard. Sold as an add-on to a Jobber plan.",
    pricing: "Published plans; Reviews is an add-on with no price shown (checked Nov 2026)",
  },
  {
    name: "Housecall Pro",
    url: "https://www.housecallpro.com/features/reviews/",
    bestFor: "Housecall Pro shops that want reviews without another login",
    note: "Automatic requests after every job or payment, follow-ups, and replies to Google and Facebook reviews from one dashboard. Review management is listed on all plans.",
    pricing: "Published: from $79/mo billed monthly, $59/mo billed annually (checked Nov 2026)",
  },
  {
    name: "ServiceTitan Reputation",
    url: "https://www.servicetitan.com/features/pro/marketing/reputation",
    bestFor: "Larger ServiceTitan shops that want reviews tied to technician performance",
    note: "Part of Marketing Pro. Sends requests after a completed job and links each review to the customer, job and technician, with Google, Facebook and Yelp in one feed.",
    pricing: "Quote-based",
  },
  {
    name: "NiceJob",
    url: "https://get.nicejob.com/pricing",
    bestFor: "Small shops happy to run an affordable review tool themselves",
    note: "Self-serve SMS and email review requests, website widgets and a team leaderboard, with no contract and a 14-day trial. You run it yourself.",
    pricing: "Published: from $95/mo (checked Nov 2026)",
  },
  {
    name: "GatherUp",
    url: "https://gatherup.com/pricing/",
    bestFor: "Owners who want surveys and review monitoring and don't mind some setup",
    note: "Review requests, AI-drafted replies, NPS surveys and monitoring across 100+ sites. Job-software links run mainly through Zapier.",
    pricing: "Published: from $99/mo for one location, billed annually (checked Nov 2026)",
  },
  {
    name: "Grade.us",
    url: "https://www.grade.us/home/plans/",
    bestFor: "Marketing agencies managing reviews for several contractor clients",
    note: "Positions itself as a review platform for marketing agencies, with white-label options. A single shop can use it, but it's built around agency workflows.",
    pricing: "Published: from $99/mo for one location (checked Nov 2026)",
  },
  {
    name: "PulseM",
    url: "https://pulsem.me/",
    bestFor: "HVAC and plumbing shops that want the technician front and center",
    note: "Built for home services, with pre-service technician bios and post-service review requests. ServiceTitan's help center lists it as a reputation integration.",
    pricing: "Quote-based",
  },
  {
    name: "Birdeye",
    url: "https://www.birdeye.com/pricing/",
    bestFor: "Multi-location companies with someone to run a broad platform",
    note: "Covers reviews, listings, messaging and AI tools in one platform, priced per location. Has ServiceTitan and Housecall Pro integrations.",
    pricing: "Quote-based, per location",
  },
  {
    name: "Podium",
    url: "https://www.podium.com/pricing",
    bestFor: "Shops that want texting, payments and reviews from one vendor",
    note: "Now centered on an AI Employee alongside texting, review requests, payments and a shared inbox. Its marketplace lists ServiceTitan and Housecall Pro apps.",
    pricing: "Quote-based",
  },
  {
    name: "Reputation",
    url: "https://reputation.com/pricing/",
    bestFor: "Franchises and large multi-location brands",
    note: "An enterprise platform for reviews, surveys, listings and social, aimed mainly at auto, healthcare, retail and real estate brands. More than most single-shop contractors need.",
    pricing: "Published: from $80 per location/mo (checked Nov 2026)",
  },
  {
    name: "Broadly",
    url: "https://broadly.com/pricing",
    bestFor: "Shops that want AI call answering and reviews from one vendor and accept an annual term",
    note: "Now led by an AI receptionist. Its AI Front Desk plan asks every customer for a review and replies to each one.",
    pricing: "Published: $299/mo plan with reviews, 12-month agreement, $250 setup (checked Nov 2026)",
  },
  {
    name: "Signpost",
    url: "https://www.signpost.com/pricing",
    bestFor: "Owners who want a broad managed marketing bundle and can commit for six months",
    note: "A home-services bundle of AI voice, reviews, listings and payments, with a dedicated account manager on every plan.",
    pricing: "Quote-based, 6-month agreement",
  },
  {
    name: "Weave",
    url: "https://www.getweave.com/pricing/",
    bestFor: "Dental, vet, medical and optometry practices",
    note: "Phones, texting and review requests built for healthcare practices; its integrations list practice software, not home-service tools. Most contractors will fit better elsewhere.",
    pricing: "Published: from $199/mo (checked Nov 2026)",
  },
];

export const ALT_META: Record<string, { metaTitle: string; metaDescription: string }> = {
  "gatherup-alternative": {
    metaTitle: "13 GatherUp Alternatives for Home Services (2026)",
    metaDescription:
      "13 GatherUp alternatives for contractors, from Jobber and Housecall Pro's built-in tools to NiceJob, Birdeye and done-for-you. Prices checked Nov 2026.",
  },
  "nicejob-alternative": {
    metaTitle: "13 NiceJob Alternatives for Home Services (2026)",
    metaDescription:
      "13 NiceJob alternatives for contractors, compared on trade fit, job-software triggers, pricing model and DIY vs done-for-you. Prices checked Nov 2026.",
  },
  "birdeye-alternative": {
    metaTitle: "13 Birdeye Alternatives for Home Services (2026)",
    metaDescription:
      "13 Birdeye alternatives for home-service shops: flat-priced and done-for-you options, built-in job-software tools and DIY apps. Prices checked Nov 2026.",
  },
  "podium-alternative": {
    metaTitle: "13 Podium Alternatives for Home Services (2026)",
    metaDescription:
      "13 Podium alternatives for contractors, from built-in Jobber and Housecall Pro review tools to NiceJob, GatherUp and done-for-you. Checked Nov 2026.",
  },
  "pulsem-alternative": {
    metaTitle: "13 PulseM Alternatives for Home Services (2026)",
    metaDescription:
      "13 PulseM alternatives for HVAC, plumbing and other trades, compared on job-software triggers, pricing and DIY vs done-for-you. Prices checked Nov 2026.",
  },
};
