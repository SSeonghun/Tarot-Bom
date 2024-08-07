import React, { useState, useEffect } from "react";
import cardBg from "../../assets/img/card.png";
import moneyImg from "../../assets/money.png";
import HoverButton from "../../components/Common/HoverButton";
import OpenAI from "../Common/OpenAI";
import Loading from "../Common/Loading";
import MusicPlayer from "../Common/MusicPlayerCopy";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const { cardInfo } = require("../../API/api");

const category = "금전운";

interface CardData {
  name: string;
  desc: string;
  imgUrl: string;
}

interface ResultSummaryProps {
  selectedCard: CardData[];
  worry: string;
  category: string;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({
  selectedCard,
  worry,
  category,
}) => {
  const [summary, setSummary] = useState<string>("");
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSummaryGenerated = (generatedSummary: string) => {
    setSummary(generatedSummary);
    setLoading(false); // 요약 생성 후 로딩 상태를 false로 변경
  };

  return (
    <div className="relative flex flex-col items-center p-10">
      <OpenAI
        cards={selectedCard}
        onSummaryGenerated={handleSummaryGenerated}
        worry={worry}
        category={category}
        // selectedCards={selectedCard}
      />

      <div className="relative w-full max-w-3xl">
        <img
          src={cardBg}
          alt="Background"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-12 bg-white bg-opacity-20 border shadow-lg p-3 bg-cover"></div>

        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center">
              <p className="text-white text-3xl">결과를 기다리고 있습니다...</p>
              <Loading />
            </div>
          </div>
        ) : summary ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="text-4xl font-bold text-white p-4 rounded-lg flex flex-row">
              <img src={moneyImg} alt="moneyImg" className="w-8 h-8 mr-2" />
              AI {category} 요약
            </div>
            <div className="mt-8 border border-white p-6 rounded-lg max-w-xl bg-black bg-opacity-60">
              <ReactMarkdown
                className="text-white text-s"
                remarkPlugins={[remarkBreaks, remarkGfm]}
              >
                {summary.replace(/\n/g, "\n\n")}
              </ReactMarkdown>
            </div>
            <p className="mt-5 text-lg font-bold text-white">
              타로 결과에 어울리는 음악을 들어보세요!
            </p>
            <MusicPlayer />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <p className="text-white text-3xl">카드를 선택해 주세요.</p>
          </div>
        )}
      </div>

      <div className="relative mt-8 flex items-center gap-10">
        <HoverButton
          label="공유하기"
          color="bg-gray-500"
          hoverColor="bg-gray-300"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
        />
        <HoverButton
          label="이미지 저장"
          color="bg-gray-500"
          hoverColor="bg-gray-300"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
        />
        <HoverButton
          label="리더 프로필"
          color="bg-gray-500"
          hoverColor="bg-gray-300"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
        />
      </div>
    </div>
  );
};

export default ResultSummary;
