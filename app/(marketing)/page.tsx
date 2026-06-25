import Link from "next/link";
import type { Metadata } from "next";
import {
  Star, MessageSquareText, Repeat2, Trophy, BarChart3, Bot, Globe2,
  Wrench, Home, Droplets, Zap, Check, ArrowRight, ShieldCheck, Plug,
} from "lucide-react";
import MapPackClimb from "@/app/components/site/MapPackClimb";

export const metadata: Metadata = {
  title: "TableTurnerr — Review Automation for Home Services",
  description:
    "Turn every finished job into 5-star reviews and more booked work. Review automation built for HVAC, roofing, plumbing & electrical pros. Multi-platform, technician leaderboards, map-pack rank tracking. Start a free trial.",
};

/* ── Hero ───────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero-wash relative overflow-hidden pt-32 md:pt-40">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div className="container-tt relative pb-16 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <span className="eyebrow">Review automation for home services</span>
            <h1 className="display mt-6 text-ink">
              Turn finished jobs into{" "}
              <span className="text-primary">5-star reviews</span> and more
              booked work.
            </h1>
            <p className="lead mt-6 max-w-xl">
              TableTurnerr automatically asks every customer for a review the
              moment the job is done, across Google, Facebook, Yelp and Angi, so
              you climb the map pack and get chosen first. Built for HVAC,
              roofing, plumbing and electrical pros.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="btn btn-primary">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#how" className="btn btn-ghost">
                See how it works
              </Link>
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
            <MapPackClimb />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stat strip ─────────────────────────────────────────── */
const STATS = [
  { v: "4×", l: "more reviews in the first 90 days" },
  { v: "≤24h", l: "to your first new reviews" },
  { v: "4", l: "review platforms, not just Google" },
  { v: "15 min", l: "to connect your CRM and launch" },
];
function Stats() {
  return (
    <section className="border-y border-line bg-white">
      <div className="container-tt grid grid-cols-2 gap-8 py-10 md:grid-cols-4 md:py-12">
        {STATS.map((s) => (
          <div key={s.l} className="text-center md:text-left">
            <p className="font-display text-3xl font-bold text-ink md:text-4xl">{s.v}</p>
            <p className="mt-1.5 text-sm leading-snug text-ink-soft">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Problem ────────────────────────────────────────────── */
const PROBLEMS = [
  { t: "Your best jobs leave no proof", b: "You do great work all week, but only a handful of customers ever leave a review, so it never shows online." },
  { t: "Asking is awkward and gets forgotten", b: "Your techs are busy. Chasing customers for reviews after a job falls off the list every single time." },
  { t: "The competition ranks above you", b: "Whoever has the most recent 5-star reviews wins the map pack and the call, even when your work is better." },
];
function Problem() {
  return (
    <section className="section bg-surface">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The reviews gap</span>
          <h2 className="display-2 mt-5 text-ink">Great work that nobody can see isn&apos;t winning you jobs</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div key={p.t} className="card p-7">
              <h3 className="text-lg font-bold text-ink">{p.t}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features (our wedge vs ReviewHarvest) ──────────────── */
const FEATURES = [
  { icon: Repeat2, t: "Review Reactivation", b: "Launch with a polite blast to your entire past-customer list. Most shops get a wave of fresh reviews in the first week." },
  { icon: Globe2, t: "Every platform, not just Google", b: "Route happy customers to Google, Facebook, Yelp and Angi, the places home-services buyers actually check." },
  { icon: Trophy, t: "Technician leaderboards", b: "Attribute reviews to the tech who did the job. Turn reviews into a friendly competition your crew actually enjoys." },
  { icon: BarChart3, t: "Map-pack rank tracking", b: "See your local-pack rank move week over week, not just a review count. Tie reviews to the jobs they win." },
  { icon: Bot, t: "AI requests & replies", b: "Personalized, name-on-the-photo requests by text and email, plus AI that replies to every review for you." },
  { icon: MessageSquareText, t: "Widgets & auto social posts", b: "Show your best reviews on your site and turn every 5-star into a branded Facebook and Instagram post automatically." },
];
function Features() {
  return (
    <section id="features" className="section">
      <div className="container-tt">
        <div className="max-w-2xl">
          <span className="eyebrow">Built for the trades</span>
          <h2 className="display-2 mt-5 text-ink">Everything you need to own your local market</h2>
          <p className="lead mt-4">Not a generic reputation tool with a home-services coat of paint. Built around how trades actually win work.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="card card-hover p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How it works ───────────────────────────────────────── */
const STEPS = [
  { n: "01", t: "Connect your CRM", b: "Link Jobber, Housecall Pro, ServiceTitan, Workiz or QuickBooks in a couple of clicks. We import your customers." },
  { n: "02", t: "Launch reactivation", b: "We message your past customers gradually and start requesting reviews from every new completed job automatically." },
  { n: "03", t: "Climb & get booked", b: "Reviews roll in across platforms, your map-pack rank rises, and more of the right calls start coming in." },
];
function How() {
  return (
    <section id="how" className="section bg-night text-white">
      <div className="container-tt">
        <div className="max-w-2xl">
          <span className="eyebrow border-white/15 bg-white/5 text-white">Set it once</span>
          <h2 className="display-2 mt-5 text-white">Live in 15 minutes. Working on autopilot after that.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <p className="font-display text-sm font-bold text-primary">{s.n}</p>
              <h3 className="mt-4 text-xl font-bold text-white">{s.t}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/65">{s.b}</p>
            </div>
          ))}
        </div>
        <div id="integrations" className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55">
          <span className="inline-flex items-center gap-2 font-medium text-white/80"><Plug className="h-4 w-4 text-primary" /> Connects with</span>
          {["Jobber", "Housecall Pro", "ServiceTitan", "Workiz", "QuickBooks", "Zapier"].map((i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Trades ─────────────────────────────────────────────── */
const TRADES = [
  { icon: Wrench, t: "HVAC", href: "/trades/hvac" },
  { icon: Home, t: "Roofing", href: "/trades/roofing" },
  { icon: Droplets, t: "Plumbing", href: "/trades/plumbing" },
  { icon: Zap, t: "Electrical", href: "/trades/electrical" },
];
function Trades() {
  return (
    <section id="trades" className="section">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Made for your trade</span>
          <h2 className="display-2 mt-5 text-ink">Big-ticket trades, big-ticket reviews</h2>
          <p className="lead mt-4">One bad month of reviews can cost a high-ticket trade real jobs. We focus where reviews matter most.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
          {TRADES.map((t) => (
            <Link key={t.t} href={t.href} className="card card-hover group flex flex-col items-start p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <t.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{t.t}</h3>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                See {t.t} reviews <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ────────────────────────────────────────────── */
const PLANS = [
  { name: "Starter", price: "$99", per: "/mo", note: "Up to 50 review requests/mo", popular: false,
    features: ["Google + Facebook reviews", "Review reactivation", "Automated text & email requests", "Review widgets", "Unlimited users"] },
  { name: "Growth", price: "$179", per: "/mo", note: "Up to 150 review requests/mo", popular: true,
    features: ["Everything in Starter", "Yelp + Angi routing", "Technician leaderboards", "AI requests & replies", "Auto social posts", "1-on-1 setup call"] },
  { name: "Pro", price: "$299", per: "/mo", note: "Up to 400 review requests/mo", popular: false,
    features: ["Everything in Growth", "Map-pack rank tracking", "Multi-location dashboard", "Monthly owner report", "Priority support"] },
];
function Pricing() {
  return (
    <section id="pricing" className="section bg-surface">
      <div className="container-tt">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Simple, honest pricing</span>
          <h2 className="display-2 mt-5 text-ink">Pick a plan. Cancel anytime.</h2>
          <p className="lead mt-4">14-day free trial. No setup fees, no contracts, no surprises.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`card relative flex flex-col p-7 ${p.popular ? "border-primary shadow-[0_30px_70px_-40px_rgba(37,99,235,0.5)] ring-1 ring-primary" : ""}`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-bold text-ink">{p.name}</h3>
              <p className="mt-3">
                <span className="font-display text-4xl font-bold text-ink">{p.price}</span>
                <span className="text-ink-soft">{p.per}</span>
              </p>
              <p className="mt-1 text-sm text-muted">{p.note}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`btn mt-7 w-full ${p.popular ? "btn-primary" : "btn-ghost"}`}
              >
                Start free trial
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-soft">
          <ShieldCheck className="h-4 w-4 text-success" /> More reviews in 90 days or your next month is free.
        </p>
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────────── */
const FAQS = [
  { q: "How fast will I see new reviews?", a: "Most shops see their first new reviews within 24 hours of launching review reactivation, with a steady stream from new jobs after that." },
  { q: "Which platforms do you collect reviews on?", a: "Google, Facebook, Yelp and Angi, the places home-services customers actually check before they call. Most tools only do Google." },
  { q: "Does it work with my software?", a: "Yes. We connect natively to Jobber, Housecall Pro, ServiceTitan, Workiz and QuickBooks, plus thousands more through Zapier." },
  { q: "Do I need a contract?", a: "No. Start with a 14-day free trial, no credit card required, and cancel anytime from your dashboard in a couple of clicks." },
  { q: "Can my techs get credit for their reviews?", a: "Yes. Technician leaderboards attribute each review to the person who did the job, which is a great way to motivate your crew." },
];
function FAQ() {
  return (
    <section className="section">
      <div className="container-tt grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="eyebrow">FAQ</span>
          <h2 className="display-2 mt-5 text-ink">Questions, answered</h2>
          <p className="lead mt-4">Still unsure? <Link href="/contact" className="font-semibold text-primary">Talk to us</Link>.</p>
        </div>
        <div className="lg:col-span-8">
          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((f) => (
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
  );
}

/* ── Final CTA ──────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="section">
      <div className="container-tt">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
          <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-2xl">
            <div className="stars mb-5 text-2xl" aria-hidden>★★★★★</div>
            <h2 className="display-2 text-white">Start collecting reviews this week</h2>
            <p className="lead mt-4 text-white/70">
              Connect your CRM, launch reactivation, and watch the reviews and
              the calls roll in. Free for 14 days.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/signup" className="btn btn-light">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-outline-light">
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Problem />
      <Features />
      <How />
      <Trades />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
