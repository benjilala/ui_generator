"use client"

import { useEffect, useState, type ElementType } from "react"

import { motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

interface TextScrambleProps extends MotionProps {
  children: string
  duration?: number
  speed?: number
  characterSet?: string
  as?: ElementType
  className?: string
  trigger?: boolean
  delay?: number
  onScrambleComplete?: () => void
}

const defaultChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

const motionByTag: Record<string, typeof motion.p> = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
  div: motion.div,
}

function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = "p",
  trigger = true,
  delay = 0,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const tag = typeof Component === "string" ? Component : "p"
  const MotionComponent = motionByTag[tag] ?? motion.p
  const [displayText, setDisplayText] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)
  const text = children

  const scramble = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const steps = duration / speed
    let step = 0

    const interval = setInterval(() => {
      let scrambled = ""
      const progress = step / steps

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          scrambled += " "
          continue
        }

        if (progress * text.length > i) {
          scrambled += text[i]
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)]
        }
      }

      setDisplayText(scrambled)
      step++

      if (step > steps) {
        clearInterval(interval)
        setDisplayText(text)
        setIsAnimating(false)
        onScrambleComplete?.()
      }
    }, speed * 1000)
  }

  useEffect(() => {
    if (!trigger) return

    const timeout = setTimeout(() => {
      scramble()
    }, delay * 1000)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  return (
    <MotionComponent className={cn(className)} {...props}>
      {displayText}
    </MotionComponent>
  )
}

export { TextScramble, type TextScrambleProps }
