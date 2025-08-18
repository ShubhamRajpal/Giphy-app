import React, { useEffect, useState } from "react";
import { GifState } from "../context/gifContext";
import { useParams } from "react-router-dom";
import Gif from "./Gif";
import FollowOn from "./FollowOn";

const Category = () => {
  const [results, setResults] = useState();
  const { gf } = GifState();
  const { category } = useParams();

  const fetchResults = async () => {
    const { data } = await gf.gifs(category, category);

    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4 text-white">
      <div className="w-full sm:w-72">
        {results?.length > 0 && <Gif gif={results[0]} hover={false} />}
        <span className="text-gray-400 text-sm pt-2">
          Dont&apos;t tell it to me, Gif it to me!
        </span>
        <FollowOn />
      </div>
      <div>
        <h2 className="text-4xl font-extrabold pb-1 capitalize">
          {category.split("-").join("&")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-6 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>
        {results?.length > 0 && (
          <div className="columns-2 md:columns-3 lg:column-4 xl:columns-5 gap-2">
            {results.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
