"use client"

import * as React from "react"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * OddsButton — matches Valhalla OddsButtonV3 / OddsButtonUI
 *
 * Layout rules (keep in sync with competition-card.tsx):
 *   Wrapper:  w-full flex-1 flex justify-center
 *   Button:   w-full h-full min-h-11 rounded-xl border py-1 px-0.5
 *   Inner:    mx-auto → flex flex-col items-center justify-center
 *   Label:    text-sm font-medium text-cb-foreground  (optional — omit when header provides context)
 *   Value:    h-7 flex items-center justify-center → text-sm font-medium text-cb-accent
 *
 * States:
 *   default   — border-transparent
 *   selected  — border-cb-primary
 *   suspended — lock icon, no button interaction
 *   closed    — blank space (no icon)
 *   trend up  — value text-cb-success
 *   trend down — value text-cb-danger
 */

export type OddsDirection = "up" | "down" | null

export interface OddsButtonProps
  extends Omit<React.ComponentProps<"button">, "children"> {
  /** Odds value e.g. "2.45" */
  odds: string
  /** Optional line label shown above the value. Omit when the market header already names the outcome. */
  label?: string
  /** Whether this selection is currently in the bet slip */
  selected?: boolean
  /** Market is temporarily suspended — shows lock icon */
  suspended?: boolean
  /** Market is closed (post-match) — shows blank space */
  closed?: boolean
  /** Flash direction when odds change */
  trend?: OddsDirection
}

export function OddsButton({
  className,
  label,
  odds,
  selected = false,
  suspended = false,
  closed = false,
  trend = null,
  disabled,
  onClick,
  ...props
}: OddsButtonProps) {
  if (closed) {
    return (
      <div className={cn("w-full flex-1 flex justify-center", className)}>
        <div className="w-full h-full min-h-11" />
      </div>
    )
  }

  if (suspended) {
    return (
      <div className={cn("w-full flex-1 flex justify-center", className)}>
        <div className="w-full h-full min-h-11 flex items-center justify-center">
          <Lock className="size-[18px] text-cb-foreground-disabled" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full flex-1 flex justify-center", className)}>
      <button
        data-slot="odds-button"
        data-state={selected ? "selected" : "default"}
        type="button"
        disabled={disabled}
        aria-pressed={selected}
        onClick={onClick}
        className={cn(
          "w-full h-full min-h-11 rounded-xl border",
          "py-1 px-0.5",
          "transition-colors duration-300 ease-in-out select-none cursor-pointer",
          "hover:bg-cb-primary/[0.08] active:bg-cb-primary/[0.16]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-primary focus-visible:ring-offset-1 focus-visible:ring-offset-cb-surface-2",
          selected ? "border-cb-primary" : "border-transparent",
          disabled && "pointer-events-none opacity-40",
        )}
        {...props}
      >
        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center font-medium">
            {label && (
              <span className="text-sm font-medium text-cb-foreground leading-none text-center">
                {label}
              </span>
            )}
            <div className="h-7 flex items-center justify-center">
              <span
                className={cn(
                  "text-sm font-medium text-cb-accent leading-none tabular-nums",
                  trend === "up" && "text-cb-success",
                  trend === "down" && "text-cb-danger",
                )}
              >
                {odds}
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}

// Kept for backwards compatibility — no longer needed since flash is handled via trend prop + text colour
export function OddsButtonStyles() {
  return null
}
