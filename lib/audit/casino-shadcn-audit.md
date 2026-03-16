# Casino Component — shadcn/ui Migration Audit

> Source: `src/casino/components/` in the Valhalla production repo  
> Lab reference: `components/cloudbet/` and `components/casino/` in `cloudbet-ui-lab`  
> Last updated: 2026-03-16

---

## Migration Criteria

| Criterion | Description |
|---|---|
| **Good candidate** | Presentational, low business logic, can be fully replaced by shadcn primitives |
| **Partial candidate** | Custom logic + shadcn shell — replace structure only, preserve logic |
| **Poor candidate** | Keep custom implementation; only improve wrapper or layout if needed |

**Key rule:** Do not replace business-logic-heavy components with generic shadcn components. Preserve stores, data fetching, websocket logic, Algolia logic, and tracking logic. Replace only shell, structure, layout primitives, and interactive UI surfaces where appropriate.

---

## Component Audit Table

| Component | Current Behavior | Suggested shadcn Replacement | Migration Complexity | Keep Custom Logic? | Notes |
|---|---|---|---|---|---|
| **HeroLobby** | Promotional top carousel with CMS data and personalization. Slides contain dynamic content, CTAs, and geo-targeted offers. | `Carousel` (Embla) shell only — keep slides fully custom | Medium | Partial | Keep slide content, CMS integration, personalization logic. Replace outer carousel shell with shadcn `Carousel`. Use `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`. Lab reference: `PromoHero.tsx`. |
| **LobbyGameCategoriesChipList** | Horizontal category chip scroller with active state synced to URL via `useSearchParams`. | `Toggle Group` for filter-style chip selection. Keep custom horizontal scroll wrapper (`overflow-x-auto no-scrollbar`). | Medium | Partial | Use `Toggle Group` (not `Tabs`) — chips filter the game grid, they do not control tabbed content panels. Preserve URL sync logic. Lab reference: `CategoryChipGroup.tsx`. |
| **LobbyGameFilters** | Search input + studio dropdown + filter chips. Stateless presentational component. | `Input` for search, `Select` or `Combobox` for studio dropdown, `Badge` / `Toggle` for chips | Medium | No | Pure presentational — full replacement is appropriate. Lab reference: `ProviderFilterBar.tsx`. |
| **LobbyWidget** | Data-fetching game listing widget with Algolia integration, geo sorting, feature flags, and multiple layout modes (row, column, minigrid). | `Carousel` for row layout, `Card` list for column layout, CSS grid + `Card` for minigrid, `Skeleton` for loading states | High | Yes | **Preserve all business logic**: Algolia queries, geo sorting, feature flag checks, tracking calls, pagination. Replace only shell, layout primitives, and presentational surfaces. Lab reference: `GameGrid.tsx` (layout only). |
| **LobbyStudioList** | Studio logo rail — horizontal scroll of provider logos with click-to-filter behavior. | `Carousel` (Embla) on desktop, native horizontal scroll on mobile | Low–Medium | No | Keep click-to-filter handler. Replace scroll shell with Carousel on desktop. Lab reference: `StudioRail.tsx`. |
| **LobbyBuyCrypto** | Promotional banner with crypto logos and a CTA button. Bespoke gradient border styling. | `Card` shell + `Button` CTA | Low | No | Keep gradient border CSS (not achievable with shadcn primitives alone). Lab reference: `JackpotCard.tsx` pattern for gradient borders. |
| **LobbyBetFeed** | Live bet feed with websocket stream, real-time row insertion, and tab selector (All / My Bets). | `Tabs` for selector, custom real-time feed rows | High | Yes | **Preserve**: websocket connection, store subscription, row animation logic, tracking. Replace only the tab selector and scroll container. Lab reference: `FeedSectionShell.tsx`. |
| **LobbyWinFeed** | Live win feed with websocket stream, large win highlights, and multiplier display. | `ScrollArea` shell only — feed rows remain fully custom | Medium–High | Yes | **Preserve**: websocket connection, store subscription, win highlight animation. Replace only the scroll container. Lab reference: `FeedSectionShell.tsx`. |
| **ComponentCard** | Developer gallery card — wraps a component preview with title, description, and status badge. | `Card` + `CardHeader` + `CardContent` + `Badge` | Low | No | Full replacement appropriate. No business logic. |
| **Sidebar** | Developer gallery navigation sidebar with section links and active state. | `ScrollArea` + `Separator` — keep custom nav structure | Low | No | Keep nav link structure and active state logic. Replace scroll container with `ScrollArea` and dividers with `Separator`. |

---

## Migration Priority Order

### Phase 1 — Low complexity, high value (do first)

1. **ComponentCard** → `Card` + `Badge` — full replacement, no risk
2. **Sidebar** → `ScrollArea` + `Separator` — structural only
3. **LobbyBuyCrypto** → `Card` + `Button` — keep gradient border CSS
4. **LobbyStudioList** → `Carousel` (desktop) + native scroll (mobile)

### Phase 2 — Medium complexity, moderate risk

5. **LobbyGameFilters** → `Input` + `Select` + `Toggle` — presentational replacement
6. **LobbyGameCategoriesChipList** → `Toggle Group` + scroll wrapper — preserve URL sync
7. **HeroLobby** → `Carousel` shell — preserve slide content and CMS logic

### Phase 3 — High complexity, preserve logic (do last)

8. **LobbyWidget** → layout primitives only — preserve Algolia, geo, flags
9. **LobbyBetFeed** → `Tabs` + feed shell — preserve websocket + store
10. **LobbyWinFeed** → `ScrollArea` shell — preserve websocket + store

---

## Token Mapping

All shadcn components must be themed to Cloudbet tokens, not default shadcn colors.

Token values verified against live `cloudbet.com/en/casino` CSS (2026-03-16).

| shadcn variable | Cloudbet token | Verified value | Notes |
|---|---|---|---|
| `--background` | `--cb-surface-1` | `oklch(0.236 0.018 310)` = `#211C25` | Page background |
| `--card` | `--cb-surface-4` | `oklch(0.298 0.033 309)` = `#32293A` | Elevated card |
| `--popover` | `--cb-surface-6` | `oklch(0.349 0.023 254)` = `#323B46` | Tooltip / popover — **blue-grey**, not purple |
| `--primary` | `--cb-primary` | `oklch(0.542 0.207 299)` = `#8346D4` | Purple CTA — hue 299°, not 285° |
| `--accent` | `--cb-accent` | `oklch(0.942 0.192 119)` = `#DFFD51` | Lime highlight — hue 119°, not 115° |
| `--muted` | `--cb-surface-3` | `oklch(0.278 0.025 309)` = `#2C2532` | Muted surface |
| `--muted-foreground` | `--cb-foreground-muted` | `oklch(0.650 0 0)` = `#8F8F8F` | Previously wrong: was 0.56 |
| `--border` | `oklch(0.907 0 0 / 10%)` | — | Default border — foreground at 10% opacity |
| `--ring` | `--cb-primary` | `oklch(0.542 0.207 299)` | Focus ring |
| `--radius` | `0.75rem` | — | 12px — matches live site `rounded-2xl-1` |
| `--foreground` | `--cb-foreground` | `oklch(0.907 0 0)` = `#E0E0E0` | Previously wrong: was 0.88 |
| `--destructive` | — | `oklch(0.65 0.18 25)` | Red — matches live `red-500` |

---

## Live Site CSS Audit (2026-03-16)

Extracted directly from `cloudbet.com/_next/static/css/be89118666555bcd.css` and supporting CSS files.

### Surface Scale — Verified RGB Values

| Token | Live RGB | Live Hex | oklch |
|---|---|---|---|
| `surface-0` | `rgb(26 22 29)` | `#1A161D` | `oklch(0.208 0.015 310)` |
| `surface-1` | `rgb(33 28 37)` | `#211C25` | `oklch(0.236 0.018 310)` |
| `surface-2` | `rgb(38 32 43)` | `#26202B` | `oklch(0.255 0.022 309)` |
| `surface-3` | `rgb(44 37 50)` | `#2C2532` | `oklch(0.278 0.025 309)` |
| `surface-4` | `rgb(50 41 58)` | `#32293A` | `oklch(0.298 0.033 309)` |
| `surface-5` | `rgb(56 46 64)` | `#382E40` | `oklch(0.320 0.034 310)` |
| `surface-6` | `rgb(50 59 70)` | `#323B46` | `oklch(0.349 0.023 254)` ⚠️ blue-grey |
| `surface-disabled` | `rgb(105 105 105)` | `#696969` | `oklch(0.521 0 0)` |

> **Note on surface-6:** The live site's tooltip/popover surface is a cool blue-grey (hue ~254°), not purple-grey. This is intentional — it creates visual separation from the purple brand surfaces.

### Foreground Scale — Verified Values

| Token | Live RGB | Live Hex | oklch |
|---|---|---|---|
| `on-surface` / `on-surface-1` | `rgb(224 224 224)` | `#E0E0E0` | `oklch(0.907 0 0)` |
| `on-surface-2` | `rgb(196 196 196)` | `#C4C4C4` | `oklch(0.814 0 0)` |
| `on-surface-3` | `rgb(143 143 143)` | `#8F8F8F` | `oklch(0.650 0 0)` |
| `on-surface-disabled` | `rgb(105 105 105)` | `#696969` | `oklch(0.521 0 0)` |

### Brand Palette — Verified Values

| Token | Live RGB | Live Hex | oklch | Role |
|---|---|---|---|---|
| `primary` (lime) | `rgb(223 253 81)` | `#DFFD51` | `oklch(0.942 0.192 119)` | Betting CTA, active states |
| `secondary` (purple) | `rgb(131 70 212)` | `#8346D4` | `oklch(0.542 0.207 299)` | Brand primary |
| `brand-purple-light` | `rgb(204 166 255)` | `#CCA6FF` | `oklch(0.792 0.129 303)` | Purple tint, icon default |
| `gold` | `rgb(248 166 49)` | `#F8A631` | `oklch(0.788 0.155 70)` | Jackpot |
| `green` (win/profit) | `rgb(107 201 140)` | `#6BC98C` | `oklch(0.762 0.126 154)` | Win, profit, live |
| `brand-orange` | `rgb(255 107 47)` | `#FF6B2F` | — | Promo accent |
| `brand-blue` | `rgb(45 75 230)` | `#2D4BE6` | — | Informational |
| `brand-warning` | `rgb(254 192 5)` | `#FEC005` | — | Warning/amber |

### Typography — Live Site Fonts

| Font | CSS variable | Weight | Usage |
|---|---|---|---|
| `midnightSansST` | `--font-midnight` | **800 only** | Hero headings, promo display text — **proprietary** |
| `midnightSansSTCond` | `--font-midnight-cond` | **800 only** | Condensed promo headlines — **proprietary** |
| `Inter` | — | all | Body, UI text, labels |
| `Noto Sans Mono` | — | all | Monospace, numbers, odds |

> **midnightSansST** is a proprietary font loaded from `/_next/static/media/b4fbb7f27b0e5d3a.p.woff2`. It is not publicly available. The lab uses Inter as a fallback — use `font-[var(--cb-font-display)]` (from `fontFamily.display` in `lib/tokens/cloudbet.ts`) on hero text so it will automatically use the real font if ever made available.

### Icon Color System

The live site defines a semantic icon colour system via CSS custom properties:

```css
.default-icon  { --icon-primary: #CCA6FF; --icon-secondary: #997DBF }
.primary-icon  { --icon-primary: #DFFD51; --icon-secondary: #696969 }
.muted-icon    { --icon-primary: #8F8F8F; --icon-secondary: #696969 }
.success-icon  { --icon-primary: #6BC98C; --icon-secondary: #6BC98C }
```

These are now reflected as `--cb-icon-*` tokens in `design-system.css` and as `iconColor` in `lib/tokens/cloudbet.ts`.

### Layout / Component Tokens

| Token | Value | Notes |
|---|---|---|
| `--header-height` | `5rem` (80px) | Sticky nav height |
| `--scrollbar-width` | `4px` | Custom scrollbar |
| `--font-size` | `12px` default, `14px` ≥1280px, `16px` ≥2200px | Responsive base font |

### Radius Scale (live site extended scale)

The live site uses a more granular radius scale than our 5-step system. For reference:

| Live class | Value | Our equivalent |
|---|---|---|
| `rounded-2xl-1` | `0.75rem` (12px) | `--cb-radius-md` ✓ |
| `rounded-2xl` | `1rem` (16px) | `--cb-radius-lg` ✓ |
| `rounded-3xl` | `1.5rem` (24px) | `--cb-radius-xl` ✓ |
| `rounded-4xl` | `2rem` (32px) | `--cb-radius-2xl` ✓ |
| `rounded-5xl` | `2.5rem` (40px) | — (not in our scale) |
| `rounded-7xl` | `4rem` (64px) | — (not in our scale) |

---

## Lab Components Reference

| Lab Component | Location | Maps to Production |
|---|---|---|
| `PromoHero` | `components/cloudbet/PromoHero.tsx` | `HeroLobby` |
| `CategoryChipGroup` | `components/cloudbet/CategoryChipGroup.tsx` | `LobbyGameCategoriesChipList` |
| `ProviderFilterBar` | `components/cloudbet/ProviderFilterBar.tsx` | `LobbyGameFilters` |
| `GameTile` | `components/cloudbet/GameTile.tsx` | Game card within `LobbyWidget` |
| `GameGrid` | `components/casino/GameGrid.tsx` | `LobbyWidget` (grid layout) |
| `FeaturedGamesCarousel` | `components/casino/FeaturedGamesCarousel.tsx` | `LobbyWidget` (carousel layout) |
| `StudioRail` | `components/cloudbet/StudioRail.tsx` | `LobbyStudioList` |
| `JackpotCard` | `components/cloudbet/JackpotCard.tsx` | Jackpot display within `LobbyWidget` |
| `FeedSectionShell` | `components/cloudbet/FeedSectionShell.tsx` | `LobbyBetFeed` + `LobbyWinFeed` |
| `RecentPlayStrip` | `components/cloudbet/RecentPlayStrip.tsx` | Recently played rail |
