export interface Game {
  id: string
  title: string
  provider: string
  thumbnailUrl: string
  rtp?: number
  isLive?: boolean
  isNew?: boolean
  isFeatured?: boolean
  playerCount?: number
}

export interface Category {
  id: string
  label: string
  icon?: string
}

export interface Jackpot {
  id: string
  name: string
  amount: number
  currency: string
  gameId: string
  gameThumbnail: string
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const MOCK_CATEGORIES: Category[] = [
  { id: "all", label: "All Games" },
  { id: "slots", label: "Slots" },
  { id: "live", label: "Live Casino" },
  { id: "table", label: "Table Games" },
  { id: "jackpots", label: "Jackpots" },
  { id: "new", label: "New" },
]

// ─── Games ────────────────────────────────────────────────────────────────────

export const MOCK_GAMES: Game[] = [
  { id: "g1",  title: "Gates of Olympus",    provider: "Pragmatic Play",  thumbnailUrl: "/placeholder-game.svg", rtp: 96.5, isFeatured: true, playerCount: 1240 },
  { id: "g2",  title: "Sweet Bonanza",       provider: "Pragmatic Play",  thumbnailUrl: "/placeholder-game.svg", rtp: 96.5, isNew: true, playerCount: 890 },
  { id: "g3",  title: "Wanted Dead or Wild", provider: "Hacksaw Gaming",  thumbnailUrl: "/placeholder-game.svg", rtp: 96.4, playerCount: 432 },
  { id: "g4",  title: "Book of Dead",        provider: "Play'n GO",       thumbnailUrl: "/placeholder-game.svg", rtp: 96.2, playerCount: 678 },
  { id: "g5",  title: "Reactoonz",           provider: "Play'n GO",       thumbnailUrl: "/placeholder-game.svg", rtp: 96.5, playerCount: 345 },
  { id: "g6",  title: "Starburst",           provider: "NetEnt",          thumbnailUrl: "/placeholder-game.svg", rtp: 96.1, playerCount: 1100 },
  { id: "g7",  title: "Gonzo's Quest",       provider: "NetEnt",          thumbnailUrl: "/placeholder-game.svg", rtp: 95.97, playerCount: 567 },
  { id: "g8",  title: "Mega Moolah",         provider: "Microgaming",     thumbnailUrl: "/placeholder-game.svg", rtp: 88.1, playerCount: 2300 },
  { id: "g9",  title: "Dead or Alive 2",     provider: "NetEnt",          thumbnailUrl: "/placeholder-game.svg", rtp: 96.8, isNew: true, playerCount: 210 },
  { id: "g10", title: "Wolf Gold",           provider: "Pragmatic Play",  thumbnailUrl: "/placeholder-game.svg", rtp: 96.0, playerCount: 445 },
  { id: "g11", title: "Immortal Romance",    provider: "Microgaming",     thumbnailUrl: "/placeholder-game.svg", rtp: 96.86, playerCount: 389 },
  { id: "g12", title: "Jammin' Jars",        provider: "Push Gaming",     thumbnailUrl: "/placeholder-game.svg", rtp: 96.83, isFeatured: true, playerCount: 720 },
  { id: "g13", title: "Razor Shark",         provider: "Push Gaming",     thumbnailUrl: "/placeholder-game.svg", rtp: 96.7, playerCount: 290 },
  { id: "g14", title: "Big Bass Bonanza",    provider: "Pragmatic Play",  thumbnailUrl: "/placeholder-game.svg", rtp: 96.71, isNew: true, playerCount: 610 },
  { id: "g15", title: "Fruit Party",         provider: "Pragmatic Play",  thumbnailUrl: "/placeholder-game.svg", rtp: 96.5, playerCount: 480 },
  { id: "g16", title: "Crazy Time",          provider: "Evolution",       thumbnailUrl: "/placeholder-game.svg", isLive: true, playerCount: 3400 },
  { id: "g17", title: "Lightning Roulette",  provider: "Evolution",       thumbnailUrl: "/placeholder-game.svg", isLive: true, playerCount: 2100 },
  { id: "g18", title: "Monopoly Live",       provider: "Evolution",       thumbnailUrl: "/placeholder-game.svg", isLive: true, playerCount: 1560 },
  { id: "g19", title: "Dream Catcher",       provider: "Evolution",       thumbnailUrl: "/placeholder-game.svg", isLive: true, playerCount: 980 },
  { id: "g20", title: "Blackjack VIP",       provider: "Evolution",       thumbnailUrl: "/placeholder-game.svg", isLive: true, playerCount: 340 },
  { id: "g21", title: "Baccarat Squeeze",    provider: "Evolution",       thumbnailUrl: "/placeholder-game.svg", isLive: true, playerCount: 450 },
  { id: "g22", title: "Mega Fortune",        provider: "NetEnt",          thumbnailUrl: "/placeholder-game.svg", rtp: 96.6, playerCount: 1890 },
  { id: "g23", title: "Hall of Gods",        provider: "NetEnt",          thumbnailUrl: "/placeholder-game.svg", rtp: 95.7, playerCount: 670 },
  { id: "g24", title: "Divine Fortune",      provider: "NetEnt",          thumbnailUrl: "/placeholder-game.svg", rtp: 96.59, isNew: true, playerCount: 520 },
]

export const MOCK_FEATURED_GAMES: Game[] = MOCK_GAMES.filter((g) => g.isFeatured || g.playerCount! > 1000).slice(0, 8)

export const MOCK_HOT_GAMES: Game[] = MOCK_GAMES
  .filter((g) => g.rtp !== undefined)
  .sort((a, b) => (b.rtp ?? 0) - (a.rtp ?? 0))
  .slice(0, 5)

export const MOCK_COLD_GAMES: Game[] = MOCK_GAMES
  .filter((g) => g.rtp !== undefined)
  .sort((a, b) => (a.rtp ?? 0) - (b.rtp ?? 0))
  .slice(0, 5)

// ─── Jackpots ─────────────────────────────────────────────────────────────────

export const MOCK_JACKPOTS: Jackpot[] = [
  {
    id: "j1",
    name: "Mega Jackpot",
    amount: 4_287_341.50,
    currency: "USD",
    gameId: "g8",
    gameThumbnail: "/placeholder-game.svg",
  },
  {
    id: "j2",
    name: "Major Jackpot",
    amount: 892_104.75,
    currency: "USD",
    gameId: "g22",
    gameThumbnail: "/placeholder-game.svg",
  },
  {
    id: "j3",
    name: "Mini Jackpot",
    amount: 14_220.00,
    currency: "USD",
    gameId: "g23",
    gameThumbnail: "/placeholder-game.svg",
  },
]
