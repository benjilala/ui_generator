'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

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
      aria-label="Back"
      className={cn(
        'flex items-center px-4 h-12 bg-cb-surface-0 border-b border-cb-border',
        className,
      )}
    >
      <button
        type="button"
        onClick={handleBack}
        className={cn(
          'flex items-center gap-0.5 -ml-1 pl-1 pr-2 py-1 rounded-[var(--cb-radius-sm)]',
          'text-sm font-medium text-cb-foreground-muted hover:text-cb-foreground hover:bg-cb-surface-3',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-cb-surface-0',
        )}
        aria-label="Go back"
      >
        <ChevronLeft className="size-4 shrink-0 opacity-80" aria-hidden />
        Back
      </button>
    </nav>
  )
}
