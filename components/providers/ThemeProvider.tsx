"use client"

import * as React from "react"

export type ThemeId = "cloudbet" | "lilac-dark" | "lilac-light" | "clean-slate-light"

export interface Theme {
  id: ThemeId
  label: string
  description: string
  /** Preview swatch colors [surface, primary, accent] */
  swatches: [string, string, string]
  /** Whether this theme uses light (not dark) mode */
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

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (id: ThemeId) => void
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "cloudbet",
  setTheme: () => {},
})

export function useTheme() {
  return React.useContext(ThemeContext)
}

const STORAGE_KEY = "cb-ui-theme"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeId>("cloudbet")

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null
    if (stored && THEMES.find((t) => t.id === stored)) {
      applyTheme(stored)
      setThemeState(stored)
    }
  }, [])

  function setTheme(id: ThemeId) {
    applyTheme(id)
    setThemeState(id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
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
