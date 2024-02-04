// import { useState } from 'react';
import countryies from '../countryList';

export default function WeatherInfo(data, loading) {
  /*
    const [code, setCode] = useState(null);
*/
  const weatherData = data.data;
  //   console.log(data);
  //   console.log(weatherData);

  function getDate() {
    return new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  const c = weatherData.sys.country;

  const truncateTemp = function (t) {
    const truncTemp = Math.round(t * 10) / 10;
    // console.log(truncTemp);
    return truncTemp;
  };

  return (
    <>
      <div className={loading ? 'opacity-0' : 'opacity-100'}>
        <div>
          <h2 className="city-name">
            {weatherData?.name}, {countryies[c]}
          </h2>
          <div className="date">
            <span>{getDate()}</span>
          </div>
        </div>
        <div className="main-info">
          <p className="temp">
            Tempture: {truncateTemp(weatherData?.main?.temp)}°C, feels like:{' '}
            {truncateTemp(weatherData?.main?.feels_like)}°C
          </p>
          <p className="description">{weatherData?.weather[0]?.description}</p>
        </div>
        <div className="weather-info">
          <p className="wind">Wind speed: {weatherData?.wind?.speed}</p>
          <p className="humidity">Humidity: {weatherData?.main?.humidity}%</p>
        </div>
      </div>
    </>
  );
}
