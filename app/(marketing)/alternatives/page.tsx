import Link from "next/link";
import type { Metadata } from "next";
import { Scale, ArrowRight, ArrowUpRight } from "lucide-react";
import { ALL_ALTERNATIVES } from "@/app/lib/alternatives";

export const metadata: Metadata = {
  title: "Compare Review Automation Tools",
  description:
    "See how TableTurnerr compares to Birdeye, NiceJob, Podium, GatherUp and PulseM: multi-platform review automation for the trades, with no contracts.",
  alternates: { canonical: "https://www.tableturnerr.com/alternatives" },
};

export default function AlternativesIndex() {
  return (
    <>
      <section className="hero-wash relative overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative">
          <div className="max-w-3xl">
            <span className="eyebrow">Compare</span>
            <h1 className="display mt-6 text-ink">
              How TableTurnerr compares to other review tools
            </h1>
            <p className="lead mt-6 max-w-2xl">
              Most review tools are built for enterprise chains or general small
              businesses. TableTurnerr is built for home-service trades, with
              multi-platform reviews, technician leaderboards, map-pack tracking,
              and no contracts. Here&apos;s how we stack up.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-tt">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_ALTERNATIVES.map((a) => (
              <Link
                key={a.slug}
                href={`/alternatives/${a.slug}`}
                className="card card-hover group flex h-full flex-col p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Scale className="h-5 w-5" />
                </span>
                <div className="mt-5 flex items-center gap-2">
                  <h2 className="text-lg font-bold text-ink">vs {a.competitor}</h2>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">{a.category}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{a.tagline}.</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Compare with {a.competitor} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}

            <div className="card flex h-full flex-col justify-center p-7">
              <h2 className="text-lg font-bold text-ink">Using something else?</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Tell us what review tool you run on today and we&apos;ll show you
                exactly what changes when you switch to TableTurnerr.
              </p>
              <Link href="/contact" className="btn btn-ghost mt-5 w-fit">
                Ask us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
