import { LabNav } from "@/components/patterns/LabNav"
import { CasinoLobby } from "@/components/casino/CasinoLobby"
import { CasinoAppShell } from "@/components/casino/CasinoAppShell"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"

export const metadata = {
  title: "Casino Lobby — Cloudbet UI Lab",
  description: "Casino lobby exploration screen with hero, categories, games, jackpots, and activity feed.",
}

export default function CasinoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cb-surface-1">
      <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center border-b border-cb-border bg-cb-surface-0">
        <LabNav className="h-full min-w-0 flex-1 border-0" />
        <div className="flex h-full shrink-0 items-center pr-3 sm:pr-4">
          <ThemeSwitcher />
        </div>
      </header>
      <CasinoAppShell>
        <CasinoLobby />
      </CasinoAppShell>
    </div>
  )
}
