"use client"

import * as React from "react"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import {
  Activity,
  FlaskConical,
  Gift,
  Home,
  LayoutGrid,
  Radio,
  Trophy,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  brand,
  foreground,
  iconColor,
  motion,
  radius,
  surfaceBg,
  surfaceBorder,
} from "@/lib/tokens/cloudbet"

export type SidebarNavTab = "sports" | "casino" | "esports"

type QuickLink = { label: string; icon: LucideIcon }

type ScrollItem = { name: string; color: string }

type TabPanelContent = {
  quickLinks: readonly QuickLink[]
  listTitle: string
  items: readonly ScrollItem[]
}

const TAB_CONTENT: Record<SidebarNavTab, TabPanelContent> = {
  sports: {
    quickLinks: [
      { label: "All sports", icon: Home },
      { label: "In-play", icon: Activity },
      { label: "Bet Builder", icon: FlaskConical },
      { label: "Promos", icon: Gift },
      { label: "Tournaments", icon: Trophy },
    ],
    listTitle: "All sports",
    items: [
      { name: "American Football", color: "#f87171" },
      { name: "Aussie Rules", color: "#34d399" },
      { name: "Badminton", color: "#4ade80" },
      { name: "Bandy", color: "#f472b6" },
      { name: "Baseball", color: "#a78bfa" },
      { name: "Basketball", color: "#f472b6" },
      { name: "Boxing", color: "#fbbf24" },
      { name: "Chess", color: "#60a5fa" },
      { name: "Cricket", color: "#fb923c" },
      { name: "Darts", color: "#94a3b8" },
      { name: "Floorball", color: "#67e8f9" },
      { name: "Futsal", color: "#34d399" },
      { name: "Golf", color: "#e2e8f0" },
      { name: "Greyhounds", color: "#fbbf24" },
      { name: "Handball", color: "#5eead4" },
      { name: "Horse Racing", color: "#6366f1" },
      { name: "Ice Hockey", color: "#f87171" },
      { name: "MMA", color: "#fb923c" },
      { name: "Motorsport", color: "#34d399" },
      { name: "Politics", color: "#3b82f6" },
      { name: "Rugby League", color: "#f87171" },
      { name: "Rugby Union", color: "#a3e635" },
      { name: "Snooker", color: "#84cc16" },
      { name: "Soccer", color: "#4ade80" },
      { name: "Table Tennis", color: "#fbbf24" },
      { name: "Tennis", color: "#a3e635" },
      { name: "Volleyball", color: "#f59e0b" },
    ],
  },
  esports: {
    quickLinks: [
      { label: "All esports", icon: Home },
      { label: "In-play", icon: Activity },
      { label: "Promos", icon: Gift },
      { label: "Tournaments", icon: Trophy },
    ],
    listTitle: "All esports",
    items: [
      { name: "Counter-Strike 2", color: "#f59e0b" },
      { name: "Dota 2", color: "#dc2626" },
      { name: "League of Legends", color: "#60a5fa" },
      { name: "Valorant", color: "#f472b6" },
      { name: "Call of Duty", color: "#4ade80" },
      { name: "Rocket League", color: "#a78bfa" },
      { name: "Rainbow Six", color: "#94a3b8" },
      { name: "Overwatch 2", color: "#fbbf24" },
      { name: "StarCraft II", color: "#34d399" },
      { name: "Mobile Legends", color: "#fb923c" },
      { name: "PUBG", color: "#e2e8f0" },
      { name: "FIFA Esports", color: "#6366f1" },
    ],
  },
  casino: {
    quickLinks: [
      { label: "For you", icon: Home },
      { label: "Live dealer", icon: Radio },
      { label: "Lobby", icon: LayoutGrid },
      { label: "Promos", icon: Gift },
      { label: "Tournaments", icon: Trophy },
    ],
    listTitle: "Categories",
    items: [
      { name: "Slots", color: "#a78bfa" },
      { name: "Live dealer", color: "#f472b6" },
      { name: "Crash", color: "#fbbf24" },
      { name: "Game shows", color: "#60a5fa" },
      { name: "Blackjack", color: "#34d399" },
      { name: "Roulette", color: "#fb923c" },
      { name: "Baccarat", color: "#94a3b8" },
      { name: "Aviator", color: "#67e8f9" },
      { name: "Jackpot slots", color: "#f59e0b" },
      { name: "Table games", color: "#84cc16" },
      { name: "Video poker", color: "#6366f1" },
      { name: "Provably fair", color: "#4ade80" },
    ],
  },
}

const TAB_ORDER: SidebarNavTab[] = ["sports", "casino", "esports"]

const TAB_PANEL_ID = "sidebar-nav-tabpanel"

function labelsForTab(tab: SidebarNavTab): string[] {
  return TAB_CONTENT[tab].quickLinks.map((l) => l.label)
}

function resolveInitialQuickLink(
  tab: SidebarNavTab,
  preferred?: string
): string {
  const labels = labelsForTab(tab)
  if (preferred && labels.includes(preferred)) return preferred
  return labels[0] ?? ""
}

export interface SidebarNavProps {
  defaultTab?: SidebarNavTab
  defaultQuickLink?: string
  /** Sidebar surface level — use `1` to match casino lobby page (`bg-cb-surface-1`). */
  surface?: 0 | 1
  onTabChange?: (tab: SidebarNavTab) => void
  onQuickLinkChange?: (label: string) => void
  className?: string
}

const rowTransition = cn(
  motion.base,
  "transition-[color,background-color,transform,box-shadow]"
)

function focusRingForSurface(surface: 0 | 1) {
  return cn(
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-primary focus-visible:ring-offset-2",
    surface === 1
      ? "focus-visible:ring-offset-cb-surface-1"
      : "focus-visible:ring-offset-cb-surface-0"
  )
}

export function SidebarNav({
  defaultTab = "sports",
  defaultQuickLink,
  surface = 0,
  onTabChange,
  onQuickLinkChange,
  className,
}: SidebarNavProps) {
  const bg = surfaceBg[surface]
  const focusRing = focusRingForSurface(surface)

  const [activeTab, setActiveTab] = React.useState<SidebarNavTab>(defaultTab)
  const [activeLink, setActiveLink] = React.useState(() =>
    resolveInitialQuickLink(defaultTab, defaultQuickLink)
  )

  const panel = TAB_CONTENT[activeTab]

  function handleTab(tab: SidebarNavTab) {
    setActiveTab(tab)
    const next = resolveInitialQuickLink(tab)
    setActiveLink(next)
    onTabChange?.(tab)
    onQuickLinkChange?.(next)
  }

  function handleQuickLink(label: string) {
    setActiveLink(label)
    onQuickLinkChange?.(label)
  }

  return (
    <aside
      className={cn(
        "flex h-full min-h-0 w-full max-w-[280px] flex-col border-r",
        bg,
        surfaceBorder.subtle,
        rowTransition,
        className
      )}
    >
      <header
        className={cn(
          "shrink-0 flex flex-col gap-[var(--cb-space-12)] p-[var(--cb-space-16)]",
          bg
        )}
      >
        <div className="flex items-center gap-[var(--cb-space-4)]">
          <Image
            src="/cloudbet-sidebar-mark.png"
            alt=""
            width={55}
            height={33}
            className="h-[33px] w-[55px] shrink-0 object-contain"
            aria-hidden
          />
        </div>

        <div
          className="flex w-full flex-wrap items-center justify-between gap-[var(--cb-space-4)]"
          role="tablist"
          aria-label="Product area"
        >
          {TAB_ORDER.map((tab) => {
            const tabId = `sidebar-nav-tab-${tab}`
            return (
              <button
                key={tab}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={TAB_PANEL_ID}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => handleTab(tab)}
                className={cn(
                  rowTransition,
                  "inline-flex items-center justify-center rounded-full",
                  "px-4 py-1 text-sm font-medium capitalize leading-[18px]",
                  focusRing,
                  "active:scale-[0.98]",
                  activeTab === tab
                    ? cn(brand.primaryBg, brand.primaryFg)
                    : cn(
                        foreground.muted,
                        "hover:text-cb-foreground",
                        "hover:bg-[var(--cb-overlay-hover)]"
                      )
                )}
              >
                {tab === "esports"
                  ? "Esports"
                  : `${tab.charAt(0).toUpperCase()}${tab.slice(1)}`}
              </button>
            )
          })}
        </div>
      </header>

      <div
        id={TAB_PANEL_ID}
        role="tabpanel"
        aria-live="polite"
        aria-labelledby={`sidebar-nav-tab-${activeTab}`}
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-[var(--cb-space-8)] py-[var(--cb-space-8)] pb-[var(--cb-space-16)] scrollbar-subtle-hover",
          bg
        )}
      >
        <nav aria-label="Quick links" className="mb-[var(--cb-space-16)]">
          <ul className="flex flex-col gap-[var(--cb-space-2)]">
            {panel.quickLinks.map((link) => {
              const Icon = link.icon
              const isActive = activeLink === link.label
              return (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleQuickLink(link.label)}
                    className={cn(
                      rowTransition,
                      radius.md,
                      "flex w-full items-center gap-[var(--cb-space-12)] px-[var(--cb-space-12)] py-[var(--cb-space-10)] text-left text-sm font-medium",
                      focusRing,
                      "active:scale-[0.99]",
                      isActive
                        ? cn("bg-cb-primary/15", brand.purple50)
                        : cn(
                            foreground.muted,
                            iconColor.muted,
                            "hover:bg-[var(--cb-overlay-hover)] hover:text-cb-foreground",
                            "hover:[&_svg]:text-cb-icon-default"
                          )
                    )}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    <span>{link.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-[var(--cb-space-8)]">
          <p
            className={cn(
              "px-[var(--cb-space-12)] font-semibold uppercase",
              foreground.disabled,
              "text-[length:var(--cb-text-2xs)]",
              "tracking-[var(--cb-tracking-caps)]"
            )}
          >
            {panel.listTitle}
          </p>
          <ul className="flex flex-col gap-[var(--cb-space-2)] pb-[var(--cb-space-4)]">
            {panel.items.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  className={cn(
                    rowTransition,
                    radius.md,
                    "flex w-full items-center gap-[var(--cb-space-12)] px-[var(--cb-space-12)] py-[var(--cb-space-10)] text-left text-sm",
                    focusRing,
                    foreground.muted,
                    "hover:bg-[var(--cb-overlay-hover)] hover:text-cb-foreground"
                  )}
                >
                  <span
                    className="size-3 shrink-0 rounded-full ring-1 ring-cb-border-subtle"
                    style={{ backgroundColor: item.color }}
                    aria-hidden
                  />
                  <span className="font-[var(--cb-font-sans)]">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
