import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";
import { getTool } from "@/app/lib/growth/tools";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = getTool(slug);
  return renderOgImage({
    eyebrow: "Free tool",
    title: x?.title?.replace(/\s*\|\s*TableTurnerr$/, "") ?? "Free marketing tools",
    subtitle: "Free for home-service businesses.",
  });
}
