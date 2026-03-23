'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { THEMES, useTheme } from '@/components/providers/ThemeProvider'
import { ThemeLogo } from '@/components/cloudbet/ThemeLogo'
import { Button } from '@/components/ui/button'

const ACCENT = '#7B3FBF'
const LOYALTY_GRADIENT = 'linear-gradient(135deg, #7B3FBF 0%, #4A1A8A 100%)'

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
            'overflow-hidden rounded-2xl shadow-sm',
            isLight ? 'bg-white' : 'bg-[#111111]',
          )}
        >
          <a
            href="https://www.cloudbet.com/?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
            className={cn(
              'block px-3 py-3 text-left',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <Image
              src="/cloudbet-sidebar-mark.png"
              alt="Cloudbet"
              width={55}
              height={33}
              className="h-[33px] w-[55px] shrink-0 object-contain"
              priority
            />
          </a>

          <div
            className={cn(
              'px-6 pt-8',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <span
              className={cn(
                'inline-block rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]',
                isLight
                  ? 'bg-[#F3EDFF] text-[#7B3FBF]'
                  : 'bg-[#2A1A3E] text-[#C49BFF]',
              )}
            >
              Platinum
            </span>
            <h1
              className={cn(
                'mt-4 text-[30px] font-extrabold leading-9 tracking-tight',
                isLight ? 'text-[#111111]' : 'text-white',
              )}
            >
              Because you play Sweet Bonanza
            </h1>
            <p
              className={cn(
                'mt-2 pb-7 text-base leading-6',
                isLight ? 'text-[#6B7280]' : 'text-[#AAAAAA]',
              )}
            >
              You like Pragmatic Play. Here&apos;s what else you should be playing.
            </p>
          </div>

          <div
            className={cn(
              'space-y-3 px-3 pb-2',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <RecCard isLight={isLight} showTag tag="Top pick">
              <h2
                className={cn(
                  'text-lg font-bold',
                  isLight ? 'text-[#111111]' : 'text-white',
                )}
              >
                Sugar Rush 1000
              </h2>
              <p
                className={cn(
                  'mt-1.5 text-sm leading-5',
                  isLight ? 'text-[#6B7280]' : 'text-[#999999]',
                )}
              >
                Same Pragmatic Play engine as your go-to, but with a multiplier grid
                that stacks up to 1,000x. High volatility, candy theme, massive ceiling.
              </p>
              <PlayLink href="https://www.cloudbet.com/en/casino/play/sugar-rush-1000?utm_source=email&utm_medium=casino&utm_campaign=game-recs" />
            </RecCard>

            <RecCard isLight={isLight}>
              <h2
                className={cn(
                  'text-lg font-bold',
                  isLight ? 'text-[#111111]' : 'text-white',
                )}
              >
                Fruit Party 2
              </h2>
              <p
                className={cn(
                  'mt-1.5 text-sm leading-5',
                  isLight ? 'text-[#6B7280]' : 'text-[#999999]',
                )}
              >
                Cluster pays with random multipliers on every spin. If you like Sweet
                Bonanza&apos;s tumble mechanic, this is its wilder cousin. 96.53% RTP.
              </p>
              <PlayLink href="https://www.cloudbet.com/en/casino/play/fruit-party-2?utm_source=email&utm_medium=casino&utm_campaign=game-recs" />
            </RecCard>

            <RecCard isLight={isLight}>
              <h2
                className={cn(
                  'text-lg font-bold',
                  isLight ? 'text-[#111111]' : 'text-white',
                )}
              >
                Gates of Olympus 1000
              </h2>
              <p
                className={cn(
                  'mt-1.5 text-sm leading-5',
                  isLight ? 'text-[#6B7280]' : 'text-[#999999]',
                )}
              >
                Different theme, same DNA. Pragmatic&apos;s scatter-pays system with
                multiplier orbs that can hit 500x in a single free spin round.
              </p>
              <PlayLink href="https://www.cloudbet.com/en/casino/play/gates-of-olympus-1000?utm_source=email&utm_medium=casino&utm_campaign=game-recs" />
            </RecCard>
          </div>

          <div
            className={cn(
              'px-8 pb-2 pt-5',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <p
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ color: ACCENT }}
            >
              Your go-to
            </p>
            <div
              className={cn(
                'flex h-[200px] flex-col items-center justify-center rounded-xl border-2 border-dashed',
                isLight
                  ? 'border-[#E5E7EB] bg-[#F9FAFB]'
                  : 'border-[#2A2A2A] bg-[#1A1A1A]',
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

          <div
            className={cn(
              'px-8 py-6',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <div
              className={cn(
                'flex flex-row overflow-hidden rounded-xl border divide-x divide-y-0',
                isLight
                  ? 'border-[#E5E7EB] divide-[#E5E7EB]'
                  : 'border-[#2A2A2A] bg-[#1A1A1A] divide-[#2A2A2A]',
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
          </div>

          <div className={cn('px-8 pb-6', isLight ? 'bg-white' : 'bg-[#111111]')}>
            <div
              className="rounded-xl px-6 py-5 text-sm font-semibold text-white"
              style={{ background: LOYALTY_GRADIENT }}
            >
              82% to Diamond — every spin counts.
            </div>
          </div>

          <div
            className={cn(
              'flex justify-center px-3 pt-8 pb-8',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <Button variant="default" size="default" asChild className="px-10">
              <a
                href="https://www.cloudbet.com/en/casino?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
                className="no-underline"
              >
                Explore Casino
              </a>
            </Button>
          </div>
        </article>

        <footer className="mx-auto w-full max-w-full px-3 pb-10 pt-6 text-center">
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
  showTag,
  tag,
  children,
}: {
  isLight: boolean
  showTag?: boolean
  tag?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-xl p-6',
        isLight
          ? 'border border-[#EEEEEE] bg-[#FAFAFA]'
          : 'border-0 bg-[#1A1A1A]',
      )}
    >
      {showTag && tag && (
        <span
          className={cn(
            'mb-2 inline-block rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide',
            isLight
              ? 'bg-[#F3EDFF] text-[#7B3FBF]'
              : 'bg-[#2A1A3E] text-[#C49BFF]',
          )}
        >
          {tag}
        </span>
      )}
      {children}
    </div>
  )
}

function PlayLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="mt-3 inline-block text-[13px] font-bold no-underline"
      style={{ color: ACCENT }}
    >
      Play now →
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
    <div className="flex w-1/3 min-w-0 flex-col items-center px-5 py-4 text-center">
      <p
        className={cn(
          'mb-1 text-[10px] font-semibold uppercase tracking-wide',
          isLight ? 'text-[#999999]' : 'text-[#888888]',
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'font-bold',
          largeValue ? 'text-xl' : 'text-[15px]',
          accentValue
            ? ''
            : isLight
              ? 'text-[#111111]'
              : 'text-white',
        )}
        style={accentValue ? { color: ACCENT } : undefined}
      >
        {value}
      </p>
    </div>
  )
}
