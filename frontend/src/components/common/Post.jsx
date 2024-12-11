import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../utils/date";

const Post = ({ post }) => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const postOwner = post.user;
  const isLiked = false;
  const isMyPost = authUser && authUser._id === post.user._id;
  const formattedDate = formatPostDate(post.createdAt);

  const [isEditingPost, setIsEditingPost] = useState(false);
  const [updatedText, setUpdatedText] = useState(post.text);

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
    },
    onSuccess: () => {
      toast.success("Post deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDeletePost = () => {
    deletePost();
  };

  const { mutate: updatePost, isPending: isUpdatingPost } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Post edited successfully.");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsEditingPost(false); // Exit edit mode
    },
  });

  const handleUpdatePost = (e) => {
    e.preventDefault();
    updatePost({ newText: updatedText });
  };

  const handleEditClick = () => {
    setIsEditingPost(true); // Enable edit mode
  };

  const handleCancelEdit = () => {
    setIsEditingPost(false); // Exit edit mode
    setUpdatedText(post.text); // Reset the text
  };

  return (
    <>
      <div className="flex gap-2 items-start p-4 border-b border-gray-700">
        <div className="avatar">
          <Link
            to={`/profile/${postOwner.username}`}
            className="w-8 rounded-full overflow-hidden"
          >
            <img src={postOwner.profileImg || "/avatar-placeholder.png"} />
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${postOwner.username}`} className="font-bold">
              {postOwner.fullName}
            </Link>
            <span className="text-gray-700 flex gap-1 text-sm">
              <Link to={`/profile/${postOwner.username}`}>
                @{postOwner.username}
              </Link>
              <span>·</span>
              <span>{formattedDate}</span>
            </span>
            {isMyPost && (
              <span className="flex justify-end flex-1">
                {/* Option to delete or update */}
                {!isDeleting && !isEditingPost && (
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                      <SlOptions />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-30 p-2 shadow"
                    >
                      <li>
                        <a onClick={handleEditClick}>Edit</a>
                      </li>
                      <li>
                        <a onClick={handleDeletePost}>Delete</a>
                      </li>
                    </ul>
                  </div>
                )}
                {isDeleting && <LoadingSpinner size="sm" />}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 overflow-hidden">
            {!isEditingPost && <span>{post.text}</span>}
            {isEditingPost && (
              <form className="flex gap-2" onSubmit={handleUpdatePost}>
                <textarea
                  placeholder="Update your post content."
                  className="flex-1 input border border-gray-700 rounded p-2 input-md"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                />
                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="btn btn-secondary rounded-full btn-xs text-white"
                  >
                    {isUpdatingPost ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary rounded-full btn-xs text-white"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            {post.img && (
              <img
                src={post.img}
                className="h-80 object-contain rounded-lg border border-gray-700"
                alt="Image user uploaded for this post"
              />
            )}
          </div>
          <div className="flex justify-between mt-3">
            {/* Buttons for comment, like, etc. */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
