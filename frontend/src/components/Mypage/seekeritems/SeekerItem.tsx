import React from 'react';
import HoverButton from '../../Common/HoverButton';
import Hero1 from './Hero1';
import Hero2 from './Hero2';
import Hero3 from './Hero3';

// TODO : props 인터페이스 및 값 받기


interface SeekerItemProps {
  data: any; // 필요한 타입으로 변경
}


const SeekerItem: React.FC<SeekerItemProps> = () => {
  return (
    <div className="container p-4 mx-auto">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-black font-bold text-[50px] m-4">김싸피님 마이페이지</h1>
        <div className="m-4">
          <HoverButton
            label="리더 프로필 만들기"
            color="bg-gray-300"
            hoverColor="bg-gray-500"
            hsize="h-12"
            wsize="w-48"
            fontsize="text-lg"
          ></HoverButton>
        </div>
      </div>
      <hr className="border-black border-[2px]" />

      {/* // TODO : 각각 원하는 값 넘겨주기 Hero1 => 예약내역, 분석, 찜리스트  , Hero2 => 최근 타로내역 */}
      <div className="mt-3">
        <Hero1 />
      </div>
      <h1 className="text-black font-bold text-[50px] mt-[100px] ms-4 me-4 mb-4">최근 타로 내역</h1>
      <hr className="border-black border-[2px]" />
      <div className="mt-3">
        <Hero2 />
      </div>
    </div>
  );
};

export default SeekerItem;
