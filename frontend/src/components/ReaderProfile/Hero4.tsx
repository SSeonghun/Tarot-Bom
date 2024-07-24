import React from 'react';
import ReaderProfile from '../../assets/img/ReaderProfile2.png';
import KakaoMap from '../Common/KakaoMap';

const SeekerMypage: React.FC = () => {
  return (
    <div className="relative">
      <img
        src={ReaderProfile}
        alt="리더 지도쪽 배경이미지"
        className="w-full object-cover opacity-60"
      />

      <KakaoMap width="600px" height="400px" />
    </div>
  );
};

export default SeekerMypage;
