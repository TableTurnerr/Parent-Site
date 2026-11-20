import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, Star } from "lucide-react";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import VideoPlayer from "@/app/components/growth/VideoPlayer";
import { vslSchema } from "@/app/lib/growth/video";
import { AUDIT_PATH, growthSite, plain, topics, trades, type Guide, type Link3, type Pair } from "@/app/lib/growth";

/** Trusted, first-party HTML from app/lib/growth content files. */
export function Html({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`growth-prose ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Inline HTML (headings/ledes in the content files contain entities and the odd tag). */
export function InlineHtml({ html, as: Tag = "span", className = "" }: { html: string; as?: "span" | "h1" | "p"; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Crumbs({ items }: { items: Pair[] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
      {items.map(([href, label], i) => (
        <span key={href} className="flex items-center gap-2">
          {i < items.length - 1 ? <Link href={href} className="hover:text-ink">{label}</Link> : <span className="font-medium text-ink" aria-current="page">{label}</span>}
          {i < items.length - 1 && <span aria-hidden>/</span>}
        </span>
      ))}
    </nav>
  );
}

export function AuditButtons({ light = false }: { light?: boolean }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link href={AUDIT_PATH} className={`btn ${light ? "btn-light" : "btn-primary"}`}>
        Get your free Google Maps audit <ArrowRight className="h-4 w-4" />
      </Link>
      <a href={growthSite.bookingUrl} className={`btn ${light ? "btn-outline-light" : "btn-ghost"}`}>Book a 15-minute call</a>
    </div>
  );
}

export function GrowthHero({ crumbs, eyebrow, h1, lede, trust = true, children }: {
  crumbs: Pair[]; eyebrow: string; h1: string; lede: string; trust?: boolean; children?: ReactNode;
}) {
  return (
    <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div className="container-tt relative pb-14 md:pb-20">
        <Crumbs items={crumbs} />
        <div className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <InlineHtml as="h1" html={h1} className="display mt-6 text-ink" />
          <InlineHtml as="p" html={lede} className="lead mt-6" />
          {children ?? <AuditButtons />}
          {trust && (
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
              {["Done for you", "Month to month", "You talk to an owner, not a rep"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-success" />{t}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/** "At a glance" facts: short, self-contained statements that answer engines can quote as-is. */
export function Glance({ rows, heading = "At a glance" }: { rows: (readonly [string, ReactNode] | null)[]; heading?: string }) {
  return (
    <section className="border-y border-line bg-surface py-12">
      <div className="container-tt">
        <h2 className="text-xl font-bold text-ink">{heading}</h2>
        <dl className="glance mt-5 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {rows.filter((r): r is readonly [string, ReactNode] => Boolean(r)).map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{k}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function CardGrid({ items, numbered = false, cols = 3 }: { items: Pair[]; numbered?: boolean; cols?: 2 | 3 }) {
  return (
    <div className={`mt-10 grid gap-5 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {items.map(([h, p], i) => (
        <div key={h} className="card p-7">
          {numbered && <span className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-primary-soft font-bold text-primary">{i + 1}</span>}
          <InlineHtml as="p" html={h} className="text-lg font-bold text-ink" />
          <InlineHtml as="p" html={p} className="mt-2.5 text-sm leading-relaxed text-ink-soft" />
        </div>
      ))}
    </div>
  );
}

export function SectionHead({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`display-2 text-ink ${eyebrow ? "mt-5" : ""}`}>{title}</h2>
      {intro && <InlineHtml as="p" html={intro} className="lead mt-4" />}
    </div>
  );
}

export function GuideCards({ list }: { list: Guide[] }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {list.map((g) => (
        <Link key={g.slug} href={g.path} className="card card-hover group flex h-full flex-col p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{topics[g.topics[0]]?.name}</span>
          <InlineHtml as="p" html={g.h1} className="mt-2 text-lg font-bold text-ink" />
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{g.description}</p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
        </Link>
      ))}
    </div>
  );
}

export function TradeChips({ except }: { except?: string }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {trades.filter((t) => t.path !== except).map((t) => (
        <li key={t.slug}>
          <Link href={t.path} className="inline-block rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-ink">
            {t.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function AuditBand({
  title = "See exactly why competitors get the call",
  text = "We'll pull your Google Maps rankings, reviews and profile against the top competitors in your area, then walk you through it on a short call, owner to owner. Free, and you keep the report.",
}: { title?: string; text?: string }) {
  return (
    <section className="section">
      <div className="container-tt">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
          <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-2xl">
            <div className="mb-5 flex justify-center gap-1 text-star" aria-hidden>{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
            <h2 className="display-2 text-white">{plain(title)}</h2>
            <p className="lead mt-4 text-white/70">{text}</p>
            <div className="flex justify-center"><AuditButtons light /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ faq, heading = "Questions owners ask us" }: { faq: Pair[]; heading?: string }) {
  return (
    <section className="section bg-surface">
      <div className="container-tt grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="eyebrow">FAQ</span>
          <h2 className="display-2 mt-5 text-ink">{heading}</h2>
        </div>
        <div className="lg:col-span-8"><Accordion items={faq.map(([q, a]) => ({ q: plain(q), a: plain(a) }))} /></div>
      </div>
    </section>
  );
}

export const faqSchemaItems = (faq: Pair[]) => faq.map(([q, a]) => ({ question: plain(q), answer: plain(a) }));

/** The explainer video (click-to-play facade) with its VideoObject schema. Use once per page. */
export function VideoSection({
  eyebrow = "Watch first",
  title = "How we get home-service businesses chosen on Google, and what it costs",
  intro = "A 6-minute walkthrough from the owner: reviews, one inbox for calls and texts, missed-call text-back, staying active online, what's in your free audit and pricing.",
  surface = false,
}: { eyebrow?: string; title?: string; intro?: string; surface?: boolean }) {
  return (
    <section className={`section ${surface ? "bg-surface" : ""}`} data-analytics-section="vsl">
      <JsonLd data={vslSchema()} />
      <div className="container-tt grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="display-2 mt-5 text-ink">{title}</h2>
          <p className="lead mt-4">{intro}</p>
          <AuditButtons />
        </div>
        <div className="min-w-0 lg:col-span-7"><VideoPlayer /></div>
      </div>
    </section>
  );
}

/** Done-for-you bridge on the software pages (industries, integrations, alternatives, features): the free audit
 *  plus the matching done-for-you page, so no software page is a dead end for owners who'd rather not DIY. */
export function DoneForYouBand({ tradePath, label }: { tradePath?: string; label?: string }) {
  return (
    <section className="section pt-0" data-analytics-section="done_for_you_bridge">
      <div className="container-tt">
        <div className="card grid gap-8 p-7 md:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow">Rather we run it for you?</span>
            <h2 className="mt-4 text-2xl font-bold text-ink md:text-3xl">Software, or a team that does the marketing for you</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              TableTurnerr is also a done-for-you marketing agency for home-service businesses. We run your Google Business
              Profile, review generation, local SEO, website and missed-call text-back on our own software, month to month.
              Start with a free Google Maps audit to see where you stand against the top competitors near you.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {tradePath && <li><Link href={tradePath} className="text-primary hover:underline">{label ?? "Marketing plan for your trade"}</Link></li>}
              <li><Link href="/services" className="text-primary hover:underline">Done-for-you services</Link></li>
              <li><Link href="/results/presidential-roofing" className="text-primary hover:underline">Client result: 27 to 43 reviews in 20 days</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-5"><AuditButtons /></div>
        </div>
      </div>
    </section>
  );
}

/** End-of-page next steps so no page is a dead end. */
export function NextSteps({ items }: { items: Link3[] }) {
  return (
    <section className="section bg-surface" data-analytics-section="next_steps">
      <div className="container-tt">
        <SectionHead title="Where to go next" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map(([href, h, p]) => (
            <Link key={href} href={href} className="card card-hover group flex h-full flex-col p-6">
              <span className="text-lg font-bold text-ink">{h}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p}</span>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Go <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
