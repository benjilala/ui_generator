"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GameTile } from "./GameTile"
import type { Game } from "@/lib/mocks"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RecentPlayStripProps {
  games: Game[]
  onPlay?: (id: string) => void
  onDemo?: (id: string) => void
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Horizontal game strip using native scroll — preferred over ScrollArea for
 * horizontal rails: smoother mobile touch behavior and native momentum scrolling.
 */
export function RecentPlayStrip({
  games,
  onPlay,
  onDemo,
  className,
}: RecentPlayStripProps) {
  return (
    <div
      className={cn(
        "flex overflow-x-auto no-scrollbar gap-[var(--cb-carousel-gap)] pb-1",
        className,
      )}
    >
      {games.map((game) => (
        <GameTile
          key={game.id}
          game={game}
          size="sm"
          onPlay={onPlay}
          onDemo={onDemo}
          className="shrink-0"
        />
      ))}
    </div>
  )
}
