import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/app/components/site/CityPage";
import { getReviewCity, REVIEW_CITY_SLUGS } from "@/app/lib/review-cities";

export function generateStaticParams() {
  return REVIEW_CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const c = getReviewCity(city);
  if (!c) return {};
  return {
    title: `Home-Service Marketing in ${c.name}, ${c.stateCode}`,
    description: `More Google reviews and map-pack visibility for ${c.name} home-service businesses, done for you or self-serve. Get a free Google Maps audit.`,
    alternates: { canonical: `https://www.tableturnerr.com/locations/${c.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const c = getReviewCity(city);
  if (!c) notFound();
  return <CityPage city={c} />;
}
