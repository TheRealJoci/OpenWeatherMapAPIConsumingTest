import { useState, useEffect } from "react";
import useCreateQuery from "./useCreateQuery";

function useFetch<I>() {
  const [data, setData] = useState<I | null>(null);
  const [url, queryType, createQuery] = useCreateQuery();

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        })
        .then((payload) => {
          switch (queryType.current) {
            case "GeoCode":
              setData(payload[0]);
              break;
            case "Weather":
              setData(payload);
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [url, queryType]);

  return [data, createQuery] as const;
}

export default useFetch;
