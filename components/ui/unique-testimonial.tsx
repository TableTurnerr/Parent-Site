"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

export interface TestimonialItem {
  id: number
  author: string
  /** Real review quote. Only set when a genuine review exists (never faked). */
  quote?: string
  /** Factual one-line descriptor, shown when there is no real quote. */
  blurb?: string
  role?: string
  avatar?: string
  /** Live site URL (no protocol). When set, the active client's homepage
   *  screenshot is shown above, swapping as the carousel rotates. */
  siteUrl?: string
}

/** thum.io live homepage screenshot for a client URL. */
function shot(siteUrl: string): string {
  const clean = siteUrl.replace(/^https?:\/\//, "")
  return `https://image.thum.io/get/width/1000/crop/720/wait/2/https://${clean}`
}

/** Google's favicon service for a site (no files to manage, always current). */
function favicon(siteUrl: string): string {
  const clean = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
  return `https://www.google.com/s2/favicons?domain=${clean}&sz=64`
}

interface TestimonialsProps {
  testimonials: TestimonialItem[]
  className?: string
}

/** What to show as the main line: a real quote (in quotes) or the descriptor. */
function lineFor(t: TestimonialItem): string {
  return t.quote ? t.quote : (t.blurb ?? "")
}

export function UniqueTestimonials({ testimonials, className }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(lineFor(testimonials[0]))
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].author)
  const [displayedIsQuote, setDisplayedIsQuote] = useState(!!testimonials[0].quote)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Pause auto-scroll when section is not visible
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex || isAnimating) return
      setIsAnimating(true)
      setTimeout(() => {
        setDisplayedQuote(lineFor(testimonials[index]))
        setDisplayedRole(testimonials[index].author)
        setDisplayedIsQuote(!!testimonials[index].quote)
        setActiveIndex(index)
        setTimeout(() => setIsAnimating(false), 400)
      }, 200)
    },
    [activeIndex, isAnimating, testimonials],
  )

  const handleSelect = (index: number) => {
    setPaused(true)
    goTo(index)
  }

  // Auto-scroll every 5 seconds, pause on hover, manual selection, or not visible
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || isAnimating || !isVisible) return
    const timer = setTimeout(() => {
      const next = (activeIndex + 1) % testimonials.length
      goTo(next)
    }, 5000)
    return () => clearTimeout(timer)
  }, [activeIndex, paused, isAnimating, isVisible, testimonials.length, goTo])

  // Resume auto-scroll 8s after manual selection
  useEffect(() => {
    if (!paused) return
    const resume = setTimeout(() => setPaused(false), 8000)
    return () => clearTimeout(resume)
  }, [paused])

  const active = testimonials[activeIndex]

  return (
    <div ref={sectionRef} className={cn("flex flex-col items-center gap-6 sm:gap-8 md:gap-10 py-8 sm:py-12 md:py-16", className)}>
      {/* Live screenshot of the highlighted client's site */}
      <a
        href={active.siteUrl ? `https://${active.siteUrl.replace(/^https?:\/\//, "")}` : undefined}
        target={active.siteUrl ? "_blank" : undefined}
        rel="noopener"
        aria-label={active.siteUrl ? `Visit ${active.author}` : undefined}
        className={cn(
          "relative block w-full max-w-2xl aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-cream shadow-sm",
          active.siteUrl ? "cursor-pointer" : "cursor-default",
        )}
      >
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-out",
              i === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
            aria-hidden={i !== activeIndex}
          >
            {t.siteUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shot(t.siteUrl)}
                alt={`Live homepage of ${t.author}, built by TableTurnerr`}
                className="w-full h-full object-cover object-top"
                loading={i === 0 ? "eager" : "lazy"}
              />
            ) : (
              // Fallback when no live URL yet: enlarged logo on cream
              <div className="w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.author} className="h-20 w-20 rounded-full object-cover opacity-90" />
              </div>
            )}
          </div>
        ))}
        {active.siteUrl && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-charcoal/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-cream">
            Visit site
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5.833 14.167 14.167 5.833M14.167 5.833H6.667M14.167 5.833v7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </a>

      {/* Line container — real quote (with quotation marks) or factual descriptor */}
      <div className="relative px-4 sm:px-8 min-h-[4rem] sm:min-h-[5rem] md:min-h-[4.5rem] flex items-center justify-center">
        {displayedIsQuote && (
          <span className="absolute -left-1 sm:-left-2 -top-4 sm:-top-6 text-5xl sm:text-7xl font-serif text-charcoal/[0.06] select-none pointer-events-none">
            &ldquo;
          </span>
        )}

        <p
          className={cn(
            "text-xl sm:text-2xl md:text-3xl font-light text-charcoal text-center max-w-lg leading-relaxed transition-[opacity,filter] duration-400 ease-out",
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0",
          )}
        >
          {displayedQuote}
        </p>

        {displayedIsQuote && (
          <span className="absolute -right-1 sm:-right-2 -bottom-6 sm:-bottom-8 text-5xl sm:text-7xl font-serif text-charcoal/[0.06] select-none pointer-events-none">
            &rdquo;
          </span>
        )}
      </div>

      <div className="flex flex-col items-center gap-6 mt-2">
        {/* Active client name */}
        <p
          className={cn(
            "font-display text-lg font-semibold text-charcoal transition-all duration-500 ease-out",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
          )}
        >
          {displayedRole}
        </p>

        {/* Client name pills — click to jump to that site */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {testimonials.map((testimonial, index) => {
            const isActive = activeIndex === index
            return (
              <button
                key={testimonial.id}
                onClick={() => handleSelect(index)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium cursor-pointer whitespace-nowrap",
                  "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive
                    ? "bg-charcoal text-cream shadow-lg"
                    : "bg-transparent text-warm-gray hover:bg-charcoal/5 hover:text-charcoal",
                )}
              >
                {testimonial.siteUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={favicon(testimonial.siteUrl)}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 rounded-sm shrink-0"
                    aria-hidden="true"
                  />
                ) : testimonial.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={testimonial.avatar}
                    alt=""
                    className="h-4 w-4 rounded-full object-cover shrink-0"
                    aria-hidden="true"
                  />
                ) : null}
                {testimonial.author}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
