"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { JackpotCard } from "@/components/cloudbet/JackpotCard"
import type { Jackpot } from "@/lib/mocks"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JackpotSectionProps {
  jackpots: Jackpot[]
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function JackpotSection({ jackpots, className }: JackpotSectionProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        "grid-cols-1 sm:grid-cols-3",
        className,
      )}
    >
      {jackpots.map((jackpot) => (
        <JackpotCard key={jackpot.id} jackpot={jackpot} />
      ))}
    </div>
  )
}
