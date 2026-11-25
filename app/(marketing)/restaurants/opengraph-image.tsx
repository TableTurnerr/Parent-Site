import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Restaurant marketing",
    title: "Marketing for independent restaurants, done for you",
    subtitle: "Websites, Google Business Profile and review growth.",
    tag: "Restaurants",
  });
}
