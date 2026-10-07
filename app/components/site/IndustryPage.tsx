import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Star } from "lucide-react";
import Accordion from "@/app/components/site/Accordion";
import CrossLinks from "@/app/components/site/CrossLinks";
import JsonLd from "@/app/components/site/JsonLd";
import { getFeature, type ProductFeature } from "@/app/lib/features";
import { INDUSTRIES, type Industry } from "@/app/lib/industries";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema,
} from "@/app/lib/schema";

const STEPS = [
  { n: "01", t: "Connect your workflow", b: "Bring customer and completed-job information into a simple review workflow." },
  { n: "02", t: "Ask at the right moment", b: "Send a thoughtful review request after the work is complete." },
  { n: "03", t: "Keep your proof working", b: "Track the feedback and local visibility that help future customers choose you." },
];

function IndustryActivityCard({ industry }: { industry: Industry }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white p-5 shadow-[0_30px_70px_-35px_rgba(10,19,38,0.45)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-ink">Completed {industry.name.toLowerCase()} job</p>
          <p className="mt-1 text-xs text-muted">Customer follow-up ready</p>
        </div>
        <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">Automated</span>
      </div>
      <div className="mt-7 rounded-2xl bg-surface p-4">
        <div className="flex items-center gap-2 text-star"><Star className="h-4 w-4 fill-current" /><span className="stars text-base">★★★★★</span></div>
        <p className="mt-3 text-sm font-semibold text-ink">A simple request gives happy customers a moment to share their experience.</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl border border-line p-3"><p className="font-semibold text-ink">Review request</p><p className="mt-1 text-muted">Ready to send</p></div>
        <div className="rounded-xl border border-line p-3"><p className="font-semibold text-ink">Local presence</p><p className="mt-1 text-muted">Track movement</p></div>
      </div>
    </div>
  );
}

export default function IndustryPage({ industry }: { industry: Industry }) {
  const base = "https://www.tableturnerr.com";
  const features = industry.featureSlugs
    .map(getFeature)
    .filter((feature): feature is ProductFeature => Boolean(feature));
  const siblingIndustries = Object.values(INDUSTRIES)
    .filter((item) => item.slug !== industry.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({
            name: `${industry.name} Review Management`,
            description: industry.heroSub,
            url: `${base}/industries/${industry.slug}`,
          }),
          generateFAQSchema(industry.faqs.map((faq) => ({ question: faq.q, answer: faq.a }))),
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Industries", url: `${base}/industries` },
            { name: industry.name, url: `${base}/industries/${industry.slug}` },
          ]),
        ]}
      />

      <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative pb-16 md:pb-24">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink">Home</Link><span>/</span>
            <Link href="/industries" className="hover:text-ink">Industries</Link><span>/</span>
            <span className="font-medium text-ink">{industry.name}</span>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
            <div>
              <span className="eyebrow">{industry.name} · Review management</span>
              <h1 className="display mt-6 text-ink">{industry.heroTitle}</h1>
              <p className="lead mt-6 max-w-xl">{industry.heroSub}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup" className="btn btn-primary">Start free trial <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/features" className="btn btn-ghost">Explore features</Link>
              </div>
              <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
                {["14-day free trial", "No contracts", "Setup in 15 minutes"].map((item) => (
                  <li key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-success" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="relative lg:pl-6">
              {industry.image ? (
                <div className="overflow-hidden rounded-[1.5rem] border border-line shadow-[0_30px_70px_-35px_rgba(10,19,38,0.45)]">
                  <Image src={industry.image} alt={`${industry.name} professional using review management software`} width={1200} height={900} priority className="h-full w-full object-cover" />
                </div>
              ) : <IndustryActivityCard industry={industry} />}
              <div className="tt-float absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-lg">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-star/15 text-star"><Star className="h-5 w-5 fill-current" /></span>
                <div className="leading-tight"><p className="text-sm font-bold text-ink">New customer feedback</p><p className="text-xs text-muted">ready to build trust</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center"><span className="eyebrow">Why it matters</span><h2 className="display-2 mt-5 text-ink">A better review habit for every {industry.name.toLowerCase()} job</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {industry.pains.map((pain) => <div key={pain.t} className="card p-7"><h3 className="text-lg font-bold text-ink">{pain.t}</h3><p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{pain.b}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tt">
          <div className="max-w-2xl"><span className="eyebrow">Relevant features</span><h2 className="display-2 mt-5 text-ink">Tools selected for how {industry.name.toLowerCase()} teams work</h2><p className="lead mt-4">Every capability below has its own page, so you can see exactly how it fits your workflow.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => { const Icon = feature.icon; return (
              <Link key={feature.slug} href={`/features/${feature.slug}`} className="card card-hover group flex h-full flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                {feature.fieldTask && <span className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary">With FieldTask</span>}
                <h3 className={`${feature.fieldTask ? "mt-2" : "mt-5"} text-lg font-bold text-ink`}>{feature.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore this feature <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ); })}
          </div>
        </div>
      </section>

      <section className="section bg-night text-white">
        <div className="container-tt grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><span className="eyebrow border-white/15 bg-white/5 text-white">One connected workflow</span><h2 className="display-2 mt-5 text-white">From finished work to visible proof</h2><p className="lead mt-4 text-white/70">Keep the review request connected to the work your team is already completing, then use the feedback to support the next booking.</p></div>
          <div className="space-y-5">
            {STEPS.map((step) => <div key={step.n} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"><span className="font-display text-sm font-bold text-primary">{step.n}</span><div><h3 className="font-bold text-white">{step.t}</h3><p className="mt-1 text-sm leading-relaxed text-white/65">{step.b}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tt grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><span className="eyebrow">FAQ</span><h2 className="display-2 mt-5 text-ink">{industry.name} questions</h2><p className="lead mt-4">Want to talk through your setup? <Link href="/contact" className="font-semibold text-primary">Book a demo</Link>.</p></div><div className="lg:col-span-8"><Accordion items={industry.faqs} /></div></div>
      </section>

      <CrossLinks
        title="Explore other industries"
        links={[
          ...siblingIndustries.map((item) => ({ href: `/industries/${item.slug}`, label: item.name, sub: `Review management for ${item.name} businesses` })),
          { href: "/industries", label: "All industries", sub: "Find your home-service workflow" },
          { href: "/features", label: "All features", sub: "Explore every capability" },
          { href: "/integrations", label: "Integrations", sub: "Connect the tools your team uses" },
        ]}
      />

      <section className="section"><div className="container-tt"><div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20"><div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" /><div className="relative mx-auto max-w-2xl"><div className="stars mb-5 text-2xl" aria-hidden>★★★★★</div><h2 className="display-2 text-white">Give every completed {industry.name.toLowerCase()} job a chance to build trust</h2><p className="lead mt-4 text-white/70">Connect your workflow, start your review automation, and keep the proof moving. Free for 14 days.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/signup" className="btn btn-light">Start free trial <ArrowRight className="h-4 w-4" /></Link><Link href="/contact" className="btn btn-outline-light">Book a demo</Link></div><p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60"><ShieldCheck className="h-4 w-4 text-success" />More reviews in 90 days or your next month is free.</p></div></div></div></section>
    </>
  );
}
