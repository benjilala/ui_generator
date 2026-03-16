"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { GeneratedEntry, GeneratedStatus } from "@/lib/system/generated-screens"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GeneratedNavProps {
  entries: GeneratedEntry[]
  selectedId: string | null
  onSelect: (id: string) => void
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<GeneratedStatus, string> = {
  preview: "border-cb-primary/30 bg-cb-primary/10 text-cb-primary",
  draft:   "border-cb-border text-cb-foreground-disabled bg-transparent",
  useful:  "border-cb-live/30 bg-cb-live-bg text-cb-live",
}

const STATUS_LABELS: Record<GeneratedStatus, string> = {
  preview: "Preview",
  draft:   "Draft",
  useful:  "Useful",
}

function PatternBadge({ pattern }: { pattern: string }) {
  return (
    <span className="inline-flex items-center rounded-[var(--cb-radius-sm)] border border-cb-border bg-cb-surface-4 px-1.5 py-px text-[9px] font-medium text-cb-foreground-muted uppercase tracking-wider truncate max-w-[120px]">
      {pattern}
    </span>
  )
}

function StatusBadge({ status }: { status: GeneratedStatus }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-1.5 py-px text-[9px] font-medium uppercase tracking-wider shrink-0",
      STATUS_STYLES[status]
    )}>
      {STATUS_LABELS[status]}
    </span>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GeneratedNav({ entries, selectedId, onSelect, className }: GeneratedNavProps) {
  return (
    <nav className={cn("flex flex-col gap-1", className)} aria-label="Generated screens">
      <p className="text-[10px] font-semibold text-cb-foreground-disabled uppercase tracking-widest px-2 mb-2">
        Generated Screens
      </p>

      {entries.length === 0 && (
        <p className="text-xs text-cb-foreground-disabled px-2 py-4 text-center leading-relaxed">
          No screens yet.<br />Submit a prompt to generate one.
        </p>
      )}

      {entries.map((entry) => {
        const isSelected = entry.id === selectedId
        return (
          <button
            key={entry.id}
            onClick={() => onSelect(entry.id)}
            className={cn(
              "group flex flex-col gap-1.5 rounded-[var(--cb-radius-md)] px-3 py-2.5 text-left transition-colors",
              isSelected
                ? "bg-transparent border border-cb-border-visible"
                : "border border-transparent hover:bg-cb-surface-3 hover:border-cb-border"
            )}
          >
            <span className={cn(
              "text-xs font-medium leading-snug truncate",
              isSelected ? "text-cb-foreground" : "text-cb-foreground-muted group-hover:text-cb-foreground"
            )}>
              {entry.title}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <PatternBadge pattern={entry.detectedPattern} />
              <StatusBadge status={entry.status} />
            </div>
          </button>
        )
      })}
    </nav>
  )
}
