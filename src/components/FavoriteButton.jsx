export default function FavoriteButton({ active = false, onClick, children, ariaLabel }) {
  return (
    <button
      type="button"
      className={`favorite-button ${active ? 'favorite-button--active' : ''}`}
      onClick={onClick}
      aria-pressed={!!active}
      aria-label={ariaLabel || (active ? 'Remove from favorites' : 'Add to favorites')}
    >
      {children || (active ? 'Remove' : 'Favorite')}
    </button>
  )
}
