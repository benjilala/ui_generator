"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/providers/ThemeProvider"

function StylesSubSection({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <p className="text-[11px] font-normal text-cb-foreground-muted tracking-wide mb-3">{title}</p>
      {children}
    </div>
  )
}

function cssColorToHexLabel(color: string): string {
  if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") return "—"
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!m) return color.length > 28 ? `${color.slice(0, 25)}…` : color
  const r = Number(m[1])
  const g = Number(m[2])
  const b = Number(m[3])
  const hex =
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  if (m[4] && m[4] !== "1") return `${hex} · α${m[4]}`
  return hex
}

function luminanceFromRgbString(color: string): number {
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!m) return 0.18
  const r = Number(m[1]) / 255
  const g = Number(m[2]) / 255
  const b = Number(m[3]) / 255
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const R = lin(r)
  const G = lin(g)
  const B = lin(b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function useContrastClassOnBackground(bgRef: React.RefObject<HTMLElement | null>) {
  const { theme, overrides } = useTheme()
  const overrideKey = JSON.stringify(overrides)
  const [fg, setFg] = React.useState("text-white")
  React.useLayoutEffect(() => {
    const el = bgRef.current
    if (!el) return
    const raw = getComputedStyle(el).backgroundColor
    const L = luminanceFromRgbString(raw)
    setFg(L > 0.55 ? "text-neutral-950" : "text-white")
  }, [theme, overrideKey])
  return fg
}

function isAccentBackgroundClass(bgClass: string): boolean {
  return /\bbg-cb-accent(\/\d+)?\b/.test(bgClass)
}

function overlayTextClass(bgClass: string, autoFg: string): string {
  if (isAccentBackgroundClass(bgClass)) return "text-cb-accent-fg"
  return autoFg
}

function useComputedColor(
  ref: React.RefObject<HTMLElement | null>,
  prop: "backgroundColor" | "color" | "borderTopColor",
) {
  const { theme, overrides } = useTheme()
  const overrideKey = JSON.stringify(overrides)
  const [hex, setHex] = React.useState("—")
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const raw = getComputedStyle(el)[prop]
    setHex(cssColorToHexLabel(raw))
  }, [theme, overrideKey, prop, ref])
  return hex
}

function MosaicSwatch({
  name,
  bgClass,
  minHeightClass = "min-h-[88px]",
}: {
  name: string
  bgClass: string
  minHeightClass?: string
}) {
  const bgRef = React.useRef<HTMLDivElement>(null)
  const hex = useComputedColor(bgRef, "backgroundColor")
  const autoFg = useContrastClassOnBackground(bgRef)
  const fg = overlayTextClass(bgClass, autoFg)
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-cb-border shadow-sm",
        minHeightClass,
      )}
    >
      <div ref={bgRef} className={cn("absolute inset-0", bgClass)} aria-hidden />
      <div
        className={cn("relative z-[1] flex h-full min-h-[inherit] flex-col p-3 sm:p-4", fg)}
      >
        <span className="text-xs font-semibold leading-tight drop-shadow-sm">{name}</span>
        <span className="mt-auto self-end text-[10px] font-mono tabular-nums drop-shadow-sm">{hex}</span>
      </div>
    </div>
  )
}

function StripSegment({
  step,
  role,
  bgClass,
}: {
  step: string
  role?: string
  bgClass: string
}) {
  const bgRef = React.useRef<HTMLDivElement>(null)
  const hex = useComputedColor(bgRef, "backgroundColor")
  const autoFg = useContrastClassOnBackground(bgRef)
  const fg = overlayTextClass(bgClass, autoFg)
  return (
    <div
      className={cn(
        "relative flex min-h-[108px] min-w-[4.75rem] flex-1 flex-col border-r border-black/10 last:border-r-0 dark:border-white/10",
        fg,
      )}
    >
      <div ref={bgRef} className={cn("absolute inset-0", bgClass)} aria-hidden />
      <div className="relative z-[1] flex h-full flex-col justify-between p-3">
        <span className="text-[11px] font-semibold tabular-nums drop-shadow-sm">{step}</span>
        <span className="flex min-h-[2rem] items-center text-[10px] font-medium leading-snug opacity-95 drop-shadow-sm">
          {role ?? "\u00a0"}
        </span>
        <span className="text-[10px] font-mono tabular-nums drop-shadow-sm">{hex}</span>
      </div>
    </div>
  )
}

function ColorStripSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-normal text-cb-foreground-muted tracking-wide mb-3">{label}</p>
      <div className="overflow-x-auto rounded-2xl border border-cb-border shadow-sm">
        <div className="flex min-w-full sm:min-w-0">{children}</div>
      </div>
    </div>
  )
}

const STYLES_SECTION_SHELL = "border-0 border-none border-transparent pt-6"
const STYLES_HEADING_BAR = "border-0 border-b border-b-[rgb(44,37,50)]"

export { STYLES_HEADING_BAR, STYLES_SECTION_SHELL }

const SURFACE_BG_STRIP: readonly string[] = [
  "bg-cb-surface-0",
  "bg-cb-surface-1",
  "bg-cb-surface-2",
  "bg-cb-surface-3",
  "bg-cb-surface-4",
]

const SURFACE_ROLES_STRIP: readonly (string | undefined)[] = [
  "Page / canvas",
  undefined,
  undefined,
  "Raised",
  undefined,
]

export function StylesColorsContent() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-[11px] font-normal text-cb-foreground-muted tracking-wide mb-3">Overview</p>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          <div className="lg:w-[44%] shrink-0">
            <MosaicSwatch name="Primary" bgClass="bg-cb-primary" minHeightClass="min-h-[280px]" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <MosaicSwatch name="Purple 50" bgClass="bg-cb-purple-50" />
                <MosaicSwatch name="Brand purple" bgClass="bg-cb-brand-purple" />
                <MosaicSwatch name="Primary · soft" bgClass="bg-cb-primary/30" />
              </div>
              <div className="flex flex-col gap-3">
                <MosaicSwatch name="Accent" bgClass="bg-cb-accent" />
                <MosaicSwatch name="Info" bgClass="bg-cb-info" />
                <MosaicSwatch name="Success" bgClass="bg-cb-success" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MosaicSwatch name="Deep surface" bgClass="bg-cb-surface-6" minHeightClass="min-h-[72px]" />
              <MosaicSwatch name="Mid surface" bgClass="bg-cb-surface-3" minHeightClass="min-h-[72px]" />
              <MosaicSwatch name="Border" bgClass="bg-cb-border" minHeightClass="min-h-[72px]" />
              <MosaicSwatch
                name="Lightest"
                bgClass="bg-cb-surface-0 ring-1 ring-inset ring-cb-border"
                minHeightClass="min-h-[72px]"
              />
            </div>
          </div>
        </div>
      </div>

      <ColorStripSection label="Neutrals — surface scale">
        {SURFACE_BG_STRIP.map((cls, i) => (
          <StripSegment key={cls} step={String(i)} role={SURFACE_ROLES_STRIP[i]} bgClass={cls} />
        ))}
      </ColorStripSection>

      <ColorStripSection label="Brand">
        <StripSegment step="01" role="Primary" bgClass="bg-cb-primary" />
        <StripSegment step="02" role="Purple 50" bgClass="bg-cb-purple-50" />
        <StripSegment step="03" role="Accent" bgClass="bg-cb-accent" />
      </ColorStripSection>

      <ColorStripSection label="Secondary">
        <StripSegment step="01" role="Info" bgClass="bg-cb-info" />
        <StripSegment step="02" role="Success" bgClass="bg-cb-success" />
      </ColorStripSection>

      <ColorStripSection label="Semantic">
        <StripSegment step="01" role="Jackpot" bgClass="bg-cb-jackpot" />
        <StripSegment step="02" role="Live" bgClass="bg-cb-live" />
        <StripSegment step="03" role="Featured" bgClass="bg-cb-featured" />
        <StripSegment step="04" role="Error" bgClass="bg-cb-error" />
        <StripSegment step="05" role="Warning" bgClass="bg-cb-warning" />
      </ColorStripSection>

      <ColorStripSection label="Text (as ink)">
        <StripSegment step="01" role="Foreground" bgClass="bg-cb-foreground" />
        <StripSegment step="02" role="Muted" bgClass="bg-cb-foreground-muted" />
        <StripSegment step="03" role="Disabled" bgClass="bg-cb-foreground-disabled" />
      </ColorStripSection>

      <ColorStripSection label="Borders">
        <StripSegment step="01" role="Subtle" bgClass="bg-cb-border-subtle" />
        <StripSegment step="02" role="Default" bgClass="bg-cb-border" />
        <StripSegment step="03" role="Visible" bgClass="bg-cb-border-visible" />
        <StripSegment step="04" role="Strong" bgClass="bg-cb-border-strong" />
      </ColorStripSection>
    </div>
  )
}

export function StylesTypographyContent() {
  const CHARSET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789\n!@#$%&*()[]{}—·"

  return (
    <div className="flex flex-col gap-10">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-cb-border bg-cb-surface-2 shadow-sm">
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-[min(55vw,320px)] rounded-full bg-cb-primary/[0.07] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-16 size-[min(45vw,260px)] rounded-full bg-cb-purple-50/[0.08] blur-3xl"
          aria-hidden
        />

        <div className="relative flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:gap-10 lg:p-12">
          <div
            className="flex shrink-0 justify-center border-cb-border lg:w-10 lg:flex-col lg:justify-start lg:border-r lg:pr-6"
            aria-hidden
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-cb-foreground-muted [writing-mode:vertical-rl] lg:rotate-180">
              Cloudbet UI Lab · Typography
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-cb-foreground-muted">
              Typography
            </p>
            <h2 className="mt-4 text-center text-5xl font-bold tracking-tight text-cb-foreground sm:text-6xl md:text-7xl lg:text-8xl font-sans">
              Inter
            </h2>

            <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-start">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-cb-foreground-muted">
                    Regular
                  </p>
                  <p className="mt-1 text-lg font-normal leading-snug text-cb-foreground font-sans">
                    Primary UI copy, tables, and long-form content.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-cb-foreground-muted">
                    Semibold
                  </p>
                  <p className="mt-1 text-lg font-semibold leading-snug text-cb-foreground font-sans">
                    Labels, section titles, and emphasis within paragraphs.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-cb-foreground-muted mb-2">
                  Character set
                </p>
                <p className="whitespace-pre-wrap break-all font-sans text-sm leading-relaxed tracking-wide text-cb-foreground-muted">
                  {CHARSET}
                </p>
              </div>
            </div>

            <p className="mx-auto mt-12 max-w-xl text-center text-xs leading-relaxed text-cb-foreground-muted">
              Body UI uses <span className="font-mono text-cb-foreground">font-sans</span> →{" "}
              <span className="font-mono text-cb-foreground">--cb-font-sans</span> in{" "}
              <span className="font-mono text-cb-foreground">design-system.css</span>, loaded as Inter. Pair weight
              with size tokens for hierarchy; keep marketing display on{" "}
              <span className="font-mono text-cb-foreground">--cb-font-display</span>.
            </p>
          </div>
        </div>
      </div>

      <StylesSubSection title="Weights">
        <div className="flex flex-col gap-2 rounded-2xl border border-cb-border bg-cb-surface-3 px-5 py-4">
          {[
            { cls: "font-normal", label: "400 — font-normal" },
            { cls: "font-medium", label: "500 — font-medium" },
            { cls: "font-semibold", label: "600 — font-semibold" },
            { cls: "font-bold", label: "700 — font-bold" },
            { cls: "font-extrabold", label: "800 — font-extrabold" },
          ].map(({ cls, label }) => (
            <div key={label} className={cn("text-base text-cb-foreground font-sans", cls)}>
              {label} — The quick brown fox
            </div>
          ))}
        </div>
      </StylesSubSection>

      <StylesSubSection title="Type scale">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-cb-border bg-cb-surface-3 divide-y divide-cb-border-subtle">
          {[
            { cls: "text-4xl font-bold", label: "4xl / bold — Hero" },
            { cls: "text-3xl font-bold", label: "3xl / bold — Display" },
            { cls: "text-2xl font-semibold", label: "2xl / semibold — Section" },
            { cls: "text-xl font-semibold", label: "xl / semibold — Title" },
            { cls: "text-lg font-medium", label: "lg / medium — Subtitle" },
            { cls: "text-base", label: "base — Body" },
            { cls: "text-sm", label: "sm — Secondary" },
            { cls: "text-xs", label: "xs — Caption" },
            {
              cls: "text-[10px] uppercase tracking-widest font-semibold text-cb-foreground-muted",
              label: "10px / caps — Label",
            },
          ].map(({ cls, label }) => (
            <div key={label} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4">
              <span className={cn(cls, "text-cb-foreground leading-none font-sans")}>
                Get in there me ol&apos; fruit
              </span>
              <span className="text-[10px] text-cb-foreground-disabled font-mono shrink-0">{label}</span>
            </div>
          ))}
        </div>
      </StylesSubSection>

      <StylesSubSection title="Code / mono">
        <p className="font-mono text-sm text-cb-foreground bg-cb-surface-3 border border-cb-border rounded-2xl px-4 py-3">
          const stake = 0.05 <span className="text-cb-accent">// BTC</span>
        </p>
      </StylesSubSection>

      <StylesSubSection title="Display / marketing">
        <p
          className="text-3xl font-extrabold text-cb-foreground leading-tight"
          style={{ fontFamily: "var(--cb-font-display)" }}
        >
          Midnight display
        </p>
        <p className="text-[10px] text-cb-foreground-muted mt-2 max-w-xl">
          <span className="font-mono">--cb-font-display</span> — weight 800 in production; fallbacks when the webfont
          is not loaded.
        </p>
      </StylesSubSection>

      <StylesSubSection title="Micro scale (tokens)">
        <div className="flex flex-col gap-2 text-cb-foreground">
          <p className="text-[length:var(--cb-text-2xs)] font-mono text-cb-foreground-muted">
            --cb-text-2xs (10px)
          </p>
          <p className="text-[length:var(--cb-text-3xs)] font-mono text-cb-foreground-muted">
            --cb-text-3xs (8px)
          </p>
        </div>
      </StylesSubSection>
    </div>
  )
}

export function StylesLayoutContent() {
  return (
    <div className="flex flex-col gap-8">
      <StylesSubSection title="Radius scale">
        <div className="flex flex-wrap gap-4 items-end">
          {[
            { token: "--cb-radius-sm", label: "sm — 4px", style: "var(--cb-radius-sm)" },
            { token: "--cb-radius-md", label: "md — 12px", style: "var(--cb-radius-md)" },
            { token: "--cb-radius-lg", label: "lg — 16px", style: "var(--cb-radius-lg)" },
            { token: "--cb-radius-xl", label: "xl — 24px", style: "var(--cb-radius-xl)" },
            { token: "--cb-radius-2xl", label: "2xl — 32px", style: "var(--cb-radius-2xl)" },
            { token: "full", label: "full", style: "9999px" },
          ].map(({ token, label, style }) => (
            <div key={token} className="flex flex-col items-center gap-1.5">
              <div
                className="size-12 bg-cb-primary/20 border border-cb-primary/40"
                style={{ borderRadius: style }}
              />
              <span className="text-[10px] text-cb-foreground-muted font-mono whitespace-nowrap text-center">
                {label}
              </span>
              {token !== "full" && (
                <span className="text-[9px] text-cb-foreground-disabled font-mono">{token}</span>
              )}
            </div>
          ))}
        </div>
      </StylesSubSection>

      <StylesSubSection title="Spacing rhythm">
        <div className="flex flex-wrap items-end gap-4">
          {[
            { token: "--cb-space-2", rem: "0.125rem" },
            { token: "--cb-space-4", rem: "0.25rem" },
            { token: "--cb-space-8", rem: "0.5rem" },
            { token: "--cb-space-12", rem: "0.75rem" },
            { token: "--cb-space-16", rem: "1rem" },
            { token: "--cb-space-24", rem: "1.5rem" },
            { token: "--cb-space-32", rem: "2rem" },
            { token: "--cb-space-48", rem: "3rem" },
          ].map(({ token, rem }) => (
            <div key={token} className="flex flex-col items-center gap-1">
              <div
                className="bg-cb-primary/40 border border-cb-primary/30 rounded-sm"
                style={{ width: rem, height: "24px" }}
              />
              <span className="text-[9px] text-cb-foreground-disabled font-mono text-center max-w-[4.5rem]">
                {token}
              </span>
            </div>
          ))}
        </div>
      </StylesSubSection>

      <StylesSubSection title="Focus & rings">
        <div className="flex flex-wrap gap-4 items-center">
          <button
            type="button"
            className="rounded-[var(--cb-radius-md)] border border-cb-border bg-cb-surface-3 px-3 py-2 text-xs text-cb-foreground ring-2 ring-cb-brand-purple/35 ring-offset-2 ring-offset-cb-surface-1"
          >
            ring + offset
          </button>
          <div className="rounded-[var(--cb-radius-md)] border-2 border-cb-border bg-cb-surface-3 px-3 py-2 text-xs text-cb-foreground-muted">
            border-cb-border
          </div>
          <p className="text-[10px] text-cb-foreground-muted max-w-xs">
            shadcn focus uses <span className="font-mono">--ring</span>; CDS borders use{" "}
            <span className="font-mono">border-cb-border*</span> utilities.
          </p>
        </div>
      </StylesSubSection>

      <StylesSubSection title="Motion tokens">
        <div className="rounded-[var(--cb-radius-lg)] border border-cb-border overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cb-surface-3 border-b border-cb-border text-cb-foreground-muted">
                <th className="px-3 py-2 font-medium font-mono">Token</th>
                <th className="px-3 py-2 font-medium">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cb-border-subtle text-cb-foreground-muted">
              {[
                ["--cb-duration-instant", "75ms"],
                ["--cb-duration-fast", "150ms"],
                ["--cb-duration-base", "200ms"],
                ["--cb-duration-slow", "350ms"],
                ["--cb-duration-flash", "700ms"],
                ["--cb-ease-default", "cubic-bezier(0.4, 0, 0.2, 1)"],
                ["--cb-ease-out", "cubic-bezier(0, 0, 0.2, 1)"],
                ["--cb-ease-spring", "cubic-bezier(0.34, 1.56, 0.64, 1)"],
              ].map(([token, value]) => (
                <tr key={token} className="bg-cb-surface-2">
                  <td className="px-3 py-1.5 font-mono text-[10px] text-cb-foreground">{token}</td>
                  <td className="px-3 py-1.5 text-[10px]">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StylesSubSection>
    </div>
  )
}
