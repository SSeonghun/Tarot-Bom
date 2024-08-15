import React from 'react';
import HoverButton from '../../Common/HoverButton';

interface ReaderCardProps {
  name: string;
  detail: string;
  rating: number;
  category: string[];
  imgUrl: string;
  hsize: string;
  wsize: string;
  onClick: () => void;
}

const ReaderCard: React.FC<ReaderCardProps> = ({
  name,
  detail,
  rating,
  category,
  imgUrl,
  hsize,
  wsize,
  onClick,
}) => {
  // 별점 렌더링 함수
  const renderStars = (rating: number) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating); // 정수 부분
    const fractionalStar = Math.round((rating - fullStars) * 10); // 소수점 첫째 자리
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-red-500">&#9733;</span>); // 채워진 별
    }

    if (fractionalStar > 0) {
      stars.push(
        <span key={fullStars} className="relative inline-block">
          <span className="text-gray-300">&#9733;</span>
          <span
            className="absolute inset-0 text-red-500 overflow-hidden"
            style={{
              width: `${fractionalStar * 10}%`,
              display: 'inline-block'
            }}
          >
            &#9733;
          </span>
        </span>
      );
    }

    for (let i = fullStars + (fractionalStar > 0 ? 1 : 0); i < totalStars; i++) {
      stars.push(<span key={i + fullStars} className="text-gray-300">&#9733;</span>); // 빈 별
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="text-gray-800 ml-2">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-white relative bg-opacity-40 font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs bg-cover bg-center hover:scale-105 hover:bg-opacity-80 transition-transform duration-300 h-full w-full"
        onClick={onClick}
      >
        <img
          className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
          src={imgUrl}
          alt="popular reader"
        />
        <h1 className="text-[20px] text-black mt-3">{name}</h1>
        {/* 별점 표시 */}
        <div className="flex flex-col items-center mt-3">
          {renderStars(rating)}
        </div>
        <h3 className="text-lg text-gray-600 line-clamp-2 mt-4 mb-3 ">{detail}</h3>
        
        {/* <div className="absolute left-1/2 transform -translate-x-1/2">
          <HoverButton
            label="Detail"
            color="bg-red-500"
            hoverColor="bg-red-300"
            hsize={hsize}
            wsize={wsize}
            fontsize="text-base"
          />
        </div> */}
      </div>
    </div>
  );
};

export default ReaderCard;
