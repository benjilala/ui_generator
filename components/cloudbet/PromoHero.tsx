"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PromoSlide {
  id: string
  tag?: string
  title: string
  subtitle?: string
  ctaLabel: string
  ctaHref?: string
  onCta?: () => void
  bgColor?: string
  accentColor?: string
}

export interface PromoHeroProps {
  slides: PromoSlide[]
  className?: string
  autoplay?: boolean
}

// ─── Default slides ───────────────────────────────────────────────────────────

export const DEFAULT_PROMO_SLIDES: PromoSlide[] = [
  {
    id: "s1",
    tag: "Welcome Offer",
    title: "100% up to 5 BTC",
    subtitle: "Your first deposit, doubled. No strings attached.",
    ctaLabel: "Claim Bonus",
    bgColor: "from-[oklch(0.135_0.015_285)] via-[oklch(0.165_0.04_285)] to-[oklch(0.135_0.015_285)]",
    accentColor: "oklch(0.52 0.22 285)",
  },
  {
    id: "s2",
    tag: "Casino",
    title: "Gates of Olympus\nMegaways",
    subtitle: "50 Free Spins — no deposit required.",
    ctaLabel: "Play Now",
    bgColor: "from-[oklch(0.135_0.015_285)] via-[oklch(0.165_0.035_75)] to-[oklch(0.135_0.015_285)]",
    accentColor: "oklch(0.82 0.18 75)",
  },
  {
    id: "s3",
    tag: "VIP",
    title: "Weekly Cashback\nup to 20%",
    subtitle: "Exclusive for Diamond and above members.",
    ctaLabel: "Join VIP",
    bgColor: "from-[oklch(0.135_0.015_285)] via-[oklch(0.165_0.03_0)] to-[oklch(0.135_0.015_285)]",
    accentColor: "oklch(0.6 0.28 0)",
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function PromoHero({ slides, className }: PromoHeroProps) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-[var(--cb-radius-xl)]", className)}>
      <Carousel
        opts={{ loop: true, align: "start" }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <PromoSlideCard slide={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <CarouselPrevious
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 z-20",
            "size-8 rounded-full border border-white/10 bg-black/40 text-white",
            "hover:bg-black/60 hover:border-white/20",
          )}
        >
          <ChevronLeft className="size-4" />
        </CarouselPrevious>
        <CarouselNext
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 z-20",
            "size-8 rounded-full border border-white/10 bg-black/40 text-white",
            "hover:bg-black/60 hover:border-white/20",
          )}
        >
          <ChevronRight className="size-4" />
        </CarouselNext>
      </Carousel>
    </div>
  )
}

function PromoSlideCard({ slide }: { slide: PromoSlide }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] w-full items-end overflow-hidden",
        "bg-gradient-to-r",
        slide.bgColor ?? "from-cb-surface-1 via-cb-surface-3 to-cb-surface-1",
      )}
    >
      {/* Decorative radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 80% at 70% 50%, ${slide.accentColor ?? "oklch(0.52 0.22 285)"}22 0%, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Bottom gradient overlay */}
      <div className="promo-gradient absolute inset-0 pointer-events-none z-10" aria-hidden />

      {/* Content */}
      <div className="relative z-20 flex flex-col gap-3 p-6 sm:p-8 max-w-lg">
        {slide.tag && (
          <Badge
            variant="outline"
            className="w-fit border-white/15 bg-white/8 text-white/80 text-[10px] uppercase tracking-widest"
          >
            {slide.tag}
          </Badge>
        )}

        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight whitespace-pre-line"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          {slide.title}
        </h2>

        {slide.subtitle && (
          <p className="text-sm text-white/70 leading-relaxed max-w-sm">
            {slide.subtitle}
          </p>
        )}

        <Button
          size="sm"
          className="w-fit mt-1 bg-cb-primary hover:bg-cb-primary/90 text-white font-medium"
          onClick={slide.onCta}
          asChild={!!slide.ctaHref}
        >
          {slide.ctaHref ? (
            <a href={slide.ctaHref}>{slide.ctaLabel}</a>
          ) : (
            <span>{slide.ctaLabel}</span>
          )}
        </Button>
      </div>
    </div>
  )
}
