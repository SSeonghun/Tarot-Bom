import React, { useState, useEffect, useRef } from 'react';
import Sample from '../../assets/sample.png';

// Main Section 2
const Hero2: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>('');
  const observerRef = useRef<HTMLImageElement>(null);

  const fullText: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed at, incidunt, tempora, unde accusamus ut temporibus quas sequi impedit delectus alias omnis? Asperiores possimus autem et tenetur nulla! Non, error!';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        index += 1;
        if (index > fullText.length - 1) {
          clearInterval(intervalId);
        }
      }, 10); // 타이핑 속도 조절 (밀리초 단위)
      return () => clearInterval(intervalId);
    }
  }, [isVisible]);

  return (
    <div className="relative w-screen min-h-screen bg-[#04060F] flex flex-col items-center justify-center">
      {/* 텍스트와 이미지가 나란히 배치될 부모 요소 */}
      <div className="flex items-center justify-between w-full max-w-screen-lg px-4">
        {/* 이미지 */}
        <img
          ref={observerRef}
          src={'https://cdn3d.iconscout.com/3d/premium/thumb/witch-on-broom-9783075-7970703.png'}
          className={`w-1/2 h-auto max-h-[70vh] transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          alt="Witch"
        />

        {/* 텍스트 */}
        <p className="text-white w-1/2 top-0 ml-4 whitespace-pre-wrap">{displayedText}</p>
      </div>

      {/* 화면 아래쪽에 배치된 Sample 이미지 */}
      <div className="absolute bottom-4 w-full flex justify-center">
        <img src={Sample} alt="Sample" className="w-1/4 max-w-sm" />
      </div>
    </div>
  );
};

export default Hero2;
