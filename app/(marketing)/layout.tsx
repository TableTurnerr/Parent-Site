import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import StickyMobileCTA from "@/app/components/ui/StickyMobileCTA";
import BackToTop from "@/app/components/ui/BackToTop";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      {/* pb on mobile so the sticky CTA never overlaps footer content */}
      <main id="main" className="pb-20 md:pb-0">{children}</main>
      <Footer />
      <StickyMobileCTA />
      <BackToTop />
    </>
  );
}
