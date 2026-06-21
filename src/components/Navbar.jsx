import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import { useState } from 'react'

const linkClass = ({ isActive }) => (isActive ? 'navbar__link navbar__link--active' : 'navbar__link')

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar" role="banner">
      <div className="navbar__brand">
        <NavLink to="/" className="navbar__logo">
          Movie Explorer
        </NavLink>
      </div>

      <button
        className="navbar__menu-toggle"
        aria-controls="primary-navigation"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span className="sr-only">Toggle navigation</span>
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <nav id="primary-navigation" className={`navbar__navigation ${open ? 'navbar__navigation--open' : ''}`} aria-label="Primary navigation">
        <ul className="navbar__list">
          <li>
            <NavLink to="/search" className={linkClass} onClick={() => setOpen(false)}>
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className={linkClass} onClick={() => setOpen(false)}>
              Favorites
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              className="navbar__theme-toggle"
              onClick={() => {
                toggle()
                setOpen(false)
              }}
              aria-pressed={theme === 'dark'}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
