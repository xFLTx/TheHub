import Home from './components/Home';
import Weather from './components/Weather';  
import Favorites from './components/Favorites';
import './App.css';

//router import
import {Routes, Route, Link} from 'react-router-dom';

const PageHome = () => {
  return (
   <div>
    <Home />
   </div>
  );
};

const PageWeather = () => {
  return (
    <div>
      <Weather />
    </div>
  );
};
const PageFavorites = () => {
  return (
    <div>
      <Favorites />
    </div>
  );
};

function App() {
  return (
    <div className = "app-background" >
      <h1 className='tittle'>Weather Research API + REACT</h1>
      <nav>
        <Link to="/" className = "nav-button">Home </Link>
        <Link to="/weather" className = "nav-button">Weather </Link>
        <Link to="/favorites"className = "nav-button">Favorites</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/weather" element={<PageWeather />} />
        <Route path="/favorites" element={<PageFavorites />} />
      </Routes>
    </div>
  );
}

export default App;
