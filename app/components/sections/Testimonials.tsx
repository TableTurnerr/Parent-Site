import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import { fadeInUp } from "@/app/lib/animations";
import { UniqueTestimonials, type TestimonialItem } from "@/components/ui/unique-testimonial";

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote: "Amazing work amazing people!! Definitely my go to",
    author: "Grill Shack",
    role: "Restaurant owner",
    avatar: "/Client_Logos/GrillShack.webp",
    siteUrl: "grillshackuk.com",
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
    <section className="bg-cream-dark py-16 md:py-28">
      <Container>
        <AnimatedElement variants={fadeInUp} className="mb-10 md:mb-14 text-center">
          <p className="eyebrow mb-6 justify-center">Testimonials</p>
          <h2 className="display-lg text-charcoal max-w-3xl mx-auto">
            Trusted by independent restaurants nationwide
          </h2>
        </AnimatedElement>

        <AnimatedElement variants={fadeInUp}>
          <UniqueTestimonials testimonials={TESTIMONIALS} />
        </AnimatedElement>
      </Container>
    </section>
  );
}
