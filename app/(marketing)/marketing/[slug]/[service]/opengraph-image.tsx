import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";
import { getCombo } from "@/app/lib/growth";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string; service: string }> }) {
  const { slug, service } = await params;
  const x = getCombo(slug, service);
  return renderOgImage({
    eyebrow: "Marketing by trade",
    title: x?.title?.replace(/\s*\|\s*TableTurnerr$/, "") ?? "Marketing for home services",
    subtitle: "Set up and run for you, month to month.",
  });
}
