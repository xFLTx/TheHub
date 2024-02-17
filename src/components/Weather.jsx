import { useState, useEffect } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [continent, setContinent] = useState('Africa');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const apiKey = 'cc4e4e555aa8b1d4dbb17b8426c5e565';

  const continentsArray = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await import(`../json/${continent.toLowerCase()}.json`);
        setCountries(data.countries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    if (continent) {
      fetchCountries();
    }
  }, [continent]);

  ///fetch weather data
  const fetchWeatherData = async () => {
    try {
      const countryData = countries.find((country) => country.name === selectedCountry);
      if (countryData) {
        const abbreviation = countryData.abbreviation;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${abbreviation}&appid=${apiKey}`);
        const data = await response.json();

        // Kelvin to Celsius
        data.main.temp = parseInt(data.main.temp - 273.15).toFixed(2);
        data.main.temp_min = parseInt(data.main.temp_min - 273.15).toFixed(2);
        data.main.temp_max = parseInt(data.main.temp_max - 273.15).toFixed(2);

        setWeatherData(data);

      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };


  

  ///add to favorites
  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const newFavorite = {
      name: weatherData.name,
      country: weatherData.sys.country,
      ///set the temperature to the nearest integer
      temperature: Math.round(weatherData.main.temp),
      weather: weatherData.weather[0].description,
      minTemperature: weatherData.main.temp_min,
      maxTemperature: weatherData.main.temp_max,
      windSpeed: weatherData.wind.speed,
      icon: weatherData.weather[0].icon,
    };

    ///check if the city is already in favorites
    if (favorites.some((favorite) => favorite.name === newFavorite.name)) {
      alert('This city is already in favorites!');
      return;
    }

    favorites.push(newFavorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    ///console print all favorites debug
    console.log(favorites);
  };

  //2nd part
  return (
    <div className='center'>
      <br/>
      {/* Dropdown list for continents */}
      <label>Choose a continent:</label>
      <select onChange={(e) => setContinent(e.target.value)}className='dropdown'>
        <option value="">Select one</option>
        {continentsArray.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <br />
      <br />

      {/* Dropdown list for countries */}
      <label>Choose a country:</label>
      <select onChange={(e) => setSelectedCountry(e.target.value)} disabled={!continent} className='dropdown '>
        <option value="">Select one</option>
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      
      <text>Type the name of the city:</text><br/>
      <input
        type="text"
        placeholder=""
        value={city}
        onChange={(e) => setCity(e.target.value)} className = "txt-input"
      />
      <br />
      <br />

       {/* Add to favorites button */}
       {weatherData && (
        <button onClick={addToFavorites}>Add to favorites</button>
      )} 
      
      <button onClick={fetchWeatherData} disabled={!city || !continent || !selectedCountry}>
        Get Weather
      </button>

    

      {/* Display weather data */}
      {weatherData && (
        <div>
          <h2 className = "sub-title">{weatherData.name}, {weatherData.sys.country}</h2>
          <p className = "center">Temperature: {weatherData.main.temp} °C - Weather: {weatherData.weather[0].description}
          {/*img for the weather description*/}
          <img className="h-32 w-32 fill-current" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}alt="" height={40} width={40}/></p>
          <p>Min Temperature: {weatherData.main.temp_min} °C - Max Temperature: {weatherData.main.temp_max} °C</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>

    
        </div>
      )}
    </div>
  );
};

export default Weather;
