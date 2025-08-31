import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [chipTag, setChipTag] = useState(null);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);
  const [gptGifs, setGptGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addToFavorites = (id) => {
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter((itemId) => id !== itemId);
      localStorage.setItem("FavoritesGifs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.push(id);
      localStorage.setItem("FavoritesGifs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritesGifs")) || [];
    setFavorites(favorites);
  }, []);

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favorites,
        setFavorites,
        addToFavorites,
        isLoading,
        setIsLoading,
        gptGifs,
        setGptGifs,
        chipTag,
        setChipTag
      }}>
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};


export default GifProvider;
