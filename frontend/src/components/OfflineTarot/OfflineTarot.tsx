import React from 'react';
import KakaoMap from '../Common/KakaoMap';

const Offline: React.FC = () => {
  return (
    <div className="relative w-screen min-h-screen flex-row flex items-center justify-center overflow-x-auto">
      <div className="flex m-10">
        <KakaoMap width="600px" height="400px" />
        <h1 className="m-5 text-6xl text-white">리더를 오프라인에서 직접 만나보세요!!</h1>
      </div>
    </div>
  );
}

export default Offline;
