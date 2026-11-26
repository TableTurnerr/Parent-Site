"use client";
// What the AI answering service looks like: a sample call for the visitor's trade, the summary text the owner gets,
// the live demo line, and a minutes calculator. Sample calls are illustrations (not recordings) and say so.
import { useState } from "react";
import { PhoneCall, MessageSquareText, CalendarCheck } from "lucide-react";
import { AI_MINUTE_RATE, DEMO_PHONE_DISPLAY, DEMO_PHONE_E164, STANDALONE, planById } from "@/app/lib/pricing";

type Sample = { trade: string; time: string; lines: [who: "ai" | "caller", text: string][]; summary: string };

const SAMPLES: Sample[] = [
  { trade: "HVAC", time: "9:12 PM", lines: [
    ["ai", "Thanks for calling Summit Heating & Air, this is the virtual assistant. How can I help?"],
    ["caller", "Our AC stopped blowing cold air. It's 88 in the house."],
    ["ai", "Sorry about that. Is the outdoor unit running, and is anyone at home elderly or unwell?"],
    ["caller", "It's humming but the fan isn't spinning. Just us two."],
    ["ai", "Got it. I can book a tech tomorrow between 8 and 10 AM. Does that work?"],
  ], summary: "New job: AC not cooling, outdoor fan not spinning. 412 Elm St. Booked tomorrow 8–10 AM." },
  { trade: "Plumbing", time: "6:40 AM", lines: [
    ["ai", "Thanks for calling Clearline Plumbing, this is the virtual assistant. What's going on?"],
    ["caller", "Water's coming from under the kitchen sink. I shut the valve."],
    ["ai", "Good call shutting it off. Is any water still leaking, or is it under control?"],
    ["caller", "It stopped, but the cabinet is soaked."],
    ["ai", "I'll text the on-call plumber now and book you first thing. What's the address?"],
  ], summary: "Leak under kitchen sink, valve shut, not active. 18 Birch Ct. On-call notified, booked 8 AM." },
  { trade: "Electrical", time: "4:55 PM", lines: [
    ["ai", "Thanks for calling Brightwire Electric, this is the virtual assistant. How can I help?"],
    ["caller", "Half my outlets in the living room went dead."],
    ["ai", "Any burning smell, sparks or a hot outlet? If so, please call 911 first."],
    ["caller", "No, nothing like that. The breaker looks fine."],
    ["ai", "Thanks. I can book an electrician Thursday at 1 PM. Want that slot?"],
  ], summary: "Dead outlets in living room, no burning or heat. Booked Thu 1 PM. Asked to bring panel photo." },
  { trade: "Garage door", time: "7:30 AM", lines: [
    ["ai", "Thanks for calling Liftright Garage Doors, this is the virtual assistant. What happened?"],
    ["caller", "The door's stuck halfway and my car is inside. I heard a bang last night."],
    ["ai", "That bang is often a broken spring, so please don't try to lift it. Can I get your address?"],
    ["caller", "77 Ridge Rd."],
    ["ai", "I've sent this to the tech on call. Expect a text with an arrival time in a few minutes."],
  ], summary: "Door stuck halfway, likely broken spring, car trapped. 77 Ridge Rd. Urgent, sent to on-call." },
];

export default function AiAnsweringDemo() {
  const [i, setI] = useState(0);
  const [minutes, setMinutes] = useState(300);
  const s = SAMPLES[i];
  const ai = STANDALONE.find((x) => x.id === "ai")!;
  const rows = [
    { name: "AI answering on its own", base: ai.price, inc: 150 },
    { name: `${planById("growth").name} package`, base: planById("growth").price, inc: planById("growth").aiMinutes, note: "with reviews, website, GBP, CRM" },
    { name: `${planById("partner").name} package`, base: planById("partner").price, inc: planById("partner").aiMinutes, note: "with everything, ads and strategy" },
  ].map((r) => ({ ...r, total: r.base + Math.max(0, minutes - r.inc) * AI_MINUTE_RATE }));

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      {/* Phone */}
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Pick a trade" className="mb-4 flex flex-wrap gap-2">
          {SAMPLES.map((x, n) => (
            <button key={x.trade} role="tab" aria-selected={n === i} onClick={() => setI(n)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold ${n === i ? "border-primary bg-primary text-white" : "border-line text-ink-soft hover:border-primary/50"}`}>
              {x.trade}
            </button>
          ))}
        </div>
        <div className="mx-auto max-w-[20rem] rounded-[2.5rem] border-[10px] border-ink/90 bg-surface p-4 shadow-xl">
          <div className="flex items-center justify-between text-[11px] font-semibold text-muted"><span>{s.time}</span><span>AI receptionist</span></div>
          <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-success"><PhoneCall className="h-3.5 w-3.5" aria-hidden /> Live call · answered</p>
          <div className="mt-3 space-y-2" aria-live="polite">
            {s.lines.map(([who, text], n) => (
              <p key={n} className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${who === "ai" ? "bg-primary text-white" : "ml-auto bg-white text-ink ring-1 ring-line dark:bg-ink/10"}`}>{text}</p>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-white p-3 ring-1 ring-line dark:bg-ink/10">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted"><MessageSquareText className="h-3.5 w-3.5" aria-hidden /> Text to you</p>
            <p className="mt-1 text-[13px] leading-snug text-ink">{s.summary}</p>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-success"><CalendarCheck className="h-3.5 w-3.5" aria-hidden /> Saved to your CRM with the transcript</p>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted">Sample call written to show how it works, with made-up businesses. Call the demo line to hear the real thing.</p>
      </div>

      {/* Demo line + calculator */}
      <div className="space-y-6 lg:col-span-7">
        <div className="card p-6 sm:p-8">
          <span className="eyebrow">Try it now</span>
          <h3 className="mt-4 text-2xl font-bold text-ink">Call our AI receptionist and ask it anything</h3>
          <p className="mt-2 text-ink-soft">Pretend you&apos;re a customer with a no-heat call, ask what we charge, or try to trip it up. It answers 24/7.</p>
          <a href={`tel:${DEMO_PHONE_E164}`} className="btn btn-primary mt-5 text-lg"><PhoneCall className="h-5 w-5" aria-hidden /> Call {DEMO_PHONE_DISPLAY}</a>
        </div>
        <div className="card p-6 sm:p-8">
          <label htmlFor="demo-minutes" className="flex flex-wrap items-baseline justify-between gap-2 font-bold text-ink">
            How many minutes a month?
            <span className="text-sm font-normal text-ink-soft">{minutes.toLocaleString()} min ≈ {Math.round(minutes / 3).toLocaleString()} calls</span>
          </label>
          <input id="demo-minutes" type="range" min={0} max={1500} step={25} value={minutes} onChange={(e) => setMinutes(+e.target.value)} className="mt-3 w-full accent-[var(--color-primary)]" />
          <table className="mt-5 w-full text-sm">
            <thead><tr className="text-left text-xs uppercase tracking-wide text-muted"><th className="pb-2 font-semibold">Option</th><th className="pb-2 font-semibold">Included</th><th className="pb-2 text-right font-semibold">Per month</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-t border-line">
                  <td className="py-2.5 pr-2"><span className="font-semibold text-ink">{r.name}</span>{r.note && <span className="block text-xs text-muted">{r.note}</span>}</td>
                  <td className="py-2.5 text-ink-soft">{r.inc} min</td>
                  <td className="py-2.5 text-right font-bold text-ink">${Math.round(r.total).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted">Extra minutes are ${AI_MINUTE_RATE.toFixed(2)} each on every option. Calls average 2 to 4 minutes.</p>
        </div>
      </div>
    </div>
  );
}
