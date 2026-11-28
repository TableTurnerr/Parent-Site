import type { ProductFeature } from "./features";
import { softLower } from "@/app/lib/text";
import { PRICE_TEXT } from "./pricing";

export interface Industry {
  slug: string;
  name: string;
  noun: string;
  seoTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSub: string;
  pains: { t: string; b: string }[];
  outcomes: string[];
  featureSlugs: ProductFeature["slug"][];
  faqs: { q: string; a: string }[];
  image?: string;
  /** Direct 2-3 sentence answer shown in a callout above the trade guide (inline HTML allowed). */
  shortAnswer?: string;
  /** Trade-specific guide content: each renders as an <h2> plus rich text (p, ul, ol, table, a, strong). */
  sections?: { h: string; html: string }[];
}

const coreReviewFeatures = [
  "review-reactivation",
  "ai-review-requests-and-replies",
  "review-widgets-and-social-posts",
  "crm-contact-import-and-lead-management",
] as const;

const fieldOperationsFeatures = [
  "dispatch-scheduling-and-routes",
  "work-orders-and-job-photos",
  "time-tracking-and-invoicing",
] as const;

function makeIndustry(input: Omit<Industry, "seoTitle" | "metaDescription" | "outcomes" | "faqs">): Industry {
  return {
    ...input,
    seoTitle: `${input.name} Review Management Software`,
    metaDescription: `Review management software for ${softLower(input.name)} businesses: ask for a Google review after every job, follow up and get found by more local customers.`,
    outcomes: [
      "Review requests after completed jobs",
      "Every request goes to your Google review page",
      "AI-drafted replies to every Google review",
      "Relevant FieldTask operations tools when your team needs them",
    ],
    faqs: [
      {
        q: `How does review automation work for ${input.name} companies?`,
        a: "After a completed job, TableTurnerr can send a thoughtful review request by text or email. The workflow helps your team consistently ask for feedback without making technicians chase reviews themselves.",
      },
      {
        q: `Which review sites can ${input.name} businesses use?`,
        a: "We focus on Google reviews: they show on your Google Business Profile and Maps listing, where most people decide who to call. TableTurnerr doesn't run review requests for Facebook, Yelp or Angi.",
      },
      {
        q: `Can I see the features that fit my ${input.name} workflow?`,
        a: `Yes. This page highlights the TableTurnerr and FieldTask features selected for a ${input.name} workflow, with links to a detailed page for each capability.`,
      },
    ],
  };
}

export const INDUSTRIES: Record<string, Industry> = {
  hvac: makeIndustry({
    slug: "hvac",
    name: "HVAC",
    noun: "HVAC company",
    heroTitle: "HVAC review management software that helps win more calls",
    heroSub:
      "When an AC fails, homeowners call the company with the strongest current proof. TableTurnerr turns completed installs, repairs, and tune-ups into fresh reviews your next customer can see.",
    pains: [
      { t: "Big-ticket decisions need proof", b: "A replacement system is a major purchase, so homeowners look for recent feedback before they call." },
      { t: "Demand moves with the weather", b: "When the heat or cold arrives, local visibility and fresh reviews help your team stand out when calls surge." },
      { t: "Technicians are already moving", b: "Install crews need to get to the next job, not spend the evening chasing review requests." },
    ],
    featureSlugs: [...coreReviewFeatures, ...fieldOperationsFeatures],
    image: "/images/trades/hvac-review-automation.webp",
  }),
  roofing: makeIndustry({
    slug: "roofing",
    name: "Roofing",
    noun: "roofing company",
    heroTitle: "Roofing review management software that helps win more jobs",
    heroSub:
      "A new roof is one of the largest decisions a homeowner makes. TableTurnerr helps turn each finished roof into visible customer proof for the next estimate.",
    pains: [
      { t: "Trust carries the estimate", b: "Homeowners want evidence that a crew will do the job well before they invite anyone onto the roof." },
      { t: "Storm demand moves fast", b: "After a storm, customers search quickly and compare recent feedback before deciding who to contact." },
      { t: "Crews finish and head out", b: "Foremen are focused on a clean handoff and the next project, not manually following up for reviews." },
    ],
    featureSlugs: [...coreReviewFeatures, ...fieldOperationsFeatures],
    image: "/images/trades/roofing-review-automation.webp",
  }),
  plumbing: makeIndustry({
    slug: "plumbing",
    name: "Plumbing",
    noun: "plumbing company",
    heroTitle: "Plumbing review management software for urgent local calls",
    heroSub:
      "When a plumbing problem cannot wait, homeowners scan the reviews and call. TableTurnerr helps your completed service calls become current proof for the next urgent job.",
    pains: [
      { t: "Urgent jobs reward confidence", b: "A customer with a burst pipe needs a reliable choice quickly, and a current review profile makes that decision easier." },
      { t: "Many jobs, too few asks", b: "Busy teams finish a high volume of calls, yet asking for a review can easily slip through the cracks." },
      { t: "Follow-up should not feel awkward", b: "A thoughtful automated request keeps the ask consistent without making plumbers force the conversation." },
    ],
    featureSlugs: [...coreReviewFeatures, ...fieldOperationsFeatures],
    image: "/images/trades/plumbing-review-automation.webp",
  }),
  electrical: makeIndustry({
    slug: "electrical",
    name: "Electrical",
    noun: "electrical company",
    heroTitle: "Electrician review management software that builds trust before the call",
    heroSub:
      "Homeowners put safety-critical work in an electrician’s hands. TableTurnerr turns completed electrical jobs into timely customer proof that helps build confidence before the next call.",
    pains: [
      { t: "Safety requires trust", b: "Panel upgrades, rewires, and EV chargers are work customers only hand to a company they feel good about." },
      { t: "Local proof shapes the shortlist", b: "A visible record of recent customer feedback can help homeowners compare electrical contractors with more confidence." },
      { t: "Review requests cannot be another job", b: "Between service calls and larger projects, a repeatable workflow helps keep feedback requests from being forgotten." },
    ],
    featureSlugs: [...coreReviewFeatures, ...fieldOperationsFeatures],
    image: "/images/trades/electrical-review-automation.webp",
  }),
  handyman: makeIndustry({
    slug: "handyman",
    name: "Handyman",
    noun: "handyman business",
    heroTitle: "Handyman review management software that makes every job count",
    heroSub:
      "Handyman work earns trust one repair at a time. TableTurnerr helps turn a completed project into visible feedback while FieldTask keeps the next visit organized.",
    pains: [
      { t: "Small jobs build a long-term reputation", b: "A steady stream of repairs and upgrades can create strong proof when every happy customer gets a simple chance to respond." },
      { t: "Every day looks different", b: "A changing mix of tasks, estimates, and return visits makes manual follow-up easy to miss." },
      { t: "The office and field need the same picture", b: "Scheduling, work details, and follow-up are easier when the team can see the job clearly from start to finish." },
    ],
    featureSlugs: [...coreReviewFeatures, ...fieldOperationsFeatures],
  }),
  "garage-door-repair": makeIndustry({
    slug: "garage-door-repair",
    name: "Garage Door Repair",
    noun: "garage door company",
    heroTitle: "Garage door review management software for more local trust",
    heroSub:
      "A broken garage door is an urgent homeowner problem. TableTurnerr helps each completed repair or installation become customer proof for the next caller.",
    pains: [
      { t: "Customers need help quickly", b: "Urgent searchers want a company that looks responsive and trustworthy before they request service." },
      { t: "Repairs and installs both create proof", b: "Every finished job is a chance to make the next customer’s decision easier." },
      { t: "Technicians should stay focused on service", b: "A review workflow keeps customer follow-up moving without adding another task to a busy route." },
    ],
    featureSlugs: [...coreReviewFeatures, ...fieldOperationsFeatures],
  }),
  "pest-control": makeIndustry({
    slug: "pest-control",
    name: "Pest Control",
    noun: "pest control company",
    heroTitle: "Pest control review management software for recurring service teams",
    heroSub:
      "Pest control businesses earn confidence through reliable, repeat service. TableTurnerr gives each completed visit a consistent path to becoming public customer feedback.",
    pains: [
      { t: "Recurring service should create recurring proof", b: "Regular visits build relationships, but review requests are easy to lose in the rhythm of a route." },
      { t: "Homeowners compare care and professionalism", b: "Recent feedback gives prospective customers a clearer picture of what service with your team feels like." },
      { t: "Routes leave little room for follow-up", b: "Automated requests help the office maintain a steady review habit while technicians keep the route moving." },
    ],
    featureSlugs: [...coreReviewFeatures, "dispatch-scheduling-and-routes", "work-orders-and-job-photos"],
  }),
  "lawn-care": makeIndustry({
    slug: "lawn-care",
    name: "Lawn Care",
    noun: "lawn care company",
    heroTitle: "Lawn care review management software for seasonal local growth",
    heroSub:
      "A great lawn is visible proof of your work. TableTurnerr helps turn completed visits and seasonal projects into customer feedback that supports the next booking.",
    pains: [
      { t: "Seasonal demand rewards visibility", b: "When homeowners start looking for help, a current local reputation can help your company get noticed." },
      { t: "Route work can be repetitive", b: "Regular service visits make review follow-up easy to postpone, even when customers are happy." },
      { t: "Before-and-after work deserves to travel", b: "Strong customer feedback can keep working on your website and social channels after a job is complete." },
    ],
    featureSlugs: [...coreReviewFeatures, "dispatch-scheduling-and-routes", "work-orders-and-job-photos", "time-tracking-and-invoicing"],
  }),
  landscaping: makeIndustry({
    slug: "landscaping",
    name: "Landscaping",
    noun: "landscaping company",
    heroTitle: "Landscaping review management software for work customers can see",
    heroSub:
      "Landscaping projects transform a property in plain sight. TableTurnerr helps turn that finished work and a happy client into visible proof for future homeowners.",
    pains: [
      { t: "Visual work still needs a trusted voice", b: "Project photos help, but genuine customer feedback gives a prospect extra confidence in who will manage the work." },
      { t: "Projects involve many handoffs", b: "From estimate to final walkthrough, consistent job details and follow-up help the whole experience feel organized." },
      { t: "Local neighborhoods influence the next project", b: "A current local reputation helps your work keep earning attention once the crew leaves the property." },
    ],
    featureSlugs: [...coreReviewFeatures, ...fieldOperationsFeatures],
  }),
  cleaning: makeIndustry({
    slug: "cleaning",
    name: "Cleaning",
    noun: "cleaning company",
    heroTitle: "Cleaning review management software for a reputation that stays fresh",
    heroSub:
      "Cleaning customers invite your team into their home or business. TableTurnerr helps turn dependable service into visible reassurance for the next customer considering a booking.",
    pains: [
      { t: "Trust begins before the first visit", b: "Customers often rely on feedback to decide which cleaning company they feel comfortable hiring." },
      { t: "Repeat appointments multiply the opportunity", b: "A thoughtful workflow can help satisfied regulars share feedback without asking the team to chase every visit." },
      { t: "Schedules change quickly", b: "Clear jobs, routes, and customer details help office staff and cleaners stay in sync as bookings move." },
    ],
    featureSlugs: [...coreReviewFeatures, "dispatch-scheduling-and-routes", "work-orders-and-job-photos", "time-tracking-and-invoicing"],
  }),
  painting: makeIndustry({
    slug: "painting",
    name: "Painting",
    noun: "painting company",
    heroTitle: "Painting review management software for the next estimate",
    heroSub:
      "Customers live with a paint job every day, so they want a company they can trust. TableTurnerr helps your completed projects become reviews that support the next estimate.",
    pains: [
      { t: "Color choices require confidence", b: "Homeowners look for signs that a painter will communicate well, protect the space, and finish cleanly." },
      { t: "Projects create natural follow-up moments", b: "The final walkthrough is a great moment to invite honest feedback while the result is still fresh." },
      { t: "Finished work can keep marketing", b: "Recent reviews and social-ready proof help completed projects stay useful long after the last coat dries." },
    ],
    featureSlugs: [...coreReviewFeatures, "work-orders-and-job-photos", "time-tracking-and-invoicing"],
  }),
  "window-cleaning": makeIndustry({
    slug: "window-cleaning",
    name: "Window Cleaning",
    noun: "window cleaning company",
    heroTitle: "Window cleaning review management software for local referrals",
    heroSub:
      "Window cleaning makes an immediate difference customers can see. TableTurnerr helps turn a finished visit into fresh feedback that supports future local bookings.",
    pains: [
      { t: "Results are immediately visible", b: "A happy customer has a clear moment to share what changed and how the team treated their property." },
      { t: "Routes can fill before follow-up happens", b: "Automated review requests mean the request does not disappear behind the next stop on the day’s schedule." },
      { t: "Neighbors influence the next booking", b: "A steady local reputation helps your company stay top of mind when nearby homeowners compare providers." },
    ],
    featureSlugs: [...coreReviewFeatures, "dispatch-scheduling-and-routes", "work-orders-and-job-photos", "time-tracking-and-invoicing"],
  }),
  "pressure-washing": makeIndustry({
    slug: "pressure-washing",
    name: "Pressure Washing",
    noun: "pressure washing company",
    heroTitle: "Pressure washing review management software for more booked jobs",
    heroSub:
      "Pressure washing creates a striking before-and-after moment. TableTurnerr helps make that customer satisfaction visible to homeowners searching for their next provider.",
    pains: [
      { t: "The result speaks for itself", b: "A completed job gives customers a clear, timely reason to share feedback about their experience." },
      { t: "Seasonal demand moves fast", b: "When property owners are ready to refresh the exterior, current reviews can help your team stand out locally." },
      { t: "The crew needs to get to the next job", b: "A consistent review workflow keeps follow-up moving without slowing the route down." },
    ],
    featureSlugs: [...coreReviewFeatures, "dispatch-scheduling-and-routes", "work-orders-and-job-photos", "time-tracking-and-invoicing"],
  }),
  "pool-service": makeIndustry({
    slug: "pool-service",
    name: "Pool Service",
    noun: "pool service company",
    heroTitle: "Pool service review management software for dependable local growth",
    heroSub:
      "Pool owners rely on a service team to keep things running smoothly. TableTurnerr makes it easier to turn reliable maintenance and repairs into public customer proof.",
    pains: [
      { t: "Reliability is the product", b: "Customers value a team that shows up, communicates clearly, and keeps the pool ready to use." },
      { t: "Recurring service can hide happy customers", b: "Regular maintenance creates many opportunities for feedback, but only when there is a simple, measured way to ask." },
      { t: "Field teams need organized routes", b: "Clear schedules and job information help technicians focus on service rather than administrative catch-up." },
    ],
    featureSlugs: [...coreReviewFeatures, ...fieldOperationsFeatures],
  }),
  "appliance-repair": makeIndustry({
    slug: "appliance-repair",
    name: "Appliance Repair",
    noun: "appliance repair company",
    heroTitle: "Appliance repair review management software for urgent calls",
    heroSub:
      "When an important appliance stops working, homeowners need a dependable repair company. TableTurnerr helps completed repairs become fresh proof for the next customer searching locally.",
    pains: [
      { t: "Customers are often searching under pressure", b: "A broken appliance can disrupt a home quickly, so people look for a provider they can feel good about calling." },
      { t: "Repair work needs a clear handoff", b: "Job details, photos, and customer history can help keep the service experience organized from appointment to invoice." },
      { t: "Satisfied customers are busy too", b: "Automated review requests create a simple moment to share feedback after the repair is complete." },
    ],
    featureSlugs: [...coreReviewFeatures, ...fieldOperationsFeatures],
  }),
  "junk-removal": makeIndustry({
    slug: "junk-removal",
    name: "Junk Removal",
    noun: "junk removal company",
    heroTitle: "Junk removal review management software for trusted local service",
    heroSub:
      "Junk removal turns a stressful task into a clear result. TableTurnerr helps convert that relief into current customer feedback for your next local booking.",
    pains: [
      { t: "Customers want a team they can trust onsite", b: "A strong reputation helps homeowners and property managers feel more comfortable inviting a removal crew onto the property." },
      { t: "Jobs can be short and fast-moving", b: "A review workflow gives every completed pickup a chance to create feedback, even on packed days." },
      { t: "Many jobs require coordinated field work", b: "Connected scheduling, job details, and invoices can keep the office and crew aligned as the day changes." },
    ],
    featureSlugs: [...coreReviewFeatures, ...fieldOperationsFeatures],
  }),
  "property-maintenance": makeIndustry({
    slug: "property-maintenance",
    name: "Property Maintenance",
    noun: "property maintenance company",
    heroTitle: "Property maintenance review management software for dependable service",
    heroSub:
      "Property maintenance teams solve many different problems for homes and facilities. TableTurnerr helps turn dependable completed work into a reputation that supports the next contract or call.",
    pains: [
      { t: "A broad service mix creates many touchpoints", b: "Every completed task can reinforce trust when customers have a simple path to share feedback." },
      { t: "Accountability is part of the experience", b: "Clear work orders, photos, and job history help keep service details visible across a diverse workload." },
      { t: "The reputation has to support repeat work", b: "A current feedback profile gives new and returning customers a clearer reason to choose your team." },
    ],
    featureSlugs: [...coreReviewFeatures, ...fieldOperationsFeatures],
  }),
};

// Search Console (Aug-Nov 2026): /industries/plumbing, electrical, hvac, roofing and garage-door-repair had hundreds of
// impressions for "plumber review management platform", "hvac review software", "electrician review software",
// "roofing review management" and "what review software integrates with workiz" but 0 clicks. The generic makeIndustry()
// pages only swapped the trade name, so the 8 highest-demand trades get their own titles, guide sections and FAQs here.
// Integration facts (owner-confirmed): Jobber = official integration; Housecall Pro = on its plan that allows
// integrations; ServiceTitan, Workiz and others = Zapier or Make; no software = customer import. Never say "native" for
// anything but Jobber. Prices come from app/lib/pricing.ts (this file is not run through the {{PRICE:...}} filler).

const CHECKED = "checked November 2026";
const GOOGLE_POLICY = `<a href="https://support.google.com/contributionpolicy/answer/7400114" rel="noopener">Google's review policy</a>`;
const FTC_RULE = `<a href="https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials" rel="noopener">FTC rule on fake reviews</a>`;
const GATING_LINE = `Ask every customer, not only the ones the tech thinks were happy. Picking who gets asked is called review gating, and ${GOOGLE_POLICY} does not allow selectively asking happy customers for reviews or paying for them (${CHECKED}). The ${FTC_RULE} also bans rewards for reviews that must be positive. Our guide on <a href="/guides/is-review-gating-allowed">whether review gating is allowed</a> explains the rules.`;
const GUIDES_LINE = `For a side-by-side look at tools, read <a href="/guides/best-review-management-software-for-contractors">the best review management software for contractors</a> and <a href="/guides/review-software-by-trade">review software by trade</a>.`;

type Row = [software: string, how: string];
const ROW = {
  jobber: ["<a href=\"/integrations/jobber\">Jobber</a>", "Official integration. When a visit is marked complete, the review request goes out. No exports or manual lists. Setup notes: <a href=\"/guides/jobber-google-reviews\">Jobber and Google reviews</a>."] as Row,
  hcp: ["<a href=\"/integrations/housecall-pro\">Housecall Pro</a>", "Connects on Housecall Pro's plan that allows integrations (its premium plan). On other plans, we start from a customer export. More: <a href=\"/guides/housecall-pro-google-reviews\">Housecall Pro and Google reviews</a>."] as Row,
  servicetitan: ["<a href=\"/integrations/servicetitan\">ServiceTitan</a>", `Through Zapier. ServiceTitan's help center explains <a href="https://help.servicetitan.com/docs/set-up-zapier-zaps-with-servicetitan" rel="noopener">its Zapier setup</a> and which ServiceTitan packages include it (${CHECKED}). More: <a href="/guides/servicetitan-review-requests">ServiceTitan review requests</a>.`] as Row,
  workiz: ["<a href=\"/integrations/workiz\">Workiz</a>", `Through Zapier, using Workiz's <a href="https://zapier.com/apps/workiz/integrations" rel="noopener">"Job Is Done" trigger</a> (${CHECKED}), so a finished job sends the request. More: <a href="/guides/workiz-google-reviews">Workiz and Google reviews</a>.`] as Row,
  quickbooks: ["QuickBooks only", "Through Zapier or Make, for example when an invoice is paid."] as Row,
  none: ["No job software (paper, spreadsheets)", "We import your customer list from a spreadsheet or export, start with past customers, and agree with you how new finished jobs get added."] as Row,
};
const other = (names: string): Row => [names, "Through Zapier or Make where the software offers a connection. If it doesn't, a regular customer export works."];
const table = (rows: Row[]) =>
  `<table><thead><tr><th>Your software</th><th>How TableTurnerr connects</th></tr></thead><tbody>${rows
    .map(([s, h]) => `<tr><td>${s}</td><td>${h}</td></tr>`)
    .join("")}</tbody></table>`;

const costFaq = (trade: string) => ({
  q: `How much does ${trade} review management cost?`,
  a: `It costs ${PRICE_TEXT.reviews}. There's no contract, and paying yearly gets you 2 months free. Bigger packages add a website, Google Business Profile management and AI answering; we offer ${PRICE_TEXT.plans}.`,
});
const gatingFaq = (trade: string) => ({
  q: `Can my ${trade} business only ask happy customers for reviews?`,
  a: "No. Asking only the customers you expect to be happy is review gating, and Google's policy does not allow it. We ask every customer, which keeps your profile safe and makes your reviews more believable.",
});

type TradeContent = Pick<Industry, "seoTitle" | "metaDescription" | "faqs" | "shortAnswer" | "sections">;

const TRADE_CONTENT: Record<string, TradeContent> = {
  plumbing: {
    seoTitle: "Plumber Review Management Software & Platform",
    metaDescription: "Plumber review management platform: a Google review request after every job, follow-ups and replies. Connects to Jobber, Housecall Pro, ServiceTitan and Workiz.",
    shortAnswer: "Plumber review management means every finished job gets a review request by text and email, one follow-up, and a reply to every review. TableTurnerr connects to Jobber (official integration), to Housecall Pro on its plan that allows integrations, and to ServiceTitan, Workiz and others through Zapier or Make, then runs it for you.",
    sections: [
      {
        h: "When to ask a plumbing customer for a review",
        html: `<p>Plumbing has two kinds of jobs, and they need different timing.</p>
<ul>
<li><strong>Service and emergency calls</strong> (clogs, leaks, no hot water): ask the same day, an hour or two after the job is marked complete. The relief is fresh and the customer still remembers the plumber's name. Wait a week and most people never answer.</li>
<li><strong>Bigger projects</strong> (repipes, sewer line replacements, water heater swaps with permits): ask after the final walkthrough or once the invoice is paid. A customer still waiting on a drywall patch is not ready to rate you.</li>
<li><strong>After-hours emergencies</strong>: don't text at 2 a.m. Hold the request until the next morning.</li>
</ul>
<p>${GATING_LINE}</p>`,
      },
      {
        h: "Plumber names, photos and reviews that win the next call",
        html: `<p>The reviews that win the next call mention a real person and a real problem: "Carlos found the slab leak and had our water back on by dinner." You can't tell customers what to write, but you can make a useful review more likely:</p>
<ul>
<li>Name the plumber in the request. "Thanks for having Carlos out today" gets more replies than "Rate your experience," and customers often repeat the name.</li>
<li>Mention the job ("your water heater install") so the customer knows which visit you mean.</li>
<li>Say photos are welcome. A cleared drain or a clean water heater install says more than a sentence.</li>
<li>Send one reminder a few days later, then stop.</li>
</ul>
<p>Reviews that mention the job and the town also tell the next homeowner you do that exact work nearby.</p>`,
      },
      {
        h: "Plumbing software we connect to",
        html: `<p>Most plumbing shops already run their jobs in ServiceTitan, Housecall Pro, Jobber or Workiz. The review request should start from there, so nobody has to remember to send it.</p>
${table([ROW.jobber, ROW.hcp, ROW.servicetitan, ROW.workiz, other("Service Fusion, FieldEdge and others"), ROW.none])}`,
      },
      {
        h: "How to reply to plumbing reviews",
        html: `<p>Reply to every review within a day or two. Short is fine.</p>
<ul>
<li><strong>Happy customer:</strong> thank them by name and mention the job. "Thanks, Linda. Glad Carlos got the new water heater in before the weekend."</li>
<li><strong>Price complaint:</strong> stay calm, explain in one or two sentences what was included (after-hours rate, parts, warranty) and offer a phone call. Don't argue in public.</li>
<li><strong>Complaint about the work:</strong> apologize for the trouble, say you want to make it right and give a direct number. Then call.</li>
<li><strong>Never</strong> post private details such as their address, what you found in the home or what they paid.</li>
</ul>
<p>In our Reviews package, replies are drafted with AI in your voice, so no review sits unanswered.</p>`,
      },
      {
        h: "What to look for in plumber review software",
        html: `<ul>
<li>It triggers from your job software when a job is complete.</li>
<li>Text first, email as backup. Most customers act on a text.</li>
<li>It asks every customer and links straight to your Google review form.</li>
<li>It holds after-hours jobs until morning.</li>
<li>One follow-up, and repeat customers aren't asked every visit.</li>
<li>Someone replies to reviews, not just collects them.</li>
<li>Month to month, so you can leave if it doesn't work.</li>
</ul>
<p>${GUIDES_LINE}</p>`,
      },
    ],
    faqs: [
      { q: "What is the best review management platform for plumbers?", a: "The best one sends a request after every job without your team having to remember. Look for a connection to your job software, text requests, one follow-up and help with replies. TableTurnerr does all of that and runs it for you." },
      { q: "When should a plumber ask for a review?", a: "Same day for service and emergency calls, an hour or two after the job is closed. For repipes and sewer work, ask after the final walkthrough or once the invoice is paid. Hold after-hours jobs until the next morning." },
      { q: "What review software integrates with Workiz?", a: "TableTurnerr connects to Workiz through Zapier, using Workiz's Job Is Done trigger, so each finished job sends a review request. We set up the connection for you." },
      { q: "Does it work with ServiceTitan, Housecall Pro or Jobber?", a: "Yes. Jobber is an official integration. Housecall Pro connects on its plan that allows integrations, and ServiceTitan connects through Zapier. If you don't use job software, we import your customer list." },
      gatingFaq("plumbing"),
      costFaq("plumber"),
    ],
  },

  hvac: {
    seoTitle: "HVAC Review Software & Review Automation",
    metaDescription: "HVAC review software that automates a Google review request after every tune-up, repair and install. Works with Jobber, Housecall Pro, ServiceTitan and Workiz.",
    shortAnswer: "HVAC review software sends a review request after every tune-up, repair and install, follows up once and helps you reply. TableTurnerr connects to Jobber (official integration), to Housecall Pro on its plan that allows integrations, and to ServiceTitan, Workiz and others through Zapier or Make, and runs the whole thing for you.",
    sections: [
      {
        h: "When to ask HVAC customers for a review",
        html: `<ul>
<li><strong>No-cool and no-heat calls:</strong> ask the same day, once the job is closed and the house is comfortable again. That's when customers are most grateful.</li>
<li><strong>System replacements:</strong> ask after the install is finished and the walkthrough is done, or when the final invoice is paid if you bill later. Don't ask mid-install.</li>
<li><strong>Maintenance plan visits:</strong> ask after the first tune-up, then hold off. Members who get a request every visit stop opening them.</li>
<li><strong>Overnight emergencies:</strong> hold the request until morning.</li>
</ul>
<p>${GATING_LINE}</p>`,
      },
      {
        h: "Seasons, tech names and install photos",
        html: `<p>HVAC review volume follows the weather. Spring and fall tune-up season gives you a lot of easy, happy visits to ask about. The first heat wave or cold snap brings emergency calls, and that's also when homeowners compare profiles before they call. A slow month is the right time to <a href="/guides/ask-past-customers-for-google-reviews">ask past customers who were never asked</a>.</p>
<p>Name the technician or install lead in the request ("Thanks for having Marcus out today"). Customers often mention that name in their review, and the next homeowner reads it as a real person they could get. For installs, say photos are welcome: a clean new condenser pad or a tidy furnace closet is proof of the work. You can't tell customers what to write, but a clear, personal request gets more detailed reviews.</p>`,
      },
      {
        h: "HVAC software we connect to",
        html: `<p>Larger HVAC shops tend to run ServiceTitan. Smaller and mid-size shops often use Housecall Pro, Jobber or Workiz. Either way, the request should start when the job is closed in that software.</p>
${table([ROW.servicetitan, ROW.hcp, ROW.jobber, ROW.workiz, other("FieldEdge, Successware, Service Fusion and others"), ROW.none])}`,
      },
      {
        h: "How to reply to HVAC reviews",
        html: `<ul>
<li><strong>Happy customer:</strong> thank them, mention the work and the tech. "Thanks, Dave. Glad Marcus got the AC running before the heat wave."</li>
<li><strong>"Too expensive" on a replacement:</strong> say you offer options and the customer chose, briefly mention warranty or efficiency, and invite a call. Don't list numbers in public.</li>
<li><strong>"They tried to upsell me":</strong> explain that techs share what they find and the choice is always the homeowner's. Offer to talk it through.</li>
<li><strong>Repeat breakdown:</strong> apologize, say you'll check it under warranty and give a direct number.</li>
</ul>
<p>Keep private details out of every reply. Our Reviews package drafts replies with AI in your voice, so nothing sits unanswered for weeks.</p>`,
      },
      {
        h: "What to look for in HVAC review software",
        html: `<ul>
<li>Automation from your job software, not a list someone uploads on Fridays.</li>
<li>Different timing for repairs, installs and maintenance visits.</li>
<li>A cooldown so maintenance members aren't asked every visit.</li>
<li>Text requests with one follow-up, sent to every customer.</li>
<li>Help with replies, including the unhappy ones.</li>
<li>A simple monthly report on new reviews and rating.</li>
</ul>
<p>${GUIDES_LINE}</p>`,
      },
    ],
    faqs: [
      { q: "What is the best HVAC review software?", a: "The best HVAC review software sends a request automatically after every completed job, follows up once and helps you reply. It should connect to the job software you already use, such as ServiceTitan, Housecall Pro, Jobber or Workiz." },
      { q: "How does HVAC review automation work?", a: "When a tech closes a job in your software, a text and email go out asking for a Google review, usually the same day. If the customer doesn't respond, one reminder follows a few days later. We set it up and run it for you." },
      { q: "When should I ask for a review after an HVAC install?", a: "After the system is running and the walkthrough is done, or when the final invoice is paid if you bill later. For repairs, ask the same day the job is closed." },
      { q: "Does TableTurnerr work with ServiceTitan?", a: "Yes, through Zapier. ServiceTitan offers a Zapier connection on some of its packages, and we set up the trigger so a completed job sends the request." },
      { q: "What review software integrates with Workiz?", a: "TableTurnerr connects to Workiz through Zapier, using Workiz's Job Is Done trigger, so each finished job sends a review request." },
      costFaq("HVAC"),
    ],
  },

  electrical: {
    seoTitle: "Electrician Review Software & Review Management",
    metaDescription: "Electrician review software: a Google review request after every job, a follow-up and reply help. Works with Jobber, Housecall Pro, ServiceTitan and Workiz.",
    shortAnswer: "Electrician review software sends every customer a review request after the job, follows up once and helps you reply. TableTurnerr connects to Jobber (official integration), to Housecall Pro on its plan that allows integrations, and to ServiceTitan, Workiz and others through Zapier or Make, and runs it for you.",
    sections: [
      {
        h: "When to ask electrical customers for a review",
        html: `<ul>
<li><strong>Service calls</strong> (dead outlets, tripping breakers, fixtures, ceiling fans): ask the same day the job is closed.</li>
<li><strong>Panel upgrades, rewires and service changes:</strong> ask once power is restored and the work has passed inspection, or when the invoice is paid. Asking before the inspector signs off invites a nervous review.</li>
<li><strong>EV chargers and generators:</strong> ask after the first successful charge or the generator startup test, when the customer has seen it work.</li>
<li><strong>After-hours calls:</strong> hold the request until morning.</li>
</ul>
<p>${GATING_LINE}</p>`,
      },
      {
        h: "Why trust matters more in electrical reviews",
        html: `<p>Electrical work is safety work, and homeowners know it. The reviews that help most say the electrician showed up on time, explained the problem, pulled the permit and left the place clean. Those are the details people look for when they pick who opens their panel.</p>
<p>Name the electrician in the request ("Thanks for having Jen out today"). Customers often repeat the name, and a review that says "Jen walked me through the new panel" reads as real. Say photos are welcome: a neat, labeled panel or a clean EV charger install is easy proof. You can't script a review, but a personal request gets more detailed ones. Our guide on <a href="/guides/electrician-review-management">electrician review management</a> goes deeper.</p>`,
      },
      {
        h: "Electrical software we connect to",
        html: `<p>Electrical contractors commonly run their jobs in ServiceTitan, Housecall Pro, Jobber or Workiz. The request should start when the job is closed there.</p>
${table([ROW.jobber, ROW.hcp, ROW.servicetitan, ROW.workiz, other("Service Fusion, FieldEdge and others"), ROW.none])}`,
      },
      {
        h: "How to reply to electrician reviews",
        html: `<ul>
<li><strong>Happy customer:</strong> thank them and mention the job. "Thanks, Priya. Glad the new charger is up and running."</li>
<li><strong>"Had to come back twice":</strong> own it, thank them for their patience and say what you changed. Short and honest beats defensive.</li>
<li><strong>Price or permit complaints:</strong> explain briefly that permits and inspections protect the homeowner, then offer a call.</li>
<li><strong>Safety concerns:</strong> take them offline right away with a direct number. Never discuss code issues or what's in someone's walls in public.</li>
</ul>
<p>Our Reviews package drafts replies with AI in your voice, so every review gets answered.</p>`,
      },
      {
        h: "What to look for in electrician review software",
        html: `<ul>
<li>Triggers from your job software when the job is closed.</li>
<li>Lets you hold big jobs until inspection passes.</li>
<li>Names the tech and the job in the request.</li>
<li>Asks every customer, with one follow-up.</li>
<li>Help writing replies.</li>
<li>No long contract.</li>
</ul>
<p>${GUIDES_LINE}</p>`,
      },
    ],
    faqs: [
      { q: "What is the best review software for electricians?", a: "Look for software that sends a request automatically when a job is closed, names the electrician, follows up once and helps with replies. It should connect to your job software. TableTurnerr does this and runs it for you." },
      { q: "When should an electrician ask for a review after a panel upgrade?", a: "After power is restored and the work passes inspection, or once the invoice is paid. For service calls, ask the same day." },
      { q: "Does it work with ServiceTitan, Housecall Pro, Jobber and Workiz?", a: "Yes. Jobber is an official integration and Housecall Pro connects on its plan that allows integrations. ServiceTitan and Workiz connect through Zapier." },
      { q: "Can the review request name the electrician?", a: "Yes, when your job software shares who did the job. Customers often mention the tech by name, which makes reviews more believable to the next homeowner." },
      gatingFaq("electrical"),
      costFaq("electrician"),
    ],
  },

  roofing: {
    seoTitle: "Roofing Review Management Software for Roofers",
    metaDescription: "Roofing review management: a Google review request after every repair and replacement, plus replies. Works with Jobber, Housecall Pro and others via Zapier.",
    shortAnswer: "Roofing review management means asking every customer for a review once the roof is done and the yard is clean, following up once and replying to every review. TableTurnerr connects to Jobber (official integration), to Housecall Pro on its plan that allows integrations, and to ServiceTitan, JobNimbus, AccuLynx and others through Zapier or Make where they offer it.",
    sections: [
      {
        h: "When to ask roofing customers for a review",
        html: `<ul>
<li><strong>Repairs and leak calls:</strong> ask the same day the job is closed.</li>
<li><strong>Full replacements:</strong> ask after final cleanup and the walkthrough, when the magnet sweep is done and the dumpster is gone. That's the moment the homeowner sees the finished roof.</li>
<li><strong>Insurance jobs:</strong> ask when the roof is finished, not when the last insurance check clears months later. Keep claim details out of the request.</li>
<li><strong>Commercial work:</strong> ask the person you worked with day to day, not accounts payable.</li>
</ul>
<p>${GATING_LINE}</p>`,
      },
      {
        h: "Storm season, photos and proof",
        html: `<p>After a hail or wind storm, homeowners get a lot of knocks on the door and search fast. A profile with recent reviews from their area makes you look like the local, established company. Build reviews before storm season, and ask every storm customer as jobs finish.</p>
<p>Roofing is visual. Say photos are welcome in the request, and post your own job photos on your <a href="/services/google-business-profile">Google Business Profile</a>. Name the project manager or crew lead in the request so the customer knows who's asking.</p>
<p>One real result: Presidential Roofing in Utah went from 27 to 43 Google reviews in 20 days once every finished job got a request.</p>`,
      },
      {
        h: "Roofing software we connect to",
        html: `<p>Roofers often run on roofing CRMs like JobNimbus, AccuLynx or Roofr, or on ServiceTitan, Jobber or Housecall Pro.</p>
${table([ROW.jobber, ROW.hcp, ROW.servicetitan, other("JobNimbus, AccuLynx, Roofr and others"), ROW.none])}`,
      },
      {
        h: "How to reply to roofing reviews",
        html: `<ul>
<li><strong>Happy customer:</strong> thank them and mention the job. "Thanks, Tom. The new roof looks great from the street."</li>
<li><strong>Cleanup complaints</strong> (nails in the driveway, damaged plants): apologize, offer to send someone back, give a direct number. Then do it.</li>
<li><strong>Timeline complaints:</strong> be honest about weather and material delays without blaming the customer.</li>
<li><strong>Insurance disputes:</strong> never discuss claim amounts or adjuster decisions in public. Offer a call.</li>
</ul>
<p>Our Reviews package drafts replies with AI in your voice, so every review gets a response.</p>`,
      },
      {
        h: "What to look for in roofing review software",
        html: `<ul>
<li>Lets you ask after final cleanup, not when the job is first scheduled.</li>
<li>Works with your roofing CRM or a customer export.</li>
<li>Text requests with one follow-up, sent to every customer.</li>
<li>Easy to start a past-customer campaign before storm season.</li>
<li>Help with replies.</li>
<li>Month to month.</li>
</ul>
<p>${GUIDES_LINE}</p>`,
      },
    ],
    faqs: [
      { q: "What is the best review management software for roofers?", a: "The best option asks every customer after the roof is finished, follows up once and helps you reply, connected to the CRM you already use. TableTurnerr does this for you and also works from a customer export." },
      { q: "When should a roofer ask for a review after a replacement?", a: "After final cleanup and the walkthrough, when the homeowner can see the finished roof. For repairs, ask the same day the job is closed." },
      { q: "Should we ask for reviews on insurance jobs?", a: "Yes, once the roof is finished. Don't wait for the final insurance payment, and keep claim details out of the request and any reply." },
      { q: "Does it work with JobNimbus or AccuLynx?", a: "We connect through Zapier or Make where the software offers it. If it doesn't, we work from a regular customer export." },
      { q: "How fast can a roofing company get more reviews?", a: "It depends on job volume. Presidential Roofing in Utah went from 27 to 43 Google reviews in 20 days once every finished job got a request." },
      costFaq("roofing"),
    ],
  },

  "garage-door-repair": {
    seoTitle: "Garage Door Review Management Software",
    metaDescription: "Garage door review software: a Google review request after every spring, opener and install job, plus replies. Works with Workiz, Jobber and Housecall Pro.",
    shortAnswer: "Garage door review software sends a review request after every spring, opener and install job, follows up once and helps you reply. TableTurnerr connects to Jobber (official integration), to Housecall Pro on its plan that allows integrations, and to Workiz, ServiceTitan and others through Zapier or Make.",
    sections: [
      {
        h: "When to ask garage door customers for a review",
        html: `<ul>
<li><strong>Broken springs, cables and openers:</strong> ask the same day, an hour or two after the job is closed. The car is out of the garage and the customer is relieved.</li>
<li><strong>New door installs:</strong> ask once the door is up, the opener is programmed and the customer has the remotes.</li>
<li><strong>Tune-ups:</strong> ask after the first one, then don't ask again every visit.</li>
<li><strong>Late-night calls:</strong> hold the request until morning.</li>
</ul>
<p>Garage door techs often run many short calls a day, so a request that goes out automatically is the only way every customer gets asked. ${GATING_LINE}</p>`,
      },
      {
        h: "Tech names, photos and trust",
        html: `<p>Garage door customers are often calling a company they've never heard of, in a hurry. Reviews that name the tech, the problem and the town ("Mike replaced both springs the same morning") make that choice easier. Name the tech in the request and mention the job so the customer knows which visit you mean.</p>
<p>New doors are great curb-appeal photos. Say photos are welcome in the request, and post your own install photos on your <a href="/services/google-business-profile">Google Business Profile</a>. You can't tell customers what to write, but a personal request gets more detailed reviews.</p>`,
      },
      {
        h: "Garage door software we connect to",
        html: `<p>Garage door companies commonly use Workiz, ServiceTitan, Housecall Pro or Jobber.</p>
${table([ROW.workiz, ROW.jobber, ROW.hcp, ROW.servicetitan, other("Service Fusion and others"), ROW.none])}`,
      },
      {
        h: "How to reply to garage door reviews",
        html: `<ul>
<li><strong>Happy customer:</strong> thank them and mention the fix. "Thanks, Ana. Glad Mike got the door working before work."</li>
<li><strong>Price complaints</strong> about springs or after-hours fees: explain briefly what was included (parts, warranty, emergency rate) and offer a call.</li>
<li><strong>"They pushed a new door":</strong> say techs share options and the choice was the customer's. Keep it short.</li>
<li><strong>A review from someone you never served:</strong> reply calmly that you can't find a record of the job and invite them to call, then report it in Google if it breaks Google's rules.</li>
</ul>
<p>Our Reviews package drafts replies with AI in your voice, so no review goes unanswered.</p>`,
      },
      {
        h: "What to look for in garage door review software",
        html: `<ul>
<li>Works with Workiz or whatever runs your jobs, with no manual uploads.</li>
<li>Same-day text requests with one follow-up.</li>
<li>Names the tech who did the job.</li>
<li>Asks every customer, not only the happy ones.</li>
<li>Help with replies.</li>
<li>No long contract.</li>
</ul>
<p>${GUIDES_LINE}</p>`,
      },
    ],
    faqs: [
      { q: "What is the best review software for garage door companies?", a: "Look for software that sends a same-day text request after every job, follows up once and connects to your job software. TableTurnerr does this and handles replies for you." },
      { q: "What review software integrates with Workiz?", a: "TableTurnerr connects to Workiz through Zapier, using Workiz's Job Is Done trigger, so every finished garage door job sends a review request." },
      { q: "When should we ask for a review after a spring repair?", a: "The same day, an hour or two after the job is closed. For new door installs, ask once the opener is programmed and the customer has the remotes." },
      { q: "Should the review request mention the technician?", a: "Yes. Naming the tech makes the request feel personal, and customers often mention the name in their review, which builds trust with the next caller." },
      { q: "What should we do about a review from someone we never served?", a: "Reply calmly that you can't find a record of the job and invite them to call. If it breaks Google's rules, report it from your Google Business Profile." },
      costFaq("garage door"),
    ],
  },

  handyman: {
    seoTitle: "Handyman Review Software: Get More Google Reviews",
    metaDescription: "Handyman review software that asks every customer for a Google review after each job. Works with Jobber or Housecall Pro, or we import your customer list.",
    shortAnswer: "Handyman review software asks every customer for a Google review after each job, small or large, and helps you reply. TableTurnerr connects to Jobber (official integration) and to Housecall Pro on its plan that allows integrations. If you run on QuickBooks or a spreadsheet, we connect through Zapier or Make or import your customer list.",
    sections: [
      {
        h: "When to ask handyman customers for a review",
        html: `<ul>
<li><strong>Small jobs</strong> (a door that sticks, a TV mount, a leaky faucet): ask the same day. Small jobs are where most handyman reviews come from, so don't skip them.</li>
<li><strong>Multi-day projects</strong> (deck repair, a bathroom refresh): ask after the final walkthrough or when the invoice is paid.</li>
<li><strong>Regulars:</strong> ask once, then leave them alone. A customer you see every month shouldn't get a request every month.</li>
</ul>
<p>If you ask in person, a tap card makes it easy: the customer taps their phone and the Google review form opens. Our Reviews package includes NFC review cards; see our guide on <a href="/guides/google-review-qr-code-and-nfc-cards">QR codes and NFC review cards</a>.</p>
<p>${GATING_LINE}</p>`,
      },
      {
        h: "Your name, photos and the variety of work",
        html: `<p>Many handyman businesses are one or two people, so customers often name the owner in the review. That's good. A review that says "Dan fixed three things in one visit and cleaned up after" tells the next customer exactly what they'll get.</p>
<p>Handyman work varies job to job, and reviews show that range. Mention the job in the request ("your fence gate repair") and say photos are welcome. Before-and-after shots help people picture their own project. Over time, reviews that mention different jobs and towns show you handle a wide range of work nearby.</p>`,
      },
      {
        h: "Handyman software we connect to",
        html: `<p>Plenty of handyman businesses don't use job software at all, and that's fine. Here's how each setup works:</p>
${table([ROW.jobber, ROW.hcp, ROW.quickbooks, other("Workiz, Markate and others"), ROW.none])}`,
      },
      {
        h: "How to reply to handyman reviews",
        html: `<ul>
<li><strong>Happy customer:</strong> thank them by name and mention the job. "Thanks, Karen. Glad the gate closes properly again."</li>
<li><strong>"Took longer than quoted":</strong> be honest about what you found once you opened it up, and offer to talk.</li>
<li><strong>Quality complaint:</strong> apologize and offer to come back. A fixed problem and a calm reply often impress the next customer more than another 5-star review.</li>
<li><strong>Never</strong> share private details or what the customer paid.</li>
</ul>
<p>Our Reviews package drafts replies with AI in your voice, so you're not writing replies at 10 p.m.</p>`,
      },
      {
        h: "What to look for in handyman review software",
        html: `<ul>
<li>Works without job software, or with Jobber or Housecall Pro if you have it.</li>
<li>Text requests with one follow-up.</li>
<li>Tap cards or a QR code for asking in person.</li>
<li>Doesn't pester regulars.</li>
<li>Help with replies.</li>
<li>A price that makes sense for a small business, month to month.</li>
</ul>
<p>${GUIDES_LINE} For more ways to grow, see <a href="/guides/handyman-marketing-ideas">handyman marketing ideas</a>.</p>`,
      },
    ],
    faqs: [
      { q: "What is the best review software for a handyman business?", a: "The best option is simple: a text request after every job, one follow-up and help with replies, whether or not you use job software. TableTurnerr does this for you." },
      { q: "I don't use any job software. Can I still automate reviews?", a: "Yes. We import your customer list from a spreadsheet or export, ask past customers first, and agree with you how new jobs get added. If you use QuickBooks, we can connect it through Zapier or Make." },
      { q: "Should a handyman ask for a review after small jobs?", a: "Yes. Small jobs are most of the work and most of the reviews. Ask the same day, even for a 30-minute repair." },
      { q: "How do I ask for a review in person?", a: "Hand the customer a tap card or show a QR code that opens your Google review form. Our Reviews package includes NFC review cards." },
      { q: "How often should I ask repeat customers?", a: "Once. After they've left a review, don't ask again on every visit." },
      costFaq("handyman"),
    ],
  },

  "pest-control": {
    seoTitle: "Pest Control Review Management Software",
    metaDescription: "Pest control review management for recurring routes: Google review requests without over-asking, plus replies. Works with Jobber, Housecall Pro and GorillaDesk.",
    shortAnswer: "Pest control review management means asking each customer for a review once the treatment has worked, not after every route visit, and replying to every review. TableTurnerr connects to Jobber (official integration), to Housecall Pro on its plan that allows integrations, and to GorillaDesk and other pest software through Zapier or Make.",
    sections: [
      {
        h: "When to ask pest control customers for a review",
        html: `<p>Timing in pest control depends on when the customer actually sees results.</p>
<ul>
<li><strong>One-time jobs</strong> (wasp nests, a wildlife exclusion): ask the same day.</li>
<li><strong>Infestations</strong> (roaches, rodents, bed bugs): ask after the follow-up visit, once things are quiet. Asking the day of the first treatment, before results show, gets lukewarm reviews.</li>
<li><strong>Quarterly or monthly plans:</strong> ask once, after the customer has seen results, then at most once a year. Recurring customers who get a request every visit stop reading them.</li>
<li><strong>Termite work:</strong> ask after treatment and the follow-up inspection.</li>
</ul>
<p>${GATING_LINE}</p>`,
      },
      {
        h: "Route techs, seasons and discretion",
        html: `<p>Recurring customers often see the same tech every visit and know them by name. Use that name in the request ("Thanks for having Luis out this quarter"), and customers will often mention him in the review.</p>
<p>Demand rises in spring and summer, when ants, mosquitoes and wasps come out and homeowners search for help. Getting reviews in during the quieter months means your profile looks current when that rush hits.</p>
<p>Some pests are embarrassing. Many customers don't want "bed bugs" or "rats" tied to their name in public. Keep requests neutral ("your service today"), and never name the pest or the home in a reply unless the customer did first.</p>`,
      },
      {
        h: "Pest control software we connect to",
        html: `<p>Pest control companies often use GorillaDesk, FieldRoutes, PestPac or Briostack, and some use Jobber or Housecall Pro.</p>
${table([ROW.jobber, ROW.hcp, ["GorillaDesk", "Through Zapier or Make."], other("FieldRoutes, PestPac, Briostack and others"), ROW.none])}`,
      },
      {
        h: "How to reply to pest control reviews",
        html: `<ul>
<li><strong>Happy customer:</strong> thank them and mention the tech. "Thanks, Mary. Luis will be glad to hear it."</li>
<li><strong>"Still seeing bugs":</strong> explain that some treatments take a few weeks and offer a free re-service if your plan includes one. Give a direct number.</li>
<li><strong>Missed or late visits:</strong> apologize and say how you'll fix the schedule.</li>
<li><strong>Privacy:</strong> never confirm the pest, the address or anything about the home in public.</li>
</ul>
<p>Our Reviews package drafts replies with AI in your voice, so every review gets answered.</p>`,
      },
      {
        h: "What to look for in pest control review software",
        html: `<ul>
<li>A cooldown so recurring customers aren't asked every visit.</li>
<li>Lets you time requests to the follow-up visit, not the first treatment.</li>
<li>Works with your pest software or a customer export.</li>
<li>Neutral, discreet request wording.</li>
<li>Text requests with one follow-up, sent to every customer.</li>
<li>Help with replies.</li>
</ul>
<p>${GUIDES_LINE}</p>`,
      },
    ],
    faqs: [
      { q: "What is the best review software for pest control companies?", a: "Look for software that asks once results show, doesn't ask recurring customers every visit and connects to your pest software or a customer export. TableTurnerr does this and handles replies for you." },
      { q: "When should pest control companies ask for a review?", a: "Same day for one-time jobs. For infestations, after the follow-up visit. For recurring plans, once after the customer sees results, then at most once a year." },
      { q: "Does it work with GorillaDesk or FieldRoutes?", a: "GorillaDesk connects through Zapier or Make. FieldRoutes, PestPac and others connect the same way where they offer it, or we work from a customer export." },
      { q: "How do we handle reviews that mention bed bugs or rodents?", a: "Thank the customer without repeating the pest or any detail about their home. Keep requests neutral too, since many customers don't want that tied to their name." },
      { q: "Will recurring customers get a request after every visit?", a: "No. We ask once, then hold off for a long stretch, so regular customers aren't pestered." },
      costFaq("pest control"),
    ],
  },

  "lawn-care": {
    seoTitle: "Lawn Care Review Software for More Google Reviews",
    metaDescription: "Lawn care review software that asks for Google reviews at the right point in the season, not after every mow. Works with Jobber, Housecall Pro and more.",
    shortAnswer: "Lawn care review software asks customers for a Google review at the right point in the season, not after every mow, and helps you reply. TableTurnerr connects to Jobber (official integration), to Housecall Pro on its plan that allows integrations, and to other lawn software through Zapier or Make, or works from a customer export.",
    sections: [
      {
        h: "When to ask lawn care customers for a review",
        html: `<ul>
<li><strong>Weekly mowing:</strong> ask once, after the second or third visit, when the customer has seen you show up on schedule. Never every week.</li>
<li><strong>One-time jobs</strong> (spring cleanups, aeration and overseeding, mulch): ask the day the job is done.</li>
<li><strong>Fertilizer and weed programs:</strong> ask once results are visible, usually a few weeks into the program.</li>
<li><strong>End of season:</strong> a short thank-you to customers who never left a review is a natural moment to ask.</li>
</ul>
<p>${GATING_LINE}</p>`,
      },
      {
        h: "Seasons, crews and photos",
        html: `<p>Homeowners shop for lawn care in late winter and early spring. If your newest review is from last August, your profile looks stale right when people compare. Ask at the end of the season and early in spring so you go into the busy months with fresh reviews.</p>
<p>Crews rotate, so name the crew lead or the company rather than a different person every week. Lawn work is visual: say photos are welcome, and post your own fresh-cut and cleanup photos on your <a href="/services/google-business-profile">Google Business Profile</a>.</p>`,
      },
      {
        h: "Lawn care software we connect to",
        html: `<p>Jobber is common in lawn care, and many companies also use Housecall Pro, LMN, Aspire, Service Autopilot or Yardbook.</p>
${table([ROW.jobber, ROW.hcp, other("LMN, Aspire, Service Autopilot, Yardbook and others"), ROW.quickbooks, ROW.none])}`,
      },
      {
        h: "How to reply to lawn care reviews",
        html: `<ul>
<li><strong>Happy customer:</strong> thank them and mention the work. "Thanks, Greg. The yard looked great after the cleanup."</li>
<li><strong>Missed visits or rain delays:</strong> apologize, explain briefly and say how you'll keep them updated.</li>
<li><strong>Damage</strong> (a broken sprinkler head, a scuffed fence): apologize and say you'll make it right, with a direct number.</li>
<li><strong>Never</strong> share the address, gate codes or what they pay.</li>
</ul>
<p>Our Reviews package drafts replies with AI in your voice, so replies don't wait until winter.</p>`,
      },
      {
        h: "What to look for in lawn care review software",
        html: `<ul>
<li>Doesn't ask weekly customers every visit.</li>
<li>Lets you time requests for one-time jobs and programs differently.</li>
<li>Works with Jobber or your lawn software, or a customer export.</li>
<li>Easy end-of-season and spring campaigns to past customers.</li>
<li>Help with replies.</li>
<li>Month to month, so you can pause in the off-season.</li>
</ul>
<p>${GUIDES_LINE}</p>`,
      },
    ],
    faqs: [
      { q: "What is the best review software for lawn care companies?", a: "Look for software that asks at the right point in the season, never after every mow, connects to Jobber or your lawn software, and helps you reply. TableTurnerr does this for you." },
      { q: "When should a lawn care company ask for a review on weekly mowing?", a: "Once, after the second or third visit. Then thank customers at the end of the season and ask anyone who hasn't reviewed yet." },
      { q: "Does it work with Jobber?", a: "Yes. Jobber is an official integration, so a completed visit can trigger the request automatically. Other lawn software connects through Zapier or Make, or we work from a customer export." },
      { q: "How do we keep getting reviews in the off-season?", a: "Ask at the end of the season and again early in spring, before homeowners start comparing. A past-customer campaign fills the gap." },
      { q: "How should we reply to a review about a damaged sprinkler head?", a: "Apologize, say you'll make it right and give a direct number. Then fix it and keep the details out of the public reply." },
      costFaq("lawn care"),
    ],
  },
};
for (const [slug, o] of Object.entries(TRADE_CONTENT)) if (INDUSTRIES[slug]) Object.assign(INDUSTRIES[slug], o);

export const INDUSTRY_SLUGS = Object.keys(INDUSTRIES);

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES[slug];
}
