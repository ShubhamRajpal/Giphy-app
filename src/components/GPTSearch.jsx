import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTSuggestions from "./GPTSuggestions";
import { GifState } from "../context/gifContext";

const GPTSearch = () => {
  const { gptGifs } = GifState();

  return (
    <div>
      <GPTSearchBar />
      {gptGifs?.length > 0 && <GPTSuggestions />}
    </div>
  );
};

export default GPTSearch;
