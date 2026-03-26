import * as React from "react"
import { cn } from "@/lib/utils"

export interface CapabilityPillProps {
  label: string
  description: string
  status?: "live" | "next" | "future"
  className?: string
}

const STATUS_STYLES: Record<NonNullable<CapabilityPillProps["status"]>, string> = {
  live:   "border-cb-live/30 bg-cb-live-bg text-cb-live",
  next:   "border-cb-primary/30 bg-cb-primary/10 text-cb-purple-50",
  future: "border-cb-border text-cb-foreground-disabled",
}

const STATUS_LABELS: Record<NonNullable<CapabilityPillProps["status"]>, string> = {
  live:   "Live",
  next:   "Next",
  future: "Future",
}

export function CapabilityPill({
  label,
  description,
  status = "live",
  className,
}: CapabilityPillProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-[var(--cb-radius-md)] border border-cb-border bg-cb-surface-2 px-4 py-3",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-cb-foreground tracking-tight">
          {label}
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-1.5 py-px text-[9px] font-medium uppercase tracking-wider",
            STATUS_STYLES[status],
          )}
        >
          {STATUS_LABELS[status]}
        </span>
      </div>
      <p className="text-[11px] text-cb-foreground-muted leading-relaxed">
        {description}
      </p>
    </div>
  )
}
