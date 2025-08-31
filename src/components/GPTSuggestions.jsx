import React from "react";
import Gif from "./Gif";
import { GifState } from "../context/gifContext";
import { Link } from "react-router-dom";

const GPTSuggestions = () => {
  const { gptGifs } = GifState();

  return (
    <div className="my-8">
      <span className="font-extrabold text-white text-lg">
        Showing {gptGifs?.length} results
      </span>
      <div className="columns-2 md:columns-3 lg:column-4 xl:columns-6 gap-2">
        {gptGifs?.map((gif) => (
          <Link to={`/${gif.type}s/${gif.slug}`} key={gif.id}>
            <Gif gif={gif} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GPTSuggestions;
