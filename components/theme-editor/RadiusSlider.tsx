"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const RADIUS_PRESETS = [
  { label: "None", value: "0" },
  { label: "Sm", value: "0.25rem" },
  { label: "Md", value: "0.375rem" },
  { label: "Lg", value: "0.5rem" },
  { label: "XL", value: "0.75rem" },
  { label: "2XL", value: "1rem" },
  { label: "Full", value: "9999px" },
]

interface RadiusSliderProps {
  value?: string
  onChange: (radius: string) => void
}

export function RadiusSlider({ value, onChange }: RadiusSliderProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium text-cb-foreground">Border radius</span>
      <div className="flex gap-2">
        {RADIUS_PRESETS.map((preset) => {
          const isActive = value === preset.value
          return (
            <button
              key={preset.value}
              onClick={() => onChange(preset.value)}
              className={cn(
                "flex flex-col items-center gap-1.5 flex-1 py-2 px-1 rounded transition-colors",
                isActive
                  ? "bg-cb-primary/10 text-cb-foreground"
                  : "text-cb-foreground-muted hover:bg-cb-surface-3 hover:text-cb-foreground",
              )}
            >
              <div
                className={cn(
                  "size-8 border-2 transition-all",
                  isActive ? "border-cb-brand-purple bg-cb-brand-purple/20" : "border-cb-border bg-cb-surface-3",
                )}
                style={{ borderRadius: preset.value === "9999px" ? "9999px" : preset.value }}
              />
              <span className="text-[9px] font-medium">{preset.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
