export interface Provider {
  id: string
  name: string
  logoUrl: string
  gameCount: number
}

export const MOCK_PROVIDERS: Provider[] = [
  { id: "pragmatic",   name: "Pragmatic Play",  logoUrl: "/placeholder-game.svg", gameCount: 312 },
  { id: "evolution",   name: "Evolution",        logoUrl: "/placeholder-game.svg", gameCount: 180 },
  { id: "netent",      name: "NetEnt",           logoUrl: "/placeholder-game.svg", gameCount: 260 },
  { id: "playngo",     name: "Play'n GO",        logoUrl: "/placeholder-game.svg", gameCount: 290 },
  { id: "microgaming", name: "Microgaming",      logoUrl: "/placeholder-game.svg", gameCount: 450 },
  { id: "hacksaw",     name: "Hacksaw Gaming",   logoUrl: "/placeholder-game.svg", gameCount: 95 },
  { id: "pushgaming",  name: "Push Gaming",      logoUrl: "/placeholder-game.svg", gameCount: 60 },
  { id: "nolimit",     name: "Nolimit City",     logoUrl: "/placeholder-game.svg", gameCount: 75 },
  { id: "relax",       name: "Relax Gaming",     logoUrl: "/placeholder-game.svg", gameCount: 120 },
  { id: "yggdrasil",   name: "Yggdrasil",        logoUrl: "/placeholder-game.svg", gameCount: 140 },
  { id: "redtiger",    name: "Red Tiger",        logoUrl: "/placeholder-game.svg", gameCount: 190 },
  { id: "blueprint",   name: "Blueprint Gaming", logoUrl: "/placeholder-game.svg", gameCount: 110 },
]
