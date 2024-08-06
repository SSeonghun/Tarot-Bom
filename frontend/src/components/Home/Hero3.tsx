import React from 'react';
import HomeCard from './component/HomeCard'; // HomeCard 컴포넌트 경로에 맞게 수정
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Rank from '../../assets/img/rank.webp';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5, // 한 번에 6개의 카드가 보이도록 수정
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

// TODO : 금주의 탑리더 axios로 데이터 받아오기

const Hero3: React.FC = () => {
  // 원하는 개수만큼 HomeCard를 반복해서 생성하기 위해 배열을 사용
  const homeCards = Array.from({ length: 10 }); // 카드의 개수를 10개로 설정

  return (
    <div className="relative w-screen max-h-max flex-col bg-gray-900 flex items-center overflow-x-auto">
      <img src={Rank} alt="" className="w-[200px]" />
      <h1 className="text-white text-5xl font-bold mb-[50px] mt-[50px]">
        금주의 Top 리더를 확인해 보세요!
      </h1>

      {/* TODO : 클릭시 해당 리더로 이동하게 연결 */}
      <div className="w-[1200px] mb-10" style={{ overflow: 'hidden' }}>
        <Slider {...settings}>
          {homeCards.map((_, index) => (
            <div key={index} className="p-2">
              <HomeCard />
            </div>
          ))}
        </Slider>
      </div>

      {/* 카드 아래 공간 추가 */}
      <div className="mb-20" style={{ height: '50px' }}></div>
    </div>
  );
};

export default Hero3;
