"use client"

import * as React from "react"
import { ChevronDown, Lock, Play, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Competitor {
  name: string
  iconUrl?: string
  score?: string
}

export interface OddsButton {
  label?: string
  value: string
  trend?: "up" | "down" | null
  suspended?: boolean
  closed?: boolean
  isSelected?: boolean
}

export interface EventTag {
  type: "live-stream" | "bet-builder" | "virtual" | "simulated"
}

export interface SportEvent {
  id: string
  competitors: [Competitor, Competitor]
  status: string
  isLive?: boolean
  matchResult?: "home" | "away" | "draw" | null
  /** Which competitor is currently serving (0 = home, 1 = away). Tennis, volleyball, etc. */
  serverIndex?: 0 | 1
  markets: OddsButton[][]
  tags?: EventTag[]
}

export interface MarketOption {
  key: string
  label: string
  dropdownLabel?: string
}

export interface MarketGroup {
  key: string
  label: string
  outcomes: MarketOption[]
}

export interface CompetitionCardProps {
  competitionName: string
  competitionIcon?: React.ReactNode
  marketGroups?: MarketGroup[]
  events: SportEvent[]
  defaultOpen?: boolean
  className?: string
  onTitleClick?: () => void
}

/*
 * Layout grid (must stay in sync with MarketHeader):
 *   grid grid-cols-2 gap-x-3 pl-1.5
 *   col-1 = competitors   col-2 = market data
 *
 * Market data column:
 *   flex-1 flex justify-center gap-x-1
 *   Each market group: flex-1 flex  →  OddsList flex-1 flex gap-1
 *   Each button wrapper: w-full flex-1 flex justify-center
 *   OddsButtonUI: w-full h-full min-h-11 rounded-xl
 */

// ─── Odds button (matches OddsButtonV3/OddsButtonUI) ─────────────────────────

function OddsBtn({ label, value, trend, suspended, closed, isSelected }: OddsButton) {
  if (closed) {
    return (
      <div className="w-full flex-1 flex justify-center">
        <div className="w-full h-full min-h-11" />
      </div>
    )
  }

  if (suspended) {
    return (
      <div className="w-full flex-1 flex justify-center">
        <div className="w-full h-full min-h-11 flex items-center justify-center">
          <Lock className="size-[18px] text-cb-foreground-disabled" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex-1 flex justify-center">
      <button
        className={cn(
          "w-full h-full min-h-11 rounded-xl border",
          "py-1 px-0.5",
          "transition-colors duration-300 ease-in-out select-none cursor-pointer",
          "hover:bg-cb-brand-purple/[0.08] active:bg-cb-brand-purple/[0.16]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-brand-purple focus-visible:ring-offset-1 focus-visible:ring-offset-cb-surface-2",
          isSelected ? "border-cb-brand-purple/30" : "border-transparent",
        )}
      >
        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center font-medium gap-x-1">
            {label && (
              <span className="text-sm font-medium text-cb-foreground leading-none text-center">
                {label}
              </span>
            )}
            <div className="h-7 p-0.5 relative flex items-center justify-center">
              <span
                className={cn(
                  "text-sm font-medium text-cb-accent leading-none",
                  trend === "up" && "text-cb-success",
                  trend === "down" && "text-cb-danger",
                )}
              >
                {value}
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}

// ─── Competitor row (matches Competitor.tsx) ──────────────────────────────────

function CompetitorRow({
  competitor,
  isWinner,
  matchHasWinner,
  isServer,
}: {
  competitor: Competitor
  isWinner?: boolean
  matchHasWinner?: boolean
  isServer?: boolean
}) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <div
      className={cn(
        "flex items-center gap-x-3",
        matchHasWinner && !isWinner && "opacity-40",
      )}
    >
      <div className="flex items-center gap-x-3 overflow-hidden mr-auto text-cb-foreground">
        <div className="size-5 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-cb-surface-4">
          {competitor.iconUrl && !imgError ? (
            <img
              src={competitor.iconUrl}
              alt={competitor.name}
              className="size-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <svg viewBox="0 0 24 24" className="size-3 fill-cb-foreground-disabled" aria-hidden>
              <circle cx="12" cy="12" r="10" />
            </svg>
          )}
        </div>
        <span className="text-xs font-bold truncate text-cb-foreground">
          {competitor.name}
        </span>
        {isServer && (
          <span className="size-1.5 rounded-full bg-cb-success shrink-0" />
        )}
      </div>
      <div className="flex items-center gap-x-1.5 shrink-0">
        {competitor.score !== undefined && (
          <span className="text-xs font-bold text-cb-foreground tabular-nums">
            {competitor.score}
          </span>
        )}
        <div className="w-1.5 h-2 shrink-0">
          {isWinner && (
            <svg viewBox="0 0 6 8" className="w-1.5 h-2 fill-cb-foreground" aria-hidden>
              <polygon points="0,0 6,4 0,8" />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Gradient divider (matches DividerV2) ────────────────────────────────────

function GradientDivider() {
  return (
    <div
      role="separator"
      className="w-full h-0.5"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, var(--color-cb-border) 30%, var(--color-cb-border) 70%, transparent 100%)",
      }}
    />
  )
}

// ─── Event tags ───────────────────────────────────────────────────────────────

function EventTagChip({ tag }: { tag: EventTag }) {
  if (tag.type === "live-stream") {
    return <Play className="size-4 text-cb-foreground-muted" />
  }
  if (tag.type === "bet-builder") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-cb-foreground-muted border border-cb-border-subtle rounded px-1.5 py-0.5 leading-none">
        <Zap className="size-2.5" />
        Bet Builder
      </span>
    )
  }
  if (tag.type === "virtual") {
    return (
      <span className="text-[10px] font-medium uppercase text-cb-info border border-cb-info/30 rounded px-1.5 py-0.5 leading-none">
        VIR
      </span>
    )
  }
  if (tag.type === "simulated") {
    return (
      <span className="text-[10px] font-medium uppercase text-cb-foreground-muted border border-cb-border-subtle rounded px-1.5 py-0.5 leading-none">
        SIM
      </span>
    )
  }
  return null
}

// ─── Event row (matches MatchupWrapper grid) ─────────────────────────────────

function EventRow({
  event,
  activeGroupIndex,
  isLast,
}: {
  event: SportEvent
  activeGroupIndex: number
  isLast: boolean
}) {
  const odds = event.markets[activeGroupIndex] ?? event.markets[0] ?? []
  const matchHasWinner = event.matchResult === "home" || event.matchResult === "away"
  const hasEnded = event.status === "FT" || event.status === "Final" || event.status === "Cancelled"

  return (
    <>
      <div className="relative cursor-pointer group">
        {/* Hover state layer — matches Valhalla stateLayerClassName */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-80 transition-opacity duration-150"
          style={{
            background:
              "linear-gradient(to right, var(--color-cb-surface-4), var(--color-cb-surface-3), var(--color-cb-surface-2))",
          }}
        />

        <div className="flex flex-col p-2 gap-y-2 relative">
          <div className="grid grid-cols-2 gap-x-3 pl-1.5">
            {/* Col 1: competitors */}
            <div className="col-span-1 flex justify-between">
              <div className="max-w-xs w-full flex flex-col gap-y-1 justify-center">
                <CompetitorRow
                  competitor={event.competitors[0]}
                  isWinner={event.matchResult === "home"}
                  matchHasWinner={matchHasWinner}
                  isServer={!hasEnded && event.serverIndex === 0}
                />
                <CompetitorRow
                  competitor={event.competitors[1]}
                  isWinner={event.matchResult === "away"}
                  matchHasWinner={matchHasWinner}
                  isServer={!hasEnded && event.serverIndex === 1}
                />
              </div>
            </div>

            {/* Col 2: market data — matches marketDataClassName */}
            <div className="col-span-1 flex gap-x-1 text-center items-center">
              <div className="flex-1 flex justify-center gap-x-1">
                {odds.map((btn, i) => (
                  <OddsBtn key={i} {...btn} />
                ))}
              </div>
            </div>
          </div>

          {/* Status row below the grid — matches BottomStatus pt-2 */}
          <div className="flex items-center gap-x-3 pl-1.5">
            <div className="flex items-center gap-1.5">
              {event.isLive && (
                <span className="relative flex size-[7px] shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-cb-brand-purple opacity-75 animate-ping" />
                  <span className="relative inline-flex size-[7px] rounded-full bg-cb-brand-purple" />
                </span>
              )}
              <span className={cn(
                "text-[11px] leading-none",
                event.status === "Cancelled" ? "text-cb-danger" : "text-cb-foreground-muted",
              )}>
                {event.status}
              </span>
            </div>
            {event.tags && event.tags.length > 0 && (
              <div className="flex items-center gap-1.5">
                {event.tags.map((tag, i) => (
                  <EventTagChip key={i} tag={tag} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {!isLast && <GradientDivider />}
    </>
  )
}

// ─── Market header (matches MarketHeaderV2 grid) ─────────────────────────────

function MarketHeader({
  groups,
  activeGroupKey,
  onChange,
}: {
  groups: MarketGroup[]
  activeGroupKey: string
  onChange: (key: string) => void
}) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const activeGroup = groups.find((g) => g.key === activeGroupKey) ?? groups[0]
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div
      className={cn(
        // Matches MarketHeaderV2: grid grid-cols-2 gap-x-3 pl-1.5 pr-2 min-h-8 items-center
        "grid grid-cols-2 gap-x-3 pl-1.5 pr-2 min-h-8 items-center",
        "text-cb-foreground-muted",
      )}
      style={{
        background:
          "linear-gradient(90deg, color-mix(in oklch, var(--color-cb-surface-3) 10%, transparent) 5%, var(--color-cb-surface-3) 50%, color-mix(in oklch, var(--color-cb-surface-3) 10%, transparent) 95%)",
        borderTop: "0.5px solid color-mix(in oklch, var(--color-cb-surface-3) 50%, transparent)",
        borderBottom: "0.5px solid color-mix(in oklch, var(--color-cb-surface-3) 50%, transparent)",
      }}
    >
      {/* Col 1: CTA market switcher */}
      <div className="col-span-1 relative" ref={ref}>
        {groups.length > 1 ? (
          <>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className={cn(
                "flex items-center gap-2 py-1 px-2 rounded-full",
                "text-xs font-medium",
                "border-2 transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-brand-purple",
                dropdownOpen
                  ? "border-cb-brand-purple/60 bg-cb-brand-purple/[0.08] text-cb-foreground"
                  : "border-transparent text-cb-foreground-muted hover:text-cb-foreground hover:border-cb-border",
              )}
            >
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-300 ease-out shrink-0",
                  dropdownOpen && "-rotate-180",
                )}
              />
              <span className="truncate">{activeGroup?.label}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 z-20 min-w-[200px] rounded-[var(--cb-radius-lg)] bg-cb-surface-4 shadow-xl overflow-hidden">
                {groups.map((g) => (
                  <button
                    key={g.key}
                    onClick={() => {
                      onChange(g.key)
                      setDropdownOpen(false)
                    }}
                    className={cn(
                      "w-full text-left px-4 py-3.5 text-sm transition-colors duration-100",
                      "hover:bg-cb-surface-5",
                      g.key === activeGroupKey
                        ? "text-cb-foreground font-medium"
                        : "text-cb-foreground-muted",
                    )}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <span className="text-xs font-medium text-cb-foreground-muted px-1.5">
            {activeGroup?.label}
          </span>
        )}
      </div>

      {/* Col 2: outcome headers — matches MarketHeaderV2 flex gap-x-1 w-full h-full pl-1 */}
      <div className="col-span-1 flex gap-x-1 text-center items-center w-full h-full pl-1">
        {activeGroup?.outcomes.map((outcome, i) => (
          <div
            key={i}
            className="flex-1 flex w-full items-center justify-center truncate"
          >
            <span className="whitespace-nowrap text-ellipsis truncate font-medium text-[11px]">
              {outcome.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CompetitionCard({
  competitionName,
  competitionIcon,
  marketGroups = [],
  events,
  defaultOpen = true,
  className,
  onTitleClick,
}: CompetitionCardProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const [activeGroupKey, setActiveGroupKey] = React.useState(
    marketGroups[0]?.key ?? "",
  )

  const activeGroupIndex = marketGroups.findIndex((g) => g.key === activeGroupKey)
  const resolvedIndex = activeGroupIndex >= 0 ? activeGroupIndex : 0

  return (
    <div
      className={cn(
        "rounded-[var(--cb-radius-lg)] bg-cb-surface-2 overflow-hidden",
        className,
      )}
    >
      {/* Header — matches HeaderV3 flex items-center gap-x-3 p-2.5 */}
      <div className="flex items-center gap-x-3 p-2.5">
        <div className="size-[22px] shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-cb-surface-3">
          {competitionIcon ?? (
            <svg viewBox="0 0 24 24" className="size-3.5 fill-cb-foreground-disabled" aria-hidden>
              <circle cx="12" cy="12" r="10" />
            </svg>
          )}
        </div>

        <button
          onClick={onTitleClick ?? (() => setOpen((v) => !v))}
          className="flex flex-grow text-left items-center gap-x-2 w-[80%] focus-visible:outline-none"
        >
          <span className="text-sm font-semibold text-cb-foreground truncate block leading-none">
            {competitionName}
          </span>
        </button>

        <div className="flex gap-x-2 sm:gap-x-7">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Collapse" : "Expand"}
            className={cn(
              "group/accord size-8 rounded-xl flex items-center justify-center shrink-0",
              "transition-colors duration-300 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-brand-purple",
              "hover:bg-cb-foreground-muted/[0.08] active:bg-cb-foreground-muted/[0.16]",
              open ? "bg-cb-surface-1" : "bg-cb-surface-3",
            )}
          >
            <ChevronDown
              className={cn(
                "size-5 transition-transform duration-150 ease-out",
                open && "-rotate-180",
              )}
            />
          </button>
        </div>
      </div>

      {/* Collapsible body */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          {marketGroups.length > 0 && (
            <MarketHeader
              groups={marketGroups}
              activeGroupKey={activeGroupKey}
              onChange={setActiveGroupKey}
            />
          )}

          {events.map((event, i) => (
            <EventRow
              key={event.id}
              event={event}
              activeGroupIndex={resolvedIndex}
              isLast={i === events.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function CompetitionCardSkeleton({
  eventCount = 2,
  marketCount = 3,
}: {
  eventCount?: number
  marketCount?: number
}) {
  return (
    <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-2 overflow-hidden animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-x-3 p-2.5">
        <div className="size-[22px] rounded-full bg-cb-surface-4 shrink-0" />
        <div className="h-4 rounded-full bg-cb-surface-4 flex-1 max-w-[180px]" />
        <div className="size-8 rounded-xl bg-cb-surface-4 shrink-0" />
      </div>

      {/* Market header skeleton */}
      <div className="grid grid-cols-2 gap-x-3 pl-1.5 pr-2 min-h-8 items-center bg-cb-surface-3/40">
        <div className="h-6 w-28 rounded-full bg-cb-surface-4" />
        <div className="flex gap-x-1 pl-1">
          {Array.from({ length: marketCount }).map((_, i) => (
            <div key={i} className="flex-1 h-4 rounded-full bg-cb-surface-4" />
          ))}
        </div>
      </div>

      {/* Event skeletons */}
      {Array.from({ length: eventCount }).map((_, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col p-2 gap-y-2">
            <div className="grid grid-cols-2 gap-x-3 pl-1.5">
              {/* Competitors col */}
              <div className="col-span-1 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-3">
                  <div className="size-5 rounded-full bg-cb-surface-4 shrink-0" />
                  <div className="h-3.5 rounded-full bg-cb-surface-4 w-3/4" />
                </div>
                <div className="flex items-center gap-x-3">
                  <div className="size-5 rounded-full bg-cb-surface-4 shrink-0" />
                  <div className="h-3.5 rounded-full bg-cb-surface-4 w-2/3" />
                </div>
              </div>
              {/* Odds col */}
              <div className="col-span-1 flex gap-x-1 items-center">
                <div className="flex-1 flex justify-center gap-x-1">
                  {Array.from({ length: marketCount }).map((__, j) => (
                    <div key={j} className="w-full flex-1 flex justify-center">
                      <div className="w-full min-h-11 rounded-xl bg-cb-surface-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-3 rounded-full bg-cb-surface-4 w-24 ml-1.5" />
          </div>
          {i < eventCount - 1 && <GradientDivider />}
        </React.Fragment>
      ))}
    </div>
  )
}
