import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Comments = () => {
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getTotalComments = async () => {
    try {
      const res = await axios.get(
        'https://ash-blogs.onrender.com/api/v1/comment/my-blogs/comments',
        { withCredentials: true }
      );
      if (res.data.success) {
        setAllComments(res.data.comments);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTotalComments();
  }, []);

  return (
    <div className="pb-10 pt-20 md:ml-[320px] min-h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          {loading ? (
            <p className="text-center py-5">Loading comments...</p>
          ) : allComments.length === 0 ? (
            <p className="text-center py-5">No comments found.</p>
          ) : (
            <Table>
              <TableCaption>A list of your recent comments.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Blog Title</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allComments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell className="flex gap-4 items-center">
                      {comment.postId?.title || 'Untitled'}
                    </TableCell>
                    <TableCell>{comment.content || 'No content'}</TableCell>
                    <TableCell>{comment.userId?.firstName || 'Unknown'}</TableCell>
                    <TableCell className="flex gap-3 items-center justify-center">
                      <Eye
                        className="cursor-pointer"
                        onClick={() => navigate(`/blogs/${comment.postId?._id}`)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Comments;
