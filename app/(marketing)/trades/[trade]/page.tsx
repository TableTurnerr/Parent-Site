import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TradePage from "@/app/components/site/TradePage";
import { getTrade, TRADE_SLUGS } from "@/app/lib/trades";

export function generateStaticParams() {
  return TRADE_SLUGS.map((trade) => ({ trade }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trade: string }>;
}): Promise<Metadata> {
  const { trade } = await params;
  const t = getTrade(trade);
  if (!t) return {};
  return {
    title: `${t.name} Review Automation`,
    description: `Review automation for your ${t.noun}. Turn every completed job into 5-star reviews across Google, Facebook, Yelp and Angi, automatically.`,
    alternates: { canonical: `https://www.tableturnerr.com/trades/${t.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ trade: string }>;
}) {
  const { trade } = await params;
  const t = getTrade(trade);
  if (!t) notFound();
  return <TradePage trade={t} />;
}
