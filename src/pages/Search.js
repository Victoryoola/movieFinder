import React, { useState } from 'react';
import { OMDB_API_KEY } from '../config';

// SearchBar component
function SearchBar({ value, onChange, onSearch }) {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <input
        className="w-full md:w-64 px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
        placeholder="Search movie title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

function MovieCard({ movie, isFav, onToggleFav }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden">
      <img
        src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
        alt={movie.Title}
        className="w-full h-72 object-cover"
      />
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {movie.Title} <span className="text-sm text-gray-500 dark:text-gray-400">({movie.Year})</span>
          </h3>
          <button
            onClick={() => onToggleFav(movie)}
            className={`px-2 py-1 text-sm rounded ${isFav ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-600'}`}
          >
            {isFav ? '★' : '☆'}
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'No description available.'}</p>
        <div className="mt-3 text-sm text-gray-700 dark:text-gray-200">
          <strong>IMDB rating:</strong> {movie.imdbRating || 'N/A'}
        </div>
      </div>
    </div>
  );
}

function Search({ favorites, onToggleFav }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiKey = OMDB_API_KEY;

  const search = async () => {
    setError('');
    if (!apiKey) {
      setError('OMDb API key missing in app configuration.');
      return;
    }

    if (!query) return;
    setLoading(true);
    try {
      const sres = await fetch(`https://www.omdbapi.com/?apikey=${encodeURIComponent(apiKey)}&s=${encodeURIComponent(query)}`);
      const sjson = await sres.json();
      if (sjson.Response === 'False') {
        setMovies([]);
        setError(sjson.Error || 'No results');
        setLoading(false);
        return;
      }

      const details = await Promise.all(
        sjson.Search.slice(0, 12).map(async (item) => {
          const r = await fetch(`https://www.omdbapi.com/?apikey=${encodeURIComponent(apiKey)}&i=${item.imdbID}&plot=short`);
          return r.json();
        })
      );

      setMovies(details);
    } catch (err) {
      setError(err.message || 'Fetch error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="md:col-span-3">
      <div className="mb-4 flex flex-col gap-2">
        <div className="mt-2">
          <SearchBar value={query} onChange={setQuery} onSearch={search} />
        </div>
      </div>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      {loading && (
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 mb-3">
          <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          <span className="sr-only">Loading</span>
          <div>Loading results...</div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((m) => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            isFav={favorites.some((f) => f.imdbID === m.imdbID)}
            onToggleFav={onToggleFav}
          />
        ))}
      </div>
    </main>
  );
}

export default Search;
