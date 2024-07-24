import React from 'react';
import Sphere from '../../assets/img/sphere.png';
import Category from './item/Category';


const SerchReader: React.FC = () => {

    const Labels = [
        '연애운',
        '직장운',
        '재물운',
        '건강운',
        '가족운',
        '기타'
      ];


  return (
    <div className="container p-4 mx-auto relative min-h-[700px]">
      {/* 배경 이미지 */}
      <img src={Sphere} alt="sphere" className='absolute object-cover right-10 bottom-0 max-w-[450px] h-auto z-0' />

      {/* 제목과 수평선 */}
      <h1 className="text-6xl font-bold text-white mb-10 mt-5">리더 검색</h1>
      <hr className='relative border-white z-10' />

      <div className="grid grid-cols-12 gap-4 mt-10">
        {/* 첫 번째 열 (4/12) */}
        <div className="col-span-2 text-white p-4 z-10">
            <Category />
        </div>

        {/* 두 번째 열 (8/12) */}
        <div className="col-span-10 bg-white text-black p-4 z-10">
          <p>두 번째 열</p>
        </div>
      </div>
    </div>
  );
}

export default SerchReader;
