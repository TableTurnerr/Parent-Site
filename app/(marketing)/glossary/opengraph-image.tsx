import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE, OG_ALT } from "@/app/lib/og-image";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Glossary",
    title: "Marketing and software words, in plain English",
    subtitle: "The terms home-service owners meet, explained in a few lines.",
  });
}
