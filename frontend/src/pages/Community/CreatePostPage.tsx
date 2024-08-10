import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/store';
import axios from 'axios'; // axios import 추가



const { boardWrite } = require('../../API/boardsApi'); // API 호출을 위한 import 추가

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const store = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // API 호출을 통해 새 게시글을 서버에 저장
      const response = await boardWrite(
        store.userInfo?.memberId,
        title,
        content,
        category,
      );

      // console.log('게시글 저장 성공:', response.data);
      // 게시글 저장 후 목록 페이지로 리디렉션
      navigate('/community');
    } catch (error) {
      console.error('게시글 저장 실패:', error);
      // 오류 처리 (예: 사용자에게 알림)
    }
  };

  const handleGoBack = () => {
    // 뒤로 가기
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md mt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">새 글 쓰기</h1>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mt-3"
          >
            뒤로
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              제목
            </label>
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
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              내용
            </label>
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
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              카테고리
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            >
              {/* <option value="">Select a category</option> */}
              {/* <option value="B01">공지사항</option> */}
              <option value="B02">카드</option>
              <option value="B03">리딩경험담</option>
              <option value="B04">기타</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            글 쓰기
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
