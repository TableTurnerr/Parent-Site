"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, CloseIcon } from "@/app/components/icons";
import { NAV_LINKS } from "@/app/lib/constants";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 text-charcoal"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream"
          >
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {NAV_LINKS.map((link) => (
                <motion.div key={link.href} variants={fadeInUp}>
                  <Link
                    href={link.href}
                    className="font-display text-3xl text-charcoal hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={fadeInUp}>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center justify-center bg-charcoal text-cream rounded-full px-8 py-3.5 font-medium hover:bg-charcoal-light transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Talk to Us
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
