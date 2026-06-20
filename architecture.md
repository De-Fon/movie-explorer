# Movie Explorer Architecture

## Project Vision
Build a polished movie discovery web app with a strong emphasis on:
- clean component architecture
- reusable UI patterns
- responsive design
- robust API integration
- performant user experience
- state persistence for favorites

This architecture is organized to guide implementation, clarify responsibilities, and keep the app maintainable.

---

## Tech Stack
### Required
- React
- React Router v6
- Fetch API (or Axios where preferred)
- CSS (project currently uses standard CSS modules / scoped styles)
- Vite

### Optional / Enhancements
- Context API for global state
- `useReducer` for predictable state transitions
- React Query / TanStack Query for async state and caching
- React.lazy and Suspense for route-level code splitting

---

## API Integration
### Data Source
- TMDB API
- Requires developer-owned API key stored in environment variables

### Primary endpoints
- Trending movies
- Popular movies
- Top rated movies
- Upcoming movies
- Movie details by ID
- Search movies

### API service layer
- `src/services/tmdb.js` should encapsulate endpoint URLs, request logic, and error handling.
- Centralize fetch logic to avoid duplicated request code.
- Export small functions such as `getTrendingMovies`, `searchMovies`, `getMovieDetails`, and `getMovieCredits`.

---

## Pages and Routes
### Routes
- `/` - HomePage
- `/search` - SearchPage
- `/favorites` - FavoritesPage
- `/movie/:id` - MovieDetailsPage
- `*` - NotFoundPage

### Home Page
Responsibilities:
- Show curated sections: trending, popular, top rated, upcoming
- Each section uses a reusable movie card grid
- Provide pagination or “load more” behavior
- Display loading skeletons while data loads
- Show a friendly error state for failed requests

### Search Page
Responsibilities:
- Search input with debounced queries
- Real-time search experience without excessive API calls
- Result grid with movie cards
- Clear “no results” state
- Loading indicator during search

### Movie Details Page
Responsibilities:
- Fetch and show detailed movie metadata
- Include poster, backdrop, title, release date, runtime, genres, rating, overview
- Show cast members and similar movies where available
- Provide favorites interaction from details view
- Handle missing data gracefully

### Favorites Page
Responsibilities:
- List saved favorite movies
- Persist favorites using `localStorage`
- Support removing favorites
- Show an empty state when no favorites exist

### Not Found Page
Responsibilities:
- Custom 404 UI
- Clear navigation back to home
- Keep branding consistent with app layout

---

## Component Architecture
### Core reusable components
- `Navbar` — app header, navigation links, search entry point
- `MovieCard` — poster, title, release year, rating, favorite toggle
- `Loader` — reusable loading skeleton or spinner
- `ErrorMessage` — reusable message for API failures or missing content
- `Pagination` — reusable page navigation controls
- `SearchBar` — reusable text input with debounce support

### Component design principles
- Keep components small and focused
- Pass data via props whenever possible
- Use composition for compound UI patterns
- Avoid coupling layout to data-fetching responsibilities

---

## State Management
### Component state
- `useState` for local UI state
- `useEffect` for side effects such as API calls and localStorage sync

### Global state
- Use Context API in `src/context/FavoritesContext.jsx` for favorites management
- Optionally add a theme or preferences context later
- Keep favorites logic centralized and shareable across pages

### Recommended state responsibilities
- Page components manage API data + loading / error state
- Context handles favorites state and persistence
- Reusable components receive data and callbacks via props

---

## Performance Strategies
### Search optimization
- Debounce input on `/search` to prevent requests on every keystroke
- Use `useDebounce` hook in `src/hooks/useDebounce.js`

### Memoization
- Use `useMemo` for expensive derived values
- Use `useCallback` for callback props passed to memoized children
- Use `React.memo` on pure presentational components such as `MovieCard`

### Code splitting
- Lazy-load page components with `React.lazy()` and wrap them with `Suspense`
- Keep initial bundle focused on core UI and navigation

---

## Error Handling
- Handle API failures with a reusable error UI
- Detect invalid routes and render `NotFoundPage`
- Handle missing or incomplete movie data gracefully
- Show network / loading states clearly to users

---

## Responsive Design and Accessibility
### Responsive breakpoints
- Mobile-first layout
- Tablet and desktop grid adjustments
- Flexible movie card grid and page sections

### Accessibility
- Semantic HTML structure
- `alt` text for images and posters
- Keyboard-accessible buttons and controls
- Accessible form labels and input focus states
- Clear visual focus indicators

---

## Persistence
- Persist favorites in `localStorage`
- Load persisted favorites at app startup
- Update storage whenever favorites change

---

## Folder Structure
Current app structure aligns with best practices:
```
src/
├── assets/
├── components/
├── context/
├── hooks/
├── pages/
├── services/
└── utils/
```
Recommended file placement:
- `src/App.jsx` — router and global providers
- `src/main.jsx` — app bootstrap
- `src/services/tmdb.js` — API layer
- `src/context/FavoritesContext.jsx` — favorites provider
- `src/hooks/useMovies.js` — shared movie-fetching logic
- `src/hooks/useDebounce.js` — debounce helper
- `src/utils/formatDate.js`, `src/utils/formatRating.js` — formatting utilities

---

## Success Criteria
Deliver a production-ready single-page application that demonstrates:
- reusable React components
- route-based navigation
- clean API integration with TMDB
- user-friendly loading and error states
- mobile-responsive UI
- persisted favorites
- performant search and memoization
- accessible interactions

This document is the implementation blueprint. Next, we can turn these sections into actual component and page work items.