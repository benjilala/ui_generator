"use client"

import * as React from "react"

export type ThemeId = "cloudbet" | "lilac-dark" | "lilac-light" | "clean-slate-light"

export interface Theme {
  id: ThemeId
  label: string
  description: string
  swatches: [string, string, string]
  isLight?: boolean
}

export const THEMES: Theme[] = [
  {
    id: "cloudbet",
    label: "Cloudbet",
    description: "Production — deep purple surfaces, vivid purple CTA, lime accent",
    swatches: ["oklch(0.236 0.018 310)", "oklch(0.542 0.207 299)", "oklch(0.942 0.192 119)"],
  },
  {
    id: "lilac-dark",
    label: "Lilac Dark",
    description: "Warm plum surfaces, soft violet primary",
    swatches: ["#1e1916", "#c1aaff", "#4b3e5b"],
  },
  {
    id: "lilac-light",
    label: "Lilac Light",
    description: "Lavender surfaces, soft violet primary",
    swatches: ["#f8f3fa", "#a78bfb", "#f5e5f7"],
    isLight: true,
  },
  {
    id: "clean-slate-light",
    label: "Clean Slate Light",
    description: "White surfaces, indigo primary",
    swatches: ["oklch(0.98 0 0)", "oklch(0.59 0.20 277.06)", "oklch(0.93 0.03 273.66)"],
    isLight: true,
  },
]

export interface ThemeOverrides {
  primary?: string
  accent?: string
  fontSans?: string
  fontMono?: string
  radius?: string
}

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (id: ThemeId) => void
  overrides: ThemeOverrides
  setOverrides: (overrides: ThemeOverrides) => void
  resetOverrides: () => void
  /** Clears saved theme + overrides and applies Cloudbet (matches Vercel first visit). */
  resetToProductionTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "cloudbet",
  setTheme: () => {},
  overrides: {},
  setOverrides: () => {},
  resetOverrides: () => {},
  resetToProductionTheme: () => {},
})

export function useTheme() {
  return React.useContext(ThemeContext)
}

const STORAGE_KEY = "cb-ui-theme"
const OVERRIDES_KEY = "cb-ui-theme-overrides"

const OVERRIDE_VAR_MAP: Record<keyof ThemeOverrides, string[]> = {
  primary: ["--primary", "--ring", "--cb-primary"],
  accent: ["--accent", "--cb-accent"],
  fontSans: ["--font-sans"],
  fontMono: ["--font-mono"],
  radius: ["--radius"],
}

const OVERRIDE_VARS_ALL: string[] = [
  ...new Set(Object.values(OVERRIDE_VAR_MAP).flat()),
  "--cb-icon-primary",
]

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeId>("cloudbet")
  const [overrides, setOverridesState] = React.useState<ThemeOverrides>({})

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null
    if (stored && THEMES.find((t) => t.id === stored)) {
      applyTheme(stored)
      setThemeState(stored)
    }

    const storedOverrides = localStorage.getItem(OVERRIDES_KEY)
    if (storedOverrides) {
      try {
        const parsed = JSON.parse(storedOverrides) as ThemeOverrides
        setOverridesState(parsed)
        applyOverrides(parsed)
      } catch { /* ignore bad data */ }
    }
  }, [])

  function setTheme(id: ThemeId) {
    applyTheme(id)
    setThemeState(id)
    localStorage.setItem(STORAGE_KEY, id)
    applyOverrides(overrides)
  }

  function setOverrides(next: ThemeOverrides) {
    setOverridesState(next)
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(next))
    applyOverrides(next)
  }

  function resetOverrides() {
    setOverridesState({})
    localStorage.removeItem(OVERRIDES_KEY)
    clearOverrides()
  }

  function resetToProductionTheme() {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(OVERRIDES_KEY)
    clearOverrides()
    applyTheme("cloudbet")
    setThemeState("cloudbet")
    setOverridesState({})
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        overrides,
        setOverrides,
        resetOverrides,
        resetToProductionTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

function applyTheme(id: ThemeId) {
  const html = document.documentElement
  const themeConfig = THEMES.find((t) => t.id === id)

  if (id === "cloudbet") {
    html.removeAttribute("data-theme")
    html.classList.add("dark")
  } else if (themeConfig?.isLight) {
    html.setAttribute("data-theme", id)
    html.classList.remove("dark")
  } else {
    html.setAttribute("data-theme", id)
    html.classList.add("dark")
  }
}

function applyOverrides(o: ThemeOverrides) {
  const html = document.documentElement
  for (const [key, vars] of Object.entries(OVERRIDE_VAR_MAP)) {
    const value = o[key as keyof ThemeOverrides]
    for (const v of vars) {
      if (value) {
        html.style.setProperty(v, value)
      } else {
        html.style.removeProperty(v)
      }
    }
  }

  if (o.fontSans) ensureGoogleFont(o.fontSans)
  if (o.fontMono) ensureGoogleFont(o.fontMono)
}

const _loadedFonts = new Set<string>()

function ensureGoogleFont(familyCss: string) {
  const family = familyCss.split(",")[0].trim()
  if (_loadedFonts.has(family)) return
  _loadedFonts.add(family)

  const encoded = family.replace(/\s+/g, "+")
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700&display=swap`
  document.head.appendChild(link)
}

function clearOverrides() {
  const html = document.documentElement
  for (const v of OVERRIDE_VARS_ALL) {
    html.style.removeProperty(v)
  }
}
