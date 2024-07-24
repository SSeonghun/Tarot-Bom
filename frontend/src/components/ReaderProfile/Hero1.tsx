import React from 'react';
import HoverButton from '../Common/HoverButton';

import ReaderProfile1 from '../../assets/img/ReaderProfile1.png';
import Profile from '../../assets/img/profile2.png';
import Seed from '../../assets/img/seed.png';

const Hero1: React.FC = () => {
  return (
    <div className="relative bg-black bg-opacity-70">
      <img
        src={ReaderProfile1}
        alt="ReaderProfile1"
        className="object-cover w-full h-[400px] opacity-60 z-0"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        {/* 지금은 예뻐보이게 이렇게 하지만 그냥 이미지 가져와서 crop 하는게 맞는듯함 이미지 크기 150 x 150 */}
        <div className="bg-black bg-opacity-50 p-2 rounded-full backdrop-filter backdrop-blur-sm">
          <img src={Profile} alt="Profile" className="w-32 h-32 rounded-full" />
        </div>
        <div className="flex flex-row items-end">
          <img src={Seed} alt="grade" className="w-auto h-10" title="등급" />
          <h1 className="text-5xl text-white mt-5 font-bold">김싸피</h1>
        </div>
        <p className="text-[15px] mt-3 text-white font-semibold">TAROT READER</p>
        <div className="mt-5">
          <HoverButton
            label="예약하기"
            color="bg-gray-300"
            hoverColor="bg-gray-500"
            hsize="h-12"
            wsize="w-48"
            fontsize="text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero1;
