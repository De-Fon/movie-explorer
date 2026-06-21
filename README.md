<div align="center">

# 🎬 Movie Explorer

A modern, responsive movie discovery app built with React and powered by the TMDB API.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-29%2F29_passing-brightgreen)]()
[![PWA](https://img.shields.io/badge/PWA-Installable-blueviolet?logo=pwa)]()

</div>

---

## ✨ Features

| Feature | Description |
|:---|:---|
| 🔍 **Smart Search** | Debounced search with real-time results from TMDB |
| 🎞️ **Discover & Filter** | Sort by popularity, rating, or release date — filter by year and minimum score |
| 📄 **Movie Details** | Full details with cast, genres, runtime, ratings, and overview |
| ▶️ **Trailer Playback** | Watch official YouTube trailers in an inline modal |
| ❤️ **Favorites** | Save movies to a persistent favorites list (localStorage) |
| 📋 **Watchlist** | Track movies you want to watch later |
| 🌙 **Dark / Light Mode** | Theme toggle with system preference detection |
| 📱 **Responsive** | Mobile-first design with collapsible navigation drawer |
| 📦 **PWA Support** | Installable as a native app with offline caching via service worker |
| 🌐 **Network Awareness** | Automatic offline/online status banner |

---

## 🛠️ Tech Stack

| Layer | Technology |
|:---|:---|
| **UI Framework** | [React](https://react.dev) v19.2 |
| **Build Tool** | [Vite](https://vite.dev) v8.0 |
| **Routing** | [React Router DOM](https://reactrouter.com) v7.18 |
| **Data Fetching** | [Axios](https://axios-http.com) v1.18 + [TanStack Query](https://tanstack.com/query) v5 |
| **Styling** | Vanilla CSS with CSS custom properties and fluid typography |
| **Testing** | [Jest](https://jestjs.io) v30 + [React Testing Library](https://testing-library.com) v16 |
| **PWA** | [vite-plugin-pwa](https://vite-pwa-org.netlify.app) v1.3 |

---

## 📁 Project Structure

```text
movie-explorer/
├── public/
│   ├── sw.js                    # Service worker (offline caching)
│   └── manifest.webmanifest     # PWA manifest
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── CastCard.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── FavoriteButton.jsx
│   │   ├── Loader.jsx
│   │   ├── MovieCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── NetworkStatusBanner.jsx
│   │   ├── Pagination.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SkeletonCard.jsx
│   │   └── TrailerModal.jsx
│   ├── context/                 # React Context providers
│   │   ├── FavoritesContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── WatchlistContext.jsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   ├── useMovieFetch.js
│   │   └── useMovies.js
│   ├── pages/                   # Route-level page components
│   │   ├── FavoritesPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── MovieDetailsPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── SearchPage.jsx
│   │   └── WatchlistPage.jsx
│   ├── services/
│   │   └── tmdb.js              # TMDB API client (Axios)
│   ├── utils/
│   │   ├── formatDate.js
│   │   └── formatRating.js
│   ├── App.jsx                  # Root layout + routing
│   ├── main.jsx                 # Entry point
│   ├── index.css                # Global design system
│   └── App.css                  # App-specific styles
├── jest.config.cjs
├── vite.config.js
├── package.json
└── .env.example
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/movie-explorer.git
cd movie-explorer

# Install dependencies
npm install

# Configure environment
cp .env.example .env
```

Open `.env` and add your API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### Development

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

### Production Build

```bash
npm run build
npm run preview    # Preview the production build locally
```

---

## 🧪 Testing

The test suite uses **Jest** and **React Testing Library** with 29 passing tests across 9 test files.

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Watch mode (re-runs on file changes)
npm run test:watch
```

### Coverage Summary

| Module | Statements | Branches | Functions | Lines |
|:---|:---:|:---:|:---:|:---:|
| **Utils** | 100% | 100% | 100% | 100% |
| **Context** | 100% | 100% | 100% | 100% |
| **Hooks** | 100% | — | 100% | 100% |
| **Components** | 60% | 65% | 52% | 66% |
| **Pages** | 55% | 36% | 47% | 60% |
| **Overall** | **66%** | **55%** | **57%** | **71%** |

---

## 🗺️ API Reference

All data is fetched from the [TMDB API v3](https://developers.themoviedb.org/3).

| Endpoint | Description |
|:---|:---|
| `GET /trending/movie/week` | Weekly trending movies |
| `GET /movie/popular` | Popular movies |
| `GET /movie/top_rated` | Top-rated movies |
| `GET /movie/upcoming` | Upcoming releases |
| `GET /search/movie` | Search movies by title |
| `GET /discover/movie` | Advanced discover with filters |
| `GET /movie/{id}` | Movie details (with appended videos) |
| `GET /movie/{id}/credits` | Cast and crew |
| `GET /movie/{id}/similar` | Similar movie recommendations |

---

## 🧭 Application Routes

| Route | Page | Description |
|:---|:---|:---|
| `/` | Home | Discover movies with filters and pagination |
| `/search` | Search | Search movies by title with debounced input |
| `/movie/:id` | Details | Full movie details, cast, trailer, and similar titles |
| `/favorites` | Favorites | Saved favorite movies (persisted in localStorage) |
| `/watchlist` | Watchlist | Movies marked for later viewing |
| `*` | 404 | Catch-all not found page |

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|:---|:---:|:---|
| `VITE_TMDB_API_KEY` | ✅ | Your TMDB v3 API key |

---

## 📜 Available Scripts

| Script | Command | Description |
|:---|:---|:---|
| **Dev server** | `npm run dev` | Start Vite dev server with HMR |
| **Build** | `npm run build` | Create optimized production bundle |
| **Preview** | `npm run preview` | Serve the production build locally |
| **Lint** | `npm run lint` | Run ESLint across the project |
| **Test** | `npm test` | Run the full Jest test suite |
| **Test (watch)** | `npm run test:watch` | Re-run tests on file changes |
| **Test (coverage)** | `npm run test:coverage` | Generate a test coverage report |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                    main.jsx                     │
│          QueryClientProvider + StrictMode        │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│                    App.jsx                      │
│    FavoritesProvider → WatchlistProvider →       │
│    ThemeProvider → BrowserRouter                 │
└──────────────────────┬──────────────────────────┘
                       │
          ┌────────────┼────────────┐
          │            │            │
     ┌────▼────┐ ┌─────▼─────┐ ┌───▼───┐
     │ Navbar  │ │  Pages    │ │Network│
     │         │ │(lazy load)│ │Banner │
     └─────────┘ └─────┬─────┘ └───────┘
                       │
          ┌────────────┼────────────┐
          │            │            │
     ┌────▼────┐ ┌─────▼─────┐ ┌───▼────┐
     │MovieCard│ │ Pagination│ │SearchBar│
     │CastCard │ │ Loader    │ │Trailer │
     └────┬────┘ └───────────┘ └────────┘
          │
     ┌────▼──────────────┐
     │  services/tmdb.js │ ──► TMDB API
     └───────────────────┘
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ using React and the TMDB API

</div>
