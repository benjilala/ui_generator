# Cloudbet UI Lab — design reference

Authoritative tokens and themes live in **`styles/design-system.css`**. Tailwind maps them under `@theme inline` (e.g. `bg-cb-surface-*`, `text-cb-foreground-*`, `border-cb-border-*`).

Typed class maps for components: **`lib/tokens/cloudbet.ts`** (`surfaceBg`, `foreground`, `brand`, `motion`, `radius`, `iconColor`, etc.).

## Surfaces

| Token | Role |
|-------|------|
| `cb-surface-0` | Deepest — **sidebar**, overlays |
| `cb-surface-1` | Page background |
| `cb-surface-2`–`3` | Content / cards / panels |

## Selection & brand

- Primary fill: `cb-primary` + on-primary text: `cb-primary-fg`.
- Tinted selection (lists): `bg-cb-primary/15` + label `cb-purple-50` (AA on purple tint per CDS).
- Muted copy: `cb-foreground-muted` → hover steps toward `cb-foreground`.

## Motion & shape

- Default interaction: `motion.base` from `lib/tokens/cloudbet.ts` (`--cb-duration-base`, `--cb-ease-default`).
- Nav rows: `radius.md` (`--cb-radius-md`, 12px).

## Overlays

- Row hover on dark surfaces: `cb-overlay-hover` (or elevate one step, e.g. `cb-surface-3` on `cb-surface-0`).

## Blocks

Blocks under `components/blocks/` should prefer **token helpers** over raw hex / ad hoc zinc classes so theme editors and `.dark` stay consistent.

**Sidebar Nav** follows the Valhalla-style **sector → different sidebar body** pattern: switching Sports / Casino / Esports replaces the quick-link list and scroll list (mock data only in the lab; production uses `SportsNavigation` vs `CasinoNavigation` per root nav item).

**Scroll:** Match `DesktopNavigationBarV2`: **logo + sector tabs** are **`shrink-0`**; everything below scrolls in **one** region with **`min-h-0 flex-1 overflow-y-auto overflow-x-hidden`** and **`scrollbar-subtle-hover`**. On the **casino lobby** route, the sidebar is **`fixed`** under the lab header (`top-12`, `h-[calc(100dvh-3rem)]`) so it stays put while the main column scrolls independently (`overflow-y-auto`), similar to [cloudbet.com/en/casino](https://www.cloudbet.com/en/casino).

**Casino lobby background:** Pass **`surface={1}`** so the sidebar uses **`cb-surface-1`** and matches the lobby main area instead of **`cb-surface-0`**.
