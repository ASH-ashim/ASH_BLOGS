import { Blog } from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

// Create Blog
export const createBlog = async (req, res) => {
    try {
        const { title, category } = req.body;
        if (!title || !category) {
            return res.status(400).json({ message: "Blog title and category are required." });
        }

        const blog = await Blog.create({
            title,
            category,
            author: req.id
        });

        return res.status(201).json({ success: true, blog, message: "Blog Created Successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create blog" });
    }
};

// Update Blog
export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const { title, subtitle, description, category } = req.body;
        const file = req.file;

        let blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: "Blog not found!" });

        // Check ownership
        if (blog.author.toString() !== req.id) {
            return res.status(403).json({ message: "Unauthorized to update this blog" });
        }

        let thumbnail;
        if (file) {
            const fileUri = getDataUri(file);
            thumbnail = await cloudinary.uploader.upload(fileUri);
        }

        const updateData = {
            title,
            subtitle,
            description,
            category,
            thumbnail: thumbnail?.secure_url,
        };

        blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

        res.status(200).json({ success: true, message: "Blog updated successfully", blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating blog", error: error.message });
    }
};

// Get all blogs
export const getAllBlogs = async (_, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'firstName lastName photoUrl' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: { path: 'userId', select: 'firstName lastName photoUrl' }
            });

        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching blogs", error: error.message });
    }
};

// Get own blogs
export const getOwnBlogs = async (req, res) => {
    try {
        const userId = req.id;
        const blogs = await Blog.find({ author: userId })
            .populate({ path: 'author', select: 'firstName lastName photoUrl' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: { path: 'userId', select: 'firstName lastName photoUrl' }
            });

        return res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching your blogs", error: error.message });
    }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const authorId = req.id;

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        // Ownership check
        if (blog.author.toString() !== authorId) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this blog" });
        }

        await Blog.findByIdAndDelete(blogId);
        await Comment.deleteMany({ postId: blogId });

        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting blog", error: error.message });
    }
};

// Toggle Publish
export const togglePublishBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: "Blog not found!" });

        // Ownership check
        if (blog.author.toString() !== req.id) {
            return res.status(403).json({ success: false, message: "Unauthorized to change publish status" });
        }

        blog.isPublished = !blog.isPublished;
        await blog.save();

        const statusMessage = blog.isPublished ? "Published" : "Unpublished";
        res.status(200).json({ success: true, message: `Blog is ${statusMessage}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update status" });
    }
};
