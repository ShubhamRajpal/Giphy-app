import React, { useEffect } from "react";
import { GifState } from "../context/gifContext";

const useSearchGPTGifs = (phrases, setGptGifs) => {
  const { gf, chipTag } = GifState();

  const fetchGifs = async () => {
    // setIsLoading(true);
    let results = [];
    if (chipTag) {
      const { data } = await gf.search(chipTag, {
        type: "gifs",
        offset: 0,
        lang: "es",
        limit: 25,
      });

      results = data;
    } else if (phrases?.length > 0){
      const fetchPromises = phrases.filter(Boolean).map((phrase) =>
       
        gf.search(phrase, {
          type: "gifs",
          offset: 0,
          lang: "es",
          limit: 15,
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

      results = uniqueGifs; 
    }
    setGptGifs(results);
    // setIsLoading(false);
  };

  useEffect(() => {
    if ((!phrases || phrases.length === 0) && !chipTag) {
      // setGptGifs([]);
      return;
    }
    fetchGifs();
  }, [JSON.stringify(phrases), chipTag]);

  return { gf };
};

export default useSearchGPTGifs;
