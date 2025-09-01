import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import React, { useState } from "react";
import { Input } from "../components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setBlog } from "@/redux/blogSlice";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import { Loader2Icon } from "lucide-react";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {blog, loading} = useSelector(store => store.blog)
    console.log(blog)
    const getSelectedCategory = (value) => {
        setCategory(value);
    }

    const createBlogHandle = async () => {
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`http://localhost:3000/api/v1/blog`, {title, category}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            if(res.data.success) {
                if(!blog) {
                    dispatch(setBlog([res.data.blog]))
                    navigate(`/dashboard/write-blog/${res.data.blog._id}`)
                    toast.success(res.data.message)
                }
                dispatch(setBlog([...blog, res.data.blog]))
                navigate(`/dashboard/write-blog/${res.data.blog._id}`)
                toast.success(res.data.message)
            } else {
                toast.error("Something crazy happened");
            }
        } catch (error) {
            console.log(error);
        } finally{
            dispatch(setLoading(false))
        }
    }
    return (
    <div className="p-4 md:pr-20 h-screen md:ml-[320px] pt-20">
        <Card className="md:p-10 p-4 dark:bg-gray-800 -space-x-5">
        <h1 className="text-2xl font-bold ">
            Create and deploy your own blogs !
        </h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <div className="mt-0">
            <div>
            <Label className='mb-2'>Title</Label>
            <Input
                type="text"
                placeholder="What are you writing About?"
                className="bg-white dark:bg-gray-700"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </div>
            <div className="mt-4 mb-5 ">
            <Label className='mb-2'>Category</Label>
            <Select
            onValueChange={getSelectedCategory}
            >
                <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                    <SelectLabel></SelectLabel>
                    <SelectItem value="Full stack development">Full Stack Development</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="New Trends">New Trends</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="AI">Philosophy</SelectItem>
                </SelectGroup>
                </SelectContent>
            </Select>
            </div>
            <div className="flex gap-3">
                <Button disabled={loading} onClick={createBlogHandle}>
                    {
                    loading ? <>
                    <Loader2Icon className="mr-1 animate-spin"/>
                    Please Wait
                    </> : "Create"
                    }
                </Button>
            </div>
        </div>
        </Card>
    </div>
    );
};

export default CreateBlog;
