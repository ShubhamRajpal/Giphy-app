import React from "react";
import Gif from "./Gif";
import { GifState } from "../context/gifContext";
import { Link } from "react-router-dom";

const GPTSuggestions = () => {
  const { gptGifs } = GifState();
  console.log(gptGifs);

  return (
    <div className="my-8">
      <span className="font-extrabold text-white">{""}</span>
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
