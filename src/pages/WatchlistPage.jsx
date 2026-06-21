/*
  📝 WatchlistPage.jsx — "The To-Do List"
  Displays movies the user wants to watch later and allows removing them.
*/
import { useMemo } from 'react'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import MovieCard from '../components/MovieCard.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function WatchlistPage() {
  const { watchlist, removeWatch } = useWatchlist()

  const content = useMemo(() => {
    if (!watchlist) return <ErrorMessage title="Unable to load watchlist" />
    if (watchlist.length === 0)
      return <p className="empty-state">Your watchlist is empty. Browse movies and add ones you'd like to watch.</p>

    return (
      <div className="movie-grid">
        {watchlist.map((m) => (
          <article key={m.id} className="movie-card">
            <a href={`/movie/${m.id}`} className="movie-card__link">
              <img src={m.poster_path ? `/` : '/fallback-poster.jpg'} alt={`Poster for ${m.title}`} className="movie-card__poster" />
            </a>
            <div className="movie-card__body">
              <div>
                <h3 className="movie-card__title">{m.title}</h3>
                <p className="movie-card__meta">
                  <span>{(m.release_date || '').slice(0, 4) || 'N/A'}</span>
                  <span>{m.vote_average ? `${m.vote_average}/10` : '—'}</span>
                </p>
              </div>
              <div>
                <button type="button" className="favorite-button" onClick={() => removeWatch(m.id)} aria-label={`Remove ${m.title} from watchlist`}>
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    )
  }, [watchlist, removeWatch])

  return (
    <main className="page page--watchlist">
      <header className="page__header">
        <h1>Your Watchlist</h1>
      </header>
      {content}
    </main>
  )
}
