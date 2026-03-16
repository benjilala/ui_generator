import { LabNav } from "@/components/patterns/LabNav"
import { CasinoLobby } from "@/components/casino/CasinoLobby"

export const metadata = {
  title: "Casino Lobby — Cloudbet UI Lab",
  description: "Casino lobby exploration screen with hero, categories, games, jackpots, and activity feed.",
}

export default function CasinoPage() {
  return (
    <div className="min-h-screen bg-cb-surface-1">
      <LabNav />
      <main className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
        <CasinoLobby />
      </main>
    </div>
  )
}
