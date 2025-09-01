import BlogCard from '@/components/BlogCard';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'

const SearchList = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const { blog } = useSelector(store => store.blog)

    const filterBlogs = blog.filter(
        (blog) => 
            blog.title.toLowerCase().includes(query.toLowerCase()) ||
            blog.subtitle.toLowerCase().includes(query.toLowerCase()) ||
            blog.category.toLowerCase() === query.toLowerCase()
    )

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [query])

    return (
        <div className='pt-20 md:pt-32 px-4 sm:px-6 min-h-screen'>
            <div className='max-w-4xl mx-auto'>
                <h2 className='mb-4 sm:mb-5 text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200'>
                    Search Results for: "{query}"
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 my-6 sm:my-10'>
                    {filterBlogs.length > 0 ? (
                        filterBlogs.map((blog, index) => (
                            <BlogCard key={index} blog={blog} />
                        ))
                    ) : (
                        <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 col-span-full text-center'>
                            No blogs found for "{query}".
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchList