export default function SkeletonCard() {
  return (
    <article className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__poster" />
      <div className="skeleton-card__body">
        <div className="skeleton-card__title" />
        <div className="skeleton-card__meta" />
      </div>
    </article>
  )
}
