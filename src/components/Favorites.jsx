import React, { useEffect, useState } from "react";
import { GifState } from "../context/gifContext";
import Gif from "./Gif";

const Favorites = () => {
  const { gf, favorites } = GifState();
  const [favoritesGifs, setFavoritesGifs] = useState([]);

  const fetchFavorites = async () => {
    const { data } = await gf.gifs(favorites);
    setFavoritesGifs(data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="mt-2">
      <span className="faded-text">My favorites</span>
      {favoritesGifs?.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:column-4 xl:columns-5 gap-2">
          {favoritesGifs.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <p className="text-xl mx-auto">No Favorites found.</p>
      )}
    </div>
  );
};

export default Favorites;
