/**
 * Cloudbet token helpers
 *
 * This file provides typed token maps and reusable token references for:
 * - CVA variant definitions (e.g. surface level → Tailwind class)
 * - Consistent use of Cloudbet utility classes across components
 * - A single source of truth for token-to-class mappings
 *
 * It is NOT a simple mirror of CSS variable names.
 * Use these maps in component files instead of hardcoding token strings.
 *
 * Token values verified against Cloudbet Design System Figma (2026-03-16):
 *   - Background (below all surfaces): #141114
 *   - Surface hue: 309–310° (blue-purple)
 *   - Primary purple (CDS "secondary"): oklch(0.542 0.207 299) = #8346D4
 *   - on-secondary / primary-fg: #F8F2FF
 *   - Lime (CDS "primary" / shadcn accent): oklch(0.942 0.192 119) = #DFFD51
 *   - Foreground: #E0E0E0 / #C4C4C4 / #A6A6A6 / #8F8F8F / #696969
 *   - Gold/jackpot: #F8A631
 *   - Success green (corrected): oklch(0.68 0.13 154) = #55A370
 *   - Warning (corrected): oklch(0.62 0.12 75) = #B28809
 *   - Info blue: oklch(0.62 0.18 255) = #6981FA
 *   - Display font: midnightSansST (weight 800 only, proprietary)
 */

// ─── Surface scale ────────────────────────────────────────────────────────────

/** Maps a surface level (0–6) to its Tailwind bg utility class */
export const surfaceBg = {
  0: "bg-cb-surface-0",
  1: "bg-cb-surface-1",
  2: "bg-cb-surface-2",
  3: "bg-cb-surface-3",
  4: "bg-cb-surface-4",
  5: "bg-cb-surface-5",
  6: "bg-cb-surface-6",
} as const

export type SurfaceLevel = keyof typeof surfaceBg

/** Maps a surface level to its Tailwind border utility class */
export const surfaceBorder = {
  subtle: "border-cb-border-subtle",
  default: "border-cb-border",
  visible: "border-cb-border-visible",
  strong: "border-cb-border-strong",
} as const

// ─── Foreground ───────────────────────────────────────────────────────────────

export const foreground = {
  primary:  "text-cb-foreground",           /* #E0E0E0 — on-surface-1 */
  secondary: "text-cb-foreground-2",        /* #C4C4C4 — on-surface-2 */
  tertiary:  "text-cb-foreground-3",        /* #A6A6A6 — on-tertiary-3 */
  muted:    "text-cb-foreground-muted",     /* #8F8F8F — on-surface-3 */
  disabled: "text-cb-foreground-disabled",  /* #696969 — surface-disabled */
} as const

export type ForegroundRole = keyof typeof foreground

// ─── Brand colors ─────────────────────────────────────────────────────────────

export const brand = {
  primary:          "text-cb-primary",            /* #8346D4 — Purple 80 (CDS "secondary") */
  primaryBg:        "bg-cb-primary",
  primaryFg:        "text-cb-primary-fg",         /* #F8F2FF — on-secondary */
  purple50:         "text-cb-purple-50",          /* #A067EB — Purple 50 (extended palette, AA 5.64:1) */
  purple50Bg:       "bg-cb-purple-50",
  onPrimaryInverse: "text-cb-on-primary-inverse", /* #696969 — disabled/inverse */
  accent:           "text-cb-accent",             /* #DFFD51 — lime */
  accentBg:         "bg-cb-accent",
  accentFg:         "text-cb-accent-fg",          /* #000000 — on-primary */
} as const

// ─── Feedback / semantic status ───────────────────────────────────────────────

export const feedback = {
  info:    { text: "text-cb-info",    fg: "text-cb-info-fg",    bg: "bg-cb-info/15"    },
  success: { text: "text-cb-success", fg: "text-cb-success-fg", bg: "bg-cb-success/15" },
  warning: { text: "text-cb-warning", fg: "text-cb-warning-fg", bg: "bg-cb-warning-bg", border: "border-cb-warning-border" },
  error:   { text: "text-cb-error",   fg: "text-cb-error-fg",   bg: "bg-cb-error/15"   },
} as const

export type FeedbackRole = keyof typeof feedback

// ─── Casino tokens ────────────────────────────────────────────────────────────

export const casino = {
  jackpot: "text-cb-jackpot",
  jackpotBg: "bg-cb-jackpot",
  featured: "text-cb-featured",
  featuredBg: "bg-cb-featured",
  featuredBorder: "border-cb-featured-border",
  live: "text-cb-live",
  liveBg: "bg-cb-live",
} as const

// ─── Game card sizes ──────────────────────────────────────────────────────────

export const gameCard = {
  sm: "w-[var(--cb-game-card-w)]",
  lg: "w-[var(--cb-game-card-w-lg)]",
  full: "w-full",
  radius: "rounded-[var(--cb-game-card-radius)]",
} as const

export type GameCardSize = keyof typeof gameCard

// ─── Icon system ──────────────────────────────────────────────────────────────

/**
 * Semantic icon colour roles matching the live site's CSS custom property system.
 * Use these on icon wrapper elements to set --icon-primary / --icon-secondary.
 *
 * Live site classes: .default-icon, .primary-icon, .muted-icon, .success-icon
 */
export const iconColor = {
  default: "text-cb-icon-default",   /* #CCA6FF — purple tint (on-tertiary-1) */
  primary: "text-cb-icon-primary",   /* #DFFD51 — lime */
  muted:   "text-cb-icon-muted",     /* #8F8F8F */
  success: "text-cb-icon-success",   /* #55A370 — success green (corrected) */
} as const

export type IconColorRole = keyof typeof iconColor

// ─── Typography ───────────────────────────────────────────────────────────────

/**
 * Font family tokens.
 * display = midnightSansST (live site proprietary, weight 800 only)
 *           used for hero headings and large promotional text.
 */
export const fontFamily = {
  display: "font-[var(--cb-font-display)]",
  sans:    "font-[var(--cb-font-sans)]",
  mono:    "font-[var(--cb-font-mono)]",
  number:  "font-[var(--cb-font-number)]",
} as const

// ─── Motion ───────────────────────────────────────────────────────────────────

export const motion = {
  base: "transition-all duration-[var(--cb-duration-base)] ease-[var(--cb-ease-default)]",
  fast: "transition-all duration-[var(--cb-duration-fast)] ease-[var(--cb-ease-out)]",
  slow: "transition-all duration-[var(--cb-duration-slow)] ease-[var(--cb-ease-out)]",
  spring: "transition-all duration-[var(--cb-duration-slow)] ease-[var(--cb-ease-spring)]",
} as const

// ─── Radius ───────────────────────────────────────────────────────────────────

export const radius = {
  sm: "rounded-[var(--cb-radius-sm)]",
  md: "rounded-[var(--cb-radius-md)]",
  lg: "rounded-[var(--cb-radius-lg)]",
  xl: "rounded-[var(--cb-radius-xl)]",
  "2xl": "rounded-[var(--cb-radius-2xl)]",
} as const

// ─── Feed / activity ──────────────────────────────────────────────────────────

export const feedEvent = {
  bet: { text: "text-cb-event-bet", bg: "bg-cb-event-bet-bg" },
  win: { text: "text-cb-event-win", bg: "bg-cb-event-win-bg" },
  cashout: { text: "text-cb-event-cashout", bg: "bg-cb-event-cashout-bg" },
  void: { text: "text-cb-event-void", bg: "bg-cb-event-void-bg" },
} as const

export type FeedEventType = keyof typeof feedEvent
