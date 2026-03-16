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
import { GameTile } from "@/components/cloudbet/GameTile"
import type { Game } from "@/lib/mocks"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FeaturedGamesCarouselProps {
  games: Game[]
  onPlay?: (id: string) => void
  onDemo?: (id: string) => void
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FeaturedGamesCarousel({
  games,
  onPlay,
  onDemo,
  className,
}: FeaturedGamesCarouselProps) {
  return (
    <div className={cn("relative", className)}>
      <Carousel
        opts={{ align: "start", dragFree: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-[var(--cb-carousel-gap)]">
          {games.map((game) => (
            <CarouselItem
              key={game.id}
              className="pl-[var(--cb-carousel-gap)] basis-auto"
            >
              <GameTile
                game={game}
                size="lg"
                featured={game.isFeatured}
                onPlay={onPlay}
                onDemo={onDemo}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex -left-3 size-8 border-cb-border bg-cb-surface-4 text-cb-foreground hover:bg-cb-surface-5 hover:border-cb-border-visible" />
        <CarouselNext className="hidden sm:flex -right-3 size-8 border-cb-border bg-cb-surface-4 text-cb-foreground hover:bg-cb-surface-5 hover:border-cb-border-visible" />
      </Carousel>
    </div>
  )
}
