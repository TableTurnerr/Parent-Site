import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { INDUSTRIES } from "@/app/lib/industries";

export const metadata: Metadata = {
  title: "Review Management Software by Home-Service Industry",
  description:
    "See how TableTurnerr review management software fits HVAC, plumbing, roofing, electrical, landscaping, cleaning and more home-service industries.",
  alternates: { canonical: "https://www.tableturnerr.com/industries" },
};

export default function IndustriesPage() {
  const industries = Object.values(INDUSTRIES);
  return (
    <>
      <section className="hero-wash relative overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20"><div aria-hidden className="hero-grid pointer-events-none absolute inset-0" /><div className="container-tt relative"><div className="max-w-3xl"><span className="eyebrow">By industry</span><h1 className="display mt-6 text-ink">Review management built around your industry</h1><p className="lead mt-6 max-w-2xl">Every home-service workflow has a different moment to ask for feedback and a different set of tools that help the team move. Explore the page made for yours.</p></div></div></section>
      <section className="section pt-0"><div className="container-tt"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{industries.map((industry) => <Link key={industry.slug} href={`/industries/${industry.slug}`} className="card card-hover group flex h-full flex-col p-7"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><Wrench className="h-5 w-5" /></span><h2 className="mt-5 text-lg font-bold text-ink">{industry.name}</h2><p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{industry.heroSub}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">See {industry.name} features <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div><div className="mt-10 rounded-2xl border border-line bg-surface p-7 text-center md:p-9"><h2 className="text-lg font-bold text-ink">Don&apos;t see your industry?</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">If your team completes jobs and wants a more consistent way to build customer proof, we can help you find the right workflow.</p><Link href="/contact" className="btn btn-ghost mt-5">Talk to us <ArrowRight className="h-4 w-4" /></Link></div></div></section>
    </>
  );
}
