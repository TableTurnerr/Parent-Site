import Link from "next/link";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Free review grader", href: "/grader" },
    ],
  },
  {
    title: "Trades",
    links: [
      { label: "HVAC", href: "/trades/hvac" },
      { label: "Roofing", href: "/trades/roofing" },
      { label: "Plumbing", href: "/trades/plumbing" },
      { label: "Electrical", href: "/trades/electrical" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-tt py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm text-white">T</span>
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
          <p>© {new Date().getFullYear()} TableTurnerr. All rights reserved.</p>
          <p>Review automation for HVAC, roofing, plumbing &amp; electrical pros.</p>
        </div>
      </div>
    </footer>
  );
}
