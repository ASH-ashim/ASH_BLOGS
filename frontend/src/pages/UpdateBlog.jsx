import { Label } from '@/components/ui/label'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import JoditEditor from 'jodit-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import { setBlog } from '@/redux/blogSlice'


const UpdateBlog = () => {
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [publish, setPublish] = useState(false);
  const params = useParams();
  const id = params.blogId;
  const { blog, loading } = useSelector(store => store.blog);
  const selectBlog = blog.find(blog => blog._id === id);

  const [blogData, setBlogData] = useState({
    title: selectBlog?.title || "",
    subtitle: selectBlog?.subtitle || "",
    description: selectBlog?.description || "",
    category: selectBlog?.category || "",
    thumbnail: selectBlog?.thumbnail || null
  });

  const [previewThumbnail, setPreviewThumbnail] = useState(selectBlog?.thumbnail || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const selectCategory = (value) => {
    setBlogData({ ...blogData, category: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogData({ ...blogData, thumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateBlogHandler = async () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", blogData.description);
    formData.append("category", blogData.category);
    formData.append("file", blogData.thumbnail);

    try {
      dispatch(setLoading(true));
      const res = await axios.put(`https://ash-blogs.onrender.com/api/v1blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Blog updated successfully");
        console.log(blogData);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const navigate = useNavigate();

  const togglePublish = async (action) => {
    try {
      const res = await axios.patch(
        `https://ash-blogs.onrender.com/api/v1blog/${id}`,
        { action },
        { withCredentials: true }
      );
      if (res.data.success) {
        setPublish(!publish);
        toast.success(res.data.message || "Blog publish status updated");
        navigate('/dashboard/your-blog');
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const removeBlog = async () => {
    try {
      const res = await axios.delete(`https://ash-blogs.onrender.com/api/v1blog/delete/${id}`, { withCredentials: true });
      if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message || "Blog deleted successfully");
        navigate('/dashboard/your-blog');
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className='md:ml-[320px] pt-20 pb-10'>
      <div className='max-w-6xl mx-auto mt-8'>
        <Card className='w-full bg-white dark:bg-gray-800 p-5 -space-y-5'>
          <h1 className='text-4xl font-extrabold'>Blog Information</h1>
          <p>Make changes in your blog here. Create publish to publish your blog.</p>
          <div className='space-x-2'>
            <Button onClick={() => togglePublish(selectBlog?.isPublished ? "false" : "true")}>
              {selectBlog?.isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button onClick={removeBlog} variant="destructive">Remove Blog</Button>
          </div>

          {/* Title */}
          <div className='pt-10'>
            <Label className='mb-2'>Title</Label>
            <Input
              type="text"
              placeholder="Enter the Blog Title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className='dark:border-grey-200'
            />
          </div>

          {/* Subtitle */}
          <div className='pt-10'>
            <Label className='mb-2'>Subtitle</Label>
            <Input
              type="text"
              placeholder="Enter the Subtitle"
              name="subtitle"
              value={blogData.subtitle}
              onChange={handleChange}
              className='dark:border-grey-200'
            />
          </div>

          {/* Description */}
          <div>
            <Label className='mb-2'>Description</Label>
            <JoditEditor
              ref={editor}
              value={blogData.description}
              onChange={(newContent) =>
                setBlogData((prev) => ({ ...prev, description: newContent }))
              }
              className='jodit_toolbar'
            />
          </div>

          {/* Category */}
          <div>
            <Label className='mt-2 mb-2'>Category</Label>
            <Select onValueChange={selectCategory} value={blogData.category}>
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
                  <SelectItem value="Philosophy">Philosophy</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Thumbnail */}
          <div>
            <Label className="mb-2">Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              id="file"
              accept="image/*"
              className='w-fit dark:border-gray-300'
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className='w-64 my-2'
                alt='thumbnail'
              />
            )}
          </div>

          {/* Buttons */}
          <div className='flex gap-4 mt-4'>
            <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
            <Button onClick={updateBlogHandler}>
              {loading ? (
                <>
                  <Loader className='mr-2 w-4 h-4 animate-spin' />
                  Please Wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default UpdateBlog
