import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import { 
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAllBlogs,
  getMyTotalBlogLikes,
  getOwnBlogs,
  getPublishedBlog,
  likeBlog,
  togglePublishBlog,
  updateBlog 
} from "../controllers/blog.controller.js";

const router = express.Router();

// Create blog (with file upload)
router.route("/").post(isAuthenticated, singleUpload, createBlog);

// Update blog (with file upload)
router.route("/:blogId").put(isAuthenticated, singleUpload, updateBlog);

// Toggle publish blog (requires authentication)
router.route("/:blogId/publish").patch(isAuthenticated, togglePublishBlog);

// Get all blogs
router.route("/get-all-blogs").get(getAllBlogs);

// Get published blogs
router.route("/get-published-blogs").get(getPublishedBlog);

// Get own blogs
router.route("/get-own-blogs").get(isAuthenticated, getOwnBlogs);

// Delete blog
router.route("/delete/:id").delete(isAuthenticated, deleteBlog);

// Like/Dislike blog
router.get("/:id/like", isAuthenticated, likeBlog);
router.get("/:id/dislike", isAuthenticated, dislikeBlog);

// Get total likes for user's blogs
router.get("/my-blogs/likes", isAuthenticated, getMyTotalBlogLikes);

export default router;
