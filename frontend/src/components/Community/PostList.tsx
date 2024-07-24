import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string; // 추가된 필드
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Category</th> {/* 열 제목 변경 */}
            <th className="py-2 px-4 border-b text-left">Title</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleRowClick(post.id)}
            >
              <td className="py-2 px-4 border-b text-center">{post.category}</td> {/* 카테고리 표시 */}
              <td className="py-2 px-4 border-b text-left">{post.title}</td>
              <td className="py-2 px-4 border-b text-center">{post.author}</td>
              <td className="py-2 px-4 border-b text-center">{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
