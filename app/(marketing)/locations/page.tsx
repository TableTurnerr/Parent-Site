import Link from "next/link";
import type { Metadata } from "next";
import { pageTitle } from "@/app/lib/metadata";
import { MapPin, ArrowRight } from "lucide-react";
import { REVIEW_CITIES } from "@/app/lib/review-cities";
import { AuditBand, ClientProof } from "@/app/components/growth/Growth";
import { TEXAS_CLIENTS } from "@/app/lib/growth/clients";

export const metadata: Metadata = {
  title: pageTitle("Home-Service Marketing in Texas: Cities We Serve"),
  description:
    "Google reviews, Maps visibility and done-for-you marketing for Texas home-service businesses in Houston, Dallas, San Antonio, Austin and more. Free audit.",
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
            <h1 className="display mt-6 text-ink">Home-service marketing across Texas</h1>
            <p className="lead mt-6 max-w-2xl">
              Texas home-services competition is fierce, and reviews decide who gets the
              call. We already work with Texas businesses in Richardson and Dallas. Pick your
              city to see the local market, or start with a free Google Maps audit of where you
              rank against the top competitors in town.
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
      <ClientProof clients={TEXAS_CLIENTS} title="Texas businesses we already work with" />
      <AuditBand title="See where you rank in your Texas market" />
    </>
  );
}
