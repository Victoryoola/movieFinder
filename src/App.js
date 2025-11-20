import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';

// Main App
function App() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [isDark, setIsDark] = useState(() => {
    try {
      const raw = localStorage.getItem('theme');
      if (raw) return JSON.parse(raw);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleFav = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.imdbID === movie.imdbID);
      if (exists) return prev.filter((p) => p.imdbID !== movie.imdbID);
      return [movie, ...prev];
    });
  };

  const removeFav = (movie) => {
    setFavorites((prev) => prev.filter((p) => p.imdbID !== movie.imdbID));
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Movie Explorer
              </Link>
            <div className="flex gap-4">
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/search"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Search
                </Link>
                <Link
                  to="/favorites"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Favorites ({favorites.length})
                </Link>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </nav>

        {/* Routes */}
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <header className="mb-6">
                      <h1 className="text-3xl font-bold">Movie Explorer</h1>
                      <p className="text-gray-600 dark:text-gray-400">Browse and discover movies.</p>
                    </header>
                    <Home favorites={favorites} onToggleFav={toggleFav} />
                  </div>
                }
              />
              <Route
                path="/search"
                element={
                  <div>
                    <header className="mb-6">
                      <h1 className="text-3xl font-bold">Search Movies</h1>
                      <p className="text-gray-600 dark:text-gray-400">Find movies by title and save your favorites (stored locally).</p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      <Search favorites={favorites} onToggleFav={toggleFav} />
                      <aside className="md:col-span-2">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-full sticky top-6">
                          <h2 className="font-semibold mb-3">Favorites</h2>
                          <div className="max-h-[70vh] overflow-auto">
                            {favorites.length === 0 ? (
                              <div className="text-gray-500 dark:text-gray-400">No favorites yet.</div>
                            ) : (
                              <div className="space-y-2">
                                {favorites.map((m) => (
                                  <div key={m.imdbID} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                                    <img
                                      src={m.Poster && m.Poster !== 'N/A' ? m.Poster : 'https://via.placeholder.com/80x120?text=No+Image'}
                                      alt={m.Title}
                                      className="w-10 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-sm truncate">{m.Title}</div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">{m.Year}</div>
                                    </div>
                                    <button
                                      onClick={() => removeFav(m)}
                                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </aside>
                    </div>
                  </div>
                }
              />
              <Route
                path="/favorites"
                element={<Favorites favorites={favorites} onRemove={removeFav} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
