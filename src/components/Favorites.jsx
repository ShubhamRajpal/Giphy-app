import Gif from "./Gif";
import { auth, db } from "../utils/firebase";
import useFavorites from "../utils/useFavorites";
import { deleteDoc, doc } from "firebase/firestore";
import { IoHeart } from "react-icons/io5";

const Favorites = () => {
  if (!auth.currentUser) {
    alert("Please login to manage favorites");
    return;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const favoritesGifs = useFavorites(auth.currentUser.uid);

  const removeFavorite = async (gifId) => {
    console.log(gifId);
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    const favRef = doc(db, "users", userId, "favorites", gifId);

    await deleteDoc(favRef);
  };
  
  return (
    <div className="mt-2">
      <p className="py-4 text-2xl font-extrabold text-gray-400">My favorites</p>
      {favoritesGifs && favoritesGifs?.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:column-4 xl:columns-5 gap-2">
          {favoritesGifs.map((gif) => (
            <div key={gif.id} className="relative">
              <Gif gif={gif} />
              <IoHeart
                size={25}
                onClick={() => removeFavorite(gif.id)}
                className="absolute right-2 top-2 fill-red-700 cursor-pointer"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl mx-auto">No Favorites found.</p>
      )}
    </div>
  );
};

export default Favorites;
