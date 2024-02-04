import { useState } from 'react';
import Search from './Search';
import WeatherInfo from './WeatherInfo';

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

  //TODO: render defualt page, remove def-data

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

      const res = await fetch(url); //.then?
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
      //TODO: render err content

      console.error(err);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    fetchWeatherData(search);
    setSearch('');
  }

  //TODO: render defualt content, bg-img
  // * idealy the img will match the target city, find an API for that
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
        <WeatherInfo data={weatherData} loading={loading} />
      )}
    </div>
  );
}
