import Link from "next/link";
import { Check, X, ArrowRight, ShieldCheck, Scale } from "lucide-react";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import CrossLinks from "@/app/components/site/CrossLinks";
import { generateFAQSchema, generateBreadcrumbSchema, generateServiceSchema } from "@/app/lib/schema";
import { ALL_ALTERNATIVES, type Alternative, type Cell } from "@/app/lib/alternatives";

function CompareCell({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-success" />;
  if (v === false) return <X className="mx-auto h-5 w-5 text-muted/50" />;
  if (v === "partial")
    return <span className="text-xs font-semibold text-muted">Some</span>;
  return <span className="text-xs font-medium text-ink-soft">{v}</span>;
}

export default function AlternativePage({ alt }: { alt: Alternative }) {
  const base = "https://www.tableturnerr.com";
  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({
            name: "Review automation for home services",
            description: alt.intro,
            url: `${base}/alternatives/${alt.slug}`,
          }),
          generateFAQSchema(alt.faqs.map((f) => ({ question: f.q, answer: f.a }))),
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Alternatives", url: `${base}/alternatives` },
            { name: `${alt.competitor} alternative`, url: `${base}/alternatives/${alt.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative pb-16 md:pb-24">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <Link href="/alternatives" className="hover:text-ink">Alternatives</Link>
            <span>/</span>
            <span className="font-medium text-ink">{alt.competitor}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="eyebrow">{alt.category} · {alt.competitor} alternative</span>
            <h1 className="display mt-6 text-ink">{alt.tagline}</h1>
            <p className="lead mt-6">{alt.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="btn btn-primary">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-ghost">Book a demo</Link>
            </div>
            <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
              {["Live the same day", "No contracts", "90-day results guarantee"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The honest take */}
      <section className="section bg-surface">
        <div className="container-tt grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-7 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Where {alt.competitor} fits
            </p>
            <p className="mt-4 text-ink-soft">{alt.fairTake}</p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary-soft/40 p-7 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              Why shops pick TableTurnerr
            </p>
            <p className="mt-4 text-ink-soft">{alt.ourAngle}</p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Side by side</span>
            <h2 className="display-2 mt-5 text-ink">
              TableTurnerr vs {alt.competitor}
            </h2>
            <p className="lead mt-4">
              How the two stack up for a home-service shop that wants more reviews.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-line bg-white">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-line bg-surface/60 px-5 py-4 text-sm font-semibold text-ink sm:gap-x-8 sm:px-7">
              <span>Feature</span>
              <span className="w-20 text-center text-primary sm:w-28">TableTurnerr</span>
              <span className="w-20 text-center text-muted sm:w-28">{alt.competitor}</span>
            </div>
            {alt.compare.map((row, i) => (
              <div
                key={row.f}
                className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-5 py-3.5 text-sm sm:gap-x-8 sm:px-7 ${i % 2 ? "bg-surface/30" : ""}`}
              >
                <span className="text-ink-soft">{row.f}</span>
                <span className="w-20 text-center sm:w-28"><CompareCell v={row.us} /></span>
                <span className="w-20 text-center sm:w-28"><CompareCell v={row.them} /></span>
              </div>
            ))}
          </div>

          {/* Terms / pricing callout (structure, not dollar figures) */}
          <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-line bg-surface px-6 py-5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Scale className="h-4 w-4" />
            </span>
            <p className="text-sm leading-relaxed text-ink-soft">{alt.termsNote}</p>
          </div>
        </div>
      </section>

      {/* Why switch */}
      <section className="section bg-surface">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why switch</span>
            <h2 className="display-2 mt-5 text-ink">
              What you gain moving to TableTurnerr
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {alt.reasons.map((r) => (
              <div key={r.t} className="rounded-2xl border border-line bg-white p-7">
                <h3 className="text-lg font-bold text-ink">{r.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{r.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-tt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">FAQ</span>
            <h2 className="display-2 mt-5 text-ink">
              {alt.competitor} vs TableTurnerr
            </h2>
            <p className="lead mt-4">
              Still deciding? <Link href="/contact" className="font-semibold text-primary">Talk to us</Link>.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={alt.faqs} />
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <CrossLinks
        title="Compare other tools"
        links={[
          ...ALL_ALTERNATIVES.filter((a) => a.slug !== alt.slug).map((a) => ({
            href: `/alternatives/${a.slug}`,
            label: `vs ${a.competitor}`,
            sub: a.category,
          })),
          { href: "/trades", label: "Browse by trade", sub: "HVAC, roofing, plumbing & electrical" },
          { href: "/integrations", label: "Integrations", sub: "Connect your field-service CRM" },
        ]}
      />

      {/* CTA */}
      <section className="section">
        <div className="container-tt">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative mx-auto max-w-2xl">
              <div className="stars mb-5 text-2xl" aria-hidden>★★★★★</div>
              <h2 className="display-2 text-white">
                See why shops switch from {alt.competitor}
              </h2>
              <p className="lead mt-4 text-white/70">
                Connect your CRM and start collecting reviews this week. Free for
                14 days, no contracts, cancel anytime.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/signup" className="btn btn-light">Start free trial <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/contact" className="btn btn-outline-light">Book a demo</Link>
              </div>
              <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
                <ShieldCheck className="h-4 w-4 text-success" /> More reviews in 90 days or your next month is free.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
