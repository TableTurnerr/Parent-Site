import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";

// TODO(blog): real posts ship in ~2-3 days. Until the Supabase reader is wired,
// no post exists for any slug, so this is a noindex placeholder. When wired:
// fetch the post by slug, return notFound() for misses, and remove noindex.
export const metadata: Metadata = {
  title: "Article coming soon",
  description: "This article is on the way. Explore our restaurant marketing services in the meantime.",
  robots: { index: false, follow: true },
};

export default function BlogPostPage() {
  return (
    <section className="bg-cream pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-28">
      <Container>
        <div className="max-w-2xl">
          <h1 className="font-display font-bold text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-tight text-charcoal mb-6">
            This article is coming soon
          </h1>
          <p className="text-warm-gray text-lg leading-relaxed mb-8">
            We&apos;re still writing this one. Browse the blog for what&apos;s
            published, or explore our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href="/blog" variant="primary">
              Back to Blog
            </Button>
            <Button href="/services" variant="secondary">
              View Our Services
            </Button>
          </div>
          <p className="mt-6 text-sm text-warm-gray">
            Looking for something specific?{" "}
            <Link href="/contact" className="text-accent underline underline-offset-2">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
