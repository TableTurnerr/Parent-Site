"use client";
// Pick-what-you-need pricing calculator. Reviews are always on; the selection lands on the smallest of the five packages
// that includes everything picked (see planFor in app/lib/pricing.ts). If one thing is picked and it's sold on its own,
// the standalone price is shown too. AI minutes and the yearly option update the total.
import { useState } from "react";
import { ArrowRight, Check, Gift, Lock, Phone } from "lucide-react";
import NfcCard from "./NfcCard";
import {
  AI_MINUTE_RATE, PLANS, PRICE_OPTIONS, STANDALONE, monthlyWithMinutes, planFor, yearlyPrice,
} from "@/app/lib/pricing";
import { BOOKING_URL, PHONE_DISPLAY, PHONE_E164 } from "@/app/lib/site-nav";

const STANDALONE_FOR_OPTION: Record<string, string> = { textback: "textback", gbp: "gbp", website: "website", followup: "crm", seasonal: "crm", ai: "ai", seo: "seo", aeo: "seo" };

export default function PricingCalculator({ initial = ["website"] }: { initial?: string[] }) {
  const [sel, setSel] = useState<Set<string>>(() => new Set(initial));
  const [minutes, setMinutes] = useState(150);
  const [yearly, setYearly] = useState(false);
  const plan = planFor(sel);
  const planIdx = PLANS.findIndex((p) => p.id === plan.id);
  const prev = planIdx > 0 ? PLANS[planIdx - 1] : null;
  const { total, extraMinutes, extra } = monthlyWithMinutes(plan, minutes);
  const only = sel.size === 1 ? STANDALONE.find((s) => s.id === STANDALONE_FOR_OPTION[[...sel][0]]) : undefined;
  const standalone = only && only.price < plan.price ? only : undefined;

  const toggle = (id: string) =>
    setSel((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const includedByPlan = (id: string) => PLANS.findIndex((p) => p.id === PRICE_OPTIONS.find((o) => o.id === id)!.plan) <= planIdx;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="card p-6 sm:p-8 lg:col-span-7">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">What do you need?</p>
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-primary/40 bg-primary-soft/40 p-4">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary text-white"><Lock className="h-3.5 w-3.5" aria-hidden /></span>
          <div>
            <p className="font-semibold text-ink">Google reviews <span className="font-normal text-muted">· always included</span></p>
            <p className="mt-0.5 text-sm text-ink-soft">A request after every job, AI replies to every review, missed-call text-back and free NFC review cards. $97/mo on its own.</p>
          </div>
        </div>
        <fieldset className="mt-6">
          <legend className="sr-only">Add services</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {PRICE_OPTIONS.map((o) => {
              const picked = sel.has(o.id);
              const included = picked || includedByPlan(o.id);
              return (
                <label key={o.id} className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-colors ${picked ? "border-primary bg-primary-soft/30" : "border-line hover:border-primary/50"}`}>
                  <input type="checkbox" checked={picked} onChange={() => toggle(o.id)} className="peer sr-only" />
                  <span aria-hidden className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border peer-focus-visible:ring-2 peer-focus-visible:ring-primary ${picked ? "border-primary bg-primary text-white" : included ? "border-success text-success" : "border-line"}`}>
                    {included && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{o.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">{o.desc}</span>
                    {!picked && included && <span className="mt-1 block text-xs font-semibold text-success">Included in {plan.name}</span>}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {plan.aiMinutes > 0 && (
          <div className="mt-7 rounded-2xl border border-line p-4">
            <label htmlFor="ai-minutes" className="flex flex-wrap items-baseline justify-between gap-2 text-sm font-semibold text-ink">
              AI answering minutes a month
              <span className="font-normal text-ink-soft">{minutes.toLocaleString()} min · {plan.aiMinutes} included</span>
            </label>
            <input id="ai-minutes" type="range" min={0} max={1500} step={25} value={minutes} onChange={(e) => setMinutes(+e.target.value)} className="mt-3 w-full accent-[var(--color-primary)]" />
            <p className="mt-2 text-xs text-ink-soft">
              {extraMinutes > 0
                ? `${extraMinutes.toLocaleString()} extra minutes × $${AI_MINUTE_RATE.toFixed(2)} = $${extra.toFixed(0)} a month.`
                : "All your minutes are covered by the package."}{" "}
              A typical call to a home-service business runs 2 to 4 minutes.
            </p>
          </div>
        )}

        <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-ink">
          <input type="checkbox" checked={yearly} onChange={(e) => setYearly(e.target.checked)} className="h-4 w-4 accent-[var(--color-primary)]" />
          Pay 12 months up front and get 2 months free
        </label>
      </div>

      <div className="lg:col-span-5">
        <div className="card sticky top-24 flex flex-col p-6 ring-1 ring-primary sm:p-8" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Your package</p>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold text-ink">
              ${yearly ? (yearlyPrice(plan) + Math.round(extra * 12)).toLocaleString() : Math.round(total).toLocaleString()}
            </span>
            <span className="text-ink-soft">{yearly ? "/yr" : "/mo"}</span>
          </p>
          <p className="mt-1 text-lg font-bold text-primary">{plan.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{plan.forWho}</p>
          {yearly && <p className="mt-1 text-xs text-muted">${plan.price.toLocaleString()}/mo × 10 months{extra > 0 ? ", plus extra minutes" : ""}.</p>}

          <ol className="-mx-1 mt-5 flex gap-1.5 overflow-x-auto px-1 pb-1" aria-label="Packages">
            {PLANS.map((p) => (
              <li key={p.id} className={`min-w-[4.25rem] flex-1 rounded-xl border px-1 py-2 text-center ${p.id === plan.id ? "border-primary bg-primary text-white" : "border-line text-ink-soft"}`}>
                <span className="block text-[10px] font-semibold leading-tight">{p.name}</span>
                <span className="block text-sm font-bold">${p.price.toLocaleString()}</span>
              </li>
            ))}
          </ol>

          <ul className="mt-6 space-y-2.5">
            {prev && (
              <li className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> Everything in {prev.name}
              </li>
            )}
            {plan.adds.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> {f}
              </li>
            ))}
          </ul>

          {standalone && (
            <p className="mt-5 rounded-2xl border border-line p-4 text-sm text-ink-soft">
              Just need {standalone.name.toLowerCase()}? It&apos;s <strong className="text-ink">${standalone.price}/mo on its own</strong> ({standalone.note.toLowerCase()}).
            </p>
          )}

          <div className="mt-6 rounded-2xl border border-primary/60 bg-primary-soft/30 p-4">
            <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink">
              <Gift className="h-4 w-4 text-primary" aria-hidden />
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Free gift</span>
              Custom NFC review cards
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
              We design and ship review cards with your logo, free. Your crew hands one over after the job, the customer taps it
              with their phone, and they&apos;re on your Google review page.
            </p>
            <div className="mx-auto mt-4 max-w-[17rem]">
              <NfcCard />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-2.5">
            <a href={BOOKING_URL} className="btn btn-primary w-full">Book a call for your exact price <ArrowRight className="h-4 w-4" /></a>
            <a href={`tel:${PHONE_E164}`} className="btn btn-ghost w-full"><Phone className="h-4 w-4" aria-hidden /> Or call us: {PHONE_DISPLAY}</a>
          </div>
          <p className="mt-4 text-center text-xs text-muted">Need a custom package? We&apos;ll price it up or down on the call. No contracts.</p>
        </div>
      </div>
    </div>
  );
}
