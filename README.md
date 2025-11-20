# Movie Explorer

A small React app to search movies via the OMDb API, view details (poster, year, plot, IMDb rating) and save favorites to localStorage. Built with React + Tailwind CSS.

## Features

- Search movies by title (OMDb).
- React Routing
- Display poster, title, year, short plot and IMDb rating.
- Home page displays most popular movies for each letter of the Alphabet
- CRUD operations for movie favortites (Add, and Delete).
- Responsive layout (grid + favorites sidebar).
- Light and Dark mode feature

## Tech stack

- React (Create React App)
- Tailwind CSS (currently using CDN by default)
- OMDb API (https://www.omdbapi.com/)
- LocalStorage for persistence

## Quick start

Requirements: Node.js (>=16) and npm.

1. Install dependencies
   - Open PowerShell in the project root:
     npm install

2. Start dev server:
     npm start

3. Open http://localhost:3000

## File structure (important files)

- src/
  - pages/
    - favorites.js
    - home.js
    - search.js
  - App.js — main app & components (SearchBar, MovieCard, FavoritesList)
  - config.js — OMDb API key (exported)
  - index.js, index.css — app entry & styles
  - components/ (optional: you can split components here)
- public/
  - index.html

## How it works

- Search flow:
  1. Search by title (`s=` endpoint) to get a list.
  2. Fetch details for each result (`i=` endpoint) to obtain plot and imdbRating.
  3. Display up to first 12 results.

- Favorites:
  - Stored in localStorage under the `favorites` key.
  - Toggled via star button on cards; removed in the favorites sidebar.

## Limitations & notes

- OMDb API rate limits / free plan restrictions apply.
- Home pages displays a predefined list of popular movies
- If you keep the Tailwind CDN, some dark styles may not apply when toggling the theme button.

## Development notes

- Split components into `src/components/` for clarity.
- Add debounce to the search input to reduce API calls.
- Add unit tests for favorites and localStorage behavior.
- Consider paginating search results / infinite scroll.

# Deployment
https://movie-finder-blond-six.vercel.app/


## Contributing

Open an issue or send changes as PRs. For larger changes (Tailwind build, env support, moving components), I can make the changes and push suggested diffs.

## License

MIT License

