import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// CDS Alert Banner — Cloudbet Design System (Figma, 2026-03-16)
// Used as inline notice banners throughout the CDS component docs.
// Variants map to the four CDS semantic feedback roles:
//   info    — #6981FA blue  (--cb-info)
//   success — #55A370 green (--cb-success)
//   warning — #B28809 amber (--cb-warning)
//   error   — #E35F5D red   (--cb-error)
const alertVariants = cva(
  "relative flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        info:
          "border-[var(--cb-info)]/30 bg-[var(--cb-info)]/10 text-[var(--cb-info)] [&_[data-slot=alert-description]]:text-[var(--cb-info)]/80",
        success:
          "border-[var(--cb-success)]/30 bg-[var(--cb-success)]/10 text-[var(--cb-success)] [&_[data-slot=alert-description]]:text-[var(--cb-success)]/80",
        warning:
          "border-[var(--cb-warning)]/30 bg-[var(--cb-warning)]/10 text-[var(--cb-warning)] [&_[data-slot=alert-description]]:text-[var(--cb-warning)]/80",
        error:
          "border-[var(--cb-error)]/30 bg-[var(--cb-error)]/10 text-[var(--cb-error)] [&_[data-slot=alert-description]]:text-[var(--cb-error)]/80",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-icon"
      className={cn("mt-0.5 shrink-0 [&_svg]:size-4", className)}
      {...props}
    />
  )
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-title"
      className={cn("font-semibold leading-snug", className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-description"
      className={cn("text-[13px] leading-relaxed", className)}
      {...props}
    />
  )
}

export { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription, alertVariants }
