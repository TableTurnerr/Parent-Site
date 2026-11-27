import Link from "next/link";
import { Check, ArrowRight, MapPin } from "lucide-react";
import MapPackClimb from "@/app/components/site/MapPackClimb";
import JsonLd from "@/app/components/site/JsonLd";
import { generateCityServiceSchema, generateBreadcrumbSchema } from "@/app/lib/schema";
import { INDUSTRIES } from "@/app/lib/industries";
import { ClientProof, DoneForYouBand, TradeChips } from "@/app/components/growth/Growth";
import { DFW_SLUGS, TEXAS_CLIENTS } from "@/app/lib/growth/clients";
import { REVIEW_CITIES, type ReviewCity } from "@/app/lib/review-cities";

const STEPS = [
  { n: "01", t: "Connect your CRM", b: "Link Jobber, Housecall Pro, ServiceTitan, Workiz or QuickBooks in a click." },
  { n: "02", t: "Launch reactivation", b: "We message past customers and request a review from every completed job." },
  { n: "03", t: "Climb local search", b: "Reviews roll in, your map-pack rank rises, and more nearby calls come in." },
];

export default function CityPage({ city }: { city: ReviewCity }) {
  const nearby = REVIEW_CITIES.filter((c) => c.slug !== city.slug).slice(0, 6);
  const industries = Object.values(INDUSTRIES);
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
                <Link href="/free-google-maps-audit" className="btn btn-primary">
                  Get your free Google Maps audit <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="tel:+13323331008" className="btn btn-ghost">Call (332) 333-1008</a>
              </div>
              <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
                {["Done for you", "No contracts", "Texas clients in Richardson and Dallas"].map((t) => (
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

      <ClientProof
        clients={TEXAS_CLIENTS}
        title={DFW_SLUGS.has(city.slug) ? `Texas clients right here in Dallas–Fort Worth` : "Texas businesses we already work with"}
        intro={DFW_SLUGS.has(city.slug)
          ? `Our Texas clients are in Richardson and Dallas, in the same metro as ${city.name}. We know how crowded DFW's map results are.`
          : `Our Texas clients are in Richardson and Dallas. For ${city.name}, we start the same way: a free Google Maps audit of where you rank against the top competitors in town.`}
      />

      {/* Industries */}
      <section className="section">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Industries we serve in {city.name}</span>
            <h2 className="display-2 mt-5 text-ink">Built for {city.name}&apos;s home-service industries</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {industries.map((t) => (
              <Link
                key={t.slug}
                href={`/industries/${t.slug}`}
                className="card card-hover group flex items-center justify-between p-5"
              >
                <span className="font-bold text-ink">{t.name}</span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
          <p className="mt-10 text-center text-sm font-semibold text-ink">Rather we run it for you? Done-for-you marketing plans by trade:</p>
          <div className="flex justify-center"><TradeChips /></div>
        </div>
      </section>

      {/* How */}
      <section className="section bg-night text-white">
        <div className="container-tt">
          <div className="max-w-2xl">
            <span className="eyebrow border-white/15 bg-white/5 text-white">How it works</span>
            <h2 className="display-2 mt-5 text-white">Set up for you, then working on autopilot</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <p className="font-display text-sm font-bold text-white/70">{s.n}</p>
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

      <DoneForYouBand tradePath="/marketing" label="Marketing plans by trade" />
      {/* CTA */}
      <section className="section pt-0">
        <div className="container-tt">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative mx-auto max-w-2xl">
              <div className="stars mb-5 text-2xl" aria-hidden>★★★★★</div>
              <h2 className="display-2 text-white">Become {city.name}&apos;s most-reviewed home-services company</h2>
              <p className="lead mt-4 text-white/70">
                We turn your {city.name} jobs into 5-star reviews for you. Start with a free Google Maps audit.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/free-google-maps-audit" className="btn btn-light">Get your free audit <ArrowRight className="h-4 w-4" /></Link>
                <a href="https://portalapi.tableturnerr.com/widget/bookings/tableturnerr" className="btn btn-outline-light">Book a 15-minute call</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
