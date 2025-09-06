import BlogCard from '@/components/BlogCard'
import { setBlog } from '@/redux/blogSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Blogs = () => {
  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axios.get(`https://ash-blogs.onrender.com/api/v1/blog/get-published-blogs`, {
          withCredentials: true,
        })         
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
    <div className="pt-16 min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold pt-10">
            All Blogs
        </h1>
        <hr className="w-24 border-2 border-red-700 rounded-full mx-auto"/>
        </div>

        <div className="max-w-6xl mx-auto py-10 grid gap-8
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3">
        {blog?.map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
        ))}
        </div>
    </div>
    )
}

export default Blogs
