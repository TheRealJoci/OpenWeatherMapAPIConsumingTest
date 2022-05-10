import React from "react";
import useFetch from "../hooks/useFetch";
import { GeoCode, WeatherData } from "../lib";

const App = () => {
  const [geoCode, setGeoCodeQuery] = useFetch<GeoCode>();
  const [weatherData, setWeatherDataQuery] = useFetch<WeatherData>();

  const onSubmitHandle = (event: any) => {
    event.preventDefault();
    const input = event.target.input.value;
    event.target.input.value = "";
    setGeoCodeQuery(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
    );
    if (geoCode !== null) {
      setWeatherDataQuery(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoCode.lat}&lon=${geoCode.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandle}>
        <input type="text" name="input" />
        <input type="submit" value="Search" />
      </form>
      {geoCode && <p>{JSON.stringify(geoCode, null, "\t")}</p>}
      {weatherData && <p>{JSON.stringify(weatherData, null, "\t")}</p>}
    </div>
  );
};

export default App;
