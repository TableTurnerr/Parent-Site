export interface Integration {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  blurb: string;
  syncs: string[];
  faqs: { q: string; a: string }[];
}

export const INTEGRATIONS: Record<string, Integration> = {
  jobber: {
    slug: "jobber",
    name: "Jobber",
    category: "Field-service CRM",
    tagline: "Ask for a review after every closed Jobber job",
    blurb:
      "Connect Jobber once and TableTurnerr watches for completed jobs, then automatically asks each customer for a review at the perfect moment. No exports, no manual lists, no chasing.",
    syncs: [
      "Customers and contact details (phone + email)",
      "Completed jobs and visits, in real time",
      "Job type, so requests stay relevant",
    ],
    faqs: [
      { q: "Does TableTurnerr work with Jobber?", a: "Yes. We connect directly to Jobber, so every completed job can trigger an automatic review request by text and email, with no manual work from your team." },
      { q: "What does the Jobber connection access?", a: "Only what's needed to send requests: customer contact info, completed-job events, and the assigned technician. We never change anything in your Jobber account." },
      { q: "How long does it take to connect?", a: "About a minute. Authorize Jobber, we import your customers, and review requests start firing on your next completed job." },
    ],
  },
  "housecall-pro": {
    slug: "housecall-pro",
    name: "Housecall Pro",
    category: "Field-service CRM",
    tagline: "Automatic reviews from every Housecall Pro job",
    blurb:
      "On Housecall Pro's plan that allows integrations, TableTurnerr requests a review the moment a job is marked complete, across Google, Facebook, Yelp and Angi. Your techs keep working; the reviews take care of themselves.",
    syncs: [
      "Customers and contact details",
      "Completed jobs, in real time",
      "Recurring and membership visits",
    ],
    faqs: [
      { q: "Does TableTurnerr integrate with Housecall Pro?", a: "Yes, on Housecall Pro's plan that allows integrations (its premium plan). When a job is completed, we automatically send that customer a personalized review request. On a lower plan, we import your customer list instead." },
      { q: "Will it message the same customer twice?", a: "No. A built-in cooldown means repeat and membership customers are never over-asked, even across multiple visits." },
      { q: "How fast is setup?", a: "We set up the connection with you during onboarding, import your customer list, and start on the next completed job." },
    ],
  },
  servicetitan: {
    slug: "servicetitan",
    name: "ServiceTitan",
    category: "Field-service CRM",
    tagline: "ServiceTitan jobs in, 5-star reviews out",
    blurb:
      "TableTurnerr connects to ServiceTitan through Zapier or Make and turns completed jobs into a steady stream of reviews, with technician-level attribution so your whole team competes to earn them.",
    syncs: [
      "Customers and contact details",
      "Completed jobs across business units",
      "Job type and tags",
    ],
    faqs: [
      { q: "Does TableTurnerr support ServiceTitan?", a: "Yes. We connect ServiceTitan through Zapier or Make, so completed jobs trigger automatic, personalized review requests, with the technician passed along for attribution." },
      { q: "Is it hard to set up?", a: "No. We build the Zapier or Make connection and import your customers for you during onboarding." },
    ],
  },
  workiz: {
    slug: "workiz",
    name: "Workiz",
    category: "Field-service CRM",
    tagline: "Review automation for your Workiz jobs",
    blurb:
      "Connect Workiz through Zapier or Make and every finished job becomes a chance for a fresh review. TableTurnerr handles the ask, the follow-ups, and the multi-platform routing automatically.",
    syncs: [
      "Customers and contact details",
      "Completed jobs, in real time",
      "Assigned technician",
      "Job source and type",
    ],
    faqs: [
      { q: "Does TableTurnerr work with Workiz?", a: "Yes. We connect Workiz through Zapier or Make, so completed jobs automatically trigger review requests by text and email." },
      { q: "What data do you use?", a: "Customer contact info, completed-job events, and the assigned tech. We don't modify anything in Workiz." },
      { q: "How quickly can we start?", a: "We set up the connection during onboarding, then requests begin on your next completed job." },
    ],
  },
  quickbooks: {
    slug: "quickbooks",
    name: "QuickBooks",
    category: "Accounting",
    tagline: "Turn paid QuickBooks invoices into reviews",
    blurb:
      "No field-service CRM? No problem. Connect QuickBooks through Zapier or Make and TableTurnerr asks for a review after an invoice is paid, so even invoice-only shops build a steady flow of 5-star reviews.",
    syncs: [
      "Customers and contact details",
      "Paid invoices, as the trigger",
      "Invoice amount, to prioritize big jobs",
    ],
    faqs: [
      { q: "Can I use TableTurnerr with just QuickBooks?", a: "Yes. If you run on QuickBooks instead of a field-service CRM, we use paid invoices as the trigger to request a review from that customer." },
      { q: "Online or Desktop?", a: "QuickBooks Online connects through Zapier or Make. For Desktop, we import your customer list instead. We set it up during onboarding." },
      { q: "How long does setup take?", a: "We build the connection and import your customers during onboarding, so there's nothing for you to set up." },
    ],
  },
};

export const INTEGRATION_SLUGS = Object.keys(INTEGRATIONS);
export const getIntegration = (slug: string): Integration | undefined => INTEGRATIONS[slug];
