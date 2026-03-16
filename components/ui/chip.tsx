import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// CDS Chip — Cloudbet Design System (Figma, 2026-03-16)
// Standalone pill chip for filters, categories, tags, and multi-select groups.
// States: Enabled, Hovered, Pressed, Selected, Disabled, Skeleton
// Icon types: System icon (left), Secondary icon (left), Others (right)
// Sizes: Default (h-[35px]), Transition (h-[30px] — compact variant)
const chipVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer select-none items-center gap-1.5 rounded-full",
    "border border-transparent px-3 font-medium leading-none",
    "transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cb-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        // Default — surface-3 bg, muted text; selected = lime border + accent text
        default:
          "bg-[var(--cb-surface-3)] text-[var(--cb-foreground-muted)] hover:bg-[var(--cb-surface-4)] hover:text-[var(--cb-foreground)] active:scale-95 data-[selected=true]:border-[var(--cb-accent)] data-[selected=true]:bg-[var(--cb-accent)]/10 data-[selected=true]:text-[var(--cb-accent)]",
        // Filled — solid accent bg when selected (e.g. category filter chips)
        filled:
          "bg-[var(--cb-surface-3)] text-[var(--cb-foreground-muted)] hover:bg-[var(--cb-surface-4)] hover:text-[var(--cb-foreground)] active:scale-95 data-[selected=true]:bg-[var(--cb-accent)] data-[selected=true]:text-black data-[selected=true]:border-transparent",
        // Outline — always bordered, lime when selected
        outline:
          "border-[var(--cb-border-visible)] bg-transparent text-[var(--cb-foreground-muted)] hover:border-[var(--cb-foreground-muted)] hover:text-[var(--cb-foreground)] active:scale-95 data-[selected=true]:border-[var(--cb-accent)] data-[selected=true]:text-[var(--cb-accent)]",
      },
      size: {
        default: "h-[35px] text-[13px]",
        sm:      "h-[30px] px-2.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ChipProps
  extends Omit<React.ComponentProps<"button">, "children">,
    VariantProps<typeof chipVariants> {
  selected?: boolean
  // Icon shown to the left of the label
  icon?: React.ReactNode
  // Icon shown to the right of the label (CDS "Others" icon type)
  trailingIcon?: React.ReactNode
  children: React.ReactNode
}

function Chip({
  className,
  variant,
  size,
  selected = false,
  icon,
  trailingIcon,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      data-slot="chip"
      data-selected={selected}
      type="button"
      aria-pressed={selected}
      className={cn(chipVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <span className="shrink-0 [&_svg]:size-4">{icon}</span>}
      <span>{children}</span>
      {trailingIcon && <span className="shrink-0 [&_svg]:size-3.5">{trailingIcon}</span>}
    </button>
  )
}

// Convenience skeleton placeholder matching CDS chip skeleton state
function ChipSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="chip-skeleton"
      className={cn(
        "h-[35px] w-20 animate-pulse rounded-full bg-[var(--cb-surface-3)]",
        className
      )}
    />
  )
}

export { Chip, ChipSkeleton, chipVariants }
