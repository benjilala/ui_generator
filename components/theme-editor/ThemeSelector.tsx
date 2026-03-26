"use client"

import * as React from "react"
import { useTheme, THEMES, type ThemeId } from "@/components/providers/ThemeProvider"
import { cn } from "@/lib/utils"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium text-cb-foreground">Base theme</span>
      <div className="grid grid-cols-2 gap-2">
        {THEMES.map((t) => {
          const isActive = theme === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as ThemeId)}
              className={cn(
                "group flex items-center gap-3 rounded-[var(--cb-radius-md)] border p-3 text-left transition-all",
                isActive
                  ? "border-cb-brand-purple bg-cb-surface-3 shadow-[0_0_0_1px_var(--cb-brand-purple)]"
                  : "border-cb-border bg-cb-surface-2 hover:border-cb-border-visible hover:bg-cb-surface-3",
              )}
            >
              <div className="flex gap-1 shrink-0">
                {t.swatches.map((color, i) => (
                  <div
                    key={i}
                    className="size-5 rounded-full border border-black/10"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-cb-foreground truncate">{t.label}</div>
                <div className="text-[9px] text-cb-foreground-disabled truncate">{t.isLight ? "Light" : "Dark"}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
