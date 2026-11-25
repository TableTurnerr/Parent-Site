"use client";
// More free tools (/tools): lead source comparison, reply speed, Google description builder, and the missed-call and
// review-reply templates. Everything runs in the browser; nothing is sent anywhere.
import { useState } from "react";
import { Check, TriangleAlert } from "lucide-react";
import { CopyButton, Input, Shell, Stat, TemplateList, clamp, num, usd, type TemplateGroup } from "@/app/components/growth/Calculators";

interface Source { name: string; spend: number; leads: number; jobs: number }
const SOURCES: Source[] = [
  { name: "Local Services Ads", spend: 1200, leads: 24, jobs: 9 },
  { name: "Shared lead site", spend: 900, leads: 30, jobs: 4 },
  { name: "Google profile and website", spend: 500, leads: 18, jobs: 8 },
];
const cell = "w-full min-w-0 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-primary";

export function CostPerLeadCalculator() {
  const [rows, setRows] = useState<Source[]>(SOURCES);
  const [ticket, setTicket] = useState(900);
  const [margin, setMargin] = useState(40);
  const profitJob = clamp(ticket, 0, 1e8) * (clamp(margin, 0, 100) / 100);
  const set = (i: number, patch: Partial<Source>) => setRows((r) => r.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const calc = rows.map((r) => {
    const spend = clamp(r.spend, 0, 1e8), leads = clamp(r.leads, 0, 1e6), jobs = clamp(r.jobs, 0, 1e6);
    return { ...r, perLead: leads > 0 ? spend / leads : NaN, perJob: jobs > 0 ? spend / jobs : NaN, left: jobs * profitJob - spend, rate: leads > 0 ? jobs / leads : 0 };
  });
  const withJobs = calc.filter((c) => Number.isFinite(c.perJob));
  const best = withJobs.length ? withJobs.reduce((a, b) => (b.perJob < a.perJob ? b : a)) : null;
  const cheapest = calc.filter((c) => Number.isFinite(c.perLead)).sort((a, b) => a.perLead - b.perLead)[0];

  return (
    <div className="space-y-5" data-analytics-section="free_tool">
      <form className="card p-5 md:p-8" onSubmit={(e) => e.preventDefault()} aria-label="Your lead sources">
        <p className="font-bold text-ink">One month, your real numbers</p>
        <p className="mt-1 text-sm text-ink-soft">The figures below are only examples. Type over them.</p>
        <div className="mt-5 space-y-4">
          {rows.map((r, i) => (
            <fieldset key={i} className="grid grid-cols-3 gap-3 rounded-xl border border-line p-4 md:grid-cols-6">
              <legend className="sr-only">Source {i + 1}</legend>
              <label className="col-span-3 text-xs font-medium text-ink">Source<input className={`${cell} mt-1`} value={r.name} onChange={(e) => set(i, { name: e.target.value })} /></label>
              <label className="text-xs font-medium text-ink">Spend $<input type="number" inputMode="decimal" min={0} className={`${cell} mt-1`} value={Number.isFinite(r.spend) ? r.spend : ""} onChange={(e) => set(i, { spend: e.target.valueAsNumber })} /></label>
              <label className="text-xs font-medium text-ink">Leads<input type="number" inputMode="decimal" min={0} className={`${cell} mt-1`} value={Number.isFinite(r.leads) ? r.leads : ""} onChange={(e) => set(i, { leads: e.target.valueAsNumber })} /></label>
              <label className="text-xs font-medium text-ink">Jobs won<input type="number" inputMode="decimal" min={0} className={`${cell} mt-1`} value={Number.isFinite(r.jobs) ? r.jobs : ""} onChange={(e) => set(i, { jobs: e.target.valueAsNumber })} /></label>
            </fieldset>
          ))}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Input id="cl-ticket" label="Average job value" value={ticket} onChange={setTicket} step={50} prefix="$" />
          <Input id="cl-margin" label="Gross margin" value={margin} onChange={setMargin} max={100} suffix="%" />
        </div>
      </form>
      <div className="relative overflow-hidden rounded-[1.75rem] bg-night p-5 text-white md:p-8" aria-live="polite">
        <p className="font-bold">Your result</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead><tr className="border-b border-white/20 text-white/70"><th className="py-2 pr-4 font-medium">Source</th><th className="py-2 pr-4 font-medium">Cost per lead</th><th className="py-2 pr-4 font-medium">Cost per job</th><th className="py-2 pr-4 font-medium">Most a lead can cost</th><th className="py-2 font-medium">Left after marketing</th></tr></thead>
            <tbody>
              {calc.map((c, i) => (
                <tr key={i} className="border-b border-white/10">
                  <th scope="row" className="py-3 pr-4 font-semibold">{c.name || `Source ${i + 1}`}</th>
                  <td className="py-3 pr-4">{usd(c.perLead)}</td><td className="py-3 pr-4 font-bold">{usd(c.perJob)}</td><td className="py-3 pr-4">{usd(profitJob * c.rate)}</td><td className="py-3">{usd(c.left)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-white/75">
          {!best
            ? "Add the jobs each source won to compare them."
            : cheapest && cheapest.name !== best.name
              ? `${cheapest.name} has the cheapest leads, but ${best.name} has the cheapest jobs. Judge sources by cost per job.`
              : `${best.name} brings jobs for the least money. At ${usd(profitJob)} profit per job, any source with a cost per job under that pays for itself.`}
        </p>
      </div>
    </div>
  );
}

export function LeadResponseCalculator() {
  const [leads, setLeads] = useState(60);
  const [now, setNow] = useState(25);
  const [later, setLater] = useState(32);
  const [ticket, setTicket] = useState(800);
  const [margin, setMargin] = useState(40);
  const l = clamp(leads, 0, 1e6);
  const extra = Math.max(0, l * ((clamp(later, 0, 100) - clamp(now, 0, 100)) / 100));
  const revenue = extra * clamp(ticket, 0, 1e7);
  return (
    <Shell
      inputs={
        <>
          <Input id="lr-leads" label="New leads a month" value={leads} onChange={setLeads} hint="Calls, texts, forms, messages and lead sites added up." />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="lr-now" label="Leads you win now" value={now} onChange={setNow} max={100} suffix="%" />
            <Input id="lr-later" label="Leads you win when you reply fast" value={later} onChange={setLater} max={100} suffix="%" hint="Check your own: compare leads answered in 5 minutes with the rest." />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="lr-ticket" label="Average job value" value={ticket} onChange={setTicket} step={50} prefix="$" />
            <Input id="lr-margin" label="Gross margin" value={margin} onChange={setMargin} max={100} suffix="%" />
          </div>
        </>
      }
      results={
        <>
          <Stat big value={extra.toFixed(1)} label="more jobs a month" />
          <Stat big value={usd(revenue)} label="more revenue a month" />
          <Stat value={usd(revenue * (clamp(margin, 0, 100) / 100))} label="more gross profit a month" />
          <Stat value={usd(revenue * 12)} label="more revenue a year" />
        </>
      }
      summary={`No benchmark is built in on purpose. Pull last month's ${num(l)} leads, note how long each waited for a first reply and which became jobs, and use your own two win rates.`}
    />
  );
}

const field = "mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-primary";
const LIMIT = 750;

export function GbpDescriptionBuilder() {
  const [f, setF] = useState({ name: "", trade: "", towns: "", services: "", since: "", proof: "" });
  const [edited, setEdited] = useState<string | null>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => { setF({ ...f, [k]: e.target.value }); setEdited(null); };
  const draft = [
    `${f.name || "[Business name]"} is a ${f.trade || "[trade]"} company serving ${f.towns || "[towns you serve]"}${f.since ? ` since ${f.since}` : ""}.`,
    `We handle ${f.services || "[your main services]"}.`,
    f.proof ? `${f.proof.replace(/\.$/, "")}.` : "",
    "You get a clear price before work starts, a text when we're on the way, and one person to call if anything isn't right.",
  ].filter(Boolean).join(" ");
  const text = edited ?? draft;
  const checks: [boolean, string][] = [
    [text.length <= LIMIT, `${text.length} of ${LIMIT} characters`],
    [!/https?:|www\.|\.com\b|<[a-z]/i.test(text), "No links or HTML"],
    [!/(\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/.test(text), "No phone number (it has its own field)"],
    [!/\b(sale|discount|coupon|\d+% off|\$\d+|limited time|free)\b/i.test(text), "No prices or promotions"],
    [!/\b(?:[A-Z]{4,}\s+){2,}/.test(text), "No shouting in capitals"],
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-12" data-analytics-section="free_tool">
      <form className="card grid content-start gap-4 p-6 md:p-8 lg:col-span-6" onSubmit={(e) => e.preventDefault()} aria-label="About your business">
        <label className="text-sm font-medium text-ink">Business name<input className={field} value={f.name} onChange={set("name")} autoComplete="organization" /></label>
        <label className="text-sm font-medium text-ink">Trade<input className={field} value={f.trade} onChange={set("trade")} placeholder="plumbing" /></label>
        <label className="text-sm font-medium text-ink">Towns you serve<input className={field} value={f.towns} onChange={set("towns")} placeholder="Salem, Keizer and West Salem" /></label>
        <label className="text-sm font-medium text-ink">Main services<input className={field} value={f.services} onChange={set("services")} placeholder="drain cleaning, water heaters, leak repair and repipes" /></label>
        <label className="text-sm font-medium text-ink">In business since (optional)<input className={field} value={f.since} onChange={set("since")} placeholder="2014" inputMode="numeric" /></label>
        <label className="text-sm font-medium text-ink">One true thing that sets you apart (optional)<input className={field} value={f.proof} onChange={set("proof")} placeholder="The owner is on every job" /></label>
      </form>
      <div className="card flex flex-col p-6 md:p-8 lg:col-span-6">
        <div className="flex items-center justify-between gap-3"><p className="font-bold text-ink">Your description</p><CopyButton text={text} /></div>
        <textarea aria-label="Your description" rows={9} className={`${field} leading-relaxed`} value={text} onChange={(e) => setEdited(e.target.value)} />
        <ul className="mt-5 space-y-2 text-sm" aria-live="polite">
          {checks.map(([ok, label]) => (
            <li key={label} className={`flex items-center gap-2 ${ok ? "text-ink-soft" : "font-semibold text-ink"}`}>
              {ok ? <Check className="h-4 w-4 text-success" aria-hidden /> : <TriangleAlert className="h-4 w-4 text-star" aria-hidden />}
              {label}{ok ? "" : ": check this"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const MISSED: TemplateGroup[] = [
  {
    group: "Any trade",
    items: [
      { name: "Working hours", when: "Seconds after the missed call.", text: "Hi, it's {business}. Sorry we missed you, we're on a job. What do you need help with? Reply here and we'll get right back to you." },
      { name: "After hours", when: "Nights and weekends.", text: "Hi, it's {business}. We're closed until {time}. Tell us what's going on and the address, and you'll be first on the list. If it's an emergency, reply EMERGENCY." },
      { name: "Second message", when: "If they reply but you still can't call.", text: "Thanks, got it. {tech name} can call you around {time}. Or pick a time that suits you: {booking link}" },
      { name: "No reply", when: "The next morning. Then stop.", text: "Morning, it's {business} again. Still need a hand with that? We have a couple of openings {day}. If it's sorted, no need to reply." },
    ],
  },
  {
    group: "Urgent trades",
    items: [
      { name: "Plumbing leak", when: "Any hour.", text: "Hi, it's {business}. Sorry we missed you. If water is running, shut off the main valve if you safely can, then reply LEAK with your address. We'll tell you how soon we can be there." },
      { name: "No heat or AC", when: "Peak season.", text: "Hi, it's {business}. Is your system completely out, or just not keeping up? Reply OUT or WEAK with your address and we'll text you the next opening." },
      { name: "Electrical", when: "Any hour.", text: "Hi, it's {business}. If you smell burning or see sparks, get out and call 911. Otherwise reply with what's happening and your address, and we'll text you a time." },
      { name: "Lockout or garage door", when: "Any hour.", text: "Hi, it's {business}. Sorry we missed you. Is the door stuck open or closed, and is a car trapped? Reply with your address and a photo if you can." },
      { name: "Storm damage, roofing", when: "After a storm.", text: "Hi, it's {business}. We're taking calls from last night's storm in order. Reply with your address, whether water is coming in, and a photo from the ground. Please stay off the roof." },
    ],
  },
  {
    group: "Planned work",
    items: [
      { name: "Painting, remodeling, decks", when: "Working hours.", text: "Hi, it's {business}. Sorry we missed your call. What's the project, and roughly when would you like it done? A photo or two helps us give you a quicker answer." },
      { name: "Cleaning", when: "Working hours.", text: "Hi, it's {business}. Is this for a one-time clean or regular visits? Reply with bedrooms, bathrooms and your zip and we'll text you a price range." },
      { name: "Lawn, landscaping, pressure washing", when: "Working hours.", text: "Hi, it's {business}. Sorry we missed you. Reply with the address and what you need, and we'll look at it and text you back today." },
      { name: "Pest control", when: "Any hour.", text: "Hi, it's {business}. What are you seeing, and where in the house? Reply here with your zip and we'll text you the next opening." },
    ],
  },
];

export function MissedCallTemplates() {
  return <TemplateList groups={MISSED} />;
}

const REPLIES: TemplateGroup[] = [
  {
    group: "Good reviews",
    items: [
      { name: "5 stars with details", when: "Within a day or two. Mention what they mentioned.", text: "Thank you, {first name}! {tech name} will be glad to hear it. We're happy the {job} turned out the way you wanted, and we're here if anything comes up." },
      { name: "5 stars, no text", when: "Still worth a line.", text: "Thank you for the 5 stars, {first name}. We appreciate you choosing {business}." },
      { name: "4 stars", when: "Thank them, then ask.", text: "Thanks, {first name}. We're glad the {job} went well. If there's one thing we could have done better, we'd like to hear it: {phone}." },
      { name: "Repeat customer", when: "Show you remember.", text: "Thanks for having us back, {first name}. It means a lot that you called us again for the {job}." },
    ],
  },
  {
    group: "Unhappy reviews",
    items: [
      { name: "Late or no-show", when: "Own it.", text: "{first name}, you set aside time and we weren't there when we said. I'm sorry. I'd like to make it right. Please call me directly at {phone}. {owner name}, owner" },
      { name: "Price", when: "Explain without arguing.", text: "{first name}, I understand the price was more than you expected. We give a written price before starting, and I'd like to look at what happened on yours. Please call me at {phone}. {owner name}" },
      { name: "Quality or callback", when: "Offer the fix.", text: "{first name}, that's not how the {job} should have turned out. I'd like to come and look at it myself. Please call me at {phone} and we'll set a time. {owner name}" },
      { name: "Rude or messy", when: "Short and sincere.", text: "{first name}, I'm sorry. That's not how we treat people or their homes, and I've spoken with the crew. I'd like to hear the details: {phone}. {owner name}" },
      { name: "1 star, no text", when: "Ask what happened.", text: "{first name}, I'm sorry to see this. I'd like to know what went wrong so we can fix it. Please call me at {phone}. {owner name}, owner" },
    ],
  },
  {
    group: "Reviews that don't look right",
    items: [
      { name: "Not a customer", when: "Stay neutral. Report it if it breaks Google's policy.", text: "Hi {first name}, we can't find a job under this name. If we've missed it, please call {phone} with the address so we can look into it. If this was meant for another company, could you take a look?" },
      { name: "Wrong company", when: "Polite and specific.", text: "Hi {first name}, I think this may be for a different business. We don't offer {service}, and we haven't worked at {area}. Would you mind checking? Thank you. {business}" },
      { name: "Ongoing dispute", when: "Don't argue the case in public.", text: "{first name}, we take this seriously and want to settle it with you directly. I've left you a message and can be reached at {phone}. {owner name}" },
    ],
  },
];

export function ReviewReplyTemplates() {
  return <TemplateList groups={REPLIES} />;
}
