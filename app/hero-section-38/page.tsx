import { BotIcon, MessageCircleQuestionIcon, NewspaperIcon } from "lucide-react"

import Header from "@/components/shadcn-studio/blocks/hero-section-38/header"
import HeroSection from "@/components/shadcn-studio/blocks/hero-section-38/hero-section-38"
import type { Navigation } from "@/components/shadcn-studio/blocks/hero-section-38/hero-navigation"

const navigationData: Navigation[] = [
  {
    title: "Areas",
    href: "/",
  },
  {
    title: "Design system",
    href: "/ui",
  },
  {
    title: "Casino",
    href: "/casino",
  },
  {
    title: "Generated",
    href: "/generated",
  },
  {
    title: "Resources",
    subtitle: "In the repo",
    imgSubtitle: "Featured",
    contentClassName: "!w-[560px]",
    items: [
      {
        icon: <BotIcon className="size-4" />,
        title: "Agent prompts",
        href: "/",
        description: "UI agent, screen generator, architect, and migration auditor markdown guides.",
      },
      {
        icon: <MessageCircleQuestionIcon className="size-4" />,
        title: "Tokens & CSS",
        href: "/ui",
        description: "Typed Cloudbet tokens and design-system.css variables the app consumes.",
      },
      {
        icon: <NewspaperIcon className="size-4" />,
        title: "Email templates",
        href: "/email-templates",
        description: "Casino game-rec email layout with lab light/dark theming.",
      },
    ],
    imageSection: {
      img: "https://cdn.shadcnstudio.com/ss-assets/template/landing-page/matter/image-20.png",
      href: "/casino",
      title: "Casino lobby",
      description: "Hero, categories, game rails, and jackpots built from shared patterns.",
    },
  },
]

const HeroSection38Page = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header navigationData={navigationData} />

      <main className="flex flex-col">
        <HeroSection />
      </main>
    </div>
  )
}

export default HeroSection38Page
