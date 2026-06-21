/*
  🧠 FavoritesContext.jsx — Global favorites memory
  Keeps a list of favorite movies in localStorage and exposes helpers
  to add/remove/check favorites across the app.
*/
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const FavoritesContext = createContext(null)
const STORAGE_KEY = 'movie-explorer-favorites'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch {
        setFavorites([])
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = useCallback((movie) => {
    setFavorites((current) => {
      if (current.some((item) => item.id === movie.id)) {
        return current
      }
      return [...current, movie]
    })
  }, [])

  const removeFavorite = useCallback((movieId) => {
    setFavorites((current) => current.filter((item) => item.id !== movieId))
  }, [])

  const isFavorite = useCallback(
    (movieId) => favorites.some((item) => item.id === movieId),
    [favorites],
  )

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite }),
    [favorites, addFavorite, removeFavorite, isFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return context
}
