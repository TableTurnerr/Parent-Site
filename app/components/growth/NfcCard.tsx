"use client";
// The custom NFC Google review cards we gift to Complete clients, shown as a real card: it floats, catches the light,
// flips to the "tap or scan" side and moves on to the next client's card. Click or press to flip by hand.
// Real cards from real clients. The owner's metal card back (personal phone and email) is deliberately left out.
import { useEffect, useMemo, useState } from "react";
/* eslint-disable @next/next/no-img-element */

const ALL_CARDS = [
  { id: "presidential", name: "Presidential Roofing", front: "/images/nfc/presidential-front.webp", back: "/images/nfc/presidential-back.webp" },
  { id: "cooling-comfort", name: "Cooling Comfort HVAC", front: "/images/nfc/cooling-comfort-front.webp", back: "/images/nfc/cooling-comfort-back.webp" },
  { id: "nalu", name: "Nalu Window Cleaning", front: "/images/nfc/nalu-front.webp", back: "/images/nfc/nalu-back.webp" },
  { id: "holiday-lights", name: "Premium Holiday Lights", front: "/images/nfc/holiday-lights-front.webp", back: "/images/nfc/holiday-lights-back.webp" },
] as const;

export type NfcCardId = (typeof ALL_CARDS)[number]["id"];

/** `card` pins one client's card (it just flips front and back), so each page can show a different card image. */
export default function NfcCard({ dim = false, card }: { dim?: boolean; card?: NfcCardId }) {
  const CARDS = useMemo(() => (card ? ALL_CARDS.filter((c) => c.id === card) : ALL_CARDS), [card]);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      if (flipped) {
        setFlipped(false);
        setI((n) => (n + 1) % CARDS.length);
      } else setFlipped(true);
    }, flipped ? 2200 : 2600);
    return () => window.clearTimeout(t);
  }, [flipped, paused, i, CARDS.length]);

  // Fetch the next card while this one shows its back, so the swap never flashes.
  useEffect(() => {
    if (flipped && CARDS.length > 1) new window.Image().src = CARDS[(i + 1) % CARDS.length].front;
  }, [flipped, i, CARDS]);

  const c = CARDS[i];
  const face = "absolute inset-0 overflow-hidden rounded-[0.9rem] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] [backface-visibility:hidden]";
  return (
    <div className={`[perspective:900px] ${dim ? "opacity-70 grayscale-[35%]" : ""}`}>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-label={`${c.name} review card. Press to flip.`}
        className="tt-nfc-float relative block aspect-[1296/816] w-full cursor-pointer rounded-[0.9rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <span
          className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"}`}
        >
          <span className={face}>
            <img src={c.front} alt={`${c.name} custom review card, front`} width={864} height={544} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <span aria-hidden className="tt-nfc-sheen pointer-events-none absolute inset-0" />
          </span>
          <span className={`${face} [transform:rotateY(180deg)]`}>
            <img src={c.back} alt={`${c.name} review card, tap or scan side`} width={864} height={544} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <span aria-hidden className="tt-nfc-sheen pointer-events-none absolute inset-0" />
          </span>
        </span>
      </button>
    </div>
  );
}
