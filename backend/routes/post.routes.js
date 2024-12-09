import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getUserPosts,
  //getFollowingPosts,
  //getLikedPosts,
  //likeUnlikePost,
  //commentOnPost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.put("/:id", protectRoute, updatePost);
router.get("/all", getAllPosts);
router.get("/user/:username", getUserPosts);
//router.get("/following", protectRoute, getFollowingPosts);
//router.get("/likes/:id", protectRoute, getLikedPosts);
//router.post("/like/:id", protectRoute, likeUnlikePost);
//router.post("/comment/:id", protectRoute, commentOnPost);

export default router;
