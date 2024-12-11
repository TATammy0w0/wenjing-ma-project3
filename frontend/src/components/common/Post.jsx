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
  //const [comment, setComment] = useState("");
  //const [editPost, setEditPost] = useState("");
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const postOwner = post.user;
  const isLiked = false;
  const isMyPost = authUser && authUser._id === post.user._id;
  const formattedDate = formatPostDate(post.createdAt);

  const [isEditingPost, setIsEditingPost] = useState(false);
  const [updatedText, setUpdatedText] = useState(post.text);

  const [formData, setFormData] = useState({
    text: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/${post._id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        toast.error(error.message);
        throw error;
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
    mutationFn: async (formData) => {
      try {
        const res = await fetch(`/api/posts/${post._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        toast.error(error.message);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Post edited successfully.");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleUpdatePost = () => {
    e.preventDefault(); //prevent the default form submission behavior
    updatePost(formData);
  };

  const handleEditClick = () => {
    setIsEditingPost(true); // Enable edit mode
  };

  const handleCancelEdit = () => {
    setIsEditingPost(false); // Exit edit mode
    setUpdatedText(post.text); // Reset the text
  };

  //const isCommenting = false;

  // const handlePostComment = (e) => {
  //   e.preventDefault();
  // };

  //const handleLikePost = () => {};

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
                  value={formData.text}
                  name="text"
                  onChange={handleInputChange}
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
            <div className="flex gap-4 items-center w-2/3 justify-between">
              {/* Comment post */}
              <div
                className="flex gap-1 items-center cursor-pointer group"
                // onClick={() =>
                //   document
                //     .getElementById("comments_modal" + post._id)
                //     .showModal()
                // }
              >
                <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  0
                </span>
              </div>

              {/* Comment Post with Modal Component from DaisyUI */}
              {/* <dialog
                id={`comments_modal${post._id}`}
                className="modal border-none outline-none"
              >
                <div className="modal-box rounded border border-gray-600">
                  <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
                  <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                    {post.comments.length === 0 && (
                      <p className="text-sm text-slate-500">
                        No comments yet 🤔 Be the first one 😉
                      </p>
                    )}
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="flex gap-2 items-start">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img
                              src={
                                comment.user.profileImg ||
                                "/avatar-placeholder.png"
                              }
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="font-bold">
                              {comment.user.fullName}
                            </span>
                            <span className="text-gray-700 text-sm">
                              @{comment.user.username}
                            </span>
                          </div>
                          <div className="text-sm">{comment.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                      {isCommenting ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        "Post"
                      )}
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button className="outline-none">close</button>
                </form>
              </dialog> */}

              {/* Repost post */}
              <div className="flex gap-1 items-center group cursor-pointer">
                <BiRepost className="w-6 h-6  text-slate-500 group-hover:text-green-500" />
                <span className="text-sm text-slate-500 group-hover:text-green-500">
                  0
                </span>
              </div>

              {/* Like post */}
              <div
                className="flex gap-1 items-center group cursor-pointer"
                // onClick={handleLikePost}
              >
                {!isLiked && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                )}
                {isLiked && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
                )}

                <span
                  className={`text-sm text-slate-500 group-hover:text-pink-500 ${
                    isLiked ? "text-pink-500" : ""
                  }`}
                >
                  0
                </span>
              </div>
            </div>
            <div className="flex w-1/3 justify-end gap-2 items-center">
              <FaRegBookmark className="w-4 h-4 text-slate-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Post;
