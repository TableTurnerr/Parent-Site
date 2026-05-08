'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Compass, MessageCircle } from "lucide-react";
import { useRef } from "react";
import Logo from "@/app/components/ui/Logo";
import ThemeToggleButton from "@/app/components/ui/ThemeToggleButton";
import {
  NO_FLASH_THEME_SCRIPT,
  useThemeMode,
} from "@/app/components/ui/themeMode";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const scalePop = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const } },
};

/* Gentle floating for the dial */
const float = {
  y: [0, -8, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
};

export default function NotFound() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggle } = useThemeMode(wrapperRef);
  return (
    <>
    <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
    <div
      ref={wrapperRef}
      suppressHydrationWarning
      className="min-h-screen bg-[var(--color-cream)] flex flex-col"
    >
      {/* Minimal header */}
      <header className="w-full px-6 md:px-10 py-6 flex items-center justify-between">
        <Link href="/" aria-label="Back to home">
          <Logo className="h-7 w-auto text-charcoal hover:text-charcoal-light transition-colors" />
        </Link>
        <ThemeToggleButton theme={theme} onToggle={toggle} />
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
            style={{ fontSize: "clamp(5rem, 14vw, 11rem)" }}
            className="font-display font-bold text-charcoal leading-none select-none"
          >
            4
          </motion.span>

          {/* Compass dial as the "0" */}
          <motion.div variants={scalePop} className="relative" animate={float}>
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-[3px] md:border-4 border-charcoal/15 bg-[var(--color-cream-dark)]" />

              {/* Inner ring */}
              <div className="absolute inset-3 sm:inset-4 md:inset-5 rounded-full border-[2px] md:border-[3px] border-charcoal/10 bg-[var(--color-cream)]" />

              {/* Spinning compass needle */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: [0, 220, 140, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg
                  viewBox="0 0 48 48"
                  className="w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16 text-charcoal/40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M24 6 L28 24 L24 22 L20 24 Z" fill="currentColor" />
                  <path d="M24 42 L28 24 L24 26 L20 24 Z" className="opacity-50" />
                  <circle cx="24" cy="24" r="1.5" fill="currentColor" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Second 4 */}
          <motion.span
            variants={scalePop}
            style={{ fontSize: "clamp(5rem, 14vw, 11rem)" }}
            className="font-display font-bold text-charcoal leading-none select-none"
          >
            4
          </motion.span>
        </div>

        {/* Copy */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-charcoal text-center mb-3"
        >
          This page wandered off
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-warm-gray text-base sm:text-lg text-center max-w-md mb-10"
        >
          We checked the couch cushions and behind the curtains.
          No luck. Let&rsquo;s get you somewhere that actually exists.
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
            <Compass className="w-4 h-4" />
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
    </>
  );
}
