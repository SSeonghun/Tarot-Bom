import React from 'react';
import Sample from '../../assets/sample.png';
import KakaoMap from '../Common/KakaoMap';

const Hero3: React.FC = () => {
  // 원하는 개수만큼 HomeCard를 반복해서 생성하기 위해 배열을 사용
  const homeCards = Array.from({ length: 5 });

  return (
    <div className="relative w-screen min-h-screen flex-row bg-black flex items-center justify-center overflow-x-auto">
      <div className="flex m-10">
        <KakaoMap width="600px" height="400px" />
        <h1 className="m-5 text-6xl text-white">리더를 오프라인에서 직접 만나보세요!!</h1>
      </div>
    </div>
  );
};

export default Hero3;
