import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import MapPackClimb from "@/app/components/site/MapPackClimb";
import JsonLd from "@/app/components/site/JsonLd";
import { generateCityServiceSchema, generateBreadcrumbSchema } from "@/app/lib/schema";
import { TRADES } from "@/app/lib/trades";
import { REVIEW_CITIES, type ReviewCity } from "@/app/lib/review-cities";

const STEPS = [
  { n: "01", t: "Connect your CRM", b: "Link Jobber, Housecall Pro, ServiceTitan, Workiz or QuickBooks in a click." },
  { n: "02", t: "Launch reactivation", b: "We message past customers and request a review from every completed job." },
  { n: "03", t: "Climb local search", b: "Reviews roll in, your map-pack rank rises, and more nearby calls come in." },
];

export default function CityPage({ city }: { city: ReviewCity }) {
  const nearby = REVIEW_CITIES.filter((c) => c.slug !== city.slug).slice(0, 6);
  const trades = Object.values(TRADES);
  const base = "https://www.tableturnerr.com";

  return (
    <>
      <JsonLd
        data={[
          generateCityServiceSchema({
            serviceName: "Review Automation for Home Services",
            description: city.intro,
            url: `${base}/locations/${city.slug}`,
            city: { name: city.name, state: city.state, lat: city.lat, lng: city.lng },
          }),
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Locations", url: `${base}/locations` },
            { name: city.name, url: `${base}/locations/${city.slug}` },
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
            <Link href="/locations" className="hover:text-ink">Locations</Link>
            <span>/</span>
            <span className="font-medium text-ink">{city.name}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
            <div>
              <span className="eyebrow inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {city.name}, {city.stateCode}
              </span>
              <h1 className="display mt-6 text-ink">
                More 5-star reviews for {city.name} home-services pros
              </h1>
              <p className="lead mt-6 max-w-xl">{city.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup" className="btn btn-primary">
                  Start free trial <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="btn btn-ghost">Book a demo</Link>
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
              <MapPackClimb query={`home services ${city.name}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Local market */}
      <section className="section bg-surface">
        <div className="container-tt grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow">The {city.name} market</span>
            <h2 className="display-2 mt-5 text-ink">Win the searches that matter in {city.name}</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink-soft">{city.market}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Whoever shows up in {city.name}&apos;s top three map results with the most recent
              five-star reviews wins the call, every time. TableTurnerr makes earning those
              reviews automatic, so your reputation online finally matches the quality of your work.
            </p>
          </div>
        </div>
      </section>

      {/* Trades */}
      <section className="section">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Trades we serve in {city.name}</span>
            <h2 className="display-2 mt-5 text-ink">Built for {city.name}&apos;s home-services trades</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {trades.map((t) => (
              <Link
                key={t.slug}
                href={`/trades/${t.slug}`}
                className="card card-hover group flex items-center justify-between p-5"
              >
                <span className="font-bold text-ink">{t.name}</span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="section bg-night text-white">
        <div className="container-tt">
          <div className="max-w-2xl">
            <span className="eyebrow border-white/15 bg-white/5 text-white">How it works</span>
            <h2 className="display-2 mt-5 text-white">Live in 15 minutes, working on autopilot</h2>
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
        </div>
      </section>

      {/* Nearby */}
      <section className="section">
        <div className="container-tt">
          <h2 className="text-lg font-bold text-ink">Nearby Texas markets we serve</h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {nearby.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-primary"
              >
                <MapPin className="h-3.5 w-3.5" /> {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-tt">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative mx-auto max-w-2xl">
              <div className="stars mb-5 text-2xl" aria-hidden>★★★★★</div>
              <h2 className="display-2 text-white">Become {city.name}&apos;s most-reviewed home-services company</h2>
              <p className="lead mt-4 text-white/70">
                Connect your CRM and start turning {city.name} jobs into 5-star reviews. Free for 14 days.
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
