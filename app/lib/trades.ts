// Compatibility exports for the previous /trades route family. New code should
// import from ./industries; these aliases let existing bookmarked route assets
// continue to compile while the pages issue permanent redirects.
export { INDUSTRIES as TRADES, INDUSTRY_SLUGS as TRADE_SLUGS, getIndustry as getTrade } from "./industries";
export type { Industry as Trade } from "./industries";

/*
export const TRADES: Record<string, Trade> = {
  hvac: {
    slug: "hvac",
    name: "HVAC",
    noun: "HVAC company",
    query: "hvac near me",
    seoTitle: "HVAC Review Management Software",
    metaDescription:
      "HVAC review management software that automatically requests Google reviews after every completed job. Build a stronger local reputation and win more HVAC calls.",
    heroTitle: "HVAC review management software that wins more calls",
    heroSub:
      "When a homeowner's AC dies in July, they call whoever ranks first with the most recent reviews. TableTurnerr turns every install, repair, and tune-up into a fresh review, automatically.",
    pains: [
      { t: "Big-ticket jobs, high stakes", b: "A new system is thousands of dollars. Homeowners read reviews before they let you in the door, so a thin profile costs you the job before you quote." },
      { t: "Seasonal demand spikes", b: "When the heat hits, the company at the top of the map pack gets the calls. Recent reviews are what put you there." },
      { t: "Techs are too busy to ask", b: "Your install crew is onto the next job. We ask for the review for them, the moment the work order closes." },
    ],
    outcomes: [
      "Review requests fire automatically when a job closes in your CRM",
      "Custom NFC review cards your crew can hand to customers",
      "AI replies to every review, written for you",
      "Missed-call text-back so no caller is left hanging",
    ],
    faqs: [
      { q: "Does it work with ServiceTitan or Housecall Pro?", a: "Yes. Jobber has an official integration, Housecall Pro connects on its plan that allows integrations, and ServiceTitan, Workiz, QuickBooks and thousands more connect through Zapier or Make, so requests fire automatically when a job is completed." },
      { q: "Can I send requests for maintenance plans too?", a: "Absolutely. Every tune-up and membership visit is a chance for a fresh review. We handle recurring customers with a built-in cooldown so nobody gets asked twice." },
      { q: "How fast will I see results?", a: "Most HVAC shops see their first new reviews within 24 hours of launching review reactivation to their past customers, then a steady stream from new jobs." },
    ],
  },
  roofing: {
    slug: "roofing",
    name: "Roofing",
    noun: "roofing company",
    query: "roofers near me",
    seoTitle: "Roofing Review Management Software",
    metaDescription:
      "Roofing review management software that automatically requests Google reviews after every completed job. Build trust, improve local visibility, and win more roofing jobs.",
    heroTitle: "Roofing review management software that wins more jobs",
    heroSub:
      "A roof is one of the biggest checks a homeowner ever writes. They pick the roofer with the proof. TableTurnerr turns every completed roof into a review that wins the next one.",
    pains: [
      { t: "One job is worth a fortune", b: "At roofing ticket sizes, a single extra job a month from better reviews pays for the tool many times over." },
      { t: "Storm season is a sprint", b: "After a storm, homeowners call the most-reviewed, top-ranked roofer first. Recent reviews decide who that is." },
      { t: "Crews finish and move on", b: "Your crew is chasing daylight, not chasing reviews. We ask automatically the day the job wraps." },
    ],
    outcomes: [
      "Automatic review requests the day a roof is completed",
      "Custom NFC review cards your crew can hand to customers",
      "Crew-level attribution so foremen get the credit",
      "Missed-call text-back so no caller is left hanging",
    ],
    faqs: [
      { q: "What about insurance and storm-restoration jobs?", a: "Those customers are some of your happiest. We time the request for after the job is signed off, so you capture that goodwill as public proof." },
      { q: "Do I need a contract?", a: "No. Every plan is month to month, so you can scale up, scale down or stop." },
    ],
  },
  plumbing: {
    slug: "plumbing",
    name: "Plumbing",
    noun: "plumbing company",
    query: "plumbers near me",
    seoTitle: "Plumbing Review Management Software",
    metaDescription:
      "Plumbing review management software that automatically requests Google reviews after every completed job. Get more recent reviews, improve local visibility, and win more calls.",
    heroTitle: "Plumbing review management software that wins more calls",
    heroSub:
      "Plumbing is urgent and local. Homeowners search, scan the reviews, and call. TableTurnerr makes sure your name is the one with the most recent 5-stars at the top.",
    pains: [
      { t: "Emergencies go to the top result", b: "A burst pipe doesn't wait. People call the first plumber with strong reviews, so ranking and recency win the job." },
      { t: "Volume of jobs, few reviews", b: "You run dozens of jobs a week and only a trickle leave reviews. We close that gap automatically." },
      { t: "Asking feels awkward", b: "Your plumbers don't want to push for a review. We send a friendly, personalized request so they never have to." },
    ],
    outcomes: [
      "Review requests sent automatically after every service call",
      "Custom NFC review cards your crew can hand to customers",
      "AI replies to every review, written for you",
      "Missed-call text-back so no caller is left hanging",
    ],
    faqs: [
      { q: "Will customers get spammed?", a: "No. We send one polite, personalized request with a couple of gentle reminders, and a 30-day cooldown means repeat customers are never over-asked." },
      { q: "Does it connect to my dispatch software?", a: "Yes. Jobber has an official integration, Housecall Pro connects on its plan that allows integrations, and anything else (ServiceTitan, Workiz, QuickBooks and more) connects through Zapier or Make." },
      { q: "How long to set up?", a: "We do it for you during onboarding: we connect your software or import your customer list, link your Google profile and launch. Every package includes a setup call." },
    ],
  },
  electrical: {
    slug: "electrical",
    name: "Electrical",
    noun: "electrical company",
    query: "electricians near me",
    seoTitle: "Electrician Review Management Software",
    metaDescription:
      "Electrician review management software that automatically requests Google reviews after every completed job. Build trust, improve local visibility, and win more electrical jobs.",
    heroTitle: "Electrician review management software that wins more calls",
    heroSub:
      "Homeowners trust electricians with safety and big upgrades. Reviews are how they decide who to trust. TableTurnerr turns every job into proof that wins the next one.",
    pains: [
      { t: "Trust is everything", b: "Panel upgrades, EV chargers, rewires. People only hand that work to an electrician with a wall of recent 5-star reviews." },
      { t: "You're invisible without them", b: "Great work nobody can see doesn't rank. The most-reviewed electrician owns the map pack and the calls." },
      { t: "Reviews never get asked for", b: "Between jobs and quotes, asking for reviews falls off the list. We automate it end to end." },
    ],
    outcomes: [
      "Automatic review requests when each job closes",
      "Custom NFC review cards your crew can hand to customers",
      "AI replies to every review, written for you",
      "Missed-call text-back so no caller is left hanging",
    ],
    faqs: [
      { q: "Can I showcase reviews on my website?", a: "Yes. Drop-in review widgets display your best reviews on your site, and we can auto-post every 5-star to Facebook and Instagram." },
      { q: "Which platforms do you collect on?", a: "Google, where most homeowners check before hiring an electrician and the reviews that help your Maps ranking. We don't run requests for Facebook, Yelp or Angi." },
    ],
  },
};

export const TRADE_SLUGS = Object.keys(TRADES);
export const getTrade = (slug: string): Trade | undefined => TRADES[slug];
*/
