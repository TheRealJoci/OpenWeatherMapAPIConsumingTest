import React, { useState, useEffect } from "react";
import { GeoCode, WeatherData } from "../lib";

const App = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [geoCode, setGeoCode] = useState<GeoCode | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const onSubmitHandle = (event: any) => {
    event.preventDefault();
    const input = event.target.input.value;
    if (input !== "") {
      setUserInput(input);
    }
    event.target.input.value = "";
  };

  useEffect(() => {
    if (userInput !== "") {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        })
        .then((data) => {
          if (data.length) {
            setGeoCode(data[0]);
          }
        });
    }
  }, [userInput]);

  useEffect(() => {
    if (geoCode !== null) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${geoCode.lat}&lon=${geoCode.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        })
        .then((data) => {
          if (data.length) {
            setWeatherData(data[0]);
          }
        });
    }
  }, [geoCode]);

  return (
    <div>
      <form onSubmit={onSubmitHandle}>
        <input type="text" name="input" />
        <input type="submit" value="Search" />
      </form>
      {geoCode && <p>{JSON.stringify(geoCode)}</p>}
      {weatherData && <p>{JSON.stringify(weatherData)}</p>}
    </div>
  );
};

export default App;
