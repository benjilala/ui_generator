import { LabPageHeader } from "@/components/patterns/lab-page-header"
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
      <LabPageHeader
        title="Casino Lobby"
        trailing={<ThemeSwitcher />}
      />
      <CasinoAppShell>
        <CasinoLobby />
      </CasinoAppShell>
    </div>
  )
}
