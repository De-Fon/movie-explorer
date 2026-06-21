/*
  ❤️ FavoriteButton.jsx — "The Heart Icon"
  A small toggle button used to mark movies as favorites. Updates
  `aria-pressed` and accepts an accessible label.
*/
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
