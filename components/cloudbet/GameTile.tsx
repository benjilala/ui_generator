"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Play, Gamepad2, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { gameCard, motion } from "@/lib/tokens/cloudbet"
import { BorderBeam } from "@/components/ui/border-beam"
import type { Game } from "@/lib/mocks"

// ─── CVA ─────────────────────────────────────────────────────────────────────

const gameTileVariants = cva(
  [
    "group/tile relative flex flex-col overflow-hidden cursor-pointer select-none",
    gameCard.radius,
    "bg-cb-surface-4 border border-cb-border",
    motion.base,
    "hover:border-cb-border-visible hover:shadow-[0_12px_40px_oklch(0_0_0_/_50%)] hover:-translate-y-0.5",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
  ],
  {
    variants: {
      size: {
        sm:   gameCard.sm,
        lg:   gameCard.lg,
        full: gameCard.full,
      },
      featured: {
        true: "border-cb-featured-border shadow-[0_0_0_1px_var(--cb-featured-border),_0_4px_20px_oklch(from_var(--cb-featured)_l_c_h_/_15%)]",
        false: "",
      },
    },
    defaultVariants: { size: "sm", featured: false },
  }
)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GameTileProps
  extends VariantProps<typeof gameTileVariants>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onPlay"> {
  game: Game
  onPlay?: (id: string) => void
  onDemo?: (id: string) => void
}

// ─── Badges ───────────────────────────────────────────────────────────────────

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-[var(--cb-radius-sm)] border border-cb-live/25 bg-cb-live-bg px-1.5 py-0.5 text-[10px] font-medium text-cb-live uppercase tracking-wider">
      <span className="size-[var(--cb-live-dot-sm)] rounded-full bg-cb-live animate-pulse shrink-0" aria-hidden />
      Live
    </span>
  )
}

function NewBadge() {
  return (
    <span className="inline-flex items-center rounded-[var(--cb-radius-sm)] bg-cb-primary px-1.5 py-0.5 text-[10px] font-medium text-white uppercase tracking-wider">
      New
    </span>
  )
}

function HotBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-[var(--cb-radius-sm)] bg-cb-featured-bg border border-cb-featured-border px-1.5 py-0.5 text-[10px] font-medium text-cb-featured uppercase tracking-wider">
      <Zap className="size-2.5" aria-hidden />
      Hot
    </span>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GameTile({
  game,
  size = "sm",
  featured,
  onPlay,
  onDemo,
  className,
  ...props
}: GameTileProps) {
  const isFeatured = featured ?? game.isFeatured ?? false

  return (
    <div
      role="article"
      aria-label={`${game.title} by ${game.provider}`}
      className={cn(gameTileVariants({ size, featured: isFeatured }), className)}
      {...props}
    >
      {isFeatured && (
        <BorderBeam
          size={60}
          duration={5}
          colorFrom="var(--cb-featured)"
          colorTo="oklch(from var(--cb-featured) l c h / 0%)"
          borderWidth={1}
        />
      )}

      {/* Thumbnail */}
      <div className="relative w-full" style={{ aspectRatio: "var(--cb-game-img-ratio, 3/4)" }}>
        {/* Placeholder image */}
        <div className="absolute inset-0 bg-cb-surface-3 flex items-center justify-center">
          <Gamepad2 className="size-10 text-cb-foreground-disabled" aria-hidden />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {game.isLive && <LiveBadge />}
          {game.isNew && <NewBadge />}
          {isFeatured && !game.isNew && <HotBadge />}
        </div>

        {/* Hover overlay */}
        <div className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-2 z-20",
          "bg-black/70 opacity-0 group-hover/tile:opacity-100",
          motion.fast,
        )}>
          <button
            onClick={(e) => { e.stopPropagation(); onPlay?.(game.id) }}
            className="flex items-center gap-1.5 rounded-[var(--cb-radius-md)] bg-cb-primary px-4 py-2 text-sm font-medium text-white hover:bg-cb-primary/90 transition-colors"
          >
            <Play className="size-3.5 fill-current" aria-hidden />
            Play
          </button>
          {!game.isLive && (
            <button
              onClick={(e) => { e.stopPropagation(); onDemo?.(game.id) }}
              className="text-xs text-cb-foreground-muted hover:text-cb-foreground transition-colors"
            >
              Demo
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 px-2 py-2 min-h-[var(--cb-game-card-info-h)]">
        <p className="text-xs font-medium text-cb-foreground truncate leading-tight">{game.title}</p>
        <p className="text-[10px] text-cb-foreground-muted truncate">{game.provider}</p>
        {game.playerCount && game.playerCount > 100 && (
          <p className="flex items-center gap-1 text-[10px] text-cb-foreground-disabled mt-0.5">
            <Users className="size-2.5" aria-hidden />
            {game.playerCount.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}
