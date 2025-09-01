import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from '../components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setBlog } from '@/redux/blogSlice'
import { BsThreeDotsVertical } from "react-icons/bs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Yourblog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blog } = useSelector(store => store.blog);

    const getOwnBlog = async () => {
    try {
        const res = await axios.get(`https://ashim-blogs.onrender.com/api/v1blog/get-my-blogs`, {
        withCredentials: true
        });
        if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
        }
    } catch (error) {
        console.error(error);
    }
    };

    const deleteBlog = async (id) => {
    try {
        const res = await axios.delete(`https://ashim-blogs.onrender.com/api/v1blog/delete/${id}`, { withCredentials: true });
        if (res.data.success) {
        const updatedBlogData = blog.filter((b) => b._id !== id);
        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went Wrong");
    }
    };

    useEffect(() => {
    getOwnBlog();
    }, []);

    const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-GB");
    };

    return (
    <div className='pb-10 pt-20 md:ml-[320px] min-h-screen'>
        <div className='max-w-6xl mx-auto mt-8'>
        <Card className='w-full p-5 space-y-2 dark:bg-gray-800 overflow-x-auto'>
            <Table className='min-w-full table-auto'>
            <TableCaption>A list of your Blogs.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className='whitespace-nowrap'>Title</TableHead>
                <TableHead className='whitespace-nowrap'>Category</TableHead>
                <TableHead className='whitespace-nowrap'>Date</TableHead>
                <TableHead className='text-center whitespace-nowrap'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {blog?.map((item, index) => (
                <TableRow key={index}>
                    <TableCell className="flex items-center gap-4">
                    <img
                        src={item.thumbnail}
                        className='w-20 rounded-md hidden md:block'
                        alt='Blog Thumbnail'
                    />
                    <h1
                        onClick={() => navigate(`/blogs/${item._id}`)}
                        className="
                        hover:underline cursor-pointer 
                        truncate max-w-[30px] sm:max-w-[20px] 
                        md:max-w-none md:whitespace-normal md:overflow-visible
                        "
                    >
                        {item.title}
                    </h1>
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>{item.category}</TableCell>
                    <TableCell className='whitespace-nowrap'>{formatDate(item.createdAt)}</TableCell>
                    <TableCell className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                        <BsThreeDotsVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/write-blog/${item._id}`)}>
                            <Edit className='mr-2 h-4 w-4' /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => deleteBlog(item._id)}
                            className='text-red-800'
                        >
                            <Trash className='mr-2 h-4 w-4' /> Delete
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </Card>
        </div>
    </div>
    );
};

export default Yourblog;
