'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export type CloudbetBrandmarkVariant = 'gradient' | 'mono'

function BrandmarkMono({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 20"
      fill="none"
      className={cn('h-5 w-10 shrink-0 text-cb-foreground', className)}
      aria-hidden
    >
      <path
        d="M3.5 2.5C6.5 10 6.5 10 3.5 17.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M9 2.5C12 10 12 10 9 17.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M20 2.5V17.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M33.5 17.5C30.5 10 30.5 10 33.5 2.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CloudbetBrandmark({
  className,
  variant = 'gradient',
}: {
  className?: string
  variant?: CloudbetBrandmarkVariant
}) {
  const gradId = React.useId().replace(/:/g, '')

  if (variant === 'mono') {
    return <BrandmarkMono className={className} />
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="5 3 19 24"
      fill="none"
      className={cn('h-5 w-[1.125rem] shrink-0', className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={`cb-bm-${gradId}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DFFD51" />
          <stop offset="100%" stopColor="#A8F060" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#cb-bm-${gradId})`}
        d="M14 4 L6 7.5 L6 16 C6 20.5 9.5 24.5 14 26 C18.5 24.5 22 20.5 22 16 L22 7.5 Z"
      />
      <path
        fill="#0D0B12"
        d="M14 9 C11.5 9 9.5 11 9.5 13.5 C9.5 16 11.5 18 14 18 C15.4 18 16.6 17.4 17.4 16.4 L15.6 15.2 C15.1 15.7 14.6 16 14 16 C12.6 16 11.5 14.9 11.5 13.5 C11.5 12.1 12.6 11 14 11 C14.6 11 15.1 11.3 15.6 11.8 L17.4 10.6 C16.6 9.6 15.4 9 14 9 Z"
      />
    </svg>
  )
}
