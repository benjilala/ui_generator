'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/providers/ThemeProvider'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'cloudbet'

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'clean-slate-light' : 'cloudbet')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={isDark
        ? 'border-white/20 text-white hover:border-white/40 hover:bg-white/10'
        : 'border-cb-border text-cb-foreground hover:border-cb-border-visible hover:bg-cb-surface-3'
      }
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </Button>
  )
}
