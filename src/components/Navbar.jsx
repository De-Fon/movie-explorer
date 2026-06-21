import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    const onAppInstalled = () => setDeferredPrompt(null)
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onAppInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  function handleSearchClick() {
    navigate('/search')
    setOpen(false)
  }

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} role="banner">
      <nav className="nav-inner" aria-label="Main navigation">
        <div className="nav-left">
          <a href="/" className="nav-logo" aria-label="Movie Explorer home">
            <span className="logo-movie">Movie</span>
            <span className="logo-explorer">Explorer</span>
          </a>
        </div>

        <div className="nav-center" aria-hidden="true" />

        <div className="nav-right">
          <div className="nav-actions">
            <button type="button" className="nav-btn nav-btn--text" onClick={handleSearchClick} aria-label="Open search">
              <svg className="icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              <span className="nav-label">Search</span>
            </button>

            <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')} aria-label="Favorites">
              <svg className="icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
              </svg>
              <span className="nav-label">Favorites</span>
            </NavLink>

            <NavLink to="/watchlist" className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')} aria-label="Watchlist">
              <svg className="icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 2h12v2H6V2zm12 4H6v14h12V6zM8 8h8v2H8V8z" fill="currentColor" />
              </svg>
              <span className="nav-label">Watchlist</span>
            </NavLink>

            <button
              type="button"
              className="theme-toggle"
              onClick={() => {
                toggle()
                setOpen(false)
              }}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            {deferredPrompt ? (
              <button
                type="button"
                className="nav-btn nav-btn--primary"
                onClick={async () => {
                  try {
                    deferredPrompt.prompt()
                    const { outcome } = await deferredPrompt.userChoice
                    setDeferredPrompt(null)
                    // if accepted, optional follow-up
                  } catch (err) {
                    setDeferredPrompt(null)
                  }
                }}
                aria-label="Install Movie Explorer"
              >
                Install
              </button>
            ) : null}
          </div>

          <button
            className={`hamburger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer and backdrop */}
      <div className={`mobile-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} aria-hidden={open ? 'false' : 'true'} />
      <aside className={`mobile-drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Mobile menu">
        <div className="drawer-actions">
          <button type="button" className="drawer-btn" onClick={handleSearchClick} aria-label="Open search">
            <svg className="icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <span>Search</span>
          </button>

          <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'drawer-link active' : 'drawer-link')} onClick={() => setOpen(false)} aria-label="Favorites">
            <svg className="icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
            </svg>
            <span>Favorites</span>
          </NavLink>

          <NavLink to="/watchlist" className={({ isActive }) => (isActive ? 'drawer-link active' : 'drawer-link')} onClick={() => setOpen(false)} aria-label="Watchlist">
            <svg className="icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2h12v2H6V2zm12 4H6v14h12V6zM8 8h8v2H8V8z" fill="currentColor" />
            </svg>
            <span>Watchlist</span>
          </NavLink>

          <hr className="drawer-divider" />

          <div className="drawer-row">
            <div>Dark Mode</div>
            <div>
              <button
                type="button"
                className="theme-toggle drawer-toggle"
                onClick={() => toggle()}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </header>
  )
}
