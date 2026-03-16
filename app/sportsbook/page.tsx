import Link from "next/link"
import { LabNav } from "@/components/patterns/LabNav"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Sportsbook — Cloudbet UI Lab",
}

export default function SportsbookPage() {
  return (
    <div className="min-h-screen bg-cb-surface-1">
      <LabNav />
      <main className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <PlaceholderScreen
          area="Sportsbook"
          description="Event listings, market rows, odds buttons, bet slip, and live score integration."
          plannedComponents={["MarketRow", "OddsButton", "BetSlip", "LiveScore", "EventCard", "MatchHeader"]}
        />
      </main>
    </div>
  )
}

function PlaceholderScreen({
  area,
  description,
  plannedComponents,
}: {
  area: string
  description: string
  plannedComponents: string[]
}) {
  return (
    <div className="flex flex-col items-center gap-6 text-center py-16">
      <Badge variant="outline" className="border-cb-border text-cb-foreground-muted text-[10px] uppercase tracking-widest">
        Coming Soon
      </Badge>
      <h1 className="text-3xl font-bold text-cb-foreground">{area}</h1>
      <p className="text-sm text-cb-foreground-muted max-w-md leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2 justify-center max-w-sm">
        {plannedComponents.map((c) => (
          <span key={c} className="text-xs rounded px-2 py-1 bg-cb-surface-3 text-cb-foreground-disabled font-mono border border-cb-border">
            {c}
          </span>
        ))}
      </div>
      <Link
        href="/"
        className="mt-4 text-sm text-cb-primary hover:text-cb-primary/80 transition-colors"
      >
        ← Back to Lab
      </Link>
    </div>
  )
}
