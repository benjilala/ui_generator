import type { ResourceEntry } from "@/lib/resource-entry"

export const DESIGN_SYSTEM_RESOURCES: ResourceEntry[] = [
  {
    title: "Design system",
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
    title: "Token reference",
    description: "Typed Cloudbet token maps for CVA variants",
    path: "lib/tokens/cloudbet.ts",
    status: "available",
  },
]

export const PROMPTS_RESOURCES: ResourceEntry[] = [
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

export const PATTERNS_RESOURCES: ResourceEntry[] = [
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
