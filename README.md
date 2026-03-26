# Cloudbet UI Lab

AI-native design exploration lab for Cloudbet. Generate, test, and refine UI patterns before moving to production.

## Purpose

`cloudbet-ui-lab` is a sibling repository to the production `cloudbet-ui` / Valhalla codebase. It provides:

- A fast iteration environment for new UI patterns without production risk
- A casino lobby exploration screen as a reference implementation
- A shadcn/ui migration audit for existing casino components
- An AI prompt library for Cursor-driven UI generation and critique
- A typed token system and mock data layer for component development

## Stack

| Tool | Version | Notes |
|---|---|---|
| Next.js | 15 | App Router, Turbopack |
| React | 19 | Server Components by default |
| TypeScript | 5 | Strict mode |
| Tailwind CSS | 4 | `@theme inline` token exposure |
| shadcn/ui | latest | radix-vega style |
| pnpm | 10 | Package manager |

## Getting started

```bash
cd cloudbet-ui-lab
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the lab index.

| Route | Description |
|---|---|
| `/` | Lab navigation hub |
| `/casino` | Casino lobby exploration screen |
| `/sportsbook` | Placeholder |
| `/vip` | Placeholder |
| `/experiments` | Placeholder |

## Project structure

```
cloudbet-ui-lab/
├── app/
│   ├── layout.tsx              # Root layout — dark class, Inter font, Toaster
│   ├── page.tsx                # Lab index / navigation hub
│   ├── casino/page.tsx         # Casino lobby exploration screen
│   ├── sportsbook/page.tsx     # Placeholder
│   ├── vip/page.tsx            # Placeholder
│   └── experiments/page.tsx   # Placeholder
├── components/
│   ├── ui/                     # shadcn/ui primitives (generated)
│   ├── cloudbet/               # Brand-specific shared components
│   │   ├── GameTile.tsx        # Game card — sm/lg/full variants
│   │   ├── PromoHero.tsx       # Promo carousel (Embla)
│   │   ├── CategoryChipGroup.tsx  # Toggle Group filter chips
│   │   ├── JackpotCard.tsx     # Jackpot display with gold gradient
│   │   ├── ProviderFilterBar.tsx  # Search + studio Select
│   │   ├── StudioRail.tsx      # Provider logo rail
│   │   ├── RecentPlayStrip.tsx # Native-scroll game strip
│   │   └── FeedSectionShell.tsx   # Bet/Win feed with Tabs
│   ├── casino/                 # Casino product compositions
│   │   ├── CasinoLobby.tsx     # Full lobby composition
│   │   ├── FeaturedGamesCarousel.tsx
│   │   ├── GameGrid.tsx        # CSS grid with Skeleton loading
│   │   └── JackpotSection.tsx
│   └── patterns/               # Cross-product layout patterns
│       ├── lab-page-header.tsx # Sticky lab chrome (brandmark, title, actions)
│       └── SectionHeader.tsx   # Section heading + action slot
├── lib/
│   ├── tokens/cloudbet.ts      # Typed token maps for CVA variants
│   ├── mocks/                  # Typed mock data
│   │   ├── casino.ts           # Games, categories, jackpots
│   │   ├── providers.ts        # Studio/provider data
│   │   ├── feeds.ts            # Bet/win feed entries
│   │   └── index.ts            # Clean re-exports
│   ├── prompts/                # Cursor AI prompts
│   │   ├── ui-screen-generator.md
│   │   ├── component-architect.md
│   │   ├── ux-explorer.md
│   │   ├── design-critic.md
│   │   ├── cloudbet-ui-agent.md
│   │   └── casino-migration-auditor.md
│   ├── audit/
│   │   └── casino-shadcn-audit.md  # Migration audit table
│   └── utils/
│       └── cn.ts               # clsx + tailwind-merge
├── styles/
│   └── design-system.css       # Authoritative token and theme layer
└── app/globals.css             # Lab-safe global behavior layer
```

## Token system

Two files, two responsibilities:

### `styles/design-system.css` — authoritative token layer

- All `--cb-*` token definitions (7-level surface scale, brand colors, casino tokens, motion)
- shadcn `@layer base` block mapping `--background`, `--primary`, etc. to Cloudbet values
- Tailwind v4 `@theme inline` block exposing all tokens as utilities

### `app/globals.css` — global behavior layer

- Imports `styles/design-system.css`
- Scrollbar utilities (`no-scrollbar`, `scrollbar-custom`)
- Gradient utilities (`promo-gradient`, `theme-gradient`)
- Casino animations (`cb-jackpot-pulse`, `cb-digit-up/down`)
- Interaction utilities (`state-layer`)
- Typography base styles

## Component architecture

```
shadcn/ui primitives (components/ui/)
        ↓
Cloudbet shared components (components/cloudbet/)
        ↓
Casino product compositions (components/casino/)
        ↓
Page-level screens (app/casino/page.tsx)
```

## shadcn primitives installed

button, card, badge, tabs, **toggle-group**, input, select, dialog, dropdown-menu,
separator, skeleton, tooltip, scroll-area, table, **carousel**, form, checkbox,
radio-group, switch, progress, **sheet**, sonner, toggle

## Design rules

1. Dark backgrounds dominate — `bg-cb-surface-1` as page background
2. Purple (`--cb-primary`) for CTAs and active states only
3. Lime (`--cb-accent`) for live indicators and betting highlights only
4. Gold (`--cb-jackpot`) for jackpot elements only
5. `Toggle Group` for filter chips — `Tabs` only for tabbed content panels
6. `Carousel` (Embla) for all carousels — never Swiper
7. Native horizontal scroll for game rails — not `ScrollArea`
8. `Sheet` for mobile drawers — `drawer` not in initial lab
9. Inter font throughout
10. Mobile-first — 375px minimum

## AI prompt library

Six Cursor-ready prompts in `lib/prompts/`:

| Prompt | Use case |
|---|---|
| `ui-screen-generator.md` | Generate full screens from a brief |
| `component-architect.md` | Design component APIs and CVA variants |
| `ux-explorer.md` | Explore UX alternatives for a flow |
| `design-critic.md` | Review UI against brand standards |
| `cloudbet-ui-agent.md` | Master agent — knows the full system |
| `casino-migration-auditor.md` | Audit components for shadcn migration |

To use a prompt in Cursor: open the prompt file and use it as a system prompt in a new chat, or reference it with `@lib/prompts/[prompt-name].md`.

## Migration audit

See `lib/audit/casino-shadcn-audit.md` for the full migration table covering all 10 casino components from `pages/dev/casino-components.tsx`.

Migration priority:
1. **Phase 1 (Low):** ComponentCard, Sidebar, LobbyBuyCrypto, LobbyStudioList
2. **Phase 2 (Medium):** LobbyGameFilters, LobbyGameCategoriesChipList, HeroLobby
3. **Phase 3 (High):** LobbyWidget, LobbyBetFeed, LobbyWinFeed

## Lab → Production path

```
Explore → Review → Extract → PR to Valhalla
```

1. **Explore** — Build and iterate in the lab without production risk
2. **Review** — Use `design-critic.md` prompt + visual QA against brand bible
3. **Extract** — Copy proven components to `valhalla/src/` with business logic wired in
4. **Migrate** — Follow audit table: replace shell/layout, preserve logic
5. **Token sync** — Ensure `--cb-*` tokens match production `tailwind.config.js` values

### Extraction checklist

Before copying a lab component to production:

- [ ] All `--cb-*` tokens are used (no raw hex values)
- [ ] Component passes `design-critic.md` review
- [ ] Mobile layout tested at 375px
- [ ] Keyboard navigation works
- [ ] ARIA labels on icon-only buttons
- [ ] Loading state with `Skeleton` implemented
- [ ] No mock data imports — real data wired in
- [ ] Business logic from production component preserved

## Optional future additions

- `lib/config/` — shared config for casino categories, layout config, feature flags
- `app/experiments/` — sandbox for Magic Markets and prediction market UI
- Figma Code Connect mappings for all `components/cloudbet/` components
