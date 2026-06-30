import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Star, Target, Wrench, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "About TableTurnerr" },
  description:
    "TableTurnerr is review automation built for home-service pros, HVAC, roofing, plumbing and electrical. We turn finished jobs into 5-star reviews so the best companies get found.",
  alternates: { canonical: "https://www.tableturnerr.com/about" },
};

const VALUES = [
  { icon: Wrench, t: "Built for the trades, not everyone", b: "We don't try to serve every business on earth. We go deep on home services, where reviews decide who gets the call." },
  { icon: Zap, t: "Automation that just runs", b: "Set it once, connect your CRM, and it works in the background. Your team should be on the tools, not chasing reviews." },
  { icon: Star, t: "Reviews that win real jobs", b: "Not vanity metrics. More recent 5-star reviews mean a higher map-pack rank and more booked, high-ticket work." },
  { icon: Target, t: "No lock-in, no games", b: "Month-to-month, cancel anytime, and a results guarantee. We earn the renewal every month." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-wash relative overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative">
          <div className="max-w-3xl">
            <span className="eyebrow">About us</span>
            <h1 className="display mt-6 text-ink">
              The best home-services pros deserve to be the easiest to find.
            </h1>
            <p className="lead mt-6 max-w-2xl">
              TableTurnerr is review automation built for one world: home services.
              HVAC, roofing, plumbing, electrical. We help great companies turn the
              work they already do into the 5-star reviews that win the next job.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section pt-0">
        <div className="container-tt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">Why we exist</span>
            <h2 className="display-2 mt-5 text-ink">Great work shouldn&apos;t stay invisible</h2>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-4 text-ink-soft">
              <p className="text-lg leading-relaxed">
                Here&apos;s what we kept seeing: the best contractor in town,
                doing careful, honest work all week, sitting below a louder
                competitor on Google because that competitor simply had more
                recent reviews.
              </p>
              <p className="leading-relaxed">
                Homeowners don&apos;t see the quality of your work before they
                call. They see your star rating, your review count, and how
                recent those reviews are. Whoever wins that snapshot wins the
                job, even when their work is worse.
              </p>
              <p className="leading-relaxed">
                Asking every customer for a review by hand never scales. Techs
                are busy, the moment passes, and the reviews never come. So we
                built the thing that does it automatically, the second a job is
                done, across every platform that matters. The result: the
                companies that earn 5-star work finally look like it online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-surface">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">What we believe</span>
            <h2 className="display-2 mt-5 text-ink">How we think about the work</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.t} className="card flex gap-4 p-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <v.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-tt">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="display-2 text-white">See what review automation does for your shop</h2>
              <p className="lead mt-4 text-white/70">
                Connect your CRM and watch the reviews, and the calls, start rolling in. Free for 14 days.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/signup" className="btn btn-light">Start free trial <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/contact" className="btn btn-outline-light">Book a demo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
