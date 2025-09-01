import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const BlogCardList = ({ blog }) => {
    const navigate = useNavigate();
    return (
    <div className="bg-white dark:bg-gray-700 dark:border-gray-600 flex flex-col sm:flex-row sm:gap-6 lg:gap-10 mb-6 p-4 sm:p-6 rounded-2xl transition-all shadow-lg hover:shadow-xl mx-auto max-w-4xl">
        <div className="w-full sm:w-1/3 lg:w-[300px] flex-shrink-0">
        <img
            src={blog.thumbnail}
            alt={blog.title || 'Blog thumbnail'}
            className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"

        />
        </div>
        <div className="flex-1 mt-4 sm:mt-0">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            {blog.title}
        </h2>
        <h3 className="text-sm sm:text-base lg:text-lg text-gray-400 mt-2 italic font-medium">
            {blog.subtitle}
        </h3>
        <Button
            className="mt-4 px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg"
            onClick={() => navigate(`/blogs/${blog._id}`)}
        >
            Read More
        </Button>
        </div>
    </div>
    );
};

export default BlogCardList;