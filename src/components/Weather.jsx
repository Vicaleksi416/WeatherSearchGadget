import { useEffect, useState } from 'react';
import Search from './Search';

export default function Weather() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(p) {
    try {
      setLoading(true);

      const apiKey = `bb990c39eac3984e8a84c81bf178a724`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${p}&units=metric&appid=${apiKey}`;

      const res = await fetch(url);
      const resData = await res.json();

      console.log(resData);
      if (resData.cod === 200) {
        setWeatherData(resData);
        setLoading(false);
      } else {
        fetchWeatherData('London');
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  async function handleSearch() {
    fetchWeatherData(search);
    setSearch('');
  }

  function getDate() {
    return new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getDate()}</span>
          </div>
          <div className="temp">
            Tempture: {weatherData?.main?.temp}°C, feels like:{' '}
            {weatherData?.main?.feels_like}°C
          </div>
          <p className="description">{weatherData?.weather[0]?.description}</p>
          <div className="weather-info">
            <div>
              <div>
                <p className="wind">Wind speed: {weatherData?.wind?.speed}</p>
              </div>
              <div>
                <p className="wind">Humidity: {weatherData?.main?.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
