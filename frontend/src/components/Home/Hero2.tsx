import React, { useState, useEffect, useRef } from 'react';
import Sample from '../../assets/sample.png';

// Main Section 2
const Hero2: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>('');
  const observerRef = useRef<HTMLImageElement>(null);

  const fullText: string =
    '우리의 웹사이트는 실시간으로 타로 리딩을 제공하는 플랫폼으로, 랜덤 매칭을 통해 즉시 타로 리더와 연결되거나, AI 타로를 통해 간편하게 해답을 얻을 수 있습니다. 또한, 예약 시스템을 이용해 원하는 타로 리더와의 심층 상담을 진행할 수 있어, 언제 어디서나 여러분의 질문에 대한 통찰을 받을 수 있습니다.';

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
      let index = -1; // 인덱스를 0으로 시작
      const intervalId = setInterval(() => {
        if (index < fullText.length-1) {
          setDisplayedText((prev) => prev + fullText[index]);
          index += 1; // 인덱스를 증가시킴
        } else {
          clearInterval(intervalId); // 모든 글자가 표시되면 인터벌을 중지
        }
      }, 10); // 타이핑 속도 조절 (밀리초 단위)
      return () => clearInterval(intervalId);
    }
  }, [isVisible]);

  return (
    <div className="relative w-screen min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      {/* 텍스트와 이미지, 비디오가 나란히 배치될 부모 요소 */}
      <div className="flex items-start justify-between w-full max-w-full-lg px-4">
        
        {/* 말풍선으로 텍스트 감싸기 */}
        <div className="relative w-2/5 mr-4"> {/* 2/5 너비 */}
          <div className="relative w-1/2 mr-4 ml-20"> 
            <div className="relative max-w-[100%] bg-[#7acd47] border border-black/50 rounded-[20px] shadow-inset shadow-[#ffffff]/6 p-4 text-black text-[clamp(0.3rem)] break-words bubble-alt">
                <p>{displayedText}</p> {/* 텍스트를 왼쪽 위에 위치 */}
                <div className="absolute border-transparent border-b-[#7acd47] border-[10px] bottom-[1px] right-[-5px]"></div>
            </div>
          </div>
          <div className="relative w-1/2 ml-auto"> 
          <img
            ref={observerRef}
            src={'https://cdn3d.iconscout.com/3d/premium/thumb/witch-on-broom-9783075-7970703.png'}
            className={`w-full h-auto max-h-[70vh] transition-opacity duration-1000  ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            alt="Witch"
          />
        </div>
        </div>

        {/* 비디오 */}
        <div className='relative w-3/5'>
          <video
            className="h-auto max-h-[50vh] object-cover" // 3/5 너비
            src="/video/recording.webm" // 비디오 파일 경로
            autoPlay
            loop
            muted
          />
          
        </div>
      </div>
      

      {/* 화면 아래쪽에 배치된 Sample 이미지 */}
      {/* <div className="absolute bottom-4 w-full flex justify-center">
        <img src={Sample} alt="Sample" className="w-1/4 max-w-sm" />
      </div> */}
    </div>
  );
};

export default Hero2;
