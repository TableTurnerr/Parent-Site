import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";
import { getTrade } from "@/app/lib/growth";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = getTrade(slug);
  return renderOgImage({
    eyebrow: "Marketing by trade",
    title: x?.title?.replace(/\s*\|\s*TableTurnerr$/, "") ?? "Marketing for home services",
    subtitle: "Websites, Google profile, reviews and local SEO, done for you.",
  });
}
