"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";

/**
 * Interactive delivery-commission calculator. Restaurant owners drag in their
 * monthly delivery volume, average order value, and the commission rate their
 * third-party apps charge, and see what those commissions cost per year.
 *
 * Honest framing: the headline number is the commission they currently pay to
 * third-party apps (a real, computable figure). We do not invent net-savings
 * numbers — commission-free platforms replace the percentage with a flat fee,
 * and the exact saving depends on the plan, so we route them to a consult.
 *
 * No motion concerns: numbers update on user input (drag), not on a timer, so
 * there is nothing to gate behind prefers-reduced-motion.
 */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface SliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}

function Slider({ id, label, value, min, max, step, format, onChange }: SliderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label htmlFor={id} className="text-sm font-medium text-charcoal">
          {label}
        </label>
        <span className="font-display font-semibold text-charcoal tabular-nums">
          {format(value)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={format(value)}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-charcoal/10"
        style={{ accentColor: "var(--color-accent)" }}
      />
    </div>
  );
}

export default function SavingsCalculator() {
  const [orders, setOrders] = useState(600); // monthly delivery orders
  const [aov, setAov] = useState(32); // average order value ($)
  const [rate, setRate] = useState(25); // commission rate (%)

  const { monthly, annual } = useMemo(() => {
    const monthlyCommission = orders * aov * (rate / 100);
    return { monthly: monthlyCommission, annual: monthlyCommission * 12 };
  }, [orders, aov, rate]);

  return (
    <section className="bg-cream py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Controls */}
          <div className="rounded-[1.25rem] border border-border bg-cream-dark p-7 sm:p-9">
            <SectionLabel>Commission Calculator</SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-tight text-charcoal mt-3 mb-7">
              What are delivery apps really costing you?
            </h2>

            <div className="space-y-7">
              <Slider
                id="calc-orders"
                label="Monthly delivery orders"
                value={orders}
                min={50}
                max={3000}
                step={10}
                format={(v) => v.toLocaleString("en-US")}
                onChange={setOrders}
              />
              <Slider
                id="calc-aov"
                label="Average order value"
                value={aov}
                min={10}
                max={120}
                step={1}
                format={(v) => usd.format(v)}
                onChange={setAov}
              />
              <Slider
                id="calc-rate"
                label="Third-party commission rate"
                value={rate}
                min={10}
                max={35}
                step={1}
                format={(v) => `${v}%`}
                onChange={setRate}
              />
            </div>
          </div>

          {/* Result */}
          <div className="rounded-[1.25rem] bg-charcoal text-cream p-7 sm:p-9 flex flex-col">
            <p className="text-warm-gray-light text-sm uppercase tracking-[0.2em] font-medium">
              You&apos;re paying delivery apps
            </p>
            <p
              className="font-display font-bold leading-none tracking-tight text-accent mt-3 tabular-nums"
              style={{ fontSize: "clamp(2.75rem, 7vw, 4.5rem)" }}
              aria-live="polite"
            >
              {usd.format(annual)}
            </p>
            <p className="text-warm-gray-light text-lg mt-1">per year in commissions</p>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-warm-gray/20 px-5 py-4">
                <p className="font-display font-bold text-2xl text-cream tabular-nums">
                  {usd.format(monthly)}
                </p>
                <p className="text-warm-gray-light text-sm mt-0.5">per month</p>
              </div>
              <div className="rounded-xl border border-warm-gray/20 px-5 py-4">
                <p className="font-display font-bold text-2xl text-cream tabular-nums">
                  {usd.format(annual * 5)}
                </p>
                <p className="text-warm-gray-light text-sm mt-0.5">over 5 years</p>
              </div>
            </div>

            <p className="text-warm-gray-light text-[0.95rem] leading-relaxed mt-7">
              Commission-free ordering replaces that percentage with a low flat
              monthly rate, so the money you make on delivery stays yours. We will
              show you exactly what you would keep.
            </p>

            <div className="mt-auto pt-7">
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-cream text-charcoal px-7 py-3.5 font-medium hover:bg-white transition-colors"
              >
                Get my free savings plan
              </Link>
              <p className="text-warm-gray-light text-xs mt-3">
                Estimate only, based on the figures you enter. No obligation.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
