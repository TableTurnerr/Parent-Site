import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";
import { getReviewCity } from "@/app/lib/review-cities";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = getReviewCity(city);
  return renderOgImage({
    eyebrow: c ? `${c.name}, ${c.stateCode}` : "Texas",
    title: c
      ? `More 5-star reviews for ${c.name} home-services pros`
      : "Review automation for home services",
  });
}
