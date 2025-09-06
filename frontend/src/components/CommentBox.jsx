import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setBlog } from '@/redux/blogSlice';
import { setComment } from '@/redux/commentSlice';
import { Edit, Trash2 } from 'lucide-react';
import { BsThreeDots } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CommentBox = ({ selectedBlog }) => {
    const { user } = useSelector(store => store.auth);
    const { comment } = useSelector(store => store.comment);
    const { blog } = useSelector(store => store.blog);

    const [content, setContent] = useState("");
    const [replyText, setReplyText] = useState("");
    const [activeReplyId, setActiveReplyId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");

    const dispatch = useDispatch();

    // --------------------
    // Handlers
    // --------------------
    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setContent(inputText);
        } else {
            setContent('');
        }
    };

    const handleReplyClick = (commentId) => {
        setActiveReplyId(activeReplyId === commentId ? null : commentId);
        setReplyText('');
    };

    const getAllComments = async () => {
        try {
            const res = await axios.get(
                `https://ash-blogs.onrender.com/api/v1/comment/${selectedBlog._id}/comment/all`
            );
            dispatch(setComment(res.data.comments));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (selectedBlog?._id) getAllComments();
    }, [selectedBlog?._id]);

    const commentHandler = async () => {
        if (!content.trim()) return toast.error("Comment cannot be empty");
        try {
            const res = await axios.post(
                `https://ash-blogs.onrender.com/api/v1/comment/${selectedBlog._id}/create`,
                { content },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                dispatch(setComment(updatedCommentData));

                const updatedBlogData = blog.map(p =>
                    p._id === selectedBlog._id ? { ...p, comments: updatedCommentData } : p
                );
                dispatch(setBlog(updatedBlogData));

                toast.success(res.data.message);
                setContent("");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add comment");
        }
    };

    const replyHandler = async (commentId) => {
        if (!replyText.trim()) return toast.error("Reply cannot be empty");
        try {
            const res = await axios.post(
                `https://ash-blogs.onrender.com/api/v1/comment/${commentId}/reply`,
                { content: replyText },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            if (res.data.success) {
                await getAllComments();
                toast.success(res.data.message);
                setReplyText("");
                setActiveReplyId(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to reply");
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const res = await axios.delete(
                `https://ash-blogs.onrender.com/api/v1/comment/${commentId}/delete`,
                { withCredentials: true }
            );
            if (res.data.success) {
                const updatedCommentData = comment.filter(item => item._id !== commentId);
                dispatch(setComment(updatedCommentData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete comment");
        }
    };

    const editCommentHandler = async (commentId) => {
        if (!editedContent.trim()) return toast.error("Edited content cannot be empty");
        try {
            const res = await axios.put(
                `https://ash-blogs.onrender.com/api/v1/comment/${commentId}/edit`,
                { content: editedContent },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            if (res.data.success) {
                const updatedCommentData = comment.map(item =>
                    item._id === commentId ? { ...item, content: editedContent } : item
                );
                dispatch(setComment(updatedCommentData));
                toast.success(res.data.message);
                setEditingCommentId(null);
                setEditedContent('');
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to edit comment");
        }
    };

    const likeCommentHandler = async (commentId) => {
        try {
            const res = await axios.get(
                `https://ash-blogs.onrender.com/api/v1/comment/${commentId}/like`,
                { withCredentials: true }
            );
            if (res.data.success) {
                const updatedCommentList = comment.map(item =>
                    item._id === commentId ? res.data.updatedComment : item
                );
                dispatch(setComment(updatedCommentList));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to like comment");
        }
    };

    // --------------------
    // Render
    // --------------------
    return (
        <div>
            {/* Current User */}
            <div className='flex gap-4 mb-4 items-center'>
                <Avatar>
                    <AvatarImage src={user.photoUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h3 className='font-semibold'>{user.firstName} {user.lastName}</h3>
            </div>

            {/* Add New Comment */}
            <div className='flex gap-3'>
                <Textarea
                    placeholder="Leave a comment"
                    className="bg-gray-100 dark:bg-gray-800"
                    onChange={changeEventHandler}
                    value={content}
                />
                <Button onClick={commentHandler}><LuSend /></Button>
            </div>

            {/* Comments List */}
            {comment.length > 0 && (
                <div className='mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md'>
                    {comment.map(item => (
                        <div key={item._id} className='mb-4'>
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-3 items-start'>
                                    <Avatar>
                                        <AvatarImage src={item?.userId?.photoUrl} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='mb-2 space-y-1 md:w-[400px]'>
                                        <h1 className='font-semibold'>
                                            {item?.userId?.firstName} {item?.userId?.lastName} 
                                            <span className='text-sm ml-2 font-light'>yesterday</span>
                                        </h1>

                                        {/* Edit Mode */}
                                        {editingCommentId === item._id ? (
                                            <>
                                                <Textarea
                                                    value={editedContent}
                                                    onChange={e => setEditedContent(e.target.value)}
                                                    className="mb-2 bg-gray-200 dark:bg-gray-700"
                                                />
                                                <div className="flex py-1 gap-2">
                                                    <Button size="sm" onClick={() => editCommentHandler(item._id)}>Save</Button>
                                                    <Button size="sm" variant="outline" onClick={() => setEditingCommentId(null)}>Cancel</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <p>{item?.content}</p>
                                        )}

                                        {/* Actions */}
                                        <div className='flex gap-5 items-center'>
                                            {/* Like */}
                                            <div className='flex gap-2 items-center cursor-pointer' onClick={() => likeCommentHandler(item._id)}>
                                                {item.likes.includes(user._id) ? <FaHeart fill='red' /> : <FaRegHeart />}
                                                <span>{item.numberOfLikes}</span>
                                            </div>

                                            {/* Reply */}
                                            <p onClick={() => handleReplyClick(item._id)} className='text-sm cursor-pointer'>Reply</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Dropdown for edit/delete */}
                                {user._id === item?.userId?._id && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><BsThreeDots /></DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[180px]">
                                            <DropdownMenuItem onClick={() => {
                                                setEditingCommentId(item._id);
                                                setEditedContent(item.content);
                                            }}><Edit />Edit</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-500" onClick={() => deleteComment(item._id)}><Trash2 />Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>

                            {/* Reply Input */}
                            {activeReplyId === item._id && (
                                <div className='flex gap
