import React from "react";
import NavBar from "../common/NavBar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex mx-auto ">
      <div className="border-x border-gray-700 min-h-screen">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
