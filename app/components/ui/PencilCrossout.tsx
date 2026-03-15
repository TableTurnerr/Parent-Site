"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface PencilCrossoutProps {
  text: string;
  replacement: string;
  className?: string;
  /** Delay in ms before animation starts after scrolling into view */
  delay?: number;
}

export default function PencilCrossout({
  text,
  replacement,
  className = "",
  delay = 0,
}: PencilCrossoutProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [struck, setStruck] = useState(false);
  const [replaced, setReplaced] = useState(false);

  const words = useMemo(() => {
    const splitWords = text.split(" ");
    const totalWords = splitWords.length;

    return splitWords.map((word, index) => {
      const progress = index / totalWords;
      const exponentialDelay = Math.pow(progress, 0.8) * 0.5;
      const baseDelay = index * 0.06;

      return {
        text: word,
        duration: 2.2 + Math.cos(index * 0.3) * 0.3,
        delay: baseDelay + exponentialDelay,
        blur: 12 + ((index * 3) % 8),
        scale: 0.9 + Math.sin(index * 0.2) * 0.05,
      };
    });
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          timers.push(setTimeout(() => setVisible(true), delay));
          timers.push(setTimeout(() => setStruck(true), delay + 1400));
          timers.push(setTimeout(() => setReplaced(true), delay + 2000));
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [delay]);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* Original text — word-by-word blur-in */}
      <span className="inline-block">
        {words.map((word, index) => (
          <span
            key={index}
            className="inline-block"
            style={{
              opacity: visible ? (struck ? 0.45 : 1) : 0,
              filter: visible ? "blur(0px)" : `blur(${word.blur}px)`,
              transform: visible
                ? "translateY(0) scale(1)"
                : `translateY(20px) scale(${word.scale})`,
              transitionProperty: "opacity, filter, transform",
              transitionDuration: `${word.duration}s`,
              transitionDelay: visible ? `${word.delay}s` : "0s",
              transitionTimingFunction:
                "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              marginRight: "0.35em",
              willChange: "filter, transform, opacity",
            }}
          >
            {word.text}
          </span>
        ))}
      </span>

      {/* Hand-drawn pencil strikethrough */}
      <svg
        className="absolute left-[-2%] w-[104%] pointer-events-none"
        style={{ top: "55%", transform: "translateY(-50%)", height: "0.2em" }}
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-2,5 C20,2.5 35,7.5 55,4.5 C75,1.5 90,7 110,4 C130,1.5 150,7.5 170,4.5 C185,2.5 195,6 202,5"
          stroke="var(--color-warm-gray)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 250,
            strokeDashoffset: struck ? 0 : 250,
            transition: "stroke-dashoffset 0.7s ease-out",
          }}
        />
      </svg>

      {/* Handwritten replacement — writing reveal via clip-path */}
      <span
        className="absolute inset-0 flex items-center justify-center font-handwriting font-bold whitespace-nowrap pointer-events-none"
        style={{
          transform: "rotate(-6deg)",
          color: "var(--color-charcoal)",
          fontSize: "1.3em",
          clipPath: replaced ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {replacement}
      </span>
    </span>
  );
}
