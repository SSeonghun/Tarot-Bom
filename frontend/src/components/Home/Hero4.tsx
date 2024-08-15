import React, { useRef, useState, useEffect } from "react";
import Question from "../../assets/img/question2.webp";
import "./component/shake.css";
import Random from "../../assets/img/random.webp";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showAdditionalDiv, setShowAdditionalDiv] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true); // 딜레이 후 상태 업데이트
            setTimeout(() => {
              setShowAdditionalDiv(true); // 애니메이션 후 추가 div 표시
            }, 1000); // 애니메이션이 끝난 후 추가 div를 표시하는 시간 (애니메이션 시간에 맞추어 조정)
          }, 300); // 300ms 딜레이
        }
      },
      {
        threshold: 1, // 요소의 100%가 보일 때 트리거
      }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-screen min-h-screen flex items-center justify-center bg-gray-900 overflow-x-auto">
      <div
        ref={sliderRef}
        className={`absolute transition-transform duration-300 ${
          isVisible ? "animate-shake-slide-up" : ""
        }`}
        style={{
          top: "23%",
          left: "35%",
        }}
      >
        <img src={Question} alt="물음표" className="w-[400px]" />
      </div>

      {showAdditionalDiv && (
        <div className="absolute bottom-[130px] left-[200px] flex space-x-10">
          <div className="w-[500px] h-[400px] text-center rounded-lg text-black justify-center flex items-center animate-slide-up">
            <img src={Random} alt="랜덤 매칭" className="h-[300px]" />
          </div>
          <div className="w-[500px] h-[400px] text-start rounded-lg text-black animate-slide-up justify-center items-center">
            <h3 className="font-bold text-[25px] text-violet-600">랜덤매칭</h3>
            <h1 className="font-bold text-white text-[55px]">
              다양한 사람들과
            </h1>
            <h1 className="font-bold text-white text-[55px]">타로 상담</h1>
            <p className="highlight text-gray-200 font-bold text-[20px] mt-3">
              랜덤 매칭 기능은 사용자가 다양한 타로 상담사와 예측 불가능하게
              연결되어, 각기 다른 통찰과 조언을 받을 수 있도록 합니다. 이를 통해
              사용자는 다양한 시각에서 문제를 분석하고, 새로운 방향과 해답을
              찾는 데 도움을 받을 수 있습니다. 이 기능은 타로 상담의 다양성과
              깊이를 더하고, 사용자에게 풍부한 상담 경험을 제공합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
