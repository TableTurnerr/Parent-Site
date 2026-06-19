"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Desktop width we render the embedded site at, then scale down to fit. */
const FRAME_W = 1280;
const FRAME_H = Math.round(FRAME_W * 1.4);

/**
 * Live, interactive preview of a client site via an <iframe>. The frame is
 * rendered at desktop width and scaled to fit, gently auto-scrolls on its own,
 * and on hover it pauses and becomes interactive (pointer-events on) so the
 * visitor can scroll/click the real, live site.
 *
 * Mounts the iframe only once it scrolls into view (perf). Sites that block
 * embedding (X-Frame-Options / Cloudflare challenge) pass canFrame={false} and
 * get a branded name card instead, with a "Visit site" link either way.
 */
export default function LivePreview({
  url,
  name,
  className,
  canFrame = true,
  image,
}: {
  url: string;
  name: string;
  className?: string;
  canFrame?: boolean;
  /** Static screenshot fallback for sites that block embedding. */
  image?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [inView, setInView] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const clean = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const href = `https://${clean}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      if (el.clientWidth) setScale(el.clientWidth / FRAME_W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "lp-window relative overflow-hidden bg-cream-dark",
        className
      )}
    >
      {canFrame && inView ? (
        <iframe
          src={href}
          title={`Live preview of ${name}`}
          loading="lazy"
          tabIndex={-1}
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-popups"
          className="lp-frame absolute left-0 top-0"
          style={
            {
              width: FRAME_W,
              height: FRAME_H,
              transformOrigin: "top left",
              border: 0,
              // CSS var consumed by the drift keyframes in globals.css
              "--lp-s": scale,
            } as CSSProperties
          }
        />
      ) : image && !imgFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={`Site preview of ${name}`}
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <span className="font-display font-semibold text-warm-gray-light">
            {name}
          </span>
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener"
        aria-label={`Visit ${name}`}
        className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm"
      >
        Visit site
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M5.833 14.167 14.167 5.833M14.167 5.833H6.667M14.167 5.833v7.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
