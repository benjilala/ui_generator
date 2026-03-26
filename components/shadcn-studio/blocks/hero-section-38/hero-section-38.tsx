"use client"

import dynamic from "next/dynamic"
import { ArrowDownIcon, CpuIcon, WifiIcon } from "lucide-react"

import { MotionPreset } from "@/components/ui/motion-preset"
import { TextScramble } from "@/components/shadcn-studio/blocks/text-scramble"
import { SpinningText } from "@/components/shadcn-studio/blocks/spinning-text"

import Robo from "@/assets/svg/robo"

const Spline = dynamic(() => import("@splinetool/react-spline").then((mod) => mod.default), {
  ssr: false,
  loading: () => null,
})

const HeroSection = () => {
  return (
    <section className="relative flex h-full min-h-[calc(100vh-84px)] flex-1 flex-col overflow-hidden py-6 sm:py-8 lg:py-12">
      <div className="mx-auto flex max-w-7xl flex-1 flex-col justify-between gap-12 px-4 sm:gap-16 sm:px-6 lg:gap-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
          <MotionPreset
            component="h1"
            fade
            delay={3.9}
            transition={{ duration: 0.5 }}
            inView={false}
            className="text-2xl font-semibold sm:text-3xl lg:text-6xl"
          >
            <TextScramble delay={3.9} as="span">
              Machine-readable UI for Cloudbet products
            </TextScramble>
          </MotionPreset>
          <MotionPreset
            component="p"
            fade
            slide={{ direction: "right" }}
            delay={4.75}
            transition={{ duration: 0.5 }}
            inView={false}
            className="text-xl text-muted-foreground"
          >
            Shared tokens, Cloudbet components, agent prompts, and pattern docs — prototype lobby, sportsbook, and email
            surfaces with one source of truth for engineers and agents.
          </MotionPreset>
        </div>

        <MotionPreset
          className="relative flex aspect-[128/29] items-center"
          inView={false}
          motionProps={{
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 0.3, 1, 0.3, 1] },
            transition: { duration: 1.2, times: [0, 0.1, 0.3, 0.5, 0.7, 1], delay: 2.8 },
          }}
        >
          <Robo className="absolute inset-x-0 w-full" />
        </MotionPreset>

        <MotionPreset
          fade
          slide={{ direction: "down" }}
          delay={5}
          transition={{ duration: 0.5 }}
          inView={false}
          className="flex items-start justify-between gap-6"
        >
          <div className="grid max-md:w-full grid-cols-2 divide-x divide-border">
            <div className="space-y-[22px] p-4 pl-0 md:max-w-[9.5rem]">
              <div className="space-y-1">
                <h3>Design system</h3>
                <p className="text-sm font-light text-muted-foreground">Tokens, primitives, and Cloudbet components.</p>
              </div>
              <div className="flex items-center gap-2.5">
                <WifiIcon className="size-6" />
                <span className="text-xl">/ui</span>
              </div>
            </div>
            <div className="space-y-[22px] p-4 pr-0 md:max-w-[9.5rem]">
              <div className="space-y-1">
                <h3>Patterns</h3>
                <p className="text-sm font-light text-muted-foreground">Casino lobby, prompts, generated screens.</p>
              </div>
              <div className="flex items-center gap-2.5">
                <CpuIcon className="size-6" />
                <span className="text-xl">/casino</span>
              </div>
            </div>
          </div>

          <div className="relative grid size-[170px] place-content-center rounded-full border border-foreground max-md:hidden">
            <div className="grid size-[105px] place-content-center rounded-full border border-foreground">
              <ArrowDownIcon className="z-10 size-[73px] stroke-[1.5]" />
            </div>
            <div className="absolute inset-0 w-full translate-y-1/2">
              <SpinningText className="z-10" radius={6.375}>
                Scroll down ✦ Scroll down ✦ Scroll down ✦
              </SpinningText>
            </div>
          </div>
        </MotionPreset>
      </div>

      <div className="absolute bottom-0 left-1/2 aspect-[2/1] w-full max-w-[1600px] -translate-x-1/2 max-md:hidden">
        <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
      </div>
    </section>
  )
}

export default HeroSection
