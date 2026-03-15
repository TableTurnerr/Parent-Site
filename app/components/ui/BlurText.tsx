"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface BlurTextProps {
  /** The text string to animate word by word */
  text: string;
  /** Extra className on the wrapper span */
  className?: string;
  /** Additional delay in ms before animation starts after scrolling into view */
  delay?: number;
}

export default function BlurText({
  text,
  className = "",
  delay = 0,
}: BlurTextProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          const timeout = setTimeout(() => {
            setIsAnimating(true);
          }, delay + 100);
          return () => clearTimeout(timeout);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDuration: `${word.duration}s`,
            transitionDelay: `${word.delay}s`,
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            filter: isAnimating ? "blur(0px)" : `blur(${word.blur}px)`,
            transform: isAnimating
              ? "translateY(0) scale(1)"
              : `translateY(20px) scale(${word.scale})`,
            marginRight: "0.35em",
            willChange: "filter, transform, opacity",
          }}
        >
          {word.text}
        </span>
      ))}
    </span>
  );
}
