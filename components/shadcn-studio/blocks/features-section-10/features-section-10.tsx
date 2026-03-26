"use client"

import { useEffect, useRef, useState, type AnimationEvent, type CSSProperties, type PointerEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export type FeatureCard = {
  badge: string
  title: string
  description: string
  image: string
  imageAlt: string
  href: string
  color: "blue" | "violet" | "amber" | "success" | "surface" | "purple50"
  status?: "in-progress" | "coming-soon"
}

interface FeaturesSection10Props {
  features: FeatureCard[]
  defaultActiveIndex?: number
}

const LG_QUERY = "(min-width: 1024px)"

function useLgBreakpoint(): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(LG_QUERY)
    setMatches(mq.matches)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return matches
}

const colorMap = {
  blue: {
    border: "border-[rgba(43,127,255,0.4)]",
    borderHover: "hover:border-[rgba(43,127,255,0.7)]",
    badge: "bg-[rgba(43,127,255,0.1)] text-[#2b7fff] border-[rgba(43,127,255,0.2)]",
    accent: "text-[#2b7fff]",
    pulseRgb: "43 127 255",
  },
  violet: {
    border: "border-[rgba(142,81,255,0.4)]",
    borderHover: "hover:border-[rgba(142,81,255,0.7)]",
    badge: "bg-[rgba(142,81,255,0.1)] text-[#8e51ff] border-[rgba(142,81,255,0.2)]",
    accent: "text-[#8e51ff]",
    pulseRgb: "142 81 255",
  },
  purple50: {
    border: "border-[rgba(160,103,235,0.4)]",
    borderHover: "hover:border-[rgba(160,103,235,0.7)]",
    badge: "bg-[rgba(160,103,235,0.1)] text-[#a067eb] border-[rgba(160,103,235,0.2)]",
    accent: "text-[#a067eb]",
    pulseRgb: "160 103 235",
  },
  amber: {
    border: "border-[rgba(254,154,0,0.4)]",
    borderHover: "hover:border-[rgba(254,154,0,0.7)]",
    badge: "bg-[rgba(254,154,0,0.1)] text-[#fe9a00] border-[rgba(254,154,0,0.2)]",
    accent: "text-[#fe9a00]",
    pulseRgb: "254 154 0",
  },
  success: {
    border: "border-[rgba(85,163,112,0.4)]",
    borderHover: "hover:border-[rgba(85,163,112,0.7)]",
    badge: "bg-[rgba(85,163,112,0.1)] text-[#55a370] border-[rgba(85,163,112,0.2)]",
    accent: "text-[#55a370]",
    pulseRgb: "85 163 112",
  },
  surface: {
    border: "border-[rgba(255,255,255,0.08)]",
    borderHover: "hover:border-[rgba(255,255,255,0.15)]",
    badge: "bg-[rgba(255,255,255,0.04)] text-[#696969] border-[rgba(255,255,255,0.08)]",
    accent: "text-[#696969]",
    pulseRgb: "224 224 224",
  },
}

function cardFillColor(featureColor: FeatureCard["color"], pulseRgb: string, fillAlpha: number): string {
  if (featureColor === "surface") {
    return `rgba(255,255,255,${fillAlpha})`
  }
  const [r, g, b] = pulseRgb.split(" ")
  return `rgba(${r}, ${g}, ${b}, ${fillAlpha})`
}

function setGlowPosition(el: HTMLDivElement, clientX: number, clientY: number) {
  const r = el.getBoundingClientRect()
  const x = ((clientX - r.left) / r.width) * 100
  const y = ((clientY - r.top) / r.height) * 100
  el.style.setProperty("--gx", `${Math.max(0, Math.min(100, x))}%`)
  el.style.setProperty("--gy", `${Math.max(0, Math.min(100, y))}%`)
}

function resetGlowPosition(el: HTMLDivElement) {
  el.style.setProperty("--gx", "72%")
  el.style.setProperty("--gy", "28%")
}

function FeaturesSection10({ features, defaultActiveIndex = 0 }: FeaturesSection10Props) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
  const [pulsingIndex, setPulsingIndex] = useState<number | null>(null)
  const isLg = useLgBreakpoint()
  const router = useRouter()
  const pendingNavigationRef = useRef<{ href: string } | null>(null)

  function handleCardPointerMove(e: PointerEvent<HTMLDivElement>) {
    setGlowPosition(e.currentTarget, e.clientX, e.clientY)
  }

  function handleCardPointerLeave(e: PointerEvent<HTMLDivElement>) {
    resetGlowPosition(e.currentTarget)
  }

  function handleCardClick(feature: FeatureCard, index: number) {
    if (feature.status === "coming-soon") return
    if (pulsingIndex !== null) return
    pendingNavigationRef.current = { href: feature.href }
    setPulsingIndex(index)
  }

  function handlePulseAnimationEnd(e: AnimationEvent<HTMLDivElement>, index: number) {
    if (pulsingIndex !== index) return
    if (e.animationName !== "feature-card-heartbeat") return
    const pending = pendingNavigationRef.current
    pendingNavigationRef.current = null
    setPulsingIndex(null)
    if (pending) router.push(pending.href)
  }

  return (
    <section>
      <div className="relative flex flex-col gap-3 lg:h-[354px] lg:flex-row lg:gap-4">
        {features.map((feature, index) => {
          const isActive = activeIndex === index
          const colors = colorMap[feature.color]
          const hasImage = !!feature.image
          const isComingSoon = feature.status === "coming-soon"
          const showDescription = !isLg || isActive
          const fillAlpha = isLg && !isActive ? 0.05 : 0.1
          const fillColor = cardFillColor(feature.color, colors.pulseRgb, fillAlpha)

          const statusBadge = feature.status === "in-progress"
            ? "bg-[rgba(223,253,81,0.08)] text-[#dffd51] border-[rgba(223,253,81,0.35)]"
            : "bg-[rgba(255,255,255,0.04)] text-[#696969] border-[rgba(255,255,255,0.08)]"

          const statusLabel = feature.status === "in-progress" ? "In Progress" : "Coming Soon"

          const cardShellStyle = {
            "--feature-pulse-rgb": colors.pulseRgb,
            backgroundColor: fillColor,
            transition: "background-color 300ms, border-color 300ms",
          } as CSSProperties

          return (
            <div
              key={feature.title}
              className="relative w-full shrink-0"
              style={
                isLg
                  ? { flex: isActive ? 2.6 : 1, transition: "flex 500ms cubic-bezier(0.4,0,0.2,1)" }
                  : undefined
              }
              onMouseEnter={() => {
                if (isLg) setActiveIndex(index)
              }}
            >
              {hasImage && (
                <div
                  className="pointer-events-none absolute right-0 top-[-30px] z-10 hidden h-[383px] w-[360px] lg:block"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
                    transition: "opacity 500ms cubic-bezier(0.4,0,0.2,1), transform 500ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    width={360}
                    height={383}
                    className="size-full object-contain"
                  />
                </div>
              )}

              <div
                onClick={() => handleCardClick(feature, index)}
                onPointerMove={handleCardPointerMove}
                onPointerLeave={handleCardPointerLeave}
                className={[
                  "group relative z-[5] flex min-h-0 flex-col justify-between overflow-hidden rounded-[20px] border p-4 lg:h-full lg:p-6",
                  isComingSoon ? "cursor-default" : "cursor-pointer",
                  colors.border,
                  isComingSoon ? "" : colors.borderHover,
                ].join(" ")}
                style={cardShellStyle}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(520px circle at var(--gx, 72%) var(--gy, 28%), rgb(var(--feature-pulse-rgb) / 0.16), transparent 45%)",
                  }}
                />
                <div
                  className="relative z-[5] flex flex-col gap-3"
                  style={{
                    maxWidth: isLg && hasImage && isActive ? "52%" : "100%",
                    transition: "max-width 500ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {feature.status && (
                    <Badge
                      variant="outline"
                      className={`h-auto w-fit rounded-full px-2 py-px text-[9px] uppercase leading-[14px] tracking-[0.5px] lg:text-[8px] ${statusBadge}`}
                    >
                      {statusLabel}
                    </Badge>
                  )}
                  <h3 className={`text-xl font-bold leading-7 tracking-[-0.5px] ${isComingSoon ? "text-[#696969]" : "text-[#e0e0e0]"}`}>
                    {feature.title}
                  </h3>
                  <p
                    className={`text-[13px] leading-[22.75px] ${isComingSoon ? "text-[#4a4a4a]" : "text-[#8f8f8f]"}`}
                    style={
                      isLg
                        ? {
                            maxHeight: showDescription ? "120px" : "0px",
                            opacity: showDescription ? 1 : 0,
                            overflow: "hidden",
                            transition: "max-height 500ms cubic-bezier(0.4,0,0.2,1), opacity 400ms cubic-bezier(0.4,0,0.2,1)",
                          }
                        : {
                            maxHeight: "none",
                            opacity: 1,
                            overflow: "visible",
                          }
                    }
                  >
                    {feature.description}
                  </p>
                </div>

                {!isComingSoon && (
                  <div className="relative z-[5]">
                    <span className={`inline-flex items-center gap-1 text-[13.5px] font-bold ${colors.accent}`}>
                      View more
                      <ArrowRightIcon className="size-3.5" />
                    </span>
                  </div>
                )}
              </div>

              {!isComingSoon && (
                <div
                  aria-hidden
                  onAnimationEnd={(e) => handlePulseAnimationEnd(e, index)}
                  className={[
                    "pointer-events-none absolute -inset-1 z-[1] rounded-[22px] lg:-inset-1.5 lg:rounded-[23px]",
                    pulsingIndex === index ? "animate-feature-card-heartbeat-click" : "",
                  ].join(" ")}
                  style={
                    {
                      "--feature-pulse-rgb": colors.pulseRgb,
                    } as CSSProperties
                  }
                />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FeaturesSection10
