import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, ArrowRight } from "lucide-react";
import { REVIEW_CITIES } from "@/app/lib/review-cities";

export const metadata: Metadata = {
  title: "Texas Locations We Serve",
  description:
    "Review automation for home-service businesses across Texas: Houston, Dallas, San Antonio, Austin, Fort Worth and more. Turn finished jobs into 5-star reviews.",
  alternates: { canonical: "https://www.tableturnerr.com/locations" },
};

export default function LocationsIndex() {
  return (
    <>
      <section className="hero-wash relative overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative">
          <div className="max-w-3xl">
            <span className="eyebrow">Locations</span>
            <h1 className="display mt-6 text-ink">Review automation across Texas</h1>
            <p className="lead mt-6 max-w-2xl">
              We launched in Texas, where home-services competition is fierce and reviews
              decide who gets the call. Pick your city to see how TableTurnerr helps local
              HVAC, roofing, plumbing and electrical pros climb the map pack, and if you&apos;re
              outside these markets, reach out anyway, we&apos;re expanding fast.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-tt">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEW_CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="card card-hover group flex items-center justify-between p-6"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{c.name}</span>
                    <span className="block text-xs text-muted">{c.state}</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
