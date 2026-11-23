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
      "Review requests by text and email after every job, with a personalized photo of you or your crew",
      "Connects to Jobber, Housecall Pro or GorillaDesk, so requests go out on their own",
      "Replies to every review, written for you",
      "Set up and run for you, with a monthly report in plain English",
    ],
  },
  {
    name: "Professional",
    price: "About $500",
    per: "/mo",
    forWho: "You want everything that gets your business to the next level, handled.",
    highlight: "Full program",
    features: [
      "Everything in Starter",
      "Google Business Profile kept active with posts and photos",
      "Local SEO, with 20–30 service and town pages on your website",
      "AI search optimization (AEO), so ChatGPT, Gemini and Google's AI answers can recommend you",
      "CRM with AI follow-ups, appointment reminders and estimate reminders",
      "Missed-call text-back and website lead capture, so no lead goes cold",
      "Reputation monitoring, with an alert when a bad review lands",
      "Content on Google, Facebook, Instagram and TikTok, plus seasonal campaigns to past customers",
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
      "AI receptionist that answers after-hours calls, qualifies the lead and books the job",
      "Unlimited follow-up automation",
      "More keywords and towns targeted",
      "More of our time: closer check-ins and faster changes",
    ],
  },
];

// Pricing-page FAQs.
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
    q: "Is the software included?",
    a: "Yes. The review automation, CRM, missed-call text-back and AI tools we built are part of every plan. We set them up and run them, so there's nothing extra to buy or learn.",
  },
  {
    q: "Does it work with my job software?",
    a: "Yes. We connect to Jobber, Housecall Pro and GorillaDesk, so review requests and follow-ups go out when a job is marked done.",
  },
];
