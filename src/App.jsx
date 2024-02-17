import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './components/Home';
import FavoritesQuotes from './components/FavoriteQuotes';
import Weather from './components/Weather';
import FavoriteCities from './components/FavoriteCities';
import News from './components/News';
import Settings from './components/Settings';
import './App.css';

const PageHome = () => (
  <div>
    <Home />
  </div>
);

const PageFavoritesQuotes = () => (
  <div>
    <FavoritesQuotes />
  </div>
);

const PageNews = () => (
  <div>
    <News />
  </div>
);

const PageWeather = () => (
  <div>
    <Weather />
  </div>
);

const PageFavoriteCities = () => (
  <div>
    <FavoriteCities />
  </div>
);

const PageSettings = () => (
  <div>
    <Settings />
  </div>
);

const SubNavigation = () => {
  const location = useLocation();

  return (
    <div className="sub-navigation">
      <br />
      {location.pathname === '/' && (
        <Link to="/favoritesquotes" className="nav-button">
          Favorites Quotes
        </Link>
      )}
      {location.pathname === '/weather' && (
        <Link to="/favoritecities" className="nav-button">
          Favorite Cities
        </Link>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="app-background">
    <img  src="public/thehub.png" alt="The Hub Logo" className="logo" />
      <nav>
        <Link to="/" className="nav-button">
          Home
        </Link>
        <Link to="/news" className="nav-button">
          News
        </Link>
        <Link to="/weather" className="nav-button">
          Weather
        </Link>
        <Link to="/settings" className="nav-button">
          Settings
        </Link>
      </nav>

      <SubNavigation />

      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/favoritesquotes" element={<PageFavoritesQuotes />} />
        <Route path="/news" element={<PageNews />} />
        <Route path="/weather" element={<PageWeather />} />
        <Route path="/favoritecities" element={<PageFavoriteCities />} />
        <Route path="/settings" element={<PageSettings />} />
      </Routes>
    </div>
  );
}

export default App;
