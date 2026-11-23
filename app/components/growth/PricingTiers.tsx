import { ArrowRight } from "lucide-react";
import { growthSite } from "@/app/lib/growth";
import PricingCalculator from "./PricingCalculator";

/** Pricing on the homepage and /pricing: the pick-what-you-need calculator (four fixed prices, see DFY_TIERS). */
export function PricingTiers() {
  return <PricingCalculator />;
}

/** One line under the calculator: terms, and the call option. */
export function PricingNote() {
  return (
    <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">
      Month to month, no contract, and you talk to an owner. Not sure what you need? The free Google Maps audit shows
      where you&apos;re losing calls, and we&apos;ll tell you straight.{" "}
      <a href={growthSite.bookingUrl} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
        Or book a 15-minute call <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </p>
  );
}
