"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MotionPreset } from "@/components/ui/motion-preset"

export type BlogEntry = {
  category: string
  date: string
  title: string
  href: string
}

interface BlogComponent14Props {
  label?: string
  heading?: string
  description?: string
  viewAllHref?: string
  entries: BlogEntry[]
}

function BlogComponent14({
  label = "OUR BLOGS",
  heading = "Insights & Ideas to Fuel Your Next Move",
  description = "Practical stories, product thinking, and lessons from teams building at the edge of what's possible.",
  viewAllHref = "#",
  entries,
}: BlogComponent14Props) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-screen-xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16 lg:px-8">
        <MotionPreset fade slide={{ direction: "left", offset: 30 }}>
          <div className="top-28 flex flex-col gap-5 lg:sticky">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {label}
            </span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {heading}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <div>
              <Button variant="outline" asChild>
                <Link href={viewAllHref}>View All Blogs</Link>
              </Button>
            </div>
          </div>
        </MotionPreset>

        <div className="flex flex-col gap-4">
          {entries.map((entry, index) => (
            <MotionPreset
              key={entry.title}
              fade
              slide={{ direction: "up", offset: 20 }}
              delay={index * 0.08}
            >
              <Link href={entry.href} className="group block">
                <Card className="flex items-center justify-between gap-4 border-border/50 bg-muted/40 px-5 py-4 transition-colors hover:border-border hover:bg-muted/70">
                  <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-6">
                    <span className="shrink-0 text-[11px] font-medium uppercase tracking-wider text-primary">
                      {entry.category}
                    </span>
                    <span className="hidden text-border sm:block">|</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {entry.date}
                    </span>
                    <h3 className="text-sm font-medium leading-snug sm:flex-1">
                      {entry.title}
                    </h3>
                  </div>
                  <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </Card>
              </Link>
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogComponent14
