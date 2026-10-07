import Link from "next/link";
import { Logo } from "@/app/components/ui/Logo";
import ConsentManager from "@/app/components/analytics/ConsentManager";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "How it works", href: "/#how" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/integrations" },
      { label: "Compare", href: "/alternatives" },
      { label: "Texas locations", href: "/locations" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "HVAC", href: "/industries/hvac" },
      { label: "Roofing", href: "/industries/roofing" },
      { label: "Plumbing", href: "/industries/plumbing" },
      { label: "Electrical", href: "/industries/electrical" },
      { label: "All industries", href: "/industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
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
              Review automation built for home-services pros. Turn finished jobs
              into 5-star reviews and more booked work, automatically.
            </p>
            <Link href="/signup" className="btn btn-primary mt-6 text-sm">
              Start free trial
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
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
          <div className="flex items-center gap-4"><p>Review automation for home-service industries.</p><ConsentManager trigger /></div>
        </div>
      </div>
    </footer>
  );
}
