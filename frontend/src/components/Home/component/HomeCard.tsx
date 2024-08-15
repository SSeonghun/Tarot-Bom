import React from 'react';
import HoverButton from '../../Common/HoverButton';
import CardImg from './CardImg.png';
import PrivateLink from '../../Common/PrivateLink';

const categoryMap: { [key: string]: string } = {
  G01: '연애',
  G02: '진로',
  G03: '금전',
  G04: '건강',
  G05: '기타',
};

interface HomeCard {
  name: string;
  detail: string;
  rating: number;
  category: string[];
  imgUrl: string;
  hsize: string;
  wsize: string;
  readerId: number;
}

const HomeCard: React.FC<HomeCard> = ({
  name,
  detail,
  rating,
  category,
  imgUrl,
  hsize,
  wsize,
  readerId,
}) => {
  const categoryArray = Array.isArray(category) ? category : [category];
  const categoryNames = categoryArray.map((cat) => categoryMap[cat] || cat).join(', ');

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
      <div className="flex items-center justify-center">
        {stars}
        <span className="text-white ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center m-2 w- bg-gradient-to-br from-black rounded-3xl to-black">
      <div
        className="bg-black font-semibold text-center relative h-[400px] rounded-3xl border shadow-lg p-10 max-w-xs bg-cover bg-center hover:scale-105"
        style={{ backgroundImage: `url(${CardImg})` }}
      >
        <img
          className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
          src={imgUrl}
          alt="popular reader"
        />
        <h1 className="text-lg text-white">{name}</h1>
        <h3 className="text-sm text-gray-400">{categoryNames}</h3>
        {/* 별점 표시 */}
        {renderStars(rating)}
        <p className="text-xs mb-3 text-gray-400 mt-4 line-clamp-2">{detail}</p>
        <div className="absolute bottom-[50px] left-[60px]">
          <PrivateLink to={`/reader-profile/${readerId}`}>
            <HoverButton
              label="detail"
              color="bg-violet-300"
              hoverColor="bg-violet-500"
              hsize="h-[40px]"
              wsize="w-[100px]"
              fontsize="text-base"
            />
          </PrivateLink>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
