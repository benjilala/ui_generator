"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeroSlide {
  id: string
  badge?: string
  heading: string
  subheading?: string
  cta?: string
  /** CSS color variable or value used for the gradient/accent */
  accentVar: string
}

export interface HeroCarouselProps {
  slides?: HeroSlide[]
  className?: string
}

// ─── Default slides ───────────────────────────────────────────────────────────

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: "h1",
    badge: "Subject",
    heading: "Title goes here",
    subheading: "Supporting body copy goes here. Describe the offer, game, or promotion in one or two short lines.",
    cta: "Call to action",
    accentVar: "var(--cb-primary)",
  },
  {
    id: "h2",
    badge: "Subject",
    heading: "Title goes here",
    subheading: "Supporting body copy goes here. Describe the offer, game, or promotion in one or two short lines.",
    cta: "Call to action",
    accentVar: "var(--cb-primary)",
  },
  {
    id: "h3",
    badge: "Subject",
    heading: "Title goes here",
    subheading: "Supporting body copy goes here. Describe the offer, game, or promotion in one or two short lines.",
    cta: "Call to action",
    accentVar: "var(--cb-primary)",
  },
  {
    id: "h4",
    badge: "Subject",
    heading: "Title goes here",
    subheading: "Supporting body copy goes here. Describe the offer, game, or promotion in one or two short lines.",
    cta: "Call to action",
    accentVar: "var(--cb-primary)",
  },
  {
    id: "h5",
    badge: "Subject",
    heading: "Title goes here",
    subheading: "Supporting body copy goes here. Describe the offer, game, or promotion in one or two short lines.",
    cta: "Call to action",
    accentVar: "var(--cb-primary)",
  },
]

// ─── HeroTile ─────────────────────────────────────────────────────────────────

function HeroTile({ slide }: { slide: HeroSlide }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-cb-surface-3"
      style={{
        height: "500px",
        background: `linear-gradient(135deg, oklch(from ${slide.accentVar} calc(l * 0.25) c h / 0.9) 0%, var(--cb-surface-2) 100%)`,
      }}
    >
      {/* Decorative radial blob on the right */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle, ${slide.accentVar} 0%, transparent 70%)` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-16 bottom-0 h-72 w-72 rounded-full opacity-20 blur-2xl"
        style={{ background: `radial-gradient(circle, ${slide.accentVar} 0%, transparent 70%)` }}
        aria-hidden
      />

      {/* Left-to-right gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to right, oklch(from ${slide.accentVar} calc(l * 0.15) c h / 0.95) 0%, oklch(from ${slide.accentVar} calc(l * 0.15) c h / 0.6) 50%, transparent 100%)`,
        }}
        aria-hidden
      />

      <BorderBeam
        size={200}
        duration={8}
        colorFrom={slide.accentVar}
        colorTo="transparent"
        borderWidth={1.5}
      />

      {/* Content — left 60% */}
      <div className="relative z-10 flex h-full w-[60%] flex-col justify-center gap-4 px-10">
        {slide.badge && (
          <span className="inline-flex w-fit items-center rounded-[var(--cb-radius-sm)] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-purple-600">
            {slide.badge}
          </span>
        )}
        <h2 className="text-4xl font-bold leading-tight text-white drop-shadow-sm">
          {slide.heading}
        </h2>
        {slide.subheading && (
          <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
            {slide.subheading}
          </p>
        )}
        {slide.cta && (
          <Button
            variant="default"
            className="mt-2 w-fit"
            style={{ height: "48px", paddingLeft: "24px", paddingRight: "24px" }}
          >
            {slide.cta}
          </Button>
        )}
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroCarousel({
  slides = DEFAULT_HERO_SLIDES,
  className,
}: HeroCarouselProps) {
  return (
    <div className={cn("relative", className)}>
      <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
        <CarouselContent className="-ml-3">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-3">
              <HeroTile slide={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex -left-3 size-8 border-cb-border bg-cb-surface-4 text-cb-foreground hover:bg-cb-surface-5 hover:border-cb-border-visible" />
        <CarouselNext className="hidden sm:flex -right-3 size-8 border-cb-border bg-cb-surface-4 text-cb-foreground hover:bg-cb-surface-5 hover:border-cb-border-visible" />
      </Carousel>
    </div>
  )
}
