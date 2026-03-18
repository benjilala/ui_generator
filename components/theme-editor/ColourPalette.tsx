"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const BASE_HUES = [
  { label: "Red", colors: ["#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d"] },
  { label: "Orange", colors: ["#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12"] },
  { label: "Amber", colors: ["#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f"] },
  { label: "Yellow", colors: ["#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12"] },
  { label: "Lime", colors: ["#84cc16", "#65a30d", "#4d7c0f", "#3f6212", "#365314"] },
  { label: "Green", colors: ["#22c55e", "#16a34a", "#15803d", "#166534", "#14532d"] },
  { label: "Teal", colors: ["#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a"] },
  { label: "Cyan", colors: ["#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63"] },
  { label: "Blue", colors: ["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a"] },
  { label: "Indigo", colors: ["#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#312e81"] },
  { label: "Violet", colors: ["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95"] },
  { label: "Purple", colors: ["#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87"] },
  { label: "Fuchsia", colors: ["#d946ef", "#c026d3", "#a21caf", "#86198f", "#701a75"] },
  { label: "Pink", colors: ["#ec4899", "#db2777", "#be185d", "#9d174d", "#831843"] },
  { label: "Rose", colors: ["#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337"] },
]

interface ColourPaletteProps {
  value?: string
  onChange: (colour: string) => void
  label: string
}

export function ColourPalette({ value, onChange, label }: ColourPaletteProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-cb-foreground">{label}</span>
        {value && (
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-full border border-cb-border" style={{ background: value }} />
            <span className="text-[10px] font-mono text-cb-foreground-muted">{value}</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {BASE_HUES.map((hue) => (
          <button
            key={hue.label}
            onClick={() => onChange(hue.colors[1])}
            className={cn(
              "size-8 rounded-full transition-all hover:scale-110",
              value === hue.colors[1] && "ring-2 ring-cb-foreground ring-offset-2 ring-offset-cb-surface-2",
            )}
            style={{ background: hue.colors[1] }}
            title={hue.label}
          />
        ))}
      </div>

      {value && (
        <div className="flex gap-1">
          {BASE_HUES.find((h) => h.colors.includes(value))?.colors.map((shade) => (
            <button
              key={shade}
              onClick={() => onChange(shade)}
              className={cn(
                "h-6 flex-1 rounded transition-all hover:scale-y-125",
                value === shade && "ring-2 ring-cb-foreground ring-offset-1 ring-offset-cb-surface-2",
              )}
              style={{ background: shade }}
            />
          )) ?? (
            BASE_HUES.flatMap((h) => h.colors)
              .filter((_, i) => i % 5 === 1)
              .slice(0, 5)
              .map((shade) => (
                <button
                  key={shade}
                  onClick={() => onChange(shade)}
                  className="h-6 flex-1 rounded transition-all hover:scale-y-125"
                  style={{ background: shade }}
                />
              ))
          )}
        </div>
      )}
    </div>
  )
}
