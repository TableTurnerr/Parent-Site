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
    description: "Custom, SEO-optimized websites built to convert hungry visitors into paying diners.",
  },
  {
    title: "Restaurant SEO",
    slug: "restaurant-seo",
    description: "Rank higher on Google and get found by diners searching for restaurants like yours.",
  },
  {
    title: "Restaurant Branding",
    slug: "restaurant-branding",
    description: "Complete brand identity — logo, menu design, and visual language that tells your story.",
  },
  {
    title: "Google Ads",
    slug: "google-ads",
    description: "Targeted ad campaigns that put your restaurant in front of ready-to-order customers.",
  },
  {
    title: "Google Business Profile Optimization",
    slug: "google-business-profile-optimization",
    description: "Optimize your Google Business listing to dominate local search and Maps results.",
  },
] as const;

export const CLIENTS = [
  { name: "Grill Shack" },
  { name: "Miss Mat Cafe" },
  { name: "Texbbq" },
  { name: "Qadeer Coffee" },
] as const;

export const HERO_IMAGE = {
  src: "/images/hero/hero-bg.png",
  alt: "Chef cooking with flames in a professional restaurant kitchen",
};

export const SOCIAL_LINKS = [
  { platform: "Instagram", href: "https://instagram.com/tableturnerr", label: "Follow us on Instagram" },
  { platform: "Facebook", href: "https://facebook.com/tableturnerr", label: "Follow us on Facebook" },
  { platform: "LinkedIn", href: "https://linkedin.com/company/tableturnerr", label: "Connect on LinkedIn" },
] as const;

export const SITE_CONFIG = {
  name: "TableTurnerr",
  url: "https://tableturnerr.com",
  tagline: "Restaurant Website Design, SEO & Marketing Agency",
  email: "hello@tableturnerr.com",
  phone: "+1 (555) 000-0000",
} as const;

export const FAQ_DATA = [
  {
    question: "How long does it take to build a restaurant website?",
    answer:
      "Most restaurant websites are completed within 3-4 weeks from kickoff. This includes design, development, content creation, and SEO optimization. Rush projects can be delivered in as little as 2 weeks.",
  },
  {
    question: "Do you work with restaurants outside of the US?",
    answer:
      "Yes! While many of our clients are US-based, we work with restaurants globally. Our SEO and marketing strategies are adapted for your local market and search landscape.",
  },
  {
    question: "What makes your approach different from other agencies?",
    answer:
      "We specialize exclusively in the restaurant industry. This means every strategy, design decision, and campaign is informed by years of F&B experience \u2014 not generic templates repurposed for food businesses.",
  },
  {
    question: "How much does a restaurant website cost?",
    answer:
      "Our website packages start at $2,500 for a standard restaurant site. Custom designs with advanced features like online ordering integration, reservation systems, and multi-location support are quoted based on scope.",
  },
  {
    question: "Do you offer ongoing SEO and marketing services?",
    answer:
      "Absolutely. Most of our clients work with us on a monthly retainer basis for SEO, Google Ads management, and ongoing website maintenance. We also offer one-time optimization packages.",
  },
  {
    question: "Can you help with our existing website or do we need a new one?",
    answer:
      "Both! We can optimize and redesign your existing website, or build a completely new one from scratch. We\u2019ll assess your current site and recommend the best path forward during our free consultation.",
  },
] as const;
