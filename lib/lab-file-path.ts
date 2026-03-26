const ALLOWED_PREFIXES = [
  "lib/prompts/",
  "lib/audit/",
  "lib/tokens/",
  "lib/system/",
  "styles/",
  ".cursor/rules/",
] as const

const ALLOWED_FILES = new Set(["app/globals.css"])

export function validateLabRelativePath(raw: string | null): string | null {
  if (!raw || raw.length > 512) return null
  const rel = raw.replace(/\\/g, "/").replace(/^\/+/, "")
  if (rel.includes("\0")) return null
  const segments = rel.split("/")
  if (segments.some((s) => s === "..")) return null
  const normalized = segments.join("/")
  if (ALLOWED_FILES.has(normalized)) return normalized
  for (const prefix of ALLOWED_PREFIXES) {
    if (normalized.startsWith(prefix)) return normalized
  }
  return null
}
