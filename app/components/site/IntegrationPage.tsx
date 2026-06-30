import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, Plug, Zap } from "lucide-react";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import CrossLinks from "@/app/components/site/CrossLinks";
import { generateFAQSchema, generateBreadcrumbSchema, generateServiceSchema } from "@/app/lib/schema";
import { INTEGRATIONS, type Integration } from "@/app/lib/integrations";

export default function IntegrationPage({ integration }: { integration: Integration }) {
  const steps = [
    { n: "01", t: `Connect ${integration.name}`, b: "Authorize in one click. No code, no developers, no CSV wrangling." },
    { n: "02", t: "We import your customers", b: "Your customer list syncs in, and we start watching for completed jobs." },
    { n: "03", t: "Reviews on autopilot", b: `Every finished job in ${integration.name} automatically asks that customer for a review.` },
  ];

  const base = "https://www.tableturnerr.com";
  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({
            name: `${integration.name} review automation integration`,
            description: integration.blurb,
            url: `${base}/integrations/${integration.slug}`,
          }),
          generateFAQSchema(integration.faqs.map((f) => ({ question: f.q, answer: f.a }))),
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Integrations", url: `${base}/integrations` },
            { name: integration.name, url: `${base}/integrations/${integration.slug}` },
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
            <Link href="/integrations" className="hover:text-ink">Integrations</Link>
            <span>/</span>
            <span className="font-medium text-ink">{integration.name}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
            <div>
              <span className="eyebrow">{integration.category} · Integration</span>
              <h1 className="display mt-6 text-ink">{integration.tagline}</h1>
              <p className="lead mt-6 max-w-xl">{integration.blurb}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup" className="btn btn-primary">
                  Start free trial <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="btn btn-ghost">Book a demo</Link>
              </div>
              <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
                {["Connects in ~1 minute", "No code required", "No contracts"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* connect card */}
            <div className="lg:pl-6">
              <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-[0_30px_70px_-40px_rgba(10,19,38,0.4)] md:p-8">
                <div className="flex items-center gap-3 border-b border-line pb-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Plug className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-ink">{integration.name}</p>
                    <p className="text-xs text-muted">{integration.category}</p>
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                    <Zap className="h-3.5 w-3.5" /> Connected
                  </span>
                </div>
                <div className="mt-5 space-y-4">
                  {steps.map((s) => (
                    <div key={s.n} className="flex gap-3">
                      <span className="font-display text-sm font-bold text-primary">{s.n}</span>
                      <div>
                        <p className="text-sm font-bold text-ink">{s.t}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{s.b}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What syncs */}
      <section className="section bg-surface">
        <div className="container-tt grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">What syncs</span>
            <h2 className="display-2 mt-5 text-ink">
              Everything we need, nothing we don&apos;t
            </h2>
            <p className="lead mt-4">
              The {integration.name} connection is read-only and scoped to exactly what&apos;s
              needed to send great review requests. We never change anything in your account.
            </p>
          </div>
          <ul className="grid gap-3">
            {integration.syncs.map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm text-ink-soft">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-tt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">FAQ</span>
            <h2 className="display-2 mt-5 text-ink">{integration.name} questions</h2>
            <p className="lead mt-4">
              Don&apos;t see {integration.name} answered? <Link href="/contact" className="font-semibold text-primary">Ask us</Link>.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={integration.faqs} />
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <CrossLinks
        links={[
          ...Object.values(INTEGRATIONS)
            .filter((i) => i.slug !== integration.slug)
            .map((i) => ({
              href: `/integrations/${i.slug}`,
              label: `${i.name} integration`,
              sub: i.category,
            })),
          { href: "/trades", label: "Browse by trade", sub: "HVAC, roofing, plumbing & electrical" },
          { href: "/alternatives", label: "Compare review tools", sub: "See how we stack up" },
        ]}
      />

      {/* CTA */}
      <section className="section">
        <div className="container-tt">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative mx-auto max-w-2xl">
              <div className="stars mb-5 text-2xl" aria-hidden>★★★★★</div>
              <h2 className="display-2 text-white">Connect {integration.name} and start collecting reviews</h2>
              <p className="lead mt-4 text-white/70">
                It takes about a minute. Free for 14 days, no contracts, cancel anytime.
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
