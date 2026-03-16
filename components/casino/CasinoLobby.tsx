"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { HeroCarousel } from "./HeroCarousel"
import { CategoryChipBar } from "./CategoryChipBar"
import { HotColdSection } from "./HotColdSection"
import { WinFeedRow } from "./WinFeedRow"
import { FeaturedGamesCarousel } from "./FeaturedGamesCarousel"
import { JackpotSection } from "./JackpotSection"
import { ProviderFilterBar } from "@/components/cloudbet/ProviderFilterBar"
import { StudioRail } from "@/components/cloudbet/StudioRail"
import { FeedSectionShell } from "@/components/cloudbet/FeedSectionShell"
import { SectionHeader } from "@/components/patterns/SectionHeader"
import {
  MOCK_GAMES,
  MOCK_FEATURED_GAMES,
  MOCK_JACKPOTS,
  MOCK_PROVIDERS,
  MOCK_BET_FEED,
  MOCK_WIN_FEED,
} from "@/lib/mocks"

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
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchValue, setSearchValue] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("all")

  const filteredGames = useMemo(() => {
    let games = MOCK_GAMES

    if (activeCategory !== "all") {
      games = games.filter((g) => {
        if (activeCategory === "live")     return g.isLive
        if (activeCategory === "new")      return g.isNew
        if (activeCategory === "jackpots") return ["g8", "g22", "g23"].includes(g.id)
        if (activeCategory === "table")    return g.provider === "Evolution" && !g.isLive
        if (activeCategory === "slots")    return !g.isLive
        return true
      })
    }

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
  }, [activeCategory, searchValue, selectedProvider])

  const popularGames = useMemo(
    () => MOCK_GAMES.filter((g) => (g.playerCount ?? 0) > 400).slice(0, 10),
    []
  )

  return (
    <div className={cn("flex flex-col gap-6 pb-16 md:gap-8")}>

      {/* 1. HeroCarousel */}
      <HeroCarousel />

      {/* 2. CategoryChipBar */}
      <CategoryChipBar value={activeCategory} onValueChange={setActiveCategory} />

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
