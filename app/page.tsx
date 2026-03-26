import Link from "next/link"
import { LabPageHeader } from "@/components/patterns/lab-page-header"
import { ResourceGroup } from "@/components/patterns/ResourceGroup"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { type BlogEntry } from "@/components/shadcn-studio/blocks/blog-component-14/blog-component-14"
import FeaturesSection10, { type FeatureCard } from "@/components/shadcn-studio/blocks/features-section-10/features-section-10"
import {
  DESIGN_SYSTEM_RESOURCES,
  PATTERNS_RESOURCES,
  PROMPTS_RESOURCES,
} from "@/lib/lab-catalog"

// ─── Blog entries ─────────────────────────────────────────────────────────────

const BLOG_ENTRIES: BlogEntry[] = [
  {
    category: "Product",
    date: "Mar 18, 2026",
    title: "Design Smarter: How User Behavior Shapes Winning Products",
    href: "#",
  },
  {
    category: "Engineering",
    date: "Mar 10, 2026",
    title: "Why Fast Apps Win: The Blueprint for Lightning-Quick Experiences",
    href: "#",
  },
  {
    category: "Design",
    date: "Feb 28, 2026",
    title: "Scaling Design the Right Way with a Solid Component System",
    href: "#",
  },
  {
    category: "Startup Growth",
    date: "Feb 15, 2026",
    title: "Nail Your First Launch: A Checklist for Product Debut Success",
    href: "#",
  },
  {
    category: "Design",
    date: "Jan 22, 2026",
    title: "Product KPIs That Actually Matter And How to Track Them",
    href: "#",
  },
  {
    category: "Engineering",
    date: "Jan 09, 2026",
    title: "How AI-Driven Workflows Are Transforming Product Development",
    href: "#",
  },
]

// ─── Feature cards ────────────────────────────────────────────────────────────

const FEATURE_CARDS: FeatureCard[] = [
  {
    badge: "Guides",
    title: "Styles, components and blocks",
    description:
      "Surfaces, typography, shadcn primitives, and all Cloudbet shared components. The canonical source of truth for the component library.",
    image: "/features/ui-kit-figma.png",
    imageAlt: "Cloudbet UI styles, blocks, and components illustration from design file",
    href: "/ui",
    color: "violet",
    status: "in-progress",
  },
  {
    badge: "Lab",
    title: "Casino Lobby exploration",
    description:
      "Very much a work in progress testing design rules and exploring components and refactoring to use shadcn framework.",
    image: "",
    imageAlt: "",
    href: "/casino",
    color: "amber",
    status: "in-progress",
  },
  {
    badge: "Resources",
    title: "Download Agent, design and pattern guides",
    description:
      "Markdown prompts, tokens, and system docs — organized paths you can copy into your own repos and agent setups.",
    image: "",
    imageAlt: "",
    href: "/resources",
    color: "blue",
    status: "in-progress",
  },
]

const FEATURE_CARDS_ROW2: FeatureCard[] = [
  {
    badge: "Email",
    title: "Email templates",
    description:
      "Casino game-recommendation email layout (Customer.io–style): tier badge, AI rec cards, stats bar, loyalty nudge, and CTA — with lab light/dark theming.",
    image: "",
    imageAlt: "",
    href: "/email-templates",
    color: "amber",
    status: "in-progress",
  },
  {
    badge: "Generation",
    title: "Generated from Prompts",
    description:
      "Prompt-generated UI explorations built from Cloudbet patterns, components, and mock data.",
    image: "/features/goalie-v4.png",
    imageAlt: "Hockey goalie illustration",
    href: "/generated",
    color: "purple50",
    status: "in-progress",
  },
  {
    badge: "Sports",
    title: "Sportsbook",
    description:
      "Event listings, market rows, odds buttons, live score integration, and bet slip composition. Validates the core sports betting pattern system.",
    image: "",
    imageAlt: "",
    href: "/sportsbook",
    color: "blue",
    status: "coming-soon",
  },
]

// ─── Page metadata ────────────────────────────────────────────────────────────

export const metadata = {
  title: "Cloudbet UI Lab",
  description:
    "A machine-readable UI system for Cloudbet — prototype product UI, design tokens, agent prompts, and pattern definitions in one lab.",
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LabIndexPage() {
  return (
    <div className="min-h-screen bg-cb-surface-1 flex flex-col">
      <LabPageHeader
        surface="home"
        title={
          <>
            <span className="text-[11.5px] font-semibold tracking-tight text-cb-foreground dark:text-[#E0E0E0]">
              UI Lab
            </span>
            <span className="text-[8px] font-normal uppercase tracking-[0.4px] text-cb-foreground-disabled dark:text-[#696969]">
              Version 0.1
            </span>
          </>
        }
        trailing={
          <ThemeSwitcher className="size-[31px] min-h-[31px] min-w-[31px] shrink-0 rounded-full border-[1.5px] p-0 [&_svg]:size-[15px]" />
        }
      />

      <main className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 lg:gap-4">
          <FeaturesSection10 features={FEATURE_CARDS} />
          <FeaturesSection10 features={FEATURE_CARDS_ROW2} defaultActiveIndex={1} />
        </div>
      </main>

      {/* ── Resource and reference files ── */}
      <section className="border-t border-cb-border bg-cb-surface-1">
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
          <SectionIntro
            label=""
            title="Resource and reference files"
            description="The files, prompts, tokens, and system definitions that make the lab work — organised by layer."
          />
          <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            <ResourceGroup heading="Design system" entries={DESIGN_SYSTEM_RESOURCES} />
            <ResourceGroup heading="Prompts and agents" entries={PROMPTS_RESOURCES} />
            <ResourceGroup heading="Patterns and generation" entries={PATTERNS_RESOURCES} />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-cb-border bg-cb-surface-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-cb-foreground-muted">
            How this lab stays consistent
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-cb-foreground-muted">
            Work here is anchored to layered documentation: product and component conventions, tokenized
            CSS, typed token maps, agent prompts for generation and review, and system definitions for
            patterns and rules. Together they give humans and agents the same source of truth — not a
            one-off style guide, but paths you can open in the repo and enforce in workflow.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-xs text-cb-foreground-muted">
            <li className="rounded-[var(--cb-radius-md)] border border-cb-border-subtle bg-cb-surface-2 px-3 py-2.5">
              <span className="font-mono text-[10px] text-cb-foreground">design.md</span>
              <span className="mt-1 block leading-snug">
                Product UI conventions, naming, and composition expectations.
              </span>
            </li>
            <li className="rounded-[var(--cb-radius-md)] border border-cb-border-subtle bg-cb-surface-2 px-3 py-2.5">
              <span className="font-mono text-[10px] text-cb-foreground">styles/design-system.css</span>
              <span className="mt-1 block leading-snug">
                Surfaces, typography, motion, borders — theme variables the app and Tailwind consume.
              </span>
            </li>
            <li className="rounded-[var(--cb-radius-md)] border border-cb-border-subtle bg-cb-surface-2 px-3 py-2.5">
              <span className="font-mono text-[10px] text-cb-foreground">lib/prompts/*.md</span>
              <span className="mt-1 block leading-snug">
                Agent guides: UI agent, screen generator, architect, UX explorer, design critic, migration
                auditor.
              </span>
            </li>
            <li className="rounded-[var(--cb-radius-md)] border border-cb-border-subtle bg-cb-surface-2 px-3 py-2.5">
              <span className="font-mono text-[10px] text-cb-foreground">lib/system/</span>
              <span className="mt-1 block leading-snug">
                Product patterns, generation rules, and orchestration — the machine-readable spine for
                scaled generation.
              </span>
            </li>
            <li className="rounded-[var(--cb-radius-md)] border border-cb-border-subtle bg-cb-surface-2 px-3 py-2.5">
              <span className="font-mono text-[10px] text-cb-foreground">lib/audit/</span>
              <span className="mt-1 block leading-snug">
                Migration and parity audits (e.g. casino ↔ shadcn) so refactors stay traceable.
              </span>
            </li>
            <li className="rounded-[var(--cb-radius-md)] border border-cb-border-subtle bg-cb-surface-2 px-3 py-2.5">
              <Link
                href="/ui"
                className="font-mono text-[10px] text-cb-purple-50 hover:underline"
              >
                /ui
              </Link>
              <span className="mt-1 block leading-snug">
                Live cheat sheet — styles, primitives, blocks, and libraries in one scrollable reference.
              </span>
            </li>
          </ul>
          <p className="mt-8 border-t border-cb-border-subtle pt-6 text-center text-[10px] text-cb-foreground-disabled">
            Cloudbet UI Lab — internal product infrastructure. Not for production use.
          </p>
        </div>
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
      ? "border-cb-primary/30 bg-cb-primary/10 text-cb-purple-50"
      : "border-cb-border text-cb-foreground-disabled bg-transparent"

  return (
    <div className="flex flex-col gap-1.5 max-w-2xl">
      <div className="flex items-center gap-2">
        {label && (
          <span className="text-[10px] font-semibold text-cb-foreground-disabled uppercase tracking-widest">
            {label}
          </span>
        )}
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

