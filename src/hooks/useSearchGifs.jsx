import React, { useEffect } from "react";
import { GifState } from "../context/gifContext";

const useSearchGifs = (phrases, setGptGifs) => {
  const { gf } = GifState();

  const fetchGifs = async () => {
    const fetchPromises = phrases.map((phrase) =>
      gf.search(phrase, {
        type: "gifs",
        offset: 0,
        lang: "es",
        limit: 25,
      })
    );

    // Await all promises to resolve in parallel
    const allResponses = await Promise.all(fetchPromises);

    // Merge and de-duplicate the results
    const mergedGifs = allResponses.flatMap((res) => res.data);
    const uniqueGifs = [];
    const seenIds = new Set();

    for (const gif of mergedGifs) {
      if (!seenIds.has(gif.id)) {
        uniqueGifs.push(gif);
        seenIds.add(gif.id);
      }
    }

    setGptGifs(uniqueGifs);
  };

  useEffect(() => {
    if (!phrases || phrases.length === 0) {
      setGptGifs([]);
      return;
    }
    fetchGifs();
  }, [phrases]);

  return {gf};
};

export default useSearchGifs;
