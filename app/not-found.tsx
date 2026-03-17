'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Utensils, MessageCircle } from "lucide-react";
import Logo from "@/app/components/ui/Logo";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scalePop = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

/* Gentle floating for the plate */
const float = {
  y: [0, -8, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
};

/* Steam wisps rising from the plate */
function Steam({ delay = 0, x = 0 }: { delay?: number; x?: number }) {
  return (
    <motion.div
      className="absolute -top-6 w-[2px] h-5 rounded-full bg-warm-gray-light/40"
      style={{ left: `calc(50% + ${x}px)` }}
      animate={{
        y: [0, -18, -30],
        opacity: [0, 0.6, 0],
        scaleX: [1, 1.5, 0.5],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Minimal header */}
      <header className="w-full px-6 md:px-10 py-6">
        <Link href="/" aria-label="Back to home">
          <Logo className="h-7 w-auto text-charcoal hover:text-charcoal-light transition-colors" />
        </Link>
      </header>

      {/* Main content */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center px-6 pb-20 -mt-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Display */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-8 mb-8">
          {/* First 4 */}
          <motion.span
            variants={scalePop}
            className="font-display text-[5.5rem] sm:text-[8rem] md:text-[11rem] font-bold text-charcoal leading-none select-none"
          >
            4
          </motion.span>

          {/* Plate as the "0" */}
          <motion.div variants={scalePop} className="relative" animate={float}>
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36">
              {/* Steam */}
              <Steam delay={0} x={-8} />
              <Steam delay={0.7} x={4} />
              <Steam delay={1.4} x={12} />

              {/* Plate outer ring */}
              <div className="absolute inset-0 rounded-full border-[3px] md:border-4 border-charcoal/15 bg-cream-dark" />

              {/* Plate inner ring */}
              <div className="absolute inset-3 sm:inset-4 md:inset-5 rounded-full border-[2px] md:border-[3px] border-charcoal/10 bg-cream" />

              {/* Fork & knife crossed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 48 48"
                  className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 text-charcoal/30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Fork — tilted left */}
                  <g transform="rotate(-25 24 24)">
                    <line x1="20" y1="8" x2="20" y2="40" />
                    <line x1="16" y1="8" x2="16" y2="18" />
                    <line x1="20" y1="8" x2="20" y2="18" />
                    <line x1="24" y1="8" x2="24" y2="18" />
                    <line x1="16" y1="18" x2="24" y2="18" />
                  </g>
                  {/* Knife — tilted right */}
                  <g transform="rotate(25 24 24)">
                    <line x1="28" y1="8" x2="28" y2="40" />
                    <path d="M28 8 C34 10 34 18 28 20" />
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Second 4 */}
          <motion.span
            variants={scalePop}
            className="font-display text-[5.5rem] sm:text-[8rem] md:text-[11rem] font-bold text-charcoal leading-none select-none"
          >
            4
          </motion.span>
        </div>

        {/* Copy */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-charcoal text-center mb-3"
        >
          This table doesn&rsquo;t exist
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-warm-gray text-base sm:text-lg text-center max-w-md mb-10"
        >
          The page you&rsquo;re looking for has left the restaurant.
          Let&rsquo;s get you back to a seat.
        </motion.p>

        {/* Navigation links */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5 bg-charcoal text-cream rounded-full px-7 py-3.5 font-medium text-sm hover:bg-charcoal-light transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/services"
            className="group flex items-center gap-2.5 border border-charcoal/20 text-charcoal rounded-full px-7 py-3.5 font-medium text-sm hover:border-charcoal/50 transition-colors"
          >
            <Utensils className="w-4 h-4" />
            Our Services
          </Link>

          <Link
            href="/contact"
            className="group flex items-center gap-2.5 border border-charcoal/20 text-charcoal rounded-full px-7 py-3.5 font-medium text-sm hover:border-charcoal/50 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Contact Us
          </Link>
        </motion.div>

        {/* Go-back link */}
        <motion.button
          variants={fadeUp}
          onClick={() => window.history.back()}
          className="mt-6 flex items-center gap-1.5 text-warm-gray-light text-sm hover:text-warm-gray transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Go back
        </motion.button>
      </motion.div>
    </div>
  );
}
