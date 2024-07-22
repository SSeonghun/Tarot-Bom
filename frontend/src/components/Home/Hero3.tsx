import React from 'react';
import HomeCard from './component/HomeCard'; // HomeCard 컴포넌트 경로에 맞게 수정

const Hero3: React.FC = () => {
  // 원하는 개수만큼 HomeCard를 반복해서 생성하기 위해 배열을 사용
  const homeCards = Array.from({ length: 5 });

  return (
    <div className="relative w-screen min-h-screen flex-col bg-black flex items-center justify-center overflow-x-auto">

      <h1 className='text-white text-5xl mb-10'>금주의 Top 리더를 확인해 보세요!</h1>

      <div className="flex flex-row m-10">
        {homeCards.map((_, index) => (
          <div key={index} className="m-1">
            <HomeCard />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero3;
