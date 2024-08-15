import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../../components/Community/PostList";
import { boardList } from "../../API/boardsApi";

interface Post {
  boardId: number;
  title: string;
  content: string;
  nickname: string;
  createdTime: string;
  category: string;
}

// TODO : axios!!!!!!!!! 데이터 뿌려주기

const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const postsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPosts = async () => {
      try {
        const response = await boardList(); // 수정된 boardList 호출
        // 데이터가 배열인지 확인
        if (Array.isArray(response.data)) {
          setPosts(response.data);
          // console.log(response.data);
        } else {
          console.error("API 응답이 배열이 아닙니다:", response.data);
        }
      } catch (error) {
        console.error("게시글 목록 조회 실패", error);
      }
    };

    fetchPosts();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  // posts가 배열인지 확인 후 filter
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // filteredPosts가 배열일 경우에만 slice
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = Array.isArray(filteredPosts)
    ? filteredPosts.slice(firstPostIndex, lastPostIndex)
    : [];

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const goToCreatePostPage = () => {
    navigate("/create-post");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md mt-[70px]">
        <div className="flex justify-between items-center mb-auto">
          <h1 className="text-2xl font-bold">게시판</h1>
          <button
            onClick={goToCreatePostPage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            글 쓰기
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mt-3 mb-2"
          >
            카테고리별 필터
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="All">전체</option>
            <option value="B01">공지사항</option>
            <option value="B02">카드</option>
            <option value="B03">리딩경험담</option>
            <option value="B04">기타</option>
          </select>
        </div>

        <PostList posts={currentPosts} />
        <Pagination
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

interface PaginationProps {
  totalPages: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  paginate,
  currentPage,
}) => {
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
            currentPage === number
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
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
