import { Blog } from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commenter = req.id;
        const { content } = req.body;

        const blog = await Blog.findById(postId);
        if (!content) {
            return res.status(400).json({
                message: "Text is Required",
                success: false,
            });
        }

        const comment = await Comment.create({
            content,
            userId: commenter,
            postId: postId,
        });

        await comment.populate({
            path: "userId",
            select: "firstName lastName photoUrl",
        });

        blog.comments.push(comment._id);
        await blog.save();

        return res
            .status(201)
            .json({ message: "Comment Added", comment, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating comment", success: false });
    }
};

export const getCommentsOfPost = async (req, res) => {
    try {
        const blogId = req.params.id;
        const comments = await Comment.find({ postId: blogId })
            .populate({ path: "userId", select: "firstName lastName photoUrl" })
            .sort({ createdAt: -1 });

        if (!comments || comments.length === 0) {
            return res.status(404).json({
                message: "No comments found for this blog",
                success: false,
            });
        }

        return res.status(200).json({ success: true, comments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching comments", success: false });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const authorId = req.id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res
                .status(404)
                .json({ success: false, message: "Comment Not Found" });
        }

        if (comment.userId.toString() !== authorId) {
            return res
                .status(403)
                .json({ success: false, message: "Unauthorized" });
        }

        const blogId = comment.postId;

        await Comment.findByIdAndDelete(commentId);

        await Blog.findByIdAndUpdate(blogId, {
            $pull: { comments: commentId },
        });

        res.status(200).json({ message: "Comment Deleted", success: true });
    } catch (error) {
        res.status(500).json({ message: "Error Deleting this comment", success: false });
    }
};

export const editComment = async (req, res) => {
    try {
        const userId = req.id;
        const { content } = req.body;
        const commentId = req.params.id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res
                .status(404)
                .json({ message: "Comment not found", success: false });
        }

        if (comment.userId.toString() !== userId) {
            return res
                .status(403)
                .json({ message: "Unauthenticated", success: false });
        }

        comment.content = content;
        comment.editedAt = new Date(); 

        await comment.save();
        res.status(200).json({ success: true, message: "Comment Edited" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Comment not edited",
            success: false,
            error: error.message,
        });
    }
};

export const likeComment = async (req, res) => {
    try {
        const userId = req.id;
        const commentId = req.params.id;

        const comment = await Comment.findById(commentId).populate("userId");
        if (!comment) {
            return res
                .status(404)
                .json({ success: false, message: "Comment Not found" });
        }

        const alreadyLiked = comment.likes.includes(userId);

        if (alreadyLiked) {
            comment.likes = comment.likes.filter(
                (id) => id.toString() !== userId
            );
            comment.numberOfLikes -= 1;
        } else {
            comment.likes.push(userId);
            comment.numberOfLikes += 1;
        }

        await comment.save();
        res.status(200).json({
            success: true,
            message: alreadyLiked ? "Comment unliked" : "Comment Liked",
            updatedComment: comment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "You can't like the comment",
            error: error.message,
        });
    }
};

export const getAllCommentOnlyBlogs = async (req, res) => {
    try {
        const userId = req.id;
        const myBlogs = await Blog.find({ author: userId }).select("_id");

        const blogIds = myBlogs.map((blog) => blog._id);

        if (blogIds.length === 0) {
            return res.status(200).json({
                success: true,
                totalComments: 0,
                comments: [],
                message: "No Blogs found for this user",
            });
        }

        const comments = await Comment.find({ postId: { $in: blogIds } })
            .populate("userId", "firstName lastName email")
            .populate("postId", "title");

        res.status(200).json({
            success: true,
            totalComments: comments.length,
            comments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to get Comments",
        });
    }
};
