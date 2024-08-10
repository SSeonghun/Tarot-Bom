import React from "react";
import ReviewItem from "../../Common/ReviewItem";

// 더미 데이터 배열 정의
interface props {
  mainData: any
}

const Review: React.FC<props> = ({mainData}) => {
  const reviewData = mainData.reviewReaderResponseDtos
  console.log(reviewData);
  
  
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
          {reviewData.map((review: any, index: number) => (
            <ReviewItem
              key={index}
              name={review.seekerName}
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
