// ─── Types ────────────────────────────────────────────────────────────────────

export type GeneratedStatus = "preview" | "draft" | "useful"

export type PatternKey =
  | "Casino Lobby"
  | "VIP Lobby"
  | "Jackpot Discovery"
  | "Sportsbook Home"
  | "Bet Placement Flow"
  | "Generic Screen"

export interface GeneratedEntry {
  id: string
  title: string
  prompt: string
  detectedPattern: PatternKey
  componentsUsed: string[]
  status: GeneratedStatus
  createdAt: string
}

// ─── Seed data ────────────────────────────────────────────────────────────────

export const SEED_GENERATED_SCREENS: GeneratedEntry[] = [
  {
    id: "gen-1",
    title: "Jackpot Discovery Page",
    prompt: "Design a jackpot discovery page",
    detectedPattern: "Jackpot Discovery",
    componentsUsed: ["JackpotSection", "JackpotCard", "NumberTicker", "SectionHeader"],
    status: "preview",
    createdAt: "2026-03-16T10:05:00Z",
  },
]
