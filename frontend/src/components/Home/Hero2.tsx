import React, { useState, useEffect, useRef } from 'react';
import BackGround from './component/background';
import Intro from './component/intro';

import homeCard1 from '../../assets/img/homehero1.png';
import '../../assets/css/FlipCard.css'; // CSS 파일을 가져옵니다.

const Hero2: React.FC = () => {
  const [isFlipped1, setIsFlipped1] = useState<boolean>(false);
  const [isFlipped2, setIsFlipped2] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false); // 애니메이션 상태 추가
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFlipped1(true);
          setIsFlipped2(true);
          setIsVisible(true);
        }
      },
      {
        threshold: 0.9, // 90%가 보일 때 트리거
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-screen min-h-screen bg-black flex flex-col items-center">
      <div className="flex items-start justify-between w-full max-w-full-lg px-4 z-0">
        <div className="pt-[100px]">
          <BackGround />
        </div>
      </div>
      {isFlipped2 && (
        <div
          className={`absolute left-[300px] top-[180px] w-[500px] duration-500 ${
            isVisible ? 'animate-slide-up' : ''
          }`} // 애니메이션 클래스 조건부 적용
          ref={textRef}
        >
          <h3 className="font-bold text-[25px] text-violet-600">타로의 대중화</h3>
          <h1 className="font-bold text-white text-[55px]">흥미로운</h1>
          <h1 className="font-bold text-white text-[55px]">타로의 세계로</h1>
          <p className="highlight text-gray-200 font-bold text-[20px] mt-3">
            타로:봄은 실시간으로 타로 리딩을 제공하는 플랫폼으로, 랜덤 매칭을 통해 즉시 타로 리더와
            연결되거나, AI 타로를 통해 간편하게 해답을 얻을 수 있습니다. 또한, 예약 시스템을 이용해
            원하는 타로 리더와의 심층 상담을 진행할 수 있어, 언제 어디서나 여러분의 질문에 대한
            통찰을 받을 수 있습니다.
          </p>
        </div>
      )}
      <div className="flex flex-row absolute space-x-10 ms-[50px] mt-[250px]">
        <div className="card-container" ref={cardRef}>
          <div className={`card ${isFlipped1 ? 'is-flipped' : ''}`}>
            <div className="card-face card-front">
              <img src={homeCard1} alt="Front" className="w-[300px]" />
            </div>
            <div className="card-face card-back">
              <Intro />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
