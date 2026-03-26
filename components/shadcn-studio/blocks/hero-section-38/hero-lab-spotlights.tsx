import Link from "next/link"
import { ArrowUpRightIcon, CalendarDaysIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export type LabSpotlightCard = {
  img: string
  date: string
  title: string
  description: string
  meta: string
  badge: string
  href: string
}

const defaultSpotlights: LabSpotlightCard[] = [
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-02.png",
    date: "Design system",
    title: "UI cheat sheet — tokens, primitives, Cloudbet components",
    description:
      "Single reference for surfaces, typography, shadcn primitives, states, charts, and every shared component in the library.",
    meta: "/ui",
    badge: "Foundations",
    href: "/ui",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/template/landing-page/ink/image-03.png",
    date: "Product pattern",
    title: "Casino lobby — hero, categories, rails, jackpots",
    description:
      "End-to-end lobby composition to validate PromoHero, GameTile, CategoryChipGroup, and feed shells against real tokens.",
    meta: "/casino",
    badge: "Patterns",
    href: "/casino",
  },
]

const defaultBadge = "Cloudbet UI Lab"
const defaultHeadline = "Prototype product UI on a machine-readable design system."
const defaultSubhead =
  "Shared tokens, Cloudbet components, agent prompts, and pattern docs — so engineers and agents implement the same surfaces, states, and compositions."

function HeroSection38({
  spotlights = defaultSpotlights,
  badgeLabel = defaultBadge,
  headline = defaultHeadline,
  subhead = defaultSubhead,
}: {
  spotlights?: LabSpotlightCard[]
  badgeLabel?: string
  headline?: string
  subhead?: string
}) {
  return (
    <section className="border-b border-border bg-muted pt-10 pb-10 sm:pb-12 lg:pb-14">
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-4xl flex-col items-center gap-4 self-center text-center">
          <Badge variant="outline" className="text-sm font-normal">
            {badgeLabel}
          </Badge>
          <h1 className="text-balance text-3xl font-semibold leading-[1.29167] sm:text-4xl lg:text-5xl">
            {headline}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{subhead}</p>
          <div className="z-10 flex flex-wrap items-center justify-center gap-3 p-2">
            <Button size="lg" className="rounded-lg px-6 text-base" asChild>
              <Link href="/ui">Open design system</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-lg px-6 text-base" asChild>
              <Link href="/casino">View casino lobby</Link>
            </Button>
            <Button size="lg" variant="link" className="rounded-lg px-4 text-base" asChild>
              <Link href="/generated">Generated prompts</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {spotlights.map((item, index) => (
            <Card key={`${item.href}-${index}`} className="group py-0 shadow-none">
              <CardContent className="grid grid-cols-1 px-0 xl:grid-cols-2">
                <div className="p-6">
                  <div className="h-59.5 w-full overflow-hidden rounded-lg">
                    <img
                      src={item.img}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-3 p-6">
                  <div className="flex items-center gap-1.5 py-1">
                    <div className="text-muted-foreground flex grow items-center gap-1.5">
                      <CalendarDaysIcon className="size-6 shrink-0" />
                      <p className="text-left text-sm">{item.date}</p>
                    </div>
                    <Link href={item.href}>
                      <Badge className="border-0 bg-primary/10 text-sm text-primary">{item.badge}</Badge>
                    </Link>
                  </div>
                  <Link href={item.href}>
                    <h3 className="text-xl font-medium">{item.title}</h3>
                  </Link>

                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  <div className="flex w-full items-center justify-between gap-1 py-1">
                    <span className="font-mono text-xs text-muted-foreground">{item.meta}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-transparent hover:border-transparent hover:!bg-primary hover:text-primary-foreground group-hover:!bg-primary group-hover:text-primary-foreground group-hover:border-transparent"
                      asChild
                    >
                      <Link href={item.href} aria-label={`Open ${item.title}`}>
                        <ArrowUpRightIcon />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection38
