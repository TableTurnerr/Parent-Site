import Link from "next/link";
import Container from "@/app/components/ui/Container";
import { Logo } from "@/app/components/ui/Logo";
import {
  NAV_LINKS,
  SOCIAL_LINKS,
  SERVICES,
  SITE_CONFIG,
} from "@/app/lib/constants";

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
        <span className={hoverColor}>{children}</span>
      </span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black pt-16 md:pt-20 pb-8">
      <Container>
        {/* ─── Main Footer Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
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
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <FlipLink href={link.href}>{link.label}</FlipLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h3 className="text-white text-sm font-medium uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <FlipLink href={`/services/${service.slug}`}>
                    {service.title}
                  </FlipLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
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
                <FlipLink
                  href="/contact"
                  baseColor="text-white"
                  hoverColor="text-neutral-300"
                >
                  Get a Quote &rarr;
                </FlipLink>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Large Watermark Text ─── */}
        <div className="mt-16 overflow-hidden select-none pointer-events-none" aria-hidden="true">
          <p className="text-neutral-800/30 text-[8rem] md:text-[10rem] lg:text-[12rem] font-bold uppercase tracking-tighter leading-none whitespace-nowrap" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}>
            TABLETURNERR
          </p>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="mt-8 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} TableTurnerr. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <FlipLink href="#">Privacy Policy</FlipLink>
            <FlipLink href="#">Terms of Service</FlipLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
