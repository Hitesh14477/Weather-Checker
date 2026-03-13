// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

const API_KEY = '944c36c657ab075ba54d585965b08461'; // ← Replace with your key
const countryMap = {
  US: "United States",
  IN: "India",
  EG: "Egypt",
  GB: "United Kingdom",
  FR: "France",
  DE: "Germany",
  CA: "Canada",
  AU: "Australia",
  MX: "Mexico"

};
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('C'); // 'C' or 'F'



  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    console.log(lastCity)
    if (lastCity) {
      setCity(lastCity);
      fetchWeather(lastCity);
    }
  }, []);



  const fetchWeather = async (searchCity) => {
    if (searchCity.trim() == "") return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${(searchCity)}&appid=${API_KEY}&units=metric`
      );

      // if (!res.ok) {
      if (res.status === 404) {
        throw new Error('City not found');
      }
      // throw new Error('Something went wrong');
      // }


      const data = await res.json();
      console.log(data)
      setWeather({
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });

      // Save to localStorage
      localStorage.setItem('lastCity', data.name);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const toggleUnit = () => {
    setUnit((prev) => {
      if (prev === 'C') {
        return 'F';
      } else {
        return 'C';
      }
    });
  };    //handleToggle

  const displayTemp = (tempC) => {
    if (unit === 'C') return Math.round(tempC);
    // Convert C → F
    return Math.round((tempC * 9 / 5) + 32);
  };

  let nextUnit;

  if (unit === 'C') {
    nextUnit = 'F';
  } else {
    nextUnit = 'C';
  }

  return (
    <div className="app">
      <h1>Weather Checker ☁️</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="city-input"
        />
        <button type="submit" >
          Search
        </button>
      </form>


      <button onClick={toggleUnit} className="unit-toggle">
        Switch to °{nextUnit}
      </button>

      <div className="weather-container">
        {loading && <div className="loading">Fetching weather...</div>}

        {error && <div className="error">{error}</div>}

        {weather && !loading && !error && (
          <div className="weather-card">
            <h2>
              {weather.city}, {countryMap[weather.country] || weather.country}
            </h2>

            <div className="main-temp">
              {/* {weather.icon.includes("n") ? (
                <div className="moon-icon">🌙</div>
              ) : ( */}
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="weather-icon"
              />
              {/* )} */}
              <div className="temperature">
                {displayTemp(weather.temp)}°{unit}
              </div>
            </div>

            <p className="description">
              {weather.description}
            </p>

            <div className="details">
              <div>Feels like: {displayTemp(weather.feels_like)}°{unit}</div>
              <div>Humidity: {weather.humidity}%</div>
              <div>Wind: {weather.wind} m/s</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;