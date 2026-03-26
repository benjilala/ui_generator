import type { ResourceEntry } from "@/lib/resource-entry"
import {
  DESIGN_SYSTEM_RESOURCES,
  PATTERNS_RESOURCES,
  PROMPTS_RESOURCES,
} from "@/lib/lab-catalog"

function pathsFrom(entries: ResourceEntry[]): string[] {
  return entries
    .filter(
      (e) =>
        Boolean(e.path) &&
        e.status !== "planned" &&
        e.status !== "future",
    )
    .map((e) => e.path as string)
}

export function getAllDownloadableLabPaths(): string[] {
  const combined = [
    ...pathsFrom(DESIGN_SYSTEM_RESOURCES),
    ...pathsFrom(PROMPTS_RESOURCES),
    ...pathsFrom(PATTERNS_RESOURCES),
  ]
  return [...new Set(combined)]
}
