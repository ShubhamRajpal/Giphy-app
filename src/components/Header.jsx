import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { HiDotsVertical } from "react-icons/hi";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from "../context/gifContext";

const Header = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);

  const { gf, favorites } = GifState();

  useEffect(() => {
    fetchGifCategories();
  }, []);

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  return (
    <nav>
      <div className="relative flex justify-between gap-4 items-center text-white">
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="logo" className="w-12" />
          <h1 className="tracking-tight font-bold text-5xl">GIFFY.</h1>
        </Link>
        <div className="flex items-center gap-6">
          {categories?.slice(0, 6).map((category) => (
            <Link
              to={"/" + category.name}
              key={category.name_encoded}
              className="px-5 py-1 hover:gradient border-b-4 hidden lg:block">
              {category.name}
            </Link>
          ))}

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiDotsVertical
              size={35}
              className={`py-0.5 hover:gradient ${
                showCategories ? "gradient" : ""
              } border-b-4 hidden lg:block`}
            />
          </button>
          {favorites.length > 0 && (
            <div className="px-4 py-1 bg-gray-700 rounded-sm cursor-pointer">
              <Link to="/favorites">Favorites</Link>
            </div>
          )}
          <button className="text-sky-400 block lg:hidden">
            <HiMiniBars3BottomRight size={30} />
          </button>
        </div>
        {showCategories && (
          <div className="absolute w-full right-0 top-14 px-4 pt-4 pb-8 gradient z-20">
            <span className="text-3xl font-bold">Categories</span>
            <hr className="bg-gray-100 opacity-50 mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => (
                <Link
                  to={"/" + category.name_encoded}
                  key={category.name}
                  className="">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
