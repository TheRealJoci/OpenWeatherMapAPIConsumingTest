import { useState, useEffect } from "react";
import useUrlMaker from "./useUrlMaker";

function useFetch<I>() {
  const [data, setData] = useState<I | null>(null);
  const [url, setUrl] = useUrlMaker();

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
          if (payload.length !== 0) {
            setData(payload[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [url]);

  return [data, setUrl] as const;
}

export default useFetch;
