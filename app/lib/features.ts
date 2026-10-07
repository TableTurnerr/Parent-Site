import {
  Bot,
  CalendarClock,
  CircleHelp,
  ClipboardList,
  Globe2,
  LayoutPanelTop,
  MapPin,
  ReceiptText,
  Repeat2,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProductFeature {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  description: string;
  detail: string;
  benefits: string[];
  icon: LucideIcon;
  fieldTask?: boolean;
}

export const FEATURES: Record<string, ProductFeature> = {
  "review-reactivation": {
    slug: "review-reactivation",
    title: "Review Reactivation",
    seoTitle: "Review Reactivation Software for Home Services",
    metaDescription:
      "Reconnect with past customers through a measured review reactivation campaign for your home-service business.",
    description:
      "Turn your past-customer list into a fresh wave of review requests.",
    detail:
      "Bring your existing customer history back to work with a polite, measured campaign that feels personal and keeps your team out of the follow-up loop.",
    benefits: [
      "Import past customers",
      "Send by text and email",
      "Control campaign pacing",
      "Watch new reviews arrive",
    ],
    icon: Repeat2,
  },
  "why-reviews-matter": {
    slug: "why-reviews-matter",
    title: "Why reviews matter",
    seoTitle: "Why Reviews Matter for Home-Service Businesses",
    metaDescription:
      "Learn why recent customer reviews help home-service businesses build confidence before a homeowner decides who to call.",
    description:
      "They are the proof homeowners see before deciding who to call.",
    detail:
      "A current, visible record of real customer feedback helps the next homeowner feel more confident choosing you. It turns great work from something one customer experienced into proof the next customer can see.",
    benefits: [
      "Make great work visible",
      "Build confidence before the call",
      "Show customers what to expect",
      "Keep your local presence current",
    ],
    icon: CircleHelp,
  },
  "multi-platform-reviews": {
    slug: "multi-platform-reviews",
    title: "Reviews across every platform",
    seoTitle: "Multi-Platform Review Management for Home Services",
    metaDescription:
      "Manage review requests across Google, Facebook, Yelp and Angi from one home-service review automation workflow.",
    description:
      "Route customers to the places homeowners actually check before they call.",
    detail:
      "One completed job can power your whole reputation—not just a single review profile. Keep every important local platform in the mix.",
    benefits: [
      "Google, Facebook, Yelp and Angi",
      "One simple review flow",
      "Automatic platform routing",
      "Consistent local presence",
    ],
    icon: Globe2,
  },
  "map-pack-rank-tracking": {
    slug: "map-pack-rank-tracking",
    title: "Map-pack rank tracking",
    seoTitle: "Map Pack Rank Tracking for Home-Service Businesses",
    metaDescription:
      "Track how your home-service business appears in local map results and follow weekly visibility movement alongside review activity.",
    description:
      "See local visibility move week over week, not just review totals.",
    detail:
      "Connect your review activity to what matters on the ground: where your company appears when nearby homeowners are ready to book.",
    benefits: [
      "Track local position",
      "See weekly movement",
      "Monitor visibility",
      "Connect reviews to calls",
    ],
    icon: MapPin,
  },
  "ai-review-requests-and-replies": {
    slug: "ai-review-requests-and-replies",
    title: "AI requests & replies",
    seoTitle: "AI Review Requests and Replies for Home Services",
    metaDescription:
      "Create personalized review requests and draft thoughtful customer review replies with AI assistance for your home-service business.",
    description:
      "Personal messages out. Thoughtful owner replies handled.",
    detail:
      "Create a review experience that sounds like your business—without asking office staff to write every request or response from scratch.",
    benefits: [
      "Personalized requests",
      "Text and email delivery",
      "AI-assisted replies",
      "Keep the owner voice",
    ],
    icon: Bot,
  },
  "review-widgets-and-social-posts": {
    slug: "review-widgets-and-social-posts",
    title: "Widgets & automatic social posts",
    seoTitle: "Review Widgets and Social Posts for Home Services",
    metaDescription:
      "Put recent customer feedback to work with website review widgets and branded, social-ready review posts for your home-service business.",
    description:
      "Put your newest proof to work everywhere customers find you.",
    detail:
      "A new 5-star review can become fresh trust on your website and a ready-to-share social post without a manual design task.",
    benefits: [
      "Website review widgets",
      "Branded social-ready posts",
      "Fresh social proof",
      "Automatic publishing workflow",
    ],
    icon: LayoutPanelTop,
  },
  "crm-contact-import-and-lead-management": {
    slug: "crm-contact-import-and-lead-management",
    title: "CRM setup & contact import",
    seoTitle: "CRM Setup, Contact Import and Lead Management for Home Services",
    metaDescription:
      "No CRM yet? TableTurnerr can import your contacts into a CRM setup that keeps leads, conversations and follow-up in one place, with mobile access for your team.",
    description:
      "No CRM? We can import your contacts and give every lead a clear place to go.",
    detail:
      "If you do not already have a CRM or a reliable way to keep up with leads, TableTurnerr can import your contacts into a CRM setup for you. Keep leads, conversations, and follow-up together, then use the mobile app to stay connected while you are on the go.",
    benefits: [
      "We import your existing contacts",
      "Keep leads and conversations in one place",
      "Automate text and email follow-up",
      "Use the mobile app while you are on the go",
    ],
    icon: Users,
  },
  "dispatch-scheduling-and-routes": {
    slug: "dispatch-scheduling-and-routes",
    title: "Dispatch, scheduling & routes",
    seoTitle: "Home-Service Dispatch, Scheduling and Route Planning",
    metaDescription:
      "Coordinate jobs, schedules and routes with FieldTask for HighLevel, so your office and field team can stay aligned.",
    description:
      "Coordinate the day from one place with FieldTask, from the next booking to the best route.",
    detail:
      "Give office staff a clear view of the day, assign the right technician, and help the crew spend less time driving between jobs. FieldTask keeps dispatching, scheduling, and route planning connected inside HighLevel.",
    benefits: [
      "Dispatch jobs to the crew",
      "Schedule from one board",
      "Plan efficient routes",
      "Keep office and field aligned",
    ],
    icon: CalendarClock,
    fieldTask: true,
  },
  "work-orders-and-job-photos": {
    slug: "work-orders-and-job-photos",
    title: "Work orders & job photos",
    seoTitle: "Mobile Work Orders and Job Photos for Home Services",
    metaDescription:
      "Give field technicians connected work orders, customer history, job photos and signatures with FieldTask for HighLevel.",
    description:
      "Put the job details in the technician’s hand and keep proof of work attached to the job.",
    detail:
      "With FieldTask, technicians can arrive with the customer history, work order, route, and checklist they need, then capture job photos and signatures while the details are still fresh.",
    benefits: [
      "Mobile work orders",
      "Customer and job history",
      "Job photos and signatures",
      "Clear proof of work",
    ],
    icon: ClipboardList,
    fieldTask: true,
  },
  "time-tracking-and-invoicing": {
    slug: "time-tracking-and-invoicing",
    title: "Time tracking & invoicing",
    seoTitle: "Time Tracking and Invoicing for Home Services",
    metaDescription:
      "Track field time and create invoices from completed jobs with FieldTask for HighLevel.",
    description:
      "Track time in the field, send invoices from completed jobs, and keep the paperwork moving.",
    detail:
      "FieldTask helps teams record time, create an invoice when the work is done, and sync the job details back to HighLevel—without rebuilding the same information in another system.",
    benefits: [
      "Mobile time tracking",
      "Create invoices from jobs",
      "Keep job details connected",
      "Move from work to payment faster",
    ],
    icon: ReceiptText,
    fieldTask: true,
  },
};

export const FEATURE_SLUGS = Object.keys(FEATURES);

export function getFeature(slug: string): ProductFeature | undefined {
  return FEATURES[slug];
}
