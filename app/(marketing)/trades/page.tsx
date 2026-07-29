import Link from "next/link";
import type { Metadata } from "next";
import { Wrench, Home, Droplets, Zap, ArrowRight, ArrowUpRight } from "lucide-react";
import { TRADES } from "@/app/lib/trades";

export const metadata: Metadata = {
  title: "Review Automation for Home-Service Trades",
  description:
    "Review automation for home-service trades. See how it works for HVAC, roofing, plumbing and electrical: turn completed jobs into 5-star reviews, automatically.",
  alternates: { canonical: "https://www.tableturnerr.com/trades" },
};

const ICONS: Record<string, typeof Wrench> = {
  hvac: Wrench,
  roofing: Home,
  plumbing: Droplets,
  electrical: Zap,
};

const ITEMS = Object.values(TRADES);

export default function TradesIndex() {
  return (
    <>
      <section className="hero-wash relative overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative">
          <div className="max-w-3xl">
            <span className="eyebrow">By trade</span>
            <h1 className="display mt-6 text-ink">
              Review automation built for your trade
            </h1>
            <p className="lead mt-6 max-w-2xl">
              Big-ticket home-service jobs live and die by reviews. TableTurnerr
              turns every completed job into fresh 5-star reviews across Google,
              Facebook, Yelp and Angi, with technician leaderboards and map-pack
              tracking tuned to how your trade actually wins work.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-tt">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ITEMS.map((t) => {
              const Icon = ICONS[t.slug] ?? Wrench;
              return (
                <Link
                  key={t.slug}
                  href={`/trades/${t.slug}`}
                  className="card card-hover group flex h-full flex-col p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="mt-5 flex items-center gap-2">
                    <h2 className="text-lg font-bold text-ink">{t.name}</h2>
                    <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{t.heroSub}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    See {t.name} reviews <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-surface p-7 text-center md:p-9">
            <h2 className="text-lg font-bold text-ink">Another home-service trade?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
              Garage doors, pest control, landscaping, painting, cleaning and more:
              if you run jobs and want more reviews, TableTurnerr works for you too.
            </p>
            <Link href="/contact" className="btn btn-ghost mt-5">
              Ask about your trade <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
