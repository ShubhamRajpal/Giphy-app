import React, { useEffect, useState } from "react";
import { GifState } from "../context/gifContext";
import { useParams } from "react-router-dom";
import FilterGif from "./FilterGif";
import Gif from "./Gif";

const SearchPage = () => {
  const { gf, filter } = GifState();
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();

  const fetchSearchResults = async () => {
    const { data } = await gf.search(query, {
      type: filter,
      sort: "relevant",
      lang: "es",
      limit: 25,
    });

    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [filter]);

  return (
    <div className="my-4">
      <h2 className="text-3xl font-extrabold pb-3">{query}</h2>
      <FilterGif alignLeft="true" />

      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:column-4 xl:columns-6 gap-2">
          {searchResults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No results found for {query}. Try searching for stickers instead?
        </span>
      )}
    </div>
  );
};

export default SearchPage;
