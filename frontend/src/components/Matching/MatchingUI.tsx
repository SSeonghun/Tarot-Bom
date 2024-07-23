import React, { useState, useEffect } from 'react';
import TarotCard from '../../assets/Tarot_cards-removebg-preview.png';
import Calander from '../../assets/REVIEW-removebg-preview.png';
import HoverButton from '../Common/HoverButton';
import RandomMatching from './RandomMatching';
import BookMatching from './BookMatching';
import '../../assets/css/FadeInOut.css';

const Matching: React.FC = () => {
  // 상태 추가
  const [shiftDirection, setShiftDirection] = useState<'none' | 'left' | 'right'>('none');
  const [animationClass, setAnimationClass] = useState<string>('fade-out');

  // 버튼 레이블
  const randomLabel = shiftDirection === 'right' ? "돌아가기" : "랜덤매칭";
  const bookLabel = shiftDirection === 'left' ? "돌아가기" : "예약하기";

  useEffect(() => {
    // 애니메이션 클래스 설정
    if (shiftDirection === 'right') {
      setAnimationClass('fade-in-active');
    } else if (shiftDirection === 'left') {
      setAnimationClass('fade-out-active');
    } else {
      setAnimationClass('fade-out-active');
    }
  }, [shiftDirection]);

  useEffect(() => {
    // 애니메이션 효과가 적용된 후 opacity를 0으로 설정
    if (shiftDirection === 'none') {
      setAnimationClass('fade-out-active');
    }
  }, [animationClass]);

  // 버튼 클릭 핸들러
  const handleButtonClick = (direction: 'left' | 'right') => {
    if (shiftDirection === 'none') {
      if (direction === 'left') {
        setShiftDirection('right'); // 오른쪽으로 이동
      } else if (direction === 'right') {
        setShiftDirection('left'); // 왼쪽으로 이동
      }
    } else if (shiftDirection === 'right' && direction === 'left') {
      setShiftDirection('none'); // 원래 상태로 돌아가기
    } else if (shiftDirection === 'left' && direction === 'right') {
      setShiftDirection('none'); // 원래 상태로 돌아가기
    }
  };

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <div className={`absolute inset-0 transition-transform duration-500 ${shiftDirection === 'right' ? 'translate-x-[50%]' : ''} ${shiftDirection === 'left' ? 'translate-x-[-50%]' : ''}`}>
        {/* 왼쪽 부분 */}
        <div className='w-full h-full bg-gray-900 absolute left-[-50%]'>
          {shiftDirection === 'right' && 
            <div className={`absolute top-1/4 left-1/4 -ms-44 ${animationClass}`}>
              <RandomMatching />
            </div>
          }
          <img src={TarotCard} alt="Tarot Card" className='absolute right-0 -top-1/4 mt-60 w-1/3 h-auto' />
          <div className='absolute right-20 bottom-1/4 mt-10'>
            <HoverButton
              label={randomLabel} // 동적 레이블
              color="bg-gray-500"
              hoverColor="bg-gray-300"
              hsize="h-12"
              wsize="w-48"
              fontsize="text-lg"
              onClick={() => handleButtonClick('left')}
            />
          </div>
        </div>

        {/* 오른쪽 부분 */}
        <div className='w-full h-full bg-gray-700 absolute right-[-50%]'>
          {shiftDirection === 'left' && 
            <div className={`absolute top-1/4 right-1/4 ${animationClass}`}>
              <BookMatching />
            </div>
          }
          <img src={Calander} alt="Calander" className='absolute left-0 w-1/3 -top-1/4 h-auto mt-60' />
          <div className='absolute left-20 bottom-1/4 mt-10'>
            <HoverButton
              label={bookLabel} // 동적 레이블
              color="bg-gray-500"
              hoverColor="bg-gray-300"
              hsize="h-12"
              wsize="w-48"
              fontsize="text-lg"
              onClick={() => handleButtonClick('right')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matching;
