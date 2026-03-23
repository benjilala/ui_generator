import { LabNav } from "@/components/patterns/LabNav"
import { CasinoLobby } from "@/components/casino/CasinoLobby"
import { CasinoAppShell } from "@/components/casino/CasinoAppShell"

export const metadata = {
  title: "Casino Lobby — Cloudbet UI Lab",
  description: "Casino lobby exploration screen with hero, categories, games, jackpots, and activity feed.",
}

export default function CasinoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cb-surface-1">
      <LabNav className="sticky top-0 z-40 shrink-0" />
      <CasinoAppShell>
        <CasinoLobby />
      </CasinoAppShell>
    </div>
  )
}
