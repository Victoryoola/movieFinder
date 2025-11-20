import React, { useState } from 'react';
import { OMDB_API_KEY } from '../config';

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

function Home({ favorites, onToggleFav }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiKey = OMDB_API_KEY;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Map letters to popular movie titles that start with that letter
  const moviesByLetter = {
    A: ['Avatar', 'Avengers', 'Alien'],
    B: ['Batman', 'Barbie', 'Back to the Future'],
    C: ['Cinderella', 'Creed', 'Captain Marvel'],
    D: ['Dune', 'Die Hard', 'Deadpool'],
    E: ['E.T.', 'Emoji', 'Eternals'],
    F: ['Frozen', 'Fast & Furious', 'Forrest Gump'],
    G: ['Godfather', 'Gladiator', 'Green Lantern'],
    H: ['Harry Potter', 'Hulk', 'Hunger Games'],
    I: ['Inception', 'Iron Man', 'Indiana Jones'],
    J: ['Joker', 'Jaws', 'Jungle Book'],
    K: ['Kingdom of the Planet of the Apes', 'Knives Out', 'Karate Kid'],
    L: ['Lion King', 'Lord of the Rings', 'Lego Movie'],
    M: ['Mission Impossible', 'Marvel', 'Mummy'],
    N: ['Nemo', 'Nightmare on Elm Street', 'No Time to Die'],
    O: ['Oppenheimer', 'Oz', 'Onward'],
    P: ['Parasite', 'Pirates of the Caribbean', 'Paddington'],
    Q: ['Quantum of Solace', 'Queen', 'Quiet Place'],
    R: ['Rambo', 'Rogue One', 'Razor Edge'],
    S: ['Spider-Man', 'Star Wars', 'Shrek'],
    T: ['Titanic', 'Top Gun', 'Terminator'],
    U: ['Uncharted', 'Up', 'Unforgiven'],
    V: ['Venom', 'Velvet Buzzsaw', 'Vacation'],
    W: ['Wonder Woman', 'Wizard of Oz', 'Wreck-It Ralph'],
    X: ['X-Men', 'Xanadu', 'X-Force'],
    Y: ['Yentl', 'Y2K', 'Yellow Submarine'],
    Z: ['Zootopia', 'Zombieland', 'Zero Dark Thirty'],
  };

  const fetchMoviesByLetter = async (letter) => {
    setLoading(true);
    setError('');
    setSelectedLetter(letter);

    if (!apiKey) {
      setError('OMDb API key missing in app configuration.');
      setLoading(false);
      return;
    }

    try {
      const searchTitles = moviesByLetter[letter] || [];
      const movieDetails = [];

      // Fetch details for each movie title
      for (const title of searchTitles) {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${encodeURIComponent(apiKey)}&s=${encodeURIComponent(title)}`);
        const json = await res.json();

        if (json.Response === 'True' && json.Search && json.Search.length > 0) {
          // Get the first result
          const item = json.Search[0];
          const detailRes = await fetch(`https://www.omdbapi.com/?apikey=${encodeURIComponent(apiKey)}&i=${item.imdbID}&plot=short`);
          const detail = await detailRes.json();
          if (detail.Response === 'True') {
            movieDetails.push(detail);
          }
        }
      }

      if (movieDetails.length > 0) {
        setMovies(movieDetails);
      } else {
        setError('No movies found for this letter.');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Browse Movies by Letter</h2>
        <div className="flex flex-wrap gap-3">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => fetchMoviesByLetter(letter)}
              className={`px-4 py-2 rounded font-semibold transition ${
                selectedLetter === letter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && selectedLetter && movies.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            Movies starting with "{selectedLetter}"
          </h3>
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
        </div>
      )}

      {!loading && !selectedLetter && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Click a letter to browse movies
        </div>
      )}
    </main>
  );
}

export default Home;
