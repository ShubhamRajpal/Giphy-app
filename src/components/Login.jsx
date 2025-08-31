import React, { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

const Login = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation();

  const curLocation = location.pathname;

  const handleLoginClick = async () => {
    await signInWithPopup(auth, googleProvider);
    setShowLogout(false);
    navigate(curLocation);
  };

  const handleLogoutClick = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      {!auth.currentUser && (
        <div className="cursor-pointer bg-gray-700 sm:px-2 sm:py-1 p-1 rounded-sm" onClick={handleLoginClick}>
          Login
        </div>
      )}
      {auth.currentUser && (
        <div className="relative cursor-pointer flex items-center gap-1 text-white transition-all duration-300 ease-in-out">
          <span className="text-sm hidden sm:block">
            Hi, {auth?.currentUser?.displayName.split(" ")[0].toLowerCase()}
          </span>
          <img src={auth?.currentUser?.photoURL} className="block sm:hidden h-9 w-9 rounded-full" alt="profile-photo" loading="lazy"/>
          <span onClick={() => setShowLogout(!showLogout)}>
            {" "}
            <MdKeyboardArrowDown size={20} />
          </span>

            <div className={`absolute rounded-tr-lg rounded-bl-lg bg-gradient-to-br from-gray-400 via-gray-600 to-gray-800 w-28 h-36 right-0 top-10 sm:right-0 sm:top-8 px-2 pt-2 pb-8 bg-gray-700 z-20 ${showLogout ? "block" : "hidden"}`}>
              <p className="text-md font-semibold">
                <Link to="/favorites">Favorites</Link>
              </p>
              <p
                className="text-md font-semibold mt-2"
                onClick={handleLogoutClick}>
                Log Out
              </p>
            </div>
        </div>
      )}
    </div>
  );
};

export default Login;
