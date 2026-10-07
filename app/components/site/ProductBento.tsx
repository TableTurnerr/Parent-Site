"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FEATURES as FEATURE_PAGES } from "@/app/lib/features";
import {
  ArrowRight, Bot, CalendarClock, Camera, ChevronRight, CircleHelp, ClipboardList,
  Expand, LayoutPanelTop, ReceiptText, Repeat2, Route,
  Star, Users, X,
} from "lucide-react";

type DemoType = "reactivation" | "whyReviews" | "ai" | "social" | "crm" | "dispatch" | "jobProof" | "invoicing";
type Feature = {
  title: string;
  description: string;
  detail: string;
  benefits: string[];
  icon: typeof Repeat2;
  tone: string;
  demo: DemoType;
  fieldTask?: boolean;
};

const FEATURES: Feature[] = [
  { title: "Review Reactivation", description: "Turn your past-customer list into a fresh wave of review requests.", detail: "Bring your existing customer history back to work with a polite, measured campaign that feels personal and keeps your team out of the follow-up loop.", benefits: ["Import past customers", "Send by text and email", "Control campaign pacing", "Watch new reviews arrive"], icon: Repeat2, tone: "from-violet-50 to-indigo-50", demo: "reactivation" },
  { title: "Why reviews matter", description: "They are the proof homeowners see before deciding who to call.", detail: "A current, visible record of real customer feedback helps the next homeowner feel more confident choosing you. It turns great work from something one customer experienced into proof the next customer can see.", benefits: ["Make great work visible", "Build confidence before the call", "Show customers what to expect", "Keep your local presence current"], icon: CircleHelp, tone: "from-amber-50 to-orange-50", demo: "whyReviews" },
  { title: "AI requests & replies", description: "Personal messages out. Thoughtful owner replies handled.", detail: "Create a review experience that sounds like your business—without asking office staff to write every request or response from scratch.", benefits: ["Personalized requests", "Text and email delivery", "AI-assisted replies", "Keep the owner voice"], icon: Bot, tone: "from-fuchsia-50 to-violet-50", demo: "ai" },
  { title: "Widgets & automatic social posts", description: "Put your newest proof to work everywhere customers find you.", detail: "A new 5-star review can become fresh trust on your website and a ready-to-share social post without a manual design task.", benefits: ["Website review widgets", "Branded social-ready posts", "Fresh social proof", "Automatic publishing workflow"], icon: LayoutPanelTop, tone: "from-emerald-50 to-sky-50", demo: "social" },
  { title: "CRM setup & contact import", description: "No CRM? We can import your contacts and give every lead a clear place to go.", detail: "If you do not already have a CRM or a reliable way to keep up with leads, TableTurnerr can import your contacts into a CRM setup for you. Keep leads, conversations, and follow-up together, then use the mobile app to stay connected while you are on the go.", benefits: ["We import your existing contacts", "Keep leads and conversations in one place", "Automate text and email follow-up", "Use the mobile app while you are on the go"], icon: Users, tone: "from-blue-50 to-cyan-50", demo: "crm" },
  { title: "Dispatch, scheduling & routes", description: "Coordinate the day from one place with FieldTask, from the next booking to the best route.", detail: "Give office staff a clear view of the day, assign the right technician, and help the crew spend less time driving between jobs. FieldTask keeps dispatching, scheduling, and route planning connected inside HighLevel.", benefits: ["Dispatch jobs to the crew", "Schedule from one board", "Plan efficient routes", "Keep office and field aligned"], icon: CalendarClock, tone: "from-cyan-50 to-blue-50", demo: "dispatch", fieldTask: true },
  { title: "Work orders & job photos", description: "Put the job details in the technician’s hand and keep proof of work attached to the job.", detail: "With FieldTask, technicians can arrive with the customer history, work order, route, and checklist they need, then capture job photos and signatures while the details are still fresh.", benefits: ["Mobile work orders", "Customer and job history", "Job photos and signatures", "Clear proof of work"], icon: ClipboardList, tone: "from-rose-50 to-orange-50", demo: "jobProof", fieldTask: true },
  { title: "Time tracking & invoicing", description: "Track time in the field, send invoices from completed jobs, and keep the paperwork moving.", detail: "FieldTask helps teams record time, create an invoice when the work is done, and sync the job details back to HighLevel—without rebuilding the same information in another system.", benefits: ["Mobile time tracking", "Create invoices from jobs", "Keep job details connected", "Move from work to payment faster"], icon: ReceiptText, tone: "from-lime-50 to-emerald-50", demo: "invoicing", fieldTask: true },
];

function Demo({ type, large = false }: { type: DemoType; large?: boolean }) {
  const base = large ? "p-5 text-sm" : "p-4 text-xs";
  if (type === "reactivation") return <div className={`rounded-2xl border border-violet-100 bg-white/85 shadow-sm ${base}`}><div className="flex items-center justify-between font-semibold text-ink"><span>Past customers</span><span className="rounded-full bg-violet-100 px-2 py-1 text-[10px] text-primary">Campaign live</span></div>{["Marcus B.", "Elena R.", "James W."].map((name, index) => <div key={name} className="mt-3 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary-soft font-bold text-primary">{name[0]}</span><span className="flex-1 font-medium text-ink-soft">{name}</span><span className={index === 0 ? "text-success" : "text-muted"}>{index === 0 ? "Sent" : "Queued"}</span></div>)}</div>;
  if (type === "whyReviews") return <div className={`rounded-2xl border border-amber-100 bg-white/90 ${base}`}><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-700"><CircleHelp className="h-5 w-5" /></div><div><p className="font-bold text-ink">Before they call</p><p className="mt-1 text-[10px] text-muted">Homeowners look for proof</p></div></div><div className="mt-4 rounded-xl bg-amber-50 p-3"><div className="flex items-center gap-2"><Star className="h-3.5 w-3.5 fill-star text-star" /><p className="stars text-sm">★★★★★</p></div><p className="mt-2 text-[11px] font-semibold text-ink">Recent customer feedback builds confidence.</p></div></div>;
  if (type === "ai") return <div className={`rounded-2xl border border-fuchsia-100 bg-white/90 ${base}`}><div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-white">Hi Jamie—thanks for choosing us. Would you share your experience?</div><div className="mt-3 max-w-[78%] rounded-2xl rounded-bl-md bg-surface p-3 text-ink-soft">Absolutely. Five stars!</div><div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-primary"><Bot className="h-4 w-4" /><span className="font-semibold">Reply drafted for approval</span></div></div>;
  if (type === "crm") return <div className={`rounded-2xl border border-blue-100 bg-white/90 ${base}`}><div className="flex items-center justify-between"><div><p className="font-bold text-ink">Contacts imported</p><p className="mt-1 text-[10px] text-muted">Your lead pipeline, in one place</p></div><Users className="h-5 w-5 text-primary" /></div><div className="mt-4 space-y-2">{[["New enquiry", "Today"], ["Follow-up", "Tomorrow"], ["Booked", "This week"]].map(([stage, timing], index) => <div key={stage} className="flex items-center gap-3 rounded-xl bg-blue-50 p-2.5"><span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-primary" : index === 1 ? "bg-sky-400" : "bg-success"}`} /><span className="flex-1 text-[11px] font-semibold text-ink">{stage}</span><span className="text-[10px] text-muted">{timing}</span></div>)}</div></div>;
  if (type === "dispatch") return <div className={`rounded-2xl border border-cyan-100 bg-white/90 ${base}`}><div className="flex items-center justify-between"><div><p className="font-bold text-ink">Today’s jobs</p><p className="mt-1 text-[10px] text-muted">Tuesday · 6 scheduled</p></div><Route className="h-5 w-5 text-primary" /></div><div className="mt-4 grid grid-cols-3 gap-2">{[["8:30", "Install", "Ava"], ["10:00", "Repair", "Noah"], ["1:30", "Service", "Mia"]].map(([time, job, tech]) => <div key={time} className="rounded-xl bg-cyan-50 p-2"><p className="text-[10px] font-bold text-primary">{time}</p><p className="mt-2 text-[11px] font-semibold text-ink">{job}</p><p className="mt-1 text-[10px] text-muted">{tech}</p></div>)}</div></div>;
  if (type === "jobProof") return <div className={`rounded-2xl border border-rose-100 bg-white/90 ${base}`}><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-rose-100 text-rose-600"><ClipboardList className="h-5 w-5" /></div><div><p className="font-bold text-ink">Work order complete</p><p className="mt-1 text-[10px] text-muted">Johnson residence · #1048</p></div></div><div className="mt-4 grid grid-cols-2 gap-2"><div className="grid min-h-16 place-items-center rounded-xl bg-orange-100 text-orange-600"><Camera className="h-5 w-5" /></div><div className="rounded-xl border border-dashed border-rose-200 p-3"><p className="text-[10px] font-bold text-ink">Signed</p><p className="mt-2 text-[10px] text-success">Proof saved</p></div></div></div>;
  if (type === "invoicing") return <div className={`rounded-2xl border border-lime-100 bg-white/90 ${base}`}><div className="flex items-center justify-between"><div><p className="font-bold text-ink">Job #1048</p><p className="mt-1 text-[10px] text-muted">Time logged · 2h 15m</p></div><span className="rounded-full bg-lime-100 px-2 py-1 text-[10px] font-bold text-emerald-700">Complete</span></div><div className="mt-4 rounded-xl bg-lime-50 p-3"><div className="flex items-center justify-between text-[10px] text-muted"><span>Invoice ready</span><span>Today</span></div><div className="mt-2 flex items-end justify-between"><p className="text-sm font-bold text-ink">$485.00</p><p className="text-[10px] font-bold text-primary">Send invoice →</p></div></div></div>;
  return <div className={`grid grid-cols-[1.1fr_.9fr] gap-3 ${base}`}><div className="rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm"><p className="stars text-sm">★★★★★</p><p className="mt-2 font-semibold text-ink">“Fast, professional work.”</p><p className="mt-2 text-[10px] text-muted">Website widget</p></div><div className="rounded-2xl bg-primary p-3 text-white"><p className="text-[10px] text-white/60">NEW REVIEW</p><p className="mt-2 text-sm font-bold">Five stars from a happy homeowner.</p><p className="mt-4 text-[10px] text-white/70">Share post →</p></div></div>;
}

export default function ProductBento() {
  const [active, setActive] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const dialog = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const feature = active === null ? null : FEATURES[active];
  const featurePage = feature
    ? Object.values(FEATURE_PAGES).find((item) => item.title === feature.title)
    : undefined;
  const featureCard = (item: Feature, index: number, spanClass: string) => <button key={item.title} type="button" aria-haspopup="dialog" aria-controls="feature-dialog" aria-expanded={active === index} onClick={(event) => { opener.current = event.currentTarget; setActive(index); }} className={`bento-card group flex min-h-[350px] flex-col overflow-hidden rounded-[1.35rem] border border-line bg-gradient-to-br ${item.tone} p-5 text-left outline-none transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-30px_rgba(22,26,51,.38)] focus-visible:ring-4 focus-visible:ring-primary/25 md:min-h-[370px] md:p-6 ${spanClass}`}>
    <span className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-line bg-white/80 text-ink transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6"><Expand className="h-4 w-4" /></span>
    <item.icon className="h-5 w-5 text-primary" /><h3 className="mt-5 max-w-[80%] text-xl font-bold text-ink">{item.title}</h3><p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">{item.description}</p>
    <div className="mt-auto pt-6 transition-transform duration-300 group-hover:-translate-y-1"><Demo type={item.demo} /></div>
  </button>;

  useEffect(() => {
    if (active === null) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => dialog.current?.focus(), 30);
    return () => { window.clearTimeout(timer); document.body.style.overflow = overflow; opener.current?.focus(); };
  }, [active]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key !== "Tab" || !dialog.current) return;
      const items = dialog.current.querySelectorAll<HTMLElement>("button, a[href]");
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <section id="features" className="section overflow-hidden bg-white">
    <div className="container-tt">
      <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
        <div><span className="eyebrow">Built for home-service industries</span><h2 className="display-2 mt-5">Everything you need to own your local market.</h2></div>
        <p className="lead max-w-xl lg:pb-1">Turn completed jobs and past customers into a steady flow of reviews, stronger local rankings, and more booked work—all on autopilot. Need a CRM too? We can import your contacts, organize every lead, and give your team a mobile app for work on the go.</p>
      </div>
      <div className="mt-12 space-y-4">
        <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          <p aria-hidden className="pointer-events-none absolute right-full top-1/2 mr-4 hidden w-32 -translate-y-1/2 text-right font-hand text-2xl font-semibold leading-[.95] text-primary/75 min-[1440px]:block">Getting reviews</p>
          {FEATURES.map((item, index) => !item.fieldTask && index < 2 && featureCard(item, index, index === 0 ? "lg:col-span-7" : "lg:col-span-5"))}
        </div>
        <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          <p aria-hidden className="pointer-events-none absolute right-full top-1/2 mr-4 hidden w-32 -translate-y-1/2 text-right font-hand text-2xl font-semibold leading-[.95] text-primary/75 min-[1440px]:block">Managing leads &amp; reviews</p>
          {FEATURES.map((item, index) => !item.fieldTask && index >= 2 && featureCard(item, index, "md:col-span-1 lg:col-span-4"))}
        </div>
        <div className="relative">
          <p aria-hidden className="pointer-events-none absolute right-full top-1/2 mr-4 hidden w-32 -translate-y-1/2 text-right font-hand text-2xl font-semibold leading-[.95] text-primary/75 min-[1440px]:block">Field Management</p>
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-gradient-to-r from-cyan-50 via-white to-lime-50 shadow-sm">
          <div className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {FEATURES.map((item, index) => item.fieldTask && <button key={item.title} type="button" aria-haspopup="dialog" aria-controls="feature-dialog" aria-expanded={active === index} onClick={(event) => { opener.current = event.currentTarget; setActive(index); }} className="group relative flex min-h-[350px] flex-col p-5 text-left outline-none transition hover:bg-white/60 focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary/25 md:min-h-[370px] sm:p-6">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${item.tone} text-primary`}><item.icon className="h-5 w-5" /></span>
              <span className="mt-4"><span className="flex items-center gap-2 text-base font-bold text-ink">{item.title}<Expand className="h-3.5 w-3.5 text-muted transition-transform group-hover:scale-110" /></span><span className="mt-1 block text-sm leading-relaxed text-ink-soft">{item.description}</span></span>
              <span className="mt-auto block pt-5 transition-transform duration-300 group-hover:-translate-y-1"><Demo type={item.demo} /></span>
            </button>)}
          </div>
        </div>
        </div>
      </div>
    </div>
    <AnimatePresence>{feature && <motion.div className="fixed inset-0 z-[90] grid place-items-center p-3 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button aria-label="Close feature details" onClick={() => setActive(null)} className="absolute inset-0 cursor-default bg-night/55 backdrop-blur-sm" />
      <motion.div id="feature-dialog" ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="feature-dialog-title" className="relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[1.6rem] border border-white/50 bg-white shadow-2xl outline-none" initial={reduced ? false : { opacity: 0, scale: .97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, scale: .98, y: 12 }} transition={{ duration: .22, ease: "easeOut" }}>
        <button type="button" onClick={() => setActive(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-line bg-white shadow-sm transition hover:bg-surface focus-visible:ring-4 focus-visible:ring-primary/25" aria-label="Close"><X className="h-5 w-5" /></button>
        <div className={`grid gap-10 bg-gradient-to-br ${feature.tone} p-6 pt-20 sm:p-10 sm:pt-10 lg:grid-cols-[.85fr_1.15fr] lg:p-14`}>
          <div><span className="eyebrow">TableTurnerr feature</span><h2 id="feature-dialog-title" className="display-2 mt-5">{feature.title}</h2><p className="lead mt-5">{feature.detail}</p><ul className="mt-7 grid gap-3 sm:grid-cols-2">{feature.benefits.map((benefit) => <li key={benefit} className="flex items-center gap-2 text-sm font-semibold text-ink"><ChevronRight className="h-4 w-4 text-primary" />{benefit}</li>)}</ul><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/signup" className="btn btn-primary">Start free trial <ArrowRight className="h-4 w-4" /></Link><Link href="/#how" className="btn btn-ghost">See how it works</Link></div></div>
          <div className="flex items-center"><div className="w-full rounded-[1.4rem] border border-white/80 bg-white/60 p-4 shadow-[0_26px_60px_-35px_rgba(22,26,51,.35)] sm:p-6"><Demo type={feature.demo} large /><div className="mt-5 rounded-2xl border border-line bg-white p-4"><p className="text-sm font-bold text-ink">Built for the work after the job</p><p className="mt-1 text-sm leading-relaxed text-ink-soft">Every detail is designed to turn a great finished job into visible proof that helps the next customer choose you.</p></div></div></div>
        </div>
        <div className="border-t border-line px-6 py-5 sm:px-10"><p className="text-sm font-semibold text-ink">More to explore</p><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm"><Link href={featurePage ? `/features/${featurePage.slug}` : "/features"} className="font-semibold text-primary hover:underline">Full feature details</Link><a href="#how" className="font-semibold text-primary hover:underline">How it works</a><a href="#pricing" className="font-semibold text-primary hover:underline">Simple pricing</a><Link href="/industries" className="font-semibold text-primary hover:underline">Industries we serve</Link></div></div>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </section>;
}
