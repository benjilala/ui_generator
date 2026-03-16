"use client"

import * as React from "react"
import {
  Home,
  Layers,
  Radio,
  Grid2X2,
  Trophy,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Chip } from "@/components/ui/chip"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CategoryChip {
  id: string
  label: string
  icon: React.ReactNode
}

export interface CategoryChipBarProps {
  value?: string
  onValueChange?: (id: string) => void
  className?: string
}

// ─── Default categories ───────────────────────────────────────────────────────

const CATEGORY_CHIPS: CategoryChip[] = [
  { id: "all",      label: "All Games",    icon: <Home /> },
  { id: "slots",    label: "Slots",        icon: <Layers /> },
  { id: "live",     label: "Live Casino",  icon: <Radio /> },
  { id: "table",    label: "Table Games",  icon: <Grid2X2 /> },
  { id: "jackpots", label: "Jackpots",     icon: <Trophy /> },
  { id: "new",      label: "New",          icon: <Sparkles /> },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function CategoryChipBar({
  value = "all",
  onValueChange,
  className,
}: CategoryChipBarProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 scrollbar-none",
        "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className
      )}
      role="toolbar"
      aria-label="Game categories"
    >
      {CATEGORY_CHIPS.map((chip) => (
        <Chip
          key={chip.id}
          variant="filled"
          selected={value === chip.id}
          icon={chip.icon}
          onClick={() => onValueChange?.(chip.id)}
        >
          {chip.label}
        </Chip>
      ))}
    </div>
  )
}
