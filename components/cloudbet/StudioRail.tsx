"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import type { Provider } from "@/lib/mocks"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StudioRailProps {
  providers: Provider[]
  onSelect?: (id: string) => void
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StudioRail({ providers, onSelect, className }: StudioRailProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop: Carousel */}
      <div className="hidden sm:block">
        <Carousel opts={{ align: "start", dragFree: true }}>
          <CarouselContent className="-ml-3">
            {providers.map((p) => (
              <CarouselItem key={p.id} className="pl-3 basis-auto">
                <StudioLogo provider={p} onSelect={onSelect} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Mobile: native scroll */}
      <div className="flex sm:hidden overflow-x-auto no-scrollbar gap-3 pb-1">
        {providers.map((p) => (
          <StudioLogo key={p.id} provider={p} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

function StudioLogo({
  provider,
  onSelect,
}: {
  provider: Provider
  onSelect?: (id: string) => void
}) {
  return (
    <button
      onClick={() => onSelect?.(provider.id)}
      className={cn(
        "flex shrink-0 flex-col items-center justify-center gap-1.5",
        "w-24 h-16 rounded-[var(--cb-radius-md)] border border-cb-border",
        "bg-cb-surface-3 hover:bg-cb-surface-4 hover:border-cb-border-visible",
        "transition-all duration-150 group",
      )}
      aria-label={`Filter by ${provider.name}`}
    >
      <span className="text-[10px] font-medium text-cb-foreground-muted group-hover:text-cb-foreground transition-colors text-center leading-tight px-1 truncate w-full text-center">
        {provider.name}
      </span>
      <span className="text-[9px] text-cb-foreground-disabled">
        {provider.gameCount} games
      </span>
    </button>
  )
}
