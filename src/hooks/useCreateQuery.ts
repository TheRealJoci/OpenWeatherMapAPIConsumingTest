import { useState, useRef } from "react";

function useCreateQuery() {
  const queryType = useRef("");
  const [url, setUrl] = useState("");

  const createQuery = (type: string, props: any) => {
    queryType.current = type;
    switch (type) {
      case "GeoCode":
        setUrl(
          `http://api.openweathermap.org/geo/1.0/direct?q=${props.city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
        );
        break;
      case "Weather":
        setUrl(
          `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        );
        break;
      default:
        console.log("Couldn't make an URL!");
        break;
    }
  };

  return [url, queryType, createQuery] as const;
}

export default useCreateQuery;
