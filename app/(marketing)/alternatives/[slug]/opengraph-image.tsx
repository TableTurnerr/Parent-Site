import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";
import { getAlternative } from "@/app/lib/alternatives";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAlternative(slug);
  return renderOgImage({
    eyebrow: `${a?.competitor ?? "Compare"} alternative`,
    title: a?.tagline ?? "Review automation built for home services",
    subtitle: "Multi-platform reviews, technician leaderboards, no contracts.",
  });
}
