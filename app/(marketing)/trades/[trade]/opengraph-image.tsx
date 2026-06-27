import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";
import { getTrade } from "@/app/lib/trades";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ trade: string }> }) {
  const { trade } = await params;
  const t = getTrade(trade);
  return renderOgImage({
    eyebrow: `${t?.name ?? "Home services"} · Review automation`,
    title: t?.heroTitle ?? "Turn finished jobs into 5-star reviews",
  });
}
