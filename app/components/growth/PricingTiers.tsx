import { ArrowRight, Check, MessageSquare, Phone, PhoneCall } from "lucide-react";
import { growthSite } from "@/app/lib/growth";
import { PLANS, yearlyPrice, type Plan } from "@/app/lib/pricing";

function Feature({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <li className={`flex items-start gap-2 text-sm ${strong ? "font-semibold text-ink" : "text-ink-soft"}`}>
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> {children}
    </li>
  );
}

function Price({ p }: { p: Plan }) {
  return (
    <>
      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-bold text-ink">${p.price.toLocaleString()}</span>
        <span className="text-sm text-ink-soft">/mo</span>
      </p>
      <p className="text-xs text-muted">or ${yearlyPrice(p).toLocaleString()}/yr, 2 months free</p>
    </>
  );
}

/** The packages as cards: four side by side, then Partner as a wide card. Each includes everything in the one before it. */
export function PlanCards() {
  const main = PLANS.slice(0, -1);
  const top = PLANS[PLANS.length - 1];
  const prevOfTop = PLANS[PLANS.length - 2];
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {main.map((p, i) => (
          <div key={p.id} className={`card relative flex flex-col p-6 ${p.popular ? "ring-2 ring-primary" : ""}`}>
            {p.popular && (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                Most popular
              </span>
            )}
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-ink">{p.name}</h3>
              {p.aiMinutes > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                  <PhoneCall className="h-3 w-3" aria-hidden /> AI 24/7
                </span>
              )}
            </div>
            <Price p={p} />
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.forWho}</p>
            <ul className="mt-4 flex-1 space-y-2">
              {i > 0 && <Feature strong>Everything in {main[i - 1].name}</Feature>}
              {p.adds.map((f) => <Feature key={f}>{f}</Feature>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="card grid gap-6 p-6 md:grid-cols-12 md:p-8">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-ink">{top.name}</h3>
            <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">Ads + strategy</span>
          </div>
          <Price p={top} />
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{top.forWho}</p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2 md:col-span-8">
          <Feature strong>Everything in {prevOfTop.name}</Feature>
          {top.adds.map((f) => <Feature key={f}>{f}</Feature>)}
        </ul>
      </div>
    </div>
  );
}

/** Full-width bar: packages are fixed; anything different is a custom price, by phone or on a booked call. */
export function CustomPricingBar() {
  return (
    <div className="mt-8 rounded-3xl border-2 border-primary bg-primary-soft/40 p-6 sm:p-8" id="custom">
      <div className="grid items-center gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            <MessageSquare className="h-4 w-4" aria-hidden /> Custom pricing
          </p>
          <h3 className="mt-2 text-2xl font-bold text-ink">Need something different? Contact us for custom pricing.</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Tell us about your business and we&apos;ll give you a price that fits it.
          </p>
        </div>
        <div className="flex flex-col gap-2.5 lg:col-span-5">
          <a href={`tel:${growthSite.phoneE164}`} className="btn btn-primary w-full">
            <Phone className="h-4 w-4" aria-hidden /> Call us: {growthSite.phoneDisplay}
          </a>
          <a href={growthSite.bookingUrl} className="btn btn-ghost w-full">
            Book a call <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

/** One line under the packages: the terms. */
export function PricingNote() {
  return (
    <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">
      Move up or down whenever you need, no contracts and no penalties. Pay yearly and get 2 months free.
    </p>
  );
}
