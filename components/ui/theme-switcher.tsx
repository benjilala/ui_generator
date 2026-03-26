'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/providers/ThemeProvider'
import { cn } from '@/lib/utils'

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'cloudbet'

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'clean-slate-light' : 'cloudbet')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        isDark
          ? 'border-white/20 text-white hover:border-white/40 hover:bg-white/10'
          : 'border-cb-border text-cb-foreground hover:border-cb-border-visible hover:bg-cb-surface-3',
        className,
      )}
    >
      {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
      <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </Button>
  )
}
