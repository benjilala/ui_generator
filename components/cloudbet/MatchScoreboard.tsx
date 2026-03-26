'use client'

import * as React from 'react'
import { Circle } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface MatchStat {
  type: 'corners' | 'yellow-card' | 'red-card'
  home: number
  away: number
}

export interface MatchScoreboardProps {
  homeTeam: string
  awayTeam: string
  homeIcon?: string
  awayIcon?: string
  clock: string
  isLive?: boolean
  periodScores: [number, number][]
  totalScore: [number, number]
  stats?: MatchStat[]
  className?: string
}

function CornersIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-3 shrink-0 text-cb-foreground', className)}
      aria-hidden
    >
      <path
        d="M2 2h3v1.5H3.5V5H2V2z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M7 2h3v3H8.5V3.5H7V2z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeDasharray="2 1"
      />
    </svg>
  )
}

function LivePulse() {
  return (
    <span className="relative flex size-3 items-center justify-center" aria-hidden>
      <span className="absolute inline-flex size-2 animate-ping rounded-full bg-emerald-400/70 opacity-75" />
      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
    </span>
  )
}

function MutedScoreCell({
  value,
  position,
}: {
  value: number
  position: 'top' | 'bottom'
}) {
  const rounded =
    position === 'top'
      ? 'rounded-t-[4.5px] rounded-b-[1.5px]'
      : 'rounded-b-[4.5px] rounded-t-[1.5px]'
  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col items-center justify-center px-0.5',
        rounded,
      )}
    >
      <span className="w-[15px] text-center text-xs font-medium leading-snug text-cb-foreground-muted tabular-nums">
        {value}
      </span>
    </div>
  )
}

function GoalScoreCell({
  value,
  position,
}: {
  value: number
  position: 'top' | 'bottom'
}) {
  const rounded =
    position === 'top'
      ? 'rounded-t-[4.5px] rounded-b-[1.5px]'
      : 'rounded-b-[4.5px] rounded-t-[1.5px]'
  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col items-center justify-center bg-cb-surface-2 px-0.5',
        rounded,
      )}
    >
      <span className="w-[15px] text-center text-[13.5px] font-bold uppercase leading-tight tracking-tight text-cb-foreground tabular-nums">
        {value}
      </span>
    </div>
  )
}

function StatColumn({
  home,
  away,
  isGoals,
}: {
  home: number
  away: number
  isGoals: boolean
}) {
  return (
    <div className="flex h-[52px] w-[21px] shrink-0 flex-col gap-0.5">
      {isGoals ? (
        <>
          <GoalScoreCell value={home} position="top" />
          <GoalScoreCell value={away} position="bottom" />
        </>
      ) : (
        <>
          <MutedScoreCell value={home} position="top" />
          <MutedScoreCell value={away} position="bottom" />
        </>
      )}
    </div>
  )
}

export function MatchScoreboard({
  homeTeam,
  awayTeam,
  homeIcon,
  awayIcon,
  clock,
  isLive = false,
  periodScores,
  totalScore,
  stats,
  className,
}: MatchScoreboardProps) {
  const fromStats =
    stats && stats.length >= 3
      ? stats.slice(0, 3).map((s) => [s.home, s.away] as [number, number])
      : null
  const periods = fromStats ?? periodScores.slice(0, 3)
  const padded = [...periods]
  while (padded.length < 3) {
    padded.push([0, 0])
  }

  return (
    <div
      data-slot="match-scoreboard"
      role="group"
      aria-label={`${homeTeam} versus ${awayTeam}, ${clock}`}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-cb-border bg-cb-surface-0',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.11]"
        aria-hidden
      >
        <div
          className="absolute -left-[120%] -top-[140%] h-[200%] w-[140%] rotate-[-4deg] bg-[radial-gradient(ellipse_at_center,var(--cb-brand-purple)_0%,transparent_55%)] blur-3xl"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(163.8deg, transparent 19%, var(--cb-surface-0) 48%)',
          }}
        />
      </div>

      <div className="relative z-10 px-3 pb-3 pt-2.5">
        <div className="mb-1 flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {isLive ? <LivePulse /> : null}
            <span
              className={cn(
                'text-[10.67px] font-medium leading-snug',
                isLive ? 'text-cb-purple-50' : 'text-cb-foreground-muted',
              )}
            >
              {clock}
            </span>
          </div>
          <div className="flex items-center gap-2 pr-0.5">
            <CornersIcon />
            <span
              className="h-[9px] w-[7px] shrink-0 rounded-sm bg-[#F7FB12]"
              aria-hidden
            />
            <span
              className="h-[9px] w-[7px] shrink-0 rounded-sm bg-[#E00501]"
              aria-hidden
            />
            <Circle
              className="size-3 shrink-0 text-cb-foreground-muted"
              strokeWidth={1.5}
              aria-hidden
            />
          </div>
        </div>

        <div className="flex items-stretch justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <div className="flex size-[15px] shrink-0 items-center justify-center overflow-hidden rounded-sm bg-cb-surface-2">
                {homeIcon ? (
                  <img
                    src={homeIcon}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="text-[8px] font-bold text-cb-foreground-muted">
                    {homeTeam.slice(0, 1)}
                  </span>
                )}
              </div>
              <span className="truncate text-xs font-medium leading-snug text-cb-foreground">
                {homeTeam}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex size-[15px] shrink-0 items-center justify-center overflow-hidden rounded-sm bg-cb-surface-2">
                {awayIcon ? (
                  <img
                    src={awayIcon}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="text-[8px] font-bold text-cb-foreground-muted">
                    {awayTeam.slice(0, 1)}
                  </span>
                )}
              </div>
              <span className="truncate text-xs font-medium leading-snug text-cb-foreground">
                {awayTeam}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-stretch gap-0.5">
            {padded.map(([h, a], i) => (
              <StatColumn key={i} home={h} away={a} isGoals={false} />
            ))}
            <StatColumn
              home={totalScore[0]}
              away={totalScore[1]}
              isGoals
            />
          </div>
        </div>
      </div>
    </div>
  )
}
