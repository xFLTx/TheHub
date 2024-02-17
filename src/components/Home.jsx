import { useState, useEffect } from 'react';

const Home = () => {
  const [quoteData, setQuoteData] = useState({ content: '', author: '' });

  // Function to fetch a random quote from the Quotable API
  const fetchQuote = () => {
    fetch('https://api.quotable.io/random?')
      .then((response) => response.json())
      .then((data) => {
        // Update the state 
        setQuoteData({ content: data.content, author: data.author });
      })
      .catch((error) => console.log(error));
  };

  // Fetch a quote when 
  useEffect(() => {
    fetchQuote();
  }, []); //empty array to prevent infinite loop

  //Adding the quote to favorites in local storage
  const addToFavoriteQuotes = () => {
    const favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
    const newFavorite = {
      content: quoteData.content,
      author: quoteData.author,
    };

    // Check if the quote is already in favorites
    if (favoriteQuotes.some((favorite) => favorite.content === newFavorite.content && favorite.author === newFavorite.author)) {
      alert('This quote is already in favorites!');
      return;
    }

    favoriteQuotes.push(newFavorite);
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
    // Console print all favorite quotes for debugging
    console.log(favoriteQuotes);
  };


  return (
    <div className='center'>
      <br />
      <p className='quote-txt'>{quoteData.content}</p>
      <p className='quote-author'>- {quoteData.author}</p>
      <br />
      <button title ="another one?" onClick={fetchQuote} className='button-spin'>
      <img src="public/reload.png" height={24} width={24}/>
      </button> <button title='You liked it?' onClick={addToFavoriteQuotes}className='button-spin'><img src="public/star.png" height={30} width={30}/></button>
      <br />
      <br />
      <p>Weather data provided by OpenWeather</p>
      <p>Quotes are from quotable.io</p>
      <p className="disclaimer">Made by: Ian Michael Brandt</p>
    </div>
  );
};

export default Home;
