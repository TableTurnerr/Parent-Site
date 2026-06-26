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
    title: `Review Automation in ${c.name}, ${c.stateCode}`,
    description: `Get more 5-star reviews for your ${c.name} home-services business. ${c.intro}`,
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
