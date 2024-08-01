import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  date: string;
}

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('Anonymous'); // 기본값으로 "Anonymous" 설정

  useEffect(() => {
    // 게시글 데이터와 댓글 데이터를 가져오는 API 호출을 여기에 작성합니다.
    const fetchedPost: Post = {
      id: parseInt(id ?? '0'),
      title: 'Sample Post',
      content: 'This is a sample post.',
      author: 'Alice',
      date: '2023-01-01',
      category: 'Technology',
    };

    const fetchedComments: Comment[] = [
      { id: 1, postId: parseInt(id ?? '0'), author: 'Bob', content: 'Great post!', date: '2023-01-02' },
      { id: 2, postId: parseInt(id ?? '0'), author: 'Charlie', content: 'Thanks for sharing!', date: '2023-01-03' },
    ];

    setPost(fetchedPost);
    setComments(fetchedComments);
  }, [id]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 댓글 데이터를 서버에 저장하는 로직을 여기에 작성합니다.
    const newCommentData: Comment = {
      id: comments.length + 1,
      postId: parseInt(id ?? '0'),
      author,
      content: newComment,
      date: new Date().toISOString().split('T')[0],
    };
    setComments([...comments, newCommentData]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
        {post && (
          <>
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-4">By {post.author} on {post.date}</p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Content</h2>
              <p>{post.content}</p>
            </div>
          </>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Comments</h2>
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <p className="text-gray-800 font-semibold">{comment.author} <span className="text-gray-500">on {comment.date}</span></p>
                <p className="mt-2">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleCommentSubmit} className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Add a Comment</h2>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            rows={4}
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetailPage;
