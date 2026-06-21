/*
  🧠 ThemeContext.jsx — Remembers Dark/Light mode
  Stores the user's theme preference in localStorage and exposes a
  `useTheme()` hook with `toggle()` to switch themes.
*/
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'movie-explorer-theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'dark' || stored === 'light') return stored
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      return 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {}
    if (theme === 'dark') {
      document.documentElement.classList.add('theme-dark')
    } else {
      document.documentElement.classList.remove('theme-dark')
    }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
