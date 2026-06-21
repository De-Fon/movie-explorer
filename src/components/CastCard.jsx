export default function CastCard({ actor }) {
  return (
    <article className="cast-card">
      <p className="cast-card__name">{actor.name}</p>
      <p className="cast-card__role">{actor.character}</p>
    </article>
  )
}
