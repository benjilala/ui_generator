"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Provider } from "@/lib/mocks"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProviderFilterBarProps {
  providers: Provider[]
  searchValue: string
  onSearchChange: (value: string) => void
  selectedProvider: string
  onProviderChange: (value: string) => void
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProviderFilterBar({
  providers,
  searchValue,
  onSearchChange,
  selectedProvider,
  onProviderChange,
  className,
}: ProviderFilterBarProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-3", className)}>
      {/* Search input */}
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-cb-foreground-muted pointer-events-none"
          aria-hidden
        />
        <Input
          type="search"
          placeholder="Search games…"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className={cn(
            "pl-9 pr-9 h-10 bg-cb-surface-3 border-cb-border",
            "text-cb-foreground placeholder:text-cb-foreground-muted",
            "focus-visible:border-cb-brand-purple focus-visible:ring-cb-brand-purple/30",
          )}
          aria-label="Search games"
        />
        {searchValue && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cb-foreground-muted hover:text-cb-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Provider select */}
      <Select value={selectedProvider} onValueChange={onProviderChange}>
        <SelectTrigger
          className={cn(
            "w-full sm:w-48 h-10 bg-cb-surface-3 border-cb-border",
            "text-cb-foreground",
            "focus:ring-cb-brand-purple/30 focus:border-cb-brand-purple",
          )}
          aria-label="Filter by provider"
        >
          <SelectValue placeholder="All Providers" />
        </SelectTrigger>
        <SelectContent className="bg-cb-surface-5 border-cb-border">
          <SelectItem value="all" className="text-cb-foreground focus:bg-cb-surface-6 focus:text-cb-foreground">
            All Providers
          </SelectItem>
          {providers.map((p) => (
            <SelectItem
              key={p.id}
              value={p.id}
              className="text-cb-foreground focus:bg-cb-surface-6 focus:text-cb-foreground"
            >
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
