# TableTurnerr.com Complete Website Rebuild Plan

## Context

TableTurnerr's current site was recently reset to a bare Next.js 16 scaffold. The old site had critical SEO gaps (single-page, no blog, no sitemap, JS-only navigation, heavy Owner.com focus). The SEO report and business overview demand a multi-page, editorial-style site that positions TableTurnerr as a restaurant growth agency — not just an Owner.com landing page. The design combines two reference profiles: DesignProfile-1 (Sushi Tei editorial layouts, pill nav, dark footer) and DesignProfile-2 (bento grid hero, massive serif typography, cream background). User explicitly wants hero section first, then iterative approval.

---

## PHASE 0: Project Foundation

**1 agent, sequential. Must complete before Phase 1.**

### 0.1 Install Dependencies
```
pnpm add framer-motion
```

### 0.2 Font Configuration
**`app/layout.tsx`** — Replace Geist fonts with:
- **Display:** Playfair Display (serif) → CSS var `--font-display`
- **Body:** DM Sans (sans) → CSS var `--font-body`

### 0.3 Design Token System
**`app/globals.css`** — Replace existing vars with full token set in `@theme inline`:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-cream` | `#FAFAF8` | Page background |
| `--color-cream-dark` | `#F2F0EB` | Section alternation |
| `--color-charcoal` | `#1A1A1A` | Primary text, dark cards |
| `--color-charcoal-light` | `#2D2D2D` | Dark card backgrounds |
| `--color-warm-gray` | `#6B6560` | Secondary text |
| `--color-warm-gray-light` | `#9E9890` | Captions |
| `--color-accent` | `#C8553D` | CTAs, hover (warm terracotta) |
| `--color-accent-hover` | `#B44A35` | CTA hover state |
| `--color-border` | `#E8E5DF` | Subtle dividers |
| `--radius-card` | `1.25rem` | Bento cards |
| `--radius-pill` | `9999px` | Nav, buttons |
| `--text-display` | `clamp(3rem, 5vw + 1rem, 5.5rem)` | Hero headlines |
| `--text-heading-1` | `clamp(2.25rem, 3vw + 0.5rem, 3.5rem)` | Section headings |
| `--text-body` | `1.125rem` | Body text (18px) |

Remove dark mode (`prefers-color-scheme: dark` block) — this is a light-only site.

### 0.4 Directory Skeleton
```
app/
  (marketing)/           ← Route group (shared nav+footer, no URL prefix)
    layout.tsx
    page.tsx             ← Homepage
    about/page.tsx       (placeholder)
    contact/page.tsx     (placeholder)
    services/
      page.tsx           (placeholder)
      restaurant-website-design/page.tsx
      restaurant-seo/page.tsx
      restaurant-branding/page.tsx
      google-ads/page.tsx
      google-business-profile-optimization/page.tsx
    case-studies/page.tsx (placeholder)
    blog/
      page.tsx           (placeholder)
      [slug]/page.tsx    (placeholder)
  components/
    ui/                  ← Reusable primitives
      Button.tsx
      SectionLabel.tsx
      Container.tsx
      AnimatedElement.tsx ← 'use client' Framer Motion wrapper
    layout/
      Navbar.tsx
      Footer.tsx
      MobileMenu.tsx     ← 'use client'
    sections/            ← Homepage sections (server components)
      Hero.tsx
    icons/
      index.tsx
  lib/
    metadata.ts
    animations.ts        ← Framer Motion variant presets
    constants.ts         ← Nav links, services data, client list
    schema.ts            ← JSON-LD generators
  sitemap.ts
  robots.ts
  not-found.tsx
public/
  images/hero/
  images/clients/
  images/services/
  images/og/default.jpg  (1200x630 placeholder)
```

### 0.5 Technical SEO Foundation
- **`app/sitemap.ts`** — Dynamic sitemap for all page URLs
- **`app/robots.ts`** — Allow all crawlers, point to sitemap
- **`app/layout.tsx`** — `metadataBase`, default OG image, title template `"%s | TableTurnerr"`
- **`app/not-found.tsx`** — Custom 404

### 0.6 Shared UI Primitives
- **`Container.tsx`** — Centered `max-w-7xl px-6 md:px-8` wrapper
- **`Button.tsx`** — Pill-shaped, two variants: `primary` (charcoal bg) / `secondary` (outlined). Renders `<Link>` when given `href`, `<button>` otherwise
- **`SectionLabel.tsx`** — Large serif left-aligned label (like "Our Company" in DesignProfile-1)
- **`AnimatedElement.tsx`** — `'use client'` wrapper accepting Framer Motion props. Keeps parent sections as server components
- **`animations.ts`** — `fadeInUp`, `staggerContainer`, `scaleIn` variants
- **`constants.ts`** — Nav links, service cards data, client names, social links
- **`schema.ts`** — JSON-LD generators for `Organization`, `WebSite`, `FAQPage`, `Service`

---

## PHASE 1: Hero Section + Navigation (**FIRST DELIVERABLE**)

**4 parallel agents. This is the first approval gate.**

### Agent 1A: Navigation Bar
**`app/components/layout/Navbar.tsx`** + **`MobileMenu.tsx`**

Visual (from DesignProfile-1):
- Sticky top bar, transparent over hero → `bg-cream/80 backdrop-blur` on scroll
- Layout: **Logo (left)** | **Pill nav (center)** | **CTA (right)**
- Center pill: `bg-white rounded-full shadow-sm border` containing links: About | Services | Case Studies | Blog | Contact
- CTA: "Talk to Us" pill button (`bg-charcoal text-cream`)
- Logo: "TableTurnerr" in Playfair Display
- Mobile: Logo + hamburger → full-screen overlay menu with Framer Motion
- All links are `<Link href>` (crawlable)

### Agent 1B: Hero Section
**`app/components/sections/Hero.tsx`**

Visual (DesignProfile-2 editorial bento grid on cream background):

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  "Restaurant Website Design                                  │
│   & SEO That Fills Tables"          ← H1, Playfair Display  │
│                                       clamp(3rem..5.5rem)    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────┐  ┌───────────────────┐     │
│  │                             │  │  STAT CARD        │     │
│  │   DARK CARD (charcoal bg)   │  │  "90%"            │     │
│  │                             │  │  of diners        │     │
│  │   "Your Restaurant,         │  │  research online  │     │
│  │    Discovered"              │  │  before visiting   │     │
│  │                             │  ├───────────────────┤     │
│  │   [Chef/food image]         │  │  TRUSTED BY       │     │
│  │                             │  │  Grill Shack      │     │
│  │   Pill: "SEO-First"         │  │  Miss Mat Cafe    │     │
│  │                             │  │  Texbbq           │     │
│  └─────────────────────────────┘  │  Qadeer Coffee    │     │
│                                    └───────────────────┘     │
│                                                              │
│  ┌──────────┐  ┌──────────────────────┐  ┌───────────────┐  │
│  │ Custom   │  │ We build sites that  │  │ Get a Free    │  │
│  │ websites │  │ rank, convert & scale│  │ Consultation  │  │
│  │ for F&B  │  │ restaurants.         │  │ [CTA Button]  │  │
│  └──────────┘  └──────────────────────┘  └───────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

Key details:
- **H1:** "Restaurant Website Design & SEO That Fills Tables" (contains target keywords)
- **Dark card (~65% width):** `bg-charcoal rounded-[1.25rem]`, atmospheric food image, overlay text "Your Restaurant, Discovered" in cream serif, pill badge "SEO-First Approach"
- **Stat card (~35% width, top):** "90%" large number + "of diners research online before visiting"
- **Trust strip (~35% width, bottom):** "Trusted by" + 4 client logos in grayscale
- **Info row (3 cols):** Descriptor | Value prop | CTA button
- **Animations:** fadeInUp H1 (0.2s delay), scaleIn dark card (0.4s), fadeInUp stat card (0.5s), fadeIn trust strip (0.6s), staggered info row (0.7s)
- **Responsive:** Mobile stacks to single column (headline → dark card → stat → trust → info)
- **Server component** with `AnimatedElement` wrappers. Hero image uses `<Image priority>` for LCP

### Agent 1C: Marketing Layout + Homepage Shell
- **`app/(marketing)/layout.tsx`** — Wraps children with `<Navbar />` + `<Footer />` (footer = placeholder)
- **`app/(marketing)/page.tsx`** — Metadata + JSON-LD + renders `<Hero />`
  - Meta title: "Restaurant Website Design, SEO & Marketing Agency"
  - Meta description: "We build SEO-optimized websites and drive traffic for independent restaurants. Custom design, Google Ads, and commission-free ordering setup."
- **`app/page.tsx`** — Remove default template content (route group handles `/`)

### Agent 1D: Placeholder Image System
- **`next.config.ts`** — Add `remotePatterns` for Unsplash (temporary dev images)
- Curate 1 hero image URL (atmospheric restaurant/chef photography)
- Client logo placeholders (styled text in grayscale boxes)

---

> **APPROVAL GATE 1:** User reviews hero + nav. Nothing else proceeds until approved.

---

## PHASE 2: Remaining Homepage Sections

**Up to 8 parallel agents, one per section.**

| Agent | Section | File | Key Content |
|-------|---------|------|-------------|
| 2A | Services | `sections/Services.tsx` | 5 service cards in bento grid, each linking to `/services/[slug]` |
| 2B | Mission | `sections/Mission.tsx` | DesignProfile-1 "Our Mission" layout: left image pair + right serif heading |
| 2C | Results | `sections/Results.tsx` | Stats grid: +377% growth, $4.5M sales, 5-fig savings, industry data |
| 2D | Process | `sections/Process.tsx` | 3-step growth path: Foundation → Transition → Scale |
| 2E | Testimonials | `sections/Testimonials.tsx` | Client quote cards (Grill Shack, Miss Mat Cafe, etc.) |
| 2F | FAQ | `sections/FAQ.tsx` | 6 accordion items + FAQPage JSON-LD schema |
| 2G | CTA | `sections/CTA.tsx` | Dark full-width card: "Ready to Fill More Tables?" + 2 buttons |
| 2H | Footer | `layout/Footer.tsx` | DesignProfile-1 dark footer with nav links, socials, large "TABLETURNERR" watermark |

**Content rebalancing (per SEO report):** ~40% TableTurnerr services, ~20% results, ~15% Owner.com/ChowNow, ~15% trust signals, ~10% CTA.

> **APPROVAL GATE 2:** User reviews full homepage.

---

## PHASE 3: Service Pages

**6 parallel agents.**

### Shared template: `app/components/templates/ServicePage.tsx`
Reusable layout: Breadcrumb → H1 + intro (asymmetric) → Feature bento grid → Stats → FAQ → CTA → Related services

| Agent | Page | H1 | Target Keywords |
|-------|------|-----|-----------------|
| 3A | `/services` | "Restaurant Marketing Services" | Overview grid |
| 3B | `/services/restaurant-website-design` | "Custom Restaurant Website Design" | restaurant website design, builder |
| 3C | `/services/restaurant-seo` | "Restaurant SEO Services" | restaurant SEO, SEO for restaurants |
| 3D | `/services/restaurant-branding` | "Restaurant Branding & Design" | restaurant branding, menu design |
| 3E | `/services/google-ads` | "Google Ads for Restaurants" | restaurant Google Ads |
| 3F | `/services/google-business-profile-optimization` | "Google Business Profile Optimization" | GBP optimization restaurant |

Each page exports unique `metadata` + `Service` JSON-LD schema.

> **APPROVAL GATE 3:** User reviews service pages.

---

## PHASE 4: Inner Pages

**3 parallel agents.**

| Agent | Page | Key Details |
|-------|------|-------------|
| 4A | `/about` | DesignProfile-1 "Our Company" layout. Company story, mission, client logos |
| 4B | `/contact` | Form (name, email, restaurant, message, service dropdown) + contact info sidebar |
| 4C | `/case-studies` | Cards grid with restaurant success stories + key stats |

> **APPROVAL GATE 4:** User reviews inner pages.

---

## PHASE 5: Blog Infrastructure

**2 parallel agents.**

| Agent | Scope | Files |
|-------|-------|-------|
| 5A | Blog pages | `blog/page.tsx` (listing with category filter) + `blog/[slug]/page.tsx` (article layout with ToC) |
| 5B | Data layer | `lib/blog.ts` + `content/blog/` directory. Local MDX or TS data objects. `Article` JSON-LD schema |

> **APPROVAL GATE 5:** User reviews blog infrastructure.

---

## PHASE 6: Polish & Launch Prep

**4 parallel agents.**

| Agent | Scope |
|-------|-------|
| 6A | Animation polish — consistency, `prefers-reduced-motion`, page transitions |
| 6B | Performance — Lighthouse audit, image optimization (WebP), LCP/CLS/FID |
| 6C | SEO audit — unique titles/descriptions, sitemap completeness, JSON-LD validation, OG images, heading hierarchy, alt text |
| 6D | Responsive QA — 320px through 1440px, mobile menu, touch targets (44px min) |

---

## Architecture Decisions

1. **Route group `(marketing)`** — Shared nav+footer layout, no URL prefix impact
2. **Server components by default** — Only `AnimatedElement`, `MobileMenu`, FAQ accordion are `'use client'`
3. **No dark mode** — Light/cream-only editorial design
4. **Tailwind v4 CSS tokens** — All in `globals.css @theme inline`, no `tailwind.config.ts`
5. **`@/*` path alias** — Already in tsconfig.json
6. **`next/image` everywhere** — With `priority` on hero image only

## Verification

After each phase:
1. `pnpm build` — Ensure no build errors
2. `pnpm dev` — Visual review at localhost:3000
3. Check responsive behavior at 375px, 768px, 1280px
4. Verify page source (View Source) contains SEO-critical text (server-rendered)
5. Final phase: Lighthouse audit targeting 90+ on all metrics
