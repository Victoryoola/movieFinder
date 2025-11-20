import React from 'react';

function FavoritesList({ favorites, onRemove }) {
  if (!favorites || favorites.length === 0) {
    return <div className="text-gray-500 dark:text-gray-400">No favorites yet.</div>;
  }

  return (
    <div className="space-y-2">
      {favorites.map((m) => (
        <div key={m.imdbID} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded shadow">
          <img
            src={m.Poster && m.Poster !== 'N/A' ? m.Poster : 'https://via.placeholder.com/80x120?text=No+Image'}
            alt={m.Title}
            className="w-14 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <div className="font-medium text-gray-900 dark:text-gray-100">{m.Title}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{m.Year}</div>
          </div>
          <button
            onClick={() => onRemove(m)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function Favorites({ favorites, onRemove }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <div className="max-h-[70vh] overflow-auto">
            <FavoritesList favorites={favorites} onRemove={onRemove} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
