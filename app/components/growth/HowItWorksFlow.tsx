// "How it works" as a flow: free audit -> we fix and set up -> we run it every month. Boxes joined by arrows,
// side by side from md up and stacked (arrows pointing down) on phones. `tone="dark"` is for navy (bg-night) sections.
import { ArrowDown, ArrowRight, Repeat, Search, Wrench, type LucideIcon } from "lucide-react";
import { Fragment } from "react";

export type FlowStep = { t: string; b: string };

const ICONS: LucideIcon[] = [Search, Wrench, Repeat];

export default function HowItWorksFlow({ steps, tone = "light", className = "" }: {
  steps: [FlowStep, FlowStep, FlowStep];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <ol className={`flex flex-col items-stretch md:flex-row ${className}`} aria-label="How it works, in three steps">
      {steps.map((s, i) => {
        const Icon = ICONS[i];
        return (
          <Fragment key={s.t}>
            <li className={`relative flex-1 rounded-2xl p-6 md:p-7 ${dark ? "border border-white/10 bg-white/[0.04]" : "card"}`}>
              <div className="flex items-center gap-3">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${dark ? "bg-white/10 text-white" : "bg-primary-soft text-primary"}`} aria-hidden>
                  <Icon className="h-5 w-5" />
                </span>
                <span className={`text-xs font-bold uppercase tracking-[0.14em] ${dark ? "text-white/60" : "text-muted"}`}>Step {i + 1}</span>
              </div>
              <h3 className={`mt-4 text-xl font-bold ${dark ? "text-white" : "text-ink"}`}>{s.t}</h3>
              <p className={`mt-2.5 text-sm leading-relaxed ${dark ? "text-white/65" : "text-ink-soft"}`}>{s.b}</p>
              {i === steps.length - 1 && (
                <p className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${dark ? "bg-white/10 text-white/80" : "bg-primary-soft text-primary"}`}>
                  <Repeat className="h-3.5 w-3.5" aria-hidden /> Every month, month to month
                </p>
              )}
            </li>
            {i < steps.length - 1 && (
              <li aria-hidden className="flex shrink-0 items-center justify-center py-2 md:px-2 md:py-0">
                <span className={`grid h-9 w-9 place-items-center rounded-full ${dark ? "bg-white/10 text-white" : "bg-primary text-primary-ink"}`}>
                  <ArrowDown className="h-4 w-4 md:hidden" />
                  <ArrowRight className="hidden h-4 w-4 md:block" />
                </span>
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
