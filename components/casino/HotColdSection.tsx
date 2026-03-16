"use client"

import * as React from "react"
import { Flame, Snowflake } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { GameTile } from "@/components/cloudbet/GameTile"
import { MOCK_HOT_GAMES, MOCK_COLD_GAMES } from "@/lib/mocks"
import type { Game } from "@/lib/mocks"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HotColdSectionProps {
  hotGames?: Game[]
  coldGames?: Game[]
  onPlay?: (id: string) => void
  onDemo?: (id: string) => void
  className?: string
}

// ─── Panel ────────────────────────────────────────────────────────────────────

interface PanelProps {
  variant: "hot" | "cold"
  games: Game[]
  onPlay?: (id: string) => void
  onDemo?: (id: string) => void
}

function SlotPanel({ variant, games, onPlay, onDemo }: PanelProps) {
  const isHot = variant === "hot"

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-cb-border bg-cb-surface-2",
        "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:content-['']",
        isHot
          ? "before:bg-gradient-to-r before:from-orange-500 before:to-amber-400"
          : "before:bg-gradient-to-r before:from-blue-500 before:to-cyan-400"
      )}
    >
      {/* Decorative blob */}
      <div
        className={cn(
          "pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-10 blur-2xl",
          isHot ? "bg-orange-500" : "bg-blue-500"
        )}
        aria-hidden
      />

      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-cb-foreground-muted">
            Top 5 Slots
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {isHot ? (
            <Flame
              className="size-5 text-orange-400"
              aria-hidden
            />
          ) : (
            <Snowflake
              className="size-5 text-blue-400"
              aria-hidden
            />
          )}
          <h3
            className={cn(
              "text-base font-bold",
              isHot ? "text-orange-400" : "text-blue-400"
            )}
          >
            {isHot ? "Hot Slots" : "Cold Slots"}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <ul className="flex flex-col gap-2">
          {games.map((game) => (
            <li key={game.id} className="flex items-center gap-3">
              <GameTile
                game={game}
                size="sm"
                onPlay={onPlay}
                onDemo={onDemo}
                className="w-10 shrink-0"
                style={{ aspectRatio: "1 / 1" }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-cb-foreground">
                  {game.title}
                </p>
                <p className="truncate text-[10px] text-cb-foreground-muted">
                  {game.provider}
                </p>
              </div>
              {game.rtp !== undefined && (
                <span
                  className={cn(
                    "shrink-0 rounded-[var(--cb-radius-sm)] px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                    isHot
                      ? "bg-orange-500/15 text-orange-400"
                      : "bg-blue-500/15 text-blue-400"
                  )}
                >
                  {game.rtp.toFixed(1)}%
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HotColdSection({
  hotGames = MOCK_HOT_GAMES,
  coldGames = MOCK_COLD_GAMES,
  onPlay,
  onDemo,
  className,
}: HotColdSectionProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 lg:grid-cols-2", className)}>
      <SlotPanel variant="hot" games={hotGames} onPlay={onPlay} onDemo={onDemo} />
      <SlotPanel variant="cold" games={coldGames} onPlay={onPlay} onDemo={onDemo} />
    </div>
  )
}
