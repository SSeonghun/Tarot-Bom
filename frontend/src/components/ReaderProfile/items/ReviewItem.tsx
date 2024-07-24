import React from 'react';
import ReviewProfile from '../../../assets/img/reviewprofile.png';

interface ReviewItem {
  name: string;
  text: string;
}

const ReviewItem: React.FC = () => {
  return (
    <div className="container bg-white bg-opacity-30 w-[250px] h-[350px] flex flex-col justify-start items-start p-4 rounded-lg">
      <div className="flex items-center w-full mb-4 mt-4">
        {/* 프로필 이미지 */}
        <img
          src={ReviewProfile}
          alt="리뷰 프로필"
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        {/* 이름 */}
        <h1 className="text-lg font-bold text-center text-white">박싸피</h1>
      </div>
      {/* 추가 내용이 있으면 여기에 넣을 수 있습니다 */}
      <hr className="w-full border-t-2 border-white mt-1" />
      <p className="text-white mt-3">
        "정말 놀라웠어요! 타로 리딩을 받기 전까지는 반신반의했는데, [타로 리더의 이름]님의 리딩은
        너무나도 정확했어요. 특히 연애운에 대해 궁금했던 부분이 있었는데, 명확한 답변을 주셔서 큰
        도움이 되었어요. 덕분에 앞으로 나아갈 방향을 찾았어요. 감사합니다!"
      </p>
    </div>
  );
};

export default ReviewItem;
