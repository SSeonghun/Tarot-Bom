import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from '../../components/Community/PostList';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string; // 추가된 필드
}

// TODO : axios!!!!!!!!! 데이터 뿌려주기

const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const postsPerPage = 9;
  const navigate = useNavigate(); // useNavigate 훅 추가

  useEffect(() => {
    // 실제 데이터를 가져오는 API 호출을 할 수 있습니다.
    // 예시로 하드코딩된 데이터를 사용합니다.
    const fetchedPosts: Post[] = [
      {
        id: 1,
        title: 'First Post',
        content: 'This is the first post.',
        author: 'Alice',
        date: '2023-01-01',
        category: 'Technology',
      },
      {
        id: 2,
        title: 'Second Post',
        content: 'This is the second post.',
        author: 'Bob',
        date: '2023-01-02',
        category: 'Health',
      },
      {
        id: 3,
        title: 'Third Post',
        content: 'This is the third post.',
        author: 'Charlie',
        date: '2023-01-03',
        category: 'Technology',
      },
      {
        id: 4,
        title: 'Fourth Post',
        content: 'This is the fourth post.',
        author: 'David',
        date: '2023-01-04',
        category: 'Lifestyle',
      },
      {
        id: 5,
        title: 'Fifth Post',
        content: 'This is the fifth post.',
        author: 'Eve',
        date: '2023-01-05',
        category: 'Health',
      },
      {
        id: 6,
        title: 'Sixth Post',
        content: 'This is the sixth post.',
        author: 'Frank',
        date: '2023-01-06',
        category: 'Lifestyle',
      },
      {
        id: 7,
        title: 'Seventh Post',
        content: 'This is the seventh post.',
        author: 'Grace',
        date: '2023-01-07',
        category: 'Technology',
      },
      {
        id: 8,
        title: 'Eighth Post',
        content: 'This is the eighth post.',
        author: 'Hank',
        date: '2023-01-08',
        category: 'Health',
      },
      {
        id: 9,
        title: 'Ninth Post',
        content: 'This is the ninth post.',
        author: 'Ivy',
        date: '2023-01-09',
        category: 'Lifestyle',
      },
      {
        id: 10,
        title: 'Tenth Post',
        content: 'This is the tenth post.',
        author: 'Jack',
        date: '2023-01-10',
        category: 'Technology',
      },
    ];
    setPosts(fetchedPosts);
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // 필터링 시 첫 페이지로 리셋
  };

  const filteredPosts =
    selectedCategory === 'All' ? posts : posts.filter((post) => post.category === selectedCategory);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const goToCreatePostPage = () => {
    navigate('/create-post'); // CreatePostPage로 이동
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md mt-12">
        <div className="flex justify-between items-center mb-auto">
          <h1 className="text-2xl font-bold">Post List</h1>
          <button
            onClick={goToCreatePostPage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Post
          </button>
        </div>

        {/* 분류 선택 UI 추가 */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="All">All</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        <PostList posts={currentPosts} />
        <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
      </div>
    </div>
  );
};

interface PaginationProps {
  totalPages: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, paginate, currentPage }) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {currentPage > 1 && (
        <button
          onClick={() => paginate(currentPage - 1)}
          className="mx-1 px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
        >
          &laquo;
        </button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`mx-1 px-3 py-1 rounded-md ${
            currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => paginate(currentPage + 1)}
          className="mx-1 px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
        >
          &raquo;
        </button>
      )}
    </div>
  );
};

export default PostListPage;
