"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GameTile } from "@/components/cloudbet/GameTile"
import { Skeleton } from "@/components/ui/skeleton"
import type { Game } from "@/lib/mocks"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GameGridProps {
  games: Game[]
  isLoading?: boolean
  onPlay?: (id: string) => void
  onDemo?: (id: string) => void
  className?: string
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function GameGridSkeleton() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="w-full rounded-[var(--cb-game-card-radius)] bg-cb-surface-3" style={{ aspectRatio: "3/4" }} />
          <Skeleton className="h-3 w-3/4 rounded bg-cb-surface-3" />
          <Skeleton className="h-2.5 w-1/2 rounded bg-cb-surface-3" />
        </div>
      ))}
    </>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GameGrid({
  games,
  isLoading = false,
  onPlay,
  onDemo,
  className,
}: GameGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        "grid-cols-[repeat(auto-fill,minmax(var(--cb-game-card-w),1fr))]",
        className,
      )}
    >
      {isLoading ? (
        <GameGridSkeleton />
      ) : (
        games.map((game) => (
          <GameTile
            key={game.id}
            game={game}
            size="sm"
            onPlay={onPlay}
            onDemo={onDemo}
          />
        ))
      )}
    </div>
  )
}
