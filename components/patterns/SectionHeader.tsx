import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionHeaderProps {
  id?: string
  title: string
  subtitle?: string
  titleClassName?: string
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({
  id,
  title,
  subtitle,
  titleClassName,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-3", className)}>
      <div className="flex flex-col gap-0.5">
        <h2
          id={id}
          className={cn("text-base font-semibold text-cb-foreground leading-tight", titleClassName)}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-cb-foreground-muted">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
