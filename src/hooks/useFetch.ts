import { useState, useEffect } from "react";

function useFetch<I>() {
  const [data, setData] = useState<I | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      fetch(query)
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
  }, [query]);

  return [data, setQuery] as const;
}

export default useFetch;
