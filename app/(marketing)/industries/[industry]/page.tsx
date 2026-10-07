import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPage from "@/app/components/site/IndustryPage";
import { getIndustry, INDUSTRY_SLUGS } from "@/app/lib/industries";

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const item = getIndustry(industry);
  if (!item) return {};
  return { title: item.seoTitle, description: item.metaDescription, alternates: { canonical: `https://www.tableturnerr.com/industries/${item.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const item = getIndustry(industry);
  if (!item) notFound();
  return <IndustryPage industry={item} />;
}
