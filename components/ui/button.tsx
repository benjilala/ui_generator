import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// CDS CTA Button — Cloudbet Design System (Figma, 2026-03-16)
// default     = CDS Primary   — lime fill (#DFFD51), black text
// outline     = CDS Secondary — lime border + text, transparent bg
// secondary   = CDS Tertiary  — surface-2 fill (#26202B), light-purple text (#CCA6FF)
// destructive = CDS Danger    — error red fill (#E35F5D), dark text
// Shape: rounded-full (pill). Pressed: scale-95. Focus: white ring offset.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full font-bold text-[13.5px] leading-[1.2] whitespace-nowrap transition-all duration-150 ease-out outline-none select-none active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:bg-[var(--cb-foreground-disabled)] disabled:text-[var(--cb-foreground-disabled)] disabled:border-0 disabled:opacity-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        // CDS Primary — lime fill, black text
        default:
          "bg-accent text-accent-foreground hover:bg-accent/90",

        // CDS Secondary — lime border + text, transparent bg; hover adds 8% lime fill
        outline:
          "border-2 border-accent text-accent bg-transparent hover:bg-accent/10",

        // CDS Tertiary — surface-2 bg, light-purple (on-tertiary-1) text
        secondary:
          "bg-[var(--cb-surface-2)] text-[var(--cb-icon-default)] hover:bg-[var(--cb-surface-3)]",

        // Danger — error red fill, dark on-error text
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        // Ghost / link — utility variants not in CDS spec
        ghost:
          "hover:bg-muted hover:text-foreground",
        link:
          "text-accent underline-offset-4 hover:underline",
      },
      size: {
        // Heights from CDS: sm=31.5px, md=42px, lg=70px
        sm:        "h-8 px-[15px]",
        default:   "h-[42px] px-[15px]",
        lg:        "h-[70px] px-[15px] text-base",
        icon:      "size-[42px]",
        "icon-sm": "size-8",
        "icon-lg": "size-[70px]",
        // Legacy shadcn sizes kept for compatibility
        xs:        "h-6 gap-1 rounded-full px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Spinner shown during isLoading state — matches CDS "Loading - Spinner" variant
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  isLoading = false,
  supportingText,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    // CDS "Loading - Spinner" state — replaces label with spinner, disables interaction
    isLoading?: boolean
    // CDS Medium size optional sub-label below the main label
    supportingText?: React.ReactNode
  }) {
  const Comp = asChild ? Slot.Root : "button"
  const isDisabled = disabled || isLoading

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(
        buttonVariants({ variant, size }),
        supportingText && "flex-col gap-0",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Spinner className="size-5" />
      ) : supportingText ? (
        <span className="flex flex-col items-center gap-0.5 leading-none">
          <span>{children}</span>
          <span className="text-[11px] font-normal opacity-70 leading-none">{supportingText}</span>
        </span>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
