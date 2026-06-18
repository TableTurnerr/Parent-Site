/**
 * Data for the "cost" pages under /pricing. These target high-intent,
 * bottom-of-funnel searches ("how much does a website cost", "local seo cost",
 * "google ads cost") that competitors leave unanswered. We publish honest
 * market ranges (not committed company prices) and funnel to a custom quote.
 *
 * Copy rules: no em-dashes, "guide" is never used as a noun in user-facing text.
 */

export interface CostTier {
  label: string;
  price: string;
  description: string;
  best: string;
}

export interface CostFactor {
  title: string;
  description: string;
}

export interface CostPage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  eyebrow: string;
  intro: string;
  /** TL;DR answer, surfaced in a highlighted box for featured snippets. */
  shortAnswer: string;
  tiersHeading: string;
  tiers: CostTier[];
  factorsHeading: string;
  factorsIntro: string;
  factors: CostFactor[];
  approachHeading: string;
  approach: string;
  faqs: { question: string; answer: string }[];
  relatedService: { label: string; href: string };
}

export const COST_PAGES: Record<string, CostPage> = {
  "website-design-cost": {
    slug: "website-design-cost",
    metaTitle: "How Much Does a Website Cost? (2026 Pricing)",
    metaDescription:
      "How much does a website cost for a small business in 2026? Honest price ranges for DIY, template, and custom agency sites, plus what drives the price.",
    keywords: [
      "how much does a website cost",
      "small business website cost",
      "website design cost",
      "restaurant website cost",
      "website pricing 2026",
    ],
    h1: "How Much Does a Website Cost?",
    eyebrow: "Pricing",
    intro:
      "Most small businesses want one number before they start: what will a website actually cost? Here is an honest breakdown of what local businesses pay in 2026, what drives the price up or down, and how to make sure you are paying for results, not just a pretty page.",
    shortAnswer:
      "Most local businesses pay between $2,000 and $10,000 for a professionally designed website, or roughly $50 to $300 a month for a managed site that includes hosting and updates. A simple template site can start near $1,000, while a larger custom build with online ordering or booking runs higher.",
    tiersHeading: "What a website costs, by type",
    tiers: [
      {
        label: "DIY website builder",
        price: "$0 to $30 / mo",
        description:
          "You design and maintain it yourself on a platform like Wix or Squarespace. Cheapest up front, but it costs you time and rarely ranks well or converts visitors into customers.",
        best: "Brand new businesses testing an idea",
      },
      {
        label: "Template or managed site",
        price: "$1,000 to $3,000, or $50 to $300 / mo",
        description:
          "A proven template tailored with your brand, set up and maintained for you. Fast to launch and far better built than DIY.",
        best: "Local businesses that want a solid site without a big up-front bill",
      },
      {
        label: "Custom agency website",
        price: "$3,000 to $10,000+",
        description:
          "A site designed and built around your business, your customers, and your goals, with SEO built in from day one.",
        best: "Established businesses competing in a busy market",
      },
      {
        label: "Online ordering or booking add-on",
        price: "+$500 to $3,000",
        description:
          "Menus, online ordering, reservations, and payment integrations add cost but pay back fast by cutting third party commissions.",
        best: "Restaurants and appointment based businesses",
      },
    ],
    factorsHeading: "What changes the price",
    factorsIntro:
      "Two websites can cost very differently. These are the things that move the number:",
    factors: [
      {
        title: "Number of pages and complexity",
        description:
          "A five page site costs far less than a twenty page site with custom features.",
      },
      {
        title: "Custom design vs a proven template",
        description:
          "Designing from a blank page is expensive. A tailored, conversion tested framework gives you the same quality for less.",
      },
      {
        title: "Copywriting and photography",
        description:
          "Professional words and images cost more up front but convert far better than placeholder content.",
      },
      {
        title: "SEO built in vs added later",
        description:
          "A site built for search from the start is much cheaper than fixing one that was not.",
      },
      {
        title: "Integrations",
        description:
          "Online ordering, booking, payments, and POS connections each add to the build.",
      },
      {
        title: "Ongoing care and hosting",
        description:
          "Hosting, security, and regular updates are either a monthly fee or your own time.",
      },
    ],
    approachHeading: "How we price websites",
    approach:
      "At TableTurnerr we do not start from a blank page or charge blank page prices. We have one conversion tested website framework that we tailor to each business, so you get agency quality design and built in SEO without paying to reinvent the wheel. You get a clear quote up front, no long lock in contracts, and a site built to bring in calls and customers, not just to look good.",
    faqs: [
      {
        question: "Is a cheap website worth it?",
        answer:
          "A low cost DIY site can work when you are starting out, but it usually loads slowly, ranks poorly, and converts few visitors into customers. For an established local business, a professionally built site almost always pays for itself in extra calls and bookings.",
      },
      {
        question: "Should I pay one time or monthly?",
        answer:
          "One time pricing suits businesses with the budget up front and their own plan for updates. Monthly pricing spreads the cost and usually includes hosting, security, and ongoing changes, so your site keeps improving instead of going stale.",
      },
      {
        question: "How long does a new website take?",
        answer:
          "Most professional small business websites are ready in two to four weeks, depending on how many pages you need and how quickly content and photos come together.",
      },
      {
        question: "Does the price include SEO?",
        answer:
          "It should. A site that is not built for search is far harder and more expensive to rank later. We build SEO in from the first page so you are found on Google from day one.",
      },
    ],
    relatedService: {
      label: "See our Website Design service",
      href: "/services/restaurant-website-design",
    },
  },

  "local-seo-cost": {
    slug: "local-seo-cost",
    metaTitle: "How Much Does Local SEO Cost? (2026 Pricing)",
    metaDescription:
      "How much does local SEO cost in 2026? Real monthly price ranges for freelancers and agencies, what changes the cost, and how to spot fair value.",
    keywords: [
      "how much does local SEO cost",
      "local SEO cost",
      "local SEO pricing",
      "small business SEO cost",
      "SEO cost per month",
    ],
    h1: "How Much Does Local SEO Cost?",
    eyebrow: "Pricing",
    intro:
      "Local SEO is what gets your business into the Google map results and in front of nearby customers searching right now. Here is what it actually costs in 2026, what makes the price move, and how to tell good value from wasted spend.",
    shortAnswer:
      "Most local businesses pay between $750 and $2,000 a month for local SEO with an established agency. Freelancers can start around $300 a month for limited work, while competitive markets or multi location businesses often run $2,000 to $5,000 a month. A one time Google Business Profile setup or audit typically runs $300 to $1,500.",
    tiersHeading: "What local SEO costs, by level",
    tiers: [
      {
        label: "Freelancer or entry level",
        price: "$300 to $750 / mo",
        description:
          "Basic on page work and a few listings. Low cost, but usually slow and limited in scope.",
        best: "Very small or brand new local businesses",
      },
      {
        label: "Established local agency",
        price: "$750 to $2,000 / mo",
        description:
          "A full program: Google Business Profile, local content, citations, reviews, and reporting. The typical range for a serious local business.",
        best: "Most local businesses that want steady growth",
      },
      {
        label: "Competitive or multi location",
        price: "$2,000 to $5,000+ / mo",
        description:
          "Aggressive content and link building across busy markets or several locations.",
        best: "Businesses in crowded markets or with multiple branches",
      },
      {
        label: "One time profile setup or audit",
        price: "$300 to $1,500",
        description:
          "A full optimization or health check of your Google Business Profile and local presence.",
        best: "Owners who want a quick win or a clear starting point",
      },
    ],
    factorsHeading: "What changes the price",
    factorsIntro:
      "Local SEO is not one price for everyone. These are the things that move it:",
    factors: [
      {
        title: "How competitive your market is",
        description:
          "Ranking in a big city or a crowded category takes more work than a small town.",
      },
      {
        title: "Number of locations",
        description:
          "Each branch needs its own profile, content, and citations, which adds to the work.",
      },
      {
        title: "Your current website health",
        description:
          "A fast, well built site needs less fixing before it can rank, which lowers the cost.",
      },
      {
        title: "Content and review work",
        description:
          "More pages, posts, and active review management mean more results, and more cost.",
      },
      {
        title: "Link building",
        description:
          "Earning trusted links is some of the highest value work, and the most involved.",
      },
      {
        title: "How fast you want results",
        description:
          "A faster pace means more work each month. A steady pace costs less and still compounds.",
      },
    ],
    approachHeading: "How we price local SEO",
    approach:
      "We price local SEO around what actually moves your rankings, not a one size fits all retainer. You get a clear scope, monthly reporting you can understand, and no long lock in contracts. And because local visibility compounds, the businesses that start sooner spend less to stay ahead later.",
    faqs: [
      {
        question: "How long until local SEO works?",
        answer:
          "Most local businesses see real movement in three to six months, with results compounding after that. Anyone promising page one in a week is selling you something that will not last.",
      },
      {
        question: "Is local SEO worth it for a small business?",
        answer:
          "For any business that relies on nearby customers, yes. Most people choose a local business from the top few map results, so getting there directly grows calls and visits. It is usually the highest return marketing a local business can do.",
      },
      {
        question: "What is the difference between SEO and local SEO?",
        answer:
          "Regular SEO competes for searches anywhere. Local SEO focuses on customers in your area and on the Google map pack, which is where most local buying decisions happen.",
      },
      {
        question: "Do I need to pay for ads too?",
        answer:
          "No. Local SEO earns free, lasting visibility. Ads can speed things up while SEO builds, but they are optional, not required.",
      },
    ],
    relatedService: {
      label: "See our Local SEO service",
      href: "/services/restaurant-seo",
    },
  },

  "google-ads-cost": {
    slug: "google-ads-cost",
    metaTitle: "How Much Do Google Ads Cost? (2026 Pricing)",
    metaDescription:
      "How much do Google Ads cost for a small business in 2026? A clear breakdown of ad spend plus management fees, and what really drives the total.",
    keywords: [
      "how much do google ads cost",
      "google ads cost for small business",
      "google ads management cost",
      "google ads pricing",
      "ppc cost small business",
    ],
    h1: "How Much Do Google Ads Cost?",
    eyebrow: "Pricing",
    intro:
      "Google Ads can put your business at the very top of search results the day you launch. The cost comes in two parts: what you pay Google for clicks, and what you pay to have the campaign managed well. Here is what local businesses really spend in 2026.",
    shortAnswer:
      "Most local businesses spend between $1,000 and $3,000 a month all in to start with Google Ads. That usually breaks down into $500 to $2,500 in ad spend paid to Google, plus a management fee of either 10 to 20 percent of that spend or a flat $350 to $1,500 a month.",
    tiersHeading: "The two parts of Google Ads cost",
    tiers: [
      {
        label: "Ad spend, paid to Google",
        price: "$500 to $5,000 / mo",
        description:
          "What you pay for clicks. Most local businesses start at $500 to $1,500 and scale up as the ads prove they pay.",
        best: "Set by your goals and your market",
      },
      {
        label: "Management fee, percentage model",
        price: "10% to 20% of ad spend",
        description:
          "The agency fee scales with your budget. Common for larger or growing ad accounts.",
        best: "Businesses planning to scale their spend",
      },
      {
        label: "Management fee, flat model",
        price: "$350 to $1,500 / mo",
        description:
          "A fixed monthly fee to build, run, and optimize your campaigns. Predictable and simple.",
        best: "Smaller local budgets that want one clear number",
      },
    ],
    factorsHeading: "What changes the price",
    factorsIntro:
      "Your total can swing a lot based on these. The biggest lever is usually your own landing page:",
    factors: [
      {
        title: "Your industry and cost per click",
        description:
          "Some industries cost under a dollar a click, others well over four. This sets your baseline.",
      },
      {
        title: "How competitive your area is",
        description:
          "More businesses bidding on the same searches pushes click prices up.",
      },
      {
        title: "The size of your target radius",
        description:
          "A wider area reaches more people but costs more. A tight local radius is cheaper and often converts better.",
      },
      {
        title: "How many campaigns and keywords",
        description:
          "More services or products to advertise means more to build and manage.",
      },
      {
        title: "The quality of your landing page",
        description:
          "A faster, clearer page lowers your cost per lead and makes every dollar of spend go further.",
      },
    ],
    approachHeading: "How we price Google Ads",
    approach:
      "We keep the money where it works: most of your budget into clicks, a fair fee to manage them, and ruthless focus on the searches that bring real calls and customers. You get transparent reporting on what every dollar returns, and no long lock in contracts. If the ads are not paying, we tell you.",
    faqs: [
      {
        question: "How much should a small business spend on Google Ads?",
        answer:
          "Most local businesses start at $500 to $1,500 a month in ad spend, then scale up once the ads prove they bring in profitable customers. It is better to start small, learn what works, and grow than to overspend on day one.",
      },
      {
        question: "Are Google Ads worth it for a small business?",
        answer:
          "They can be very worth it when the math works. If a customer is worth far more than the cost to win them through ads, every dollar in returns several back. The key is tracking real calls and sales, not just clicks.",
      },
      {
        question: "What is a good cost per click?",
        answer:
          "It varies widely by industry, from under a dollar to well over four. What matters is not the click price but the cost to win an actual customer, which good targeting and a strong landing page bring down.",
      },
      {
        question: "Do I pay Google or the agency?",
        answer:
          "Both, separately. You pay Google directly for the clicks, and the agency for building and managing the campaigns. We keep that split clear so you always know where your money goes.",
      },
    ],
    relatedService: {
      label: "See our Google Ads service",
      href: "/services/google-ads",
    },
  },
};

export const COST_PAGE_LIST: CostPage[] = Object.values(COST_PAGES);
