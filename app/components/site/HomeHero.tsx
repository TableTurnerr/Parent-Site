"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import MapPackClimb from "@/app/components/site/MapPackClimb";
import CountUp from "@/app/components/site/CountUp";

const STATS = [
  { v: 4, suffix: "×", l: "more reviews in the first 90 days" },
  { v: 24, prefix: "≤", suffix: "h", l: "to your first new reviews" },
  { v: 4, suffix: "", l: "review platforms, not just Google" },
  { v: 15, suffix: " min", l: "to connect your CRM and launch" },
];

const MARQUEE = ["HVAC", "Roofing", "Plumbing", "Electrical", "Google", "Facebook", "Yelp", "Angi"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomeHero() {
  const reduce = useReducedMotion();
  const start = reduce ? "show" : "hidden";

  return (
    <section className="relative overflow-hidden bg-night pt-36 text-white md:pt-44">
      {/* decorative: gradient + drifting glows + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#1b2046,transparent_60%)]" />
        <div className="tt-aurora absolute -left-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-primary/30 blur-[130px]" />
        <div className="tt-aurora-2 absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-star/15 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000, transparent 75%)",
          }}
        />
      </div>

      <div className="container-tt relative">
        <div className="grid items-center gap-12 pb-12 lg:grid-cols-2 lg:gap-10 lg:pb-16">
          {/* left */}
          <motion.div variants={container} initial={start} animate="show">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-star" /> Review automation for home services
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 font-display font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(2.6rem, 5.4vw, 4.6rem)", lineHeight: 1.02, letterSpacing: "-0.035em" }}
            >
              Turn finished jobs into{" "}
              <span className="text-gold-gradient">5-star reviews</span> and more booked work.
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              TableTurnerr automatically asks every customer for a review the
              moment the job is done, across Google, Facebook, Yelp and Angi, so
              you climb the map pack and get chosen first. Built for HVAC,
              roofing, plumbing and electrical pros.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="btn btn-light">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#how" className="btn btn-outline-light">
                See how it works
              </Link>
            </motion.div>

            <motion.ul variants={item} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/65">
              {["14-day free trial", "No contracts", "Setup in 15 minutes"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" /> {t}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* right */}
          <motion.div
            className="lg:pl-6"
            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 26, delay: 0.25 }}
          >
            <MapPackClimb />
          </motion.div>
        </div>

        {/* stats */}
        <motion.div
          className="grid grid-cols-2 gap-6 border-t border-white/10 py-8 md:grid-cols-4 md:py-10"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {STATS.map((s) => (
            <div key={s.l}>
              <p className="font-display text-3xl font-bold text-white md:text-4xl">
                <CountUp value={s.v} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-sm leading-snug text-white/55">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* trades marquee */}
      <div className="relative border-t border-white/10 py-5 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="tt-marquee flex w-max items-center gap-10">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="inline-flex items-center gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.18em] text-white/30">
              {m} <span className="text-star/50">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
