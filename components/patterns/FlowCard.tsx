"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export type FlowCardStatus = "active" | "next" | "future"

export interface FlowStep {
  step: number
  title: string
  description: string
  detail: string
  status?: FlowCardStatus
}

interface FlowListProps {
  steps: FlowStep[]
  className?: string
}

const STATUS_CONFIG: Record<
  FlowCardStatus,
  { stepClass: string; titleClass: string; rowClass: string }
> = {
  active: {
    stepClass: "bg-cb-primary/20 text-cb-primary",
    titleClass: "text-cb-foreground",
    rowClass: "",
  },
  next: {
    stepClass: "bg-cb-primary/10 text-cb-primary/60",
    titleClass: "text-cb-foreground-muted",
    rowClass: "",
  },
  future: {
    stepClass: "bg-cb-surface-4 text-cb-foreground-disabled",
    titleClass: "text-cb-foreground-disabled",
    rowClass: "opacity-60",
  },
}

export function FlowList({ steps, className }: FlowListProps) {
  return (
    <Accordion type="single" collapsible className={cn("w-full", className)}>
      {steps.map((step) => {
        const status = step.status ?? "active"
        const config = STATUS_CONFIG[status]

        return (
          <AccordionItem
            key={step.step}
            value={String(step.step)}
            className={cn(
              "border-b border-cb-border-subtle last:border-b-0",
              config.rowClass,
            )}
          >
            <AccordionTrigger
              className={cn(
                "group flex w-full items-center gap-4 py-4 text-left hover:no-underline",
                "hover:bg-cb-surface-2 -mx-4 px-4 rounded-[var(--cb-radius-sm)] transition-colors duration-100",
              )}
            >
              {/* Step number */}
              <span
                className={cn(
                  "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold tabular-nums",
                  config.stepClass,
                )}
              >
                {step.step}
              </span>

              {/* Title + description */}
              <span className="flex flex-1 flex-col gap-0.5 min-w-0">
                <span className={cn("text-sm font-medium leading-snug", config.titleClass)}>
                  {step.title}
                </span>
                <span className="text-[11px] text-cb-foreground-disabled leading-relaxed">
                  {step.description}
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent className="pb-4 pl-10">
              <p className="text-xs text-cb-foreground-muted leading-relaxed">
                {step.detail}
              </p>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

// Keep the old FlowCard export so nothing else breaks if it's referenced elsewhere
export type { FlowListProps }
