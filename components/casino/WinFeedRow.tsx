"use client"

import * as React from "react"
import { Gamepad2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { MOCK_WIN_FEED } from "@/lib/mocks"
import type { WinFeedEntry } from "@/lib/mocks"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WinFeedRowProps {
  entries?: WinFeedEntry[]
  className?: string
}

// ─── WinCard ──────────────────────────────────────────────────────────────────

function WinCard({ entry }: { entry: WinFeedEntry }) {
  const formattedAmount = entry.amount >= 1_000_000
    ? `${(entry.amount / 1_000_000).toFixed(2)}M`
    : entry.amount >= 1_000
    ? `${(entry.amount / 1_000).toFixed(1)}K`
    : entry.amount.toLocaleString()

  return (
    <div className="relative flex w-32 shrink-0 flex-col items-center sm:w-44">
      {/* Floating thumbnail — lifted above the card */}
      <div className="relative z-10 -mb-8 h-16 w-16 overflow-hidden rounded-xl border border-cb-border bg-cb-surface-3 shadow-lg sm:h-20 sm:w-20">
        <div className="flex h-full w-full items-center justify-center bg-cb-surface-3">
          <Gamepad2 className="size-8 text-cb-foreground-disabled" aria-hidden />
        </div>
      </div>

      {/* Card body */}
      <Card className="w-full rounded-t-none rounded-b-xl border-cb-border bg-cb-surface-3 pt-10 pb-3 px-2 text-center">
        <p className="truncate text-[10px] text-cb-foreground-muted">
          {entry.player}
        </p>
        <p className="truncate text-[10px] text-cb-foreground-muted/70 mt-0.5">
          {entry.game}
        </p>
        <p className="mt-1 text-sm font-bold text-cb-odds-up tabular-nums">
          {formattedAmount} {entry.currency}
        </p>
        {entry.multiplier > 1 && (
          <p className="text-[10px] text-cb-foreground-disabled">
            {entry.multiplier}×
          </p>
        )}
      </Card>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WinFeedRow({
  entries = MOCK_WIN_FEED,
  className,
}: WinFeedRowProps) {
  return (
    <div
      className={cn(
        "flex gap-3 overflow-x-auto pt-10 pb-2",
        "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className
      )}
      aria-label="Recent big wins"
    >
      {entries.map((entry) => (
        <WinCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
