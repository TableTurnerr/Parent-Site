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
