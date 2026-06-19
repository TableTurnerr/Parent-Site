"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Kinetic headline word that cycles through a list with a slide+blur swap.
 * Used to make the hero feel alive (e.g. "booked customers" -> "more bookings").
 */
export default function RotatingWord({
  words,
  className,
  interval = 2400,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShown(false);
      const swap = setTimeout(() => {
        setIndex((p) => (p + 1) % words.length);
        setShown(true);
      }, 360);
      return () => clearTimeout(swap);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span
      aria-live="polite"
      className={cn(
        "inline-block transition-[opacity,transform,filter] duration-300 ease-out will-change-transform",
        shown ? "opacity-100 translate-y-0 blur-0" : "opacity-0 -translate-y-2 blur-[6px]",
        className
      )}
    >
      {words[index]}
    </span>
  );
}
