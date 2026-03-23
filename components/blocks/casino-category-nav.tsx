"use client"

import * as React from "react"
import { CasinoCategoryTab, CasinoLiveBadge } from "@/components/ui/casino-category-tab"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  AllGamesIcon,
  LiveIcon,
  SlotsIcon,
  BlackjackIcon,
  RouletteIcon,
  BaccaratIcon,
  GameShowsIcon,
  CrashIcon,
  AviatorIcon,
  TableGamesIcon,
  VideoPokerIcon,
  JackpotSlotsIcon,
} from "@/components/icons/casino"

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "for-you",
    label: "For you",
    icon: <AllGamesIcon />,
  },
  {
    id: "live-dealer",
    label: "Live dealer",
    icon: <LiveIcon />,
    badge: <CasinoLiveBadge />,
  },
  {
    id: "slots",
    label: "Slots",
    icon: <SlotsIcon />,
  },
  {
    id: "blackjack",
    label: "Blackjack",
    icon: <BlackjackIcon />,
  },
  {
    id: "roulette",
    label: "Roulette",
    icon: <RouletteIcon />,
  },
  {
    id: "baccarat",
    label: "Baccarat",
    icon: <BaccaratIcon />,
  },
  {
    id: "game-shows",
    label: "Game shows",
    icon: <GameShowsIcon />,
  },
  {
    id: "crash",
    label: "Crash",
    icon: <CrashIcon />,
  },
  {
    id: "aviator",
    label: "Aviator",
    icon: <AviatorIcon />,
  },
  {
    id: "table-games",
    label: "Table games",
    icon: <TableGamesIcon />,
  },
  {
    id: "video-poker",
    label: "Video poker",
    icon: <VideoPokerIcon />,
  },
  {
    id: "jackpot-slots",
    label: "Jackpot slots",
    icon: <JackpotSlotsIcon />,
  },
] as const

export type CategoryId = (typeof CATEGORIES)[number]["id"]

// ─── Block ────────────────────────────────────────────────────────────────────

interface CasinoCategoryNavProps {
  defaultActive?: CategoryId
  /** Controlled active category (when set, overrides internal state). */
  value?: CategoryId
  onCategoryChange?: (id: CategoryId) => void
  /** `lobby` drops the large bottom margin used on the /ui gallery demo. */
  variant?: "gallery" | "lobby"
  className?: string
}

export function CasinoCategoryNav({
  defaultActive = "for-you",
  value,
  onCategoryChange,
  variant = "gallery",
  className,
}: CasinoCategoryNavProps) {
  const [internal, setInternal] = React.useState<CategoryId>(defaultActive)
  const active = value ?? internal

  function handleSelect(id: CategoryId) {
    if (value === undefined) setInternal(id)
    onCategoryChange?.(id)
  }

  const listClassName =
    variant === "lobby"
      ? "flex gap-[9px] pb-2 px-0.5"
      : "flex gap-[9px] pb-2 px-0.5 mb-[84px]"

  return (
    <ScrollArea className={className}>
      <div
        role="tablist"
        aria-label="Casino categories"
        className={listClassName}
      >
        {CATEGORIES.map((cat) => (
          <CasinoCategoryTab
            key={cat.id}
            label={cat.label}
            icon={cat.icon}
            badge={"badge" in cat ? cat.badge : undefined}
            active={active === cat.id}
            onClick={() => handleSelect(cat.id)}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
