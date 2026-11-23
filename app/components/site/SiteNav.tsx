"use client";

// Header: Services / Who we help / Resources open menus organised the way prospects think (see app/lib/site-nav.ts);
// the phone number sits next to the free-audit button so "call now" is always one tap away.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/app/components/ui/Logo";
import ThemeToggleButton from "@/app/components/ui/ThemeToggleButton";
import { useMarketingTheme } from "@/app/components/site/MarketingThemeProvider";
import {
  AUDIT_HREF, PHONE_DISPLAY, PHONE_E164, RESOURCE_LINKS, SERVICE_GROUPS, SIGN_IN_URL, TRADE_LINKS, type NavItem,
} from "@/app/lib/site-nav";

type MenuId = "services" | "trades" | "resources";
const MENUS: { id: MenuId; label: string }[] = [
  { id: "services", label: "Services" },
  { id: "trades", label: "Who we help" },
];
const PLAIN = [
  { label: "Results", href: "/results" },
  { label: "Pricing", href: "/pricing" },
];
const AFTER = [{ label: "About", href: "/about" }];

const isExternal = (href: string) => href.startsWith("http");

function ItemLink({ item, onClick, className }: { item: NavItem; onClick?: () => void; className: string }) {
  if (isExternal(item.href)) {
    return <a href={item.href} target="_blank" rel="noopener" onClick={onClick} className={className}>{item.label}{item.desc && <Desc t={item.desc} />}</a>;
  }
  return <Link href={item.href} onClick={onClick} className={className}>{item.label}{item.desc && <Desc t={item.desc} />}</Link>;
}
const Desc = ({ t }: { t: string }) => <span className="mt-0.5 block text-xs font-normal leading-snug text-muted">{t}</span>;

function ServicesPanel({ close }: { close: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="grid gap-8 sm:grid-cols-3 lg:col-span-9">
        {SERVICE_GROUPS.map((g) => (
          <div key={g.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{g.title}</p>
            <ul className="mt-3 space-y-1">
              {g.items.map((i) => (
                <li key={i.href}><ItemLink item={i} onClick={close} className="block rounded-lg px-2 py-2 -mx-2 text-sm font-semibold text-ink hover:bg-surface" /></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between rounded-2xl bg-night p-5 text-white lg:col-span-3">
        <div>
          <p className="text-sm font-semibold">Not sure where to start?</p>
          <p className="mt-1.5 text-sm leading-relaxed text-white/70">A free Google Maps audit shows where you rank and what to fix first.</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Link href={AUDIT_HREF} onClick={close} className="btn btn-light !py-2 text-sm">Get my free audit</Link>
          <Link href="/services" onClick={close} className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-white/80 hover:text-white">All services <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </div>
  );
}

function TradesPanel({ close }: { close: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-9">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">A marketing plan for your trade</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-4">
          {TRADE_LINKS.map((t) => (
            <li key={t.href}><ItemLink item={t} onClick={close} className="-mx-2 block rounded-lg px-2 py-1.5 text-sm font-semibold text-ink hover:bg-surface" /></li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 text-sm lg:col-span-3">
        <Link href="/marketing" onClick={close} className="inline-flex items-center gap-1 font-semibold text-primary">All trades <ArrowRight className="h-4 w-4" /></Link>
        <Link href="/restaurants" onClick={close} className="font-semibold text-ink-soft hover:text-ink">Restaurants & cafés</Link>
        <Link href="/results" onClick={close} className="font-semibold text-ink-soft hover:text-ink">Client results</Link>
      </div>
    </div>
  );
}

function ResourcesPanel({ close }: { close: () => void }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-3">
      {RESOURCE_LINKS.map((r) => (
        <li key={r.href}><ItemLink item={r} onClick={close} className="block rounded-xl p-3 text-sm font-semibold text-ink hover:bg-surface" /></li>
      ))}
    </ul>
  );
}

const PANELS: Record<MenuId, (p: { close: () => void }) => React.ReactElement> = {
  services: ServicesPanel,
  trades: TradesPanel,
  resources: ResourcesPanel,
};

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [mobileSection, setMobileSection] = useState<MenuId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useMarketingTheme();
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on Escape and on clicks outside the header.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(null); };
    const onDown = (e: MouseEvent) => { if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenu(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, []);

  const close = () => { setMenu(null); setOpen(false); };
  const hover = (id: MenuId | null) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMenu(id), id ? 60 : 160);
  };
  const Panel = menu ? PANELS[menu] : null;
  const active = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  const trigger = (id: MenuId, label: string) => (
    <button
      type="button"
      aria-expanded={menu === id}
      aria-controls="site-menu-panel"
      onClick={() => setMenu((m) => (m === id ? null : id))}
      onMouseEnter={() => hover(id)}
      className={`inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold transition-colors hover:text-ink ${menu === id ? "text-ink" : "text-ink-soft"}`}
    >
      {label}
      <ChevronDown className={`h-4 w-4 transition-transform ${menu === id ? "rotate-180" : ""}`} aria-hidden />
    </button>
  );
  const plainLink = (l: { label: string; href: string }) => (
    <Link key={l.href} href={l.href} onMouseEnter={() => hover(null)} className={`whitespace-nowrap text-sm font-semibold transition-colors hover:text-ink ${active(l.href) ? "text-ink" : "text-ink-soft"}`}>
      {l.label}
    </Link>
  );

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => hover(null)}>
      <div
        className={`border-b backdrop-blur-md transition-all duration-300 ease-out ${
          menu || open ? "border-line bg-bg shadow-[0_18px_40px_-20px_rgba(10,19,38,0.5)]" : scrolled ? "border-line bg-white/95 shadow-[0_8px_24px_-16px_rgba(10,19,38,0.45)]" : "border-line/70 bg-white/85"
        }`}
      >
        <div className="container-tt">
          <nav className={`flex items-center justify-between gap-4 transition-all duration-300 ease-out ${scrolled ? "py-2.5" : "py-3.5"}`} aria-label="Main">
            <Link href="/" onClick={close} className="flex shrink-0 items-center gap-2.5 font-bold tracking-tight text-ink">
              <Logo aria-hidden="true" className={`w-auto text-ink transition-all duration-300 ease-out ${scrolled ? "h-7" : "h-8"}`} />
              <span className="text-lg">TableTurnerr</span>
            </Link>

            <div className="hidden items-center gap-5 lg:flex xl:gap-7">
              {MENUS.map((m) => <span key={m.id}>{trigger(m.id, m.label)}</span>)}
              {PLAIN.map(plainLink)}
              {trigger("resources", "Resources")}
              {AFTER.map(plainLink)}
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <a href={`tel:${PHONE_E164}`} className="hidden items-center gap-1.5 whitespace-nowrap px-2 text-sm font-semibold text-ink hover:text-primary xl:inline-flex">
                <Phone className="h-4 w-4" aria-hidden /> {PHONE_DISPLAY}
              </a>
              <ThemeToggleButton theme={theme} onToggle={toggle} />
              <a href={SIGN_IN_URL} className="whitespace-nowrap px-2 text-sm font-semibold text-ink-soft hover:text-ink">Sign in</a>
              <Link href={AUDIT_HREF} onClick={close} className="btn btn-primary whitespace-nowrap px-5 py-2 text-sm">Free audit</Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <a href={`tel:${PHONE_E164}`} aria-label={`Call ${PHONE_DISPLAY}`} className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink">
                <Phone className="h-4 w-4" />
              </a>
              <ThemeToggleButton theme={theme} onToggle={toggle} />
              <button type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          {Panel && (
            <div id="site-menu-panel" className="hidden border-t border-line py-7 lg:block" onMouseEnter={() => window.clearTimeout(hoverTimer.current)}>
              <Panel close={close} />
            </div>
          )}

          {open && (
            <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line pb-5 lg:hidden">
              <div className="flex flex-col pt-2">
                {([["services", "Services"], ["trades", "Who we help"], ["resources", "Resources"]] as [MenuId, string][]).map(([id, label]) => (
                  <div key={id} className="border-b border-line/70">
                    <button type="button" aria-expanded={mobileSection === id} onClick={() => setMobileSection((s) => (s === id ? null : id))} className="flex w-full items-center justify-between px-1 py-3.5 text-left text-[0.95rem] font-semibold text-ink">
                      {label}
                      <ChevronDown className={`h-5 w-5 text-muted transition-transform ${mobileSection === id ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                    {mobileSection === id && (
                      <div className="pb-4">
                        {id === "services" && SERVICE_GROUPS.map((g) => (
                          <div key={g.title} className="mb-3">
                            <p className="px-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{g.title}</p>
                            {g.items.map((i) => <ItemLink key={i.href} item={{ ...i, desc: undefined }} onClick={close} className="block rounded-lg px-1 py-2 text-sm font-medium text-ink-soft" />)}
                          </div>
                        ))}
                        {id === "services" && <Link href="/services" onClick={close} className="block px-1 py-2 text-sm font-semibold text-primary">All services</Link>}
                        {id === "trades" && (
                          <div className="grid grid-cols-2">
                            {TRADE_LINKS.map((t) => <ItemLink key={t.href} item={t} onClick={close} className="block px-1 py-2 text-sm font-medium text-ink-soft" />)}
                            <Link href="/marketing" onClick={close} className="block px-1 py-2 text-sm font-semibold text-primary">All trades</Link>
                            <Link href="/restaurants" onClick={close} className="block px-1 py-2 text-sm font-medium text-ink-soft">Restaurants & cafés</Link>
                          </div>
                        )}
                        {id === "resources" && RESOURCE_LINKS.map((r) => <ItemLink key={r.href} item={{ ...r, desc: undefined }} onClick={close} className="block px-1 py-2 text-sm font-medium text-ink-soft" />)}
                      </div>
                    )}
                  </div>
                ))}
                {[...PLAIN, ...AFTER].map((l) => (
                  <Link key={l.href} href={l.href} onClick={close} className="border-b border-line/70 px-1 py-3.5 text-[0.95rem] font-semibold text-ink">{l.label}</Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Link href={AUDIT_HREF} className="btn btn-primary w-full" onClick={close}>Get a free Google Maps audit</Link>
                  <a href={`tel:${PHONE_E164}`} className="btn btn-ghost w-full"><Phone className="h-4 w-4" aria-hidden /> Call {PHONE_DISPLAY}</a>
                  <a href={SIGN_IN_URL} className="py-2 text-center text-sm font-semibold text-ink-soft" onClick={close}>Client sign in</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
