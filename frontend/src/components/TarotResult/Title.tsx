import React from "react";
import resultBg from "../../assets/result-bg.jpeg";
import ResultCard from "../../components/TarotResult/ResultCard";

interface TarotResultProps {
  selectedCard: CardData[];
}

interface CardData {
  name: string;
  desc: string;
  imgUrl: string;
}

const Title: React.FC<TarotResultProps> = ({ selectedCard }) => {
  return (
    <div className="relative w-screen min-h-screen bg-black">
      {/* 배경 이미지 */}
      <img
        src={resultBg}
        alt="result-background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="container p-4 mx-auto relative min-h-[700px]">
        {/* 상단 제목 */}
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center">
            <img
              src={
                "https://cdn3d.iconscout.com/3d/premium/thumb/tarot-cards-11858327-9666345.png?f=webp"
              }
              alt="img1"
              className="w-1/3 mr-4"
            />
            <h1 className="text-6xl font-bold text-white">타로 결과</h1>
          </div>
          {/* <hr className="w-full border-t-2 border-white mt-4" /> */}

          {/* 결과 카드 */}
          <ResultCard selectedCard={selectedCard} />
        </div>
      </div>
    </div>
  );
};

export default Title;
