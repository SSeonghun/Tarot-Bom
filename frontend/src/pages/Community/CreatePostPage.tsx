import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Anonymous'); // 기본값으로 "Anonymous" 설정
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  // 로그인 여부를 확인하는 함수 (예시, 실제로는 API 호출 등을 통해 확인)
  useEffect(() => {
    const isLoggedIn = true; // 이 값은 실제 로그인 상태에 따라 설정되어야 합니다.
    const loggedInUser = 'User123'; // 이 값은 실제 로그인된 사용자에 의해 설정되어야 합니다.
    
    if (isLoggedIn) {
      setAuthor(loggedInUser);
    } else {
      setAuthor('Anonymous');
    }
    
    // 현재 날짜로 초기화
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 API 호출을 통해 새 게시글을 서버에 저장할 수 있습니다.
    console.log({ title, content, author, date, category });

    // 게시글 저장 후 목록 페이지로 리디렉션
    navigate('/community');
  };

  const handleGoBack = () => {
    // 뒤로 가기
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Create New Post</h1>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Back
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              rows={6}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
            <input
              id="author"
              type="text"
              value={author}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
