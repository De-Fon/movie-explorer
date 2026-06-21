export default function formatRating(voteAverage) {
  if (voteAverage == null) {
    return '—'
  }

  return `${voteAverage.toFixed(1)}/10`
}
