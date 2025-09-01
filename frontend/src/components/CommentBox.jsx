import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Textarea } from './ui/textarea';
import { IoIosSend } from "react-icons/io";
import { Button } from './ui/button';
import axios from 'axios';
import { setComment } from '@/redux/commentSlice';

const CommentBox = ({ selectedBlog }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const { comment } = useSelector(store => store.comment);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const getAllCommentsOfBlog = async () => {
            try {
            const res = await axios.get(
    `https://ash-blogs.onrender.com/api/v1//comments/${selectedBlog._id}/comment/all`
);
                const data = res.data.comments;
                dispatch(setComment(data));
            } catch (error) {
                console.log(error);
            }
        };
        if (selectedBlog?._id) {
            getAllCommentsOfBlog();
        }
    }, [selectedBlog?._id, dispatch]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const res = await axios.post(
                `https://ash-blogs.onrender.com/api/v1/comments/create`,
                { blogId: selectedBlog._id, text: newComment },
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(setComment([res.data.comment, ...comment]));
                setNewComment("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className='flex gap-4 mb-4 items-center'>
                <Avatar>
                    <AvatarImage src={user?.photoUrl} />
                    <AvatarFallback>
                        {user?.firstName?.[0]}{user?.lastName?.[0] || "?"}
                    </AvatarFallback>
                </Avatar>
                <h1 className='font-semibold'>
                    {user ? `${user.firstName} ${user.lastName}` : "Guest"}
                </h1>
            </div>
            <div className='flex gap-3'>
                <Textarea
                    placeholder="Leave a beautiful Comment here"
                    className='bg-gray-100 dark:bg-gray-800'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button onClick={handleCommentSubmit}><IoIosSend /></Button>
            </div>
            {comment?.length > 0 && (
                <div className='mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md'>
                    {comment.map((item) => (
                        <div key={item._id} className='mb-4'>
                            <div className='flex items-center gap-3'>
                                <Avatar>
                                    <AvatarImage src={item?.userId?.photoUrl}/>
                                    <AvatarFallback>
                                        {item?.userId?.firstName?.[0]}{item?.userId?.lastName?.[0] || "?"}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className='font-semibold'>
                                        {item?.userId?.firstName} {item?.userId?.lastName}
                                        <span className='text-sm ml-2 text-gray-500 dark:text-gray-400'>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </span>
                                    </h1>
                                    <p className='mt-2'>{item.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentBox;