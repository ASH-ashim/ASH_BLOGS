import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { setBlog } from '@/redux/blogSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreateBlog = () => {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const { blog } = useSelector((store) => store.blog)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const createBlogHandler = async () => {
    if (!title.trim() || !category) {
      toast.error('Please provide both title and category.')
      return
    }
    try {
      setLoading(true)
      const res = await axios.post(
        `https://ash-blogs.onrender.com/api/v1/blog/`,
        { title, category },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      if (res.data.success) {
        dispatch(setBlog([...blog, res.data.blog]))
        navigate(`/dashboard/write-blog/${res.data.blog._id}`)
        toast.success(res.data.message)
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-6 pt-24 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-3xl p-10 dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-3xl font-extrabold mb-3 text-gray-900 dark:text-gray-100">
          Let's Create Your Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Start your blogging journey with a catchy title and category.
        </p>
        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="font-semibold text-gray-800 dark:text-gray-200">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Your Blog Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white dark:bg-gray-700"
              aria-required="true"
            />
          </div>
          <div>
            <Label className="font-semibold text-gray-800 dark:text-gray-200" htmlFor="category-select">
              Category
            </Label>
            <Select onValueChange={setCategory} value={category} aria-label="Select category">
              <SelectTrigger id="category-select" className="w-64 bg-white dark:bg-gray-700">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                  <SelectItem value="philosophy">Philosophy</SelectItem>
                  <SelectItem value="New Trends">New Trends</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={createBlogHandler}
              disabled={loading}
              className={`${loading ? 'cursor-not-allowed opacity-70' : ''}`}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait...
                </>
              ) : (
                'Create Blog'
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CreateBlog
