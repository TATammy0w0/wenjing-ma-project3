import React from "react";
import CreatePost from "../../components/common/CreatePost";
import Posts from "../../components/common/Posts";

const HomePage = () => {
  return (
    <>
      <div className="mx-auto max-w-2xl border-r border-gray-700 min-h-screen">
        <CreatePost />
        <Posts />
      </div>
    </>
  );
};

export default HomePage;
