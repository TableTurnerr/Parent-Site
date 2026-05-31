import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import StickyMobileCTA from "@/app/components/ui/StickyMobileCTA";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* pb on mobile so the sticky CTA never overlaps footer content */}
      <main className="pb-20 md:pb-0">{children}</main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
