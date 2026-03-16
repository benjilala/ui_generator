import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FlowList, type FlowCardStatus } from "@/components/patterns/FlowCard"
import { ResourceGroup, type ResourceEntry } from "@/components/patterns/ResourceGroup"

// ─── Lab screens ─────────────────────────────────────────────────────────────

// Left column: in-progress items. Right column: placeholder items.
// Rendered as two explicit columns so order is guaranteed.
const LEFT_AREAS = [
  {
    href: "/ui",
    title: "UI Components",
    description:
      "Complete design system reference: surfaces, typography, shadcn primitives, and all Cloudbet shared components. The canonical source of truth for the component library.",
    status: "in-progress" as const,
    tags: ["Foundations", "Primitives", "CloudbetComponents", "States"],
  },
  {
    href: "/casino",
    title: "Casino Lobby",
    description:
      "Full lobby composition — hero carousel, category discovery, game rails, jackpot feeds, and provider filtering. Validates the core casino pattern system.",
    status: "in-progress" as const,
    tags: ["PromoHero", "CategoryChipGroup", "GameGrid", "JackpotSection", "FeedSectionShell"],
  },
  {
    href: "/generated",
    title: "Generated from Prompts",
    description:
      "Prompt-generated UI explorations built from Cloudbet patterns, components, and mock data.",
    status: "in-progress" as const,
    tags: ["PromptUI", "AgentFlow", "GeneratedScreens"],
  },
]

const RIGHT_AREAS = [
  {
    href: "/sportsbook",
    title: "Sportsbook",
    description:
      "Event listings, market rows, odds buttons, live score integration, and bet slip composition. Validates the core sports betting pattern system.",
    status: "placeholder" as const,
    tags: ["MarketRow", "OddsButton", "BetSlip", "LiveScore"],
  },
  {
    href: "/vip",
    title: "VIP",
    description:
      "Tier progression, exclusive offer surfaces, personal account management, and cashback dashboard. Validates the loyalty and retention pattern system.",
    status: "placeholder" as const,
    tags: ["TierCard", "ProgressMeter", "CashbackWidget"],
  },
  {
    href: "/experiments",
    title: "Experiments",
    description:
      "Sandbox for emerging patterns — Magic Markets concepts, prediction market UI, and novel interaction models not yet in production.",
    status: "placeholder" as const,
    tags: ["MagicMarkets", "PredictionCard", "OddsBoard"],
  },
]

// ─── Agent flow steps ─────────────────────────────────────────────────────────

interface FlowStep {
  step: number
  title: string
  description: string
  detail: string
  status: FlowCardStatus
}

const AGENT_FLOW: FlowStep[] = [
  {
    step: 1,
    title: "Request",
    description: "A natural-language prompt or structured intent triggers the agent.",
    detail:
      "The request can be as simple as 'build the casino lobby home screen' or as specific as a pattern key. The agent accepts both freeform intent and structured input from the product pattern system.",
    status: "active",
  },
  {
    step: 2,
    title: "Interpret intent",
    description: "The agent identifies the product area, screen type, and relevant pattern.",
    detail:
      "The agent maps the request to a product area (casino, sportsbook, VIP, promotions) and a screen type. It then resolves the matching Cloudbet product pattern from the pattern system.",
    status: "active",
  },
  {
    step: 3,
    title: "Load product pattern",
    description: "The matching pattern is read — layout, components, data dependencies.",
    detail:
      "The agent reads the pattern definition from lib/system/product-patterns.ts. This includes the required layout structure, primary and optional components, layout hierarchy, and data dependencies.",
    status: "active",
  },
  {
    step: 4,
    title: "Load generation rules",
    description: "Rules constrain how the agent composes UI — tokens, hierarchy, naming.",
    detail:
      "Generation rules from lib/system/generation-rules.md define how the agent must compose UI: which token classes to use, how to structure the component hierarchy, naming conventions, and which patterns are off-limits.",
    status: "active",
  },
  {
    step: 5,
    title: "Reuse Cloudbet components",
    description: "The agent selects from the existing library rather than generating new primitives.",
    detail:
      "Tokens, variants, and compositions are reused directly. The agent does not invent new primitives — it selects from the Cloudbet component library and shadcn primitives already defined in the lab.",
    status: "active",
  },
  {
    step: 6,
    title: "Build UI structure",
    description: "A component tree or DSL form is produced before any code is written.",
    detail:
      "The agent produces a structured intermediate representation of the screen — a component tree or DSL — before writing implementation code. This intermediate form can be reviewed or modified before generation proceeds.",
    status: "next",
  },
  {
    step: 7,
    title: "Generate screen",
    description: "The agent writes the React/TSX implementation from the pattern definition.",
    detail:
      "The agent writes the full React/TSX implementation, applying Cloudbet tokens, shadcn primitives, and domain components as defined in the pattern. The output is a working screen, not a scaffold.",
    status: "active",
  },
  {
    step: 8,
    title: "Review and refine",
    description: "Output is reviewed against the design critic prompt. The agent can iterate.",
    detail:
      "The generated screen is reviewed against the design critic prompt for layout quality, token correctness, and UX soundness. The agent can iterate on layout, copy, state handling, and edge cases before the output is accepted.",
    status: "active",
  },
  {
    step: 9,
    title: "Promote reusable parts",
    description: "New patterns discovered during generation are fed back into the system.",
    detail:
      "New compositions, component variants, or layout patterns discovered during generation are extracted and added to the product pattern system. This makes the system progressively more capable with each generation cycle.",
    status: "next",
  },
]

// ─── Feature generation flow steps ───────────────────────────────────────────

const FEATURE_FLOW: FlowStep[] = [
  {
    step: 1,
    title: "Feature request",
    description: "A product feature is described at intent level.",
    detail:
      "The request is expressed as a product outcome — 'add a VIP tier progression screen' or 'build the bet history flow'. The agent does not require a detailed spec to begin.",
    status: "next",
  },
  {
    step: 2,
    title: "Identify feature type",
    description: "The agent classifies the feature to determine the generation strategy.",
    detail:
      "The agent classifies the feature into one of five types: discovery, transaction, account, engagement, or promotional. The classification determines which generation strategy, pattern set, and component library is applied.",
    status: "next",
  },
  {
    step: 3,
    title: "Break into capability parts",
    description: "The feature is decomposed into discrete UI capabilities.",
    detail:
      "The feature is broken down into its constituent capabilities: screens, states, sub-flows, and edge cases. Each part is treated as an independently generatable unit that can be composed back into the full feature.",
    status: "next",
  },
  {
    step: 4,
    title: "Define UX flow",
    description: "The agent maps the full user journey before generating any UI.",
    detail:
      "Entry point, primary path, error states, empty states, and exit conditions are all mapped before any UI is generated. This ensures the generated screens are coherent as a flow, not just as isolated screens.",
    status: "future",
  },
  {
    step: 5,
    title: "Define states and edge cases",
    description: "All meaningful states are enumerated before any code is written.",
    detail:
      "Loading, empty, error, partial, success, and authenticated vs guest variants are all defined upfront. This prevents incomplete implementations and ensures the generated UI handles real product conditions.",
    status: "future",
  },
  {
    step: 6,
    title: "Map to product patterns",
    description: "Each capability part is matched to an existing pattern or flagged as new.",
    detail:
      "The agent maps each capability part to an existing product pattern. Parts that have no matching pattern are flagged for human review and added to the pattern backlog — extending the system rather than bypassing it.",
    status: "future",
  },
  {
    step: 7,
    title: "Generate data contracts",
    description: "Mock data shapes and API contracts are defined before UI is built.",
    detail:
      "Mock data shapes and API contracts are generated first, giving the UI a stable interface to build against. This decouples UI generation from backend availability and makes the output immediately testable.",
    status: "future",
  },
  {
    step: 8,
    title: "Build screens and subcomponents",
    description: "Screens are generated in dependency order, reusing the component library.",
    detail:
      "Screens and their subcomponents are generated in dependency order — shared components first, then composed screens. The Cloudbet component library is used throughout; no new primitives are invented.",
    status: "future",
  },
  {
    step: 9,
    title: "Add interactions and logic",
    description: "State transitions and user interactions are layered in after structural UI is stable.",
    detail:
      "State transitions, loading sequences, error handling, and user interactions are added after the structural UI is stable. Separating structure from behaviour reduces generation errors and makes review easier.",
    status: "future",
  },
  {
    step: 10,
    title: "Return feature slice",
    description: "An implementation-ready feature slice is returned with screens, mocks, and types.",
    detail:
      "The agent returns a complete, implementation-ready feature slice: screens, subcomponents, mock data, TypeScript types, and a summary of what was generated and what still requires human review before production.",
    status: "future",
  },
]

// ─── Resource groups ──────────────────────────────────────────────────────────

const DESIGN_SYSTEM_RESOURCES: ResourceEntry[] = [
  {
    title: "Design System",
    description: "CSS custom properties, surface tokens, and component-level variables",
    path: "styles/design-system.css",
    status: "available",
  },
  {
    title: "Global Styles",
    description: "Global resets and base styles",
    path: "app/globals.css",
    status: "available",
  },
  {
    title: "Token Reference",
    description: "Typed Cloudbet token maps for CVA variants",
    path: "lib/tokens/cloudbet.ts",
    status: "available",
  },
]

const PROMPTS_RESOURCES: ResourceEntry[] = [
  {
    title: "Cloudbet UI Agent",
    description: "Core agent prompt for UI generation",
    path: "lib/prompts/cloudbet-ui-agent.md",
    status: "available",
  },
  {
    title: "UI Screen Generator",
    description: "Screen generation workflow and instructions",
    path: "lib/prompts/ui-screen-generator.md",
    status: "available",
  },
  {
    title: "Component Architect",
    description: "Component architecture rules and composition patterns",
    path: "lib/prompts/component-architect.md",
    status: "available",
  },
  {
    title: "UX Explorer",
    description: "UX exploration and ideation prompt",
    path: "lib/prompts/ux-explorer.md",
    status: "available",
  },
  {
    title: "Design Critic",
    description: "Design review and critique prompt",
    path: "lib/prompts/design-critic.md",
    status: "available",
  },
  {
    title: "Casino Migration Auditor",
    description: "Casino component migration audit and shadcn mapping",
    path: "lib/prompts/casino-migration-auditor.md",
    status: "available",
  },
]

const PATTERNS_RESOURCES: ResourceEntry[] = [
  {
    title: "Product Patterns",
    description: "Machine-readable product pattern definitions — the core of agent-driven generation",
    path: "lib/system/product-patterns.ts",
    status: "planned",
  },
  {
    title: "Generation Rules",
    description: "Rules that constrain how agents compose UI — tokens, hierarchy, naming conventions",
    path: "lib/system/generation-rules.md",
    status: "planned",
  },
  {
    title: "UI DSL",
    description: "Intermediate representation layer between intent and generated code",
    path: "lib/system/ui-dsl.ts",
    status: "planned",
  },
  {
    title: "UI Generator",
    description: "Screen generation orchestrator — coordinates pattern loading and code output",
    path: "lib/system/ui-generator.ts",
    status: "planned",
  },
  {
    title: "Feature Patterns",
    description: "Feature-level pattern definitions for full product feature generation",
    path: "lib/system/feature-patterns.ts",
    status: "future",
  },
  {
    title: "Feature Generator",
    description: "Feature generation orchestrator — end-to-end feature slice output",
    path: "lib/system/feature-generator.ts",
    status: "future",
  },
]

const MIGRATION_RESOURCES: ResourceEntry[] = [
  {
    title: "Casino Migration Audit",
    description: "shadcn migration table for existing casino components",
    path: "lib/audit/casino-shadcn-audit.md",
    status: "available",
  },
  {
    title: "UI Cheat Sheet",
    description: "Visual design system reference — all components, surfaces, and tokens in one page",
    href: "/ui",
    status: "available",
  },
]

const UI_PATTERNS_RESOURCES: ResourceEntry[] = [
  {
    title: "Casino Lobby",
    description: "Full casino lobby composition — the most complete pattern implementation in the lab",
    href: "/casino",
    status: "available",
  },
  {
    title: "Cloudbet Components",
    description: "Shared domain components built on the Cloudbet token system",
    href: "/ui",
    status: "available",
  },
  {
    title: "shadcn Primitives",
    description: "Base UI primitives configured for the Cloudbet dark theme",
    href: "/ui",
    status: "available",
  },
]

// ─── Page metadata ────────────────────────────────────────────────────────────

export const metadata = {
  title: "Cloudbet UI Lab",
  description:
    "A machine-readable UI system for Cloudbet. Prototype product UI today. Evolve into agent-driven screen generation and full AI-generated feature flows.",
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LabIndexPage() {
  return (
    <div className="min-h-screen bg-cb-surface-1 flex flex-col">
      {/* ── Header ── */}
      <header className="border-b border-cb-border bg-cb-surface-1">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
          {/* Logo row */}
          <div className="flex items-center gap-4 mb-4">
            {/* Cloudbet logo */}
            <img
              src="/cloudbet-logo.png"
              alt="Cloudbet"
              className="h-5 w-auto"
            />
            <div className="h-5 w-px bg-cb-border" aria-hidden />
            <span className="text-base font-bold text-white tracking-wide uppercase">
              UI Lab
            </span>
            <span className="text-[10px] text-cb-foreground-disabled uppercase tracking-wider">
              v0.1
            </span>
          </div>

          {/* Intro paragraph */}
          <p className="text-base text-cb-foreground-muted w-full leading-relaxed py-9 box-content">
            A machine-readable UI system for Cloudbet. Use it today to prototype and validate product
            UI. This evolves into agent-driven screen generation — and extends further into a system
            where AI generates entire product feature flows with less human bottleneck over time.
          </p>

        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-12">

        {/* ── Section 1 — Product UI Prototypes ── */}
        <section>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Left column — in-progress */}
            <div className="flex flex-col gap-4">
              {LEFT_AREAS.map((area) => (
                <AreaCard key={area.href} area={area} />
              ))}
            </div>
            {/* Right column — placeholder */}
            <div className="flex flex-col gap-4">
              {RIGHT_AREAS.map((area) => (
                <AreaCard key={area.href} area={area} />
              ))}
            </div>
          </div>
        </section>

        <Separator className="bg-cb-border" />

        {/* ── Agent-Driven UI Generation ── */}
        <section>
          <SectionIntro
            label="Section 02"
            title="Cloudbet UI Lab running as an agent"
            description="The lab is not just for humans clicking around. Because Cloudbet styles, tokens, components, and patterns are mapped into a machine-readable system, agents can interrogate the design system and compose UI autonomously — without starting from scratch on every request."
            badge={{ label: "In progress", variant: "next" }}
          />
          <div className="mt-5 rounded-[var(--cb-radius-lg)] border border-cb-border bg-cb-surface-2 px-4">
            <FlowList steps={AGENT_FLOW} />
          </div>
        </section>

        <Separator className="bg-cb-border" />

        {/* ── Feature Generation ── */}
        <section>
          <SectionIntro
            as="h1"
            label="Section 03"
            title="From UI generation to feature generation"
            description="The bigger leverage is not only generating screens, but generating entire product features: UI, states, interactions, data contracts, and implementation structure. This is the next evolution of the lab — where the system moves from composing individual screens to delivering implementation-ready product feature slices."
            badge={{ label: "Next evolution", variant: "future" }}
          />
          <div className="mt-5 rounded-[var(--cb-radius-lg)] border border-cb-border bg-cb-surface-2 px-4">
            <FlowList steps={FEATURE_FLOW} />
          </div>
        </section>

      </main>

      {/* ── Resource and reference files ── */}
      <section className="border-t border-cb-border bg-cb-surface-0">
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
          <SectionIntro
            label="Reference"
            title="Resource and reference files"
            description="The files, prompts, tokens, and system definitions that make the lab work — organised by layer."
          />
          <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            <ResourceGroup heading="Design System" entries={DESIGN_SYSTEM_RESOURCES} />
            <ResourceGroup heading="Prompts and Agents" entries={PROMPTS_RESOURCES} />
            <ResourceGroup heading="Patterns and Generation" entries={PATTERNS_RESOURCES} />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-cb-border bg-cb-surface-0 py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-cb-foreground-disabled text-center">
          Cloudbet UI Lab — internal product infrastructure. Not for production use.
        </p>
      </footer>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionIntro({
  label,
  title,
  description,
  badge,
  as: Heading = "h2",
}: {
  label: string
  title: string
  description: string
  badge?: { label: string; variant: "next" | "future" }
  as?: "h1" | "h2" | "h3"
}) {
  const badgeClass =
    badge?.variant === "next"
      ? "border-cb-primary/30 bg-cb-primary/10 text-cb-primary"
      : "border-cb-border text-cb-foreground-disabled bg-transparent"

  return (
    <div className="flex flex-col gap-1.5 max-w-2xl">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold text-cb-foreground-disabled uppercase tracking-widest">
          {label}
        </span>
        {badge && (
          <span
            className={`inline-flex items-center rounded-full border px-1.5 py-px text-[9px] font-medium uppercase tracking-wider ${badgeClass}`}
          >
            {badge.label}
          </span>
        )}
      </div>
      <Heading className="text-lg font-bold text-cb-foreground tracking-tight">{title}</Heading>
      <p className="text-sm text-cb-foreground-muted leading-relaxed">{description}</p>
    </div>
  )
}

type AnyArea = (typeof LEFT_AREAS)[number] | (typeof RIGHT_AREAS)[number]

function AreaCard({ area }: { area: AnyArea }) {
  const isClickable = area.status === "in-progress"

  return (
    <Link
      href={area.href}
      className={[
        "group relative flex flex-col gap-3 rounded-[var(--cb-radius-lg)] border p-5",
        "transition-all duration-150",
        isClickable
          ? "border-cb-border bg-cb-surface-3 hover:border-cb-border-visible hover:bg-cb-surface-4 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_oklch(0_0_0_/_40%)]"
          : "border-cb-border-subtle bg-cb-surface-2 opacity-60 cursor-not-allowed pointer-events-none",
      ].join(" ")}
      aria-disabled={!isClickable}
      tabIndex={isClickable ? 0 : -1}
    >
      {/* Status badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-cb-foreground group-hover:text-white transition-colors">
          {area.title}
        </h2>
        <Badge
          variant="outline"
          className={
            area.status === "in-progress"
              ? "border-cb-accent/40 bg-cb-accent/10 text-cb-accent text-[9px] uppercase tracking-wider"
              : "border-cb-border text-cb-foreground-disabled text-[9px] uppercase tracking-wider"
          }
        >
          {area.status === "in-progress" ? "In Progress" : "Coming Soon"}
        </Badge>
      </div>

      <p className="text-xs text-cb-foreground-muted leading-relaxed">{area.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        {area.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] rounded px-1.5 py-0.5 bg-cb-surface-5 text-cb-foreground-disabled font-mono"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
