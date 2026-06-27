import Link from "next/link";
import Container from "@/app/components/ui/Container";
import { Logo } from "@/app/components/ui/Logo";
import { InteractiveHoverButton } from "@/app/components/ui/InteractiveHoverButton";
import {
  NAV_LINKS,
  SOCIAL_LINKS,
  TRADES,
  SITE_CONFIG,
} from "@/app/lib/constants";

// Product surfaces worth cross-linking from the footer.
const PRODUCT_LINKS = [
  { label: "Integrations", href: "/integrations" },
  { label: "Local SEO", href: "/seo" },
  { label: "Pricing", href: "/#pricing" },
] as const;

function FlipLink({
  href,
  children,
  baseColor = "text-neutral-400",
  hoverColor = "text-white",
  ...props
}: {
  href: string;
  children: React.ReactNode;
  baseColor?: string;
  hoverColor?: string;
  [key: string]: unknown;
}) {
  return (
    <Link href={href} className="flip-text text-sm" {...props}>
      <span className="flip-text__inner">
        <span className={baseColor}>{children}</span>
        <span className={hoverColor}>
          {children}
          <span className="ml-1 inline-block text-xs">&#x2197;</span>
        </span>
      </span>
    </Link>
  );
}

export default function Footer({
  hideWatermark = false,
}: { hideWatermark?: boolean } = {}) {
  const pageLinks = [
    { label: "Home", href: "/" },
    ...NAV_LINKS,
  ];
  return (
    <footer className="bg-black pt-16 md:pt-20 pb-8">
      <Container>
        {/* ─── Main Footer Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Logo className="w-auto h-8 text-white" />
            </Link>
            <p className="mt-3 text-neutral-400 text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.tagline}
            </p>
            <div className="mt-5 flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <FlipLink
                  key={social.platform}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.platform}
                </FlipLink>
              ))}
            </div>
          </div>

          {/* Column 2 — Pages */}
          <div>
            <h3 className="text-white text-sm font-medium uppercase tracking-wider mb-4">
              Pages
            </h3>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <FlipLink href={link.href}>{link.label}</FlipLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Trades */}
          <div>
            <h3 className="text-white text-sm font-medium uppercase tracking-wider mb-4">
              Trades
            </h3>
            <ul className="space-y-3">
              {TRADES.map((trade) => (
                <li key={trade.slug}>
                  <FlipLink href={`/trades/${trade.slug}`}>
                    {trade.label}
                  </FlipLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Product */}
          <div>
            <h3 className="text-white text-sm font-medium uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <FlipLink href={item.href}>{item.label}</FlipLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Contact */}
          <div>
            <h3 className="text-white text-sm font-medium uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <FlipLink href={`mailto:${SITE_CONFIG.email}`}>
                  {SITE_CONFIG.email}
                </FlipLink>
              </li>
              <li>
                <FlipLink href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}>
                  {SITE_CONFIG.phone}
                </FlipLink>
              </li>
              <li>
                <Link href="/contact">
                  <InteractiveHoverButton
                    text="Talk to Us"
                    dark
                    className="border-0 text-sm"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Bottom Bar ─── (watermark removed per design) */}
        <div className="mt-12 sm:mt-16 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} TableTurnerr. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <FlipLink href="/login">Client Login</FlipLink>
            <FlipLink href="/privacy">Privacy Policy</FlipLink>
            <FlipLink href="/terms">Terms of Service</FlipLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
