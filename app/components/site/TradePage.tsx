import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, Plug } from "lucide-react";
import MapPackClimb from "@/app/components/site/MapPackClimb";
import type { Trade } from "@/app/lib/trades";

const STEPS = [
  { n: "01", t: "Connect your CRM", b: "Link your field-service software in a couple of clicks. We import your customers." },
  { n: "02", t: "Launch reactivation", b: "We message your past customers and request a review from every new completed job." },
  { n: "03", t: "Climb & get booked", b: "Reviews roll in across platforms, your map-pack rank rises, and more calls come in." },
];

export default function TradePage({ trade }: { trade: Trade }) {
  return (
    <>
      {/* Hero */}
      <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative pb-16 md:pb-24">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <Link href="/#trades" className="hover:text-ink">Trades</Link>
            <span>/</span>
            <span className="font-medium text-ink">{trade.name}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
            <div>
              <span className="eyebrow">{trade.name} · Review automation</span>
              <h1 className="display mt-6 text-ink">{trade.heroTitle}</h1>
              <p className="lead mt-6 max-w-xl">{trade.heroSub}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup" className="btn btn-primary">
                  Start free trial <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/#how" className="btn btn-ghost">See how it works</Link>
              </div>
              <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
                {["14-day free trial", "No contracts", "Setup in 15 minutes"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pl-6">
              <MapPackClimb query={trade.query} />
            </div>
          </div>
        </div>
      </section>

      {/* Pains */}
      <section className="section bg-surface">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why it matters</span>
            <h2 className="display-2 mt-5 text-ink">
              Reviews make or break a {trade.noun}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {trade.pains.map((p) => (
              <div key={p.t} className="card p-7">
                <h3 className="text-lg font-bold text-ink">{p.t}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section">
        <div className="container-tt grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">What you get</span>
            <h2 className="display-2 mt-5 text-ink">
              Built for how {trade.name.toLowerCase()} pros actually win work
            </h2>
            <ul className="mt-8 space-y-4">
              {trade.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-[0.97rem] leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
            <Link href="/signup" className="btn btn-primary mt-9">
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* How it works mini */}
          <div className="rounded-[1.5rem] border border-line bg-night p-7 text-white md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Set it once</p>
            <div className="mt-6 space-y-5">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span className="font-display text-sm font-bold text-primary">{s.n}</span>
                  <div>
                    <p className="font-bold text-white">{s.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{s.b}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-5 text-xs text-white/55">
              <span className="inline-flex items-center gap-1.5 font-medium text-white/80"><Plug className="h-3.5 w-3.5 text-primary" /> Connects with</span>
              {["Jobber", "Housecall Pro", "ServiceTitan", "Workiz"].map((i) => <span key={i}>{i}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-surface">
        <div className="container-tt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">FAQ</span>
            <h2 className="display-2 mt-5 text-ink">{trade.name} questions</h2>
            <p className="lead mt-4">
              More questions? <Link href="/contact" className="font-semibold text-primary">Talk to us</Link>.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-line border-y border-line">
              {trade.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                    {f.q}
                    <span className="text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-tt">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative mx-auto max-w-2xl">
              <div className="stars mb-5 text-2xl" aria-hidden>★★★★★</div>
              <h2 className="display-2 text-white">Win more {trade.name.toLowerCase()} jobs with reviews on autopilot</h2>
              <p className="lead mt-4 text-white/70">
                Connect your CRM, launch reactivation, and watch the reviews and the calls roll in. Free for 14 days.
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
