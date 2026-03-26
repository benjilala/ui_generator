import LabAreas from '@/components/shadcn-studio/blocks/blog-component-07/blog-component-07'

const mainAreas = [
  {
    href: '/ui',
    title: 'UI Components, Blocks, Themes',
    description:
      'Complete design system reference: surfaces, typography, shadcn primitives, and all Cloudbet shared components. The canonical source of truth for the component library.',
    status: 'in-progress' as const,
    tags: ['Foundations', 'Primitives', 'CloudbetComponents', 'States'],
  },
  {
    href: '/casino',
    title: 'Casino Lobby',
    description:
      'Full lobby composition — hero carousel, category discovery, game rails, jackpot feeds, and provider filtering. Validates the core casino pattern system.',
    status: 'in-progress' as const,
    tags: ['PromoHero', 'CategoryChipGroup', 'GameGrid', 'JackpotSection', 'FeedSectionShell'],
  },
  {
    href: '/generated',
    title: 'Generated from Prompts',
    description:
      'Prompt-generated UI explorations built from Cloudbet patterns, components, and mock data.',
    status: 'in-progress' as const,
    tags: ['PromptUI', 'AgentFlow', 'GeneratedScreens'],
  },
]

const sidebarAreas = [
  {
    href: '/email-templates',
    title: 'Email templates',
    description:
      'Casino game-recommendation email layout (Customer.io–style): tier badge, AI rec cards, stats bar, loyalty nudge, and CTA — with lab light/dark theming.',
    status: 'in-progress' as const,
    tags: ['Email', 'Casino', 'GameRecs'],
  },
  {
    href: '/sportsbook',
    title: 'Sportsbook',
    description:
      'Event listings, market rows, odds buttons, live score integration, and bet slip composition. Validates the core sports betting pattern system.',
    status: 'placeholder' as const,
    tags: ['MarketRow', 'OddsButton', 'BetSlip', 'LiveScore'],
  },
  {
    href: '/vip',
    title: 'VIP',
    description:
      'Tier progression, exclusive offer surfaces, personal account management, and cashback dashboard. Validates the loyalty and retention pattern system.',
    status: 'placeholder' as const,
    tags: ['TierCard', 'ProgressMeter', 'CashbackWidget'],
  },
]

export default function BlogComponent07Page() {
  return (
    <div className="min-h-screen bg-cb-surface-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <LabAreas mainAreas={mainAreas} sidebarAreas={sidebarAreas} />
      </div>
    </div>
  )
}
