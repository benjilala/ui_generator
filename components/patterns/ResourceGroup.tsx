import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export type ResourceEntryStatus = "available" | "planned" | "future"

export interface ResourceEntry {
  title: string
  description: string
  path?: string
  href?: string
  status?: ResourceEntryStatus
}

export interface ResourceGroupProps {
  heading: string
  entries: ResourceEntry[]
  className?: string
}

const ENTRY_STATUS_CONFIG: Record<
  ResourceEntryStatus,
  { label: string; className: string }
> = {
  available: { label: "", className: "" },
  planned: {
    label: "planned",
    className: "border-cb-primary/30 bg-cb-primary/10 text-cb-primary",
  },
  future: {
    label: "future",
    className: "border-cb-border text-cb-foreground-disabled bg-transparent",
  },
}

function ResourceEntryBadge({ status }: { status: ResourceEntryStatus }) {
  if (status === "available") return null
  const config = ENTRY_STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-1.5 py-px text-[9px] font-medium uppercase tracking-wider shrink-0",
        config.className,
      )}
    >
      {config.label}
    </span>
  )
}

function ResourceEntryRow({ entry }: { entry: ResourceEntry }) {
  const isLink = !!entry.href && entry.status !== "planned" && entry.status !== "future"
  const status = entry.status ?? "available"

  const inner = (
    <li
      className={cn(
        "flex flex-col gap-0.5 py-2 border-b border-cb-border-subtle last:border-0",
        !isLink && "opacity-50",
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-[11px] font-medium leading-tight",
            isLink ? "text-white group-hover:text-white/80 transition-colors" : "text-cb-foreground-muted",
          )}
        >
          {entry.title}
        </span>
        <ResourceEntryBadge status={status} />
      </div>
      {entry.path && (
        <p className="text-[9px] text-cb-foreground-disabled font-mono truncate">
          {entry.path}
        </p>
      )}
    </li>
  )

  if (isLink && entry.href) {
    return (
      <Link href={entry.href} className="group block">
        {inner}
      </Link>
    )
  }

  return inner
}

export function ResourceGroup({ heading, entries, className }: ResourceGroupProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <h3 className="text-[10px] font-semibold text-white/50 uppercase tracking-widest mb-1">
        {heading}
      </h3>
      <ul className="flex flex-col">
        {entries.map((entry) => (
          <ResourceEntryRow key={entry.title} entry={entry} />
        ))}
      </ul>
    </div>
  )
}
