import React from "react";
import CreatePost from "../../components/common/CreatePost";
import Posts from "../../components/common/Posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const isLoggedIn = !!authUser;

  return (
    <>
      <div className="flex flex-col">
        {isLoggedIn && <CreatePost />}
        <Posts />
      </div>
    </>
  );
};

export default HomePage;
