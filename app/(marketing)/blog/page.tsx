import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { SERVICES } from "@/app/lib/constants";

// TODO(blog): real posts ship in ~2-3 days via the Supabase blog_posts backend
// (admin editor at /admin/posts). When the public reader is wired, REMOVE the
// `robots: noindex` below so posts can be indexed.
export const metadata: Metadata = {
  title: "Restaurant Marketing Blog",
  description:
    "Restaurant marketing, local SEO, and Google Ads insights for independent restaurants in Texas. New articles coming soon.",
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <section className="bg-cream pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-28">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel>Blog</SectionLabel>
          <h1 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mt-3 mb-6">
            Restaurant marketing insights, coming soon
          </h1>
          <p className="text-warm-gray text-lg leading-relaxed mb-8">
            We&apos;re putting together practical guides on restaurant SEO, Google
            Ads, and local marketing for independent restaurants across Texas.
            The first articles land shortly. In the meantime, explore what we do
            or get a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href="/contact" variant="primary">
              Get a Free Consultation
            </Button>
            <Button href="/services" variant="secondary">
              View Our Services
            </Button>
          </div>
        </div>

        {/* Keep crawlers and visitors moving into real content */}
        <div className="mt-14 md:mt-20">
          <h2 className="font-display font-semibold text-lg text-charcoal mb-5">
            Explore our services
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block rounded-xl border border-border bg-cream-dark px-5 py-4 text-charcoal hover:border-charcoal/30 transition-colors"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
