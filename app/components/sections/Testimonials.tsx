import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { fadeInUp } from "@/app/lib/animations";
import { UniqueTestimonials, type TestimonialItem } from "@/components/ui/unique-testimonial";

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote: "Amazing work amazing people!! Definitely my go to",
    author: "Grill Shack",
    role: "Restaurant owner",
    avatar: "/Client_Logos/GrillShack.webp",
  },
  {
    id: 2,
    quote: "Amazing team",
    author: "Miss Mat Cafe",
    role: "Restaurant owner",
    avatar: "/Client_Logos/MissMatCafe.webp",
  },
  {
    id: 3,
    quote: "Great communication and work from the team",
    author: "Texbbq",
    role: "Restaurant owner",
    avatar: "/Client_Logos/TexBBQ.webp",
  },
  {
    id: 4,
    quote: "Very professional team!! Great working with you",
    author: "Qadeer Coffee",
    role: "Restaurant owner",
    avatar: "/Client_Logos/QadeerCoffee.webp",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream-dark py-20 md:py-28">
      <Container>
        <AnimatedElement variants={fadeInUp} className="mb-4 md:mb-6 text-center">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-charcoal mt-3 max-w-2xl mx-auto">
            <BlurText text="Trusted by Independent Restaurants Nationwide" />
          </h2>
        </AnimatedElement>

        <AnimatedElement variants={fadeInUp}>
          <UniqueTestimonials testimonials={TESTIMONIALS} />
        </AnimatedElement>
      </Container>
    </section>
  );
}
