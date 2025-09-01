import { Blog } from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const createBlog = async (req, res) => {
    try {
        const { title, category } = req.body;
        if (!title || !category) {
            return res.status(400).json({ message: "Blog title and category required" });
        }

        const blog = await Blog.create({
            title,
            category,
            author: req.id,
        });

        const populatedBlog = await Blog.findById(blog._id)
            .populate("author", "firstname lastname photoUrl");

        return res.status(201).json({
            success: true,
            blog: populatedBlog,
            message: "Blog created successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to create blog" });
    }
};


export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const {title, subtitle, description, category} = req.body;
        const file = req.file;

        let blog = await Blog.findById(blogId);

        if(!blog) {
            return res.status(404).json({message: "Blog Not Found"})
        }

        let thumbnail;
        if(file) {
            const fileUri  = getDataUri(file);
            thumbnail = await cloudinary.uploader.upload(fileUri);
        }
        const updateData = {title, subtitle, description, category, author:req.id, thumbnail: thumbnail?.secure_url}
        blog = await Blog.findByIdAndUpdate(blogId, updateData, {new: true})
        res.status(200).json({success: true, message: "Blog Updated Successfully", blog})
    } catch (error) {
        console.log(error)
        return res.status(500).json({succss: false, message: "Erro updating the blog"})
    }
}

export const getOwnBlogs = async (req, res) => {
    try {
        const userId = req.id; 
        if (!userId) {
            return res.status(400).json({
                message: "UserId is required",
                success: false,
            });
        }

        const blogs = await Blog.find({ author: userId }).populate({
            path: "author",
            select: "firstName lastName photoUrl",
        });

        return res.status(200).json({
            message: blogs.length === 0 ? "No blogs found" : "Blogs fetched successfully",
            blogs,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching your blogs",
            error: error.message,
            success: false,
        });
    }
};


export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const authorId = req.user?.id || req.id; 

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        if (blog.author.toString() !== authorId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You cannot delete this blog",
            });
        }

        await Blog.findByIdAndDelete(blogId);

        return res.status(200).json({ success: true, message: "Blog deleted successfully" });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting blog",
            error: error.message, 
        });
    }
};

export const getPublishedBlog = async (_, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
            .sort({ createdAt: -1 })
            .populate("author", "firstname lastname photoUrl");

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No published blogs found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Published blogs fetched successfully",
            blogs
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            success: false,
            message: "Failed to get published blogs"
        });
    }
};



export const togglePublishedBlog = async (req, res) => {
    try {
        const {blogId} = req.params;
        const {publish} = req.query;

        const blog = await Blog.findById(blogId);
        if(!blog) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }

        blog.isPublished = !blog.isPublished
        await blog.save();

        const statusMessage = blog.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({success: true, message: `Blog is ${statusMessage}`})
    } catch (error) {
        return res.status(500).json({message: "Failed to update status"})
    }
}

