import { useState } from 'react';
import Search from './Search';

export default function Weather() {
  let defualtCityData = {
    coord: {
      lon: -0.1257,
      lat: 51.5085,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    base: 'stations',
    main: {
      temp: 12.7,
      feels_like: 12.38,
      temp_min: 11.49,
      temp_max: 13.47,
      pressure: 1011,
      humidity: 90,
    },
    visibility: 10000,
    wind: {
      speed: 8.23,
      deg: 230,
    },
    clouds: {
      all: 100,
    },
    dt: 1706043492,
    sys: {
      type: 2,
      id: 2075535,
      country: 'GB',
      sunrise: 1705996317,
      sunset: 1706027523,
    },
    timezone: 0,
    id: 2643743,
    name: 'London',
    cod: 200,
  };

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(defualtCityData);
  // const [count, setCount] = useState(0);

  const defualtCity = 'Taipei';

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
        fetchWeatherData(defualtCity);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

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
