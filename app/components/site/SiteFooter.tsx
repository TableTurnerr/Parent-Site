import Link from "next/link";
import { Logo } from "@/app/components/ui/Logo";
import ConsentManager from "@/app/components/analytics/ConsentManager";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/app/lib/constants";

const COLS = [
  {
    title: "Done for you",
    links: [
      { label: "Free Google Maps audit", href: "/free-google-maps-audit" },
      { label: "Google Business Profile", href: "/services/google-business-profile" },
      { label: "Review generation", href: "/services/review-generation" },
      { label: "Local SEO", href: "/services/local-seo" },
      { label: "Contractor websites", href: "/services/contractor-websites" },
      { label: "Missed-call text-back", href: "/services/missed-call-text-back" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Who we help",
    links: [
      { label: "HVAC", href: "/marketing/hvac" },
      { label: "Plumbing", href: "/marketing/plumbing" },
      { label: "Roofing", href: "/marketing/roofing" },
      { label: "Electricians", href: "/marketing/electricians" },
      { label: "Handyman", href: "/marketing/handyman" },
      { label: "All trades", href: "/marketing" },
      { label: "Results", href: "/results" },
    ],
  },
  {
    title: "Software",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/integrations" },
      { label: "Compare", href: "/alternatives" },
      { label: "Review software by industry", href: "/industries" },
      { label: "Texas locations", href: "/locations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Guides", href: "/guides" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "SEO services", href: "/seo" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-tt pt-18 pb-6 md:pt-20 md:pb-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-ink">
              <Logo aria-hidden="true" className="h-8 w-auto text-ink" />
              TableTurnerr
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              A done-for-you online marketing agency for home-service businesses,
              with our own software behind it: Google Business Profile, local SEO,
              websites, review generation, missed-call text-back and AI-search
              visibility. Month to month.
            </p>
            <Link href="/free-google-maps-audit" className="btn btn-primary mt-6 text-sm">
              Get a free Google Maps audit
            </Link>
            <p className="mt-5 text-sm text-ink-soft">
              <a href={`tel:${SITE_CONFIG.phone.replace(/[^+d]/g, "")}`} className="font-semibold text-ink hover:text-primary">{SITE_CONFIG.phone}</a>
              {" · "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-ink">{SITE_CONFIG.email}</a>
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {SOCIAL_LINKS.map((l) => (
                <li key={l.platform}>
                  <a href={l.href} aria-label={l.label} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink">{l.platform}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-ink-soft transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>© 2026 TableTurnerr LLC. All rights reserved.</p>
          <div className="flex items-center gap-4"><p>Online marketing for home-service businesses.</p><ConsentManager trigger /></div>
        </div>
      </div>
    </footer>
  );
}
