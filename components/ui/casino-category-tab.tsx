"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── Variants ─────────────────────────────────────────────────────────────────

const casinoCategoryTabVariants = cva(
  [
    // Layout & shape
    "relative flex flex-col items-center justify-center gap-0",
    "w-[133px] h-[74px] rounded-[14px] border-2 overflow-hidden",
    "cursor-pointer select-none shrink-0",
    // Motion — card scale on press (Valhalla: group-active:scale-95)
    "group transition-all duration-200 ease-out active:scale-95",
    // Focus ring
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-cb-surface-1",
  ].join(" "),
  {
    variants: {
      active: {
        true:  "bg-cb-surface-2 border-cb-brand-purple",
        false: "bg-cb-surface-2 border-cb-border-subtle",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface CasinoCategoryTabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof casinoCategoryTabVariants> {
  label: string
  icon: React.ReactNode
  badge?: React.ReactNode
  active?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CasinoCategoryTab({
  label,
  icon,
  badge,
  active = false,
  className,
  ...props
}: CasinoCategoryTabProps) {
  return (
    <button
      role="tab"
      aria-selected={active}
      className={cn(casinoCategoryTabVariants({ active }), className)}
      {...props}
    >
      {/*
        Hover / press / active overlay layer — matches Valhalla exactly:
          inactive idle:   opacity-0
          inactive hover:  opacity-[0.06]  (subtle surface tint)
          inactive press:  opacity-[0.12]  (deeper press feedback)
          active:          bg-cb-primary opacity-[0.15] (brand tint, no hover variation)
      */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-all duration-300 ease-out",
          active
            ? "bg-cb-primary opacity-[0.15]"
            : "bg-cb-foreground opacity-0 group-hover:opacity-[0.06] group-active:opacity-[0.12]"
        )}
      />

      {/* Optional badge (e.g. Live chip) */}
      {badge && (
        <div className="absolute top-0 left-0 z-10">{badge}</div>
      )}

      {/*
        Icon — scale-110 on hover (Valhalla: group-hover:scale-110 duration-200 ease-out)
        Colour tokens applied via CSS custom properties
      */}
      <div
        className={cn(
          "relative z-10 size-6 transition-transform duration-200 ease-out group-hover:scale-110",
          active
            ? "[--icon-primary:var(--color-cb-brand-purple)] [--icon-secondary:color-mix(in_oklch,var(--color-cb-brand-purple)_55%,transparent)]"
            : "[--icon-primary:var(--color-cb-foreground-3)] [--icon-secondary:color-mix(in_oklch,var(--color-cb-foreground-3)_55%,transparent)]"
        )}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        className={cn(
          "relative z-10 mt-[5.75px] text-[14px] font-medium leading-[19.6px] whitespace-nowrap",
          active ? "text-cb-brand-purple" : "text-cb-foreground-3"
        )}
      >
        {label}
      </span>
    </button>
  )
}

// ─── Live badge sub-component ─────────────────────────────────────────────────

export function CasinoLiveBadge() {
  return (
    <div className="relative flex items-center gap-1 bg-cb-border-subtle rounded-br-[10.5px] rounded-tl-[14px] px-2 h-[18px]">
      {/* Pulse ring — Valhalla: animate-pulse on the outer ring */}
      <span className="absolute left-[5px] top-[4px] size-[10px] rounded-full bg-cb-brand-purple/50 animate-pulse" />
      {/* Solid dot */}
      <span className="relative size-[7px] rounded-full bg-cb-brand-purple shrink-0" />
      <span className="text-[11px] font-medium text-cb-foreground-2 leading-none">Live</span>
    </div>
  )
}

export { casinoCategoryTabVariants }
