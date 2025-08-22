import React from "react";

const Gif = ({ gif, hover = true }) => {
  return (
      <div className="w-full relative mb-2 group aspect-video">
        <img
          src={gif?.images?.fixed_width.webp}
          className="w-full object-cover rounded transition-all duration-300"
          alt="gif-Image"
        />
        {hover && (
          <div className="absolute inset-0 rounded opacity-0 font-bold flex gap-2 p-2 items-end group-hover:opacity-100 bg-gradient-to-b from-transparent via-transparent to-black">
            {gif?.user && (
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-8"
              />
            )}
            <span className="text-white font-bold">
              {gif?.user?.display_name || gif?.title}
            </span>
          </div>
        )}
      </div>
  );
};

export default Gif;
