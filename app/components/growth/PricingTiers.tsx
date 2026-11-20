import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { DFY_TIERS } from "@/app/lib/pricing";
import { AUDIT_PATH, growthSite } from "@/app/lib/growth";

/** The three done-for-you price bands (see DFY_TIERS), used on the homepage and /pricing. */
export function PricingTiers() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {DFY_TIERS.map((t) => (
        <div
          key={t.name}
          className={`card relative flex flex-col p-7 ${t.highlight ? "border-primary shadow-[0_30px_70px_-40px_rgba(54,64,143,0.5)] ring-1 ring-primary" : ""}`}
        >
          {t.highlight && (
            <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">{t.highlight}</span>
          )}
          <h3 className="text-lg font-bold text-ink">{t.name}</h3>
          <p className="mt-3">
            <span className="font-display text-4xl font-bold text-ink">{t.price}</span>
            <span className="text-ink-soft">{t.per}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.forWho}</p>
          <ul className="mt-6 flex-1 space-y-3">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
              </li>
            ))}
          </ul>
          <Link href={AUDIT_PATH} className={`btn mt-7 w-full ${t.highlight ? "btn-primary" : "btn-ghost"}`}>
            Get your free audit
          </Link>
        </div>
      ))}
    </div>
  );
}

/** One line under the tiers: how the final price is set, and the call option. */
export function PricingNote() {
  return (
    <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">
      Every plan is custom. We set the price after the free Google Maps audit, based on what your business needs, how
      aggressively you want to grow and how much attention you want from us. Month to month, no contract.{" "}
      <a href={growthSite.bookingUrl} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
        Or book a 15-minute call <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </p>
  );
}
