import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export interface ProductCategory09Item {
  title: string
  description: string
  href: string
  imageSrc: string
  imageAlt: string
}

const CASINO_CATEGORIES: ProductCategory09Item[] = [
  {
    title: "Slots",
    description: "Megaways, classics & feature buys",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Colourful slot machine reels in a casino",
  },
  {
    title: "Live casino",
    description: "Blackjack, roulette & baccarat with real dealers",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Poker chips and cards on a felt table",
  },
  {
    title: "Jackpots",
    description: "Progressive pools & must-drop prizes",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1610647752706-3bb12232b3b4?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Neon casino signage and lights",
  },
  {
    title: "Table games",
    description: "RNG blackjack, poker & more",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1601398879841-46310a0e741f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Roulette wheel close-up",
  },
  {
    title: "Game shows",
    description: "Crazy Time, Monopoly Live & wheels",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Dice on a dark surface",
  },
  {
    title: "New & hot",
    description: "Fresh releases players are spinning now",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1516979187457-6374804f7e7b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Elegant casino interior lighting",
  },
]

export interface ProductCategory09Props {
  items?: ProductCategory09Item[]
  className?: string
}

export function ProductCategory09({
  items = CASINO_CATEGORIES,
  className,
}: ProductCategory09Props) {
  return (
    <section
      className={className}
      aria-labelledby="product-category-09-heading"
    >
      <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cb-foreground-disabled">
            Casino
          </p>
          <h2
            id="product-category-09-heading"
            className="text-xl font-bold tracking-tight text-cb-foreground sm:text-2xl"
          >
            Play by category
          </h2>
          <p className="text-sm leading-relaxed text-cb-foreground-muted">
            Jump straight into slots, live tables, jackpots, and the latest drops — same lobby, faster
            picks.
          </p>
        </div>
        <Link
          href="#"
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cb-purple-50 hover:underline sm:mt-0"
        >
          View all games
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className="min-w-0">
            <Link
              href={item.href}
              className="group relative flex aspect-[4/3] w-full overflow-hidden rounded-[var(--cb-radius-lg)] border border-cb-border-subtle bg-cb-surface-2 outline-none ring-cb-primary/40 transition hover:border-cb-border-visible hover:shadow-[0_12px_48px_oklch(0_0_0_/_35%)] focus-visible:ring-2"
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span
                className="absolute inset-0 bg-gradient-to-t from-cb-surface-0 via-cb-surface-0/50 to-transparent"
                aria-hidden
              />
              <span className="relative mt-auto flex w-full flex-col gap-0.5 p-4 pt-12">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-base font-semibold text-cb-foreground">{item.title}</span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-cb-foreground-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cb-purple-50"
                    aria-hidden
                  />
                </span>
                <span className="text-xs leading-snug text-cb-foreground-muted">{item.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
