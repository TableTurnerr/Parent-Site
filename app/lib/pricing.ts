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
    goal: "Turn more happy customers into 5-star reviews.",
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

// Pricing-page FAQs: long-tail "how much does review automation cost" intent.
export const PRICING_FAQS = [
  {
    q: "How much does review automation cost?",
    a: "TableTurnerr starts at $80/mo for Review Booster, $297/mo for Customer Growth System (our most popular), and $427/mo for AI Growth Machine. Every plan is month-to-month with a 14-day free trial, no setup fees, and no contract.",
  },
  {
    q: "Is there a contract or setup fee?",
    a: "No. Every plan is month-to-month and you can cancel anytime. There are no setup fees and no long-term commitment, and we back it with a 90-day results guarantee.",
  },
  {
    q: "What counts as a review request?",
    a: "A review request is one customer you ask for a review (by text and email, including gentle reminders to that same person). Your plan's monthly limit is the number of customers you can ask each month.",
  },
  {
    q: "What if I need more review requests?",
    a: "Move up a plan anytime, or contact us for higher-volume and multi-location pricing. You only pay for the tier you need, and changes take effect immediately.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes. Every plan includes a 14-day free trial with no credit card required, so you can connect your CRM and see reviews come in before you pay anything.",
  },
];
