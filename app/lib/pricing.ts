// Single source of truth for the plans, shared by the homepage pricing section
// and the standalone /pricing page so the two never drift apart.
export interface Plan {
  name: string;
  price: string;
  per: string;
  note: string;
  description: string;
  goal: string;
  popular: boolean;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    name: "Review Booster",
    price: "$80",
    per: "/mo",
    note: "Get more 5-star Google reviews automatically",
    description:
      "For businesses that already have customers but aren't collecting enough reviews.",
    goal: "Request honest reviews from every eligible customer.",
    popular: false,
    features: [
      "Automated review requests via SMS and email",
      "Personalized image",
      "CRM integration (Jobber, Housecall Pro, GorillaDesk and more)",
      "Automated review responses",
    ],
  },
  {
    name: "Customer Growth System",
    price: "$297",
    per: "/mo",
    note: "Your complete system to get more customers and build trust online",
    description: "Everything in Review Booster, plus:",
    goal: "Stop losing potential customers and turn more leads into booked jobs.",
    popular: true,
    features: [
      "AI-powered follow-ups",
      "Missed-call text-back",
      "Lead capture system",
      "On-site SEO (20–30 pages)",
      "Customer database / CRM",
      "Automated follow-up campaigns",
      "Appointment and estimate reminders",
      "Reputation monitoring",
    ],
  },
  {
    name: "AI Growth Machine",
    price: "$427",
    per: "/mo",
    note: "Your AI employee that works 24/7",
    description: "Everything in Customer Growth System, plus:",
    goal: "Never miss another customer opportunity.",
    popular: false,
    features: [
      "AI receptionist (150 free minutes)",
      "Instant customer-question answers",
      "After-hours lead capture",
      "Lead qualification",
      "Automatic appointment booking",
      "Common customer-request handling",
      "Unlimited follow-up automation",
    ],
  },
];

// Done-for-you pricing: custom per client, in three rough bands. These match what the owner says in the VSL
// (5:11, "Pricing"): ~$100–300 for one or a few things, ~$500 for everything to get to the next level, ~$750 when
// it's maxed out with ads. On 2026-11-20 the owner moved the top level to ~$1,000 and added after-hours AI answering.
// The final number is set after the free audit.
export interface Tier {
  name: string;
  price: string;
  per: string;
  forWho: string;
  features: string[];
  highlight?: string;
}

export const DFY_TIERS: Tier[] = [
  {
    name: "Starter",
    price: "$100–300",
    per: "/mo",
    forWho: "You need one or two things done well, not a full program.",
    features: [
      "Pick what you need: Google reviews, a website, or your Google Business Profile",
      "Set up and run for you",
      "Monthly report in plain English",
    ],
  },
  {
    name: "Professional",
    price: "About $500",
    per: "/mo",
    forWho: "You want everything that gets your business to the next level, handled.",
    highlight: "Full program",
    features: [
      "Review requests after every job, and replies to every review",
      "Google Business Profile kept active with posts and photos",
      "Content on Google, Facebook, Instagram and TikTok",
      "Local SEO and service pages for the towns you serve",
      "AI search optimization (AEO), so ChatGPT, Gemini and Google's AI answers can recommend you",
      "CRM with follow-ups, estimate reminders and missed-call text-back",
      "Seasonal campaigns to past customers",
      "Or a custom mix built around your audit",
    ],
  },
  {
    name: "Premier",
    price: "About $1,000",
    per: "/mo",
    forWho: "You want to grow fast and want more of our attention.",
    features: [
      "Everything in Professional",
      "Paid ads on top",
      "After-hours AI answering service, so night and weekend calls get answered and booked",
      "More keywords and towns targeted",
      "More of our time: closer check-ins and faster changes",
    ],
  },
];

// Pricing-page FAQs: done-for-you pricing first, then the self-serve software.
export const PRICING_FAQS = [
  {
    q: "How much does TableTurnerr cost?",
    a: "It depends on what your business needs. Most clients pay $100–300/mo for one or a few things (just reviews, just a website), about $500/mo for the full program, or about $1,000/mo when we add ads, an after-hours AI answering service and more attention. We set the exact price after the free Google Maps audit.",
  },
  {
    q: "Why isn't there one fixed price?",
    a: "Every business is at a different point. You might not need a website, or SEO, or reviews. The audit shows what's missing compared with your top competitors, and we only quote for what will move the needle.",
  },
  {
    q: "What decides which price I pay?",
    a: "Three things: which services you need, how aggressively you want to grow (how many keywords and towns we target, and whether we run ads), and how much attention you want from us.",
  },
  {
    q: "Is there a contract?",
    a: "No. Done-for-you work is month to month, so you can scale up, scale down or stop.",
  },
  {
    q: "Can I run the software myself instead?",
    a: "Yes. Self-serve software plans start at $80/mo (Review Booster), with Customer Growth System at $297/mo and AI Growth Machine at $427/mo. All come with a 14-day free trial, no credit card required.",
  },
  {
    q: "On the software plans, what counts as a review request?",
    a: "A review request is one customer you ask for a review (by text and email, including gentle reminders to that same person). Your plan's monthly limit is the number of customers you can ask each month.",
  },
  {
    q: "What if I need more review requests on the software?",
    a: "Move up a plan anytime, or contact us for higher-volume and multi-location pricing. You only pay for the tier you need, and changes take effect immediately.",
  },
  {
    q: "Is there a free trial?",
    a: "For the self-serve software, yes: 14 days, no credit card required, so you can connect your CRM and see reviews come in before you pay. Done-for-you work starts with the free Google Maps audit instead.",
  },
];
