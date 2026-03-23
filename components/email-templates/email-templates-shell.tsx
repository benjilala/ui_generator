'use client'

import * as React from 'react'
import { LabNav } from '@/components/patterns/LabNav'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import { EmailTemplatePreviewFrame } from '@/components/email-templates/email-template-preview-chrome'
import { THEMES, useTheme } from '@/components/providers/ThemeProvider'
import { buildGameRecEmailHtml } from '@/lib/email-templates/build-game-rec-email-html'
import type { GameRecEmailExportTheme } from '@/lib/email-templates/build-game-rec-email-html'

const WIDTH_DESKTOP = 600
const WIDTH_MOBILE = 390
const WIDTH_MIN = 320
const WIDTH_MAX = 640

type PreviewMode = 'desktop' | 'mobile' | 'custom'

export function EmailTemplatesShell() {
  const { theme } = useTheme()
  const [mode, setMode] = React.useState<PreviewMode>('desktop')
  const [customWidth, setCustomWidth] = React.useState(480)

  const frameWidth =
    mode === 'desktop'
      ? WIDTH_DESKTOP
      : mode === 'mobile'
        ? WIDTH_MOBILE
        : customWidth

  function handleMode(next: string) {
    if (next === 'desktop' || next === 'mobile' || next === 'custom') {
      setMode(next)
    }
  }

  function exportThemeForHtml(): GameRecEmailExportTheme {
    return THEMES.find((t) => t.id === theme)?.isLight ? 'light' : 'dark'
  }

  function handleExportHtml() {
    const variant = exportThemeForHtml()
    const origin =
      typeof window !== 'undefined' ? window.location.origin : ''
    const html = buildGameRecEmailHtml({
      assetBaseUrl: origin || 'https://www.cloudbet.com',
      theme: variant,
    })
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cloudbet-game-rec-email-${variant}.html`
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-screen flex-col bg-cb-surface-1">
      <header className="sticky top-0 z-40 flex h-12 min-h-12 shrink-0 items-stretch gap-1 border-b border-cb-border bg-cb-surface-0 sm:gap-2">
        <LabNav className="h-auto min-h-12 shrink-0 border-0 px-2 sm:px-3" />
        <div className="flex min-h-12 min-w-0 flex-1 items-center gap-2 overflow-x-auto px-1 py-1 sm:gap-3 sm:px-2">
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            spacing={0}
            value={mode}
            onValueChange={(v) => v && handleMode(v)}
            aria-label="Email preview size"
            className="w-fit shrink-0"
          >
            <ToggleGroupItem
              value="desktop"
              aria-label={`Desktop preview, ${WIDTH_DESKTOP} pixels wide`}
            >
              Desktop
            </ToggleGroupItem>
            <ToggleGroupItem
              value="mobile"
              aria-label={`Mobile preview, ${WIDTH_MOBILE} pixels wide`}
            >
              Mobile
            </ToggleGroupItem>
            <ToggleGroupItem
              value="custom"
              aria-label="Custom width, adjust with slider"
            >
              Custom
            </ToggleGroupItem>
          </ToggleGroup>
          {mode === 'custom' && (
            <div className="flex min-w-0 max-w-[min(220px,40vw)] shrink-0 items-center gap-2 sm:max-w-[260px]">
              <label
                htmlFor="email-preview-width"
                className="sr-only"
              >
                Frame width ({frameWidth} pixels)
              </label>
              <span
                className="hidden tabular-nums text-xs text-cb-foreground-muted sm:inline"
                aria-hidden
              >
                {frameWidth}px
              </span>
              <input
                id="email-preview-width"
                type="range"
                min={WIDTH_MIN}
                max={WIDTH_MAX}
                value={customWidth}
                onChange={(e) => setCustomWidth(Number(e.target.value))}
                className="h-2 min-w-[72px] flex-1 cursor-pointer appearance-none rounded-full bg-cb-surface-3 accent-[var(--cb-primary)]"
                aria-valuemin={WIDTH_MIN}
                aria-valuemax={WIDTH_MAX}
                aria-valuenow={customWidth}
                aria-valuetext={`${frameWidth} pixels wide`}
              />
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2 pr-2 sm:pr-3">
          <Button
            type="button"
            variant="default"
            size="sm"
            className="whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleExportHtml}
          >
            Export HTML
          </Button>
          <ThemeSwitcher />
        </div>
      </header>
      <main className="flex-1">
        <EmailTemplatePreviewFrame frameWidth={frameWidth} />
      </main>
    </div>
  )
}
