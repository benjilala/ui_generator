import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const NAV_ITEMS = [
  { href: "/casino",      label: "Casino",      status: "active" as const },
  { href: "/sportsbook",  label: "Sportsbook",  status: "placeholder" as const },
  { href: "/vip",         label: "VIP",         status: "placeholder" as const },
  { href: "/experiments", label: "Experiments", status: "placeholder" as const },
]

export function LabNav({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Lab navigation"
      className={cn(
        "flex items-center gap-1 px-4 h-12 bg-cb-surface-0 border-b border-cb-border",
        className,
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 mr-4 text-sm font-bold text-cb-foreground hover:text-cb-primary transition-colors"
      >
        <span className="size-5 rounded bg-cb-primary flex items-center justify-center text-[10px] font-black text-white">
          CB
        </span>
        UI Lab
      </Link>

      <Separator orientation="vertical" className="h-4 bg-cb-border mx-1" />

      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-[var(--cb-radius-sm)] text-sm transition-colors",
            item.status === "active"
              ? "text-cb-foreground hover:bg-cb-surface-3"
              : "text-cb-foreground-muted hover:text-cb-foreground hover:bg-cb-surface-3",
          )}
        >
          {item.label}
          {item.status === "placeholder" && (
            <span className="text-[9px] rounded px-1 py-0.5 bg-cb-surface-4 text-cb-foreground-disabled uppercase tracking-wider">
              soon
            </span>
          )}
        </Link>
      ))}
    </nav>
  )
}
