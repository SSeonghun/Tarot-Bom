import React from 'react';
import ReviewProfile from '../../../assets/img/reviewprofile.png';

interface ReviewItemProps {
  seekerName: string;
  profileUrl: string;
  content: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  seekerName,
  profileUrl,
  content
  }) => {
  return (
    <div className="container bg-white bg-opacity-30 w-[250px] h-[200px] flex flex-col justify-start items-start p-4 rounded-lg">
      <div className="flex items-center w-full mb-4 mt-4">
        {/* 프로필 이미지 */}
        <img
          src={profileUrl}
          alt="리뷰 프로필"
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        {/* 이름 */}
        <h1 className="text-lg font-bold text-center text-white">{ seekerName }</h1>
      </div>
      {/* 추가 내용이 있으면 여기에 넣을 수 있습니다 */}
      <hr className="w-full border-t-2 border-white mt-1" />
      <p className="text-white mt-3">
        {content}
      </p>
    </div>
  );
};

export default ReviewItem;
