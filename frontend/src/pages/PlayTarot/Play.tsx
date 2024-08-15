import React, { useEffect } from "react";
import Chatting from "../../components/PlayTarot/Chatting";
import TarotCard from "../../components/PlayTarot/TarotCard"; // 타로 카드 컴포넌트 추가
import Memo from "../../components/PlayTarot/Memo"; // 메모 컴포넌트 추가

const Play: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="flex min-h-screen page">
      <div className="flex-1 flex items-center justify-center relative mt-24">
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center w-[calc(100%-10rem)] max-w-5xl">
          {/* 매트 배경 */}
          <div className="relative flex flex-col w-full p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-xl">
            {/* 카드들을 포함한 매트 배경 */}
            <div className="flex space-x-[calc(13%)] mb-6 w-full justify-center">
              <TarotCard src="/tarot_images/0.jpg" alt="Tarot Card 1" />
              <TarotCard src="/tarot_images/1.jpg" alt="Tarot Card 2" />
              <TarotCard src="/tarot_images/2.jpg" alt="Tarot Card 3" />
            </div>
            {/* 메모 컴포넌트 */}
            <Memo />
          </div>
        </div>
      </div>
      <div className="relative w-96 ml-6 mt-20">
        <Chatting />
      </div>
    </div>
  );
};

export default Play;
