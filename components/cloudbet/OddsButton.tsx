"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// CDS Odds Button — Cloudbet Design System (Figma, 2026-03-16)
// Sports-specific bet-selection button displaying a market label + odds value.
// Flash states animate when odds change:
//   up   — green flash (#55A370 / --cb-odds-up)
//   down — red flash   (#E35F5D / --cb-odds-down)
// States: Default, Hovered, Selected, Suspended, Disabled
const oddsButtonVariants = cva(
  [
    "group/odds relative inline-flex flex-col items-center justify-center gap-0.5",
    "min-w-[64px] rounded-xl border px-3 py-2",
    "cursor-pointer select-none transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cb-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
    "active:scale-95",
  ].join(" "),
  {
    variants: {
      state: {
        default:
          "border-[var(--cb-border-visible)] bg-[var(--cb-surface-3)] text-[var(--cb-foreground)] hover:border-[var(--cb-accent)]/40 hover:bg-[var(--cb-surface-4)]",
        selected:
          "border-[var(--cb-accent)] bg-[var(--cb-accent)]/10 text-[var(--cb-accent)]",
        suspended:
          "cursor-not-allowed border-[var(--cb-border-subtle)] bg-[var(--cb-surface-2)] text-[var(--cb-foreground-disabled)]",
        disabled:
          "pointer-events-none cursor-not-allowed border-[var(--cb-border-subtle)] bg-[var(--cb-surface-2)] opacity-40",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
)

export type OddsDirection = "up" | "down" | null

export interface OddsButtonProps
  extends Omit<React.ComponentProps<"button">, "children"> {
  // Market label (e.g. "Home", "Draw", "Over 2.5")
  label: string
  // Formatted odds value (e.g. "2.45", "1/2", "-110")
  odds: string
  // Whether this selection is currently in the bet slip
  selected?: boolean
  // Whether the market is temporarily suspended
  suspended?: boolean
  // Flash direction when odds change — triggers a brief colour animation
  flashDirection?: OddsDirection
}

export function OddsButton({
  className,
  label,
  odds,
  selected = false,
  suspended = false,
  flashDirection = null,
  disabled,
  onClick,
  ...props
}: OddsButtonProps) {
  const [flash, setFlash] = React.useState<OddsDirection>(null)
  const prevOdds = React.useRef(odds)

  // Trigger flash animation when odds value changes externally
  React.useEffect(() => {
    if (odds !== prevOdds.current && flashDirection) {
      setFlash(flashDirection)
      const t = setTimeout(() => setFlash(null), 700)
      prevOdds.current = odds
      return () => clearTimeout(t)
    }
    prevOdds.current = odds
  }, [odds, flashDirection])

  const resolvedState = disabled
    ? "disabled"
    : suspended
    ? "suspended"
    : selected
    ? "selected"
    : "default"

  return (
    <button
      data-slot="odds-button"
      data-state={resolvedState}
      data-flash={flash ?? undefined}
      type="button"
      disabled={disabled || suspended}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        oddsButtonVariants({ state: resolvedState }),
        // Flash overlays — brief bg tint using keyframe animation
        flash === "up" && "animate-[oddsUp_700ms_ease-out]",
        flash === "down" && "animate-[oddsDown_700ms_ease-out]",
        className
      )}
      {...props}
    >
      <span className="text-[11px] font-medium leading-none text-[var(--cb-foreground-muted)] group-data-[state=selected]/odds:text-[var(--cb-accent)]/70">
        {suspended ? "Suspended" : label}
      </span>
      <span
        className={cn(
          "text-[13.5px] font-bold leading-none tabular-nums",
          flash === "up" && "text-[var(--cb-odds-up)]",
          flash === "down" && "text-[var(--cb-odds-down)]"
        )}
      >
        {odds}
      </span>
    </button>
  )
}

// Flash keyframes are injected as a global style so they work without Tailwind config changes.
// In production these would live in design-system.css.
export function OddsButtonStyles() {
  return (
    <style>{`
      @keyframes oddsUp {
        0%   { background-color: var(--cb-odds-up-bg); }
        100% { background-color: transparent; }
      }
      @keyframes oddsDown {
        0%   { background-color: var(--cb-odds-down-bg); }
        100% { background-color: transparent; }
      }
    `}</style>
  )
}
