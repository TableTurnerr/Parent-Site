export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    title: "Restaurant Website Design",
    slug: "restaurant-website-design",
    description: "Custom restaurant websites built to rank on Google and convert visitors into paying diners. Mobile-first, SEO-optimized, and ready for online ordering.",
  },
  {
    title: "Restaurant SEO",
    slug: "restaurant-seo",
    description: "Local SEO strategies that get your restaurant found on Google Search and Google Maps. Outrank the competition and drive organic traffic.",
  },
  {
    title: "Restaurant Branding",
    slug: "restaurant-branding",
    description: "Full-service restaurant branding — logo design, menu design, and a visual identity that sets your restaurant apart from the chains.",
  },
  {
    title: "Google Ads for Restaurants",
    slug: "google-ads",
    description: "Targeted Google Ads campaigns that drive local diners to your restaurant. Low-cost clicks, high-intent customers, measurable ROI.",
  },
  {
    title: "Google Business Profile Optimization",
    slug: "google-business-profile-optimization",
    description: "Google Business Profile setup and optimization so your restaurant dominates local search results, Google Maps, and nearby searches.",
  },
] as const;

export const CLIENTS = [
  { name: "Grill Shack" },
  { name: "Miss Mat Cafe" },
  { name: "Texbbq" },
  { name: "Qadeer Coffee" },
] as const;

export const HERO_IMAGE = {
  src: "/images/hero/hero-bg.webp",
  alt: "Chef cooking with flames in a professional restaurant kitchen",
};

export const SOCIAL_LINKS = [
  { platform: "Instagram", href: "https://www.instagram.com/tableturnerr/", label: "Follow us on Instagram" },
  { platform: "LinkedIn", href: "https://www.linkedin.com/company/tableturnerr", label: "Connect on LinkedIn" },
] as const;

export const SITE_CONFIG = {
  name: "TableTurnerr",
  url: "https://tableturnerr.com",
  tagline: "Restaurant Website Design, SEO & Marketing Agency",
  email: "contact@tableturnerr.com",
  phone: "+1 808 559006",
} as const;

export const FAQ_DATA = [
  {
    question: "How long does it take to design and build a restaurant website?",
    answer:
      "Most custom restaurant websites are completed within 3\u20134 weeks from kickoff. This includes design, development, content creation, and full SEO optimization. Rush projects can be delivered in as little as 2 weeks depending on scope.",
  },
  {
    question: "How much does a restaurant website cost?",
    answer:
      "Our restaurant website packages start at $2,500 for a standard site with mobile-responsive design and on-page SEO. Custom websites with advanced features like online ordering integration, reservation systems, and multi-location support are quoted based on your specific needs.",
  },
  {
    question: "What does your restaurant SEO service include?",
    answer:
      "Our restaurant SEO service covers local SEO strategy, Google Business Profile optimization, on-page SEO for your website, keyword targeting for your menu and location, Google Maps optimization, and ongoing performance tracking. We focus on getting your restaurant found by nearby diners searching on Google.",
  },
  {
    question: "Can you help our restaurant reduce DoorDash and UberEats fees?",
    answer:
      "Yes. We help restaurants transition away from high-commission third-party platforms by setting up commission-free direct ordering through partners like Owner.com and ChowNow. Most restaurants save thousands per year in delivery app fees while keeping more profit from every order.",
  },
  {
    question: "What makes TableTurnerr different from other restaurant marketing agencies?",
    answer:
      "We specialize exclusively in the restaurant industry. Every website we design, every SEO campaign we run, and every Google Ads strategy we build is informed by deep food and beverage experience \u2014 not generic digital marketing repurposed for restaurants.",
  },
  {
    question: "Do you offer ongoing SEO and Google Ads management for restaurants?",
    answer:
      "Yes. Most of our restaurant clients work with us on a monthly retainer for local SEO, Google Ads management, Google Business Profile optimization, and ongoing website maintenance. We also offer one-time optimization packages for restaurants that need a specific boost.",
  },
] as const;
