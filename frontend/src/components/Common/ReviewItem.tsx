import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface ReviewItemProps {
  date: string;
  title: string;
  content: string;
  rating: number;
  backgroundColor: string;
  textColor: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  date,
  title,
  content,
  rating,
  backgroundColor,
  textColor,
}) => {
  return (
    <div
      className={`w-[550px] h-[150px] p-4 ${backgroundColor} ${textColor} mb-4 rounded-lg`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start">
          <h1 className="text-[30px] font-bold">{title}</h1>
          <p className="text-sm mt-1">{date}</p>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
