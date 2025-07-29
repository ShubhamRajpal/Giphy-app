import { useEffect } from "react";
import { GifState } from "../context/gifContext";
import banner from "../assets/banner.gif";
import Gif from "./Gif";
import FilterGif from "./FilterGif";

const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrendingGifs = async () => {
    const { data } = await gf.trending({
      type: filter,
      rating: "g",
    });
    console.log(data);
    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  return (
    <div>
      <img src={banner} className="w-full rounded mt-4" />
      <FilterGif />
      <div className="columns-2 md:columns-3 lg:column-4 xl:columns-6 gap-2">
        {gifs?.map((gif) => (
          <Gif gif={gif} />
        ))}
        Home
      </div>
    </div>
  );
};

export default Home;
