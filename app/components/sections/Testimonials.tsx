import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { fadeInUp } from "@/app/lib/animations";
import { UniqueTestimonials, type TestimonialItem } from "@/components/ui/unique-testimonial";

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote:
      "TableTurnerr completely transformed our online presence. We went from invisible on Google to ranking #1 in our area within 4 months.",
    author: "Ahmad R.",
    role: "Owner at Grill Shack",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      "The website they built is stunning and actually brings in customers. We've seen a 60% increase in online orders since launching.",
    author: "Sarah M.",
    role: "Owner at Miss Mat Cafe",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      "Their Google Ads management has been a game-changer. Every dollar we spend comes back tenfold. Best marketing investment we've made.",
    author: "James T.",
    role: "Owner at Texbbq",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream-dark py-20 md:py-28">
      <Container>
        <AnimatedElement variants={fadeInUp} className="mb-4 md:mb-6 text-center">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-charcoal mt-3 max-w-2xl mx-auto">
            <BlurText text="What Our Restaurant Partners Say" />
          </h2>
        </AnimatedElement>

        <AnimatedElement variants={fadeInUp}>
          <UniqueTestimonials testimonials={TESTIMONIALS} />
        </AnimatedElement>
      </Container>
    </section>
  );
}
