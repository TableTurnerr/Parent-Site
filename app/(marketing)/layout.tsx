import Navbar from "@/app/components/layout/Navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* Footer placeholder - Phase 2 */}
      <footer className="bg-charcoal text-cream py-12 text-center">
        <p className="text-warm-gray-light text-sm">
          &copy; {new Date().getFullYear()} TableTurnerr. All rights reserved.
        </p>
      </footer>
    </>
  );
}
