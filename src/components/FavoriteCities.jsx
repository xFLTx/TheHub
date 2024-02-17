import { useState } from 'react';

const FavoriteCities = () => {
  const [copied, setCopied] = useState(false);

  const clearFavorites = () => {
    localStorage.clear();
    window.location.reload();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Clear the "copied" message after 2 seconds
  };

  const renderFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
      return <p className="center">No favorites yet.</p>;
    }

    const removeFromFavorites = (index) => {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      window.location.reload();
    };

    return (
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index} className="favorite-city">
            {favorite.name}, {favorite.country} &rarr; {favorite.temperature}°C, {favorite.weather}
            <button
              title="Share"
              onClick={() => copyToClipboard(`${favorite.name}, ${favorite.country} → ${favorite.temperature}°C, ${favorite.weather}`)}
              className="btn-transparent share-button"
            >
              <img src="public/share.png" height={22} width={22} alt="Share" />
            </button>
            <button
              title="Delete"
              onClick={() => removeFromFavorites(index)}
              className="btn-transparent delete-button"
            >
              <img src="public/delete.png" height={22} width={22} alt="Remove from favorite" />
            </button>
            <br />
            <br />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <button title="Clear all favorites" className="clear-favorites" onClick={clearFavorites}>
        Clear Favorites
      </button>
      {renderFavorites()}
      {copied && <p className="copied-message">Copied to clipboard!</p>}
    </div>
  );
};

export default FavoriteCities;
