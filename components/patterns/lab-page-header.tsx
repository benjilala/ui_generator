'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

import { CloudbetBrandmark } from '@/components/cloudbet/CloudbetBrandmark'
import { cn } from '@/lib/utils'

export type LabPageHeaderSurface = 'default' | 'home'

export interface LabPageHeaderProps {
  title: React.ReactNode
  surface?: LabPageHeaderSurface
  trailing?: React.ReactNode
  toolbar?: React.ReactNode
  className?: string
}

const BACK_SPRING = { type: 'spring', stiffness: 500, damping: 35, mass: 0.6 } as const

export function LabPageHeader({
  title,
  surface = 'default',
  trailing,
  toolbar,
  className,
}: LabPageHeaderProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (surface === 'home') {
    return (
      <header
        className={cn(
          'sticky top-0 z-40 border-b border-cb-border bg-cb-surface-1 dark:border-[#262626] dark:bg-[#1A1A1A]',
          className,
        )}
      >
        <div className="mx-auto flex h-12 w-full max-w-screen-xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-sm outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-cb-surface-1 dark:focus-visible:ring-offset-[#1A1A1A]"
            aria-label="Cloudbet UI Lab home"
          >
            <CloudbetBrandmark
              variant="mono"
              className="text-cb-foreground dark:text-[#E0E0E0]"
            />
            <div className="flex items-center gap-2 leading-none">{title}</div>
          </Link>
          <div className="min-w-0 flex-1" aria-hidden />
          {trailing != null && trailing !== false ? (
            <div className="flex shrink-0 items-center justify-end">{trailing}</div>
          ) : null}
        </div>
      </header>
    )
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-cb-border bg-cb-surface-0/90 backdrop-blur-sm',
        className,
      )}
    >
      <div className="mx-auto flex h-12 w-full max-w-screen-xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <AnimatePresence initial={false}>
            {!isHome ? (
              <motion.div
                key="back"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={BACK_SPRING}
                className="overflow-hidden"
              >
                <Link
                  href="/"
                  className="mr-1 flex size-7 items-center justify-center rounded-full bg-cb-primary/15 text-cb-purple-50 transition-colors hover:bg-cb-primary/25"
                  aria-label="Back to Lab home"
                >
                  <ArrowLeft className="size-3.5" strokeWidth={2.25} />
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-sm outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-cb-surface-0"
            aria-label="Cloudbet UI Lab home"
          >
            <CloudbetBrandmark variant="mono" />
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-cb-foreground">
          {title}
        </div>
        {toolbar != null && toolbar !== false ? (
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-1 sm:gap-3">
            {toolbar}
          </div>
        ) : (
          <div className="min-w-0 flex-1" aria-hidden />
        )}
        {trailing != null && trailing !== false ? (
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
            {trailing}
          </div>
        ) : null}
      </div>
    </header>
  )
}
