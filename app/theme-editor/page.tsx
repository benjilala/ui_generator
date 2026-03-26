"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"
import { useTheme } from "@/components/providers/ThemeProvider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LabPageHeader } from "@/components/patterns/lab-page-header"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeSelector } from "@/components/theme-editor/ThemeSelector"
import { ColourPalette } from "@/components/theme-editor/ColourPalette"
import { FontPicker } from "@/components/theme-editor/FontPicker"
import { RadiusSlider } from "@/components/theme-editor/RadiusSlider"
import { ThemePreview } from "@/components/theme-editor/ThemePreview"
import { ExportDialog } from "@/components/theme-editor/ExportDialog"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"

export default function ThemeEditorPage() {
  const { overrides, setOverrides, resetOverrides } = useTheme()

  const hasOverrides = Object.values(overrides).some(Boolean)

  function updateOverride(key: string, value: string) {
    setOverrides({ ...overrides, [key]: value })
  }

  return (
    <div className="min-h-screen bg-cb-surface-1">
      <LabPageHeader
        title="Theme Editor"
        trailing={
          <>
            <ThemeSwitcher />
            <Badge
              variant="outline"
              className="border-cb-border text-cb-foreground-disabled text-[9px] uppercase tracking-wider"
            >
              Experimental
            </Badge>
          </>
        }
      />

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* ── Left: Editor sidebar ── */}
          <aside className="w-80 shrink-0 sticky top-20 self-start">
            <ScrollArea className="h-[calc(100vh-6rem)]">
              <div className="flex flex-col gap-8 pr-4 pb-8">

                {/* Base theme */}
                <ThemeSelector />

                <Separator className="bg-cb-border" />

                {/* Primary colour */}
                <ColourPalette
                  label="Primary colour"
                  value={overrides.primary}
                  onChange={(c) => updateOverride("primary", c)}
                />

                <Separator className="bg-cb-border" />

                {/* Accent colour */}
                <ColourPalette
                  label="Accent colour"
                  value={overrides.accent}
                  onChange={(c) => updateOverride("accent", c)}
                />

                <Separator className="bg-cb-border" />

                {/* Font */}
                <FontPicker
                  label="Font family"
                  value={overrides.fontSans}
                  onChange={(f) => updateOverride("fontSans", f)}
                />

                <Separator className="bg-cb-border" />

                {/* Radius */}
                <RadiusSlider
                  value={overrides.radius}
                  onChange={(r) => updateOverride("radius", r)}
                />

                <Separator className="bg-cb-border" />

                {/* Actions */}
                <div className="flex gap-2">
                  <ExportDialog />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetOverrides}
                    disabled={!hasOverrides}
                  >
                    <RotateCcw className="size-3.5" />
                    Reset
                  </Button>
                </div>

              </div>
            </ScrollArea>
          </aside>

          {/* ── Right: Live preview ── */}
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-lg font-semibold text-cb-foreground">Live preview</h1>
              <p className="text-xs text-cb-foreground-muted mt-1">
                Changes are applied in real time. Use the sidebar controls to customise the active theme,
                then export the CSS overrides when you&apos;re happy.
              </p>
            </div>

            <ThemePreview />
          </main>
        </div>
      </div>
    </div>
  )
}
