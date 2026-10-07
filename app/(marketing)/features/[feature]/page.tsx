import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FeaturePage from "@/app/components/site/FeaturePage";
import { FEATURE_SLUGS, getFeature } from "@/app/lib/features";

export function generateStaticParams() {
  return FEATURE_SLUGS.map((feature) => ({ feature }));
}

export async function generateMetadata({ params }: { params: Promise<{ feature: string }> }): Promise<Metadata> {
  const { feature } = await params;
  const item = getFeature(feature);
  if (!item) return {};
  return {
    title: item.seoTitle,
    description: item.metaDescription,
    alternates: { canonical: `https://www.tableturnerr.com/features/${item.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ feature: string }> }) {
  const { feature } = await params;
  const item = getFeature(feature);
  if (!item) notFound();
  return <FeaturePage feature={item} />;
}
