import React, { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GifSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  const searchGifs = async () => {
    if (query.trim() === "") return;

    navigate("/search/" + query);
  };

  return (
    <div className="flex relative mt-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for Gifs and Stickers"
        className="w-full pr-14 pl-5 py-4 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none"
      />

      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute rounded-full bg-gray-300 right-20 mr-2 top-5 opacity-90 text-white">
          <HiMiniXMark size={22} />
        </button>
      )}

      <button
        onClick={searchGifs}
        className="bg-gradient-to-tr from-teal-500 to-red-400 px-4 py-2 rounded-tr rounded-br text-white">
        <HiOutlineMagnifyingGlass
          size={35}
          className="-scale-x-100 text-white"
        />
      </button>
    </div>
  );
};

export default GifSearch;
