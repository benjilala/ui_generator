"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { HeroCarousel } from "./HeroCarousel"
import {
  CasinoCategoryNav,
  type CategoryId,
} from "@/components/blocks/casino-category-nav"
import { HotColdSection } from "./HotColdSection"
import { WinFeedRow } from "./WinFeedRow"
import { FeaturedGamesCarousel } from "./FeaturedGamesCarousel"
import { JackpotSection } from "./JackpotSection"
import { ProviderFilterBar } from "@/components/cloudbet/ProviderFilterBar"
import { StudioRail } from "@/components/cloudbet/StudioRail"
import { FeedSectionShell } from "@/components/cloudbet/FeedSectionShell"
import { SectionHeader } from "@/components/patterns/SectionHeader"
import type { Game } from "@/lib/mocks"
import {
  MOCK_GAMES,
  MOCK_FEATURED_GAMES,
  MOCK_JACKPOTS,
  MOCK_PROVIDERS,
  MOCK_BET_FEED,
  MOCK_WIN_FEED,
} from "@/lib/mocks"

const JACKPOT_GAME_IDS = new Set(["g8", "g22", "g23"])

function filterGamesByNavCategory(games: Game[], id: CategoryId): Game[] {
  switch (id) {
    case "for-you":
      return games
    case "live-dealer":
      return games.filter((g) => g.isLive)
    case "slots":
      return games.filter((g) => !g.isLive)
    case "table-games":
      return games.filter((g) => g.provider === "Evolution" && !g.isLive)
    case "jackpot-slots":
      return games.filter((g) => JACKPOT_GAME_IDS.has(g.id))
    case "blackjack":
      return games.filter((g) => /blackjack/i.test(g.title))
    case "roulette":
      return games.filter((g) => /roulette/i.test(g.title))
    case "baccarat":
      return games.filter((g) => /baccarat/i.test(g.title))
    case "game-shows":
      return games.filter((g) =>
        /crazy time|monopoly live|dream catcher/i.test(g.title)
      )
    case "crash":
      return games.filter((g) => /crash/i.test(g.title))
    case "aviator":
      return games.filter((g) => /aviator/i.test(g.title))
    case "video-poker":
      return games.filter((g) => /video\s*poker/i.test(g.title))
    default:
      return games
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SeeAllLink({ href = "#" }: { href?: string }) {
  return (
    <a
      href={href}
      className="text-xs text-cb-foreground-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-cb-foreground"
    >
      See all
    </a>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CasinoLobby() {
  const [categoryNavId, setCategoryNavId] = useState<CategoryId>("for-you")
  const [searchValue, setSearchValue] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("all")

  const filteredGames = useMemo(() => {
    let games = filterGamesByNavCategory(MOCK_GAMES, categoryNavId)

    if (searchValue) {
      const q = searchValue.toLowerCase()
      games = games.filter(
        (g) => g.title.toLowerCase().includes(q) || g.provider.toLowerCase().includes(q)
      )
    }

    if (selectedProvider !== "all") {
      const providerName = MOCK_PROVIDERS.find((p) => p.id === selectedProvider)?.name
      if (providerName) {
        games = games.filter((g) => g.provider === providerName)
      }
    }

    return games
  }, [categoryNavId, searchValue, selectedProvider])

  const popularGames = useMemo(
    () => filteredGames.filter((g) => (g.playerCount ?? 0) > 400).slice(0, 10),
    [filteredGames]
  )

  return (
    <div className={cn("flex flex-col gap-6 pb-16 md:gap-8")}>

      {/* 1. HeroCarousel */}
      <HeroCarousel />

      <CasinoCategoryNav
        variant="lobby"
        value={categoryNavId}
        onCategoryChange={setCategoryNavId}
      />

      {/* 3. SearchFilterBar */}
      <ProviderFilterBar
        providers={MOCK_PROVIDERS}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        selectedProvider={selectedProvider}
        onProviderChange={setSelectedProvider}
      />

      {/* 4. Featured Row */}
      <section aria-labelledby="featured-heading" className="group">
        <SectionHeader
          id="featured-heading"
          title="Featured Games"
          action={<SeeAllLink />}
        />
        <FeaturedGamesCarousel
          games={MOCK_FEATURED_GAMES}
          onPlay={(id) => console.log("play", id)}
          onDemo={(id) => console.log("demo", id)}
        />
      </section>

      {/* 5. Hot / Cold Section */}
      <section aria-labelledby="hotcold-heading">
        <SectionHeader id="hotcold-heading" title="Hot &amp; Cold Slots" />
        <HotColdSection
          onPlay={(id) => console.log("play", id)}
          onDemo={(id) => console.log("demo", id)}
        />
      </section>

      {/* 6. Jackpot Row */}
      <section aria-labelledby="jackpots-heading" className="group">
        <SectionHeader
          id="jackpots-heading"
          title="Jackpots"
          titleClassName="text-cb-jackpot"
          action={<SeeAllLink />}
        />
        <JackpotSection jackpots={MOCK_JACKPOTS} />
      </section>

      {/* 7. Popular Games Row */}
      <section aria-labelledby="popular-heading" className="group">
        <SectionHeader
          id="popular-heading"
          title="Popular Games"
          action={<SeeAllLink />}
        />
        <FeaturedGamesCarousel
          games={popularGames}
          onPlay={(id) => console.log("play", id)}
          onDemo={(id) => console.log("demo", id)}
        />
      </section>

      {/* 8. Studio Rail */}
      <section aria-labelledby="studios-heading" className="group">
        <SectionHeader
          id="studios-heading"
          title="Game Studios"
          action={<SeeAllLink />}
        />
        <StudioRail
          providers={MOCK_PROVIDERS}
          onSelect={(id) => setSelectedProvider(id)}
        />
      </section>

      {/* 9. Win Feed Row */}
      <section aria-labelledby="wins-heading">
        <SectionHeader id="wins-heading" title="Recent Big Wins" />
        <WinFeedRow entries={MOCK_WIN_FEED} />
      </section>

      {/* 10. Bet Feed */}
      <section aria-labelledby="feed-heading">
        <SectionHeader id="feed-heading" title="Live Activity" />
        <FeedSectionShell betFeed={MOCK_BET_FEED} winFeed={MOCK_WIN_FEED} />
      </section>

    </div>
  )
}
