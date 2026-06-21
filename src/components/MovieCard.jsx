/*
  🎫 MovieCard.jsx — "The Movie Ticket"
  A single movie card showing poster, title, year, and rating. Includes
  a favorite button when provided.
*/
import React from 'react'
import { Link } from 'react-router-dom'
import { posterUrl } from '../services/tmdb.js'
import formatRating from '../utils/formatRating.js'
import FavoriteButton from './FavoriteButton.jsx'

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const posterPath = movie.poster_path ? posterUrl(movie.poster_path) : '/fallback-poster.jpg'
  const year = movie.release_date?.slice(0, 4) || 'N/A'

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card__link">
        <img
          src={posterPath}
          alt={`Poster for ${movie.title}`}
          className="movie-card__poster"
        />
      </Link>
      <div className="movie-card__body">
        <div>
          <h3 className="movie-card__title">{movie.title}</h3>
          <p className="movie-card__meta">
            <span>{year}</span>
            <span>{formatRating(movie.vote_average)}</span>
          </p>
        </div>
        {onToggleFavorite ? (
          <FavoriteButton
            active={!!isFavorite}
            onClick={() => onToggleFavorite(movie)}
            ariaLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          />
        ) : null}
      </div>
    </article>
  )
}

export default React.memo(MovieCard)
