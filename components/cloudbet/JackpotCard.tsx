"use client"

import * as React from "react"
import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { NumberTicker } from "@/components/ui/number-ticker"
import type { Jackpot } from "@/lib/mocks"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JackpotCardProps {
  jackpot: Jackpot
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function JackpotAmount({ amount, currency }: { amount: number; currency: string }) {
  if (amount >= 1_000_000) {
    return (
      <span className="tabular-nums">
        <NumberTicker value={amount / 1_000_000} decimalPlaces={2} className="text-cb-jackpot" />
        <span className="text-cb-jackpot">M {currency}</span>
      </span>
    )
  }
  if (amount >= 1_000) {
    return (
      <span className="tabular-nums">
        <NumberTicker value={amount / 1_000} decimalPlaces={1} className="text-cb-jackpot" />
        <span className="text-cb-jackpot">K {currency}</span>
      </span>
    )
  }
  return (
    <span className="tabular-nums">
      <NumberTicker value={amount} decimalPlaces={0} className="text-cb-jackpot" />
      <span className="text-cb-jackpot"> {currency}</span>
    </span>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function JackpotCard({ jackpot, className }: JackpotCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border border-[oklch(0.82_0.18_75_/_20%)] bg-cb-surface-3",
        "before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-gradient-to-b before:from-[oklch(0.82_0.18_75_/_15%)] before:to-transparent before:pointer-events-none",
        className,
      )}
    >
      <BorderBeam
        size={120}
        duration={4}
        colorFrom="var(--cb-jackpot)"
        colorTo="oklch(0.82 0.18 75 / 0%)"
        borderWidth={1.5}
      />
      <BorderBeam
        size={80}
        duration={4}
        delay={2}
        reverse
        colorFrom="oklch(0.82 0.18 75 / 0%)"
        colorTo="var(--cb-jackpot)"
        borderWidth={1.5}
      />

      <CardContent className="flex flex-col items-center gap-3 pt-6 pb-5 px-4">
        {/* Icon */}
        <div className="flex size-10 items-center justify-center rounded-full bg-[oklch(0.82_0.18_75_/_12%)] border border-[oklch(0.82_0.18_75_/_25%)]">
          <Trophy className="size-5 text-cb-jackpot" aria-hidden />
        </div>

        {/* Name */}
        <p className="text-xs font-medium text-cb-foreground-muted uppercase tracking-[var(--cb-tracking-label)]">
          {jackpot.name}
        </p>

        {/* Amount */}
        <p
          className="text-2xl font-bold cb-jackpot-pulse leading-none"
          aria-label={`${jackpot.name}: ${jackpot.amount.toLocaleString()} ${jackpot.currency}`}
        >
          <JackpotAmount amount={jackpot.amount} currency={jackpot.currency} />
        </p>

        {/* Game name */}
        <p className="text-[10px] text-cb-foreground-disabled">
          {jackpot.gameId}
        </p>
      </CardContent>
    </Card>
  )
}
