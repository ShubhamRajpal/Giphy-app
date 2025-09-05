import React from "react";
import { IoIosClose } from "react-icons/io";

const Modal = ({ type, inputValue, show }) => {
  const closeModal = () => {
    show();
  };

  return (
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="absolute max-w-sm sm:max-w-md p-2 sm:p-5 z-50 bg-white text-black rounded-lg">
        <div className="flex justify-between my-1">
          <h1 className="font-bold text-md flex justify-between">
            {type} Link
          </h1>
          <button
            className="text-gray-400 hover:text-black"
            onClick={closeModal}>
            <IoIosClose size={25} />
          </button>
        </div>
        <p className="text-gray-500 text-sm">
          Anyone who has this link will be able to view this.
        </p>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="link">Link</label>
          <input
            type="text"
            id="link"
            className="border rounded-md py-1 px-2 text-sm focus:border-4 focus-ring-gray-500 outline-none"
            value={inputValue}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
