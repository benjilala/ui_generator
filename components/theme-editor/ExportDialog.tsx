"use client"

import * as React from "react"
import { useTheme, THEMES, type ThemeOverrides } from "@/components/providers/ThemeProvider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Download, Copy, Check } from "lucide-react"

function generateCss(themeId: string, overrides: ThemeOverrides): string {
  const lines: string[] = []
  lines.push(`/* Theme overrides for "${themeId}" */`)
  lines.push(`:root {`)

  if (overrides.primary) {
    lines.push(`  --primary: ${overrides.primary};`)
    lines.push(`  --ring: ${overrides.primary};`)
  }
  if (overrides.accent) {
    lines.push(`  --accent: ${overrides.accent};`)
  }
  if (overrides.fontSans) {
    lines.push(`  --font-sans: ${overrides.fontSans};`)
  }
  if (overrides.fontMono) {
    lines.push(`  --font-mono: ${overrides.fontMono};`)
  }
  if (overrides.radius) {
    lines.push(`  --radius: ${overrides.radius};`)
  }

  lines.push(`}`)
  return lines.join("\n")
}

export function ExportDialog() {
  const { theme, overrides } = useTheme()
  const [copied, setCopied] = React.useState(false)

  const currentTheme = THEMES.find((t) => t.id === theme)
  const hasOverrides = Object.values(overrides).some(Boolean)
  const cssOutput = generateCss(currentTheme?.label ?? theme, overrides)

  async function handleCopy() {
    await navigator.clipboard.writeText(cssOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={!hasOverrides}>
          <Download className="size-3.5" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export theme</DialogTitle>
          <DialogDescription>
            Copy the generated CSS overrides for the current theme.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="relative">
          <pre className="text-xs font-mono bg-cb-surface-2 border border-cb-border rounded-[var(--cb-radius-md)] p-4 overflow-auto max-h-64 text-cb-foreground-muted">
            {hasOverrides ? cssOutput : "No overrides to export."}
          </pre>
          {hasOverrides && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="absolute top-2 right-2"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
