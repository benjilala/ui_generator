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

type CategoryId = (typeof CATEGORIES)[number]["id"]

// ─── Block ────────────────────────────────────────────────────────────────────

interface CasinoCategoryNavProps {
  defaultActive?: CategoryId
  onCategoryChange?: (id: CategoryId) => void
  className?: string
}

export function CasinoCategoryNav({
  defaultActive = "for-you",
  onCategoryChange,
  className,
}: CasinoCategoryNavProps) {
  const [active, setActive] = React.useState<CategoryId>(defaultActive)

  function handleSelect(id: CategoryId) {
    setActive(id)
    onCategoryChange?.(id)
  }

  return (
    <ScrollArea className={className}>
      <div
        role="tablist"
        aria-label="Casino categories"
        className="flex gap-[9px] pb-2 px-0.5 mb-[84px]"
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
