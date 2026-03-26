import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { MatterButton } from "@/components/ui/matter-button"
import { MotionPreset } from "@/components/ui/motion-preset"

import { HeroNavigation, HeroNavigationSmallScreen } from "@/components/shadcn-studio/blocks/hero-section-38/hero-navigation"
import type { Navigation } from "@/components/shadcn-studio/blocks/hero-section-38/hero-navigation"

import { cn } from "@/lib/utils"

import MatterLogo from "@/assets/svg/matter-logo"

type HeaderProps = {
  navigationData: Navigation[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  return (
    <MotionPreset
      component="header"
      fade
      slide={{ direction: "up" }}
      delay={3.4}
      transition={{ duration: 0.5 }}
      inView={false}
      className={cn("z-50 h-[84px] w-full", className)}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <div className="flex items-center gap-3">
            <MatterLogo className="size-8" />
            <span className="font-[Orbitron] text-[1.75rem] leading-[1.625rem] font-bold text-foreground">
              UI Lab
            </span>
          </div>
        </Link>

        <HeroNavigation navigationData={navigationData} className="max-lg:hidden" />

        <div className="flex items-center gap-4">
          <MatterButton size="lg" className="max-sm:hidden" asChild>
            <Link href="/ui">
              Open design system
              <ArrowUpRightIcon />
            </Link>
          </MatterButton>

          <MatterButton size="icon-lg" className="sm:hidden" asChild>
            <Link href="/ui">
              <ArrowUpRightIcon />
              <span className="sr-only">Open design system</span>
            </Link>
          </MatterButton>

          <HeroNavigationSmallScreen navigationData={navigationData} />
        </div>
      </div>
    </MotionPreset>
  )
}

export default Header
