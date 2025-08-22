import React, { useEffect, useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { placeholders } from "../utils/constants";

const GPTSearchBar = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholderList = placeholders;

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderList.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex relative mt-4">
      <input
        type="text"
        value=""
        onChange=""
        placeholder={placeholderList[placeholderIndex]}
        className="w-full pr-14 pl-5 py-4 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none"
      />

      <button className="absolute rounded-full bg-gray-300 right-20 mr-2 top-5 opacity-90 text-white">
        <HiMiniXMark size={22} />
      </button>

      <button className="bg-gradient-to-tr from-teal-500 to-red-400 px-4 py-2 rounded-tr rounded-br text-white">
        <HiOutlineMagnifyingGlass
          size={35}
          className="-scale-x-100 text-white"
        />
      </button>
    </div>
  );
};

export default GPTSearchBar;
