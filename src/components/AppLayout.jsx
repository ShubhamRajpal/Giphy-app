import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div className="bg-gray-950 min-h-screen min-w-full text-pink-600">
      <div className="container px-2 py-4 mx-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
