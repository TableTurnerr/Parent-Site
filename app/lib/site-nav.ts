// Site architecture shared by the header menus and the footer. Organised the way prospects think (what they want
// to happen: get found, get chosen, stop losing leads; and "do you work with my trade?"), not the way we build it.
// Plain data with hard-coded paths so the client-side nav doesn't pull the growth content into the browser bundle.

export interface NavItem {
  label: string;
  href: string;
  desc?: string;
}
export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const PHONE_E164 = "+13323331008";
export const PHONE_DISPLAY = "(332) 333-1008";
export const AUDIT_HREF = "/free-google-maps-audit";
export const BOOKING_URL = "https://portalapi.tableturnerr.com/widget/bookings/tableturnerr";
export const SIGN_IN_URL = "https://portal.tableturnerr.com/";

/** Services, grouped by the outcome the owner wants. */
export const SERVICE_GROUPS: NavGroup[] = [
  {
    title: "Get found",
    items: [
      { label: "Local SEO", href: "/services/local-seo", desc: "Rank on Google Maps and search in every town you serve" },
      { label: "AI search (AEO)", href: "/services/ai-search-optimization", desc: "Get recommended by ChatGPT, Gemini and Google AI" },
      { label: "Google Business Profile", href: "/services/google-business-profile", desc: "A profile that's complete, active and gets calls" },
    ],
  },
  {
    title: "Get chosen",
    items: [
      { label: "Google review generation", href: "/services/review-generation", desc: "Every customer asked, after every job" },
      { label: "Contractor websites", href: "/services/contractor-websites", desc: "A fast site that turns visitors into calls" },
      { label: "Social media posting", href: "/services/social-media-posting", desc: "Job photos and reviews posted every week" },
    ],
  },
  {
    title: "Never miss a job",
    items: [
      { label: "Missed-call text-back & AI receptionist", href: "/services/missed-call-text-back", desc: "Every missed call gets a text in seconds" },
      { label: "CRM & follow-up", href: "/services/crm-automation", desc: "Estimates and leads followed up automatically" },
      { label: "One inbox & website chat", href: "/services/unified-inbox", desc: "Calls, texts, chat and social messages in one place" },
      { label: "Call tracking", href: "/services/call-tracking", desc: "See which marketing makes the phone ring" },
    ],
  },
  {
    title: "Book & get paid",
    items: [
      { label: "Online booking", href: "/services/online-booking", desc: "Customers pick from your real openings" },
      { label: "Estimates, invoices & text-to-pay", href: "/services/estimates-invoices-payments", desc: "Signed on a phone, paid from a text" },
      { label: "Maintenance plans", href: "/services/maintenance-plans", desc: "Memberships that bill themselves" },
      { label: "Email & text campaigns", href: "/services/email-sms-campaigns", desc: "Bring past customers back each season" },
      { label: "Hiring pages", href: "/services/hiring-pages", desc: "Short application, fast replies" },
      { label: "Everything we set up", href: "/services/everything-we-set-up", desc: "The full list, in plain words" },
    ],
  },
];

/** Trades with their own marketing plan page. */
export const TRADE_LINKS: NavItem[] = [
  { label: "HVAC", href: "/marketing/hvac" },
  { label: "Plumbing", href: "/marketing/plumbing" },
  { label: "Roofing", href: "/marketing/roofing" },
  { label: "Electricians", href: "/marketing/electricians" },
  { label: "Handyman", href: "/marketing/handyman" },
  { label: "Remodelers", href: "/marketing/remodeling" },
  { label: "Landscaping", href: "/marketing/landscaping" },
  { label: "Tree service", href: "/marketing/tree-service" },
  { label: "Fence companies", href: "/marketing/fence-companies" },
  { label: "Garage door repair", href: "/marketing/garage-door-repair" },
  { label: "Pest control", href: "/marketing/pest-control" },
  { label: "Painting", href: "/marketing/painting" },
  { label: "Cleaning services", href: "/marketing/cleaning-services" },
  { label: "Pressure washing", href: "/marketing/pressure-washing" },
  { label: "Concrete contractors", href: "/marketing/concrete-contractors" },
  { label: "Deck builders", href: "/marketing/deck-builders" },
];

export const RESOURCE_LINKS: NavItem[] = [
  { label: "Guides", href: "/guides", desc: "Reviews, CRM, Google Maps and follow-up, explained" },
  { label: "Free tools", href: "/tools", desc: "Calculators, templates and a review QR maker" },
  { label: "Glossary", href: "/glossary", desc: "Marketing and software words in plain English" },
  { label: "Client results", href: "/results", desc: "Real numbers from real clients" },
  { label: "Podcast", href: "https://www.youtube.com/@TableTurnerr", desc: "Owners on how they grew, on YouTube" },
  { label: "Blog", href: "/blog", desc: "News and quick tips" },
  { label: "Compare", href: "/alternatives", desc: "How we stack up against other tools" },
];

export const COMPANY_LINKS: NavItem[] = [
  { label: "About us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Integrations", href: "/integrations" },
  { label: "Review & growth software", href: "/features" },
  { label: "Review software by industry", href: "/industries" },
  { label: "Texas locations", href: "/locations" },
];
