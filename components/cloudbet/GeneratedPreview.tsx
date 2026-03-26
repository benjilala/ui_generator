"use client"

import * as React from "react"
import { RotateCcw, PenLine, ExternalLink, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SectionHeader } from "@/components/patterns/SectionHeader"
import { JackpotSection } from "@/components/casino/JackpotSection"
import { FeedSectionShell } from "@/components/cloudbet/FeedSectionShell"
import { StudioRail } from "@/components/cloudbet/StudioRail"
import { OddsButton } from "@/components/cloudbet/OddsButton"
import { GameTile } from "@/components/cloudbet/GameTile"
import { HeroCarousel } from "@/components/casino/HeroCarousel"
import {
  MOCK_JACKPOTS,
  MOCK_BET_FEED,
  MOCK_WIN_FEED,
  MOCK_PROVIDERS,
  MOCK_GAMES,
  MOCK_FEATURED_GAMES,
} from "@/lib/mocks"
import type { GeneratedEntry, PatternKey } from "@/lib/system/generated-screens"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GeneratedPreviewProps {
  entry: GeneratedEntry
  onRegenerate?: (entry: GeneratedEntry) => void
  onMarkUseful?: (id: string) => void
  /** When true, hides prompt-driven actions (regenerate, refine, etc.). */
  readOnly?: boolean
  className?: string
}

// ─── Pattern previews ─────────────────────────────────────────────────────────

function CasinoLobbyPreview() {
  return (
    <div className="flex flex-col gap-6">
      <HeroCarousel />
      <div>
        <SectionHeader title="Jackpots" titleClassName="text-cb-jackpot" />
        <JackpotSection jackpots={MOCK_JACKPOTS} className="mt-3" />
      </div>
      <div>
        <SectionHeader title="Featured Games" />
        <div className="flex flex-wrap gap-3 mt-3">
          {MOCK_FEATURED_GAMES.slice(0, 4).map((game) => (
            <GameTile key={game.id} game={game} size="sm" featured={game.isFeatured} />
          ))}
        </div>
      </div>
    </div>
  )
}

function VIPLobbyPreview() {
  return (
    <div className="flex flex-col gap-6">
      {/* VIP hero banner */}
      <div className="relative rounded-[var(--cb-radius-xl)] overflow-hidden bg-cb-surface-3 border border-cb-border p-8"
        style={{ background: "linear-gradient(135deg, oklch(0.25 0.08 290 / 0.9) 0%, var(--cb-surface-2) 100%)" }}>
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--cb-brand-purple) 0%, transparent 70%)" }} aria-hidden />
        <span className="inline-flex items-center rounded-full bg-purple-600 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white mb-3">
          VIP
        </span>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Whale</h2>
        <p className="text-sm text-white/60 mb-5">Diamond tier · 2,400,000 loyalty points</p>
        <Button style={{ height: "48px", paddingLeft: "24px", paddingRight: "24px" }}>
          Claim VIP Reward
        </Button>
      </div>

      <div>
        <SectionHeader title="Exclusive Jackpots" titleClassName="text-cb-jackpot" />
        <JackpotSection jackpots={MOCK_JACKPOTS} className="mt-3" />
      </div>

      <div>
        <SectionHeader title="Live Activity" />
        <FeedSectionShell betFeed={MOCK_BET_FEED} winFeed={MOCK_WIN_FEED} className="mt-3" />
      </div>

      <div>
        <SectionHeader title="Game Studios" />
        <StudioRail providers={MOCK_PROVIDERS.slice(0, 6)} className="mt-3" />
      </div>
    </div>
  )
}

function JackpotDiscoveryPreview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[var(--cb-radius-xl)] border border-cb-border bg-cb-surface-3 p-6"
        style={{ background: "linear-gradient(135deg, oklch(0.3 0.12 75 / 0.4) 0%, var(--cb-surface-2) 100%)" }}>
        <p className="text-[10px] font-semibold text-cb-jackpot uppercase tracking-widest mb-1">Total jackpot pool</p>
        <p className="text-5xl font-bold text-cb-jackpot tabular-nums">$5,193,666</p>
        <p className="text-xs text-cb-foreground-disabled mt-1">Across 3 active jackpots · Updates live</p>
      </div>

      <div>
        <SectionHeader title="Active Jackpots" titleClassName="text-cb-jackpot" />
        <JackpotSection jackpots={MOCK_JACKPOTS} className="mt-3" />
      </div>

      <div>
        <SectionHeader title="Jackpot Games" />
        <div className="flex flex-wrap gap-3 mt-3">
          {MOCK_GAMES.filter((g) => ["g8", "g22", "g23"].includes(g.id)).map((game) => (
            <GameTile key={game.id} game={game} size="lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

function SportsbookHomePreview() {
  const MARKETS = [
    { label: "Man City", odds: "1.85" },
    { label: "Draw", odds: "3.60" },
    { label: "Arsenal", odds: "4.20" },
    { label: "Over 2.5", odds: "1.72" },
    { label: "Under 2.5", odds: "2.10" },
    { label: "BTTS", odds: "1.65" },
  ]
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[var(--cb-radius-xl)] border border-cb-border bg-cb-surface-3 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] text-cb-foreground-disabled uppercase tracking-widest">Premier League · Live</p>
            <p className="text-base font-bold text-cb-foreground mt-0.5">Man City vs Arsenal</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-cb-live animate-pulse" />
            <span className="text-xs text-cb-live font-medium">67&apos;</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {MARKETS.map((m) => (
            <OddsButton key={m.label} label={m.label} odds={m.odds} />
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="Live Activity" />
        <FeedSectionShell betFeed={MOCK_BET_FEED} winFeed={MOCK_WIN_FEED} className="mt-3" />
      </div>
    </div>
  )
}

function BetPlacementFlowPreview() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="rounded-[var(--cb-radius-xl)] border border-cb-border bg-cb-surface-3 p-5">
        <p className="text-[10px] text-cb-foreground-disabled uppercase tracking-widest mb-3">Your selection</p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-cb-foreground">Man City — Win</p>
            <p className="text-[10px] text-cb-foreground-muted mt-0.5">Premier League · Full Time</p>
          </div>
          <OddsButton label="Home" odds="1.85" selected />
        </div>
        <Separator className="bg-cb-border mb-4" />
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-xs text-cb-foreground-muted">
            <span>Stake</span>
            <span className="font-mono text-cb-foreground">0.05 BTC</span>
          </div>
          <div className="flex justify-between text-xs text-cb-foreground-muted">
            <span>Potential return</span>
            <span className="font-mono text-cb-odds-up">0.0925 BTC</span>
          </div>
        </div>
        <Button className="w-full mt-5" style={{ height: "48px" }}>
          Place Bet
        </Button>
        <Button variant="secondary" className="w-full mt-2" style={{ height: "40px" }}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

function GenericScreenPreview() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionHeader title="Generated Screen" subtitle="Pattern-matched components from the Cloudbet library" />
      </div>
      <div className="flex flex-wrap gap-3">
        {MOCK_GAMES.slice(0, 6).map((game) => (
          <GameTile key={game.id} game={game} size="sm" />
        ))}
      </div>
    </div>
  )
}

const PATTERN_PREVIEW_MAP: Record<PatternKey, React.FC> = {
  "Casino Lobby":       CasinoLobbyPreview,
  "VIP Lobby":          VIPLobbyPreview,
  "Jackpot Discovery":  JackpotDiscoveryPreview,
  "Sportsbook Home":    SportsbookHomePreview,
  "Bet Placement Flow": BetPlacementFlowPreview,
  "Generic Screen":     GenericScreenPreview,
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GeneratedPreview({
  entry,
  onRegenerate,
  onMarkUseful,
  readOnly = false,
  className,
}: GeneratedPreviewProps) {
  const PreviewComponent = PATTERN_PREVIEW_MAP[entry.detectedPattern] ?? GenericScreenPreview

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Entry metadata — flat, no card fill */}
      <div className="flex flex-col gap-3">
        {/* Title + prompt */}
        <div>
          <h2 className="text-lg font-bold text-cb-foreground leading-tight">{entry.title}</h2>
          <p className="text-xs text-cb-foreground-muted italic mt-1">
            &ldquo;{entry.prompt}&rdquo;
          </p>
        </div>

        {!readOnly ? (
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onRegenerate?.(entry)}
            >
              <RotateCcw className="size-3.5 mr-1.5" />
              Regenerate
            </Button>
            <Button size="sm" variant="secondary">
              <PenLine className="size-3.5 mr-1.5" />
              Refine
            </Button>
            <Button size="sm" variant="secondary">
              <ExternalLink className="size-3.5 mr-1.5" />
              Send to Cursor
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onMarkUseful?.(entry.id)}
            >
              <Star className={cn("size-3.5 mr-1.5", entry.status === "useful" && "fill-cb-jackpot text-cb-jackpot")} />
              {entry.status === "useful" ? "Marked useful" : "Mark useful"}
            </Button>
          </div>
        ) : null}

        <Separator className="bg-cb-border" />

        {/* Pattern + components metadata */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-cb-foreground-disabled uppercase tracking-widest">Pattern</span>
            <span className="inline-flex items-center rounded-[var(--cb-radius-sm)] border border-cb-primary/30 bg-cb-primary/10 px-2 py-0.5 text-xs font-medium text-cb-purple-50">
              {entry.detectedPattern}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-cb-foreground-disabled uppercase tracking-widest">Components used</span>
            <div className="flex flex-wrap gap-1.5">
              {entry.componentsUsed.map((c) => (
                <span key={c} className="inline-flex items-center rounded-[var(--cb-radius-sm)] bg-cb-surface-4 border border-cb-border px-1.5 py-0.5 text-[10px] font-mono text-cb-foreground-muted">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live preview */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-semibold text-cb-foreground-disabled uppercase tracking-widest">Preview</span>
          <div className="flex-1 h-px bg-cb-border" />
        </div>
        <div className="rounded-[var(--cb-radius-lg)] border border-cb-border bg-cb-surface-1 p-6 overflow-auto">
          <PreviewComponent />
        </div>
      </div>
    </div>
  )
}
