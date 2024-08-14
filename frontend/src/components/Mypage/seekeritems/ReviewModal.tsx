import React, { useState } from 'react';
import Rating from './Rating'; // Rating 컴포넌트 경로를 맞게 수정하세요

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  readerId: number; // 추가된 부분
  resultId: number; // 추가된 부분
  seekerId: number; // 추가된 부분
}

const { addReview } = require('../../../API/api');

const ReviewModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, readerId, resultId, seekerId }) => {
  const [rating, setRating] = useState(0); // 별점 상태
  const [review, setReview] = useState(""); // 리뷰 내용 상태

  if (!isOpen) return null;

  const handleSubmit = () => {
    // 제출 버튼 클릭 시 처리할 로직
    console.log("리뷰 제출 완료");
    console.log("Selected Rating:", rating);
    console.log("Review Content:", review);
    console.log("Reader ID:", readerId); // 추가된 부분
    console.log("Result ID:", resultId); // 추가된 부분
    addReview(resultId, readerId, rating, review) // 여기서 addReview()를 호출할 때 readerId와 resultId를 함께 전달해야 할 경우, 이 함수에 맞게 호출해야 합니다
    onSubmit(); // 부모 컴포넌트의 onSubmit 호출
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className=" text-center text-xl font-bold mb-4">리뷰 작성</h2>
        <div className="mb-3">
          <p className=" text-sm">별점을 선택하세요:</p>
          <Rating value={rating} onChange={setRating} />
        </div>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows={4}
          placeholder="리뷰를 입력하세요..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
