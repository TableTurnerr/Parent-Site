"use client";

// Mobile-only bottom bar with the primary CTA (free audit) and the secondary one (book a call). Appears after the
// visitor scrolls past the hero, never on the audit or sign-up pages, and is hidden from 1024px up where the
// nav already shows the CTA. Not a pop-up: it never covers content (a spacer reserves its height).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { AUDIT_PATH, growthSite } from "@/app/lib/growth";

const HIDE_ON = [AUDIT_PATH, "/signup", "/login", "/blog/preview"];

export default function StickyCta() {
  const pathname = usePathname() ?? "/";
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDE_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  return (
    <>
      <div aria-hidden className="h-[4.5rem] lg:hidden" />
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
        aria-hidden={!show}
        data-analytics-section="sticky_cta"
      >
        <div className="mx-auto flex max-w-xl gap-2">
          <Link href={AUDIT_PATH} tabIndex={show ? 0 : -1} className="btn btn-primary min-w-0 flex-1 !px-3 !py-2.5 !text-sm">
            Free audit
          </Link>
          <a href={`tel:${growthSite.phoneE164}`} tabIndex={show ? 0 : -1} className="btn btn-ghost min-w-0 flex-1 !px-3 !py-2.5 !text-sm">
            <Phone className="h-4 w-4" aria-hidden /> Call now
          </a>
          <a href={growthSite.bookingUrl} tabIndex={show ? 0 : -1} className="btn btn-ghost shrink-0 !px-3 !py-2.5 !text-sm">
            Book a call
          </a>
        </div>
      </div>
    </>
  );
}
