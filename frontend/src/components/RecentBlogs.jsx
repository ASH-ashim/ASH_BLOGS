import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setBlog } from '@/redux/blogSlice'
import BlogCardList from './BlogCardList'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const RecentBlogs = () => {
    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)
    const navigate = useNavigate()

    useEffect(() => {
        const getAllPublishedBlogs = async () => {
            try {
                const res = await axios.get(
                    `https://ash-blogs.onrender.com/api/v1/blog/get-published-blogs`,
                    { withCredentials: true }
                )
                if (res.data.success) {
                    dispatch(setBlog(res.data.blogs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        getAllPublishedBlogs()
    }, [dispatch])

    return (
        <div className='bg-gray-100 dark:bg-gray-950 pb-10'>
            <div className='max-w-6xl mx-auto flex flex-col space-y-4 items-center'>
                <h1 className='text-4xl font-extrabold pt-10'>Recent Blogs</h1>
                <hr className='w-32 border-2 border-red-700 rounded-full' />
            </div>

            <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10 px-5 md:px-0'>
                {/* Blogs List */}
                <div className='flex-none w-full md:w-[760px] flex flex-col gap-6'>
                    {blog?.slice(0, 4)?.map((item) => (
                        <BlogCardList key={item._id} blog={item} />
                    ))}
                </div>

                {/* Sidebar */}
                <div className='bg-white hidden md:block dark:bg-gray-700 w-full h-182 md:w-[350px] p-5 rounded-md'>
                    <h1 className='text-2xl font-semibold'>Popular Categories</h1>
                    <div className='my-5 flex flex-wrap gap-3 '>
                        {["AI", "Personal", "New Trends", "Blockchain", "Philosophy"].map((item, index) => (
                            <Badge onClick ={() => navigate(`/search?q=${item}`)} key={index} className='cursor-pointer'>{item}</Badge>
                        ))}
                    </div>

                    <h1 className='text-xl font-semibold'>Subscribe to newsletter</h1>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Get latest blog posts first</p>
                    <div className='flex flex-col sm:flex-row gap-2 mt-5'>
                        <Input
                            type='email'
                            placeholder='Enter your email'
                            className='flex-1 h-10 rounded-md border bg-gray-200 dark:bg-gray-800 py-2 px-3 text-gray-900 dark:text-gray-200'
                        />
                        <Button>Subscribe</Button>
                    </div>

                    <h1 className='text-xl mt-6 font-semibold'>Suggested Blogs</h1>
                    <ul className='space-y-4 mt-4'>
                        {[
                            "1) The Future of Tech Industry",
                            "2) How Nextjs is better than Reactjs",
                            "3) The art of sales",
                            "4) The Future of Trust: How AI and Blockchain Redefine Business Ethics",
                            "5) Decentralized Thinking: Philosophical Lessons from Blockchain for Modern Entrepreneurs",
                            "6) When Machines Decide: AI, Blockchain, and the Philosophy of Automated Economies",
                            "7) Beyond Profit: How Decentralization Challenges Traditional Business Wisdom",
                            "8) AI, Blockchain, and the New Paradigm of Digital Morality in Business",
                        ].map((title, idx) => (
                            <li key={idx} className='text-sm dark:text-gray-100 hover:underline cursor-pointer'>
                                {title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RecentBlogs
