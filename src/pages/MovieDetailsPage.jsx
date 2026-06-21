import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  backdropUrl,
  getMovieCredits,
  getMovieDetails,
  getSimilarMovies,
  posterUrl,
} from '../services/tmdb.js'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import MovieCard from '../components/MovieCard.jsx'
import CastCard from '../components/CastCard.jsx'
import TrailerModal from '../components/TrailerModal.jsx'
import formatDate from '../utils/formatDate.js'
import formatRating from '../utils/formatRating.js'

export default function MovieDetailsPage() {
  // hooks: must all be declared before any early return
  const { id } = useParams()

  const [movie, setMovie] = useState(null)
  const [credits, setCredits] = useState(null)
  const [similar, setSimilar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)

  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const { addWatch, removeWatch, isInWatchlist } = useWatchlist()

  // Derived values (not hooks)
  const favorite = isFavorite(Number(id))
  const inWatchlist = isInWatchlist(Number(id))

  const trailerKey = useMemo(() => {
    const videos = movie?.videos?.results || []
    const trailer = videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube')
    return trailer?.key || null
  }, [movie])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    Promise.all([getMovieDetails(id), getMovieCredits(id), getSimilarMovies(id)])
      .then(([movieData, creditsData, similarData]) => {
        if (!active) return
        setMovie(movieData)
        setCredits(creditsData)
        setSimilar(similarData)
      })
      .catch((fetchError) => {
        if (active) setError(fetchError)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id])

  // Short-circuit render after hooks declared
  if (loading) return <Loader message="Loading movie details…" />
  if (error) return <ErrorMessage title="Unable to load movie details" message={error.message} retry={() => window.location.reload()} />
  if (!movie) return <ErrorMessage title="Movie not found" message="The information for this movie is unavailable." />

  const backdrop = backdropUrl(movie.backdrop_path)
  const poster = posterUrl(movie.poster_path) || '/fallback-poster.jpg'
  const safeTitle = movie.title || movie.original_title || 'Untitled'
  const safeOverview = movie.overview || 'No overview is available for this title.'
  const safeRelease = movie.release_date ? formatDate(movie.release_date) : 'Release date unknown'
  const topCast = credits?.cast?.slice(0, 6) || []
  const similarMovies = similar?.results || []

  return (
    <main className="page page--movie-details">
      <section className="movie-hero" style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}>
        <div className="movie-hero__overlay">
          <div className="movie-hero__content">
            <div className="movie-hero__poster">
              <img src={poster} alt={`Poster for ${safeTitle}`} />
            </div>
            <button
              type="button"
              className={`movie-details__watch ${inWatchlist ? 'movie-details__watch--active' : ''}`}
              onClick={() => {
                if (!movie.id) return
                if (inWatchlist) removeWatch(movie.id)
                else addWatch({ id: movie.id, title: safeTitle, poster_path: movie.poster_path, vote_average: movie.vote_average, release_date: movie.release_date })
              }}
              disabled={!movie.id}
            >
              {inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
            </button>
            <div className="movie-hero__details">
              <h1>{safeTitle}</h1>
              <p className="movie-hero__meta">
                <span>{safeRelease}</span>
                <span>{movie.runtime ? `${movie.runtime} min` : 'Runtime unknown'}</span>
                <span>{formatRating(movie.vote_average)}</span>
              </p>
              <p className="movie-hero__genres">{movie.genres?.map((genre) => genre.name).join(', ') || 'Genre unavailable'}</p>
              <p className="movie-hero__overview">{safeOverview}</p>
              <button
                type="button"
                className={`movie-details__favorite ${favorite ? 'movie-details__favorite--active' : ''}`}
                onClick={() => {
                  if (!movie.id) return
                  if (favorite) removeFavorite(movie.id)
                  else addFavorite({ id: movie.id, title: safeTitle, poster_path: movie.poster_path, vote_average: movie.vote_average, release_date: movie.release_date })
                }}
                disabled={!movie.id}
              >
                {favorite ? 'Remove from favorites' : 'Add to favorites'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="movie-details__section">
        <div className="movie-details__section-header">
          <h2>Cast</h2>
          {trailerKey ? (
            <button type="button" className="button" onClick={() => setShowTrailer(true)}>
              Watch trailer
            </button>
          ) : null}
        </div>

        {topCast.length === 0 ? (
          <p className="empty-state">No cast information is available.</p>
        ) : (
          <div className="movie-grid movie-grid--small">
            {topCast.map((actor) => (
              <CastCard key={actor.cast_id || actor.id} actor={actor} />
            ))}
          </div>
        )}
      </section>

      <section className="movie-details__section">
        <h2>Similar movies</h2>
        {similarMovies.length === 0 ? (
          <p className="empty-state">No similar movies found.</p>
        ) : (
          <div className="movie-grid">
            {similarMovies.slice(0, 8).map((similarMovie) => (
              <MovieCard key={similarMovie.id} movie={similarMovie} />
            ))}
          </div>
        )}
      </section>

      <TrailerModal open={showTrailer} onClose={() => setShowTrailer(false)} videoKey={trailerKey} />
    </main>
  )
}
