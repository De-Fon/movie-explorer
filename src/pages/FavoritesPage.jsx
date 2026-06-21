import { useMemo } from 'react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import MovieCard from '../components/MovieCard.jsx'

export default function FavoritesPage() {
  const { favorites, removeFavorite, isFavorite } = useFavorites()

  const content = useMemo(() => {
    if (favorites.length === 0) {
      return <p className="empty-state">You haven't saved any favorites yet.</p>
    }

    return (
      <div className="movie-grid">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={() => removeFavorite(movie.id)}
          />
        ))}
      </div>
    )
  }, [favorites, isFavorite, removeFavorite])

  return (
    <main className="page page--favorites">
      <header className="page__header">
        <h1>Favorites</h1>
        <p>Saved movies are persisted in your browser and available here.</p>
      </header>
      {content}
    </main>
  )
}
