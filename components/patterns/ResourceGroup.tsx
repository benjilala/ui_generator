"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Download, Link2 } from "lucide-react"

import { THEMES, useTheme } from "@/components/providers/ThemeProvider"
import { Button } from "@/components/ui/button"
import type { ResourceEntry, ResourceEntryStatus } from "@/lib/resource-entry"
import { cn } from "@/lib/utils"

export type { ResourceEntry, ResourceEntryStatus } from "@/lib/resource-entry"

const RESOURCE_ICON_STROKE = 1.1
const ICON_STROKE_LIGHT = "#1a1a1a"
const ICON_STROKE_DARK = "#ffffff"

function extensionFromPath(path: string): string {
  const segment = path.split("/").pop() ?? path
  const dot = segment.lastIndexOf(".")
  return dot >= 0 ? segment.slice(dot).toLowerCase() : ""
}

function titleWithExtension(entry: ResourceEntry): string {
  if (!entry.path) return entry.title
  const ext = extensionFromPath(entry.path)
  return ext ? `${entry.title} ${ext}` : entry.title
}

function isExternalHref(href: string | undefined): boolean {
  if (!href) return false
  return href.startsWith("http://") || href.startsWith("https://")
}

function DownloadGlyph({
  stroke,
  className,
}: {
  stroke: string
  className?: string
}) {
  return (
    <Download
      aria-hidden
      stroke={stroke}
      strokeWidth={RESOURCE_ICON_STROKE}
      fill="none"
      className={cn(
        "shrink-0 [&_path]:fill-none [&_circle]:fill-none [&_line]:fill-none [&_polyline]:fill-none [&_rect]:fill-none",
        className,
      )}
    />
  )
}

function ArrowGlyph({
  stroke,
  className,
}: {
  stroke: string
  className?: string
}) {
  return (
    <ArrowRight
      aria-hidden
      stroke={stroke}
      strokeWidth={RESOURCE_ICON_STROKE}
      fill="none"
      className={cn(
        "shrink-0 [&_path]:fill-none [&_circle]:fill-none [&_line]:fill-none [&_polyline]:fill-none [&_rect]:fill-none",
        className,
      )}
    />
  )
}

function LinkGlyph({
  stroke,
  className,
}: {
  stroke: string
  className?: string
}) {
  return (
    <Link2
      aria-hidden
      stroke={stroke}
      strokeWidth={RESOURCE_ICON_STROKE}
      className={cn(
        "shrink-0 [&_path]:fill-none [&_circle]:fill-none [&_line]:fill-none [&_polyline]:fill-none [&_rect]:fill-none",
        className,
      )}
    />
  )
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
    className: "border-cb-primary/30 bg-cb-primary/10 text-cb-purple-50",
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

function ResourceRowAction({
  children,
  className,
  isLight,
  ...props
}: React.ComponentProps<typeof Button> & { isLight: boolean }) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="icon-sm"
      className={cn(
        "size-8 shrink-0 rounded-full shadow-none transition-[background-color,border-color,transform] duration-200 ease-out active:scale-[0.97]",
        isLight
          ? "border border-cb-border bg-[#E8E4F0] text-[#1a1a1a] hover:bg-[#ddd8eb] hover:border-cb-border-visible [&_svg]:text-[#1a1a1a]"
          : "border border-cb-border bg-[#25212B] text-[#ffffff] hover:bg-[#2d2835] hover:border-cb-border [&_svg]:text-[#ffffff]",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

function ResourceEntryRow({
  entry,
  iconStroke,
  isLight,
}: {
  entry: ResourceEntry
  iconStroke: string
  isLight: boolean
}) {
  const status = entry.status ?? "available"
  const external = isExternalHref(entry.href)
  const isInternalPageLink =
    !!entry.href &&
    !external &&
    entry.status !== "planned" &&
    entry.status !== "future"
  const canDownloadFile = !!entry.path && status === "available"
  const downloadHref = canDownloadFile
    ? `/api/lab-file?path=${encodeURIComponent(entry.path!)}`
    : null
  const rowMuted = status === "planned" || status === "future"
  const showLeftLinkIcon =
    external && !!entry.href && !entry.path && !rowMuted
  const externalActive = external && !!entry.href && !rowMuted
  const label = titleWithExtension(entry)
  const linkTitleClass =
    "break-all text-sm font-medium leading-snug text-foreground transition-colors duration-200 ease-out group-hover/row:text-cb-purple-50 hover:text-cb-purple-50"

  return (
    <li
      className={cn(
        "group/row -mx-2 flex items-center gap-2 rounded-lg border-b border-cb-border/20 px-2 py-2 transition-[background-color,box-shadow] duration-200 ease-out last:border-0",
        rowMuted
          ? "opacity-50 hover:bg-cb-surface-2/25"
          : "hover:bg-cb-surface-2/55 hover:shadow-[inset_0_0_0_1px_var(--cb-border-subtle)]",
      )}
    >
      {canDownloadFile && downloadHref ? (
        <ResourceRowAction asChild isLight={isLight}>
          <a
            href={downloadHref}
            download
            aria-label={`Download ${entry.title}`}
          >
            <DownloadGlyph stroke={iconStroke} className="size-3.5" />
          </a>
        </ResourceRowAction>
      ) : null}
      {showLeftLinkIcon && entry.href ? (
        <ResourceRowAction asChild isLight={isLight}>
          <a
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open link: ${entry.title}`}
          >
            <LinkGlyph stroke={iconStroke} className="size-3.5" />
          </a>
        </ResourceRowAction>
      ) : null}
      <div className="min-w-0 flex-1 flex flex-col gap-0">
        <div className="flex flex-wrap items-center gap-2">
          {externalActive ? (
            <a
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkTitleClass}
            >
              {label}
            </a>
          ) : isInternalPageLink && entry.href ? (
            <Link
              href={entry.href}
              className={linkTitleClass}
            >
              {label}
            </Link>
          ) : (
            <span
              className={cn(
                "text-sm font-medium leading-snug transition-colors duration-200 ease-out",
                rowMuted
                  ? "text-cb-foreground-muted"
                  : "text-foreground group-hover/row:text-cb-purple-50",
              )}
            >
              {label}
            </span>
          )}
          <ResourceEntryBadge status={status} />
        </div>
        {entry.path && (
          <p
            className={cn(
              "truncate font-mono text-[10px] leading-tight text-cb-foreground-disabled transition-colors duration-200",
              !rowMuted && "group-hover/row:text-cb-foreground-muted",
            )}
          >
            {entry.path}
          </p>
        )}
      </div>
      {isInternalPageLink && entry.href ? (
        <div className="flex w-8 shrink-0 justify-end">
          <ResourceRowAction asChild isLight={isLight}>
            <Link href={entry.href} aria-label={`Open ${entry.title}`}>
              <ArrowGlyph stroke={iconStroke} className="size-3.5" />
            </Link>
          </ResourceRowAction>
        </div>
      ) : null}
    </li>
  )
}

export function ResourceGroup({ heading, entries, className }: ResourceGroupProps) {
  const { theme } = useTheme()
  const isLight = THEMES.find((t) => t.id === theme)?.isLight ?? false
  const iconStroke = isLight ? ICON_STROKE_LIGHT : ICON_STROKE_DARK

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55 sm:text-sm">
        {heading}
      </h3>
      <ul className="flex flex-col">
        {entries.map((entry) => (
          <ResourceEntryRow
            key={entry.href ?? entry.path ?? entry.title}
            entry={entry}
            iconStroke={iconStroke}
            isLight={isLight}
          />
        ))}
      </ul>
    </div>
  )
}
