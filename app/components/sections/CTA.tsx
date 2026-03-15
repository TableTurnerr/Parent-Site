import Image from "next/image";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import { scaleIn } from "@/app/lib/animations";

export default function CTA() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <AnimatedElement variants={scaleIn}>
          <div className="relative bg-charcoal rounded-[1.5rem] p-12 md:p-16 lg:p-20 text-center overflow-hidden">
            {/* Background image with overlay */}
            <Image
              src="/images/usage/fire-charcoal.jpg"
              alt=""
              fill
              className="object-cover opacity-20"
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="relative z-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-cream mb-6">
              <BlurText text="Ready to Fill More Tables?" />
            </h2>

            <p className="text-warm-gray-light text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Let&apos;s build a digital presence that brings diners to your
              door. Get a free consultation and see how we can grow your
              restaurant.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary-light">
                Get a Free Consultation
              </Button>
              <Button href="/services" variant="secondary-light">
                View Our Services
              </Button>
            </div>
            </div>
          </div>
        </AnimatedElement>
      </Container>
    </section>
  );
}
