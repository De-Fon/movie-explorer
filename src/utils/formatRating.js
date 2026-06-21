/*
  ⭐ formatRating.js — Rating formatter
  Converts a numeric TMDB rating into a friendly `7.8/10` string for UI.
*/
export default function formatRating(voteAverage) {
  if (voteAverage == null) {
    return '—'
  }

  return `${voteAverage.toFixed(1)}/10`
}
