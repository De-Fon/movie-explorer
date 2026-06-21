/*
  🔎 SearchBar.jsx — "The Input Field"
  A labeled search input used across the app. Includes an accessible
  label for screen readers and a simple onChange callback.
*/
export default function SearchBar({ value, onChange, placeholder = 'Search movies' }) {
  return (
    <label className="search-bar">
      <span className="search-bar__label">Search</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="search-bar__input"
        type="search"
        aria-label="Search movies"
      />
    </label>
  )
}
