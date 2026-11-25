import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";
import { getResult } from "@/app/lib/growth";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const r = getResult((await params).slug);
  return renderOgImage({
    eyebrow: "Client result",
    title: r ? `${r.reviewsBefore} to ${r.reviewsAfter} Google reviews in ${r.days} days` : "Client results",
    subtitle: r ? `${r.client}, ${r.location}` : "Real results from businesses we work with.",
  });
}
