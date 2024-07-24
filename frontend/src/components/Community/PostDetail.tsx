import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // 실제 데이터를 가져오는 API 호출을 할 수 있습니다.
    // 예시로 하드코딩된 데이터를 사용합니다.
    const fetchedPosts: Post[] = [
      { id: 1, title: 'First Post', content: 'This is the first post.', author: 'Alice', date: '2023-01-01' },
      { id: 2, title: 'Second Post', content: 'This is the second post.', author: 'Bob', date: '2023-01-02' },
      { id: 3, title: 'Third Post', content: 'This is the third post.', author: 'Charlie', date: '2023-01-03' },
      { id: 4, title: 'Fourth Post', content: 'This is the fourth post.', author: 'David', date: '2023-01-04' },
      { id: 5, title: 'Fifth Post', content: 'This is the fifth post.', author: 'Eve', date: '2023-01-05' },
      { id: 6, title: 'Sixth Post', content: 'This is the sixth post.', author: 'Frank', date: '2023-01-06' },
      { id: 7, title: 'Seventh Post', content: 'This is the seventh post.', author: 'Grace', date: '2023-01-07' },
      { id: 8, title: 'Eighth Post', content: 'This is the eighth post.', author: 'Hank', date: '2023-01-08' },
      { id: 9, title: 'Ninth Post', content: 'This is the ninth post.', author: 'Ivy', date: '2023-01-09' },
      { id: 10, title: 'Tenth Post', content: 'This is the tenth post.', author: 'Jack', date: '2023-01-10' },
    ];
    
    // id가 문자열로 되어있으므로 숫자로 변환
    const postId = id ? parseInt(id) : NaN;
    const post = fetchedPosts.find(p => p.id === postId);
    setPost(post || null);
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="mb-4"><strong>Author:</strong> {post.author}</p>
        <p className="mb-4"><strong>Date:</strong> {post.date}</p>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetail;
