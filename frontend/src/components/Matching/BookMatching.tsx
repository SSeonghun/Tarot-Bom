import React from 'react';
import LikeCard from './item/LikeCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import HoverButton from '../Common/HoverButton';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5, // 한 번에 3개의 카드가 보이도록 수정
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
};

const BookMatching: React.FC = () => {
  const likeReaders = Array.from({ length: 10 }); // 10개의 카드 예시

  return (
    <div className="bg-white w-[700px] h-[500px] -mt-20 relative flex-col items-center overflow-x-auto rounded-md">
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center">TOP 리더</h2>

      <div className="w-full h-[250px]" style={{ overflow: 'hidden' }}>
        <Slider {...settings}>
          {likeReaders.map((_, index) => (
            <div key={index} className="p-2">
              <LikeCard />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">리더 검색하기</h2>
        <div className="flex flex-row gap-4">
          <HoverButton
            label="검색하기"
            color="bg-red-500"
            hoverColor="bg-red-300"
            hsize="h-10"
            wsize="w-40"
            fontsize="text-base"
          />
          <HoverButton
            label="찜리스트"
            color="bg-red-500"
            hoverColor="bg-red-300"
            hsize="h-10"
            wsize="w-40"
            fontsize="text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default BookMatching;
