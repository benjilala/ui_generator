'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const NAV_ITEMS = [
  { href: '/casino', label: 'Casino', status: 'active' as const },
  { href: '/sportsbook', label: 'Sportsbook', status: 'placeholder' as const },
  { href: '/vip', label: 'VIP', status: 'placeholder' as const },
  { href: '/experiments', label: 'Experiments', status: 'placeholder' as const },
]

export function LabNav({ className }: { className?: string }) {
  const router = useRouter()

  function handleBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <nav
      aria-label="Lab navigation"
      className={cn(
        'flex items-center gap-1 px-4 h-12 bg-cb-surface-0 border-b border-cb-border',
        className,
      )}
    >
      <button
        type="button"
        onClick={handleBack}
        className={cn(
          'flex items-center gap-0.5 mr-4 -ml-1 pl-1 pr-2 py-1 rounded-[var(--cb-radius-sm)]',
          'text-sm font-medium text-cb-foreground-muted hover:text-cb-foreground hover:bg-cb-surface-3',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-cb-surface-0',
        )}
        aria-label="Go back"
      >
        <ChevronLeft className="size-4 shrink-0 opacity-80" aria-hidden />
        Back
      </button>

      <Separator orientation="vertical" className="h-4 bg-cb-border mx-1" />

      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1 rounded-[var(--cb-radius-sm)] text-sm transition-colors',
            item.status === 'active'
              ? 'text-cb-foreground hover:bg-cb-surface-3'
              : 'text-cb-foreground-muted hover:text-cb-foreground hover:bg-cb-surface-3',
          )}
        >
          {item.label}
          {item.status === 'placeholder' && (
            <span className="text-[9px] rounded px-1 py-0.5 bg-cb-surface-4 text-cb-foreground-disabled uppercase tracking-wider">
              soon
            </span>
          )}
        </Link>
      ))}
    </nav>
  )
}
