import Link from 'next/link'
import { LabPageHeader } from '@/components/patterns/lab-page-header'
import { MatchScoreboard } from '@/components/cloudbet/MatchScoreboard'
import type { MatchStat } from '@/components/cloudbet/MatchScoreboard'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'

export const metadata = {
  title: 'Sportsbook — Cloudbet UI Lab',
}

const LIVE_MATCH_STATS: MatchStat[] = [
  { type: 'corners', home: 0, away: 1 },
  { type: 'yellow-card', home: 0, away: 0 },
  { type: 'red-card', home: 2, away: 0 },
]

const PREMATCH_PERIODS: [number, number][] = [
  [0, 0],
  [0, 0],
  [0, 0],
]

export default function SportsbookPage() {
  return (
    <div className="min-h-screen bg-cb-surface-1">
      <LabPageHeader title="Sportsbook" trailing={<ThemeSwitcher />} />
      <main className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="mb-1 text-sm font-semibold text-cb-foreground">
            Match scoreboard
          </h2>
          <p className="mb-6 max-w-xl text-xs text-cb-foreground-muted leading-relaxed">
            Live event header from Figma (BALI Playground). Corners, cards, and goals
            align to column headers.
          </p>
          <div className="grid max-w-[320px] gap-6 sm:max-w-[360px]">
            <MatchScoreboard
              homeTeam="Arsenal"
              awayTeam="Chelsea"
              clock="05:24"
              isLive
              periodScores={[[0, 0], [0, 0], [0, 0]]}
              totalScore={[2, 0]}
              stats={LIVE_MATCH_STATS}
            />
            <MatchScoreboard
              homeTeam="Man City"
              awayTeam="Liverpool"
              clock="20:00"
              isLive={false}
              periodScores={PREMATCH_PERIODS}
              totalScore={[0, 0]}
            />
          </div>
        </section>

        <PlaceholderScreen
          area="Sportsbook"
          description="Event listings, market rows, odds buttons, bet slip, and live score integration."
          plannedComponents={[
            'MarketRow',
            'OddsButton',
            'BetSlip',
            'LiveScore',
            'EventCard',
            'MatchHeader',
          ]}
        />
      </main>
    </div>
  )
}

function PlaceholderScreen({
  area,
  description,
  plannedComponents,
}: {
  area: string
  description: string
  plannedComponents: string[]
}) {
  const unique = [...new Set(plannedComponents)]
  return (
    <div className="flex flex-col items-center gap-6 border-t border-cb-border pt-12 text-center">
      <Badge
        variant="outline"
        className="border-cb-border text-cb-foreground-muted text-[10px] uppercase tracking-widest"
      >
        Coming Soon
      </Badge>
      <h1 className="text-3xl font-bold text-cb-foreground">{area}</h1>
      <p className="max-w-md text-sm leading-relaxed text-cb-foreground-muted">
        {description}
      </p>
      <div className="flex max-w-sm flex-wrap justify-center gap-2">
        {unique.map((c) => (
          <span
            key={c}
            className="rounded border border-cb-border bg-cb-surface-3 px-2 py-1 font-mono text-xs text-cb-foreground-disabled"
          >
            {c}
          </span>
        ))}
      </div>
      <Link
        href="/"
        className="mt-4 text-sm text-cb-purple-50 transition-colors hover:text-cb-purple-50/80"
      >
        ← Back to Lab
      </Link>
    </div>
  )
}
