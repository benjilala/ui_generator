"use client"

import { useState, useEffect } from "react"

import { MicIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const VoiceAssistant = () => {
  const [submitted, setSubmitted] = useState(false)
  const [time, setTime] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isDemo, setIsDemo] = useState(true)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>

    if (submitted) {
      intervalId = setInterval(() => {
        setTime((t) => t + 1)
      }, 1000)
    } else {
      setTime(0)
    }

    return () => clearInterval(intervalId)
  }, [submitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60

    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (!isDemo) return

    let timeoutId: ReturnType<typeof setTimeout>

    const runAnimation = () => {
      setSubmitted(true)
      timeoutId = setTimeout(() => {
        setSubmitted(false)
        timeoutId = setTimeout(runAnimation, 1000)
      }, 3000)
    }

    const initialTimeout = setTimeout(runAnimation, 100)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(initialTimeout)
    }
  }, [isDemo])

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false)
      setSubmitted(false)
    } else {
      setSubmitted((prev) => !prev)
    }
  }

  return (
    <div className="flex h-61.5 flex-1 items-center justify-center">
      <div className="relative flex w-full max-w-50 flex-col items-center gap-3">
        <button
          className="group hover:bg-accent flex size-14 cursor-pointer items-center justify-center rounded-xl transition-colors"
          type="button"
          onClick={handleClick}
        >
          {submitted ? (
            <div
              className="bg-primary pointer-events-none size-5 animate-spin rounded-sm"
              style={{ animationDuration: "3s" }}
            />
          ) : (
            <MicIcon className="size-9.5 stroke-[1.5]" />
          )}
        </button>

        <span className="text-muted-foreground font-mono text-sm font-light transition-opacity duration-300">
          {formatTime(time)}
        </span>

        <div className="flex h-4 w-49.5 items-center justify-center gap-0.5 px-1 py-0.5">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-0.5 rounded-full transition-all duration-300",
                submitted ? "bg-primary/80 animate-pulse" : "bg-muted-foreground h-1",
              )}
              style={
                submitted && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className="text-card-foreground">{submitted ? "Listening..." : "Click to speak"}</p>
      </div>
    </div>
  )
}

export default VoiceAssistant
