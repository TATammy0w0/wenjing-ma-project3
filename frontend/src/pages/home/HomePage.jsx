import React from "react";
import NavBar from "../../components/common/NavBar";
import CreatePost from "../../components/common/CreatePost";
import Posts from "../../components/common/Posts";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <CreatePost />
      <Posts />
    </div>
  );
};

export default HomePage;
