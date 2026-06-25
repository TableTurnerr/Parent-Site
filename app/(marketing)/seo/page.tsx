import Link from "next/link";
import type { Metadata } from "next";
import { Check, ArrowRight, Search, MapPin, Globe, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Local SEO for Home Services",
  description:
    "Beyond review automation, TableTurnerr offers local SEO for home-services businesses: Google Business Profile optimization, local rankings, and website help for HVAC, roofing, plumbing and electrical pros.",
  alternates: { canonical: "https://www.tableturnerr.com/seo" },
};

const SERVICES = [
  { icon: MapPin, t: "Google Business Profile", b: "Optimize your profile, categories, photos and posts so you show up in the local map pack." },
  { icon: Search, t: "Local SEO", b: "Rank for the searches homeowners use in your service areas, so the right calls find you." },
  { icon: Globe, t: "Website help", b: "Fast, conversion-built pages for your trade that turn visitors into booked jobs." },
  { icon: FileText, t: "Content & on-page", b: "Service and area pages built to be found, so your site works while you're on the tools." },
];

export default function SeoPage() {
  return (
    <>
      <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative pb-14 md:pb-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Additional service</span>
            <h1 className="display mt-6 text-ink">Local SEO for home-services pros</h1>
            <p className="lead mt-6 max-w-2xl">
              Reviews get you chosen. SEO makes sure you get found in the first
              place. For home-services businesses that want the full picture, we
              also offer local SEO, Google Business Profile optimization, and
              website help, alongside our review automation platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">
                Talk to us about SEO <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/" className="btn btn-ghost">
                See our review platform
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted">
              Our primary product is review automation. SEO is a done-for-you
              add-on for clients who want it.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tt">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.t} className="card p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.b}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-line bg-surface p-7 md:p-10">
            <h2 className="display-2 text-ink">Reviews + SEO, working together</h2>
            <p className="lead mt-4 max-w-2xl">
              A steady stream of fresh reviews is one of the strongest local
              ranking signals there is. Pair our review automation with local
              SEO and you compound the effect: more reviews lift your map-pack
              rank, and better rankings put those reviews in front of more
              homeowners.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Built specifically for home-services trades",
                "Done-for-you, not another dashboard to manage",
                "Pairs directly with your review automation",
                "Focused on booked jobs, not vanity metrics",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {p}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-primary mt-9">
              Get an SEO quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
