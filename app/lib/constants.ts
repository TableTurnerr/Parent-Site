// Primary nav/footer links. Only routes that actually exist on the
// review-automation site (no /services or /case-studies — those were
// agency-era pages that no longer exist).
export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Integrations", href: "/integrations" },
  { label: "Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

// The home-service trades we serve. Drives footer/blog cross-links to the
// per-trade landing pages at /trades/<slug>.
export const TRADES = [
  { label: "HVAC", slug: "hvac" },
  { label: "Roofing", slug: "roofing" },
  { label: "Plumbing", slug: "plumbing" },
  { label: "Electrical", slug: "electrical" },
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
