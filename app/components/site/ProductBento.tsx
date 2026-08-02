"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Bot, ChevronRight, Expand, Globe2, LayoutPanelTop,
  MapPin, Repeat2, Star, Trophy, X,
} from "lucide-react";

type DemoType = "reactivation" | "platforms" | "leaderboard" | "map" | "ai" | "social";
type Feature = {
  title: string;
  description: string;
  detail: string;
  benefits: string[];
  icon: typeof Repeat2;
  tone: string;
  demo: DemoType;
};

const FEATURES: Feature[] = [
  { title: "Review Reactivation", description: "Turn your past-customer list into a fresh wave of review requests.", detail: "Bring your existing customer history back to work with a polite, measured campaign that feels personal and keeps your team out of the follow-up loop.", benefits: ["Import past customers", "Send by text and email", "Control campaign pacing", "Watch new reviews arrive"], icon: Repeat2, tone: "from-violet-50 to-indigo-50", demo: "reactivation" },
  { title: "Reviews across every platform", description: "Route customers to the places homeowners actually check before they call.", detail: "One completed job can power your whole reputation—not just a single review profile. Keep every important local platform in the mix.", benefits: ["Google, Facebook, Yelp and Angi", "One simple review flow", "Automatic platform routing", "Consistent local presence"], icon: Globe2, tone: "from-sky-50 to-indigo-50", demo: "platforms" },
  { title: "Technician leaderboards", description: "Give your crew a clear, friendly reason to ask for the review.", detail: "Attribute every review to the person who did the work and turn great service into a team habit your crew can see.", benefits: ["Review attribution", "Recent performance", "Rating visibility", "Motivate the whole crew"], icon: Trophy, tone: "from-amber-50 to-orange-50", demo: "leaderboard" },
  { title: "Map-pack rank tracking", description: "See local visibility move week over week, not just review totals.", detail: "Connect your review activity to what matters on the ground: where your company appears when nearby homeowners are ready to book.", benefits: ["Track local position", "See weekly movement", "Monitor visibility", "Connect reviews to calls"], icon: MapPin, tone: "from-indigo-50 to-violet-50", demo: "map" },
  { title: "AI requests & replies", description: "Personal messages out. Thoughtful owner replies handled.", detail: "Create a review experience that sounds like your business—without asking office staff to write every request or response from scratch.", benefits: ["Personalized requests", "Text and email delivery", "AI-assisted replies", "Keep the owner voice"], icon: Bot, tone: "from-fuchsia-50 to-violet-50", demo: "ai" },
  { title: "Widgets & automatic social posts", description: "Put your newest proof to work everywhere customers find you.", detail: "A new 5-star review can become fresh trust on your website and a ready-to-share social post without a manual design task.", benefits: ["Website review widgets", "Branded social-ready posts", "Fresh social proof", "Automatic publishing workflow"], icon: LayoutPanelTop, tone: "from-emerald-50 to-sky-50", demo: "social" },
];

function Demo({ type, large = false }: { type: DemoType; large?: boolean }) {
  const base = large ? "p-5 text-sm" : "p-4 text-xs";
  if (type === "reactivation") return <div className={`rounded-2xl border border-violet-100 bg-white/85 shadow-sm ${base}`}><div className="flex items-center justify-between font-semibold text-ink"><span>Past customers</span><span className="rounded-full bg-violet-100 px-2 py-1 text-[10px] text-primary">Campaign live</span></div>{["Marcus B.", "Elena R.", "James W."].map((name, index) => <div key={name} className="mt-3 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary-soft font-bold text-primary">{name[0]}</span><span className="flex-1 font-medium text-ink-soft">{name}</span><span className={index === 0 ? "text-success" : "text-muted"}>{index === 0 ? "Sent" : "Queued"}</span></div>)}</div>;
  if (type === "platforms") return <div className={`grid grid-cols-2 gap-2 ${base}`}>{["Google", "Facebook", "Yelp", "Angi"].map((platform, index) => <div key={platform} className="rounded-xl border border-white bg-white/90 p-3 shadow-sm"><span className={`inline-grid h-6 w-6 place-items-center rounded-md font-bold ${index === 0 ? "bg-blue-100 text-blue-700" : "bg-primary-soft text-primary"}`}>{platform[0]}</span><p className="mt-3 font-semibold text-ink">{platform}</p><p className="mt-1 text-[10px] text-success">Ready to route</p></div>)}</div>;
  if (type === "leaderboard") return <div className={`rounded-2xl border border-amber-100 bg-white/85 ${base}`}>{[["1", "Ava", "24"], ["2", "Noah", "19"], ["3", "Mia", "16"]].map((row, index) => <div key={row[1]} className={`flex items-center gap-3 ${index ? "mt-3 border-t border-line pt-3" : ""}`}><span className={index === 0 ? "grid h-7 w-7 place-items-center rounded-full bg-star text-white" : "grid h-7 w-7 place-items-center rounded-full bg-surface font-bold text-ink-soft"}>{row[0]}</span><span className="flex-1 font-semibold text-ink">{row[1]}</span><span className="inline-flex items-center gap-1 font-bold text-ink"><Star className="h-3 w-3 fill-star text-star" /> {row[2]}</span></div>)}</div>;
  if (type === "map") return <div className={`relative overflow-hidden rounded-2xl border border-indigo-100 bg-[#eef0ff] ${base}`}><div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(30deg,transparent 48%,#c7cdf5 49%,transparent 51%),linear-gradient(-35deg,transparent 48%,#c7cdf5 49%,transparent 51%)", backgroundSize: "42px 36px" }} /><div className="relative p-4"><div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm"><span className="font-semibold text-ink">Your Company</span><span className="rounded-full bg-primary px-2 py-0.5 font-bold text-white">#1</span></div><div className="mt-5 flex items-end gap-2"><div className="h-5 flex-1 rounded-t bg-indigo-200" /><div className="h-9 flex-1 rounded-t bg-indigo-300" /><div className="h-14 flex-1 rounded-t bg-primary" /><div className="h-7 flex-1 rounded-t bg-indigo-200" /></div></div></div>;
  if (type === "ai") return <div className={`rounded-2xl border border-fuchsia-100 bg-white/90 ${base}`}><div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-white">Hi Jamie—thanks for choosing us. Would you share your experience?</div><div className="mt-3 max-w-[78%] rounded-2xl rounded-bl-md bg-surface p-3 text-ink-soft">Absolutely. Five stars!</div><div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-primary"><Bot className="h-4 w-4" /><span className="font-semibold">Reply drafted for approval</span></div></div>;
  return <div className={`grid grid-cols-[1.1fr_.9fr] gap-3 ${base}`}><div className="rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm"><p className="stars text-sm">★★★★★</p><p className="mt-2 font-semibold text-ink">“Fast, professional work.”</p><p className="mt-2 text-[10px] text-muted">Website widget</p></div><div className="rounded-2xl bg-primary p-3 text-white"><p className="text-[10px] text-white/60">NEW REVIEW</p><p className="mt-2 text-sm font-bold">Five stars from a happy homeowner.</p><p className="mt-4 text-[10px] text-white/70">Share post →</p></div></div>;
}

export default function ProductBento() {
  const [active, setActive] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const dialog = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const feature = active === null ? null : FEATURES[active];

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
        <div><span className="eyebrow">Built for the trades</span><h2 className="display-2 mt-5">Everything you need to own your local market.</h2></div>
        <p className="lead max-w-xl lg:pb-1">Turn completed jobs and past customers into a steady flow of reviews, stronger local rankings, and more booked work—all on autopilot.</p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        {FEATURES.map((item, index) => <button key={item.title} type="button" aria-haspopup="dialog" aria-controls="feature-dialog" aria-expanded={active === index} onClick={(event) => { opener.current = event.currentTarget; setActive(index); }} className={`bento-card group flex min-h-[350px] flex-col overflow-hidden rounded-[1.35rem] border border-line bg-gradient-to-br ${item.tone} p-5 text-left outline-none transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-30px_rgba(22,26,51,.38)] focus-visible:ring-4 focus-visible:ring-primary/25 md:min-h-[370px] md:p-6 ${index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5"}`}>
          <span className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-line bg-white/80 text-ink transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6"><Expand className="h-4 w-4" /></span>
          <item.icon className="h-5 w-5 text-primary" /><h3 className="mt-5 max-w-[80%] text-xl font-bold text-ink">{item.title}</h3><p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">{item.description}</p>
          <div className="mt-auto pt-6 transition-transform duration-300 group-hover:-translate-y-1"><Demo type={item.demo} /></div>
        </button>)}
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
        <div className="border-t border-line px-6 py-5 sm:px-10"><p className="text-sm font-semibold text-ink">More to explore</p><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm"><a href="#how" className="font-semibold text-primary hover:underline">How it works</a><a href="#pricing" className="font-semibold text-primary hover:underline">Simple pricing</a><a href="#trades" className="font-semibold text-primary hover:underline">Made for your trade</a></div></div>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </section>;
}
