export interface BetFeedEntry {
  id: string
  player: string
  game: string
  amount: number
  currency: string
  timestamp: string
}

export interface WinFeedEntry {
  id: string
  player: string
  game: string
  amount: number
  multiplier: number
  currency: string
  timestamp: string
}

export const MOCK_BET_FEED: BetFeedEntry[] = [
  { id: "b1",  player: "crypt0_k1ng",   game: "Gates of Olympus",   amount: 5000,   currency: "USDT", timestamp: "2s ago" },
  { id: "b2",  player: "satoshi_x",     game: "Crazy Time",         amount: 2500,   currency: "BTC",  timestamp: "5s ago" },
  { id: "b3",  player: "whale_alert",   game: "Lightning Roulette", amount: 10000,  currency: "USDT", timestamp: "8s ago" },
  { id: "b4",  player: "moon_bettor",   game: "Sweet Bonanza",      amount: 750,    currency: "ETH",  timestamp: "12s ago" },
  { id: "b5",  player: "hodl_gambler",  game: "Book of Dead",       amount: 1200,   currency: "USDT", timestamp: "15s ago" },
  { id: "b6",  player: "defi_degen",    game: "Mega Moolah",        amount: 500,    currency: "BTC",  timestamp: "19s ago" },
  { id: "b7",  player: "block_roller",  game: "Blackjack VIP",      amount: 25000,  currency: "USDT", timestamp: "23s ago" },
  { id: "b8",  player: "nft_high_roll", game: "Starburst",          amount: 300,    currency: "ETH",  timestamp: "28s ago" },
  { id: "b9",  player: "anon_punter",   game: "Wolf Gold",          amount: 800,    currency: "USDT", timestamp: "32s ago" },
  { id: "b10", player: "chain_chaser",  game: "Gonzo's Quest",      amount: 1500,   currency: "BTC",  timestamp: "37s ago" },
]

export const MOCK_WIN_FEED: WinFeedEntry[] = [
  { id: "w1",  player: "crypt0_k1ng",   game: "Gates of Olympus",   amount: 48500,  multiplier: 9.7,  currency: "USDT", timestamp: "1s ago" },
  { id: "w2",  player: "satoshi_x",     game: "Crazy Time",         amount: 75000,  multiplier: 30,   currency: "BTC",  timestamp: "4s ago" },
  { id: "w3",  player: "moon_bettor",   game: "Sweet Bonanza",      amount: 12400,  multiplier: 16.5, currency: "ETH",  timestamp: "9s ago" },
  { id: "w4",  player: "whale_alert",   game: "Jammin' Jars",       amount: 220000, multiplier: 22,   currency: "USDT", timestamp: "14s ago" },
  { id: "w5",  player: "defi_degen",    game: "Mega Moolah",        amount: 1200000,multiplier: 2400, currency: "BTC",  timestamp: "18s ago" },
  { id: "w6",  player: "block_roller",  game: "Blackjack VIP",      amount: 50000,  multiplier: 2,    currency: "USDT", timestamp: "22s ago" },
  { id: "w7",  player: "hodl_gambler",  game: "Book of Dead",       amount: 8400,   multiplier: 7,    currency: "USDT", timestamp: "27s ago" },
  { id: "w8",  player: "nft_high_roll", game: "Razor Shark",        amount: 31200,  multiplier: 104,  currency: "ETH",  timestamp: "31s ago" },
  { id: "w9",  player: "anon_punter",   game: "Wolf Gold",          amount: 4800,   multiplier: 6,    currency: "USDT", timestamp: "36s ago" },
  { id: "w10", player: "chain_chaser",  game: "Divine Fortune",     amount: 92000,  multiplier: 61.3, currency: "BTC",  timestamp: "41s ago" },
]
