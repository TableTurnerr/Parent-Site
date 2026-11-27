"use client";
// Free tools on /tools/<slug>: three calculators and the review-request templates. All math runs in the browser;
// nothing is sent anywhere. Each result ends with the free audit, which is the real next step.
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";

// Kept local: importing the growth index here would pull all the content data into the client bundle.
const AUDIT_PATH = "/free-google-maps-audit";

export const usd = (n: number) => (Number.isFinite(n) ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "-");
export const num = (n: number) => (Number.isFinite(n) ? Math.round(n).toLocaleString("en-US") : "-");
export const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : lo));

export function Input({ id, label, value, onChange, step = 1, min = 0, max, suffix, prefix, hint }: {
  id: string; label: string; value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number; suffix?: string; prefix?: string; hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">{label}</label>
      <div className="mt-2 flex items-center rounded-xl border border-line bg-surface px-4 transition-colors focus-within:border-primary">
        {prefix && <span className="mr-1 text-sm text-muted">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          className="w-full min-w-0 bg-transparent py-3 text-sm text-ink outline-none"
          value={Number.isFinite(value) ? value : ""}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
        />
        {suffix && <span className="ml-1 shrink-0 text-sm text-muted">{suffix}</span>}
      </div>
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function Stat({ value, label, big = false }: { value: string; label: string; big?: boolean }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
      <p className={`font-display font-bold text-white ${big ? "text-3xl sm:text-4xl xl:text-5xl" : "text-2xl sm:text-3xl lg:text-2xl xl:text-3xl"}`}>{value}</p>
      <p className="mt-1.5 text-sm text-white/70">{label}</p>
    </div>
  );
}

export function Shell({ inputs, results, summary }: { inputs: ReactNode; results: ReactNode; summary: ReactNode }) {
  return (
    <div className="grid gap-5 lg:grid-cols-12" data-analytics-section="free_tool">
      <form className="card grid content-start gap-5 p-6 md:p-8 lg:col-span-6" onSubmit={(e) => e.preventDefault()} aria-label="Your numbers">
        <p className="font-bold text-ink">Your numbers</p>
        {inputs}
      </form>
      <div className="relative overflow-hidden rounded-[1.75rem] bg-night p-6 text-white md:p-8 lg:col-span-6" aria-live="polite">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative">
          <p className="font-bold">Your result</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">{results}</div>
          <p className="mt-6 text-sm leading-relaxed text-white/75">{summary}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={AUDIT_PATH} className="btn btn-light">Get my free audit <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <p className="mt-3 text-xs text-white/55">The free audit uses your real Google data: your rankings, your competitors&apos; reviews and what to fix first.</p>
        </div>
      </div>
    </div>
  );
}

export function ReviewCalculator() {
  const [mine, setMine] = useState(27);
  const [rating, setRating] = useState(4.6);
  const [leader, setLeader] = useState(120);
  const [target, setTarget] = useState(4.8);
  const [jobs, setJobs] = useState(30);
  const [rate, setRate] = useState(10);

  const m = clamp(mine, 0, 1e6);
  const r = clamp(rating, 1, 5);
  const t = clamp(target, 1, 5);
  const gap = Math.max(0, clamp(leader, 0, 1e6) - m + 1);
  // (r*m + 5n) / (m + n) >= t  =>  n >= m(t - r) / (5 - t)
  const fiveStars = t <= r ? 0 : t >= 5 ? Infinity : Math.ceil((m * (t - r)) / (5 - t) - 1e-9);
  const perMonth = clamp(jobs, 0, 1e5) * (clamp(rate, 0, 100) / 100);
  const months = gap === 0 ? 0 : perMonth > 0 ? Math.ceil(gap / perMonth) : Infinity;

  return (
    <Shell
      inputs={
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="rc-mine" label="Your Google reviews" value={mine} onChange={setMine} />
            <Input id="rc-rating" label="Your star rating" value={rating} onChange={setRating} step={0.1} min={1} max={5} suffix="★" />
          </div>
          <Input id="rc-leader" label="Reviews of the top competitor near you" value={leader} onChange={setLeader} hint="Search your main service and town on Google Maps and look at the first result." />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="rc-target" label="Target star rating" value={target} onChange={setTarget} step={0.1} min={1} max={5} suffix="★" />
            <Input id="rc-jobs" label="Jobs per month" value={jobs} onChange={setJobs} />
          </div>
          <Input id="rc-rate" label="Customers who leave a review when asked" value={rate} onChange={setRate} max={100} suffix="%" hint="10% is cautious. Asking by text right after the job does better." />
        </>
      }
      results={
        <>
          <Stat big value={num(gap)} label={gap === 0 ? "You already have more reviews than the leader" : "more reviews to pass the leader"} />
          <Stat big value={months === Infinity ? "-" : months === 0 ? "Now" : `${num(months)} mo`} label={months === 0 ? "keep the new reviews coming" : "to get there at your pace"} />
          <Stat value={fiveStars === Infinity ? "-" : num(fiveStars)} label={fiveStars === 0 ? `You're already at ${t.toFixed(1)}★ or above` : `5-star reviews to reach ${t.toFixed(1)}★`} />
          <Stat value={num(perMonth)} label="new reviews a month at your pace" />
        </>
      }
      summary={
        gap === 0
          ? "You're ahead on count. Keep new reviews coming every month: recent reviews and replies matter as much as the total."
          : `At about ${num(perMonth)} new reviews a month, closing a ${num(gap)}-review gap takes ${months === Infinity ? "forever" : `about ${num(months)} months`}. Asking every customer by text right after the job, plus a one-time campaign to past customers, is how owners close it faster.`
      }
    />
  );
}

export function MissedCallCalculator() {
  const [calls, setCalls] = useState(40);
  const [missed, setMissed] = useState(25);
  const [newShare, setNewShare] = useState(50);
  const [noCallback, setNoCallback] = useState(60);
  const [close, setClose] = useState(40);
  const [ticket, setTicket] = useState(450);

  const missedMo = clamp(calls, 0, 1e5) * 4.33 * (clamp(missed, 0, 100) / 100);
  const lostLeads = missedMo * (clamp(newShare, 0, 100) / 100) * (clamp(noCallback, 0, 100) / 100);
  const lostJobs = lostLeads * (clamp(close, 0, 100) / 100);
  const lostMo = lostJobs * clamp(ticket, 0, 1e7);

  return (
    <Shell
      inputs={
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="mc-calls" label="Calls per week" value={calls} onChange={setCalls} />
            <Input id="mc-missed" label="Calls you miss" value={missed} onChange={setMissed} max={100} suffix="%" hint="Check your phone log." />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="mc-new" label="Missed calls that are new customers" value={newShare} onChange={setNewShare} max={100} suffix="%" />
            <Input id="mc-nocb" label="Of those, how many don't call back" value={noCallback} onChange={setNoCallback} max={100} suffix="%" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="mc-close" label="Close rate on answered calls" value={close} onChange={setClose} max={100} suffix="%" />
            <Input id="mc-ticket" label="Average job value" value={ticket} onChange={setTicket} step={50} prefix="$" />
          </div>
        </>
      }
      results={
        <>
          <Stat big value={usd(lostMo)} label="lost each month" />
          <Stat big value={usd(lostMo * 12)} label="lost each year" />
          <Stat value={num(missedMo)} label="missed calls a month" />
          <Stat value={lostJobs.toFixed(1)} label="jobs lost a month" />
        </>
      }
      summary={`About ${num(lostLeads)} new customers a month call, get voicemail and move on. A text back within seconds of a missed call keeps most of them talking to you instead of the next company on Google. These numbers leave out repeat work and referrals, so the real cost is higher.`}
    />
  );
}

export function RoiCalculator() {
  const [cost, setCost] = useState(500);
  const [ticket, setTicket] = useState(450);
  const [margin, setMargin] = useState(40);
  const [extra, setExtra] = useState(4);
  const [repeat, setRepeat] = useState(1);

  const profitJob = clamp(ticket, 0, 1e7) * (clamp(margin, 0, 100) / 100);
  const c = clamp(cost, 0, 1e7);
  const breakEven = profitJob > 0 ? Math.ceil(c / profitJob - 1e-9) : Infinity;
  const lifetime = profitJob * Math.max(1, clamp(repeat, 1, 100));
  const gain = clamp(extra, 0, 1e5) * lifetime;
  const roi = c > 0 ? ((gain - c) / c) * 100 : Infinity;

  return (
    <Shell
      inputs={
        <>
          <Input id="roi-cost" label="Monthly marketing cost" value={cost} onChange={setCost} step={50} prefix="$" hint="Our packages run $97–1,797/mo. Use any agency's quote." />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="roi-ticket" label="Average job value" value={ticket} onChange={setTicket} step={50} prefix="$" />
            <Input id="roi-margin" label="Gross margin per job" value={margin} onChange={setMargin} max={100} suffix="%" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="roi-extra" label="Extra jobs a month you expect" value={extra} onChange={setExtra} />
            <Input id="roi-repeat" label="Jobs per customer over time" value={repeat} onChange={setRepeat} step={0.5} min={1} hint="1 if they never come back." />
          </div>
        </>
      }
      results={
        <>
          <Stat big value={breakEven === Infinity ? "-" : num(breakEven)} label={breakEven === 1 ? "extra job a month to break even" : "extra jobs a month to break even"} />
          <Stat big value={roi === Infinity ? "-" : `${num(roi)}%`} label="return on the monthly cost" />
          <Stat value={usd(profitJob)} label="profit per job" />
          <Stat value={usd(gain - c)} label="net profit a month (incl. repeat work)" />
        </>
      }
      summary={
        breakEven === Infinity
          ? "Add your average job value and margin to see the break-even point."
          : `At ${usd(profitJob)} profit per job, ${num(breakEven)} extra ${breakEven === 1 ? "job" : "jobs"} a month ${breakEven === 1 ? "pays" : "pay"} for ${usd(c)} of marketing. Anything above that is profit. Local SEO and reviews build over months, so judge them over 3 to 6 months, not the first.`
      }
    />
  );
}

export interface TemplateGroup { group: string; items: { name: string; when: string; text: string }[] }

const TEMPLATES: TemplateGroup[] = [
  {
    group: "Text messages",
    items: [
      { name: "Right after the job", when: "Send within an hour of finishing.", text: "Hi {first name}, thanks for choosing {business} today. If you were happy with the {job}, would you mind leaving us a quick Google review? It really helps a small local business: {review link}" },
      { name: "Reminder", when: "Two or three days later, only if they haven't left one.", text: "Hi {first name}, {tech name} from {business} here. Hope the {job} is holding up well. If you have a minute, a short Google review would mean a lot to our team: {review link} Thank you!" },
      { name: "Past customers", when: "One-time campaign to customers from the last year or two.", text: "Hi {first name}, it's {owner name} at {business}. We did your {job} last {season}, and I'm asking past customers a favor: would you leave us a quick Google review? It helps neighbors find a company they can trust. {review link}" },
      { name: "Missed-call text-back", when: "Sent automatically when you can't pick up.", text: "Hi, this is {business}. Sorry we missed your call, we're on a job right now. What can we help you with? Reply here and we'll get right back to you." },
    ],
  },
  {
    group: "Email",
    items: [
      { name: "After the job", when: "Send the same day, for customers who prefer email.", text: "Subject: How did we do, {first name}?\n\nHi {first name},\n\nThanks for having {business} out for your {job}. We hope everything is working the way it should.\n\nIf you have a minute, a short Google review would help other homeowners in {town} find us:\n{review link}\n\nIf anything isn't right, reply to this email and I'll take care of it personally.\n\nThanks,\n{owner name}\n{business} · {phone}" },
    ],
  },
  {
    group: "Replies to reviews",
    items: [
      { name: "5-star review", when: "Reply within a day or two. Mention the job.", text: "Thanks so much, {first name}! We're glad the {job} went smoothly and that {tech name} took good care of you. We appreciate you choosing {business} and we're here whenever you need us." },
      { name: "Short or no-text review", when: "Ratings with little or no text still deserve a reply.", text: "Thank you for the 5 stars, {first name}! We appreciate your business and the review." },
      { name: "Bad review", when: "Stay calm, don't argue, take it offline.", text: "{first name}, I'm sorry the {job} didn't go the way it should have. That's not the standard we hold ourselves to. I'd like to make it right: please call me directly at {phone} so we can sort it out. {owner name}, owner, {business}" },
    ],
  },
];

export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-ghost !px-3 !py-1.5 !text-xs"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1800); } catch { /* clipboard blocked: text is selectable */ }
      }}
    >
      {done ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
    </button>
  );
}

export function ReviewTemplates() {
  return <TemplateList groups={TEMPLATES} />;
}

export function TemplateList({ groups }: { groups: TemplateGroup[] }) {
  return (
    <div className="space-y-12" data-analytics-section="free_tool">
      {groups.map((g) => (
        <div key={g.group}>
          <h2 className="text-2xl font-bold text-ink">{g.group}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {g.items.map((t) => (
              <div key={t.name} className="card flex flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-ink">{t.name}</h3>
                    <p className="mt-1 text-sm text-muted">{t.when}</p>
                  </div>
                  <CopyButton text={t.text} />
                </div>
                <p className="mt-4 flex-1 whitespace-pre-line rounded-xl bg-surface p-4 text-sm leading-relaxed text-ink-soft">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
