"use client";
// Pick-what-you-need pricing calculator. Reviews are always on; the selection maps to one of four fixed prices
// (see tierFor in app/lib/pricing.ts). Picking anything from the growth engine lands on Complete, which includes
// everything, so every option shows as included.
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Gift, Lock } from "lucide-react";
import NfcCard from "./NfcCard";
import { DFY_TIERS, PRICE_OPTIONS, tierFor, type PriceOption } from "@/app/lib/pricing";
import { AUDIT_HREF, BOOKING_URL } from "@/app/lib/site-nav";

const GROUPS: { id: PriceOption["group"]; title: string; note: string }[] = [
  { id: "basics", title: "Get seen", note: "$297 for one, $397 for a website plus posting" },
  { id: "engine", title: "Book more jobs", note: "Any of these: $497, and everything is included" },
];

export default function PricingCalculator({ initial = ["website"] }: { initial?: string[] }) {
  const [sel, setSel] = useState<Set<string>>(() => new Set(initial));
  const tier = tierFor(sel);
  const complete = tier.id === "complete";
  const toggle = (id: string) =>
    setSel((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Options */}
      <div className="card p-6 sm:p-8 lg:col-span-7">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Build your plan</p>
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-primary/40 bg-primary-soft/40 p-4">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary text-white"><Lock className="h-3.5 w-3.5" aria-hidden /></span>
          <div>
            <p className="font-semibold text-ink">Google reviews <span className="font-normal text-muted">· always included</span></p>
            <p className="mt-0.5 text-sm text-ink-soft">A personal request after every job, and a reply to every review. Integrates with your CRM, FSM, or invoicing/accounting software. $97/mo on its own.</p>
          </div>
        </div>

        {GROUPS.map((g) => (
          <fieldset key={g.id} className="mt-7">
            <legend className="flex w-full flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <span className="font-bold text-ink">{g.title}</span>
              <span className="text-xs text-muted">{g.note}</span>
            </legend>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {PRICE_OPTIONS.filter((o) => o.group === g.id).map((o) => {
                const picked = sel.has(o.id);
                const included = picked || complete;
                return (
                  <label
                    key={o.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-colors ${picked ? "border-primary bg-primary-soft/30" : "border-line hover:border-primary/50"}`}
                  >
                    <input type="checkbox" checked={picked} onChange={() => toggle(o.id)} className="peer sr-only" />
                    <span
                      aria-hidden
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border peer-focus-visible:ring-2 peer-focus-visible:ring-primary ${picked ? "border-primary bg-primary text-white" : included ? "border-success text-success" : "border-line"}`}
                    >
                      {included && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{o.label}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">{o.desc}</span>
                      {!picked && complete && <span className="mt-1 block text-xs font-semibold text-success">Included</span>}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {/* Result */}
      <div className="lg:col-span-5">
        <div className="card sticky top-24 flex flex-col p-6 ring-1 ring-primary sm:p-8" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Your plan</p>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold text-ink">${tier.price}</span>
            <span className="text-ink-soft">/mo</span>
          </p>
          <p className="mt-1 text-lg font-bold text-primary">{tier.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{tier.forWho}</p>

          <ol className="mt-5 grid grid-cols-4 gap-1.5" aria-label="Plans">
            {DFY_TIERS.map((t) => (
              <li
                key={t.id}
                className={`min-w-0 rounded-xl border px-0.5 py-2 text-center sm:px-2 ${t.id === tier.id ? "border-primary bg-primary text-white" : "border-line text-ink-soft"}`}
              >
                <span className="block text-[10px] font-semibold leading-tight sm:text-[11px]">{t.name}</span>
                <span className="block text-sm font-bold">${t.price}</span>
              </li>
            ))}
          </ol>

          <ul className="mt-6 space-y-2.5">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> {f}
              </li>
            ))}
          </ul>

          {/* Free gift for every new client: custom NFC review cards with their logo. */}
          <div className="mt-6 rounded-2xl border border-primary/60 bg-primary-soft/30 p-4">
            <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink">
              <Gift className="h-4 w-4 text-primary" aria-hidden />
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Free gift</span>
              Custom NFC review cards
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
              Sign up today and we&apos;ll design and ship review cards with your logo, free. Your crew hands one over after
              the job, the customer taps it with their phone, and they&apos;re on your Google review page.
            </p>
            <div className="mx-auto mt-4 max-w-[17rem]">
              <NfcCard />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-2.5">
            <Link href={AUDIT_HREF} className="btn btn-primary w-full">Get your free audit <ArrowRight className="h-4 w-4" /></Link>
            <a href={BOOKING_URL} className="btn btn-ghost w-full">Book a 15-minute call</a>
          </div>
          <p className="mt-4 text-center text-xs text-muted">Month to month. No contract.</p>
        </div>
      </div>
    </div>
  );
}
