import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface ReviewItemProps {
  name: string; // 리뷰 작성자 추가
  content: string; // 리뷰 내용
  rating: number; // 평점
  backgroundColor: string; // 배경색
  textColor: string; // 텍스트 색상
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  name,
  content,
  rating,
  backgroundColor,
  textColor,
}) => {
  return (
    <div
      className={`w-[550px] h-[120px] p-4 ${backgroundColor} ${textColor} mb-4 rounded-lg shadow-md transition-transform transform hover:scale-105`}
    >
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="mt-2">{content}</p>
        <div className="mt-auto flex items-center">
          {/* 별점을 아이콘으로 표시 */}
          {Array.from({ length: 5 }, (_, index) =>
            index < rating ? (
              <FaStar key={index} className="text-yellow-500" />
            ) : (
              <FaRegStar key={index} className="text-yellow-500" />
            )
          )}
          <div className="mx-2">
            {rating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
