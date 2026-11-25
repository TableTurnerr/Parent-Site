import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Free Google Maps audit",
    title: "See exactly why competitors get the call",
    subtitle: "Where you rank across your service area, and how your reviews compare.",
  });
}
