import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import { fadeInUp } from "@/app/lib/animations";
import { UniqueTestimonials, type TestimonialItem } from "@/components/ui/unique-testimonial";

// Live rented restaurant sites we build and run. Screenshots auto-generate
// from siteUrl. Only Grill Shack has a real review quote, so only it shows one
// (house rule: never fabricate testimonials). The rest show a factual
// descriptor, not a fake quote.
const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    author: "Grill Shack",
    blurb: "Website design and local SEO for a grill and burger spot.",
    quote: "Amazing work amazing people!! Definitely my go to",
    role: "Business owner",
    avatar: "/Client_Logos/GrillShack.webp",
    siteUrl: "grillshackuk.com",
    image: "/images/work/grill-shack.webp",
  },
  {
    id: 2,
    author: "Waffle Pop Dallas",
    blurb: "Site and local SEO for a Dallas waffle and dessert shop.",
    siteUrl: "wafflepopdallas.com",
    image: "/images/work/waffle-pop-dallas.webp",
  },
  {
    id: 3,
    author: "Waikiki Chicken in Paradise",
    blurb: "Website built for a Hawaiian-style chicken restaurant.",
    siteUrl: "waikikichickeninparadise.com",
    image: "/images/work/waikiki-chicken.webp",
    noFrame: true,
  },
  {
    id: 4,
    author: "Suntea Mix",
    blurb: "Custom site for a bubble tea and specialty drinks brand.",
    siteUrl: "sunteamix.co",
    image: "/images/work/suntea-mix.webp",
    noFrame: true,
  },
  {
    id: 5,
    author: "Al-Baghdady Bakery & Café",
    blurb: "Website and local SEO for an authentic Iraqi bakery and café in Richardson, TX.",
    siteUrl: "www.albaghdadybakery.com",
    image: "/images/work/al-baghdady.webp",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream-dark py-16 md:py-28">
      <Container>
        <AnimatedElement variants={fadeInUp} className="mb-10 md:mb-14 text-center">
          <p className="eyebrow mb-6 justify-center">Our Work</p>
          <h2 className="display-lg text-charcoal max-w-3xl mx-auto">
            Sites we build and run
          </h2>
        </AnimatedElement>

        <AnimatedElement variants={fadeInUp}>
          <UniqueTestimonials testimonials={TESTIMONIALS} />
        </AnimatedElement>
      </Container>
    </section>
  );
}
