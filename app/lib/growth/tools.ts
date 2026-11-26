// Free tools for home-service owners (/tools). Each tool answers one question owners already search for, shows the
// math, and hands off to the free Google Maps audit. Pattern borrowed from Jobber's /free-tools, Housecall Pro's graders
// and Owner.com's restaurant grader: a free tool earns links and searches that a sales page never will.
import type { Link3, Pair } from "@/app/lib/growth";
import { tools2 } from "@/app/lib/growth/tools2";

export type ToolSlug =
  | "google-review-calculator" | "missed-call-calculator" | "marketing-roi-calculator" | "review-request-templates"
  | "job-price-calculator" | "hourly-rate-calculator" | "maintenance-plan-calculator" | "cost-per-lead-calculator"
  | "estimate-template" | "invoice-template" | "contractor-text-templates" | "phone-scripts" | "google-review-link-generator"
  | "lead-response-calculator" | "google-business-description-generator" | "missed-call-text-templates" | "review-response-templates";

export interface Tool {
  slug: ToolSlug;
  path: string;
  /** Short name for cards and nav. */
  name: string;
  /** <title> (absolute, 50-60 chars). */
  title: string;
  description: string;
  h1: string;
  lede: string;
  /** One line for the hub card. */
  card: string;
  /** Heading of the method section (templates and makers aren't math). */
  heading?: string;
  /** How the numbers are worked out, shown under the tool. */
  method: Pair[];
  faq: Pair[];
  next: Link3[];
}

const tools1: Tool[] = [
  {
    slug: "google-review-calculator",
    path: "/tools/google-review-calculator",
    name: "Google review calculator",
    title: "Google Review Calculator: How Many Reviews Do You Need?",
    description:
      "Free calculator for home-service businesses: how many Google reviews you need to pass competitors and reach your target star rating, and how long it takes.",
    h1: "Google review calculator",
    lede:
      "Put in your review count, your rating and what the top competitors near you have. You get the number of reviews you need to pass them, the 5-star reviews it takes to reach your target rating, and how many months that takes at your job volume.",
    card: "How many reviews you need to pass competitors and hit your target rating, and how long it takes.",
    method: [
      ["Reviews to pass the leader", "The leader's review count minus yours, plus one. Google doesn't rank on count alone, but in most map packs the top three have more reviews than the businesses below them."],
      ["5-star reviews to reach a rating", "Your current total stars plus N five-star reviews, divided by your review count plus N, has to reach the target. We solve for N and round up."],
      ["Months to get there", "Jobs per month times the share of customers who leave a review when asked. Owners who ask every customer by text right after the job get far more reviews than owners who don't ask. Use your own rate if you know it; 10% is a cautious starting point."],
    ],
    faq: [
      ["How many Google reviews does a home-service business need?", "Enough to sit with the top three in your area, and a steady flow of new ones. In a small town that can be 30 to 50. In a big metro the leaders can have several hundred. The number that matters is the gap to the businesses you're competing with, which is what this calculator works out."],
      ["Do more reviews help me rank higher on Google Maps?", "Reviews are one of the main local ranking signals, along with relevance, distance and how complete your profile is. Count, rating, how recent the reviews are and whether you reply all play a part. More reviews also get you more calls from the people who do find you."],
      ["Can I buy reviews or only ask happy customers?", "No. Fake or paid reviews break Google's rules and can get reviews removed or your profile suspended. Asking only happy customers (review gating) is also against Google's policy. Ask every customer, the same way, and reply to every review."],
      ["How fast can I get more Google reviews?", "Most of the speed comes from asking every customer by text within an hour of finishing the job, plus a one-time campaign to past customers. One of our roofing clients went from 27 to 43 reviews in 20 days that way."],
    ],
    next: [
      ["/tools/review-request-templates", "Review request templates", "Copy-and-paste texts and emails that get customers to leave a review."],
      ["/guides/how-many-google-reviews-to-rank", "How many reviews to rank", "The full guide to what review counts actually do for map rankings."],
      ["/services/review-generation", "Review generation, done for you", "We send the requests after every job and reply to every review."],
    ],
  },
  {
    slug: "missed-call-calculator",
    path: "/tools/missed-call-calculator",
    name: "Missed call calculator",
    title: "Missed Call Calculator: What Unanswered Calls Cost You",
    description:
      "Free calculator for contractors: how much revenue your business loses each month and year to calls nobody answers while you're on a job.",
    h1: "Missed call calculator",
    lede:
      "Every call you can't pick up on a roof, under a sink or in an attic is a homeowner who may call the next company on Google. Put in your own numbers to see what missed calls cost you each month.",
    card: "What the calls you miss on the job cost you in booked work each month and year.",
    method: [
      ["Missed calls per month", "Calls per week times 4.33 weeks, times the share you don't answer. Check your phone log or carrier app for the real number; most owners guess low."],
      ["Lost new jobs", "Missed calls times the share that are new customers (not suppliers, spam or existing jobs) who don't call back, times your close rate on calls you do answer."],
      ["Lost revenue", "Lost jobs times your average job value. It leaves out repeat work and referrals from those customers, so the real cost is higher."],
    ],
    faq: [
      ["What share of homeowners call back after a missed call?", "It varies by trade and by how urgent the job is. Emergency calls (no heat, a leak) almost never wait; they call the next listing. Planned work is more patient. Use your own phone log if you can; the calculator lets you set the share that don't call back."],
      ["What is missed-call text-back?", "When you can't answer, the caller gets a text from your business number within seconds: sorry we missed you, what do you need help with? Most people answer a text, so the lead stays with you instead of going to the next company."],
      ["Is an answering service better than text-back?", "An answering service or AI receptionist covers after-hours and busy days with a live answer. Text-back is cheaper and catches the calls you miss while working. Many businesses use both. Text-back is $49/mo on its own and AI answering is $197/mo on its own; both come in our $597/mo Growth package."],
    ],
    next: [
      ["/services/missed-call-text-back", "Missed-call text-back", "Every missed call gets a text back in seconds, from your business number."],
      ["/tools/marketing-roi-calculator", "Marketing ROI calculator", "How many jobs your marketing has to bring in to pay for itself."],
      ["/pricing", "Pricing", "What the done-for-you plans cost, month to month."],
    ],
  },
  {
    slug: "marketing-roi-calculator",
    path: "/tools/marketing-roi-calculator",
    name: "Marketing ROI calculator",
    title: "Marketing ROI Calculator for Home-Service Businesses",
    description:
      "Free break-even calculator for contractors: how many booked jobs a month your marketing needs to pay for itself, and the return at your own numbers.",
    h1: "Marketing ROI calculator",
    lede:
      "Before you pay any agency, including us, work out how many extra jobs it has to bring in to pay for itself. Put in the monthly cost, your average job and your margin.",
    card: "How many booked jobs a month your marketing needs to pay for itself, at your own numbers.",
    method: [
      ["Profit per job", "Average job value times your gross margin (what's left after materials and labor on that job)."],
      ["Break-even jobs", "Monthly marketing cost divided by profit per job, rounded up. That's how many extra jobs a month it takes to cover the cost."],
      ["Return", "Extra profit from the jobs you expect, minus the cost, divided by the cost. Add repeat work if your customers come back (tune-ups, maintenance plans, the next project)."],
    ],
    faq: [
      ["What is a good marketing ROI for a contractor?", "Anything that pays back more than it costs within a few months is working. Local SEO, Google Business Profile and reviews build over time, so judge them over 3 to 6 months, not the first month. Ads are faster but stop the day you stop paying."],
      ["How much should a home-service business spend on marketing?", "Many owners spend a few percent of revenue; growing businesses spend more. A better test is break-even: if one or two extra jobs a month cover the cost, the decision is easy. That's what this calculator shows."],
      ["How do I know which jobs came from marketing?", "Ask every new customer how they found you, use a tracking number on your Google profile and website, and check the calls and messages report in your Google Business Profile each month. We send a plain monthly report with calls, messages, reviews and rankings."],
    ],
    next: [
      ["/pricing", "What our packages cost", "Five packages: Reviews $97, Starter $297, Growth $597, Complete $797 and Partner $1,797 a month, no contracts. Custom pricing on a call, single services from $49."],
      ["/guides/contractor-seo-cost", "What contractor SEO costs", "Typical prices, what you get at each level and what to avoid."],
      ["/tools/google-review-calculator", "Google review calculator", "How many reviews you need to pass the competitors near you."],
    ],
  },
  {
    slug: "review-request-templates",
    path: "/tools/review-request-templates",
    name: "Review request templates",
    title: "Google Review Request Templates (Text + Email)",
    description:
      "Free copy-and-paste review request texts and emails for home-service businesses, plus replies to good and bad reviews. Google-compliant, no gating.",
    h1: "Review request templates for home-service businesses",
    lede:
      "Copy-and-paste texts and emails that get customers to leave a Google review, plus replies for good and bad reviews. Swap in your details and send. They follow Google's rules: ask every customer, no incentives, no gating.",
    card: "Copy-and-paste texts and emails that get reviews, plus replies to good and bad ones.",
    method: [
      ["Send it within an hour", "The best time to ask is right after the job, while the customer is still happy with the work. A text gets read; an email a week later doesn't."],
      ["Use your direct review link", "Put your Google review link in the message so it's one tap. You can copy it from your Google Business Profile: Ask for reviews, then Copy link."],
      ["Ask every customer", "Send the same request to everyone. Filtering out unhappy customers first (review gating) is against Google's policy, and a few honest 4-star reviews make the 5-stars more believable."],
    ],
    faq: [
      ["What should I say when asking for a Google review?", "Keep it short: use their name, mention the job, say thanks, ask for a quick review and include the direct link. One request and one reminder is enough."],
      ["Can I offer a discount for a review?", "No. Google doesn't allow incentives for reviews, including discounts, gift cards or entries into a drawing. Ask, make it easy, and say thank you."],
      ["Should I reply to every Google review?", "Yes. Reply to good reviews within a day or two with a personal thank-you that mentions the job. Reply to bad reviews calmly, offer to fix it offline, and never argue. Future customers read the replies."],
      ["When should I send a review request?", "Within an hour of finishing the job, by text. Send one reminder two or three days later if they haven't left one. For past customers, a one-time text campaign works well."],
    ],
    next: [
      ["/tools/google-review-calculator", "Google review calculator", "How many reviews you need and how long it takes at your job volume."],
      ["/services/review-generation", "Review generation, done for you", "We send these after every job, automatically, and reply to every review."],
      ["/guides/how-to-rank-higher-on-google-maps", "Rank higher on Google Maps", "Reviews are one piece. The full playbook for the map pack."],
    ],
  },
];

export const tools: Tool[] = [...tools1, ...tools2];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);

/** Pages that link to a matching free tool just above their audit band. Keyed by page path. */
const RELATED: Record<string, ToolSlug[]> = {
  "/services/review-generation": ["google-review-calculator", "review-request-templates"],
  "/services/missed-call-text-back": ["missed-call-calculator", "missed-call-text-templates"],
  "/services/local-seo": ["marketing-roi-calculator"],
  "/services/google-business-profile": ["google-business-description-generator", "google-review-link-generator"],
  "/services/crm-automation": ["missed-call-calculator", "contractor-text-templates"],
  "/services/online-booking": ["contractor-text-templates", "phone-scripts"],
  "/services/estimates-invoices-payments": ["estimate-template", "invoice-template"],
  "/services/maintenance-plans": ["maintenance-plan-calculator", "job-price-calculator"],
  "/services/email-sms-campaigns": ["contractor-text-templates", "review-request-templates"],
  "/services/unified-inbox": ["lead-response-calculator", "missed-call-text-templates"],
  "/services/call-tracking": ["cost-per-lead-calculator", "marketing-roi-calculator"],
  "/services/social-media-posting": ["google-business-description-generator", "review-response-templates"],
  "/guides/gohighlevel-for-contractors": ["lead-response-calculator", "contractor-text-templates"],
  "/guides/gohighlevel-vs-jobber": ["lead-response-calculator"],
  "/guides/gohighlevel-vs-housecall-pro": ["lead-response-calculator"],
  "/guides/crm-vs-field-service-software": ["lead-response-calculator"],
  "/guides/missed-call-text-back-vs-ai-receptionist": ["missed-call-calculator", "missed-call-text-templates"],
  "/guides/online-booking-for-home-services": ["contractor-text-templates"],
  "/guides/text-to-pay-for-contractors": ["invoice-template", "contractor-text-templates"],
  "/guides/contractor-deposits": ["estimate-template", "job-price-calculator"],
  "/guides/how-to-sell-maintenance-plans": ["maintenance-plan-calculator", "hourly-rate-calculator"],
  "/guides/a2p-10dlc-for-contractors": ["contractor-text-templates", "missed-call-text-templates"],
  "/guides/is-review-gating-allowed": ["review-response-templates", "review-request-templates"],
  "/guides/google-business-profile-service-area": ["google-business-description-generator", "google-review-link-generator"],
  "/guides/angi-vs-thumbtack-vs-local-services-ads": ["cost-per-lead-calculator", "lead-response-calculator"],
  "/guides/win-back-past-customers": ["contractor-text-templates"],
  "/guides/home-service-marketing-calendar": ["contractor-text-templates", "phone-scripts"],
  "/guides/contractor-referral-program": ["cost-per-lead-calculator"],
  "/guides/how-to-get-more-hvac-customers": ["maintenance-plan-calculator", "missed-call-text-templates"],
  "/guides/how-to-get-more-roofing-customers": ["estimate-template", "google-review-calculator"],
  "/guides/best-invoicing-software-for-contractors": ["invoice-template", "estimate-template"],
  "/guides/how-to-keep-track-of-customers": ["hourly-rate-calculator"],
  "/guides/google-business-profile-suspended": ["google-business-description-generator"],
  "/guides/local-services-ads-vs-google-ads": ["cost-per-lead-calculator"],
  "/guides/how-to-get-more-google-reviews": ["google-review-calculator", "review-request-templates"],
  "/guides/ask-past-customers-for-google-reviews": ["review-request-templates", "google-review-calculator"],
  "/guides/google-review-qr-code-and-nfc-cards": ["google-review-link-generator", "review-request-templates"],
  "/guides/how-to-follow-up-on-an-estimate": ["estimate-template", "contractor-text-templates"],
  "/guides/ai-receptionist-for-contractors": ["missed-call-calculator", "phone-scripts"],
  "/guides/best-crm-for-plumbers": ["missed-call-calculator"],
  "/guides/how-to-get-more-plumbing-customers": ["google-review-calculator", "missed-call-calculator"],
  "/guides/how-many-google-reviews-to-rank": ["google-review-calculator", "review-request-templates"],
  "/guides/contractor-seo-cost": ["marketing-roi-calculator"],
  "/guides/how-to-rank-higher-on-google-maps": ["google-review-calculator"],
  "/guides/jobber-google-reviews": ["review-request-templates"],
  "/guides/housecall-pro-google-reviews": ["review-request-templates"],
  "/guides/servicetitan-review-requests": ["review-request-templates"],
  "/guides/workiz-google-reviews": ["review-request-templates"],
  "/guides/electrician-review-management": ["review-request-templates", "google-review-calculator"],
  "/guides/how-to-get-recommended-by-chatgpt": ["review-request-templates"],
};

export const toolsForPage = (path: string): Tool[] => (RELATED[path] ?? []).map((s) => getTool(s)).filter((t): t is Tool => Boolean(t));
