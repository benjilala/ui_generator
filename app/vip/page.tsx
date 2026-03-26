import Link from "next/link"
import { LabPageHeader } from "@/components/patterns/lab-page-header"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"

export const metadata = {
  title: "VIP — Cloudbet UI Lab",
}

export default function VipPage() {
  return (
    <div className="min-h-screen bg-cb-surface-1">
      <LabPageHeader
        title="VIP"
        trailing={<ThemeSwitcher />}
      />
      <main className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center py-16">
          <Badge variant="outline" className="border-cb-border text-cb-foreground-muted text-[10px] uppercase tracking-widest">
            Coming Soon
          </Badge>
          <h1 className="text-3xl font-bold text-cb-foreground">VIP</h1>
          <p className="text-sm text-cb-foreground-muted max-w-md leading-relaxed">
            Tier progression, exclusive offers, personal account manager, and cashback dashboard.
          </p>
          <div className="flex flex-wrap gap-2 justify-center max-w-sm">
            {["TierCard", "ProgressMeter", "CashbackWidget", "VipBadge", "AccountManager"].map((c) => (
              <span key={c} className="text-xs rounded px-2 py-1 bg-cb-surface-3 text-cb-foreground-disabled font-mono border border-cb-border">
                {c}
              </span>
            ))}
          </div>
          <Link href="/" className="mt-4 text-sm text-cb-purple-50 hover:text-cb-purple-50/80 transition-colors">
            ← Back to Lab
          </Link>
        </div>
      </main>
    </div>
  )
}
