import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GifState } from "../context/gifContext";
import Gif from "./Gif";
import FollowOn from "./followOn";

import { HiOutlineExternalLink } from "react-icons/hi";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";
import { auth, db } from "../utils/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import useFavorites from "../utils/useFavorites";
import Modal from "./Modal";

const contentType = ["gifs", "stickers", "texts"];

const GifPage = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const favoritesGifs = useFavorites(auth?.currentUser?.uid);
  const { gf } = GifState();

  const embedURL = gif?.embed_url;
  const iFrame = `<iframe src=${embedURL} width="480" height="365" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href=${gif?.url}>via GIPHY</a></p>`;

  const saveFavorite = async () => {
    if (!auth.currentUser) {
      alert("Please login to manage favorites");
      return;
    }
    console.log("Data added to DB");
    const userId = auth.currentUser.uid;
    const favRef = doc(db, "users", userId, "favorites", gif.id);

    await setDoc(favRef, {
      gifId: gif.id,
      url: gif.images.fixed_width.webp,
      title: gif.title,
      type: gif.type,
      slug: gif.slug,
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    const fetchGif = async () => {
      const gifId = slug.split("-");
      const { data } = await gf.gif(gifId[gifId.length - 1]);
      const { data: related } = await gf.related(gifId[gifId.length - 1], {
        limit: 10,
      });
      setGif(data);
      setRelatedGifs(related);
    };

    fetchGif();
  }, []);

  const shareGif = () => {
    setShowShareModal(true);
  };

  const EmbedGif = () => {
    setShowEmbedModal(true);
  };

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      {showShareModal && !showEmbedModal && gif && (
        <Modal
          type={"Share"}
          inputValue={gif?.url}
          show={() => setShowShareModal(false)}
        />
      )}
      {showEmbedModal && !showShareModal && gif && (
        <Modal
          type={"Embed"}
          inputValue={iFrame}
          show={() => setShowEmbedModal(false)}
        />
      )}
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold text-white">
                  {gif?.user?.display_name}
                </div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                <button
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}>
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </button>
              </p>
            )}
          </>
        )}
        <FollowOn />

        <div className="divider" />

        {gif?.source && (
          <div>
            <span
              className="faded-text" //custom - faded-text
            >
              Source
            </span>
            <div className="flex items-center text-sm font-bold gap-1 text-white">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* -- Mobile UI -- */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>

              <button className="ml-auto" onClick={shareGif}>
                <FaPaperPlane size={25} />
              </button>
            </div>
            {/* -- Mobile UI -- */}
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6 text-white">
            <button
              onClick={saveFavorite}
              className="flex gap-5 items-center font-bold text-lg hover:text-red-400">
              <HiMiniHeart
                size={30}
                className={`${
                  auth.currentUser &&
                  favoritesGifs.some((fav) => fav.id === gif.id)
                    ? "text-red-500"
                    : ""
                }`}
              />
              Favorite
            </button>
            <button
              onClick={shareGif} // Assignment
              className="flex gap-6 items-center font-bold text-lg hover:text-yellow-400" >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={EmbedGif} // Assignment
              className="flex gap-5 items-center font-bold text-lg hover:text-teal-400">
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>

        <div>
          <span className="font-extrabold text-white">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.slice(1).map((gif) => (
              <Link to={`/${gif.type}s/${gif.slug}`} key={gif.id}>
                <Gif gif={gif} key={gif.id} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifPage;
