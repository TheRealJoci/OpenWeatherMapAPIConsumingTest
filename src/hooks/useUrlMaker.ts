import { useState } from "react";

function useMakeUrl<I>() {
  const [url, setUrl] = useState("");


  const makeUrl = (props: I) => {
      
    switch (Type infer I) {
      case "GeoCode":
        setUrl(
          `http://api.openweathermap.org/geo/1.0/direct?q=${props.input}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
        );
        break;
      case "WeatherData":
        setUrl(
          `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        );
        break;
      default:
        break;
    }
  };

  return [url, makeUrl] as const;
}

export default useMakeUrl;
