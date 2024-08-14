import React, { useState } from 'react';
import CardBackground from '../../assets/img/card.png';
import ReviewItem from './items/ReviewItem';
import HoverButton from '../Common/HoverButton';

interface Review {
  reviewReaderId: number;
  seekerName: string;
  seekerProfileUrl: string;
  content: string;
}

interface Hero3Props {
  intro: string;
  reviews: Review[];
}

const SeekerMypage: React.FC<Hero3Props> = ({
  intro,
  reviews,
}) => {
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(3); // 초기에 보여줄 리뷰 개수

  const handleShowMoreReviews = () => {
    setVisibleReviewsCount(prevCount => prevCount + 3); // 3개씩 더 보여주기
  };

  return (
    <div className="container p-4 mx-auto relative flex flex-col justify-center items-center">
      <img src={CardBackground} alt="카드이미지" className="object-cover opacity-40 mt-5 z-0" />
      <div className="absolute top-[140px]">
        <h1 className="text-white text-[50px] font-bold z-10">리더의 자기소개</h1>
      </div>
      <div className="absolute top-[450px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 bg-white bg-opacity-30 rounded-lg border border-white border-opacity-80">
        <p className="text-white whitespace-pre-wrap  text-xl font-bold mx-28 my-10">{intro}</p>
      </div>
      <div className="absolute top-[700px]">
        <div className="container p-4 mx-auto">
          <h1 className="text-[50px] font-bold text-white text-center mb-10">최근 리뷰</h1>
          <div className="grid grid-cols-3 gap-10">
            {reviews.length > 0 ? (
              reviews.slice(0, visibleReviewsCount).map((review) => (
                <ReviewItem
                  key={review.reviewReaderId}
                  profileUrl={review.seekerProfileUrl}
                  seekerName={review.seekerName}
                  content={review.content}
                />
              ))
            ) : (
              <p className="text-white text-center col-span-3">리뷰가 없습니다.</p>
            )}
          </div>
          {visibleReviewsCount < reviews.length && (
            <div className="mt-10 text-center">
              <HoverButton
                label="리뷰 더 보기"
                color="bg-gray-300"
                hoverColor="bg-gray-500"
                hsize="h-12"
                wsize="w-48"
                fontsize="text-lg"
                onClick={handleShowMoreReviews}
              />
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default SeekerMypage;
