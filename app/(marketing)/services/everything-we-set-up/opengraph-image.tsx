import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "The full list",
    title: "Everything we set up for home-service companies",
    subtitle: "Booking, payments, call answering, follow-up, reviews and websites.",
  });
}
