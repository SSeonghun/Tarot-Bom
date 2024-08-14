import React, { useState } from 'react';
import Rating from './Rating'; // Rating 컴포넌트 경로를 맞게 수정하세요

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  readerId: number; // 추가된 부분
  resultId: number; // 추가된 부분
}

const { addReview } = require('../../../API/api');

const ReviewModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, readerId, resultId }) => {
  const [rating, setRating] = useState(0); // 별점 상태
  const [review, setReview] = useState(""); // 리뷰 내용 상태
  const [error, setError] = useState(""); // 에러 메시지 상태

  if (!isOpen) return null;

  const handleSubmit = async () => {
    // 별점과 리뷰 내용 필수 확인
    if (rating <= 0 || review.trim() === "") {
      setError("별점과 리뷰 내용을 모두 입력해 주세요.");
      return;
    }

    setError(""); // 에러 초기화

    try {
      // 리뷰 제출 API 호출
      await addReview(resultId, readerId, rating, review);

      console.log("리뷰 제출 완료");
      console.log("Selected Rating:", rating);
      console.log("Review Content:", review);
      console.log("Reader ID:", readerId);
      console.log("Result ID:", resultId);

      // 부모 컴포넌트의 onSubmit 호출
      onSubmit();

      // 모달 닫기
      onClose();

      // 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error("리뷰 제출 실패", error);
      setError("리뷰 제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
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
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
