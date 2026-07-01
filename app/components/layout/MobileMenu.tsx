"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  NAV_LINKS,
  SOCIAL_LINKS,
  SITE_CONFIG,
} from "@/app/lib/constants";

export default function MobileMenu({ overDark = false }: { overDark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[55] bg-white flex flex-col"
        >
          {/* ── Top bar: Logo + Close ── */}
          <div className="flex items-center justify-between px-6 h-16 flex-shrink-0">
            <Link
              href="/"
              onClick={toggle}
              className="font-display text-xl font-bold text-black"
            >
              TableTurnerr
            </Link>
            <button
              onClick={toggle}
              className="p-2 -mr-2 text-black"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── Nav Links ── */}
          <nav className="flex-1 flex flex-col px-6 pt-2 overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="border-b border-black/[0.08] last:border-b-0"
              >
                <Link
                  href={link.href}
                  onClick={toggle}
                  className="block py-4 font-display text-[17px] text-black"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* ── Bottom: secondary links + CTA ── */}
          <div className="px-6 pb-6 flex-shrink-0">
            {/* Secondary links grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 mb-6 pb-2">
              {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/45 hover:text-black transition-colors"
                  >
                    {social.platform}
                  </a>
              ))}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-sm text-black/45 hover:text-black transition-colors"
              >
                Email
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone?.replace(/\s/g, "")}`}
                className="text-sm text-black/45 hover:text-black transition-colors"
              >
                Call us
              </a>
            </div>

            {/* CTA */}
            <Link
              href="/signup"
              onClick={toggle}
              className="flex items-center justify-center gap-1.5 w-full py-3.5 bg-black hover:bg-black/90 rounded-full text-white text-sm font-semibold tracking-wide transition-colors"
            >
              Start free trial
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      {/* ── Hamburger toggle ── */}
      <button
        onClick={toggle}
        className="relative z-[60] flex flex-col items-end justify-center w-10 h-10 gap-[7px]"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span
          className={`block h-[1.5px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-center ${
            overDark && !isOpen ? "bg-cream" : "bg-charcoal"
          } ${
            isOpen
              ? "w-6 rotate-45 translate-y-[4.25px]"
              : "w-6 rotate-0 translate-y-0"
          }`}
        />
        <span
          className={`block h-[1.5px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-center ${
            overDark && !isOpen ? "bg-cream" : "bg-charcoal"
          } ${
            isOpen
              ? "w-6 -rotate-45 -translate-y-[4.25px]"
              : "w-4 rotate-0 translate-y-0"
          }`}
        />
      </button>

      {/* Portal to body to escape navbar's backdrop-filter containment */}
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
