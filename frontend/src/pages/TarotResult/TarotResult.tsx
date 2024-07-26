import React from 'react';
import resultBg from '../../assets/result-bg.jpeg'
import img1 from '../../assets/Tarot_cards-removebg-preview.png'

const TarotResult: React.FC = () => {
  return (
    <div className="relative w-screen min-h-screen bg-black">
      {/* 배경 이미지 */}
      <img src={resultBg} alt="result-background" className='absoulte inset-0 w-full h-screen' />

      {/* 제목과 수평선 */}
      <div className='absolute inset-0 flex justify-center items-start'>
        <div className='flex flex-col items-center'>
        <div className='flex flex-row items-center'>
          <img src={img1} alt="img1" className=' w-1/3 ' />
          <h1 className="text-6xl font-bold text-white">타로 결과</h1>
        </div>
        <hr className=' w-full border-white z-10' />
      </div>
      </div>
       
    </div>
  );
}

export default TarotResult;
