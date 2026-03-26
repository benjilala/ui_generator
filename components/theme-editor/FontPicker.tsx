"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FontOption {
  label: string
  value: string
  category: "sans" | "serif" | "mono" | "display"
  googleFamily?: string
}

const FONT_OPTIONS: FontOption[] = [
  { label: "Inter", value: "Inter, sans-serif", category: "sans", googleFamily: "Inter" },
  { label: "Geist", value: "Geist, sans-serif", category: "sans", googleFamily: "Geist" },
  { label: "Roboto", value: "Roboto, sans-serif", category: "sans", googleFamily: "Roboto" },
  { label: "Open Sans", value: "Open Sans, sans-serif", category: "sans", googleFamily: "Open+Sans" },
  { label: "Lato", value: "Lato, sans-serif", category: "sans", googleFamily: "Lato" },
  { label: "Montserrat", value: "Montserrat, sans-serif", category: "sans", googleFamily: "Montserrat" },
  { label: "DM Sans", value: "DM Sans, sans-serif", category: "sans", googleFamily: "DM+Sans" },
  { label: "Merriweather", value: "Merriweather, serif", category: "serif", googleFamily: "Merriweather" },
  { label: "Source Serif 4", value: "Source Serif 4, serif", category: "serif", googleFamily: "Source+Serif+4" },
  { label: "Playfair Display", value: "Playfair Display, serif", category: "display", googleFamily: "Playfair+Display" },
  { label: "Space Grotesk", value: "Space Grotesk, sans-serif", category: "display", googleFamily: "Space+Grotesk" },
  { label: "JetBrains Mono", value: "JetBrains Mono, monospace", category: "mono", googleFamily: "JetBrains+Mono" },
  { label: "IBM Plex Mono", value: "IBM Plex Mono, monospace", category: "mono", googleFamily: "IBM+Plex+Mono" },
  { label: "Fira Code", value: "Fira Code, monospace", category: "mono", googleFamily: "Fira+Code" },
]

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "sans", label: "Sans" },
  { id: "serif", label: "Serif" },
  { id: "display", label: "Display" },
  { id: "mono", label: "Mono" },
] as const

const loadedFonts = new Set<string>()

function loadGoogleFont(family: string) {
  if (loadedFonts.has(family)) return
  loadedFonts.add(family)

  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = `https://fonts.googleapis.com/css2?family=${family}:wght@400;500;600;700&display=swap`
  document.head.appendChild(link)
}

interface FontPickerProps {
  value?: string
  onChange: (font: string) => void
  label: string
}

export function FontPicker({ value, onChange, label }: FontPickerProps) {
  const [category, setCategory] = React.useState<string>("all")

  React.useEffect(() => {
    FONT_OPTIONS.forEach((f) => {
      if (f.googleFamily) loadGoogleFont(f.googleFamily)
    })
  }, [])

  const filtered = category === "all"
    ? FONT_OPTIONS
    : FONT_OPTIONS.filter((f) => f.category === category)

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium text-cb-foreground">{label}</span>

      <div className="flex gap-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={cn(
              "text-[10px] px-2 py-1 rounded transition-colors",
              category === cat.id
                ? "bg-cb-primary text-cb-primary-fg font-semibold"
                : "text-cb-foreground-muted hover:text-cb-foreground hover:bg-cb-surface-4",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col max-h-48 overflow-y-auto rounded-[var(--cb-radius-md)] border border-cb-border bg-cb-surface-2">
        {filtered.map((font) => {
          const isActive = value === font.value
          return (
            <button
              key={font.value}
              onClick={() => onChange(font.value)}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 text-left transition-colors border-b border-cb-border-subtle last:border-0",
                isActive
                  ? "bg-cb-primary/10 text-cb-foreground"
                  : "hover:bg-cb-surface-3 text-cb-foreground-muted",
              )}
            >
              <span className="text-sm" style={{ fontFamily: font.value }}>{font.label}</span>
              {isActive && <span className="text-cb-purple-50 text-xs">&#10003;</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
