import React from "react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { GifState } from "../context/gifContext";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

const FilterGif = ({ alignLeft = false, showTrending = true }) => {
  const { filter, setFilter } = GifState();

  return (
    <div
      className={`flex gap-3 my-3 text-white ${
        alignLeft ? "" : "justify-end"
      } ${
        showTrending
          ? "justify-between flex-col sm:flex-row sm:items-center"
          : ""
      }`}>
      {showTrending && (
        <div className="flex items-center justify-start my-2 text-xl gap-2">
          <HiArrowTrendingUp size={25} />
          <span className="font-semibold text-teal-400">Trending Now</span>
        </div>
      )}

      <div className=" flex bg-gray-800 rounded-full">
        {filters.map((f) => (
          <span onClick={() => setFilter(f.value)} className={`font-semibold min-w-40 rounded-full text-center py-2 cursor-pointer ${filter == f.value ? f.background : ""}`}>{f.title}</span>
        ))}
      </div>
    </div>
  );
};

export default FilterGif;
