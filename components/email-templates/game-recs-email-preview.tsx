'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { THEMES, useTheme } from '@/components/providers/ThemeProvider'

const LOYALTY_PURPLE = '#7B3FBF'
const LIME_CTA = '#DFFD51'
const FIGMA_CARD = '#1A1A1A'
const FIGMA_LINK = '#C4B5FD'
const FIGMA_SECTION_LABEL = '#C49BFF'
const FIGMA_STAT_RULE = '#363636'

export function GameRecsEmailPreview() {
  const { theme } = useTheme()
  const isLight = THEMES.find((t) => t.id === theme)?.isLight ?? false

  const playLink = isLight ? '#7B3FBF' : FIGMA_LINK
  const sectionTitle = isLight ? '#7B3FBF' : FIGMA_SECTION_LABEL

  return (
    <div
      className={cn(
        'min-w-0 font-sans antialiased',
        isLight ? 'bg-[#F0F0F3]' : 'bg-[#111111]',
      )}
    >
      <span className="sr-only">
        Sweet Bonanza fan? We found your next obsession.
      </span>

      <div className="mx-auto w-full max-w-[600px] px-0">
        <article
          className={cn(
            '@container overflow-hidden',
            isLight ? 'rounded-2xl bg-white' : 'rounded-none bg-[#111111]',
          )}
        >
          <header
            className={cn(
              'flex items-center justify-between gap-3 px-4 py-3',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <a
              href="https://www.cloudbet.com/?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
              className="flex shrink-0 items-center"
            >
              <img
                src="/email/cloudbet-wordmark-purple.png"
                alt="Cloudbet"
                width={704}
                height={59}
                className="block h-5 w-auto max-w-[min(235px,70vw)] object-contain object-left"
              />
            </a>
            <img
              src="/email/loyalty-tier-4-badge.png"
              alt="Loyalty tier 4"
              width={234}
              height={234}
              className="size-[72px] shrink-0 object-contain sm:size-[78px]"
            />
          </header>

          <div className={cn('px-[35px] pt-5', isLight ? 'bg-white' : 'bg-[#111111]')}>
            <h1
              className={cn(
                'text-[28px] font-bold leading-9 tracking-[-0.3545px]',
                isLight ? 'text-[#111111]' : 'text-white',
              )}
            >
              Because you play Sweet Bonanza
            </h1>
            <p
              className={cn(
                'mt-2 pb-7 text-[15px] font-normal leading-6 tracking-[-0.3125px]',
                isLight ? 'text-[#6B7280]' : 'text-[#AAAAAA]',
              )}
            >
              You like Pragmatic Play. Here&apos;s what else you should be playing.
            </p>
          </div>

          <div
            className={cn(
              'flex flex-col gap-4 px-3 pb-2',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <RecCard
              isLight={isLight}
              playLink={playLink}
              title="Sugar Rush 1000"
              desc="Same Pragmatic Play engine as your go-to, but with a multiplier grid that stacks up to 1,000x."
              href="https://www.cloudbet.com/en/casino/play/sugar-rush-1000?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
            />
            <RecCard
              isLight={isLight}
              playLink={playLink}
              title="Fruit Party 2"
              desc="Cluster pays with random multipliers on every spin. If you like Sweet Bonanza&apos;s tumble mechanic, this is its wilder cousin. 96.53% RTP."
              href="https://www.cloudbet.com/en/casino/play/fruit-party-2?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
            />
            <RecCard
              isLight={isLight}
              playLink={playLink}
              title="Gates of Olympus 1000"
              desc="Different theme, same DNA. Pragmatic&apos;s scatter-pays system with multiplier orbs that can hit 500x in a single free spin round."
              href="https://www.cloudbet.com/en/casino/play/gates-of-olympus-1000?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
            />
          </div>

          <div
            className={cn(
              'px-3 pb-5 pt-5',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <p
              className="mb-3 text-[11px] font-bold uppercase leading-[16.5px] tracking-[1.5645px]"
              style={{ color: sectionTitle }}
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
                  'text-center text-sm font-semibold leading-5 tracking-[-0.1504px]',
                  isLight ? 'text-[#9CA3AF]' : 'text-[#666666]',
                )}
              >
                Game image
              </span>
              <span
                className={cn(
                  'mt-1 text-center text-xs leading-4',
                  isLight ? 'text-[#D1D5DB]' : 'text-[#555555]',
                )}
              >
                Placeholder
              </span>
            </div>
          </div>

          <div
            className={cn(
              'px-3 pb-6 pt-2',
              isLight ? 'bg-white' : 'bg-[#111111]',
            )}
          >
            <div
              className={cn(
                'flex flex-col @[520px]:flex-row',
                isLight ? 'divide-[#E5E7EB]' : '',
              )}
            >
              <StatCell
                isLight={isLight}
                label="Biggest Win"
                value="€2,450"
                largeValue
                borderColor={isLight ? '#E5E7EB' : FIGMA_STAT_RULE}
              />
              <StatCell
                isLight={isLight}
                label="Top Studio"
                value="Pragmatic Play"
                borderColor={isLight ? '#E5E7EB' : FIGMA_STAT_RULE}
              />
              <StatCell
                isLight={isLight}
                label="Status"
                value="PLATINUM"
                accentValue
                borderColor={isLight ? '#E5E7EB' : FIGMA_STAT_RULE}
                isLast
              />
            </div>
          </div>

          <div className={cn('px-3 pb-8', isLight ? 'bg-white' : 'bg-[#111111]')}>
            <div
              className="flex flex-col gap-4 rounded-[20px] px-6 pb-6 pt-6 @[520px]:flex-row @[520px]:items-center @[520px]:justify-between"
              style={{ backgroundColor: LOYALTY_PURPLE }}
            >
              <p className="text-center text-sm font-medium leading-[20.3px] tracking-[-0.1504px] text-white @[520px]:text-left">
                82% to Diamond — every spin counts.
              </p>
              <div className="flex justify-center @[520px]:shrink-0 @[520px]:justify-end">
                <a
                  href="https://www.cloudbet.com/en/casino?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
                  className="inline-flex h-10 min-w-[150px] items-center justify-center rounded-full px-6 text-sm font-bold leading-5 tracking-[-0.1504px] text-black no-underline"
                  style={{ backgroundColor: LIME_CTA }}
                >
                  Explore Casino
                </a>
              </div>
            </div>
          </div>
        </article>

        <footer className="mx-auto w-full max-w-[600px] px-3 pb-10 pt-6 text-center">
          <a
            href="https://www.cloudbet.com/?utm_source=email&utm_medium=casino&utm_campaign=game-recs"
            className="inline-block"
          >
            <img
              src="/cloudbet-logo.svg"
              alt="Cloudbet"
              width={51}
              height={24}
              className="mx-auto h-6 w-auto max-w-[100px] opacity-90"
            />
          </a>
          <p
            className={cn(
              'mt-3 text-xs leading-[18px]',
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
              'mt-2 text-[11px] leading-[16.5px] tracking-[0.0645px]',
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
  playLink,
  title,
  desc,
  href,
}: {
  isLight: boolean
  playLink: string
  title: string
  desc: string
  href: string
}) {
  const thumbBg = isLight ? '#E5E7EB' : '#252525'
  const titleColor = isLight ? '#111111' : '#DFE0E1'
  const descColor = isLight ? '#6B7280' : '#9CA3AF'

  return (
    <div
      className={cn(
        'min-h-[136px] rounded-xl p-3',
        isLight ? 'border border-[#EEEEEE] bg-[#FAFAFA]' : 'border-0',
      )}
      style={!isLight ? { backgroundColor: FIGMA_CARD } : undefined}
    >
      <div className="grid min-h-[112px] grid-cols-[112px_1fr] gap-4">
        <div
          className="h-full min-h-[112px] w-[112px] shrink-0 rounded-[14px]"
          style={{ backgroundColor: thumbBg }}
          aria-hidden
        />
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2
              className="text-[18px] font-bold leading-[22.5px]"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            <p
              className="text-[13px] font-normal leading-[18.85px] tracking-[-0.0762px]"
              style={{ color: descColor }}
            >
              {desc}
            </p>
          </div>
          <a
            href={href}
            className="inline-block text-[14px] font-medium leading-5 tracking-[-0.1504px] no-underline"
            style={{ color: playLink }}
          >
            Play now →
          </a>
        </div>
      </div>
    </div>
  )
}

function StatCell({
  isLight,
  label,
  value,
  largeValue,
  accentValue,
  borderColor,
  isLast,
}: {
  isLight: boolean
  label: string
  value: string
  largeValue?: boolean
  accentValue?: boolean
  borderColor: string
  isLast?: boolean
}) {
  const labelColor = isLight ? '#6B7280' : '#9CA3AF'
  const valueColor = isLight ? '#111111' : '#FFFFFF'

  return (
    <div
      className={cn(
        'flex h-[69px] flex-col items-center justify-center gap-2 border-solid px-4 text-center @[520px]:w-1/3',
        !isLast && 'border-b @[520px]:border-b-0 @[520px]:border-r',
      )}
      style={{ borderColor }}
    >
      <p
        className="text-[9px] font-bold uppercase leading-[13.5px] tracking-[1.427px]"
        style={{ color: labelColor }}
      >
        {label}
      </p>
      <p
        className={cn(
          'text-center font-bold',
          largeValue
            ? 'text-xl font-extrabold leading-[25px] tracking-[-0.4492px]'
            : 'text-base leading-5 tracking-[-0.3125px]',
        )}
        style={{
          color: accentValue ? LOYALTY_PURPLE : valueColor,
        }}
      >
        {value}
      </p>
    </div>
  )
}
