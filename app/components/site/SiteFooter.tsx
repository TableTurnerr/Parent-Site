// Footer: a CTA row, then columns grouped the way prospects think (outcomes, trades, resources, company) and a
// contact column, so everything an owner looks for is one click away. Shares its data with the header menus.
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import EmailLink from "@/app/components/site/EmailLink";
import { Logo } from "@/app/components/ui/Logo";
import ConsentManager from "@/app/components/analytics/ConsentManager";
import { SOCIAL_LINKS } from "@/app/lib/constants";
import {
  AUDIT_HREF, BOOKING_URL, COMPANY_LINKS, PHONE_DISPLAY, PHONE_E164, RESOURCE_LINKS, SERVICE_GROUPS, SIGN_IN_URL, TRADE_LINKS, type NavItem,
} from "@/app/lib/site-nav";

const COLS: { title: string; links: NavItem[] }[] = [
  ...SERVICE_GROUPS.map((g) => ({ title: g.title, links: g.items })),
  { title: "Who we help", links: [...TRADE_LINKS.slice(0, 8), { label: "Restaurants & cafés", href: "/restaurants" }, { label: "All trades", href: "/marketing" }] },
  { title: "Resources", links: RESOURCE_LINKS },
  { title: "Company", links: [...COMPANY_LINKS, { label: "SEO & AEO services", href: "/seo" }, { label: "All services", href: "/services" }] },
];

function FooterLink({ l }: { l: NavItem }) {
  const cls = "text-sm text-ink-soft transition-colors hover:text-ink";
  return l.href.startsWith("http")
    ? <a href={l.href} target="_blank" rel="noopener" className={cls}>{l.label}</a>
    : <Link href={l.href} className={cls}>{l.label}</Link>;
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface" itemScope itemType="https://schema.org/WPFooter">
      <div className="container-tt pt-14 pb-6 md:pt-16 md:pb-8">
        {/* CTA row */}
        <div className="flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-ink">
              <Logo aria-hidden="true" className="h-8 w-auto text-ink" />
              TableTurnerr
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              Done-for-you marketing and CRM for home-service businesses. 50+ businesses served. Month to month, and you talk to an owner.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={AUDIT_HREF} className="btn btn-primary">Get a free Google Maps audit</Link>
            <a href={`tel:${PHONE_E164}`} className="btn btn-ghost"><Phone className="h-4 w-4" aria-hidden /> Call {PHONE_DISPLAY}</a>
          </div>
        </div>

        {/* Link columns + contact */}
        <div className="grid gap-10 pt-10 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-4">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => <li key={l.href}><FooterLink l={l} /></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Talk to us</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href={`tel:${PHONE_E164}`} className="inline-flex items-center gap-2 font-semibold text-ink hover:text-primary"><Phone className="h-4 w-4" aria-hidden /> {PHONE_DISPLAY}</a></li>
              <li className="flex items-center gap-2 text-ink-soft"><Mail className="h-4 w-4" aria-hidden /> <EmailLink className="hover:text-ink" /></li>
              <li><a href={BOOKING_URL} className="font-semibold text-primary hover:underline">Book a 15-minute call</a></li>
            </ul>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {SOCIAL_LINKS.map((l) => (
                <li key={l.platform}>
                  <a href={l.href} aria-label={l.label} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink">{l.platform}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>© 2026 TableTurnerr LLC. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/terms" className="hover:text-ink">Terms</Link>
            <a href={SIGN_IN_URL} className="hover:text-ink">Client sign in</a>
            <ConsentManager trigger />
          </div>
        </div>
      </div>
    </footer>
  );
}
