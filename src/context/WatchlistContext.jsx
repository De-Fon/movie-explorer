import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const WatchlistContext = createContext(null)
const STORAGE_KEY = 'movie-explorer-watchlist'

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored))
      } catch {
        setWatchlist([])
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
  }, [watchlist])

  const addWatch = useCallback((movie) => {
    setWatchlist((cur) => {
      if (cur.some((m) => m.id === movie.id)) return cur
      return [...cur, movie]
    })
  }, [])

  const removeWatch = useCallback((id) => {
    setWatchlist((cur) => cur.filter((m) => m.id !== id))
  }, [])

  const isInWatchlist = useCallback((id) => watchlist.some((m) => m.id === id), [watchlist])

  const value = useMemo(() => ({ watchlist, addWatch, removeWatch, isInWatchlist }), [watchlist, addWatch, removeWatch, isInWatchlist])

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext)
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider')
  return ctx
}
