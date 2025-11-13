# Movie Explorer

A small React app to search movies via the OMDb API, view details (poster, year, plot, IMDb rating) and save favorites to localStorage. Built with React + Tailwind CSS.

## Features

- Search movies by title (OMDb).
- Display poster, title, year, short plot and IMDb rating.
- Save / remove favorites persisted to localStorage.
- Responsive layout (grid + favorites sidebar).

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

## Configuration

API key is stored in `src/config.js`:

- Location: `src/config.js`
- Example content:
  export const OMDB_API_KEY = '29cc40f7';

Change the key there if needed.

Notes:
- You can move the key to an environment variable (recommended for production). If you want, I can update the app to use `process.env.REACT_APP_OMDB_API_KEY` and `.env`.


## File structure (important files)

- src/
  - App.js — main app & components (SearchBar, MovieCard, FavoritesList)
  - config.js — OMDb API key (exported)
  - index.js, index.css — app entry & styles
  - components/ (optional: you can split components here)
- public/
  - index.html

---

## How it works

- Search flow:
  1. Search by title (`s=` endpoint) to get a list.
  2. Fetch details for each result (`i=` endpoint) to obtain plot and imdbRating.
  3. Display up to first 12 results.

- Favorites:
  - Stored in localStorage under the `favorites` key.
  - Toggled via star button on cards; removed in the favorites sidebar.

- Theme:
  - Toggled button in header.
  - Theme preference saved in localStorage under `theme`.
  - App sets `document.documentElement.classList.toggle('dark', theme === 'dark')` (requires class-based Tailwind to fully apply dark variants).

---

## Limitations & notes

- OMDb API rate limits / free plan restrictions apply.
- The current app hardcodes the API key in `src/config.js`. Move to an environment variable for production.
- If you keep the Tailwind CDN, some dark styles may not apply when toggling the theme button.

---

## Development notes

- Split components into `src/components/` for clarity.
- Add debounce to the search input to reduce API calls.
- Add unit tests for favorites and localStorage behavior.
- Consider paginating search results / infinite scroll.

---

## Troubleshooting

- Dark mode not working:
  - If using CDN, consider switching to local Tailwind with `darkMode: 'class'` (see section above).
- App cannot fetch:
  - Check `src/config.js` API key, and verify network access to `www.omdbapi.com`.
- See console/terminal for network or lint errors.

---

## Contributing

Open an issue or send changes as PRs. For larger changes (Tailwind build, env support, moving components), I can make the changes and push suggested diffs.

---

## License

Project contains no license by default. Add a LICENSE file if you plan to publish.


