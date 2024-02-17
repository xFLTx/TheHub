import { useState } from 'react';

const FavoriteQuotes = () => {
  const [copied, setCopied] = useState(false);

  const clearFavoriteQuotes = () => {
    localStorage.removeItem('favoriteQuotes');
    window.location.reload();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Clear the "copied" message after 2 seconds
  };

  const renderFavoriteQuotes = () => {
    const favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];

    if (favoriteQuotes.length === 0) {
      return <p className="center">No favorite quotes yet.</p>;
    }

    const removeFromFavoriteQuotes = (index) => {
      favoriteQuotes.splice(index, 1);
      localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
      window.location.reload();
    };

    return (
      <ul>
        {favoriteQuotes.map((quote, index) => (
          <li key={index} className="favorite-quote">
            <div className="quote-content">{quote.content}</div>
            <div className="quote-author">- {quote.author}</div>
            <button
              title="Share"
              onClick={() => copyToClipboard(`${quote.content} - ${quote.author}`)}
              className="btn-transparent share-button"
            >
              <img src="public/share.png" height={22} width={22} alt="Share" />
            </button>
            <button
              title="Delete"
              onClick={() => removeFromFavoriteQuotes(index)}
              className="btn-transparent delete-button"
            >
              <img src="public/delete.png" height={22} width={22} alt="Delete" />
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <button title="Clear all favorite quotes" className="clear-favorites" onClick={clearFavoriteQuotes}>
        Clear Favorite Quotes
      </button>
      {renderFavoriteQuotes()}
      {copied && <p className="copied-message">Copied to clipboard!</p>}
    </div>
  );
};

export default FavoriteQuotes;
