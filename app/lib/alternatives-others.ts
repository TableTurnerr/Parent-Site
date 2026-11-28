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

// "Other options" for the marketing-agency pages (ALTERNATIVES entries with kind: "marketing-agency": Scorpion, Hibu,
// Thryv). The review tools above don't fit those pages, so AlternativePage should use this list when
// alt.kind === "marketing-agency" (same filter by name). Each fact was read on the vendor's own page on 2026-11-27,
// except Scorpion's FAQ and Hibu's pricing page, which block automated readers and were confirmed through the search
// index of those same vendor pages. TableTurnerr is not listed (the page presents it).
export const AGENCY_OPTIONS: OtherOption[] = [
  {
    name: "Scorpion",
    url: "https://www.scorpion.co/",
    bestFor: "Larger or multi-location companies that want one big agency and can commit to a year",
    note: "Marketing and technology company for home services, legal, healthcare and franchise brands. Its FAQ says SEO and its marketing technology usually need a 12-month contract, and you own the website after the contract term.",
    pricing: "Quote-based; 12-month contract typical (its FAQ, checked Nov 2026)",
  },
  {
    name: "Hibu",
    url: "https://www.hibu.com/digital-marketing/pricing",
    bestFor: "Local businesses of any kind that want a rep to run their website, listings and ads",
    note: "Hibu One bundles a website, SEO, paid search and social, customized for each business.",
    pricing: "Quote-based; its pricing page asks you to request custom pricing (checked Nov 2026)",
  },
  {
    name: "Thryv",
    url: "https://www.thryv.com/pricing/",
    bestFor: "Owners who want software to run listings, reviews and a website themselves",
    note: "Software with an AI website builder, listings to 60+ directories and review management; Signature adds an SEO and AEO website, social and Google profile help. Done-for-you Boosts cost extra. Renews automatically unless cancelled 30 days before the term ends.",
    pricing: "Published: Starter $99/mo, Signature $399/mo; Boosts quote-based (checked Nov 2026)",
  },
  {
    name: "Footbridge Media",
    url: "https://footbridgemedia.com/contractor-marketing-program",
    bestFor: "Contractors who want a low-cost website and local SEO package",
    note: "Website, local SEO, content, CRM, scheduling, payments and review management for home-service companies. Month to month with a 90-day refund window; says you keep your site if you leave.",
    pricing: "Published: $249/mo, no contract (checked Nov 2026)",
  },
  {
    name: "Hook Agency",
    url: "https://hookagency.com/pricing/",
    bestFor: "Bigger contractors ready to spend several thousand a month on search, ads and a website",
    note: "Agency for home-service and construction contractors: local SEO and AEO, Google Ads and LSA, Meta ads and websites. Says most clients invest $5,000 to $8,000 a month.",
    pricing: "Published: Local SEO + AEO $3,750/mo; Google Ads + LSA from $2,000/mo (checked Nov 2026)",
  },
  {
    name: "WebFX",
    url: "https://www.webfx.com/pricing/",
    bestFor: "Companies that want a large, data-heavy agency and can commit for six months",
    note: "Large agency serving many industries, with SEO packages listed by tier.",
    pricing: "Published: SEO from $2,900/mo, 6-month commitment (checked Nov 2026)",
  },
  {
    name: "Do it yourself",
    url: "/guides/do-it-yourself-local-marketing-for-contractors",
    bestFor: "Owners with a few hours a week who'd rather spend time than money",
    note: "Your Google Business Profile, review asks, photos and replies, and Local Services Ads setup are all things an owner can learn and run alone.",
    pricing: "Free; costs your time",
  },
];

export const ALT_META: Record<string, { metaTitle: string; metaDescription: string }> = {
  // Agency pages: AGENCY_OPTIONS (7) minus the page's competitor, plus TableTurnerr = 7.
  "scorpion-alternative": {
    metaTitle: "7 Scorpion Alternatives for Contractors (2026)",
    metaDescription: "Scorpion alternatives for home-service businesses: prices, contract terms and what each includes, from month-to-month agencies to doing it yourself.",
  },
  "hibu-alternative": {
    metaTitle: "7 Hibu Alternatives for Contractors (2026)",
    metaDescription: "Hibu alternatives for home-service businesses: published prices, contract terms and what each includes, plus how to switch and keep your accounts.",
  },
  "thryv-alternative": {
    metaTitle: "7 Thryv Alternatives for Contractors (2026)",
    metaDescription: "Thryv alternatives for home-service businesses: prices, renewal terms and what each includes, plus how to move your number, site and reviews.",
  },
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
