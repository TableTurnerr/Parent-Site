import type { ProductFeature } from "./features";

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
}

const coreReviewFeatures = [
  "review-reactivation",
  "multi-platform-reviews",
  "map-pack-rank-tracking",
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
    metaDescription: `Review management software for ${input.name} businesses. Request customer reviews after completed jobs, improve local visibility, and turn great work into proof for the next customer.`,
    outcomes: [
      "Review requests after completed jobs",
      "Google, Facebook, Yelp and Angi review coverage",
      "Local visibility tracked alongside review activity",
      "Relevant FieldTask operations tools when your team needs them",
    ],
    faqs: [
      {
        q: `How does review automation work for ${input.name} companies?`,
        a: "After a completed job, TableTurnerr can send a thoughtful review request by text or email. The workflow helps your team consistently ask for feedback without making technicians chase reviews themselves.",
      },
      {
        q: `Which review sites can ${input.name} businesses use?`,
        a: "TableTurnerr supports review workflows for Google, Facebook, Yelp and Angi, so you can direct customers to the places future homeowners commonly check.",
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

export const INDUSTRY_SLUGS = Object.keys(INDUSTRIES);

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES[slug];
}
