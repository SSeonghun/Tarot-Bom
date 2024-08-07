import React from 'react';
import MainBg from '../../assets/mainBg.png';
import HoverButton from '../Common/HoverButton';

// Main Section 1
const Hero1: React.FC = () => {
  return (
    <div className="relative w-screen min-h-screen bg-black">
      <img className="w-full h-screen object-cover opacity-90" src={MainBg} alt="Main Background" />

      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col items-end justify-center text-end text-white px-4"
        style={{ right: '5%', transform: 'translateX(0)' }}
      >
        <p className="text-9xl mb-4 font-bold" style={{ color: '#EBCB8B' }}>
          타로 : 봄
        </p>
        <p className="text-1xl mb-8" style={{ color: '#EBCB8B' }}>
          타로카드 리딩과 해석에 관한 깊이 있는 정보와 <br />
          개인 맞춤형 서비스를 제공하여 <br />
          여러분의 삶에 새로운 통찰과 방향을 제시합니다.
        </p>
        <div className="space-y-6 space-x-4">
          {/* TODO: 버튼연결 */}
          <HoverButton
            label="지금 만나보세요!"
            color="bg-gray-300"
            hoverColor="bg-gray-500"
            hsize="h-12"
            wsize="w-48"
            fontsize="text-lg"
          />
        </div>
      </div>

      {/* <div className="absolute inset-x-0 bottom-0 bg-white opacity-20 z-0 flex flex-col items-end h-20"></div> */}
    </div>
  );
};

export default Hero1;
