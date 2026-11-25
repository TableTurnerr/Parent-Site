import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Client result",
    title: "How a family-run Honolulu restaurant brought in 500+ customers",
    subtitle: "Seasons Taiwanese Eatery",
    tag: "Restaurants",
  });
}
