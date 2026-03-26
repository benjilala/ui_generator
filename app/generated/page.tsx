"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { LabPageHeader } from "@/components/patterns/lab-page-header"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { GeneratedNav } from "@/components/cloudbet/GeneratedNav"
import { PromptGenerator } from "@/components/cloudbet/PromptGenerator"
import { GeneratedPreview } from "@/components/cloudbet/GeneratedPreview"
import { SEED_GENERATED_SCREENS } from "@/lib/system/generated-screens"
import type { GeneratedEntry } from "@/lib/system/generated-screens"
import { interpretPrompt } from "@/lib/system/prompt-interpreter"

/** Set to `true` to restore prompt input, regenerate, and mark useful. */
const GENERATION_ENABLED = false

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GeneratedPage() {
  const [entries, setEntries] = useState<GeneratedEntry[]>(SEED_GENERATED_SCREENS)
  const [selectedId, setSelectedId] = useState<string | null>(SEED_GENERATED_SCREENS[0]?.id ?? null)

  const selectedEntry = entries.find((e) => e.id === selectedId) ?? null

  const handleGenerate = useCallback((partial: Omit<GeneratedEntry, "id" | "createdAt">) => {
    if (!GENERATION_ENABLED) return
    const newEntry: GeneratedEntry = {
      ...partial,
      id: `gen-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    setEntries((prev) => [newEntry, ...prev])
    setSelectedId(newEntry.id)
  }, [])

  const handleRegenerate = useCallback((entry: GeneratedEntry) => {
    if (!GENERATION_ENABLED) return
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
    if (!GENERATION_ENABLED) return
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
      <LabPageHeader
        title="Generated from Prompts"
        trailing={
          <>
            <Badge
              variant="outline"
              className={
                GENERATION_ENABLED
                  ? "border-cb-primary/30 bg-cb-primary/10 text-cb-purple-50 text-[9px] uppercase tracking-wider"
                  : "border-cb-border text-cb-foreground-disabled text-[9px] uppercase tracking-wider"
              }
            >
              {GENERATION_ENABLED ? "Generation Workspace" : "View only"}
            </Badge>
            <ThemeSwitcher />
          </>
        }
      />

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
          {GENERATION_ENABLED ? (
            <PromptGenerator onGenerate={handleGenerate} />
          ) : (
            <div className="rounded-[var(--cb-radius-lg)] border border-cb-border bg-cb-surface-3 px-4 py-3 text-sm text-cb-foreground-muted">
              Generation from prompts is turned off. Browse the examples on the left to see what the workspace produced.
            </div>
          )}

          {selectedEntry ? (
            <GeneratedPreview
              entry={selectedEntry}
              readOnly={!GENERATION_ENABLED}
              onRegenerate={handleRegenerate}
              onMarkUseful={handleMarkUseful}
            />
          ) : (
            <EmptyState generationEnabled={GENERATION_ENABLED} />
          )}

        </main>
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ generationEnabled }: { generationEnabled: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--cb-radius-lg)] border border-dashed border-cb-border bg-cb-surface-2 py-20 px-8 text-center gap-3">
      <div className="size-12 rounded-[var(--cb-radius-lg)] bg-cb-surface-3 border border-cb-border flex items-center justify-center text-2xl">
        ✦
      </div>
      <p className="text-sm font-semibold text-cb-foreground">No screen selected</p>
      <p className="text-xs text-cb-foreground-muted max-w-xs leading-relaxed">
        {generationEnabled
          ? "Submit a prompt above to generate a UI preview, or select an existing entry from the left navigation."
          : "Select an entry from the left to view a saved example."}
      </p>
    </div>
  )
}
