import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { IoIosShareAlt } from "react-icons/io";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner';


const BlogView = () => {
    const params = useParams()
    const blogId = params.blogId
    const { blog } = useSelector(store => store.blog)
    const { user } = useSelector(store => store.auth)

    const selectedBlog = blog.find(b => b._id === blogId);
    
    const [blogLike, setBlogLike] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (selectedBlog) {
        setBlogLike(selectedBlog.likes.length);
        setLiked(selectedBlog.likes.includes(user?._id) || false);
        }
    }, [selectedBlog, user]);

    const changeTimeFormat = (isDate) => {
    const date = new Date(isDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    return formattedDate;
    }
    const dispatch = useDispatch()

    const handleShare = (blogId) => {
        const blogUrl = `${window.location.origin}/blogs/${blogId}`

        if(navigator.share) {
            navigator.share({
                title: "Check Out this blog!",
                text: "Read this amazing blog post",
                url: blogUrl,
            }).then(() => console.log("Blog Shared Successfully")
        ).catch((err) => console.error("Error Sharing the blog", err))
        } else {
            navigator.clipboard.writeText(blogUrl).then(() => {
                toast.success("Blog link copied to clipboard")
            })
        }
    }
    
    if (!selectedBlog) {
        return (
        <div className="pt-14 text-center text-lg">
            <p>Blog not found. Please check the URL or try again later.</p>
        </div>
        );
    }
    
    return (
    <div className='pt-14'>
        <div className='max-w-6xl mx-auto p-10'>
        <Breadcrumb>
            <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
            </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                <Link to="/blogs">Blogs</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
            </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <div className='my-8'>
            <h1 className='text-4xl font-bold tracking-tight mb-4'>
            {selectedBlog.title}
            </h1>

            <div className='flex items-center justify-between flex-wrap gap-4'>
            <div className='flex items-center space-x-4'>
                <Avatar>
                <AvatarImage src={selectedBlog.author.photoUrl} alt="author" />
                <AvatarFallback>ASH</AvatarFallback>
                </Avatar>
                <div className='flex flex-row gap-2'>
                <p className='font-medium'>
                    {selectedBlog.author.firstName} {selectedBlog.author.lastName}
                </p>
                </div>
            </div>
            <p className='text-sm text-muted-foreground'>Published on {changeTimeFormat(selectedBlog.createdAt)}</p>
            </div>
        </div>
        <div className='mb-8 rounded-lg overflow-hidden'>
            <img src={selectedBlog.thumbnail} 
            alt='thumbnail' width={1000} 
            height={500}
            className='w-full object-cover'
            />
            <p className='text-sm text-muted-foreground mt-2 font:extrabold'>{selectedBlog.subtitle}</p>
        </div>
        <p dangerouslySetInnerHTML={{__html: selectedBlog.description}}/>
        <div className='mt-10'>
            <div className='flex flex-wrap gap-2 mb-8'>
                <Badge variant="secondary">ASH</Badge>
                <Badge variant="secondary">Developer</Badge>
            </div>
            </div>
    </div>
    </div>
    )
}

export default BlogView