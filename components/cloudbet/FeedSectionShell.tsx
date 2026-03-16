"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { feedEvent } from "@/lib/tokens/cloudbet"
import type { BetFeedEntry, WinFeedEntry } from "@/lib/mocks"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FeedSectionShellProps {
  betFeed: BetFeedEntry[]
  winFeed: WinFeedEntry[]
  className?: string
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BetRow({ entry }: { entry: BetFeedEntry }) {
  return (
    <div className="flex items-center gap-3 px-4 h-[var(--cb-feed-item-h)] border-b border-cb-border last:border-0">
      <span className={cn("size-[var(--cb-feed-dot-size)] rounded-full shrink-0", feedEvent.bet.bg, "border border-cb-event-bet/30")} aria-hidden />
      <span className="flex-1 min-w-0">
        <span className="text-xs font-medium text-cb-foreground truncate block">{entry.game}</span>
        <span className="text-[10px] text-cb-foreground-muted">{entry.player}</span>
      </span>
      <span className="text-xs font-mono text-cb-foreground tabular-nums shrink-0">
        {entry.amount.toLocaleString()} <span className="text-cb-foreground-muted">{entry.currency}</span>
      </span>
      <span className="text-[10px] text-cb-foreground-disabled shrink-0 w-14 text-right">{entry.timestamp}</span>
    </div>
  )
}

function WinRow({ entry }: { entry: WinFeedEntry }) {
  return (
    <div className="flex items-center gap-3 px-4 h-[var(--cb-feed-item-h)] border-b border-cb-border last:border-0">
      <span className={cn("size-[var(--cb-feed-dot-size)] rounded-full shrink-0", feedEvent.win.bg, "border border-cb-event-win/30")} aria-hidden />
      <span className="flex-1 min-w-0">
        <span className="text-xs font-medium text-cb-foreground truncate block">{entry.game}</span>
        <span className="text-[10px] text-cb-foreground-muted">{entry.player}</span>
      </span>
      <span className="flex flex-col items-end shrink-0">
        <span className="text-xs font-mono text-cb-event-win tabular-nums">
          {entry.amount.toLocaleString()} <span className="text-cb-foreground-muted text-[10px]">{entry.currency}</span>
        </span>
        <span className="text-[10px] text-cb-foreground-muted">{entry.multiplier}×</span>
      </span>
      <span className="text-[10px] text-cb-foreground-disabled shrink-0 w-14 text-right">{entry.timestamp}</span>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FeedSectionShell({
  betFeed,
  winFeed,
  className,
}: FeedSectionShellProps) {
  const [view, setView] = useState<"wins" | "bets">("wins")

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Button group switcher — sits above the table */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={view === "wins" ? "default" : "secondary"}
          onClick={() => setView("wins")}
        >
          Recent Wins
        </Button>
        <Button
          size="sm"
          variant={view === "bets" ? "default" : "secondary"}
          onClick={() => setView("bets")}
        >
          Recent Bets
        </Button>
      </div>

      {/* Feed table */}
      <div className="rounded-[var(--cb-radius-lg)] border border-cb-border bg-cb-surface-3 overflow-hidden">
        {view === "wins" ? (
          <ScrollArea className="h-[300px]">
            {winFeed.map((entry) => (
              <WinRow key={entry.id} entry={entry} />
            ))}
          </ScrollArea>
        ) : (
          <ScrollArea className="h-[300px]">
            {betFeed.map((entry) => (
              <BetRow key={entry.id} entry={entry} />
            ))}
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
