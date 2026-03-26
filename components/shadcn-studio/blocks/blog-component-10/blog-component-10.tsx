"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export type LabSlide = {
  image: string
  alt: string
  category: string
  status: "In Progress" | "Coming Soon"
  title: string
  description: string
  tags: string[]
  href: string
}

interface LabCarouselProps {
  heading?: string
  subheading?: string
  slides: LabSlide[]
}

export function LabCarousel({
  heading = "Explore the Lab",
  subheading = "Browse the areas we're building — from design foundations to full product verticals.",
  slides,
}: LabCarouselProps) {
  return (
    <section className="py-10">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold tracking-tight text-cb-foreground sm:text-2xl">
            {heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-cb-foreground-muted">
            {subheading}
          </p>
        </div>
      </div>

      <Carousel
        opts={{ align: "start", loop: false }}
        className="w-full"
      >
        <div className="mb-4 flex items-center justify-end gap-2">
          <CarouselPrevious
            className="static translate-y-0 border-cb-border bg-cb-surface-3 text-cb-foreground hover:bg-cb-surface-4 hover:text-cb-foreground disabled:opacity-30"
          />
          <CarouselNext
            className="static translate-y-0 border-cb-border bg-cb-surface-3 text-cb-foreground hover:bg-cb-surface-4 hover:text-cb-foreground disabled:opacity-30"
          />
        </div>

        <CarouselContent className="-ml-4">
          {slides.map((slide) => (
            <CarouselItem
              key={slide.href}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <Link href={slide.href} className="block h-full">
                <Card
                  className={[
                    "group h-full border-cb-border bg-cb-surface-2 shadow-none ring-0 transition-all duration-150",
                    slide.status === "In Progress"
                      ? "hover:border-cb-border-visible hover:bg-cb-surface-3 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_oklch(0_0_0_/_40%)]"
                      : "opacity-60",
                  ].join(" ")}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-cb-surface-4">
                    <div className="absolute inset-0 flex items-center justify-center text-cb-foreground-disabled">
                      <svg
                        className="size-10 opacity-20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                        />
                      </svg>
                    </div>
                  </div>

                  <CardContent className="flex flex-col gap-3 pt-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-cb-foreground-disabled">
                        {slide.category}
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          slide.status === "In Progress"
                            ? "border-cb-accent/40 bg-cb-accent/10 text-cb-accent text-[9px] uppercase tracking-wider"
                            : "border-cb-border text-cb-foreground-disabled text-[9px] uppercase tracking-wider"
                        }
                      >
                        {slide.status}
                      </Badge>
                    </div>

                    <CardTitle className="text-sm font-semibold text-cb-foreground transition-colors group-hover:text-foreground">
                      {slide.title}
                    </CardTitle>

                    <CardDescription className="line-clamp-2 text-xs leading-relaxed text-cb-foreground-muted">
                      {slide.description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter>
                    <div className="flex flex-wrap gap-1.5">
                      {slide.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-cb-surface-5 px-1.5 py-0.5 font-mono text-[10px] text-cb-foreground-disabled"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default LabCarousel
