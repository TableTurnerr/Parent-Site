import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";
import { getGuide } from "@/app/lib/growth";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = getGuide(slug);
  return renderOgImage({
    eyebrow: "Guide",
    title: x?.title?.replace(/\s*\|\s*TableTurnerr$/, "") ?? "Guides for home-service owners",
    subtitle: "Practical steps for home-service owners.",
  });
}
