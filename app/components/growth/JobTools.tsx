"use client";
// Free tools for running the business (/tools): pricing, hourly rate, maintenance plans, cost per lead, message
// templates and the Google review link + QR maker. Everything runs in the browser; nothing is sent anywhere.
import { useMemo, useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import { CopyButton, Input, Shell, Stat, TemplateList, clamp, num, usd, type TemplateGroup } from "@/app/components/growth/Calculators";
import { qrMatrix } from "@/app/lib/qr";

const pctText = (n: number) => (Number.isFinite(n) ? `${Math.round(n * 10) / 10}%` : "-");

export function JobPriceCalculator() {
  const [hours, setHours] = useState(6);
  const [rate, setRate] = useState(45);
  const [materials, setMaterials] = useState(300);
  const [other, setOther] = useState(50);
  const [overhead, setOverhead] = useState(25);
  const [profit, setProfit] = useState(15);

  const cost = clamp(hours, 0, 1e5) * clamp(rate, 0, 1e5) + clamp(materials, 0, 1e7) + clamp(other, 0, 1e7);
  const o = clamp(overhead, 0, 95) / 100;
  const p = clamp(profit, 0, 95) / 100;
  const price = o + p < 1 ? cost / (1 - o - p) : Infinity;
  const markup = cost > 0 && Number.isFinite(price) ? (price / cost - 1) * 100 : NaN;
  // The common mistake: adding overhead + profit on top of cost instead of working back from the price.
  const wrong = cost * (1 + o + p);
  const wrongProfit = wrong - cost - wrong * o;

  return (
    <Shell
      inputs={
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="jp-hours" label="Labor hours on the job" value={hours} onChange={setHours} step={0.5} hint="All people added together, with drive time." />
            <Input id="jp-rate" label="Labor cost per hour" value={rate} onChange={setRate} prefix="$" hint="Wage plus payroll taxes, insurance and benefits." />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="jp-mat" label="Materials" value={materials} onChange={setMaterials} step={25} prefix="$" />
            <Input id="jp-other" label="Permits, rentals, disposal" value={other} onChange={setOther} step={25} prefix="$" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="jp-over" label="Overhead, share of sales" value={overhead} onChange={setOverhead} max={95} suffix="%" hint="Yearly overhead divided by yearly sales." />
            <Input id="jp-profit" label="Profit you want" value={profit} onChange={setProfit} max={95} suffix="%" />
          </div>
        </>
      }
      results={
        <>
          <Stat big value={usd(price)} label="price to charge" />
          <Stat big value={usd(price * p)} label="profit after overhead" />
          <Stat value={pctText(markup)} label="markup on your job cost" />
          <Stat value={usd(cost)} label="direct job cost" />
        </>
      }
      summary={
        Number.isFinite(price)
          ? `Adding ${num((o + p) * 100)}% on top of cost would give ${usd(wrong)}, and ${wrongProfit >= 0 ? `leave only ${usd(wrongProfit)} of profit` : `lose ${usd(-wrongProfit)}`} once overhead is paid. Working back from the price, as above, keeps your full ${pctText(p * 100)}.`
          : "Overhead and profit together have to be under 100% of the price."
      }
    />
  );
}

export function HourlyRateCalculator() {
  const [pay, setPay] = useState(80000);
  const [overhead, setOverhead] = useState(40000);
  const [hours, setHours] = useState(25);
  const [weeks, setWeeks] = useState(48);
  const [profit, setProfit] = useState(15);

  const billable = clamp(hours, 0, 1e4) * clamp(weeks, 0, 52);
  const p = clamp(profit, 0, 95) / 100;
  const need = (clamp(pay, 0, 1e9) + clamp(overhead, 0, 1e9)) / (1 - p);
  const rate = billable > 0 ? need / billable : Infinity;
  const breakEven = billable > 0 ? (need * (1 - p)) / billable : Infinity;

  return (
    <Shell
      inputs={
        <>
          <Input id="hr-pay" label="Pay a year: you and your crew" value={pay} onChange={setPay} step={1000} prefix="$" hint="Include payroll taxes and benefits." />
          <Input id="hr-over" label="Overhead a year" value={overhead} onChange={setOverhead} step={1000} prefix="$" hint="Truck, fuel, insurance, tools, software, phone, marketing, office." />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="hr-hours" label="Billable hours a week" value={hours} onChange={setHours} hint="Hours customers pay for, everyone added up. Not drive time or quotes." />
            <Input id="hr-weeks" label="Weeks worked a year" value={weeks} onChange={setWeeks} max={52} />
          </div>
          <Input id="hr-profit" label="Profit you want on top" value={profit} onChange={setProfit} max={95} suffix="%" />
        </>
      }
      results={
        <>
          <Stat big value={usd(rate)} label="per billable hour" />
          <Stat big value={usd(breakEven)} label="an hour just to break even" />
          <Stat value={usd(need)} label="sales needed a year, without materials" />
          <Stat value={num(billable)} label="billable hours a year" />
        </>
      }
      summary={`Every billable hour you add a week brings the rate you need down. At ${num(clamp(hours, 0, 1e4) + 5)} hours a week it would be ${usd(need / ((clamp(hours, 0, 1e4) + 5) * Math.max(1, clamp(weeks, 0, 52))))}. Charge materials separately, with their own markup.`}
    />
  );
}

export function MaintenancePlanCalculator() {
  const [price, setPrice] = useState(19);
  const [members, setMembers] = useState(100);
  const [visits, setVisits] = useState(2);
  const [cost, setCost] = useState(65);
  const [extra, setExtra] = useState(120);
  const [extraMargin, setExtraMargin] = useState(45);

  const n = clamp(members, 0, 1e6);
  const planYear = clamp(price, 0, 1e5) * 12;
  const serveYear = clamp(visits, 0, 365) * clamp(cost, 0, 1e5);
  const planProfit = n * (planYear - serveYear);
  const extraProfit = n * clamp(extra, 0, 1e6) * (clamp(extraMargin, 0, 100) / 100);

  return (
    <Shell
      inputs={
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="mp-price" label="Plan price a month" value={price} onChange={setPrice} prefix="$" />
            <Input id="mp-members" label="Members" value={members} onChange={setMembers} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="mp-visits" label="Visits a year" value={visits} onChange={setVisits} />
            <Input id="mp-cost" label="Your cost per visit" value={cost} onChange={setCost} step={5} prefix="$" hint="Labor, drive time and parts." />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="mp-extra" label="Extra repairs per member a year" value={extra} onChange={setExtra} step={10} prefix="$" hint="Use your own average. 0 if you don't know." />
            <Input id="mp-margin" label="Margin on those repairs" value={extraMargin} onChange={setExtraMargin} max={100} suffix="%" />
          </div>
        </>
      }
      results={
        <>
          <Stat big value={usd((n * planYear) / 12)} label="recurring revenue a month" />
          <Stat big value={usd(planProfit + extraProfit)} label="gross profit a year" />
          <Stat value={planYear > 0 ? pctText(((planYear - serveYear) / planYear) * 100) : "-"} label="margin on the plan alone" />
          <Stat value={usd(visits > 0 ? serveYear / 12 : 0)} label="lowest monthly price to cover visits" />
        </>
      }
      summary={
        planYear >= serveYear
          ? `Each member pays ${usd(planYear)} a year and costs you ${usd(serveYear)} in visits. Repairs found on those visits add about ${usd(extraProfit)} of gross profit a year at your numbers.`
          : `At this price each member costs you ${usd(serveYear - planYear)} a year more than they pay. Raise the price, cut a visit, or only offer it where it brings enough repair work.`
      }
    />
  );
}

const MESSAGES: TemplateGroup[] = [
  {
    group: "Booking and visits",
    items: [
      { name: "Booking confirmed", when: "As soon as the visit is on the calendar.", text: "Hi {first name}, you're booked with {business} for {job} on {day} between {time window}. Need to change it? Reply here or use {reschedule link}." },
      { name: "Reminder", when: "The day before.", text: "Hi {first name}, a reminder that {business} is coming tomorrow between {time window} for your {job}. Reply C to confirm or R to reschedule." },
      { name: "On my way", when: "When the tech leaves.", text: "Hi {first name}, {tech name} from {business} is on the way and should be there around {time}. Any gate code or parking notes? Reply here." },
      { name: "Running late", when: "Before the window ends, not after.", text: "Hi {first name}, we're running behind on an earlier job. {tech name} now expects to reach you around {time}. Does that still work? If not, we'll find you a better slot." },
      { name: "Weather delay", when: "First thing in the morning.", text: "Hi {first name}, we can't safely do your {job} in today's weather. The next openings are {option 1} or {option 2}. Which one works?" },
    ],
  },
  {
    group: "New leads and estimates",
    items: [
      { name: "Missed call", when: "Within seconds.", text: "Hi, this is {business}. Sorry we missed you, we're on a job. What do you need help with? Reply here and we'll get right back to you." },
      { name: "Website request", when: "Right after the form comes in.", text: "Hi {first name}, thanks for contacting {business} about {job}. Could you send the address and a photo or two? Then we can give you a time, or a price if it's simple." },
      { name: "Estimate sent", when: "Right after you send it.", text: "Hi {first name}, your estimate for {job} is here: {estimate link}. Happy to go through any line. You can approve it on the same page." },
      { name: "Estimate follow-up", when: "Two or three days later.", text: "Hi {first name}, checking in on the {job} estimate. Any questions, or anything you'd like changed? We have openings {day} and {day}." },
      { name: "Last follow-up", when: "About two weeks later. Then stop.", text: "Hi {first name}, I don't want to bother you about the {job}. Should I keep the estimate open, or close it for now? Either answer is fine." },
    ],
  },
  {
    group: "Payment",
    items: [
      { name: "Invoice", when: "The day the job is done.", text: "Hi {first name}, thanks for having us out. Your invoice for {job} is {amount}: {pay link}. You can pay by card or bank on that page." },
      { name: "Friendly reminder", when: "A few days before or on the due date.", text: "Hi {first name}, a reminder that invoice {number} for {amount} is due {date}: {pay link}. Already paid? Thank you, and please ignore this." },
      { name: "Past due", when: "About a week late.", text: "Hi {first name}, invoice {number} for {amount} was due {date}. Is there anything holding it up? You can pay here: {pay link}, or call me on {phone}." },
    ],
  },
  {
    group: "Past customers",
    items: [
      { name: "Seasonal check-up", when: "Four to six weeks before your busy season.", text: "Hi {first name}, {business} here. We did your {job} in {month}. It's about time for a {seasonal service}. Want us to hold a spot before we fill up? Reply YES and we'll send times. Reply STOP to opt out." },
      { name: "Maintenance plan offer", when: "After a good job.", text: "Hi {first name}, if you'd rather not think about it, our maintenance plan covers {visits} visits a year for {price} a month: {plan link}. No pressure. Reply STOP to opt out." },
      { name: "Haven't heard from you", when: "A year or more since the last job.", text: "Hi {first name}, it's {owner name} at {business}. Anything around the house you've been putting off? Reply here and I'll take a look. Reply STOP to opt out." },
    ],
  },
];

export function ContractorMessages() {
  return <TemplateList groups={MESSAGES} />;
}

const SCRIPTS: TemplateGroup[] = [
  {
    group: "Voicemail greetings",
    items: [
      { name: "Standard", when: "Working hours, when you can't pick up.", text: "You've reached {business}, {trade} in {town}. We're on a job right now. Leave your name, number and what's going on, or text this same number, and we'll get back to you {today / within the hour}." },
      { name: "After hours", when: "Nights and weekends.", text: "Thanks for calling {business}. Our office is closed until {time}. For an emergency such as {examples}, press {key} or text EMERGENCY to this number. For anything else, leave a message and we'll call you {day}." },
      { name: "Holiday", when: "Days you're closed.", text: "You've reached {business}. We're closed for {holiday} and back on {date}. For an emergency, text this number and our on-call tech will answer. Otherwise leave your name and number and we'll call when we're back." },
    ],
  },
  {
    group: "Answering the phone",
    items: [
      { name: "First 20 seconds", when: "Every call.", text: "Thanks for calling {business}, this is {name}. How can I help? ... I'm sorry to hear that, we take care of that every week. Can I get your name and the address, in case we get cut off?" },
      { name: "Booking it", when: "Once you know the problem.", text: "We can be there {day} between {window}, or {day} between {window}. Which is better? ... Great. You'll get a text confirming it now, and another when {tech name} is on the way. Is this the best number for texts?" },
      { name: "\"How much will it cost?\"", when: "When they ask before you've seen it.", text: "It depends on what we find, so I don't want to guess and be wrong. The visit is {fee}, and {it goes toward the repair}. {tech name} gives you a price in writing before any work starts, and you decide. Would {day} work?" },
      { name: "\"I'm getting a few quotes\"", when: "When they're shopping.", text: "That makes sense. While you compare, ask each one if they're licensed and insured for this, what the warranty covers and who does the work. I'll send ours in writing today so you have it. Is {day} okay for us to check in?" },
    ],
  },
];

export function PhoneScripts() {
  return <TemplateList groups={SCRIPTS} />;
}

const PLACE_ID_FINDER = "https://developers.google.com/maps/documentation/places/web-service/place-id#find-id";

/** The review link for whatever they paste: a Place ID, or a Google review link copied from their profile. */
function reviewLink(raw: string): string | null {
  const v = raw.trim();
  if (/^[A-Za-z0-9_-]{20,200}$/.test(v)) return `https://search.google.com/local/writereview?placeid=${v}`;
  try {
    const u = new URL(v);
    const ok = u.protocol === "https:" && /(^|\.)(google\.com|g\.page|goo\.gl|g\.co)$/.test(u.hostname);
    return ok && v.length <= 200 ? u.href : null;
  } catch {
    return null;
  }
}

export function ReviewLinkMaker() {
  const [raw, setRaw] = useState("");
  const [name, setName] = useState("");
  const link = reviewLink(raw);
  const matrix = useMemo(() => (link ? qrMatrix(link) : null), [link]);
  const size = matrix ? matrix.length + 8 : 0;
  const path = matrix ? matrix.flatMap((row, y) => row.map((d, x) => (d ? `M${x + 4} ${y + 4}h1v1h-1z` : ""))).join("") : "";

  const downloadPng = () => {
    if (!matrix) return;
    const scale = Math.ceil(1200 / size);
    const c = document.createElement("canvas");
    c.width = c.height = size * scale;
    const g = c.getContext("2d");
    if (!g) return;
    g.fillStyle = "#fff";
    g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = "#000";
    matrix.forEach((row, y) => row.forEach((d, x) => { if (d) g.fillRect((x + 4) * scale, (y + 4) * scale, scale, scale); }));
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "google-review-qr-code.png";
    a.click();
  };

  return (
    <div className="grid gap-5 lg:grid-cols-12" data-analytics-section="free_tool">
      <form className="card grid grid-cols-1 content-start gap-5 p-6 md:p-8 lg:col-span-7" onSubmit={(e) => e.preventDefault()} aria-label="Your Google profile">
        <div>
          <label htmlFor="rl-id" className="text-sm font-medium text-ink">Your Google Place ID or review link</label>
          <input
            id="rl-id" value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="ChIJ... or https://g.page/r/..." autoComplete="off" spellCheck={false}
            className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-primary"
            aria-describedby="rl-hint"
          />
          <p id="rl-hint" className="mt-2 text-sm leading-relaxed text-ink-soft" role={raw && !link ? "alert" : undefined}>
            {raw && !link
              ? "That doesn't look like a Place ID or a Google link. Copy it again and paste the whole thing."
              : "Easiest: open your Google Business Profile, tap Ask for reviews and copy the link. Or find the Place ID below."}
          </p>
        </div>
        <div>
          <label htmlFor="rl-name" className="text-sm font-medium text-ink">Business name (optional, for the message)</label>
          <input id="rl-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} autoComplete="organization" className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-primary" />
        </div>
        <a href={PLACE_ID_FINDER} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Find my Place ID on Google&apos;s page <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
        {link && (
          <div className="space-y-4">
            <div className="rounded-xl bg-surface p-4">
              <div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-ink">Your review link</p><CopyButton text={link} /></div>
              <p className="mt-2 break-all text-sm text-ink-soft">{link}</p>
            </div>
            <div className="rounded-xl bg-surface p-4">
              <div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-ink">Text message</p><CopyButton text={`Hi {first name}, thanks for choosing ${name.trim() || "{business}"}. Would you leave us a quick Google review? ${link}`} /></div>
              <p className="mt-2 [overflow-wrap:anywhere] text-sm text-ink-soft">Hi {"{first name}"}, thanks for choosing {name.trim() || "{business}"}. Would you leave us a quick Google review? {link}</p>
            </div>
          </div>
        )}
      </form>
      <div className="relative overflow-hidden rounded-[1.75rem] bg-night p-6 text-center text-white md:p-8 lg:col-span-5" aria-live="polite">
        <p className="font-bold">Your QR code</p>
        {matrix ? (
          <>
            <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto mt-5 w-full max-w-[16rem] rounded-2xl bg-[#fff]" role="img" aria-label="QR code that opens your Google review page" shapeRendering="crispEdges">
              <path d={path} fill="#000" />
            </svg>
            <button type="button" onClick={downloadPng} className="btn btn-light mt-5"><Download className="h-4 w-4" aria-hidden /> Download PNG</button>
            <p className="mt-3 text-xs text-white/60">Scan it with your own phone before you print it.</p>
          </>
        ) : (
          <p className="mx-auto mt-10 max-w-xs text-sm leading-relaxed text-white/70">Paste your link or Place ID and the code shows here, ready to print on invoices, yard signs or a card.</p>
        )}
      </div>
    </div>
  );
}
