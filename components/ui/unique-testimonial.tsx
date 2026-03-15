"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

export interface TestimonialItem {
  id: number
  quote: string
  author: string
  role: string
  avatar: string
}

interface TestimonialsProps {
  testimonials: TestimonialItem[]
  className?: string
}

export function UniqueTestimonials({ testimonials, className }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote)
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
        setDisplayedQuote(testimonials[index].quote)
        setDisplayedRole(testimonials[index].role)
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

  return (
    <div ref={sectionRef} className={cn("flex flex-col items-center gap-8 sm:gap-10 py-10 sm:py-16", className)}>
      {/* Quote Container — fixed height prevents layout shift on text swap */}
      <div className="relative px-8 min-h-[5rem] md:min-h-[4.5rem] flex items-center justify-center">
        <span className="absolute -left-2 -top-6 text-7xl font-serif text-charcoal/[0.06] select-none pointer-events-none">
          &ldquo;
        </span>

        <p
          className={cn(
            "text-2xl md:text-3xl font-light text-charcoal text-center max-w-lg leading-relaxed transition-[opacity,filter] duration-400 ease-out",
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0",
          )}
        >
          {displayedQuote}
        </p>

        <span className="absolute -right-2 -bottom-8 text-7xl font-serif text-charcoal/[0.06] select-none pointer-events-none">
          &rdquo;
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 mt-2">
        {/* Role text */}
        <p
          className={cn(
            "text-xs text-warm-gray tracking-[0.2em] uppercase transition-all duration-500 ease-out",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
          )}
        >
          {displayedRole}
        </p>

        <div className="flex items-center justify-center gap-2">
          {testimonials.map((testimonial, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showName = isActive || isHovered

            return (
              <button
                key={testimonial.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative flex items-center gap-0 rounded-full cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive ? "bg-charcoal shadow-lg" : "bg-transparent hover:bg-charcoal/5",
                  showName ? "pr-4 pl-2 py-2" : "p-0.5",
                )}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className={cn(
                      "w-8 h-8 rounded-full object-cover",
                      "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isActive ? "ring-2 ring-cream/30" : "ring-0",
                      !isActive && "hover:scale-105",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    showName ? "grid-cols-[1fr] opacity-100 ml-2" : "grid-cols-[0fr] opacity-0 ml-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        "text-sm font-medium whitespace-nowrap block",
                        "transition-colors duration-300",
                        isActive ? "text-cream" : "text-charcoal",
                      )}
                    >
                      {testimonial.author}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
