"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  Info,
  Loader2,
  Star,
  Trophy,
  TrendingUp,
  Zap,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
} from "recharts"

// shadcn primitives
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/components/ui/alert"
import { Chip, ChipSkeleton } from "@/components/ui/chip"

// Magic UI animation components
import { NumberTicker } from "@/components/ui/number-ticker"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { BorderBeam } from "@/components/ui/border-beam"
import { SparklesText } from "@/components/ui/sparkles-text"

// Cloudbet shared components
import { GameTile } from "@/components/cloudbet/GameTile"
import { JackpotCard } from "@/components/cloudbet/JackpotCard"
import { ProviderFilterBar } from "@/components/cloudbet/ProviderFilterBar"
import { StudioRail } from "@/components/cloudbet/StudioRail"
import { FeedSectionShell } from "@/components/cloudbet/FeedSectionShell"
import { SectionHeader } from "@/components/patterns/SectionHeader"

import { OddsButton, OddsButtonStyles } from "@/components/cloudbet/OddsButton"

// Mock data
import {
  MOCK_GAMES,
  MOCK_JACKPOTS,
  MOCK_PROVIDERS,
  MOCK_BET_FEED,
  MOCK_WIN_FEED,
} from "@/lib/mocks"

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-5 pb-3 border-b border-cb-border">
        <h2 className="text-lg font-bold text-cb-foreground tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-cb-foreground-muted mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

function SubSection({
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
      <p className="text-[11px] font-semibold text-cb-foreground-muted uppercase tracking-widest mb-3">
        {title}
      </p>
      {children}
    </div>
  )
}

function Swatch({
  label,
  className,
  style,
}: {
  label: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className="flex flex-col gap-1.5 items-start">
      <div
        className={`h-10 w-full rounded-[var(--cb-radius-md)] border border-cb-border ${className ?? ""}`}
        style={style}
      />
      <span className="text-[10px] text-cb-foreground-muted font-mono leading-tight">{label}</span>
    </div>
  )
}

// ─── Chart mock data ──────────────────────────────────────────────────────────

const BET_VOLUME_DATA = [
  { day: "Mon", bets: 1240, wins: 820 },
  { day: "Tue", bets: 1580, wins: 1020 },
  { day: "Wed", bets: 1320, wins: 890 },
  { day: "Thu", bets: 1890, wins: 1240 },
  { day: "Fri", bets: 2340, wins: 1560 },
  { day: "Sat", bets: 2980, wins: 1980 },
  { day: "Sun", bets: 2650, wins: 1740 },
]

const GAME_POPULARITY_DATA = [
  { game: "Gates", players: 3420 },
  { game: "Sweet B", players: 2890 },
  { game: "Book", players: 2340 },
  { game: "Starburst", players: 1980 },
  { game: "Gonzo", players: 1650 },
  { game: "Mega M", players: 1420 },
]

const JACKPOT_HISTORY_DATA = [
  { date: "Jan", amount: 1200000 },
  { date: "Feb", amount: 1580000 },
  { date: "Mar", amount: 980000 },
  { date: "Apr", amount: 2100000 },
  { date: "May", amount: 1750000 },
  { date: "Jun", amount: 2847391 },
]

const CATEGORY_SPLIT_DATA = [
  { name: "Slots", value: 58, color: "var(--cb-primary)" },
  { name: "Live Casino", value: 24, color: "var(--cb-live)" },
  { name: "Table Games", value: 12, color: "var(--cb-info)" },
  { name: "Other", value: 6, color: "var(--cb-foreground-disabled)" },
]

// ─── Helper sub-components ────────────────────────────────────────────────────

function CollapsibleDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="max-w-sm rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border overflow-hidden">
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between px-4 py-3 text-sm text-cb-foreground hover:bg-cb-surface-4 transition-colors">
          <span className="font-medium">Advanced filters</span>
          <ChevronRight className={`size-4 text-cb-foreground-muted transition-transform ${open ? "rotate-90" : ""}`} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 flex flex-col gap-2 border-t border-cb-border pt-3">
          {["High RTP only (≥96%)", "Bonus buy available", "Megaways mechanic"].map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <Checkbox id={opt} />
              <label htmlFor={opt} className="text-xs text-cb-foreground cursor-pointer">{opt}</label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function SliderDemo() {
  const [betAmount, setBetAmount] = React.useState([25])
  const [rtp, setRtp] = React.useState([96])
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-cb-foreground-muted">
          <span>Bet amount</span>
          <span className="font-mono text-cb-foreground">{betAmount[0]}%</span>
        </div>
        <Slider
          value={betAmount}
          onValueChange={setBetAmount}
          min={1}
          max={100}
          step={1}
          className="[&_[role=slider]]:bg-cb-accent [&_[role=slider]]:border-cb-accent"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-cb-foreground-muted">
          <span>Min RTP filter</span>
          <span className="font-mono text-cb-foreground">{rtp[0]}%</span>
        </div>
        <Slider
          value={rtp}
          onValueChange={setRtp}
          min={90}
          max={99}
          step={0.5}
          className="[&_[role=slider]]:bg-cb-accent [&_[role=slider]]:border-cb-accent"
        />
      </div>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UICheatSheetPage() {
  const [searchValue, setSearchValue] = React.useState("")
  const [selectedProvider, setSelectedProvider] = React.useState("all")
  const [progress, setProgress] = React.useState(62)
  const [activeSection, setActiveSection] = React.useState("foundations")

  // Synchronously reset scroll before first paint so the browser never
  // has a chance to restore a previous position.
  React.useLayoutEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [])

  React.useEffect(() => {
    const sectionIds = ["foundations", "primitives", "cloudbet", "states", "extended", "charts", "animations"]
    let observers: IntersectionObserver[] = []

    // Two rAF frames: first lets Next.js finish any internal scroll work,
    // second attaches observers only after the page is truly settled at top.
    const raf1 = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
      const raf2 = requestAnimationFrame(() => {
        observers = sectionIds.flatMap((id) => {
          const el = document.getElementById(id)
          if (!el) return []
          const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
            { rootMargin: "0px 0px -70% 0px", threshold: 0 }
          )
          observer.observe(el)
          return [observer]
        })
      })
      return raf2
    })

    return () => {
      cancelAnimationFrame(raf1)
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-cb-surface-1">
        {/* Sticky header */}
        <header className="sticky top-0 z-40 border-b border-cb-border bg-cb-surface-0/90 backdrop-blur-sm">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-cb-foreground-muted hover:text-cb-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Lab
            </Link>
            <Separator orientation="vertical" className="h-4 bg-cb-border" />
            <span className="text-sm font-semibold text-cb-foreground">UI Components</span>
            <Badge
              variant="outline"
              className="ml-auto border-cb-border text-cb-foreground-disabled text-[9px] uppercase tracking-wider"
            >
              Design System
            </Badge>
          </div>
        </header>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10 flex gap-8">
          {/* Sidebar nav */}
          <aside className="hidden lg:flex flex-col gap-1 w-44 shrink-0 sticky top-20 self-start">
            {[
              { id: "foundations", label: "Foundations" },
              { id: "primitives", label: "Primitives" },
              { id: "cloudbet", label: "Cloudbet" },
              { id: "states", label: "States" },
              { id: "extended", label: "Extended" },
              { id: "charts", label: "Charts" },
              { id: "animations", label: "Animations ✦" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                  setActiveSection(item.id)
                }}
                className={[
                  "text-xs transition-colors py-1 px-2 rounded text-left",
                  activeSection === item.id
                    ? "text-cb-foreground bg-cb-surface-3 font-medium"
                    : "text-cb-foreground-muted hover:text-cb-foreground hover:bg-cb-surface-3",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 flex flex-col gap-14">

            {/* ── 1. FOUNDATIONS ─────────────────────────────────────── */}
            <Section
              id="foundations"
              title="1. Foundations"
              subtitle="Core tokens: surfaces, color, type, spacing, radius, motion"
            >
              <div className="flex flex-col gap-8">

                {/* Surfaces */}
                <SubSection title="Surface scale">
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                    {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                      <Swatch
                        key={n}
                        label={`surface-${n}`}
                        className={`bg-cb-surface-${n}`}
                      />
                    ))}
                  </div>
                </SubSection>

                {/* Text colors */}
                <SubSection title="Text colors">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "foreground", cls: "text-cb-foreground" },
                      { label: "foreground-muted", cls: "text-cb-foreground-muted" },
                      { label: "foreground-disabled", cls: "text-cb-foreground-disabled" },
                      { label: "primary", cls: "text-cb-primary" },
                      { label: "accent", cls: "text-cb-accent" },
                      { label: "jackpot", cls: "text-cb-jackpot" },
                      { label: "live", cls: "text-cb-live" },
                      { label: "featured", cls: "text-cb-featured" },
                    ].map(({ label, cls }) => (
                      <div key={label} className="flex items-center gap-2 rounded-[var(--cb-radius-md)] bg-cb-surface-3 px-3 py-2">
                        <span className={`text-sm font-semibold ${cls}`}>Aa</span>
                        <span className="text-[10px] text-cb-foreground-disabled font-mono truncate">{label}</span>
                      </div>
                    ))}
                  </div>
                </SubSection>

                {/* Borders */}
                <SubSection title="Border treatments">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "subtle", cls: "border-cb-border-subtle" },
                      { label: "default", cls: "border-cb-border" },
                      { label: "visible", cls: "border-cb-border-visible" },
                      { label: "strong", cls: "border-cb-border-strong" },
                    ].map(({ label, cls }) => (
                      <div key={label} className={`rounded-[var(--cb-radius-md)] border-2 ${cls} bg-cb-surface-3 px-3 py-3`}>
                        <span className="text-[10px] text-cb-foreground-muted font-mono">{label}</span>
                      </div>
                    ))}
                  </div>
                </SubSection>

                {/* Radius */}
                <SubSection title="Radius scale">
                  <div className="flex flex-wrap gap-4 items-end">
                    {[
                      { label: "sm — 4px", style: "0.25rem" },
                      { label: "md — 12px", style: "0.75rem" },
                      { label: "lg — 16px", style: "1rem" },
                      { label: "xl — 24px", style: "1.5rem" },
                      { label: "2xl — 32px", style: "2rem" },
                      { label: "full", style: "9999px" },
                    ].map(({ label, style }) => (
                      <div key={label} className="flex flex-col items-center gap-1.5">
                        <div
                          className="size-12 bg-cb-primary/20 border border-cb-primary/40"
                          style={{ borderRadius: style }}
                        />
                        <span className="text-[10px] text-cb-foreground-muted font-mono whitespace-nowrap">{label}</span>
                      </div>
                    ))}
                  </div>
                </SubSection>

                {/* Typography */}
                <SubSection title="Typography scale">
                  <div className="flex flex-col rounded-[var(--cb-radius-lg)] bg-cb-surface-3 px-5 border border-cb-border divide-y divide-cb-border-subtle">
                    {[
                      { cls: "text-4xl font-bold", label: "4xl / bold — Hero" },
                      { cls: "text-3xl font-bold", label: "3xl / bold — Display" },
                      { cls: "text-2xl font-semibold", label: "2xl / semibold — Section" },
                      { cls: "text-xl font-semibold", label: "xl / semibold — Title" },
                      { cls: "text-lg font-medium", label: "lg / medium — Subtitle" },
                      { cls: "text-base", label: "base — Body" },
                      { cls: "text-sm", label: "sm — Secondary" },
                      { cls: "text-xs", label: "xs — Caption" },
                      { cls: "text-[10px] uppercase tracking-widest font-semibold text-cb-foreground-muted", label: "10px / caps — Label" },
                    ].map(({ cls, label }) => (
                      <div key={label} className="flex items-baseline gap-4 py-4">
                        <span className={`${cls} text-cb-foreground leading-none`}>Get in there me ol&apos; fruit</span>
                        <span className="text-[10px] text-cb-foreground-disabled font-mono shrink-0">{label}</span>
                      </div>
                    ))}
                  </div>
                </SubSection>

                {/* Spacing */}
                <SubSection title="Spacing rhythm">
                  <div className="flex flex-wrap items-end gap-4">
                    {[
                      { label: "2px", px: "2px" },
                      { label: "4px", px: "4px" },
                      { label: "8px", px: "8px" },
                      { label: "12px", px: "12px" },
                      { label: "16px", px: "16px" },
                      { label: "24px", px: "24px" },
                      { label: "32px", px: "32px" },
                      { label: "48px", px: "48px" },
                    ].map(({ label, px }) => (
                      <div key={label} className="flex flex-col items-center gap-1">
                        <div
                          className="bg-cb-primary/40 border border-cb-primary/30 rounded-sm"
                          style={{ width: px, height: "24px" }}
                        />
                        <span className="text-[9px] text-cb-foreground-disabled font-mono">{label}</span>
                      </div>
                    ))}
                  </div>
                </SubSection>

              </div>
            </Section>

            {/* ── 2. SHADCN PRIMITIVES ───────────────────────────────── */}
            <Section
              id="primitives"
              title="2. Core Primitives"
              subtitle="shadcn/ui components styled with Cloudbet tokens"
            >
              <div className="flex flex-col gap-8">

                {/* Buttons */}
                <SubSection title="Buttons — variants">
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </SubSection>

                <SubSection title="Buttons — sizes">
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="lg">Large</Button>
                    <Button size="default">Default</Button>
                    <Button size="sm">Small</Button>
                    <Button size="icon"><Star className="size-4" /></Button>
                  </div>
                </SubSection>

                <SubSection title="Buttons — disabled">
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button disabled>Default</Button>
                    <Button variant="secondary" disabled>Secondary</Button>
                    <Button variant="outline" disabled>Outline</Button>
                    <Button variant="ghost" disabled>Ghost</Button>
                  </div>
                </SubSection>

                <SubSection title="Buttons — loading">
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button isLoading>Default</Button>
                    <Button variant="secondary" isLoading>Secondary</Button>
                    <Button variant="outline" isLoading>Outline</Button>
                    <Button variant="destructive" isLoading>Danger</Button>
                  </div>
                </SubSection>

                <SubSection title="Buttons — supporting text (Medium)">
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button supportingText="Best odds guaranteed">Place Bet</Button>
                    <Button variant="outline" supportingText="No fees">Withdraw</Button>
                    <Button variant="secondary" supportingText="Instant payout">Cash Out</Button>
                  </div>
                </SubSection>

                {/* Cards */}
                <SubSection title="Cards">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-cb-surface-3 border-cb-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Default Card</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-cb-foreground-muted">surface-3 + border</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-cb-surface-4 border-cb-border shadow-[0_8px_32px_oklch(0_0_0_/_40%)]">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Elevated</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-cb-foreground-muted">surface-4 + shadow</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-cb-surface-2 border-cb-border-subtle">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-cb-foreground-muted">Muted</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-cb-foreground-disabled">surface-2 + subtle border</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-cb-featured-bg border-cb-featured-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-cb-featured">Highlighted</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-cb-foreground-muted">featured accent</p>
                      </CardContent>
                    </Card>
                  </div>
                </SubSection>

                {/* Badges */}
                <SubSection title="Badges">
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge className="border-cb-live/30 bg-cb-live-bg text-cb-live border">Live</Badge>
                    <Badge className="border-cb-primary/30 bg-cb-primary/15 text-cb-primary border">New</Badge>
                    <Badge className="border-cb-jackpot/30 bg-cb-jackpot/10 text-cb-jackpot border">Jackpot</Badge>
                    <Badge className="border-cb-featured/30 bg-cb-featured-bg text-cb-featured border">Hot</Badge>
                    <Badge className="border-cb-odds-up/30 bg-cb-odds-up-bg text-cb-odds-up border">Win</Badge>
                  </div>
                </SubSection>

                {/* Inputs */}
                <SubSection title="Inputs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                    <Input placeholder="Default input" className="bg-cb-surface-3 border-cb-border" />
                    <Input placeholder="Focused" className="bg-cb-surface-3 border-cb-primary ring-1 ring-cb-primary/30" />
                    <Input placeholder="Disabled" disabled className="bg-cb-surface-2 border-cb-border-subtle" />
                  </div>
                </SubSection>

                {/* Selects */}
                <SubSection title="Selects">
                  <div className="flex flex-wrap gap-3 max-w-md">
                    <Select defaultValue="slots">
                      <SelectTrigger className="w-48 bg-cb-surface-3 border-cb-border text-cb-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-cb-surface-5 border-cb-border">
                        <SelectItem value="all">All Games</SelectItem>
                        <SelectItem value="slots">Slots</SelectItem>
                        <SelectItem value="live">Live Casino</SelectItem>
                        <SelectItem value="table">Table Games</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select disabled>
                      <SelectTrigger className="w-48 bg-cb-surface-2 border-cb-border-subtle text-cb-foreground-disabled">
                        <SelectValue placeholder="Disabled" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="x">Option</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </SubSection>

                {/* Tabs */}
                <SubSection title="Tabs">
                  <Tabs defaultValue="casino" className="max-w-lg">
                    <TabsList className="bg-cb-surface-3 border border-cb-border">
                      <TabsTrigger value="casino">Casino</TabsTrigger>
                      <TabsTrigger value="sports">Sports</TabsTrigger>
                      <TabsTrigger value="live">Live</TabsTrigger>
                    </TabsList>
                    <TabsContent value="casino">
                      <div className="rounded-[var(--cb-radius-md)] bg-cb-surface-3 border border-cb-border p-4 mt-2">
                        <p className="text-xs text-cb-foreground-muted">Casino tab content</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="sports">
                      <div className="rounded-[var(--cb-radius-md)] bg-cb-surface-3 border border-cb-border p-4 mt-2">
                        <p className="text-xs text-cb-foreground-muted">Sports tab content</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="live">
                      <div className="rounded-[var(--cb-radius-md)] bg-cb-surface-3 border border-cb-border p-4 mt-2">
                        <p className="text-xs text-cb-foreground-muted">Live tab content</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </SubSection>

                {/* Toggle Group */}
                <SubSection title="Toggle Group">
                  <div className="flex flex-col gap-3">
                    <ToggleGroup type="single" defaultValue="slots" className="justify-start">
                      <ToggleGroupItem value="all">All</ToggleGroupItem>
                      <ToggleGroupItem value="slots">Slots</ToggleGroupItem>
                      <ToggleGroupItem value="live">Live</ToggleGroupItem>
                      <ToggleGroupItem value="table">Table</ToggleGroupItem>
                    </ToggleGroup>
                    <ToggleGroup type="multiple" className="justify-start">
                      <ToggleGroupItem value="new"><Zap className="size-3.5 mr-1" />New</ToggleGroupItem>
                      <ToggleGroupItem value="hot"><Star className="size-3.5 mr-1" />Hot</ToggleGroupItem>
                      <ToggleGroupItem value="jackpot">Jackpot</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </SubSection>

                {/* Checkbox + Radio + Switch */}
                <SubSection title="Checkbox, Radio, Switch">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Checkbox */}
                    <div className="flex flex-col gap-3 rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                      <p className="text-[10px] font-semibold text-cb-foreground-muted uppercase tracking-widest">Checkbox</p>
                      <div className="flex items-center gap-2">
                        <Checkbox id="cb-1" defaultChecked />
                        <label htmlFor="cb-1" className="text-sm text-cb-foreground cursor-pointer">Checked</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="cb-2" />
                        <label htmlFor="cb-2" className="text-sm text-cb-foreground cursor-pointer">Unchecked</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="cb-3" disabled />
                        <label htmlFor="cb-3" className="text-sm text-cb-foreground-disabled cursor-not-allowed">Disabled</label>
                      </div>
                    </div>

                    {/* Radio */}
                    <div className="flex flex-col gap-3 rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                      <p className="text-[10px] font-semibold text-cb-foreground-muted uppercase tracking-widest">Radio</p>
                      <RadioGroup defaultValue="btc">
                        {["BTC", "ETH", "USDT"].map((val) => (
                          <div key={val} className="flex items-center gap-2">
                            <RadioGroupItem value={val.toLowerCase()} id={`r-${val}`} />
                            <label htmlFor={`r-${val}`} className="text-sm text-cb-foreground cursor-pointer">{val}</label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Switch */}
                    <div className="flex flex-col gap-3 rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                      <p className="text-[10px] font-semibold text-cb-foreground-muted uppercase tracking-widest">Switch</p>
                      {[
                        { id: "sw-1", label: "Notifications", defaultChecked: true },
                        { id: "sw-2", label: "Auto-cashout", defaultChecked: false },
                        { id: "sw-3", label: "Disabled", disabled: true },
                      ].map(({ id, label, defaultChecked, disabled }) => (
                        <div key={id} className="flex items-center justify-between">
                          <label htmlFor={id} className={`text-sm ${disabled ? "text-cb-foreground-disabled" : "text-cb-foreground"} cursor-pointer`}>{label}</label>
                          <Switch id={id} defaultChecked={defaultChecked} disabled={disabled} />
                        </div>
                      ))}
                    </div>
                  </div>
                </SubSection>

                {/* Progress */}
                <SubSection title="Progress">
                  <div className="flex flex-col gap-4 max-w-md rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs text-cb-foreground-muted">
                        <span>VIP Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs text-cb-foreground-muted">
                        <span>Wagering requirement</span>
                        <span>28%</span>
                      </div>
                      <Progress value={28} className="h-1.5" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs text-cb-foreground-muted">
                        <span>Indeterminate</span>
                      </div>
                      <Progress value={undefined} className="h-2" />
                    </div>
                    <div className="flex gap-2 mt-1">
                      <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>−10</Button>
                      <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
                    </div>
                  </div>
                </SubSection>

                {/* Skeleton */}
                <SubSection title="Skeleton">
                  <div className="flex flex-col gap-3 max-w-sm rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-10 rounded-full" />
                      <div className="flex flex-col gap-2 flex-1">
                        <Skeleton className="h-3 w-3/4 rounded" />
                        <Skeleton className="h-2.5 w-1/2 rounded" />
                      </div>
                    </div>
                    <Skeleton className="h-24 w-full rounded-[var(--cb-radius-md)]" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 flex-1 rounded-[var(--cb-radius-md)]" />
                      <Skeleton className="h-8 flex-1 rounded-[var(--cb-radius-md)]" />
                    </div>
                  </div>
                </SubSection>

                {/* Table */}
                <SubSection title="Table">
                  <div className="rounded-[var(--cb-radius-lg)] border border-cb-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-cb-border bg-cb-surface-3 hover:bg-cb-surface-3">
                          <TableHead className="text-cb-foreground-muted text-xs">Game</TableHead>
                          <TableHead className="text-cb-foreground-muted text-xs">Provider</TableHead>
                          <TableHead className="text-cb-foreground-muted text-xs">RTP</TableHead>
                          <TableHead className="text-cb-foreground-muted text-xs text-right">Players</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {MOCK_GAMES.slice(0, 5).map((game) => (
                          <TableRow key={game.id} className="border-cb-border hover:bg-cb-surface-3 bg-cb-surface-2">
                            <TableCell className="text-sm text-cb-foreground font-medium">{game.title}</TableCell>
                            <TableCell className="text-xs text-cb-foreground-muted">{game.provider}</TableCell>
                            <TableCell className="text-xs text-cb-foreground-muted font-mono">{game.rtp ? `${game.rtp}%` : "—"}</TableCell>
                            <TableCell className="text-xs text-cb-foreground-muted font-mono text-right">{game.playerCount?.toLocaleString() ?? "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </SubSection>

                {/* Tooltip */}
                <SubSection title="Tooltip">
                  <div className="flex flex-wrap gap-4 items-center rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Info className="size-3.5 mr-1.5" />
                          Hover me
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">RTP: Return to Player percentage</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className="cursor-default border-cb-live/30 bg-cb-live-bg text-cb-live border">
                          <span className="size-1.5 rounded-full bg-cb-live animate-pulse mr-1.5" />
                          Live
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">3,400 players online</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </SubSection>

                {/* Dialog */}
                <SubSection title="Dialog">
                  <div className="flex flex-wrap gap-3 rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Open Dialog</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-cb-surface-5 border-cb-border">
                        <DialogHeader>
                          <DialogTitle>Confirm Bet</DialogTitle>
                          <DialogDescription className="text-cb-foreground-muted">
                            You are about to place a bet of 0.05 BTC on Gates of Olympus.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-2 justify-end mt-2">
                          <Button variant="outline" size="sm">Cancel</Button>
                          <Button size="sm">Confirm</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Sheet */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">Open Sheet</Button>
                      </SheetTrigger>
                      <SheetContent className="bg-cb-surface-4 border-cb-border">
                        <SheetHeader>
                          <SheetTitle>Bet Slip</SheetTitle>
                          <SheetDescription className="text-cb-foreground-muted">
                            Your current selections will appear here.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 flex flex-col gap-3">
                          <div className="rounded-[var(--cb-radius-md)] bg-cb-surface-5 border border-cb-border p-3">
                            <p className="text-xs font-medium text-cb-foreground">Gates of Olympus</p>
                            <p className="text-[10px] text-cb-foreground-muted mt-0.5">Pragmatic Play</p>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </SubSection>

                {/* Alert */}
                <SubSection title="Alert banners">
                  <div className="flex flex-col gap-3 max-w-2xl">
                    <Alert variant="info">
                      <AlertIcon><Info className="size-4" /></AlertIcon>
                      <AlertContent>
                        <AlertTitle>Verification required</AlertTitle>
                        <AlertDescription>Please verify your identity to continue withdrawals.</AlertDescription>
                      </AlertContent>
                    </Alert>
                    <Alert variant="success">
                      <AlertIcon><Check className="size-4" /></AlertIcon>
                      <AlertContent>
                        <AlertTitle>Bet placed successfully</AlertTitle>
                        <AlertDescription>Your bet of 0.01 BTC has been confirmed.</AlertDescription>
                      </AlertContent>
                    </Alert>
                    <Alert variant="warning">
                      <AlertIcon><Zap className="size-4" /></AlertIcon>
                      <AlertContent>
                        <AlertTitle>Odds have changed</AlertTitle>
                        <AlertDescription>The odds on your selection have moved. Please review before confirming.</AlertDescription>
                      </AlertContent>
                    </Alert>
                    <Alert variant="error">
                      <AlertIcon><Info className="size-4" /></AlertIcon>
                      <AlertContent>
                        <AlertTitle>Insufficient balance</AlertTitle>
                        <AlertDescription>You don&apos;t have enough funds. Please deposit to continue.</AlertDescription>
                      </AlertContent>
                    </Alert>
                  </div>
                </SubSection>

                {/* Chip */}
                <SubSection title="Chips">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] text-cb-foreground-disabled font-mono w-20 shrink-0">default</span>
                      <Chip>All</Chip>
                      <Chip selected>Slots</Chip>
                      <Chip>Live Casino</Chip>
                      <Chip>Table Games</Chip>
                      <Chip disabled>Disabled</Chip>
                      <ChipSkeleton />
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] text-cb-foreground-disabled font-mono w-20 shrink-0">filled</span>
                      <Chip variant="filled">All</Chip>
                      <Chip variant="filled" selected>Slots</Chip>
                      <Chip variant="filled">Live Casino</Chip>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] text-cb-foreground-disabled font-mono w-20 shrink-0">outline</span>
                      <Chip variant="outline">All</Chip>
                      <Chip variant="outline" selected>Slots</Chip>
                      <Chip variant="outline">Live Casino</Chip>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] text-cb-foreground-disabled font-mono w-20 shrink-0">with icon</span>
                      <Chip icon={<Star className="size-3.5" />}>Favourites</Chip>
                      <Chip icon={<Zap className="size-3.5" />} selected>Live</Chip>
                      <Chip trailingIcon={<ChevronDown className="size-3" />}>Category</Chip>
                    </div>
                  </div>
                </SubSection>

              </div>
            </Section>

            {/* ── 3. CLOUDBET COMPONENTS ─────────────────────────────── */}
            <Section
              id="cloudbet"
              title="3. Cloudbet Components"
              subtitle="Shared domain components built on the token system"
            >
              <div className="flex flex-col gap-10">

                {/* SectionHeader */}
                <SubSection title="SectionHeader">
                  <div className="flex flex-col gap-3 rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-5">
                    <SectionHeader title="Popular Games" subtitle="Most played in the last 24 hours" />
                    <Separator className="bg-cb-border" />
                    <SectionHeader
                      title="Live Casino"
                      action={<Button size="sm" variant="ghost" className="text-xs text-cb-foreground-muted">View all</Button>}
                    />
                  </div>
                </SubSection>

                {/* GameTile */}
                <SubSection title="GameTile">
                  <div className="flex flex-wrap gap-3">
                    <GameTile game={MOCK_GAMES[0]} size="sm" />
                    <GameTile game={MOCK_GAMES[1]} size="sm" />
                    <GameTile game={MOCK_GAMES[15]} size="sm" />
                    <GameTile game={MOCK_GAMES[11]} size="sm" featured />
                    <GameTile game={MOCK_GAMES[5]} size="lg" />
                  </div>
                </SubSection>

                {/* JackpotCard */}
                <SubSection title="JackpotCard">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
                    {MOCK_JACKPOTS.map((j) => (
                      <JackpotCard key={j.id} jackpot={j} />
                    ))}
                  </div>
                </SubSection>

                {/* ProviderFilterBar */}
                <SubSection title="ProviderFilterBar">
                  <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <ProviderFilterBar
                      providers={MOCK_PROVIDERS.slice(0, 6)}
                      searchValue={searchValue}
                      onSearchChange={setSearchValue}
                      selectedProvider={selectedProvider}
                      onProviderChange={setSelectedProvider}
                    />
                  </div>
                </SubSection>

                {/* StudioRail */}
                <SubSection title="StudioRail">
                  <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <StudioRail providers={MOCK_PROVIDERS.slice(0, 8)} />
                  </div>
                </SubSection>

                {/* FeedSectionShell */}
                <SubSection title="FeedSectionShell">
                  <FeedSectionShell betFeed={MOCK_BET_FEED} winFeed={MOCK_WIN_FEED} />
                </SubSection>

                {/* OddsButton */}
                <SubSection title="OddsButton">
                  <OddsButtonStyles />
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] text-cb-foreground-disabled font-mono w-20 shrink-0">states</span>
                      <OddsButton label="Home" odds="2.45" />
                      <OddsButton label="Draw" odds="3.10" selected />
                      <OddsButton label="Away" odds="2.90" suspended />
                      <OddsButton label="Over 2.5" odds="1.85" disabled />
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] text-cb-foreground-disabled font-mono w-20 shrink-0">flash up</span>
                      <OddsButton label="Home" odds="2.60" flashDirection="up" />
                      <OddsButton label="Draw" odds="3.20" flashDirection="up" />
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] text-cb-foreground-disabled font-mono w-20 shrink-0">flash down</span>
                      <OddsButton label="Home" odds="2.30" flashDirection="down" />
                      <OddsButton label="Draw" odds="2.95" flashDirection="down" />
                    </div>
                  </div>
                </SubSection>

              </div>
            </Section>

            {/* ── 4. STATES ──────────────────────────────────────────── */}
            <Section
              id="states"
              title="4. State Review"
              subtitle="Interactive states across the component palette"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Default */}
                <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4 flex flex-col gap-3">
                  <p className="text-[10px] font-semibold text-cb-foreground-muted uppercase tracking-widest">Default</p>
                  <Button variant="outline" className="w-full justify-start">Place Bet</Button>
                  <div className="rounded-[var(--cb-radius-md)] bg-cb-surface-4 border border-cb-border p-3">
                    <p className="text-xs text-cb-foreground">Gates of Olympus</p>
                    <p className="text-[10px] text-cb-foreground-muted">Pragmatic Play</p>
                  </div>
                  <Badge variant="outline" className="w-fit">Idle</Badge>
                </div>

                {/* Hover — instructional */}
                <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4 flex flex-col gap-3">
                  <p className="text-[10px] font-semibold text-cb-foreground-muted uppercase tracking-widest">Hover</p>
                  <Button variant="outline" className="w-full justify-start border-cb-border-visible bg-cb-surface-4">Hover state</Button>
                  <div className="rounded-[var(--cb-radius-md)] bg-cb-surface-4 border border-cb-border-visible shadow-[0_8px_32px_oklch(0_0_0_/_40%)] p-3 -translate-y-0.5">
                    <p className="text-xs text-cb-foreground">Gates of Olympus</p>
                    <p className="text-[10px] text-cb-foreground-muted">Pragmatic Play</p>
                  </div>
                  <Badge className="w-fit border-cb-border-visible border bg-cb-surface-4 text-cb-foreground">Hovered</Badge>
                </div>

                {/* Active */}
                <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4 flex flex-col gap-3">
                  <p className="text-[10px] font-semibold text-cb-foreground-muted uppercase tracking-widest">Active / Pressed</p>
                  <Button className="w-full justify-start scale-[0.98] shadow-none">Pressed</Button>
                  <div className="rounded-[var(--cb-radius-md)] bg-cb-surface-5 border border-cb-primary/30 p-3">
                    <p className="text-xs text-cb-foreground">Active card</p>
                    <p className="text-[10px] text-cb-foreground-muted">ring-primary</p>
                  </div>
                </div>

                {/* Selected */}
                <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4 flex flex-col gap-3">
                  <p className="text-[10px] font-semibold text-cb-foreground-muted uppercase tracking-widest">Selected</p>
                  <ToggleGroup type="single" defaultValue="live" className="justify-start">
                    <ToggleGroupItem value="all">All</ToggleGroupItem>
                    <ToggleGroupItem value="live">Live</ToggleGroupItem>
                    <ToggleGroupItem value="slots">Slots</ToggleGroupItem>
                  </ToggleGroup>
                  <div className="flex gap-2">
                    <Checkbox id="sel-1" defaultChecked />
                    <label htmlFor="sel-1" className="text-sm text-cb-foreground">Selected option</label>
                  </div>
                  <Badge className="w-fit border-cb-primary/40 bg-cb-primary/15 text-cb-primary border">Selected</Badge>
                </div>

                {/* Disabled */}
                <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4 flex flex-col gap-3">
                  <p className="text-[10px] font-semibold text-cb-foreground-muted uppercase tracking-widest">Disabled</p>
                  <Button disabled className="w-full justify-start disabled:text-white/40">Disabled button</Button>
                  <Input disabled placeholder="Disabled input" className="bg-cb-surface-2 border-cb-border-subtle" />
                  <div className="rounded-[var(--cb-radius-md)] bg-cb-surface-2 border border-cb-border-subtle p-3 opacity-50">
                    <p className="text-xs text-cb-foreground-disabled">Disabled card</p>
                  </div>
                  <Badge variant="outline" className="w-fit text-cb-foreground-disabled border-cb-border-subtle opacity-60">Disabled</Badge>
                </div>

                {/* Loading */}
                <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4 flex flex-col gap-3">
                  <p className="text-[10px] font-semibold text-cb-foreground-muted uppercase tracking-widest">Loading</p>
                  <Button disabled className="w-full justify-start">
                    <Loader2 className="size-3.5 mr-2 animate-spin" />
                    Processing…
                  </Button>
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-full rounded" />
                    <Skeleton className="h-3 w-4/5 rounded" />
                    <Skeleton className="h-3 w-2/3 rounded" />
                  </div>
                  <Progress value={undefined} className="h-1.5" />
                </div>

              </div>
            </Section>

            {/* ── 5. EXTENDED PRIMITIVES ─────────────────────────────── */}
            <Section
              id="extended"
              title="5. Extended Primitives"
              subtitle="Newly installed shadcn/ui components — forms, navigation, overlays"
            >
              <div className="flex flex-col gap-8">

                {/* Accordion */}
                <SubSection title="Accordion">
                  <Accordion type="single" collapsible className="max-w-lg rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border overflow-hidden">
                    {[
                      { value: "deposits", title: "Deposits & Withdrawals", body: "Supports BTC, ETH, USDT, and 20+ other cryptocurrencies. Instant deposits, withdrawals processed within 10 minutes." },
                      { value: "bonuses", title: "Bonus Terms", body: "Welcome bonus of 100% up to 5 BTC. 30x wagering requirement applies. Valid for 30 days after activation." },
                      { value: "vip", title: "VIP Program", body: "Earn loyalty points on every bet. Redeem for cash, free spins, and exclusive tournament entries." },
                    ].map(({ value, title, body }) => (
                      <AccordionItem key={value} value={value} className="border-cb-border">
                        <AccordionTrigger className="px-4 text-sm text-cb-foreground hover:text-cb-foreground hover:no-underline">
                          {title}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 text-xs text-cb-foreground-muted">
                          {body}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </SubSection>

                {/* Avatar */}
                <SubSection title="Avatar">
                  <div className="flex flex-wrap gap-4 items-end">
                    {[
                      { size: "size-10", fallback: "CB" },
                      { size: "size-10", fallback: "VIP", className: "bg-cb-primary/20 text-cb-primary" },
                      { size: "size-8", fallback: "JD" },
                      { size: "size-12", fallback: "★", className: "bg-cb-jackpot/20 text-cb-jackpot" },
                    ].map(({ size, fallback, className }, i) => (
                      <Avatar key={i} className={size}>
                        <AvatarImage src="" />
                        <AvatarFallback className={`text-xs font-bold bg-cb-surface-4 text-cb-foreground ${className ?? ""}`}>
                          {fallback}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </SubSection>

                {/* Breadcrumb */}
                <SubSection title="Breadcrumb">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#" className="text-cb-foreground-muted hover:text-cb-foreground text-xs">Casino</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-cb-foreground-disabled" />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#" className="text-cb-foreground-muted hover:text-cb-foreground text-xs">Slots</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-cb-foreground-disabled" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-cb-foreground text-xs font-medium">Gates of Olympus</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </SubSection>

                {/* Collapsible */}
                <SubSection title="Collapsible">
                  <CollapsibleDemo />
                </SubSection>

                {/* Command */}
                <SubSection title="Command palette">
                  <div className="max-w-sm rounded-[var(--cb-radius-lg)] border border-cb-border overflow-hidden">
                    <Command className="bg-cb-surface-3">
                      <CommandInput placeholder="Search games, providers…" className="text-cb-foreground" />
                      <CommandList>
                        <CommandEmpty className="text-xs text-cb-foreground-muted py-4 text-center">No results found.</CommandEmpty>
                        <CommandGroup heading="Games" className="text-cb-foreground-muted">
                          {["Gates of Olympus", "Sweet Bonanza", "Book of Dead"].map((g) => (
                            <CommandItem key={g} className="text-sm text-cb-foreground cursor-pointer">{g}</CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandGroup heading="Providers">
                          {["Pragmatic Play", "NetEnt", "Play'n GO"].map((p) => (
                            <CommandItem key={p} className="text-sm text-cb-foreground cursor-pointer">{p}</CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </div>
                </SubSection>

                {/* Drawer */}
                <SubSection title="Drawer (bottom sheet)">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" size="sm">Open Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent className="bg-cb-surface-4 border-cb-border">
                      <DrawerHeader>
                        <DrawerTitle>Bet Slip</DrawerTitle>
                        <DrawerDescription className="text-cb-foreground-muted">
                          Review your selections before placing.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="px-4 pb-2 flex flex-col gap-3">
                        <div className="rounded-[var(--cb-radius-md)] bg-cb-surface-5 border border-cb-border p-3">
                          <p className="text-xs font-medium text-cb-foreground">Man City vs Arsenal — Home Win</p>
                          <p className="text-[10px] text-cb-foreground-muted mt-0.5">Odds: 2.45</p>
                        </div>
                      </div>
                      <DrawerFooter>
                        <Button>Place Bet — 0.05 BTC</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </SubSection>

                {/* HoverCard */}
                <SubSection title="HoverCard">
                  <div className="flex flex-wrap gap-4 items-center rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="link" className="text-cb-accent p-0 h-auto">
                          @pragmaticplay
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="bg-cb-surface-5 border-cb-border w-64">
                        <div className="flex gap-3 items-start">
                          <Avatar className="size-9">
                            <AvatarFallback className="bg-cb-surface-4 text-cb-foreground text-xs font-bold">PP</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-cb-foreground">Pragmatic Play</p>
                            <p className="text-xs text-cb-foreground-muted mt-0.5">200+ premium casino games. Slots, live casino, bingo and more.</p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Badge className="cursor-pointer border-cb-jackpot/30 bg-cb-jackpot/10 text-cb-jackpot border">
                          <Trophy className="size-3 mr-1" />
                          Jackpot
                        </Badge>
                      </HoverCardTrigger>
                      <HoverCardContent className="bg-cb-surface-5 border-cb-border w-52">
                        <p className="text-xs text-cb-foreground-muted">Current jackpot pool across all eligible games.</p>
                        <p className="text-lg font-bold text-cb-jackpot mt-1">$2,847,391</p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </SubSection>

                {/* InputOTP */}
                <SubSection title="Input OTP / PIN">
                  <div className="flex flex-col gap-4 max-w-sm rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <Label className="text-xs text-cb-foreground-muted">2FA Code</Label>
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="bg-cb-surface-4 border-cb-border text-cb-foreground" />
                        <InputOTPSlot index={1} className="bg-cb-surface-4 border-cb-border text-cb-foreground" />
                        <InputOTPSlot index={2} className="bg-cb-surface-4 border-cb-border text-cb-foreground" />
                        <InputOTPSlot index={3} className="bg-cb-surface-4 border-cb-border text-cb-foreground" />
                        <InputOTPSlot index={4} className="bg-cb-surface-4 border-cb-border text-cb-foreground" />
                        <InputOTPSlot index={5} className="bg-cb-surface-4 border-cb-border text-cb-foreground" />
                      </InputOTPGroup>
                    </InputOTP>
                    <p className="text-[10px] text-cb-foreground-disabled">Enter the 6-digit code from your authenticator app.</p>
                  </div>
                </SubSection>

                {/* Label + Textarea */}
                <SubSection title="Label + Textarea">
                  <div className="flex flex-col gap-3 max-w-sm">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="note" className="text-xs text-cb-foreground-muted">Withdrawal note</Label>
                      <Textarea
                        id="note"
                        placeholder="Optional note for this transaction…"
                        className="bg-cb-surface-3 border-cb-border text-cb-foreground resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs text-cb-foreground-disabled">Disabled</Label>
                      <Textarea
                        disabled
                        placeholder="Disabled textarea"
                        className="bg-cb-surface-2 border-cb-border-subtle text-cb-foreground-disabled resize-none"
                        rows={2}
                      />
                    </div>
                  </div>
                </SubSection>

                {/* Slider */}
                <SubSection title="Slider">
                  <div className="flex flex-col gap-5 max-w-sm rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <SliderDemo />
                  </div>
                </SubSection>

                {/* Pagination */}
                <SubSection title="Pagination">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" className="text-cb-foreground-muted hover:text-cb-foreground" />
                      </PaginationItem>
                      {[1, 2, 3].map((p) => (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href="#"
                            isActive={p === 2}
                            className={p === 2 ? "bg-cb-accent text-black border-cb-accent" : "text-cb-foreground-muted hover:text-cb-foreground"}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationEllipsis className="text-cb-foreground-disabled" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" className="text-cb-foreground-muted hover:text-cb-foreground">12</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" className="text-cb-foreground-muted hover:text-cb-foreground" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </SubSection>

                {/* Popover */}
                <SubSection title="Popover">
                  <div className="flex flex-wrap gap-3 items-center rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Info className="size-3.5 mr-1.5" />
                          Bet limits
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="bg-cb-surface-5 border-cb-border w-52 p-3">
                        <div className="flex flex-col gap-1.5">
                          <p className="text-xs font-semibold text-cb-foreground">Bet Limits</p>
                          <div className="flex justify-between text-xs text-cb-foreground-muted">
                            <span>Min</span><span className="font-mono text-cb-foreground">0.0001 BTC</span>
                          </div>
                          <div className="flex justify-between text-xs text-cb-foreground-muted">
                            <span>Max</span><span className="font-mono text-cb-foreground">1.0 BTC</span>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </SubSection>

                {/* Resizable */}
                <SubSection title="Resizable panels">
                  <div className="h-32 rounded-[var(--cb-radius-lg)] border border-cb-border overflow-hidden max-w-lg">
                    <ResizablePanelGroup orientation="horizontal">
                      <ResizablePanel defaultSize={60} className="bg-cb-surface-3 p-3">
                        <p className="text-xs text-cb-foreground-muted">Left panel</p>
                        <p className="text-sm text-cb-foreground font-medium mt-1">Game list</p>
                      </ResizablePanel>
                      <ResizableHandle className="bg-cb-border" />
                      <ResizablePanel defaultSize={40} className="bg-cb-surface-2 p-3">
                        <p className="text-xs text-cb-foreground-muted">Right panel</p>
                        <p className="text-sm text-cb-foreground font-medium mt-1">Bet slip</p>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </div>
                </SubSection>

              </div>
            </Section>

            {/* ── 6. CHARTS ──────────────────────────────────────────── */}
            <Section
              id="charts"
              title="6. Charts"
              subtitle="Recharts via shadcn chart wrapper — styled with Cloudbet tokens"
            >
              <div className="flex flex-col gap-8">

                {/* Area chart */}
                <SubSection title="Area — Bet volume (7 days)">
                  <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <ChartContainer
                      config={{
                        bets: { label: "Bets", color: "var(--cb-primary)" },
                        wins: { label: "Wins", color: "var(--cb-odds-up)" },
                      }}
                      className="h-48 w-full"
                    >
                      <AreaChart data={BET_VOLUME_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                        <defs>
                          <linearGradient id="betGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--cb-primary)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--cb-primary)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="winGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--cb-odds-up)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--cb-odds-up)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--cb-border)" vertical={false} />
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--cb-foreground-muted)" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--cb-foreground-muted)" }} axisLine={false} tickLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="bets" stroke="var(--cb-primary)" fill="url(#betGrad)" strokeWidth={2} dot={false} />
                        <Area type="monotone" dataKey="wins" stroke="var(--cb-odds-up)" fill="url(#winGrad)" strokeWidth={2} dot={false} />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </SubSection>

                {/* Bar chart */}
                <SubSection title="Bar — Game popularity">
                  <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <ChartContainer
                      config={{
                        players: { label: "Players", color: "var(--cb-primary)" },
                      }}
                      className="h-44 w-full"
                    >
                      <BarChart data={GAME_POPULARITY_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--cb-border)" vertical={false} />
                        <XAxis dataKey="game" tick={{ fontSize: 9, fill: "var(--cb-foreground-muted)" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--cb-foreground-muted)" }} axisLine={false} tickLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="players" fill="var(--cb-primary)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </SubSection>

                {/* Line chart */}
                <SubSection title="Line — Jackpot history">
                  <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4">
                    <ChartContainer
                      config={{
                        amount: { label: "Jackpot ($)", color: "var(--cb-jackpot)" },
                      }}
                      className="h-44 w-full"
                    >
                      <LineChart data={JACKPOT_HISTORY_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--cb-border)" vertical={false} />
                        <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--cb-foreground-muted)" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--cb-foreground-muted)" }} axisLine={false} tickLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="amount" stroke="var(--cb-jackpot)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </SubSection>

                {/* Pie chart */}
                <SubSection title="Pie — Game category split">
                  <div className="rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-4 flex items-center gap-6 flex-wrap">
                    <ChartContainer
                      config={{
                        slots: { label: "Slots", color: "var(--cb-primary)" },
                        live: { label: "Live", color: "var(--cb-live)" },
                        table: { label: "Table", color: "var(--cb-info)" },
                        other: { label: "Other", color: "var(--cb-foreground-muted)" },
                      }}
                      className="h-44 w-44 shrink-0"
                    >
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={CATEGORY_SPLIT_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3}>
                          {CATEGORY_SPLIT_DATA.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                    <div className="flex flex-col gap-2">
                      {CATEGORY_SPLIT_DATA.map(({ name, value, color }) => (
                        <div key={name} className="flex items-center gap-2">
                          <div className="size-2.5 rounded-full shrink-0" style={{ background: color }} />
                          <span className="text-xs text-cb-foreground-muted">{name}</span>
                          <span className="text-xs font-mono text-cb-foreground ml-auto pl-4">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SubSection>

              </div>
            </Section>

            {/* ── 7. ANIMATIONS ──────────────────────────────────────── */}
            <Section
              id="animations"
              title="7. Animations"
              subtitle="Magic UI components — number tickers, shimmer, gradient text, border beams, sparkles"
            >
              <div className="flex flex-col gap-8">

                {/* NumberTicker */}
                <SubSection title="NumberTicker — animated count-up">
                  <div className="flex flex-wrap gap-6 items-end rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-6">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-cb-foreground-disabled font-mono uppercase tracking-widest">Jackpot</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-cb-jackpot font-mono">$</span>
                        <NumberTicker
                          value={2847391}
                          className="text-3xl font-bold text-cb-jackpot tabular-nums"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-cb-foreground-disabled font-mono uppercase tracking-widest">Players online</span>
                      <NumberTicker
                        value={34218}
                        className="text-2xl font-bold text-cb-foreground tabular-nums"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-cb-foreground-disabled font-mono uppercase tracking-widest">Win rate</span>
                      <div className="flex items-baseline gap-0.5">
                        <NumberTicker
                          value={96}
                          className="text-2xl font-bold text-cb-odds-up tabular-nums"
                        />
                        <span className="text-sm text-cb-odds-up font-bold">%</span>
                      </div>
                    </div>
                  </div>
                </SubSection>

                {/* AnimatedGradientText */}
                <SubSection title="AnimatedGradientText — hero headings">
                  <div className="flex flex-col gap-4 rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-6">
                    <AnimatedGradientText
                      colorFrom="var(--cb-primary)"
                      colorTo="var(--cb-purple-50)"
                      className="text-4xl font-bold"
                    >
                      Play to Win
                    </AnimatedGradientText>
                    <AnimatedGradientText
                      colorFrom="var(--cb-jackpot)"
                      colorTo="var(--cb-odds-up)"
                      speed={2}
                      className="text-2xl font-semibold"
                    >
                      Jackpot Season
                    </AnimatedGradientText>
                    <AnimatedGradientText
                      colorFrom="var(--cb-live)"
                      colorTo="var(--cb-info)"
                      speed={0.5}
                      className="text-xl font-medium"
                    >
                      Live Casino — Now Open
                    </AnimatedGradientText>
                  </div>
                </SubSection>

                {/* ShimmerButton */}
                <SubSection title="ShimmerButton — premium CTAs">
                  <div className="flex flex-wrap gap-4 items-center rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-6">
                    <ShimmerButton
                      background="var(--cb-primary)"
                      shimmerColor="rgba(0,0,0,0.5)"
                      className="text-black font-bold text-sm px-6 py-2.5"
                    >
                      Claim Bonus
                    </ShimmerButton>
                    <ShimmerButton
                      background="var(--cb-surface-4)"
                      shimmerColor="var(--cb-primary)"
                      shimmerDuration="2s"
                      className="text-cb-foreground font-semibold text-sm px-6 py-2.5"
                    >
                      <Trophy className="size-4 mr-2 inline" />
                      VIP Lounge
                    </ShimmerButton>
                    <ShimmerButton
                      background="var(--cb-jackpot)"
                      shimmerColor="rgba(255,255,255,0.4)"
                      shimmerDuration="1.5s"
                      className="text-black font-bold text-sm px-6 py-2.5"
                    >
                      <TrendingUp className="size-4 mr-2 inline" />
                      Jackpot
                    </ShimmerButton>
                  </div>
                </SubSection>

                {/* BorderBeam */}
                <SubSection title="BorderBeam — animated card borders">
                  <div className="flex flex-wrap gap-4">
                    <div className="relative rounded-[var(--cb-radius-xl)] bg-cb-surface-3 border border-cb-border p-5 overflow-hidden w-52">
                      <BorderBeam colorFrom="var(--cb-primary)" colorTo="var(--cb-purple-50)" duration={4} />
                      <p className="text-xs text-cb-foreground-muted">Featured</p>
                      <p className="text-sm font-bold text-cb-foreground mt-1">Gates of Olympus</p>
                      <p className="text-[10px] text-cb-foreground-disabled mt-0.5">Pragmatic Play</p>
                      <Badge className="mt-2 border-cb-primary/30 bg-cb-primary/15 text-cb-primary border text-[10px]">Hot</Badge>
                    </div>
                    <div className="relative rounded-[var(--cb-radius-xl)] bg-cb-surface-3 border border-cb-border p-5 overflow-hidden w-52">
                      <BorderBeam colorFrom="var(--cb-jackpot)" colorTo="var(--cb-odds-up)" duration={3} />
                      <p className="text-xs text-cb-foreground-muted">Jackpot</p>
                      <p className="text-sm font-bold text-cb-jackpot mt-1">Mega Moolah</p>
                      <p className="text-[10px] text-cb-foreground-disabled mt-0.5">Microgaming</p>
                      <p className="text-lg font-bold text-cb-jackpot mt-1.5">$4.2M</p>
                    </div>
                    <div className="relative rounded-[var(--cb-radius-xl)] bg-cb-surface-3 border border-cb-border p-5 overflow-hidden w-52">
                      <BorderBeam colorFrom="var(--cb-live)" colorTo="var(--cb-info)" duration={5} reverse />
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="size-1.5 rounded-full bg-cb-live animate-pulse" />
                        <p className="text-xs text-cb-live font-medium">Live</p>
                      </div>
                      <p className="text-sm font-bold text-cb-foreground">Lightning Roulette</p>
                      <p className="text-[10px] text-cb-foreground-disabled mt-0.5">Evolution Gaming</p>
                    </div>
                  </div>
                </SubSection>

                {/* SparklesText */}
                <SubSection title="SparklesText — celebration moments">
                  <div className="flex flex-col gap-6 rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border p-6 items-start">
                    <SparklesText
                      colors={{ first: "var(--cb-primary)", second: "var(--cb-jackpot)" }}
                      sparklesCount={8}
                      className="text-4xl font-bold text-cb-foreground"
                    >
                      Big Win!
                    </SparklesText>
                    <SparklesText
                      colors={{ first: "var(--cb-live)", second: "var(--cb-odds-up)" }}
                      sparklesCount={6}
                      className="text-2xl font-semibold text-cb-foreground"
                    >
                      Jackpot Winner
                    </SparklesText>
                    <SparklesText
                      colors={{ first: "var(--cb-purple-50)", second: "var(--cb-info)" }}
                      sparklesCount={5}
                      className="text-xl font-medium text-cb-foreground"
                    >
                      VIP Unlocked
                    </SparklesText>
                  </div>
                </SubSection>

              </div>
            </Section>

          </main>
        </div>

        {/* Footer */}
        <footer className="border-t border-cb-border py-4 px-4 sm:px-6 lg:px-8 mt-10">
          <p className="text-xs text-cb-foreground-disabled text-center">
            Cloudbet UI Lab — UI Components. Internal tooling only.
          </p>
        </footer>
      </div>
    </TooltipProvider>
  )
}
