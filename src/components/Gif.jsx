import React from "react";
import { Link } from "react-router-dom";

const Gif = ({ gif, hover = true }) => {
  console.log(gif);
  return (
    <Link to={`/${gif.type}/${gif.slug}`}>
      <div className="w-full relative mb-2 group aspect-video">
        <img
          src={gif?.images?.fixed_width.webp}
          className="w-full object-cover rounded"
          alt="gif-Image"
        />
        {hover && (
          <div className="absolute bottom-0 flex gap-2 justify-center p-2 items-center group-hover:opacity-100 bg-gradient-to-b from-transparent via-transparent to-black">
            {gif?.user && (
              <img
                src={gif?.user?.avatar_url}
                alt="gif-userInfo"
                className="h-8"
              />
            )}
            <span className="text-white font-bold">
              {gif?.user?.display_name || gif?.title}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Gif;
