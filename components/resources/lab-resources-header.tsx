'use client'

import { Download } from 'lucide-react'

import { LabPageHeader } from '@/components/patterns/lab-page-header'
import { THEMES, useTheme } from '@/components/providers/ThemeProvider'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { cn } from '@/lib/utils'

export function LabResourcesHeader() {
  const { theme } = useTheme()
  const isLight = THEMES.find((t) => t.id === theme)?.isLight ?? false

  return (
    <LabPageHeader
      title="Resource hub"
      trailing={
        <>
          <a
            href="/api/lab-download-all"
            download
            className={cn(
              'inline-flex h-9 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors no-underline',
              isLight
                ? 'bg-[#E8E4F0] text-[#4a3d6b] hover:bg-[#ddd8eb]'
                : 'bg-[#25212B] text-[#BFAFF2] hover:bg-[#2d2835]',
            )}
          >
            <Download className="size-4 shrink-0" strokeWidth={1.75} />
            Download all
          </a>
          <ThemeSwitcher />
        </>
      }
    />
  )
}
