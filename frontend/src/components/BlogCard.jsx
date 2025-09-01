import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const date = new Date(blog?.createdAt);
    const formattedDate = date.toLocaleDateString('en-GB');

    return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-600 p-4 sm:p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 mx-auto max-w-md sm:max-w-lg lg:max-w-xl">
        <img
        src={blog?.thumbnail}
        alt={blog?.title || 'Blog thumbnail'}
        />
        <p className="text-xs sm:text-sm mt-3 text-muted-foreground dark:text-gray-400">
        {blog?.category} | {formattedDate}
        </p>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mt-2 text-gray-900 dark:text-gray-100">
        {blog?.title}
        </h2>
      {/* Author Section */}
        {blog?.author && (
        <div className="flex items-center gap-3 mt-3">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
            <AvatarImage src={blog.author.photoUrl} alt={`${blog.author.firstName} ${blog.author.lastName}`} />
            <AvatarFallback>
                {blog.author.firstName?.[0]}
                {blog.author.lastName?.[0]}
            </AvatarFallback>
            </Avatar>
            <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            {blog.author.firstName} {blog.author.lastName}
            </p>
        </div>
        )}
        <Button
        className="mt-4 px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg w-full sm:w-auto"
        onClick={() => navigate(`/blogs/${blog._id}`)}
        >
        Read More
        </Button>
    </div>
    );
};

export default BlogCard;