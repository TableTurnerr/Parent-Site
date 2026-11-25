import type { Metadata } from "next";
import { pageTitle } from "@/app/lib/metadata";
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
    // Matches how owners search ("what review software integrates with Workiz" ranked #5.6 with 0 clicks in GSC).
    title: pageTitle(`Review Software That Integrates With ${it.name}`),
    description: `TableTurnerr integrates with ${it.name}: every completed job triggers a Google review request by text or email, with follow-ups. Self-serve or done for you.`,
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
