import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { GeoCodeData, WeatherData } from "../lib";

const App = () => {
  const [geoCodeData, createGeoCodeDataQuery] = useFetch<GeoCodeData>();
  const [weatherData, createWeatherDataQuery] = useFetch<WeatherData>();

  const onSubmitHandle = (event: any) => {
    event.preventDefault();
    const input = event.target.input.value;
    event.target.input.value = "";
    if (input) {
      createGeoCodeDataQuery("GeoCode", { city: input });
    }
  };

  useEffect(() => {
    if (geoCodeData !== null) {
      createWeatherDataQuery("Weather", {
        lat: geoCodeData.lat,
        lon: geoCodeData.lon,
      });
    }
  }, [geoCodeData, createWeatherDataQuery]);

  return (
    <div>
      <form onSubmit={onSubmitHandle}>
        <input type="text" name="input" />
        <input type="submit" value="Search" />
      </form>
      <p>{JSON.stringify(geoCodeData, null, "\t")}</p>
      <p>{JSON.stringify(weatherData, null, "\t")}</p>
    </div>
  );
};

export default App;
