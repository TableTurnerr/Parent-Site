import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AlternativePage from "@/app/components/site/AlternativePage";
import { getAlternative, ALTERNATIVE_SLUGS } from "@/app/lib/alternatives";

export function generateStaticParams() {
  return ALTERNATIVE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const alt = getAlternative(slug);
  if (!alt) return {};
  return {
    title: alt.metaTitle,
    description: alt.metaDescription,
    alternates: { canonical: `https://www.tableturnerr.com/alternatives/${alt.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const alt = getAlternative(slug);
  if (!alt) notFound();
  return <AlternativePage alt={alt} />;
}
