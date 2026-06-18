import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CostPageView from "@/app/components/templates/CostPageView";
import { createPageMetadata } from "@/app/lib/metadata";
import { COST_PAGES, COST_PAGE_LIST } from "@/app/lib/cost-data";

export function generateStaticParams() {
  return COST_PAGE_LIST.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = COST_PAGES[slug];
  if (!page) return {};

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/pricing/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function CostGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = COST_PAGES[slug];
  if (!page) notFound();

  return <CostPageView page={page} />;
}
