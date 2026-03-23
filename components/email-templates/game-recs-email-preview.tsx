'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { THEMES, useTheme } from '@/components/providers/ThemeProvider'
import { ThemeLogo } from '@/components/cloudbet/ThemeLogo'
const ACCENT = '#7B3FBF'
const BANNER_PURPLE = '#7B3FBF'
const LIME_CTA = '#DFFD51'
const REC_LINK_LAVENDER = '#C4B5FD'

export function GameRecsEmailPreview() {
  const { theme } = useTheme()
  const isLight = THEMES.find((t) => t.id === theme)?.isLight ?? false

  return (
    <div
      className={cn(
        'min-w-0 font-sans',
        isLight ? 'bg-[#F0F0F3]' : 'bg-[#0A0A0A]',
      )}
    >
      <span className="sr-only">
        Sweet Bonanza fan? We found your next obsession.
      </span>

      <div className="mx-auto w-full max-w-full px-0">
        <article
          className={cn(
            'overflow-hidden rounded-t-2xl rounded-b-none shadow-sm',
            isLight ? 'bg-white' : 'bg-[#111111]',
          )}
        >
          <div
            className={cn(
              'flex items-start justify-between gap-3 px-3 pt-3',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <a
              href="https://www.cloudbet.com/?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
              className="shrink-0"
            >
              <Image
                src="/cloudbet-logo-wordmark.png"
                alt="Cloudbet"
                width={235}
                height={20}
                className="h-5 w-auto max-w-[200px] object-contain object-left"
                priority
              />
            </a>
            <span
              className={cn(
                'shrink-0 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]',
                isLight
                  ? 'bg-[#F3EDFF] text-[#7B3FBF]'
                  : 'bg-[#2A1A3E] text-[#C49BFF]',
              )}
            >
              Platinum
            </span>
          </div>

          <div
            className={cn(
              'px-3 pb-7 pt-8',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <h1
              className={cn(
                'px-2 text-[30px] font-extrabold leading-9 tracking-tight',
                isLight ? 'text-[#111111]' : 'text-white',
              )}
            >
              Because you play Sweet Bonanza
            </h1>
            <p
              className={cn(
                'mt-2 px-2 text-base leading-6',
                isLight ? 'text-[#6B7280]' : 'text-[#AAAAAA]',
              )}
            >
              You like Pragmatic Play. Here&apos;s what else you should be playing.
            </p>
          </div>

          <div
            className={cn(
              'space-y-4 px-3 pb-2',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <RecCard isLight={isLight} showTopPick>
              <h2>Sugar Rush 1000</h2>
              <p>
                Same Pragmatic Play engine as your go-to, but with a multiplier grid
                that stacks up to 1,000x.
              </p>
              <PlayLink
                isLight={isLight}
                href="https://www.cloudbet.com/en/casino/play/sugar-rush-1000?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
              />
            </RecCard>

            <RecCard isLight={isLight}>
              <h2>Fruit Party 2</h2>
              <p>
                Cluster pays with random multipliers on every spin. If you like Sweet
                Bonanza&apos;s tumble mechanic, this is its wilder cousin. 96.53% RTP.
              </p>
              <PlayLink
                isLight={isLight}
                href="https://www.cloudbet.com/en/casino/play/fruit-party-2?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
              />
            </RecCard>

            <RecCard isLight={isLight}>
              <h2>Gates of Olympus 1000</h2>
              <p>
                Different theme, same DNA. Pragmatic&apos;s scatter-pays system with
                multiplier orbs that can hit 500x in a single free spin round.
              </p>
              <PlayLink
                isLight={isLight}
                href="https://www.cloudbet.com/en/casino/play/gates-of-olympus-1000?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
              />
            </RecCard>
          </div>

          <div
            className={cn(
              'flex flex-col gap-3 px-3 pb-5 pt-5',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ color: isLight ? ACCENT : '#C49BFF' }}
            >
              Your go-to
            </p>
            <div
              className={cn(
                'flex h-[200px] flex-col items-center justify-center rounded-xl',
                isLight ? 'bg-[#F3F4F6]' : 'bg-[#252525]',
              )}
            >
              <span
                className={cn(
                  'text-sm font-semibold',
                  isLight ? 'text-[#9CA3AF]' : 'text-[#666666]',
                )}
              >
                Game image
              </span>
              <span
                className={cn(
                  'mt-1 text-xs',
                  isLight ? 'text-[#D1D5DB]' : 'text-[#555555]',
                )}
              >
                Placeholder
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6 px-3 pb-8 pt-2">
            <div
              className={cn(
                'flex flex-row divide-x',
                isLight ? 'divide-[#E5E7EB]' : 'divide-[#363636]',
              )}
            >
              <StatCell
                isLight={isLight}
                label="Biggest Win"
                value="€2,450"
                largeValue
              />
              <StatCell isLight={isLight} label="Top Studio" value="Pragmatic Play" />
              <StatCell
                isLight={isLight}
                label="Status"
                value="PLATINUM"
                accentValue
              />
            </div>

            <div
              className="flex flex-col gap-4 rounded-[20px] p-6 sm:flex-row sm:items-center sm:justify-between"
              style={{ backgroundColor: BANNER_PURPLE }}
            >
              <p
                className={cn(
                  'min-w-0 flex-1 text-sm font-medium leading-snug text-white',
                )}
              >
                82% to Diamond — every spin counts.
              </p>
              <a
                href="https://www.cloudbet.com/en/casino?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-full px-6 text-sm font-bold leading-none text-black no-underline transition-opacity hover:opacity-95"
                style={{ backgroundColor: LIME_CTA }}
              >
                Explore Casino
              </a>
            </div>
          </div>
        </article>

        <footer className="mx-auto w-full max-w-full bg-[#111111] px-3 pb-10 pt-6 text-center">
          <a
            href="https://www.cloudbet.com/?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
            className="inline-block"
          >
            <ThemeLogo className="mx-auto h-[12.8px] w-auto opacity-90" />
          </a>
          <p
            className={cn(
              'mt-3 text-xs leading-relaxed',
              isLight ? 'text-[#9CA3AF]' : 'text-[#666666]',
            )}
          >
            You&apos;re getting this because you play casino games on Cloudbet.
            <br />
            <a
              href="#unsub"
              className={cn(
                'underline',
                isLight ? 'text-[#9CA3AF]' : 'text-[#666666]',
              )}
            >
              Unsubscribe
            </a>{' '}
            |{' '}
            <a
              href="#prefs"
              className={cn(
                'underline',
                isLight ? 'text-[#9CA3AF]' : 'text-[#666666]',
              )}
            >
              Preferences
            </a>
          </p>
          <p
            className={cn(
              'mt-2 text-[11px]',
              isLight ? 'text-[#CCCCCC]' : 'text-[#555555]',
            )}
          >
            © 2026 Cloudbet. Play responsibly. 18+
          </p>
        </footer>
      </div>
    </div>
  )
}

function RecCard({
  isLight,
  showTopPick,
  children,
}: {
  isLight: boolean
  showTopPick?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'relative flex flex-row gap-4 rounded-[12px] p-3',
        isLight
          ? 'border border-[#E8E8EB] bg-[#FAFAFA]'
          : 'border-0 bg-[#1A1A1A]',
      )}
    >
      {showTopPick ? (
        <span
          className={cn(
            'absolute right-3 top-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.09em]',
            isLight
              ? 'bg-[#EDE9F7] text-[#5B3D7A]'
              : 'bg-[#2A1A3E] text-[#C49BFF]',
          )}
        >
          Top pick
        </span>
      ) : null}
      <div
        className={cn(
          'w-[112px] min-h-[112px] shrink-0 self-stretch rounded-[14px]',
          isLight ? 'bg-[#E5E7EB]' : 'bg-[#252525]',
        )}
        aria-hidden
      />
      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col',
          showTopPick ? 'pr-14' : '',
          '[&>h2]:mt-0 [&>h2]:text-base [&>h2]:font-bold [&>h2]:leading-tight [&>h2]:tracking-tight sm:[&>h2]:text-[18px]',
          isLight ? '[&>h2]:text-[#111111]' : '[&>h2]:text-[#DFE0E1]',
          '[&>p]:mt-1 [&>p]:text-[13px] [&>p]:font-normal [&>p]:leading-snug',
          isLight ? '[&>p]:text-[#6B7280]' : '[&>p]:text-[#9CA3AF]',
          '[&>a]:mt-3',
        )}
      >
        {children}
      </div>
    </div>
  )
}

function PlayLink({ href, isLight }: { href: string; isLight: boolean }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium no-underline"
      style={{ color: isLight ? ACCENT : REC_LINK_LAVENDER }}
    >
      Play now
      <span className="text-[1.05em] leading-none" aria-hidden>
        →
      </span>
    </a>
  )
}

function StatCell({
  isLight,
  label,
  value,
  largeValue,
  accentValue,
}: {
  isLight: boolean
  label: string
  value: string
  largeValue?: boolean
  accentValue?: boolean
}) {
  return (
    <div className="flex w-1/3 min-w-0 flex-col items-center gap-2 px-4 py-4 text-center sm:px-4">
      <p
        className={cn(
          'text-[9px] font-bold uppercase tracking-[0.14em]',
          isLight ? 'text-[#6B7280]' : 'text-[#9CA3AF]',
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'leading-tight',
          largeValue ? 'text-xl font-extrabold' : 'text-base font-bold',
          accentValue
            ? ''
            : isLight
              ? 'text-[#111111]'
              : 'text-white',
        )}
        style={accentValue ? { color: BANNER_PURPLE } : undefined}
      >
        {value}
      </p>
    </div>
  )
}
