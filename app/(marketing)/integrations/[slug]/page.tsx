import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IntegrationPage from "@/app/components/site/IntegrationPage";
import { getIntegration, INTEGRATION_SLUGS } from "@/app/lib/integrations";

export function generateStaticParams() {
  return INTEGRATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const it = getIntegration(slug);
  if (!it) return {};
  return {
    title: `${it.name} Review Automation Integration`,
    description: `Connect ${it.name} to TableTurnerr and turn every completed job into a 5-star review request across Google, Facebook, Yelp and Angi, automatically.`,
    alternates: { canonical: `https://www.tableturnerr.com/integrations/${it.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const it = getIntegration(slug);
  if (!it) notFound();
  return <IntegrationPage integration={it} />;
}
