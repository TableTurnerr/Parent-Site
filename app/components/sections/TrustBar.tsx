import Image from "next/image";
import Container from "@/app/components/ui/Container";

const LOGOS = [
  { name: "Grill Shack", src: "/Client_Logos/GrillShack.webp" },
  { name: "Miss Mat Cafe", src: "/Client_Logos/MissMatCafe.webp" },
  { name: "Texbbq", src: "/Client_Logos/TexBBQ.webp" },
  { name: "Qadeer Coffee", src: "/Client_Logos/QadeerCoffee.webp" },
] as const;

/**
 * Slim trust strip of real client logos. Grayscale at rest, full color on
 * hover (.logo-chip). Static / server component — no client JS.
 */
export default function TrustBar() {
  return (
    <section className="bg-cream py-10 md:py-12 border-y border-border">
      <Container>
        <p className="text-center text-warm-gray text-xs uppercase tracking-[0.2em] font-medium mb-7">
          Restaurants growing with TableTurnerr
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {LOGOS.map((logo) => (
            <div key={logo.name} className="logo-chip relative h-9 w-28 md:h-10 md:w-32">
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
