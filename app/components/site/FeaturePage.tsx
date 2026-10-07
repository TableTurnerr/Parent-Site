import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Accordion from "@/app/components/site/Accordion";
import CrossLinks from "@/app/components/site/CrossLinks";
import JsonLd from "@/app/components/site/JsonLd";
import { INDUSTRIES } from "@/app/lib/industries";
import type { ProductFeature } from "@/app/lib/features";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";

export default function FeaturePage({ feature }: { feature: ProductFeature }) {
  const Icon = feature.icon;
  const base = "https://www.tableturnerr.com";
  const industries = Object.values(INDUSTRIES).filter((industry) => industry.featureSlugs.includes(feature.slug)).slice(0, 6);
  const faqs = [
    { q: `What is ${feature.title.toLowerCase()}?`, a: feature.detail },
    { q: `Which home-service industries can use ${feature.title.toLowerCase()}?`, a: `This feature is highlighted for ${industries.map((industry) => industry.name).join(", ")} and other home-service workflows where it is relevant.` },
    { q: "How can I see whether this feature fits my setup?", a: "Start a free trial or book a demo. We can walk through the feature in the context of the workflow your team already uses." },
  ];

  return (
    <>
      <JsonLd data={[
        generateServiceSchema({ name: feature.title, description: feature.detail, url: `${base}/features/${feature.slug}` }),
        generateFAQSchema(faqs.map((faq) => ({ question: faq.q, answer: faq.a }))),
        generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Features", url: `${base}/features` }, { name: feature.title, url: `${base}/features/${feature.slug}` }]),
      ]} />
      <section className="hero-wash relative overflow-hidden pt-36 md:pt-44"><div aria-hidden className="hero-grid pointer-events-none absolute inset-0" /><div className="container-tt relative pb-16 md:pb-24"><nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb"><Link href="/" className="hover:text-ink">Home</Link><span>/</span><Link href="/features" className="hover:text-ink">Features</Link><span>/</span><span className="font-medium text-ink">{feature.title}</span></nav><div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14"><div><span className="eyebrow">{feature.fieldTask ? "FieldTask capability" : "TableTurnerr feature"}</span><h1 className="display mt-6 text-ink">{feature.title}</h1><p className="lead mt-6 max-w-xl">{feature.detail}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/signup" className="btn btn-primary">Start free trial <ArrowRight className="h-4 w-4" /></Link><Link href="/industries" className="btn btn-ghost">Browse industries</Link></div></div><div className="rounded-[1.75rem] border border-line bg-white p-7 shadow-[0_30px_70px_-35px_rgba(10,19,38,0.45)] sm:p-10"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary"><Icon className="h-7 w-7" /></span><p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-muted">What it helps with</p><ul className="mt-4 space-y-4">{feature.benefits.map((benefit) => <li key={benefit} className="flex items-start gap-3 text-ink-soft"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary"><Check className="h-4 w-4" /></span><span>{benefit}</span></li>)}</ul></div></div></div></section>

      <section className="section bg-surface"><div className="container-tt grid gap-12 lg:grid-cols-2 lg:items-center"><div><span className="eyebrow">How it fits</span><h2 className="display-2 mt-5 text-ink">A clearer path from great work to customer confidence</h2><p className="lead mt-4">{feature.description} The goal is to make the right next step easier for your team and clearer for the customer.</p></div><div className="grid gap-4 sm:grid-cols-2">{feature.benefits.map((benefit, index) => <div key={benefit} className="card p-5"><p className="font-display text-sm font-bold text-primary">0{index + 1}</p><p className="mt-3 font-semibold text-ink">{benefit}</p></div>)}</div></div></section>

      <section className="section"><div className="container-tt"><div className="max-w-2xl"><span className="eyebrow">By industry</span><h2 className="display-2 mt-5 text-ink">Where this feature fits best</h2><p className="lead mt-4">Explore the industry pages that connect this capability to a real home-service workflow.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{industries.map((industry) => <Link key={industry.slug} href={`/industries/${industry.slug}`} className="card card-hover group flex items-center justify-between gap-4 p-5"><span><span className="block font-semibold text-ink">{industry.name}</span><span className="mt-1 block text-sm text-ink-soft">Review management for {industry.name} businesses</span></span><ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1" /></Link>)}</div></div></section>

      <section className="section bg-surface"><div className="container-tt grid gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><span className="eyebrow">FAQ</span><h2 className="display-2 mt-5 text-ink">Feature questions</h2><p className="lead mt-4">Need a closer look? <Link href="/contact" className="font-semibold text-primary">Book a demo</Link>.</p></div><div className="lg:col-span-8"><Accordion items={faqs} /></div></div></section>

      <CrossLinks title="Keep exploring" links={[{ href: "/features", label: "All features", sub: "See every TableTurnerr and FieldTask capability" }, { href: "/industries", label: "All industries", sub: "Find your home-service workflow" }, { href: "/integrations", label: "Integrations", sub: "Connect the tools your team uses" }]} />

      <section className="section"><div className="container-tt"><div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20"><div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" /><div className="relative mx-auto max-w-2xl"><h2 className="display-2 text-white">See {feature.title.toLowerCase()} in your workflow</h2><p className="lead mt-4 text-white/70">Start with a free trial or let us show you how this capability fits your team.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/signup" className="btn btn-light">Start free trial <ArrowRight className="h-4 w-4" /></Link><Link href="/contact" className="btn btn-outline-light">Book a demo</Link></div><p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60"><ShieldCheck className="h-4 w-4 text-success" />14 days free, with no contracts.</p></div></div></div></section>
    </>
  );
}
