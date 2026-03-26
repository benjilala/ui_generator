import { LabCarousel, type LabSlide } from "@/components/shadcn-studio/blocks/blog-component-10/blog-component-10"

const labSlides: LabSlide[] = [
  {
    image: "/images/ui-lab/foundations.jpg",
    alt: "UI Components, Blocks, Themes",
    category: "Design System",
    status: "In Progress",
    title: "UI Components, Blocks, Themes",
    description:
      "Canonical reference for foundations, primitives, shared Cloudbet components, and UI states across the lab.",
    tags: ["Foundations", "Primitives", "CloudbetComponents", "States"],
    href: "/ui",
  },
  {
    image: "/images/ui-lab/email-templates.jpg",
    alt: "Email templates",
    category: "Lifecycle",
    status: "In Progress",
    title: "Email templates",
    description:
      "Customer.io-style email patterns for casino recommendations, loyalty nudges, AI rec cards, and CTA modules.",
    tags: ["Email", "Casino", "GameRecs"],
    href: "/email-templates",
  },
  {
    image: "/images/ui-lab/casino-lobby.jpg",
    alt: "Casino Lobby",
    category: "Casino",
    status: "In Progress",
    title: "Casino Lobby",
    description:
      "Full lobby composition covering hero modules, category discovery, game rails, jackpot surfaces, and provider filters.",
    tags: ["PromoHero", "CategoryChipGroup", "GameGrid"],
    href: "/casino",
  },
  {
    image: "/images/ui-lab/sportsbook.jpg",
    alt: "Sportsbook",
    category: "Sports",
    status: "Coming Soon",
    title: "Sportsbook",
    description:
      "Market rows, odds buttons, live score integrations, and bet slip composition for the next sportsbook pattern layer.",
    tags: ["MarketRow", "OddsButton", "BetSlip", "LiveScore"],
    href: "/sportsbook",
  },
  {
    image: "/images/ui-lab/generated-from-prompts.jpg",
    alt: "Generated from Prompts",
    category: "AI Workflow",
    status: "In Progress",
    title: "Generated from Prompts",
    description:
      "Prompt-led UI explorations built from Cloudbet patterns, reusable components, and mock data inside the lab.",
    tags: ["PromptUI", "AgentFlow", "GeneratedScreens"],
    href: "/generated",
  },
  {
    image: "/images/ui-lab/vip.jpg",
    alt: "VIP",
    category: "Retention",
    status: "Coming Soon",
    title: "VIP",
    description:
      "Tier progression, exclusive offer surfaces, account management, and cashback patterns for premium player journeys.",
    tags: ["TierCard", "ProgressMeter", "CashbackWidget"],
    href: "/vip",
  },
]

export default function LabCarouselPage() {
  return (
    <div className="min-h-screen bg-cb-surface-1">
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <LabCarousel slides={labSlides} />
      </div>
    </div>
  )
}
