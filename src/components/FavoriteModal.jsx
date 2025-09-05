import React from "react";
import { IoIosClose } from "react-icons/io";

const FavoriteModal = ({show}) => {
  const closeModal = () => {
    show();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="absolute max-w-sm sm:max-w-md p-2 sm:p-5 z-50 bg-white text-black rounded-lg">
        <p className="text-md font-medium pt-2">
          Please login to your account to manage Favorites
        </p>
        <button className="text-gray-400 hover:text-black absolute top-1 right-3" onClick={closeModal}>
          <IoIosClose size={25} />
        </button>
      </div>
    </div>
  );
};

export default FavoriteModal;
