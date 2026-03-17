"use client"

import { useTheme, THEMES } from "@/components/providers/ThemeProvider"

export function ThemeLogo({ className }: { className?: string }) {
  const { theme } = useTheme()
  const isLight = THEMES.find((t) => t.id === theme)?.isLight
  const src = isLight ? "/cloudbet-logo-dark.png" : "/cloudbet-logo.png"

  return <img src={src} alt="Cloudbet" className={className} />
}
