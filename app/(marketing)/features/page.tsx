import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURES } from "@/app/lib/features";

export const metadata: Metadata = {
  title: "Home-Service Review Automation & Field Operations Features",
  description:
    "Explore TableTurnerr review automation and FieldTask operations features for home-service businesses: review requests, local visibility, dispatch, work orders and invoicing.",
  alternates: { canonical: "https://www.tableturnerr.com/features" },
};

export default function FeaturesPage() {
  const features = Object.values(FEATURES);

  return (
    <>
      <section className="hero-wash relative overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative"><div className="max-w-3xl"><span className="eyebrow">Product features</span><h1 className="display mt-6 text-ink">Everything your home-service team needs to build trust and keep work moving</h1><p className="lead mt-6 max-w-2xl">Explore every TableTurnerr review automation feature and the FieldTask operations tools that can support your team in the field.</p></div></div>
      </section>
      <section className="section pt-0"><div className="container-tt"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map((feature) => { const Icon = feature.icon; return <Link key={feature.slug} href={`/features/${feature.slug}`} className="card card-hover group flex h-full flex-col p-7"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>{feature.fieldTask && <span className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">With FieldTask</span>}<h2 className={`${feature.fieldTask ? "mt-2" : "mt-5"} text-xl font-bold text-ink`}>{feature.title}</h2><p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{feature.description}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">Explore feature <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>; })}</div><div className="mt-10 rounded-2xl border border-line bg-surface p-7 text-center md:p-9"><h2 className="text-lg font-bold text-ink">Want to see these features in your workflow?</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">Browse the industries we serve to see the features that fit your team’s work, or book a demo for a guided walkthrough.</p><div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/industries" className="btn btn-ghost">Browse industries</Link><Link href="/contact" className="btn btn-primary">Book a demo <ArrowRight className="h-4 w-4" /></Link></div></div></div></section>
    </>
  );
}
