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

// The home-service industries we serve. Drives footer/blog cross-links to the
// industry landing pages at /industries/<slug>.
export const INDUSTRIES = [
  { label: "HVAC", slug: "hvac" },
  { label: "Roofing", slug: "roofing" },
  { label: "Plumbing", slug: "plumbing" },
  { label: "Electrical", slug: "electrical" },
  { label: "Handyman", slug: "handyman" },
  { label: "Garage Door Repair", slug: "garage-door-repair" },
  { label: "Pest Control", slug: "pest-control" },
  { label: "Lawn Care", slug: "lawn-care" },
  { label: "Landscaping", slug: "landscaping" },
  { label: "Cleaning", slug: "cleaning" },
  { label: "Painting", slug: "painting" },
  { label: "Window Cleaning", slug: "window-cleaning" },
  { label: "Pressure Washing", slug: "pressure-washing" },
  { label: "Pool Service", slug: "pool-service" },
  { label: "Appliance Repair", slug: "appliance-repair" },
  { label: "Junk Removal", slug: "junk-removal" },
  { label: "Property Maintenance", slug: "property-maintenance" },
] as const;

// Existing shared layout code still imports this name. It is an internal alias
// only; user-facing navigation and URLs use "Industries".
export const TRADES = INDUSTRIES;

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
