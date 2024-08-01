import React from "react";
import ReviewItem from "../../Common/ReviewItem";

// 더미 데이터 배열 정의
const reviewData = [
  {
    date: "2024-07-30",
    title: "Excellent Service",
    content:
      "The service was amazing. Highly recommend this place to everyone!",
    rating: 5,
  },
  {
    date: "2024-07-29",
    title: "Good Experience",
    content: "Overall a good experience, but there is room for improvement.",
    rating: 4,
  },
  {
    date: "2024-07-28",
    title: "Average Service",
    content: "Service was okay, but not exceptional.",
    rating: 3,
  },
  {
    date: "2024-07-27",
    title: "Fantastic",
    content: "Absolutely fantastic service. Would visit again!",
    rating: 5,
  },
  {
    date: "2024-07-26",
    title: "Not Satisfied",
    content: "I was not satisfied with the service.",
    rating: 2,
  },
  {
    date: "2024-07-25",
    title: "Great Job",
    content: "The staff did a great job. Very professional.",
    rating: 4,
  },
  {
    date: "2024-07-24",
    title: "Will Return",
    content: "Definitely coming back here. Great service!",
    rating: 5,
  },
  {
    date: "2024-07-23",
    title: "Disappointed",
    content: "Very disappointed with the service received.",
    rating: 1,
  },
  {
    date: "2024-07-22",
    title: "Highly Recommend",
    content: "Highly recommend this place for its exceptional service.",
    rating: 5,
  },
  {
    date: "2024-07-21",
    title: "Okay",
    content: "The service was okay but didn't meet my expectations.",
    rating: 3,
  },
];

const Review: React.FC = () => {
  return (
    <div className="min-h-screen p-10">
      <div className="mb-6">
        <h1 className="text-[50px] text-black font-bold">리뷰</h1>
        <hr className="border-[2px] border-gray-500" />
      </div>
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-150px)]">
        <div className="col-span-4 flex flex-col justify-center items-center text-white">
          <div className="rounded-lg flex flex-col p-4 justify-center items-center">
            <img
              src={"https://cdn3d.iconscout.com/3d/premium/thumb/review-8533326-6715462.png?f=webp"}
              alt="리뷰 이미지"
              className="w-[300px] h-auto"
            />
            <h1 className="text-center text-[35px] text-black font-bold m-4">
              나의 리뷰를 <br /> 확인 해보세요!
            </h1>
          </div>
        </div>
        <div className="col-span-8 bg-gray-100 p-4 overflow-y-auto">
          {/* 리뷰 아이템을 반복하여 렌더링 */}
          {reviewData.map((review, index) => (
            <ReviewItem
              key={index}
              date={review.date}
              title={review.title}
              content={review.content}
              rating={review.rating}
              backgroundColor={index % 2 === 0 ? "bg-gray-800" : "bg-white"}
              textColor={index % 2 === 0 ? "text-white" : "text-black"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
