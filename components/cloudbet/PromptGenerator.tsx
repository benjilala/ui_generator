"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { interpretPrompt } from "@/lib/system/prompt-interpreter"
import type { GeneratedEntry } from "@/lib/system/generated-screens"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PromptGeneratorProps {
  onGenerate: (entry: Omit<GeneratedEntry, "id" | "createdAt">) => void
  className?: string
}

// ─── Example prompts ──────────────────────────────────────────────────────────

const EXAMPLE_PROMPTS = [
  "Create a VIP casino lobby",
  "Generate a faster sportsbook home",
  "Design a jackpot discovery page",
  "Create a bet placement feedback flow",
]

// ─── Component ────────────────────────────────────────────────────────────────

export function PromptGenerator({ onGenerate, className }: PromptGeneratorProps) {
  const [prompt, setPrompt] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)

  function handleGenerate() {
    const trimmed = prompt.trim()
    if (!trimmed) return

    setIsGenerating(true)
    // Simulate a brief generation delay for UX feedback
    setTimeout(() => {
      const entry = interpretPrompt(trimmed)
      onGenerate(entry)
      setIsGenerating(false)
    }, 600)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleGenerate()
    }
  }

  function handleExampleClick(example: string) {
    setPrompt(example)
  }

  return (
    <div className={cn(
      "rounded-[var(--cb-radius-lg)] border border-cb-border bg-cb-surface-3 p-5",
      className
    )}>
      {/* Heading */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex size-7 items-center justify-center rounded-[var(--cb-radius-md)] bg-cb-primary/15 border border-cb-primary/20">
          <Sparkles className="size-3.5 text-cb-purple-50" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-bold text-cb-foreground leading-tight">Generate UI from Prompt</h2>
          <p className="text-[10px] text-cb-foreground-disabled mt-px">Pattern-driven · Uses existing Cloudbet components</p>
        </div>
      </div>

      {/* Textarea */}
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe the UI you want to generate…"
        className="w-full resize-none bg-cb-surface-2 border-cb-border text-cb-foreground placeholder:text-cb-foreground-disabled text-sm min-h-[72px]"
        rows={3}
      />

      {/* Button — below textarea */}
      <Button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        isLoading={isGenerating}
        className="mt-3 w-fit disabled:text-white/40"
      >
        {isGenerating ? "Generating…" : "Generate"}
      </Button>

      {/* Example prompts */}
      <div className="mt-3 flex flex-wrap gap-2 items-center">
        <span className="text-[10px] text-cb-foreground-disabled font-mono uppercase tracking-widest shrink-0">
          Try:
        </span>
        {EXAMPLE_PROMPTS.map((ex) => (
          <button
            key={ex}
            onClick={() => handleExampleClick(ex)}
            className="inline-flex items-center rounded-full border border-cb-border bg-cb-surface-2 px-2.5 py-1 text-[10px] text-cb-foreground-muted hover:text-cb-foreground hover:border-cb-border-visible hover:bg-cb-surface-3 transition-colors"
          >
            {ex}
          </button>
        ))}
      </div>

      <p className="mt-2 text-[10px] text-cb-foreground-disabled">
        ⌘ + Enter to generate
      </p>
    </div>
  )
}
