// Single source of truth for the plans, shared by the homepage pricing section
// and the standalone /pricing page so the two never drift apart.
export interface Plan {
  name: string;
  price: string;
  per: string;
  note: string;
  popular: boolean;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "$84",
    per: "/mo",
    note: "Up to 50 review requests/mo",
    popular: false,
    features: [
      "Google + Facebook reviews",
      "Review reactivation",
      "Automated text & email requests",
      "Review widgets",
      "Unlimited users",
    ],
  },
  {
    name: "Growth",
    price: "$150",
    per: "/mo",
    note: "Up to 100 review requests/mo",
    popular: true,
    features: [
      "Everything in Starter",
      "Yelp + Angi routing",
      "Technician leaderboards",
      "AI requests & replies",
      "Auto social posts",
      "1-on-1 setup call",
    ],
  },
  {
    name: "Pro",
    price: "$233",
    per: "/mo",
    note: "Up to 300 review requests/mo",
    popular: false,
    features: [
      "Everything in Growth",
      "Map-pack rank tracking",
      "Multi-location dashboard",
      "Monthly owner report",
      "Priority support",
    ],
  },
];

// Pricing-page FAQs: long-tail "how much does review automation cost" intent.
export const PRICING_FAQS = [
  {
    q: "How much does review automation cost?",
    a: "TableTurnerr starts at $84/mo for the Starter plan, $150/mo for Growth (our most popular), and $233/mo for Pro. Every plan is month-to-month with a 14-day free trial, no setup fees, and no contract.",
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
