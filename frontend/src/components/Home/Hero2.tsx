import React, { useState, useEffect, useRef } from "react";
import BackGround from "./component/background";
import Intro from "./component/intro";

import homeCard1 from "../../assets/img/homehero1.png";
import "../../assets/css/FlipCard.css"; // CSS 파일을 가져옵니다.

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
        <div className="z-0">
          <BackGround />
        </div>
      </div>
      {isFlipped2 && (
        <div
          className={`absolute left-[200px] top-[180px] w-[500px] text-end duration-500 ${
            isVisible ? "animate-slide-up" : ""
          }`} // 애니메이션 클래스 조건부 적용
          ref={textRef}
        >
          <h3 className="font-bold text-[25px] text-violet-600">
            타로의 대중화
          </h3>
          <h1 className="font-bold text-white text-[55px]">흥미로운</h1>
          <h1 className="font-bold text-white text-[55px]">타로의 세계로</h1>
          <p className="highlight text-gray-200 font-bold text-[20px] mt-3">
            타로는 78장의 상징적인 카드 덱을 통해 과거, 현재, 미래의 상황을
            해석하고, 개인의 내면적 고민이나 삶의 질문에 대한 깊은 통찰과 지침을
            제공하는 점술 도구입니다. 각 카드의 고유한 이미지와 의미를 통해,
            복잡한 상황을 명확하게 분석하고, 앞으로 나아갈 방향을 제시하는 데
            사용됩니다.
          </p>
        </div>
      )}
      <div className="flex flex-row absolute space-x-10 ms-[50px] mt-[250px]">
        <div className="card-container" ref={cardRef}>
          <div className={`card ${isFlipped1 ? "is-flipped" : ""}`}>
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
