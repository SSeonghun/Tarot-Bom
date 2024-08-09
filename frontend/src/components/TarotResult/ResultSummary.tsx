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
import useStore from "../../stores/store";

//const { cardInfo } = require("../../API/api");
const { saveTarotResult } = require("../../API/api");

const category = "금전운";

interface CardData {
  cardId: number;
  name: string;
  desc: string;
  imgUrl: string;
}

interface CardRequset {
  cardId: number;
  sequence: number;
  direction: string;
}

interface ResultSummaryProps {
  readerType: String;
  selectedCard: CardData[];
  worry: string;
  category: string;
}

interface SaveRequest {
  readerId: number;
  seekerId: number | undefined;
  date: Date;
  keyword: string;
  memo: string;
  summary: string;
  music: string;
  roomId: number;
  cards: CardRequset[];
}

const ResultSummary: React.FC<ResultSummaryProps> = ({
  readerType,
  selectedCard,
  worry,
  category,
}) => {
  const [summary, setSummary] = useState<string>("");
  //const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [music, setMusic] = useState<string>("");
  const [overall, setOverall] = useState<string>("");
  const { userInfo } = useStore();

  console.log("selected Cards : ", selectedCard);

  const handleSummaryGenerated = (generatedSummary: string) => {
    setSummary(generatedSummary);
    const music = extractRecommendedMusic(generatedSummary);
    console.log("music : ", music);
    const overall = extractOverall(generatedSummary);
    setMusic(music);
    setOverall(overall);
    setLoading(false); // 요약 생성 후 로딩 상태를 false로 변경

    console.log(category);

    // 이 페이지는 시커만 온다 라고 가정하고 만들어야 겠음
    // TODO: 리더아이디도 받아야 하는데 그러면 rtc 들어가기전에 리더 아이디도 props로 넘겨줘야 할듯
    // TODO: 메모관련 props받아서 추가 => 프롬프팅 다시 해야할듯

    console.log(readerType);
    if (readerType === "AI") {
      return;
    }

    const saveRequest: SaveRequest = {
      readerId: 1, // 여기 바꿔줘야함
      seekerId: userInfo?.memberId,
      date: new Date(),
      keyword: category,
      memo: "this is memo",
      summary: overall,
      music: music,
      roomId: 1,
      cards: selectedCard.map((card, index) => ({
        cardId: card.cardId,
        sequence: index + 1,
        direction: "U", // 방향을 수동으로 설정하거나 선택할 수 있도록 추가
      })),
    };

    console.log(saveRequest);

    saveTarotResult(saveRequest);
  };

  // 음악을 추출하는 함수
  const extractRecommendedMusic = (response: string): string => {
    const musicLine = response
      .split("\n")
      .find((line) => line.startsWith("Music"));
    if (musicLine) {
      return musicLine.replace("Music:", "").trim();
    }
    return "No recommended music found";
  };

  // 음악을 추출하는 함수
  const extractOverall = (response: string): string => {
    const overallLine = response
      .split("\n")
      .find((line) => line.startsWith("Overall"));
    if (overallLine) {
      return overallLine.replace("Overall:", "").trim();
    }
    return "No recommended music found";
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
            <div className="mt-8 border border-white p-6 rounded-lg max-w-xl bg-black bg-opacity-60 h-[600px] overflow-y-auto">
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
            <MusicPlayer title={music} />
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
