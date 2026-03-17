'use client';

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCw, Home, ChefHat } from "lucide-react";
import Logo from "@/app/components/ui/Logo";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

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
        {/* Icon */}
        <motion.div
          variants={fadeUp}
          className="mb-8 relative"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-cream-dark border-2 border-border flex items-center justify-center">
            <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-charcoal/40" strokeWidth={1.5} />
          </div>
          {/* Exclamation badge */}
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-charcoal text-cream flex items-center justify-center text-sm font-bold">
            !
          </div>
        </motion.div>

        {/* Copy */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-charcoal text-center mb-3"
        >
          Something went wrong in the kitchen
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-warm-gray text-base sm:text-lg text-center max-w-lg mb-10"
        >
          Our chefs hit an unexpected snag. Give it another try, or head back to
          the main menu.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        >
          <button
            onClick={reset}
            className="group flex items-center gap-2.5 bg-charcoal text-cream rounded-full px-7 py-3.5 font-medium text-sm hover:bg-charcoal-light transition-colors"
          >
            <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>

          <Link
            href="/"
            className="group flex items-center gap-2.5 border border-charcoal/20 text-charcoal rounded-full px-7 py-3.5 font-medium text-sm hover:border-charcoal/50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Error digest for debugging */}
        {error.digest && (
          <motion.p
            variants={fadeUp}
            className="mt-8 text-warm-gray-light text-xs font-mono"
          >
            Error ID: {error.digest}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
