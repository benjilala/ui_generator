"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GeneratedNav } from "@/components/cloudbet/GeneratedNav"
import { PromptGenerator } from "@/components/cloudbet/PromptGenerator"
import { GeneratedPreview } from "@/components/cloudbet/GeneratedPreview"
import { SEED_GENERATED_SCREENS } from "@/lib/system/generated-screens"
import type { GeneratedEntry } from "@/lib/system/generated-screens"
import { interpretPrompt } from "@/lib/system/prompt-interpreter"

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GeneratedPage() {
  const [entries, setEntries] = useState<GeneratedEntry[]>(SEED_GENERATED_SCREENS)
  const [selectedId, setSelectedId] = useState<string | null>(SEED_GENERATED_SCREENS[0]?.id ?? null)

  const selectedEntry = entries.find((e) => e.id === selectedId) ?? null

  const handleGenerate = useCallback((partial: Omit<GeneratedEntry, "id" | "createdAt">) => {
    const newEntry: GeneratedEntry = {
      ...partial,
      id: `gen-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    setEntries((prev) => [newEntry, ...prev])
    setSelectedId(newEntry.id)
  }, [])

  const handleRegenerate = useCallback((entry: GeneratedEntry) => {
    const reinterpreted = interpretPrompt(entry.prompt)
    const newEntry: GeneratedEntry = {
      ...reinterpreted,
      id: `gen-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    setEntries((prev) => [newEntry, ...prev])
    setSelectedId(newEntry.id)
  }, [])

  const handleMarkUseful = useCallback((id: string) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "useful" ? "preview" : "useful" }
          : e
      )
    )
  }, [])

  return (
    <div className="min-h-screen bg-cb-surface-1 flex flex-col">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-cb-border bg-cb-surface-0/90 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-cb-foreground-muted hover:text-cb-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Lab
          </Link>
          <Separator orientation="vertical" className="h-4 bg-cb-border" />
          <span className="text-sm font-semibold text-cb-foreground">Generated from Prompts</span>
          <Badge
            variant="outline"
            className="ml-auto border-cb-primary/30 bg-cb-primary/10 text-cb-primary text-[9px] uppercase tracking-wider"
          >
            Generation Workspace
          </Badge>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 flex gap-6 flex-1 min-h-0">

        {/* Left nav */}
        <aside className="w-56 shrink-0 sticky top-20 self-start">
          <GeneratedNav
            entries={entries}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 flex flex-col gap-5">

          {/* Prompt input */}
          <PromptGenerator onGenerate={handleGenerate} />

          {/* Preview area */}
          {selectedEntry ? (
            <GeneratedPreview
              entry={selectedEntry}
              onRegenerate={handleRegenerate}
              onMarkUseful={handleMarkUseful}
            />
          ) : (
            <EmptyState />
          )}

        </main>
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--cb-radius-lg)] border border-dashed border-cb-border bg-cb-surface-2 py-20 px-8 text-center gap-3">
      <div className="size-12 rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border flex items-center justify-center text-2xl">
        ✦
      </div>
      <p className="text-sm font-semibold text-cb-foreground">No screen selected</p>
      <p className="text-xs text-cb-foreground-muted max-w-xs leading-relaxed">
        Submit a prompt above to generate a UI preview, or select an existing entry from the left navigation.
      </p>
    </div>
  )
}
