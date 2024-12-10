import React from "react";
import NavBar from "../common/NavBar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-2xl w-full border-x border-gray-700 min-h-screen">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
