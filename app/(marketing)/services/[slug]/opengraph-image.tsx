import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";
import { getService } from "@/app/lib/growth";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = getService(slug);
  return renderOgImage({
    eyebrow: "Done-for-you service",
    title: x?.title?.replace(/\s*\|\s*TableTurnerr$/, "") ?? "Marketing for home services",
    subtitle: "Set up and run for you, month to month.",
  });
}
