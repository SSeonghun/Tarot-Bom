import React, { useState, useEffect } from "react";
import cardBg from "../../assets/img/card.png";
import HoverButton from "../../components/Common/HoverButton";
import OpenAI from "../Common/OpenAI";
import Loading from "../Common/Loading";
import MusicPlayer from "../Common/MusicPlayer";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import useStore from "../../stores/store";

import Heart from "../../assets/img/heart.webp";
import Healthy from "../../assets/img/heathy.webp";
import Course from "../../assets/img/course.webp";
import Money from "../../assets/img/money.webp";
import Etc from "../../assets/img/question.webp";

const { saveTarotResult } = require("../../API/api");

interface CardData {
  cardId: number;
  name: string;
  desc: string;
  imgUrl: string;
}

interface CardRequest {
  cardId: number;
  sequence: number;
  direction: string;
}

interface ResultSummaryProps {
  readerType: string;
  selectedCard: CardData[];
  worry: string;
  category: string;
  candidateId:number;
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
  cards: CardRequest[];
}

// 카테고리 변환 맵
const categoryMap: { [key: string]: string } = {
  G01: "연애운",
  G02: "진로운",
  G03: "금전운",
  G04: "건강운",
  G05: "기타",
};

// 카테고리별 이미지 맵
const imageMap: { [key: string]: string } = {
  연애운: Heart,
  진로운: Course,
  금전운: Money,
  건강운: Healthy,
  기타: Etc,
};

const ResultSummary: React.FC<ResultSummaryProps> = ({
  readerType,
  selectedCard,
  worry,
  category,
  candidateId,
}) => {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [music, setMusic] = useState<string>("");
  const [overall, setOverall] = useState<string>("");
  const { userInfo } = useStore();
  console.log(candidateId)
  // Category 변환
  const translatedCategory = categoryMap[category] || category;

  // 카테고리에 따른 이미지 선택
  const selectedImage = imageMap[translatedCategory] || Etc;

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
    console.log(overall);

    if (readerType === "AI") {
      return;
    }

    const saveRequest: SaveRequest = {
      readerId: candidateId, // 여기 바꿔줘야함
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

  // Overall부터 Music까지의 내용을 추출하는 함수
  const extractOverall = (response: string): string => {
    const lines = response.split("\n");
    const overallIndex = lines.findIndex((line) => line.startsWith("Overall"));
    const musicIndex = lines.findIndex((line) => line.startsWith("Music"));

    if (overallIndex !== -1 && musicIndex !== -1 && overallIndex < musicIndex) {
      return lines
        .slice(overallIndex, musicIndex)
        .join("\n")
        .replace("Overall:", "")
        .trim();
    }

    return "No recommended overall found";
  };

  return (
    <div className="relative flex flex-col items-center p-10">
      <OpenAI
        cards={selectedCard}
        onSummaryGenerated={handleSummaryGenerated}
        worry={worry}
        category={translatedCategory}
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
              <img
                src={selectedImage}
                alt="Category Icon"
                className="w-8 h-8 mr-2"
              />
              AI {translatedCategory} 요약
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
            <MusicPlayer width={40} height={40} searchQuery={music} />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <p className="text-white text-3xl">카드를 선택해 주세요.</p>
          </div>
        )}
      </div>

      <div className="relative mt-8 flex items-center gap-10">
        <HoverButton
          label="리더 프로필"
          color="bg-gray-300"
          hoverColor="bg-gray-500"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
        />
      </div>
    </div>
  );
};

export default ResultSummary;
