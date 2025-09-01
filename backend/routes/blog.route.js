import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';
import { createBlog, deleteBlog,  getOwnBlogs, getPublishedBlog, togglePublishedBlog, updateBlog } from '../controllers/blog.contraller.js';

const router = express.Router();

router.route("/").post(isAuthenticated, createBlog);
router.route("/:blogId").put(isAuthenticated,singleUpload, updateBlog);
router.route('/get-my-blogs').get(isAuthenticated, getOwnBlogs);
router.route('/delete/:id').delete(isAuthenticated, deleteBlog);

router.route("/get-published-blogs").get(getPublishedBlog)
router.route("/:blogId").patch(togglePublishedBlog)

export default router;