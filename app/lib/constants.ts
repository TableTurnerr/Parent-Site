export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

// The two niches we serve. Surfaced as an "Industries" dropdown in the navbar
// (and flat links in the mobile menu) so the two-stream homepage isn't the only
// way to reach the niche landing pages.
export const INDUSTRY_LINKS = [
  {
    label: "Med Spas",
    href: "/medspa",
    blurb: "SEO, sites & booking for aesthetic clinics",
  },
  {
    label: "Restaurants",
    href: "/restaurants",
    blurb: "Get found, fill tables, own your orders",
  },
] as const;

export const SERVICES = [
  {
    title: "Website Design",
    slug: "restaurant-website-design",
    description: "We don't build every site from scratch. We've perfected one proven, SEO-strong website template and tailor it to your brand, so you get a Google-ready, mobile-first, high-converting site faster and for less than a custom build.",
  },
  {
    title: "Local SEO",
    slug: "restaurant-seo",
    description: "Local SEO strategies that get your restaurant found on Google Search and Google Maps. Outrank the competition and drive organic traffic.",
  },
  {
    title: "Branding & Design",
    slug: "restaurant-branding",
    description: "Full-service restaurant branding: logo design, menu design, and a visual identity that sets your restaurant apart from the chains.",
  },
  {
    title: "Google Ads Management",
    slug: "google-ads",
    description: "Targeted Google Ads campaigns that drive local diners to your restaurant. Low-cost clicks, high-intent customers, measurable ROI.",
  },
  {
    title: "Google Business Profile Optimization",
    slug: "google-business-profile-optimization",
    description: "Google Business Profile setup and optimization so your restaurant dominates local search results, Google Maps, and nearby searches.",
  },
  {
    title: "Commission-Free Ordering",
    slug: "commission-free-deliveries",
    description: "Stop losing 15-30% of every order to delivery apps. We set up commission-free direct ordering and flat-fee delivery so your restaurant keeps more profit.",
  },
] as const;

// GoHighLevel-powered automation services. These have their own detail pages
// but NO per-city programmatic variants, so they live separately from SERVICES
// (which drives the service x city matrix in the sitemap and city routes).
export const PLATFORM_SERVICES = [
  {
    title: "AI Receptionist",
    slug: "ai-receptionist",
    description:
      "Answer every call and message 24/7, qualify the lead, and book them in automatically, so you never miss business again.",
  },
  {
    title: "CRM",
    slug: "crm",
    description:
      "Every lead, conversation, and follow-up in one place, with automated nurture so nothing slips through the cracks.",
  },
  {
    title: "Appointment Scheduling",
    slug: "appointment-scheduling",
    description:
      "Online booking with automated reminders that cut no-shows and keep your calendar full.",
  },
] as const;

export const CLIENTS = [
  { name: "Grill Shack" },
  { name: "Miss Mat Cafe" },
  { name: "Texbbq" },
  { name: "Qadeer Coffee" },
] as const;

export const SOCIAL_LINKS = [
  { platform: "Instagram", href: "https://www.instagram.com/tableturnerr/", label: "Follow us on Instagram" },
  { platform: "LinkedIn", href: "https://www.linkedin.com/company/tableturnerr", label: "Connect on LinkedIn" },
] as const;

export const SITE_CONFIG = {
  name: "TableTurnerr",
  url: "https://www.tableturnerr.com",
  tagline: "Review automation for home services — turn finished jobs into 5-star reviews.",
  email: "contact@tableturnerr.com",
  phone: "+1 (808) 559-9006",
} as const;

export const FAQ_DATA = [
  {
    question: "How long does it take to design and build a website?",
    answer:
      "Most websites are ready within 2 to 4 weeks from kickoff, because we tailor a proven template rather than building from scratch. This includes design, content creation, and full SEO optimization. Timelines vary with scope and complexity.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Because we start from a proven, conversion-tested template instead of building from scratch, you get agency-quality results faster and for less. Prices still vary by your size, number of pages, and branding, so we give a clear quote after an initial consultation.",
  },
  {
    question: "What does your local SEO service include?",
    answer:
      "Our local SEO service covers local SEO strategy, Google Business Profile optimization, on-page SEO for your website, keyword targeting for your services and location, Google Maps optimization, and ongoing performance tracking. We focus on getting your business found by nearby customers searching on Google.",
  },
  {
    question: "What types of businesses do you work with?",
    answer:
      "We work with local businesses that rely on getting found online: home services, clinics and practices, professional services, hospitality, and more. We have deep experience in the restaurant industry, and we bring that proven local-marketing playbook to every business we help.",
  },
  {
    question: "What makes TableTurnerr different from other marketing agencies?",
    answer:
      "We help local businesses get found and grow, and we build on a proven, conversion-tested website framework that we tailor to each client instead of starting from a blank page. That means faster launches, lower cost, and a site built to rank and convert from day one. We cut our teeth in the restaurant industry, so we know how to win in crowded local markets.",
  },
  {
    question: "Do you offer ongoing SEO and Google Ads management?",
    answer:
      "Yes. Most of our clients work with us on a monthly retainer for local SEO, Google Ads management, Google Business Profile optimization, and ongoing website maintenance. We also offer one-time optimization packages for businesses that need a specific boost.",
  },
] as const;
