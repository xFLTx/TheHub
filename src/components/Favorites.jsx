const Favorites = () => {
  const clearFavorites = () => {
    localStorage.clear();
    window.location.reload();
  };

  const renderFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
      return <p className = "center">No favorites yet.</p>;
    }

    const removeFromFavorites = (index) => {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      window.location.reload();
    }

    return (
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            {favorite.name}, {favorite.country} &rarr; {favorite.temperature}°C, {favorite.weather} 
            <button onClick={() => removeFromFavorites(index)} className = "right-align btn-transparent">
            <img src="public/delete.png" height={22} width={22} alt="Remove from favorite"/>
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
      <button className="clear-favorites" onClick={clearFavorites}>
        Clear Favorites
      </button>
      <h1 className = "center">Favorites</h1>
      {renderFavorites()}
    </div>
  );
};

export default Favorites;
