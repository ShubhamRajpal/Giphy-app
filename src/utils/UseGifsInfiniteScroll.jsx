import React, { useEffect } from "react";
import Gif from "../components/Gif";
import { Link } from "react-router-dom";

const useGifsInfiniteScroll = ({ gifs, setpageno }) => {
  const options = {
    root: null, // defaults to the viewport
    rootMargin: "-20px", // Example: 200px offset from the bottom
    threshold: 0, // Trigger when any part of the target is visible
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (param) => {
        if (param[0].isIntersecting) {
          console.log(param[0]);
          setpageno((prev) => prev + 1);
        }
      },
      options
    );

    const lastGif = document.querySelector(".infinte-scroll");

    if (!lastGif) return;

    observer.observe(lastGif);
  }, [gifs]);

  return (
    <div className="columns-2 md:columns-3 lg:column-4 xl:columns-6 gap-2">
      {gifs?.map((gif, index) => (
        <Link to={`/${gif.type}s/${gif.slug}`} key={index}>
          <Gif gif={gif} />
        </Link>
      ))}
    </div>
  );
};

export default useGifsInfiniteScroll;
