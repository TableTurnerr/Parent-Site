import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";
import { getIntegration } from "@/app/lib/integrations";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIntegration(slug);
  return renderOgImage({
    eyebrow: `${i?.name ?? "Integration"} · Review automation`,
    title: i?.tagline ?? "Works with the tools you already run on",
    subtitle: "Connect in about a minute. Reviews on autopilot.",
  });
}
