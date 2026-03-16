import type { GeneratedEntry, PatternKey } from "./generated-screens"

// ─── Pattern definitions ──────────────────────────────────────────────────────

interface PatternDefinition {
  pattern: PatternKey
  keywords: string[]
  components: string[]
  titleTemplate: (prompt: string) => string
}

const PATTERN_DEFINITIONS: PatternDefinition[] = [
  {
    pattern: "VIP Lobby",
    keywords: ["vip", "loyalty", "tier", "exclusive", "premium", "cashback"],
    components: ["JackpotCard", "SectionHeader", "FeedSectionShell", "StudioRail"],
    titleTemplate: () => "VIP Lobby",
  },
  {
    pattern: "Jackpot Discovery",
    keywords: ["jackpot", "mega", "progressive", "prize", "million", "pool"],
    components: ["JackpotSection", "JackpotCard", "NumberTicker", "SectionHeader"],
    titleTemplate: () => "Jackpot Discovery",
  },
  {
    pattern: "Sportsbook Home",
    keywords: ["sportsbook", "sport", "odds", "bet", "match", "market", "football", "soccer", "basketball", "tennis"],
    components: ["OddsButton", "FeedSectionShell", "SectionHeader"],
    titleTemplate: () => "Sportsbook Home",
  },
  {
    pattern: "Bet Placement Flow",
    keywords: ["bet slip", "place bet", "betslip", "confirm", "stake", "wager", "feedback", "placement"],
    components: ["OddsButton", "SectionHeader"],
    titleTemplate: () => "Bet Placement Flow",
  },
  {
    pattern: "Casino Lobby",
    keywords: ["casino", "lobby", "slots", "games", "live", "table", "roulette", "blackjack", "baccarat", "featured"],
    components: ["HeroCarousel", "CategoryChipGroup", "GameGrid", "JackpotSection", "FeedSectionShell"],
    titleTemplate: () => "Casino Lobby",
  },
]

const FALLBACK: PatternDefinition = {
  pattern: "Generic Screen",
  keywords: [],
  components: ["SectionHeader", "GameTile"],
  titleTemplate: () => "Generated Screen",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function matchPattern(prompt: string): PatternDefinition {
  const lower = prompt.toLowerCase()
  let bestMatch: PatternDefinition | null = null
  let bestScore = 0

  for (const def of PATTERN_DEFINITIONS) {
    const score = def.keywords.filter((kw) => lower.includes(kw)).length
    if (score > bestScore) {
      bestScore = score
      bestMatch = def
    }
  }

  return bestMatch ?? FALLBACK
}

function deriveTitle(prompt: string, pattern: PatternKey): string {
  const trimmed = prompt.trim()
  // Capitalise first letter and strip trailing punctuation for a clean title
  const cleaned = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).replace(/[.!?]+$/, "")
  // If the prompt is very short or generic, use the pattern name
  if (cleaned.split(" ").length <= 2) return pattern
  // Truncate long prompts to ~40 chars
  return cleaned.length > 40 ? cleaned.slice(0, 37) + "…" : cleaned
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function interpretPrompt(prompt: string): Omit<GeneratedEntry, "id" | "createdAt"> {
  const def = matchPattern(prompt)
  return {
    title: deriveTitle(prompt, def.pattern),
    prompt: prompt.trim(),
    detectedPattern: def.pattern,
    componentsUsed: def.components,
    status: "preview",
  }
}
