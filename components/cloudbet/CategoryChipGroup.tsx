"use client"

import * as React from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/mocks"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CategoryChipGroupProps {
  categories: Category[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CategoryChipGroup({
  categories,
  value,
  onValueChange,
  className,
}: CategoryChipGroupProps) {
  return (
    <div
      className={cn(
        "flex w-full overflow-x-auto no-scrollbar",
        className,
      )}
    >
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => { if (v) onValueChange(v) }}
        className="flex flex-nowrap gap-2 px-0.5 py-0.5 min-w-max"
      >
        {categories.map((cat) => (
          <ToggleGroupItem
            key={cat.id}
            value={cat.id}
            aria-label={cat.label}
            className={cn(
              "h-[var(--cb-chip-h)] shrink-0 rounded-full border border-cb-border px-4 text-sm font-medium whitespace-nowrap",
              "text-cb-foreground-muted bg-cb-surface-3",
              "hover:bg-cb-surface-4 hover:text-cb-foreground hover:border-cb-border-visible",
              "data-[state=on]:bg-cb-brand-purple data-[state=on]:text-cb-brand-purple-fg data-[state=on]:border-cb-brand-purple",
              "transition-all duration-150",
            )}
          >
            {cat.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
