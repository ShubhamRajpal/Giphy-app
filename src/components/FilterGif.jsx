import React from "react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { GifState } from "../context/gifContext";
import { filters } from "../utils/constants";

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
          <span
            onClick={() => setFilter(f.value)}
            className={`font-semibold min-w-40 rounded-full text-center py-2 cursor-pointer ${
              filter == f.value ? f.background : ""
            }`}>
            {f.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterGif;
