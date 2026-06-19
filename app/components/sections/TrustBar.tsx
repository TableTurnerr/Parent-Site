import Container from "@/app/components/ui/Container";
import SafeImage from "@/app/components/ui/SafeImage";

const LOGOS = [
  { name: "Grill Shack", src: "/Client_Logos/GrillShack.webp" },
  { name: "Miss Mat Cafe", src: "/Client_Logos/MissMatCafe.webp" },
  { name: "Texbbq", src: "/Client_Logos/TexBBQ.webp" },
  { name: "Qadeer Coffee", src: "/Client_Logos/QadeerCoffee.webp" },
  { name: "Al-Baghdady", src: "/Client_Logos/AlBaghdady.png" },
] as const;

/**
 * Slim trust strip of real client logos. Grayscale at rest, full color on
 * hover (.logo-chip). A missing logo file degrades to the client's name so the
 * strip never shows a broken image.
 */
export default function TrustBar() {
  return (
    <section className="bg-cream py-10 md:py-12 border-y border-border">
      <Container>
        <p className="text-center text-warm-gray text-xs uppercase tracking-[0.2em] font-medium mb-7">
          Local businesses growing with TableTurnerr
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="logo-chip relative h-9 w-28 md:h-10 md:w-32"
            >
              <SafeImage
                src={logo.src}
                alt={`${logo.name} logo`}
                className="absolute inset-0 h-full w-full object-contain"
                fallback={
                  <span className="absolute inset-0 flex items-center justify-center text-center text-sm font-display font-semibold text-warm-gray-light">
                    {logo.name}
                  </span>
                }
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
