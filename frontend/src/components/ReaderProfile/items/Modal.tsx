import React from 'react';

interface Review {
  reviewReaderId: number;
  seekerId: number;
  content: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    reviews,
}) => {
  if (!isOpen) return null;

  const handleBackgroundClick = () => {
    onClose(); // 배경 클릭 시 모달 닫기
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 모달 내부 클릭 시 이벤트 전파 방지
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick} // 배경 클릭 시 모달 닫기
    >
      <div 
        className="bg-gray-300 opacity-100 rounded-lg p-5 relative"
        onClick={handleModalClick} // 모달 내부 클릭 시 이벤트 전파 방지
      >
        <button onClick={onClose} className="absolute top-2 right-2">X</button>
        <h2 className="text-xl font-bold">전체 리뷰</h2>
        <div className="mt-4">
          {reviews.map((review) => (
            <div key={review.reviewReaderId} className="border-b py-2">
              <p><strong>리뷰 ID:</strong> {review.reviewReaderId}</p>
              <p><strong>내용:</strong> {review.content}</p>
            </div>
          ))}
        </div>
        <button className="flex ml-auto mt-4 bg-gray-500 text-white p-2 rounded" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;
