import React from "react";
import CreatePost from "../../components/common/CreatePost";
import Posts from "../../components/common/Posts";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col">
        <CreatePost />
        <Posts />
      </div>
    </>
  );
};

export default HomePage;
