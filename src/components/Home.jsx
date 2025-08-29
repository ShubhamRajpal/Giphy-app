import { useEffect, useState } from "react";
import { GifState } from "../context/gifContext";
import banner from "../assets/banner.gif";
import FilterGif from "./FilterGif";
import UseGifsInfiniteScroll from "../utils/useGifsInfiniteScroll";

const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();
  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 20;

  const fetchTrendingGifs = async () => {
    setIsLoading(true);

    const offset = pageNo * limit;
    const { data } = await gf.trending({
      type: filter,
      limit: limit,
      offset: offset,
      rating: "g",
    });
    setGifs((prev) => (pageNo == 0 ? data : [...prev, ...data]));
    setIsLoading(false);
  };

  useEffect(() => {
    setGifs([]);
    setPageNo(0);
  }, [filter]);

  useEffect(() => {
    fetchTrendingGifs();
  }, [pageNo, filter]);

  return (
    <div>
      <img src={banner} className="w-full rounded mt-4" />
      <FilterGif showTrending />
      <UseGifsInfiniteScroll gifs={gifs} setpageno={setPageNo} />
      {isLoading && (
        <div className="loader">
          <div className="justify-content-center primary-loading"></div>
        </div>
      )}
      <div className="infinte-scroll h-4"></div>
    </div>
  );
};

export default Home;
