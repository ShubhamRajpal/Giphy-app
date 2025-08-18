import { useEffect } from "react";
import { GifState } from "../context/gifContext";
import banner from "../assets/banner.gif";
import Gif from "./Gif";
import FilterGif from "./FilterGif";

const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrendingGifs = async () => {
    const { data, pagination } = await gf.trending({
      type: filter,
      limit:25,
      offset:200,
      rating: "g",
    });
    console.log(data,pagination);
    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  return (
    <div>
      <img src={banner} className="w-full rounded mt-4" />
      <FilterGif showTrending />
      <div className="columns-2 md:columns-3 lg:column-4 xl:columns-6 gap-2">
        {gifs?.map((gif) => (
          <Gif gif={gif} />
        ))}
      </div>
    </div>
  );
};

export default Home;
