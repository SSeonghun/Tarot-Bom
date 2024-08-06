import React from 'react';
import ReaderProfile from '../../assets/img/ReaderProfile2.png';
import KakaoMap from '../Common/KakaoMap';

// TODO : 데이터 뿌려주기
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
