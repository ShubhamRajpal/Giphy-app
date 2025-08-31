import React, { useEffect, useState } from "react";
import { GifState } from "../context/gifContext";

const useSearchChips = (query) => {
  const [chips, setChips] = useState([]);

  const fetchChips = async () => {
    const cleanQuery = query.substring(0,query.length); 
    const res = await fetch(`https://api.giphy.com/v1/tags/related/${encodeURIComponent(cleanQuery)}?api_key=${import.meta.env.VITE_GIPHY_API_KEY}`);
    const data = await res.json();

    setChips(data.data);
  };

  useEffect(() => {
    fetchChips();
  }, [query]);
  return chips;
};

export default useSearchChips;
