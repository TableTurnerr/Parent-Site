import Link from "next/link";

/**
 * Persistent bottom CTA shown on mobile only (md:hidden). Keeps the primary
 * conversion action reachable without scrolling back to the hero or footer.
 */
export default function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-cream/95 backdrop-blur-sm px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <Link
        href="/contact"
        className="block w-full rounded-full bg-charcoal text-cream text-center font-medium py-3 text-sm hover:bg-charcoal-light transition-colors"
      >
        Get a Free Consultation
      </Link>
    </div>
  );
}
