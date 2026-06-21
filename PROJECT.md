# Movie Explorer — Project Documentation

> Generated on June 21, 2026. This document describes the complete codebase of the Movie Explorer React application.

---

## SECTION 1: Project Overview

The **Movie Explorer** web application is a client-side interface designed to solve the problem of discovering, searching, and managing information about movies. It integrates with **The Movie Database (TMDB) API** to fetch up-to-date movie details, cast credits, trailer videos, and lists of similar films. Users can browse movies through a curated list with robust filtering options (sorting by popularity, rating, or release date, and filtering by minimum rating or release year). They can also search by title, view comprehensive details, play official YouTube trailers, toggle light/dark modes, add movies to their personal Watchlist or Favorites list, and check their network status.

The tech stack relies on **React** (v19.2.6) for component structure and UI state, **Vite** (v8.0.12) for high-performance builds, **React Router DOM** (v7.18.0) for client-side routing, and **Axios** (v1.18.0) for HTTP client communication. Additionally, it implements Progressive Web App (PWA) capabilities via `vite-plugin-pwa` for offline asset caching and app installation support.

---

## SECTION 2: Tech Stack

Below are two tables compiling the precise packages, versions, and descriptions parsed from `package.json`.

### 2A — Production Dependencies

| Technology | Version | Purpose |
|:---|:---|:---|
| **axios** | `^1.18.0` | Promise-based HTTP client used to request data from the TMDB API. |
| **react** | `^19.2.6` | The core library for building interactive user interfaces via component hierarchy. |
| **react-dom** | `^19.2.6` | Serves as the entry point to the DOM, enabling React component rendering in browser pages. |
| **react-router-dom** | `^7.18.0` | Provides client-side routing, page navigation, and URL parameter management. |

### 2B — Development Dependencies

| Technology | Version | Purpose |
|:---|:---|:---|
| **@babel/preset-env** | `^8.0.2` | Smart preset that allows the use of modern JavaScript syntax in older environments. |
| **@babel/preset-react** | `^8.0.1` | Preset for compiling React JSX code into standard JavaScript. |
| **@eslint/js** | `^10.0.1` | Contains ESLint's default configuration settings and rules for JavaScript. |
| **@tanstack/react-query**| `^5.101.0` | State-management library for orchestrating data-fetching queries, caching, and loading states. |
| **@testing-library/jest-dom** | `^6.9.1` | Custom Jest matchers for asserting on the state of the DOM. |
| **@testing-library/react** | `^16.3.2` | React testing utility for rendering and interacting with React components in tests. |
| **@types/react** | `^19.2.14` | TypeScript definitions for React types. |
| **@types/react-dom** | `^19.2.3` | TypeScript definitions for React DOM types. |
| **@vitejs/plugin-react** | `^6.0.1` | Integrates Vite with React's hot-reload and compilation features. |
| **babel-jest** | `^30.4.1` | Babel compiler adapter for transforming modern JavaScript/JSX files during Jest runs. |
| **eslint** | `^10.3.0` | Pluggable linting utility for identifying code style issues and bugs. |
| **eslint-plugin-react-hooks** | `^7.1.1` | ESLint rules enforcing correct usage of React hooks. |
| **eslint-plugin-react-refresh** | `^0.5.2` | ESLint plugin for React Fast Refresh development support. |
| **globals** | `^17.6.0` | Predefined global variables configuration list for linting rules. |
| **jest** | `^30.4.2` | JavaScript testing framework for executing automated unit and component tests. |
| **jest-environment-jsdom** | `^30.4.1` | Browser-like DOM environment representation used to run React tests in Node.js. |
| **vite** | `^8.0.12` | Frontend build tool and rapid development server wrapper. |
| **vite-plugin-pwa** | `^1.3.0` | Configuration plugin for automatically registering service workers and PWA manifests. |

---

## SECTION 3: Project Structure

```text
src/
├── App.css
├── App.jsx
├── index.css
├── main.jsx
├── setupTests.js
├── __mocks__/
│   ├── fileMock.js
│   └── styleMock.js
├── __tests__/
│   ├── ErrorMessage.test.jsx
│   ├── FavoriteButton.test.jsx
│   ├── HomePage.test.jsx
│   ├── Loader.test.jsx
│   ├── Navbar.test.jsx
│   ├── ThemeContext.test.jsx
│   ├── formatRating.test.js
│   └── useDebounce.test.jsx
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components/
│   ├── CastCard.jsx
│   ├── ErrorBoundary.jsx
│   ├── ErrorMessage.jsx
│   ├── FavoriteButton.jsx
│   ├── Loader.jsx
│   ├── MovieCard.jsx
│   ├── Navbar.css
│   ├── Navbar.jsx
│   ├── NetworkStatusBanner.jsx
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   ├── SkeletonCard.jsx
│   ├── TrailerModal.jsx
│   └── __tests__/
│       └── MovieCard.test.jsx
├── context/
│   ├── FavoritesContext.jsx
│   ├── ThemeContext.jsx
│   └── WatchlistContext.jsx
├── hooks/
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   ├── useMovieFetch.js
│   └── useMovies.js
├── services/
│   └── tmdb.js
└── utils/
    ├── formatDate.js
    └── formatRating.js
```

### Legend of Directories and Key Files

- `src/App.css` — Global supplementary styles for specific elements like counter overlays and layout details.
- `src/App.jsx` — The root shell component setting up contexts, layout, and client-side page routing.
- `src/index.css` — Main global stylesheet housing the root variables, color themes, grids, and utilities.
- `src/main.jsx` — Application entry point initializing the React application, React Query provider, and service worker registration.
- `src/setupTests.js` — Test initialization script configuring global DOM mocks and cleanups.
- `src/__mocks__/` — Static asset mock files ensuring that CSS or file imports do not crash Jest.
- `src/__tests__/` — Suite of unit and integration test files for core contexts, hooks, utilities, and components.
- `src/assets/` — Directory for static images and logos used inside the application templates.
- `src/components/` — Folder for reusable React components that define UI structure.
- `src/components/__tests__/` — Components test folder housing `MovieCard.test.jsx`.
- `src/context/` — React Context files providing global state for themes, favorites, and the watchlist.
- `src/hooks/` — Custom hooks encapsulating state logic, local storage sync, debouncing, and API pagination calls.
- `src/services/` — Directory encapsulating axios configurations and requests to the external TMDB API.
- `src/utils/` — Utility helper functions for formatting ratings and parsing dates.

---

## SECTION 4: File-by-File Explanation

---

### `package.json`

**Type:** Config

**Purpose:**
Defines the Node project specifications, name, execution scripts, production dependency versions, development compiler presets, test runner requirements, and standard linting tooling settings.

**What it exports:**
- N/A (JSON configuration file)

**Used by:**
- Node.js / NPM package manager

**Gotchas / known issues / things to be aware of:**
- React Query (`@tanstack/react-query`) is defined as a `devDependency` instead of a `dependency` in `package.json`, which could cause deployment issues in production environments if devDependencies are pruned.

---

### `vite.config.js`

**Type:** Config

**Purpose:**
Specifies Vite configurations for compile/build steps, includes the React rendering plugin, and configures the Progressive Web App plugin parameters, specifying auto-updates, standalone display rules, theme colors, and application icon paths.

**What it exports:**
- `default export` — Vite configuration object configuration wrapper

**Used by:**
- Vite build tool

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `jest.config.cjs`

**Type:** Config

**Purpose:**
Manages the configuration parameters for running tests through Jest. It instructs the test engine to run under a JSDOM environment, parses modern code files using `babel-jest`, maps stylesheets and asset references to dry mocks, and runs setup files.

**What it exports:**
- `module.exports` — Jest configuration object setting testing flags

**Used by:**
- Jest test runner

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `jest.setup.js`

**Type:** Config

**Purpose:**
Extends the testing environment before running any test files. It imports the `@testing-library/jest-dom` matchers and patches the global Node scope with `TextEncoder` and `TextDecoder` to prevent runtime errors in dependency structures.

**What it exports:**
- N/A (Executed side-effectually on test setup)

**Used by:**
- Jest (via `jest.config.cjs` setupFilesAfterEnv)

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `index.html`

**Type:** Page

**Purpose:**
Serves as the root HTML entry page rendered by the browser. It outlines basic SEO meta tags, specifies browser viewport scaling, references the PWA manifest, and anchors the `<div id="root">` node where the React tree mounts.

**What it exports:**
- N/A (HTML structure document)

**Used by:**
- Vite development server / production output builder

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `.env.example`

**Type:** Config

**Purpose:**
Acts as a template document documenting the required environment variables needed for local builds, specifically detailing the TMDB API key parameter.

**What it exports:**
- N/A (Template document)

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `.env`

**Type:** Config

**Purpose:**
Stores the secret local configuration variables, containing the active user's TMDB API key used for executing movie database queries.

**What it exports:**
- N/A (Excluded from git tracking)

**Gotchas / known issues / things to be aware of:**
- Should never be checked into version control.

---

### `public/manifest.webmanifest`

**Type:** Config

**Purpose:**
Provides the web app manifest JSON schema for web browsers to understand display preferences, start URLs, background/theme colors, and application icon files, making the site installable as a mobile application.

**What it exports:**
- N/A (JSON web manifest)

**Used by:**
- Mobile and desktop browsers for PWA installation features

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `public/sw.js`

**Type:** Config

**Purpose:**
A service worker file defining basic browser caching functionality. It caches the root pathname and index page on installation, clears old cache versions on activation, and implements a network-first fetch handler falling back to index cache if offline.

**What it exports:**
- N/A (Executed directly by the browser's Service Worker thread)

**Used by:**
- Client browser context

**Gotchas / known issues / things to be aware of:**
- Caches only `/` and `/index.html` assets, which means that dynamically loaded routes or API responses will fail if the user is offline.

---

### `src/main.jsx`

**Type:** Config

**Purpose:**
The entry point of the React runtime. It instantiates the TanStack React Query client, embeds the tree inside the query provider, renders the `<App />` layout shell inside a React StrictMode wrapper, and registers the service worker (`/sw.js`) if supported.

**What it exports:**
- N/A (Renders application side-effectually)

**Used by:**
- Vite bundler (via `index.html`)

**Gotchas / known issues / things to be aware of:**
- StrictMode causes component mounts and effects to fire twice in development, which is expected behavior but worth noting during state debugging.

---

### `src/App.jsx`

**Type:** Component

**Purpose:**
Functions as the root React layout shell component. It wraps the app routes inside context providers (Favorites, Watchlist, Theme), handles page routes via React Router's `<BrowserRouter>`, imports components (Navbar, NetworkStatusBanner), and implements lazy-loading of pages with a fallback loader.

**What it exports:**
- `default export App` — Root React component

**Connects to / depends on:**
- `FavoritesProvider` from `src/context/FavoritesContext.jsx` — provides favorites management
- `WatchlistProvider` from `src/context/WatchlistContext.jsx` — provides watchlist management
- `ThemeProvider` from `src/context/ThemeContext.jsx` — provides theme management
- `Loader` from `src/components/Loader.jsx` — fallback UI during lazy route imports
- `Navbar` from `src/components/Navbar.jsx` — navigation bar component
- `ErrorBoundary` from `src/components/ErrorBoundary.jsx` — catches unhandled page render errors
- `NetworkStatusBanner` from `src/components/NetworkStatusBanner.jsx` — informs user of connectivity status

**Used by:**
- `src/main.jsx` — imported and rendered inside the DOM container

**Gotchas / known issues / things to be aware of:**
- Uses the HTML standard `#main` skip-link targeting keyboard navigation accessibility, which is styled to hide offscreen and only show when focused.

---

### `src/App.css`

**Type:** Component

**Purpose:**
Contains localized CSS configurations for layout animations, counters, documentation navigation link alignments, and custom 3D rotation animations for logos.

**What it exports:**
- N/A (Imports directly into JS files)

**Used by:**
- `src/App.jsx` (via `src/main.jsx` importing global assets)

**Gotchas / known issues / things to be aware of:**
- Includes nested CSS classes (e.g. `&:hover`), which requires a post-processor or native nesting support in the browser.

---

### `src/index.css`

**Type:** Component

**Purpose:**
Main design system stylesheet. It sets up root CSS variables for theme tokens (colors, borders, fonts, fluid sizes, shadows), declares dark theme overrides for both media preferences and manually toggled classes, and standardizes button elements, grids, overlays, loaders, skeleton layouts, and modal boxes.

**What it exports:**
- N/A (Global stylesheet)

**Used by:**
- `src/main.jsx`

**Gotchas / known issues / things to be aware of:**
- It is a large stylesheet containing various legacy layout properties (e.g. `.ticks`, `#spacer`, etc.) that are not explicitly used in the active application screens.

---

### `src/setupTests.js`

**Type:** Test

**Purpose:**
Initializes mocks for the test environment. It sets up a mock wrapper for `global.fetch` to ensure test assertions on page components dependent on TMDB request results do not execute actual network queries.

**What it exports:**
- N/A (Test setup runner script)

**Used by:**
- Jest (via `jest.config.cjs`)

**Gotchas / known issues / things to be aware of:**
- `fetch.mockClear()` is called before each test to clean calls, which is necessary since the fetch mock returns a resolved blank promise by default.

---

### `src/services/tmdb.js`

**Type:** Utility

**Purpose:**
Encapsulates all communications with the TMDB v3 endpoints. It sets up an Axios instance with preconfigured base URLs, language options, and API key query parameters, and exports functions for retrieving popular, top-rated, upcoming, and discoverable movies.

**What it exports:**
- `IMAGE_BASE_URL` (string) — TMDB image CDN prefix
- `posterUrl(path, size)` (function) — builds full poster path urls
- `backdropUrl(path, size)` (function) — builds full backdrop background urls
- `getTrendingMovies(page)` (function) — GET trending list
- `getPopularMovies(page)` (function) — GET popular list
- `getTopRatedMovies(page)` (function) — GET top rated list
- `getUpcomingMovies(page)` (function) — GET upcoming list
- `searchMovies(query, page)` (function) — GET search results
- `getMovieDetails(id)` (function) — GET specific details for a movie (appended with videos)
- `getMovieCredits(id)` (function) — GET cast credit lists
- `getSimilarMovies(id, page)` (function) — GET similar movies list
- `getDiscoverMovies(page, filter)` (function) — GET discover query results matching search/rating criteria

**Connects to / depends on:**
- Axios package

**Used by:**
- `src/components/MovieCard.jsx`
- `src/pages/HomePage.jsx`
- `src/pages/MovieDetailsPage.jsx`
- `src/pages/SearchPage.jsx`

**Gotchas / known issues / things to be aware of:**
- Axios errors are captured in a helper `fetchData` function, extracting `error?.response?.data?.status_message` if available.

---

### `src/components/CastCard.jsx`

**Type:** Component

**Purpose:**
Renders a simple UI card representing an actor's name and character role inside movie detail screens.

**What it exports:**
- `default export CastCard` — React component rendering cast details

**Props / Parameters:**
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `actor` | object | Yes | — | Object containing `name` and `character` fields |

**Used by:**
- `src/pages/MovieDetailsPage.jsx`

**Gotchas / known issues / things to be aware of:**
- Does not render headshot profile images (only textual names are displayed), which is a limitation of the design.

---

### `src/components/ErrorBoundary.jsx`

**Type:** Component

**Purpose:**
React class component that catches JavaScript errors anywhere in the child component tree, logging them, preventing the UI from crashing, and rendering a fallback error message screen with a reset button callback.

**What it exports:**
- `default export ErrorBoundary` — React Component subclass

**Props / Parameters:**
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | node | Yes | — | React nodes wrapped by the boundary |

**State:**
- `hasError` (boolean) — Flag stating if an error is present
- `error` (Error object) — The caught error

**Key functions / methods inside this file:**
- `reset()` — resets the error state back to false, triggering a re-render of children.

**Used by:**
- `src/App.jsx`

**Gotchas / known issues / things to be aware of:**
- React Error Boundaries must be class components as hook equivalents do not exist natively.

---

### `src/components/ErrorMessage.jsx`

**Type:** Component

**Purpose:**
Represents a stylized container block notifying the user of errors. It displays an error title, message body, and optionally renders a retry button if a callback prop is passed.

**What it exports:**
- `default export ErrorMessage` — React functional component

**Props / Parameters:**
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | string | No | `'Something went wrong'` | Title message of error card |
| `message` | string | No | — | Description of the error |
| `retry` | function | No | — | Click action handler callback |

**Used by:**
- `src/components/ErrorBoundary.jsx`
- `src/pages/MovieDetailsPage.jsx`
- `src/pages/SearchPage.jsx`
- `src/pages/WatchlistPage.jsx`

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `src/components/FavoriteButton.jsx`

**Type:** Component

**Purpose:**
Renders an interactive button containing a heart vector graphic that indicates whether a movie is saved as a favorite. It toggles active CSS states and fires click handlers.

**What it exports:**
- `default export FavoriteButton` — React functional component

**Props / Parameters:**
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `active` | boolean | No | `false` | True changes heart color to purple |
| `onClick` | function | Yes | — | Triggers click action updates |
| `ariaLabel` | string | No | `'Favorite'` | Accessible description |

**Used by:**
- `src/components/MovieCard.jsx`

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `src/components/Loader.jsx`

**Type:** Component

**Purpose:**
Renders a loading screen with a spinner animation and loading message.

**What it exports:**
- `default export Loader` — React functional component

**Props / Parameters:**
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `message` | string | No | `'Loading…'` | Text displayed next to loading spinner |

**Used by:**
- `src/App.jsx`
- `src/pages/MovieDetailsPage.jsx`
- `src/pages/SearchPage.jsx`

**Gotchas / known issues / things to be aware of:**
- Utilizes CSS keyframe animations defined in `src/index.css`.

---

### `src/components/MovieCard.jsx`

**Type:** Component

**Purpose:**
Displays summary details of a single movie (poster image, title, release year, rating badge) and provides a nested link to detail routes. It also renders the `FavoriteButton` overlay if a toggle action callback is supplied.

**What it exports:**
- `default export React.memo(MovieCard)` — Optimized, memoized movie card component

**Props / Parameters:**
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `movie` | object | Yes | — | Movie data schema object |
| `isFavorite` | boolean | No | — | Toggle state of favorite heart |
| `onToggleFavorite` | function | No | — | Handler to add/remove favorites |

**Used by:**
- `src/pages/FavoritesPage.jsx`
- `src/pages/HomePage.jsx`
- `src/pages/MovieDetailsPage.jsx`
- `src/pages/SearchPage.jsx`

**Gotchas / known issues / things to be aware of:**
- If `release_date` is undefined, the card falls back to displaying `'N/A'`.

---

### `src/components/Navbar.jsx`

**Type:** Component

**Purpose:**
Builds the header menu interface for desktop and mobile viewports. It handles user path transitions via `<NavLink>`, manages manual dark mode switches, and listens to client browser install prompts for PWA activation.

**What it exports:**
- `default export Navbar` — React navigation header

**State:**
- `open` (boolean) — Tracks mobile drawer navigation overlay state
- `scrolled` (boolean) — True when user scrolls past 10px, enabling shadow details
- `deferredPrompt` (BeforeInstallPromptEvent) — Stores browser PWA installation trigger event

**Side effects:**
- scroll listener: adds `scroll` event handler on mount to update scroll state. Cleans up on unmount.
- install listener: hooks onto `beforeinstallprompt` and `appinstalled` browser events to capture PWA setup prompts. Cleans up on unmount.

**Connects to / depends on:**
- `useTheme` from `src/context/ThemeContext.jsx` — reads/toggles dark mode theme state

**Used by:**
- `src/App.jsx`

**Gotchas / known issues / things to be aware of:**
- Double queries inside test environments can cause multiple matches for aria-labels unless queried via `getAllByLabelText`.

---

### `src/components/Navbar.css`

**Type:** Style

**Purpose:**
Defines styling rules for navigation grids, theme icons, mobile slide-out drawers, backdrop overlays, hover underlines, and breakpoint media queries.

**What it exports:**
- N/A (Style compilation stylesheet)

**Used by:**
- `src/components/Navbar.jsx`

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `src/components/NetworkStatusBanner.jsx`

**Type:** Component

**Purpose:**
Renders a top notification banner alerting the user when their internet connection drops offline or reconnects online.

**What it exports:**
- `default export NetworkStatusBanner` — React component

**State:**
- `online` (boolean) — Tracks connection status via `navigator.onLine`
- `visible` (boolean) — Controls visibility of connection alerts

**Side effects:**
- online/offline events: registers browser window handlers on mount. Triggers a 2.5-second automatic dismiss timer upon recovering network connection. Cleans up handlers on unmount.

**Used by:**
- `src/App.jsx`

**Gotchas / known issues / things to be aware of:**
- Relies on browser-native online/offline event events, which can occasionally trigger false positives in certain virtual environments.

---

### `src/components/Pagination.jsx`

**Type:** Component

**Purpose:**
Renders navigation controls to switch between pages of search or discovery results.

**What it exports:**
- `default export Pagination` — React navigation utility

**Props / Parameters:**
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `currentPage` | number | Yes | — | Current active page value |
| `totalPages` | number | Yes | — | Total pages available |
| `onChange` | function | Yes | — | Event handler executing page shifts |

**Used by:**
- `src/pages/HomePage.jsx`
- `src/pages/SearchPage.jsx`

**Gotchas / known issues / things to be aware of:**
- If `totalPages` is less than or equal to 1, the pagination component returns `null` to avoid rendering empty buttons.

---

### `src/components/SearchBar.jsx`

**Type:** Component

**Purpose:**
Encapsulates an accessible input text box with standard search labels to query movie titles.

**What it exports:**
- `default export SearchBar` — React functional component

**Props / Parameters:**
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | string | Yes | — | Search input value |
| `onChange` | function | Yes | — | Inputs value shift event handler callback |
| `placeholder` | string | No | `'Search movies'` | Input placeholder text |

**Used by:**
- `src/pages/SearchPage.jsx`

**Gotchas / known issues / things to be aware of:**
- Uses a `<label>` wrapping container containing a hidden label span for screen reader accessibility.

---

### `src/components/SkeletonCard.jsx`

**Type:** Component

**Purpose:**
Renders a structural layout outline representing an loading movie card item, establishing animated loading state visual cues.

**What it exports:**
- `default export SkeletonCard` — React loading skeleton card

**Used by:**
- `src/pages/HomePage.jsx`
- `src/pages/SearchPage.jsx`

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `src/components/TrailerModal.jsx`

**Type:** Component

**Purpose:**
Provides an overlay popup containing a YouTube iframe player to play movie trailers. It locks body scrolls and captures escape keys for key controls.

**What it exports:**
- `default export TrailerModal` — React overlay dialog component

**Props / Parameters:**
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | boolean | Yes | — | Control flag determining dialog visibility |
| `onClose` | function | Yes | — | Reset callback executing dialog exit |
| `videoKey` | string | Yes | — | Target YouTube video stream token |

**Side effects:**
- keypress listener: registers a keyup event listener on the window when the modal is open. Listens for the Escape key to close the modal. Cleans up on unmount or when dependencies change.
- scroll lock: overrides `document.body.style.overflow` to `'hidden'` when open, locking body scrolls. Restores the previous scroll style on modal close or unmount.

**Used by:**
- `src/pages/MovieDetailsPage.jsx`

**Gotchas / known issues / things to be aware of:**
- The iframe includes an `autoplay=1` query parameter, which might be blocked by certain browser autoplay security policies unless muted.

---

### `src/pages/FavoritesPage.jsx`

**Type:** Page

**Purpose:**
Renders the Saved Favorites list, pulling data from `FavoritesContext`. It maps items to `MovieCard` components and handles removal actions.

**What it exports:**
- `default export FavoritesPage` — React component rendering favorites list

**Connects to / depends on:**
- `useFavorites` from `src/context/FavoritesContext.jsx` — reads saved items and removal actions
- `MovieCard` from `src/components/MovieCard.jsx` — renders movie summary card

**Used by:**
- `src/App.jsx` (lazy-loaded routing definition)

**Gotchas / known issues / things to be aware of:**
- Renders an empty state placeholder if no favorites are saved in localStorage.

---

### `src/pages/HomePage.jsx`

**Type:** Page

**Purpose:**
Serves as the default entry view. It fetches movie grids using queries from custom hooks and exposes filter dropdowns (sorting, rating limits, release years) and pagination controls.

**What it exports:**
- `default export HomePage` — Home dashboard page component

**State:**
- `page` (number) — Current page number
- `sortBy` (string) — Sort query selection value (`popularity`, `rating`, `release_date`)
- `minRating` (number) — Minimum average vote filter value (0 to 10)
- `year` (string) — Release year filter selection value

**API calls made:**
- Runs `getDiscoverMovies(page, { sortBy, minRating, year })` automatically via hooks.
- On success: updates state, renders movie list.
- On failure: renders error banner.

**Connects to / depends on:**
- `getDiscoverMovies` from `src/services/tmdb.js` — queries movie databases
- `useFavorites` from `src/context/FavoritesContext.jsx` — matches favorite visual states
- `useMovieFetch` from `src/hooks/useMovieFetch.js` — manages loading states and data fetching
- `MovieCard` from `src/components/MovieCard.jsx` — renders movie cards
- `SkeletonCard` from `src/components/SkeletonCard.jsx` — renders skeleton loaders
- `ErrorMessage` from `src/components/ErrorMessage.jsx` — renders error message card
- `Pagination` from `src/components/Pagination.jsx` — handles pagination controls

**Used by:**
- `src/App.jsx` (lazy-loaded routing definition)

**Gotchas / known issues / things to be aware of:**
- The filter values are hardcoded in the select fields (e.g. years from 2026 down to 1900), which requires manual maintenance over time.

---

### `src/pages/MovieDetailsPage.jsx`

**Type:** Page

**Purpose:**
Renders detail specifications for a selected movie ID parsed from URL route parameters. It displays large backdrop headers, handles cast credits lists, fetches similar recommendations, and opens trailer modals.

**What it exports:**
- `default export MovieDetailsPage` — Details screen functional page component

**State:**
- `movie` (object) — Target movie detail payload
- `credits` (object) — Movie cast credits list payload
- `similar` (object) — Similar movies recommendation list payload
- `loading` (boolean) — Loading state flag
- `error` (Error object) — Axios query error object
- `showTrailer` (boolean) — Control flag for trailer modal popup

**Side effects:**
- API data query: fetches details, credits, and similar movies concurrently using `Promise.all` when the movie `id` URL parameter changes. Includes an active cleanup flag to prevent state updates if the component unmounts before requests complete.

**Connects to / depends on:**
- `useFavorites` from `src/context/FavoritesContext.jsx` — matches favorite status
- `useWatchlist` from `src/context/WatchlistContext.jsx` — matches watchlist status
- `getMovieDetails`, `getMovieCredits`, `getSimilarMovies` from `src/services/tmdb.js` — fetches movie data
- `CastCard` from `src/components/CastCard.jsx` — renders cast members
- `TrailerModal` from `src/components/TrailerModal.jsx` — displays trailer videos

**Used by:**
- `src/App.jsx` (lazy-loaded routing definition)

**Gotchas / known issues / things to be aware of:**
- When an error occurs loading details, the retry button refreshes the entire page (`window.location.reload()`) instead of retrying the API call in-state.

---

### `src/pages/NotFoundPage.jsx`

**Type:** Page

**Purpose:**
Fallback route page rendered when a user navigates to an unregistered path.

**What it exports:**
- `default export NotFoundPage` — Simple React error screen component

**Used by:**
- `src/App.jsx` (lazy-loaded wildcard routing definition)

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `src/pages/SearchPage.jsx`

**Type:** Page

**Purpose:**
Manages movie searching interface. It coordinates search inputs, debounces typing queries, performs search request calls, handles pagination shifts, and presents result lists.

**What it exports:**
- `default export SearchPage` — Search page component

**State:**
- `query` (string) — Live search input text value
- `page` (number) — Active search pagination index
- `result` (object) — Search output payload (results array, page totals)
- `loading` (boolean) — Loading state flag
- `error` (Error object) — Query error object
- `validationError` (string) — Search validation feedback message

**Side effects:**
- query trigger: performs a search request when the debounced query value or page changes. If the query is empty or too short (< 2 characters), it resets states without calling the API.
- page reset: resets the pagination page to 1 when the query changes.

**Connects to / depends on:**
- `searchMovies` from `src/services/tmdb.js` — queries search endpoints
- `useDebounce` from `src/hooks/useDebounce.js` — limits search query frequency

**Used by:**
- `src/App.jsx` (lazy-loaded routing definition)

**Gotchas / known issues / things to be aware of:**
- Has a built-in search validation limit requiring at least 2 characters before executing queries to prevent empty/noisy search calls.

---

### `src/pages/WatchlistPage.jsx`

**Type:** Page

**Purpose:**
Renders the user's Watchlist page, displaying saved movies and allowing removal actions.

**What it exports:**
- `default export WatchlistPage` — Watchlist manager page component

**Connects to / depends on:**
- `useWatchlist` from `src/context/WatchlistContext.jsx` — reads watchlist context states and executes deletion callbacks

**Used by:**
- `src/App.jsx` (lazy-loaded routing definition)

**Gotchas / known issues / things to be aware of:**
- **Bug identified**: The card poster image path on line 19 is hardcoded as `m.poster_path ? "/" : "/fallback-poster.jpg"`, which renders a broken icon link `/` instead of pulling from TMDB poster URLs via `posterUrl(m.poster_path)`.
- It duplicates the movie card markup instead of importing the standard `MovieCard` component, which violates the DRY (Don't Repeat Yourself) principle.

---

### `src/hooks/useDebounce.js`

**Type:** Hook

**Purpose:**
Provides a value wrapper that delays updating the state until a specified timeout duration (default 400ms) has elapsed since the last change.

**What it exports:**
- `default export useDebounce` — custom React hook function

**Props / Parameters:**
- `value` (any) — Input target value to track
- `delay` (number) — Timeout delay in milliseconds

**Side effects:**
- sets a window timeout inside an effect. Clears the timeout handler on dependency updates or unmount.

**Used by:**
- `src/pages/SearchPage.jsx`

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `src/hooks/useLocalStorage.js`

**Type:** Hook

**Purpose:**
Synchronizes a state variable with localStorage, reading the value on mount and writing to localStorage whenever the state changes.

**What it exports:**
- `default export useLocalStorage` — Custom React state sync hook

**Props / Parameters:**
- `key` (string) — Local storage database key
- `initialValue` (any) — Fallback default state

**Used by:**
- `src/context/ThemeContext.jsx`

**Gotchas / known issues / things to be aware of:**
- Errors inside localStorage accesses are silently swallowed in catch blocks.

---

### `src/hooks/useMovieFetch.js`

**Type:** Hook

**Purpose:**
Custom wrapper around TanStack React Query's `useQuery`. It defines a query key structured as `['movie', ...keyParts]` and passes custom query parameters (e.g. staleTime, retries) to fetch data.

**What it exports:**
- `default export useMovieFetch` — Custom React query wrapper hook

**Props / Parameters:**
- `keyParts` (array/string) — Unique identifier strings added to query keys
- `fetcher` (function) — Axios API fetching method
- `options` (object) — Configuration options (staleTime, retry, onError, enabled)

**Returns:**
- Object containing `data`, `isLoading`, `isFetching`, `error`, and `refetch` fields.

**Used by:**
- `src/pages/HomePage.jsx`

**Gotchas / known issues / things to be aware of:**
- Stale time defaults to 5 minutes (`1000 * 60 * 5`) unless overridden in the options object.

---

### `src/hooks/useMovies.js`

**Type:** Hook

**Purpose:**
A query wrapper hook that executes `useQuery` under the `['movies', ...dependencies]` query key.

**What it exports:**
- `useMovies` (named function) — Custom hook querying movie records

**Props / Parameters:**
- `fetcher` (function) — Target query promise fetch action
- `dependencies` (array) — Variables trigger list added to query keys

**Returns:**
- Object containing `data`, `loading` (boolean), and `error` fields.

**Used by:**
- N/A (Not active in the current implementation screens, but available as a utility hook)

**Gotchas / known issues / things to be aware of:**
- Configured with `keepPreviousData: true`, which is deprecated in newer versions of TanStack Query (v5) in favor of the `placeholderData: keepPreviousData` option.

---

### `src/context/FavoritesContext.jsx`

**Type:** Context

**Purpose:**
Initializes and provides state for the user's favorite movies list. It loads initial values from localStorage on mount and updates localStorage when the list changes.

**What it exports:**
- `FavoritesProvider({ children })` (component) — context provider component
- `useFavorites()` (function) — custom hook consuming favorites context

**State:**
- `favorites` (array) — Saved favorite movie objects

**Side effects:**
- on mount: reads and parses favorites list from localStorage.
- on change: saves updated favorites lists back to localStorage.

**Used by:**
- `src/App.jsx` (wrapping provider)
- `src/pages/FavoritesPage.jsx`
- `src/pages/MovieDetailsPage.jsx`
- `src/components/MovieCard.jsx`

**Gotchas / known issues / things to be aware of:**
- Throws an error if `useFavorites` is used outside of a `FavoritesProvider`.

---

### `src/context/ThemeContext.jsx`

**Type:** Context

**Purpose:**
Coordinates theme management. It reads initial theme selections (dark/light), checks system theme preferences using `window.matchMedia` if localStorage is empty, updates root document classes (`html.theme-dark`), and persists selections in localStorage.

**What it exports:**
- `ThemeProvider({ children })` (component) — Theme context provider component
- `useTheme()` (function) — Hook to consume theme context

**State:**
- `theme` (string) — Active theme selection (`dark` or `light`)

**Side effects:**
- initialization: checks system media parameters or localStorage to set initial state.
- updates class list: syncs theme state changes to document html tags class list.

**Used by:**
- `src/App.jsx`
- `src/components/Navbar.jsx`
- `src/__tests__/ThemeContext.test.jsx`

**Gotchas / known issues / things to be aware of:**
- LocalStorage errors during set/get operations are caught and handled gracefully (e.g. in environments with storage restrictions).

---

### `src/context/WatchlistContext.jsx`

**Type:** Context

**Purpose:**
Initializes and provides state for the user's movie Watchlist. It loads initial values from localStorage on mount and updates localStorage when the list changes.

**What it exports:**
- `WatchlistProvider({ children })` (component) — Watchlist context provider
- `useWatchlist()` (function) — Hook to consume watchlist context

**State:**
- `watchlist` (array) — Saved movie watchlist objects

**Side effects:**
- on mount: loads watchlist array from localStorage.
- on change: saves watchlist updates to localStorage.

**Used by:**
- `src/App.jsx`
- `src/pages/MovieDetailsPage.jsx`
- `src/pages/WatchlistPage.jsx`

**Gotchas / known issues / things to be aware of:**
- Throws an error if `useWatchlist` is used outside of a `WatchlistProvider`.

---

### `src/utils/formatDate.js`

**Type:** Utility

**Purpose:**
Converts database ISO date strings into user-friendly localized date formats (e.g. `'Jan 1, 2020'`).

**What it exports:**
- `default export formatDate` — Formatting helper function

**Props / Parameters:**
- `dateString` (string) — ISO formatted date string (e.g. `'2020-01-01'`)

**Returns:**
- Formatted date string, or `'Unknown'` if input is invalid.

**Used by:**
- `src/pages/MovieDetailsPage.jsx`

**Gotchas / known issues / things to be aware of:**
- Relies on `toLocaleDateString` default configurations, which means the output format can vary depending on the client browser locale.

---

### `src/utils/formatRating.js`

**Type:** Utility

**Purpose:**
Helper utility formatting movie score rating numbers into decimal values rounded to one decimal place, appending a `/10` suffix.

**What it exports:**
- `default export formatRating` — score rating formatter function

**Props / Parameters:**
- `rating` (number) — Movie score rating value

**Returns:**
- Formatted string representation (e.g. `'7.5/10'`), or `'—'` if input rating is empty.

**Used by:**
- `src/components/MovieCard.jsx`
- `src/pages/MovieDetailsPage.jsx`

**Gotchas / known issues / things to be aware of:**
- If rating value matches 0, it formats the result as `'0.0/10'`.

---

### `src/__mocks__/fileMock.js`

**Type:** Mock

**Purpose:**
Dry file mock export returning an empty object configuration during Jest runs, preventing Jest from throwing parse errors on static asset imports (e.g. `.png`, `.svg`).

**What it exports:**
- `module.exports` — Empty object configuration

**Used by:**
- Jest (via `moduleNameMapper` configuration)

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `src/__mocks__/styleMock.js`

**Type:** Mock

**Purpose:**
Dry mock export returning an empty object configuration during Jest runs, preventing Jest from throwing parse errors on stylesheet imports.

**What it exports:**
- `module.exports` — Empty object configuration

**Used by:**
- Jest (via `moduleNameMapper` configuration)

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `__mocks__/tmdb.js`

**Type:** Mock

**Purpose:**
Provides mocked implementations of the TMDB services API requests, resolving promises with mock response payloads to facilitate testing without making actual network requests.

**What it exports:**
- `posterUrl`, `backdropUrl` mock methods returning blank or null strings.
- Mocked versions of `getTrendingMovies`, `getPopularMovies`, `getTopRatedMovies`, `getUpcomingMovies`, `searchMovies`, `getMovieDetails`, `getMovieCredits`, and `getSimilarMovies`.

**Used by:**
- Jest (via `jest.config.cjs` mapping configurations)

**Gotchas / known issues / things to be aware of:**
- Resolves search methods with empty result lists by default, which can be overridden inside specific test suites using custom spy mocks.

---

### `src/__tests__/ErrorMessage.test.jsx`

**Type:** Test

**Purpose:**
Verifies that the `ErrorMessage` component renders correctly with both default and custom titles and descriptions, and that the retry callback function is called when the retry button is clicked.

**What it exports:**
- N/A (Executes tests)

**Used by:**
- Jest test runner

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `src/__tests__/FavoriteButton.test.jsx`

**Type:** Test

**Purpose:**
Verifies that the `FavoriteButton` renders correctly under different active status configurations, and checks that custom aria-labels and click actions trigger their respective handlers.

**What it exports:**
- N/A (Executes tests)

**Used by:**
- Jest test runner

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `src/__tests__/HomePage.test.jsx`

**Type:** Test

**Purpose:**
Tests the rendering and layout of the `HomePage` component. It renders the component wrapped in required query, theme, and router context providers, and tests filter selectors and data fetching behaviors.

**What it exports:**
- N/A (Executes tests)

**Used by:**
- Jest test runner

**Gotchas / known issues / things to be aware of:**
- Requires custom TMDB service mocks to prevent the test runner from attempting to query actual movie databases.

---

### `src/__tests__/Loader.test.jsx`

**Type:** Test

**Purpose:**
Tests that the `Loader` component renders correctly, fallback loading messages are set, and accessibility attributes (e.g. role status) are configured.

**What it exports:**
- N/A (Executes tests)

**Used by:**
- Jest test runner

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `src/__tests__/Navbar.test.jsx`

**Type:** Test

**Purpose:**
Tests the rendering of the `Navbar` component, asserting that logo components and watchlist links are displayed on screen.

**What it exports:**
- N/A (Executes tests)

**Used by:**
- Jest test runner

**Gotchas / known issues / things to be aware of:**
- Relies on `getAllByLabelText` because of duplicate navigation items in mobile and desktop layouts.

---

### `src/__tests__/ThemeContext.test.jsx`

**Type:** Test

**Purpose:**
Tests the initialization, state changes, and error handling of `ThemeContext`, verifying localStorage synchronization and system media query overrides.

**What it exports:**
- N/A (Executes tests)

**Used by:**
- Jest test runner

**Gotchas / known issues / things to be aware of:**
- Mocks `window.matchMedia` and spies on `Storage.prototype` functions to test theme changes in a JSDOM environment.

---

### `src/__tests__/formatRating.test.js`

**Type:** Test

**Purpose:**
Tests the rating formatting utility, verifying that ratings are formatted correctly and that null/undefined values are handled gracefully.

**What it exports:**
- N/A (Executes tests)

**Used by:**
- Jest test runner

**Gotchas / known issues / things to be aware of:**
- None identified.

---

### `src/__tests__/useDebounce.test.jsx`

**Type:** Test

**Purpose:**
Tests the `useDebounce` hook using a mock test component and timer delays, verifying that state changes are delayed correctly.

**What it exports:**
- N/A (Executes tests)

**Used by:**
- Jest test runner

**Gotchas / known issues / things to be aware of:**
- Uses real timers with a short delay (50ms) and standard testing-library `waitFor` helpers to avoid issues with fake timers.

---

### `src/components/__tests__/MovieCard.test.jsx`

**Type:** Test

**Purpose:**
Tests the `MovieCard` component, verifying that movie title, year, and rating badges render correctly, and that the fallback poster image is used if `poster_path` is null.

**What it exports:**
- N/A (Executes tests)

**Used by:**
- Jest test runner

**Gotchas / known issues / things to be aware of:**
- Relies on wrapping components in `MemoryRouter` since the card uses router Link elements.

---

## SECTION 5: Data Flow

### 5A — App Startup Flow
When a user opens the application, the browser loads `index.html`, which references the entry script `src/main.jsx`. Upon execution, `main.jsx` initializes a new TanStack Query client, wraps the application root inside `QueryClientProvider`, and renders the `<App />` component inside React's StrictMode. As `App.jsx` mounts, it initializes context providers (`FavoritesProvider`, `WatchlistProvider`, `ThemeProvider`) and sets up router handlers. On render, the application shell displaying the `Navbar` and `NetworkStatusBanner` is drawn, and the router renders the `HomePage` component lazy-loaded under `<Suspense>` loaders. If a PWA service worker is supported by the client browser, `main.jsx` registers the service worker (`/sw.js`) to handle asset caching.

### 5B — Movie Data Fetch Flow
When the `HomePage` mounts, the component triggers a data fetch using the `useMovieFetch` query hook, which calls `getDiscoverMovies` from the TMDB service layer. The hook sends an Axios HTTP GET request to TMDB's `/discover/movie` endpoint with the active page index, sort criteria, minimum ratings, and release year filters as query parameters. While the request is pending, the hook returns `isLoading: true` and the homepage renders a grid of `SkeletonCard` elements. Once the API returns a response, TanStack Query updates its cache, updates the hook's state with the movie list, and the component re-renders to display the movies in a grid of `MovieCard` components.

### 5C — Search Flow
When a user types into the search box on the `SearchPage`, the input element's `onChange` handler updates the local `query` state. The search page passes this value to the `useDebounce` custom hook, which uses a 450ms timeout to delay updating the `debouncedQuery` state until the user stops typing. Once `debouncedQuery` updates (and passes validation checks, requiring a minimum of 2 characters), a `useEffect` trigger executes `searchMovies` from the TMDB service layer. While loading, `SkeletonCard` lists are rendered. When the search results arrive from the API, the page state updates to display the matched movies and resets the pagination index to 1.

### 5D — Movie Detail Flow
When a user clicks on a `MovieCard` link, the router navigates to the `/movie/:id` path. React Router's `useParams` hook reads the movie `id` parameter, and a `useEffect` inside `MovieDetailsPage` triggers concurrent calls to the TMDB API (`getMovieDetails`, `getMovieCredits`, and `getSimilarMovies`) using `Promise.all`. The page renders a loading spinner until all requests resolve. If the movie ID is invalid or the API returns an error, the catch block updates the error state and renders the `ErrorMessage` component. Once the requests resolve successfully, the page updates its state and renders the movie backdrop hero section, cast list, recommendation grid, and trailer toggle button.

### 5E — Favorites / Watchlist Flow
When a user clicks the favorite heart button on a `MovieCard`, it triggers the provider's `addFavorite` or `removeFavorite` callback from `FavoritesContext`. The context updates its internal `favorites` state array, which triggers a `useEffect` to serialize and write the updated list back to localStorage. Similarly, clicking the watchlist button on the movie details page calls context actions that update `WatchlistContext` state and persist changes to localStorage. Since these lists are stored in global React Contexts, any changes are reflected immediately across the app (e.g. updating the active status of favorite buttons and badge counts in the navbar).

### 5F — Theme (Dark/Light Mode) Flow
When a user toggles the theme switch, it calls the `toggle` method provided by `ThemeContext`. The context updates its internal `theme` state (switching between `dark` and `light`) and persists the selection in localStorage using the `useLocalStorage` hook. A `useEffect` in the context provider listens for changes to the `theme` state and updates the root `<html>` element's class list (adding `theme-dark` for dark mode or removing it for light mode). This class change triggers the global CSS variables defined in `src/index.css` to update colors across all components.

---

## SECTION 6: API Reference

All data is fetched from **The Movie Database (TMDB) v3 API**.

| Endpoint | Method | Called From | Purpose | Key Response Fields Used |
|:---|:---|:---|:---|:---|
| `/trending/movie/week` | GET | `tmdb.js` | Retrieves trending movies | `results`, `total_pages` |
| `/movie/popular` | GET | `tmdb.js` | Retrieves popular movies | `results`, `total_pages` |
| `/movie/top_rated` | GET | `tmdb.js` | Retrieves top rated movies | `results`, `total_pages` |
| `/movie/upcoming` | GET | `tmdb.js` | Retrieves upcoming movies | `results`, `total_pages` |
| `/search/movie` | GET | `tmdb.js` | Searches movies by title | `results`, `total_pages`, `id`, `title`, `poster_path`, `vote_average`, `release_date` |
| `/movie/{id}` | GET | `tmdb.js` | Retrieves detailed movie info | `backdrop_path`, `poster_path`, `title`, `release_date`, `runtime`, `vote_average`, `genres`, `overview`, `videos` |
| `/movie/{id}/credits` | GET | `tmdb.js` | Retrieves movie cast lists | `cast` (`name`, `character`, `cast_id`, `id`) |
| `/movie/{id}/similar` | GET | `tmdb.js` | Retrieves similar movies | `results` |
| `/discover/movie` | GET | `tmdb.js` | Searches movies with filters | `results`, `total_pages` |

### API Integration Specifications

- **API Key Storage**: The API key is stored in the `VITE_TMDB_API_KEY` environment variable.
- **API Key Inclusion**: Included in requests as a query parameter (`api_key`) via custom Axios interceptors.
- **Base Request URL**: `https://api.themoviedb.org/3`
- **Asset Image CDN URL**: `https://image.tmdb.org/t/p`
  - Poster size parameter: `/w342` (yielding `https://image.tmdb.org/t/p/w342/...`)
  - Backdrop size parameter: `/w780` (yielding `https://image.tmdb.org/t/p/w780/...`)
- **Rate Limiting Considerations**: Rate limits are handled by TMDB. If client requests exceed limits, Axios catches the `429 Too Many Requests` error and passes the status message to the `ErrorMessage` component.

---

## SECTION 7: State Management

### 7A — Local Component State (`useState`)
- `Navbar.jsx`:
  - `open` (boolean): Controls mobile navigation drawer open states.
  - `scrolled` (boolean): Toggles class lists based on scroll offsets.
  - `deferredPrompt` (BeforeInstallPromptEvent): Stores browser PWA installation triggers.
- `NetworkStatusBanner.jsx`:
  - `online` (boolean): Tracks browser connection status.
  - `visible` (boolean): Controls warning banner display.
- `HomePage.jsx`:
  - `page` (number): Controls current page query offsets.
  - `sortBy` (string): Controls active sorting options.
  - `minRating` (number): Controls minimum rating requirements.
  - `year` (string): Controls release year filters.
- `MovieDetailsPage.jsx`:
  - `movie`, `credits`, `similar` (objects): Store retrieved TMDB API payloads.
  - `loading` (boolean): Controls visibility of page spinners.
  - `error` (Error object): Stores API errors.
  - `showTrailer` (boolean): Toggles trailer overlay modals.
- `SearchPage.jsx`:
  - `query` (string): Stores current search input values.
  - `page` (number): Tracks pagination indexes.
  - `result` (object): Stores search results payload.
  - `loading` (boolean): Toggles skeleton loading cards.
  - `error` (Error): Stores API query errors.
  - `validationError` (string): Stores validation error messages.

### 7B — Context (`useContext`)
- **FavoritesContext**: Manages saved favorite movies. Provides `favorites` array, `addFavorite`, `removeFavorite`, and `isFavorite` helpers. Consumed by `FavoritesPage`, `MovieCard`, and `MovieDetailsPage`.
- **WatchlistContext**: Manages the user's movie watchlist. Provides `watchlist` array, `addWatch`, `removeWatch`, and `isInWatchlist` helpers. Consumed by `WatchlistPage` and `MovieDetailsPage`.
- **ThemeContext**: Manages the application's light/dark theme. Provides `theme` state and `toggle` method. Consumed by `App`, `Navbar`, and custom test suites.

### 7C — URL State
- **Route Parameters**: `MovieDetailsPage` reads `:id` parameters from paths matching `/movie/:id` to fetch details for the selected movie.
- **Search Paths**: Clicking search links redirects users to `/search` routes where search query and page states are managed locally.

### 7D — Persisted State (`localStorage`)
- **Theme Settings**: Saved under the key `movie-explorer-theme`. Read on context initialization; defaults to `'dark'` if empty.
- **Favorites List**: Saved under the key `movie-explorer-favorites` as a serialized JSON array. Read on mount and updated whenever favorites are added or removed.
- **Watchlist**: Saved under the key `movie-explorer-watchlist` as a serialized JSON array. Read on mount and updated when the watchlist changes.

---

## SECTION 8: Routing

The application uses client-side routing managed by `@react-navigation` wrappers and `react-router-dom`.

| Path | Component | Description | Protected? |
|:---|:---|:---|:---|
| `/` | `HomePage` | Displays the home page with discover filters. | No |
| `/search` | `SearchPage` | Displays the search bar and movie search results. | No |
| `/movie/:id` | `MovieDetailsPage` | Displays detailed movie info, cast, and trailer buttons. | No |
| `/favorites` | `FavoritesPage` | Displays the user's saved favorite movies. | No |
| `/watchlist` | `WatchlistPage` | Displays the user's movie watchlist. | No |
| `*` | `NotFoundPage` | Wildcard route displaying a 404 page. | No |

### Routing Infrastructure

- **Router Type**: Uses `<BrowserRouter>` for standard history routing on web platforms.
- **Setup Location**: Declared inside `src/App.jsx`.
- **404 Routing**: Unmatched routes are captured by a wildcard `*` route that renders the `NotFoundPage` component.
- **Lazy Loading**: Route pages are lazy-loaded using `React.lazy` and wrapped in a `<Suspense>` component that displays the `Loader` component while loading.

---

## SECTION 9: Custom Hooks

### `useDebounce`
- **File**: `src/hooks/useDebounce.js`
- **Purpose**: Delays updating a state value until a specified timeout has elapsed since the last update, reducing the number of API calls made while a user is typing.
- **Parameters**:
  - `value` (any): Input value to debounce.
  - `delay` (number): Debounce delay in milliseconds (defaults to 400ms).
- **Returns**: The debounced value state.
- **Example Usage**:
  ```jsx
  const debouncedQuery = useDebounce(query, 450);
  ```
- **Internal Behavior**: Sets up a timeout inside a `useEffect` that updates the debounced value state after the specified delay. If the input value changes before the delay completes, the cleanup function clears the timeout and starts a new one.

---

### `useLocalStorage`
- **File**: `src/hooks/useLocalStorage.js`
- **Purpose**: Syncs state changes with localStorage, loading the value on mount and writing to localStorage on changes.
- **Parameters**:
  - `key` (string): The key under which the value is stored.
  - `initialValue` (any): Fallback value if no key is found in localStorage.
- **Returns**: A stateful value and a function to update it, matching the signature of `useState`.
- **Example Usage**:
  ```jsx
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  ```
- **Internal Behavior**: Reads initial value from localStorage on mount. Updates state and localStorage inside a `useCallback` function whenever the value is updated.

---

### `useMovieFetch`
- **File**: `src/hooks/useMovieFetch.js`
- **Purpose**: Wraps TanStack Query's `useQuery` hook to manage loading, fetching, and error states for movie data.
- **Parameters**:
  - `keyParts` (array/string): Key parts to generate unique query keys.
  - `fetcher` (function): The API fetching promise.
  - `options` (object): Config options like staleTime, retries, etc.
- **Returns**: Object containing query state values:
  ```javascript
  { data, isLoading, isFetching, error, refetch }
  ```
- **Example Usage**:
  ```jsx
  const { data, isLoading, error } = useMovieFetch(['discover', sortBy], () => getDiscoverMovies(page, { sortBy }));
  ```

---

### `useMovies`
- **File**: `src/hooks/useMovies.js`
- **Purpose**: Simple query hook wrapping `useQuery` for movie fetching.
- **Parameters**:
  - `fetcher` (function): Promise executing request operations.
  - `dependencies` (array): Key dependency parts list.
- **Returns**: Object containing `data`, `loading` (boolean), and `error` fields.
- **Example Usage**:
  ```jsx
  const { data, loading, error } = useMovies(() => getPopularMovies(1), []);
  ```

---

## SECTION 10: Components Reference

Quick-reference compilation of every component in the codebase.

| Component | File | Props | Used On |
|:---|:---|:---|:---|
| **Navbar** | `src/components/Navbar.jsx` | None | `App.jsx` |
| **NetworkStatusBanner** | `src/components/NetworkStatusBanner.jsx` | None | `App.jsx` |
| **Loader** | `src/components/Loader.jsx` | `message` (string) | `App.jsx`, `MovieDetailsPage.jsx`, `SearchPage.jsx` |
| **ErrorBoundary** | `src/components/ErrorBoundary.jsx` | `children` (node) | `App.jsx` |
| **ErrorMessage** | `src/components/ErrorMessage.jsx` | `title` (string), `message` (string), `retry` (function) | `ErrorBoundary.jsx`, `MovieDetailsPage.jsx`, `SearchPage.jsx`, `WatchlistPage.jsx` |
| **MovieCard** | `src/components/MovieCard.jsx` | `movie` (object), `isFavorite` (boolean), `onToggleFavorite` (function) | `FavoritesPage.jsx`, `HomePage.jsx`, `MovieDetailsPage.jsx`, `SearchPage.jsx` |
| **FavoriteButton** | `src/components/FavoriteButton.jsx` | `active` (boolean), `onClick` (function), `ariaLabel` (string) | `MovieCard.jsx` |
| **CastCard** | `src/components/CastCard.jsx` | `actor` (object) | `MovieDetailsPage.jsx` |
| **TrailerModal** | `src/components/TrailerModal.jsx` | `open` (boolean), `onClose` (function), `videoKey` (string) | `MovieDetailsPage.jsx` |
| **Pagination** | `src/components/Pagination.jsx` | `currentPage` (number), `totalPages` (number), `onChange` (function) | `HomePage.jsx`, `SearchPage.jsx` |
| **SearchBar** | `src/components/SearchBar.jsx` | `value` (string), `onChange` (function), `placeholder` (string) | `SearchPage.jsx` |
| **SkeletonCard** | `src/components/SkeletonCard.jsx` | None | `HomePage.jsx`, `SearchPage.jsx` |

---

## SECTION 11: Testing

### 11A — Test Setup
- **Testing Libraries**: Uses **Jest** as the runner, combined with `@testing-library/react` and `@testing-library/jest-dom` for DOM assertions.
- **Global setup file (`setupTests.js`)**: Mocks the global `fetch` API to return a resolved blank promise with empty movie lists, preventing test suites from making network requests.
- **Asset Mocking**: Uses mock files (`styleMock.js` and `fileMock.js`) configured in `jest.config.cjs` to intercept CSS and static asset imports and prevent Jest from throwing syntax errors.

### 11B — Test Files Inventory

| Test File Path | Target Component/Utility | Test Cases (it / test blocks) | Status |
|:---|:---|:---|:---|
| `ErrorMessage.test.jsx` | `ErrorMessage` | - renders with default title<br>- renders custom title and message<br>- renders retry button and triggers callback when clicked | **PASS** |
| `FavoriteButton.test.jsx` | `FavoriteButton` | - renders without crashing<br>- renders inactive state by default<br>- renders active state when active prop is true<br>- calls onClick callback when clicked<br>- renders custom children and aria-label if provided | **PASS** |
| `HomePage.test.jsx` | `HomePage` | - renders the page heading and filter controls | **PASS** |
| `Loader.test.jsx` | `Loader` | - renders without crashing<br>- renders default message when no message is provided<br>- renders custom message when provided<br>- has correct role and aria attributes for accessibility | **PASS** |
| `Navbar.test.jsx` | `Navbar` | - renders logo and watchlist link | **PASS** |
| `ThemeContext.test.jsx` | `ThemeContext` | - throws an error when useTheme is used outside ThemeProvider<br>- defaults to dark theme when no localStorage is present<br>- uses theme from localStorage if valid<br>- falls back to prefers-color-scheme if window.matchMedia is available<br>- handles localStorage errors gracefully during initialization<br>- handles localStorage errors gracefully during setItem<br>- toggles theme when toggle function is called | **PASS** |
| `formatRating.test.js` | `formatRating` | - formats a normal rating to one decimal place out of 10<br>- handles a rating of 0<br>- handles null rating<br>- handles undefined rating<br>- handles a perfect 10 | **PASS** |
| `useDebounce.test.jsx` | `useDebounce` | - debounces value updates | **PASS** |
| `MovieCard.test.jsx` | `MovieCard` | - renders title and rating<br>- uses fallback poster when poster_path is null | **PASS** |

### 11C — Coverage Report Interpretation

The coverage metrics from the test output are:

```text
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   66.45 |       55 |   57.35 |   70.89 |                   
 components        |      60 |    64.91 |   51.85 |    65.9 |                   
  ErrorMessage.jsx |     100 |      100 |     100 |     100 |                   
  ...iteButton.jsx |     100 |      100 |     100 |     100 |                   
  Loader.jsx       |     100 |      100 |     100 |     100 |                   
  MovieCard.jsx    |      75 |       50 |      50 |      75 | 31                
  Navbar.jsx       |   54.76 |       50 |   42.85 |   61.11 | ...-35,78-136,169 
  SkeletonCard.jsx |     100 |      100 |     100 |     100 |                   
 context           |     100 |      100 |     100 |     100 |                   
  ThemeContext.jsx |     100 |      100 |     100 |     100 |                   
 hooks             |     100 |        0 |     100 |     100 |                   
  useDebounce.js   |     100 |        0 |     100 |     100 | 3                 
 pages             |   54.79 |    36.36 |   46.66 |      60 |                   
  HomePage.jsx     |   54.79 |    36.36 |   46.66 |      60 | ...57,180,203-235 
 utils             |     100 |      100 |     100 |     100 |                   
  formatRating.js  |     100 |      100 |     100 |     100 |                   
-------------------|---------|----------|---------|---------|-------------------
```

- **Uncovered lines in `Navbar.jsx`**: Lines 28-35 and 78-136 handle PWA installation prompts (`beforeinstallprompt` event listener and callbacks). These are difficult to trigger in a standard JSDOM test environment because browsers only fire these events under specific PWA criteria.
- **Uncovered lines in `HomePage.jsx`**: Lines 203-235 contain filter selection values (ratings and release years dropdown options) that are static lists.
- **Uncovered lines in `MovieCard.jsx`**: Line 31 contains favorite toggle actions that are only executed when custom buttons are clicked.

### 11D — How to Run Tests

```bash
# Run all tests
npm test

# Run tests with a coverage report
npm run test:coverage

# Run a specific test file
npx jest src/__tests__/Navbar.test.jsx

# Run tests in watch mode
npm run test:watch
```

---

## SECTION 12: Environment Variables

The application requires the following environment variables to fetch data from the TMDB API.

| Variable | Example Value | Required | Used In | Purpose |
|:---|:---|:---|:---|:---|
| `VITE_TMDB_API_KEY` | `8dc93bf234652f0d0827be0e34abe` | Yes | `tmdb.js` | Authenticates API requests with TMDB. |

### Environment Setup Instructions

1. Copy the template file to create a `.env` file in the root of the project:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and add your TMDB API key:
   ```text
   VITE_TMDB_API_KEY=your_api_key_here
   ```
3. To get a TMDB API key:
   - Register for an account at [themoviedb.org](https://www.themoviedb.org).
   - Navigate to your account settings and request an API key from the **API** tab.

---

## SECTION 13: How to Run Locally

Follow these step-by-step instructions to set up and run the project locally.

```bash
# 1. Clone the repository
git clone <repo-url>
cd movie-explorer

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit the .env file and add your VITE_TMDB_API_KEY

# 4. Start the development server
npm run dev
# The application runs at http://localhost:5173

# 5. Run tests
npm test

# 6. Build the application for production
npm run build

# 7. Preview the production build locally
npm run preview
```

---

## SECTION 14: Known Issues and Technical Debt

- **Broken Image Path Bug**: In `WatchlistPage.jsx` on line 19, the image source is hardcoded to render `/` instead of TMDB poster image URLs (`src={m.poster_path ? "/" : "/fallback-poster.jpg"}`), resulting in broken images for watchlist items.
- **Duplicate Code (Violating DRY)**: `WatchlistPage` duplicate the card layout markup instead of using the reusable `MovieCard` component.
- **Dependency Misplacement**: React Query is defined under `devDependencies` in `package.json` instead of production `dependencies`, which can cause build and runtime issues when deploying.
- **Hardcoded Years**: The filter options in `HomePage.jsx` include a hardcoded range of years (from 2026 down to 1900). This list should be generated dynamically to prevent outdated parameters over time.
- **Manual Reloads on Error**: The retry button on the movie details page reloads the entire browser window (`window.location.reload()`) instead of retrying the API call in state.
- **Missing PropTypes / TypeScript**: Component prop types are undocumented and not validated, which can lead to runtime errors when invalid data structures are passed down.

---

## SECTION 15: Glossary

- **TMDB**: The Movie Database, a popular community-built movie and TV database API used to fetch data for the application.
- **JSX**: JavaScript XML, an XML-like syntax extension for JavaScript used by React to describe UI structures.
- **Hook**: A special function in React that starts with "use" and allows state and other React features to be plugged into functional components.
- **Context**: A built-in feature in React that enables sharing state and data across the component tree without manually passing props down through every level.
- **PWA**: Progressive Web App, a web application that uses service workers, manifests, and caching to provide app-like installations, offline support, and speed.
- **Axios**: A promise-based HTTP client for the browser and Node.js used to fetch data from APIs.
- **React Query (TanStack Query)**: A data-fetching and state management library that handles caching, background updates, and loading states for server data in React apps.

---
*This documentation was generated by reading every file in the project. If you add new files or significantly change existing ones, regenerate this document.*
