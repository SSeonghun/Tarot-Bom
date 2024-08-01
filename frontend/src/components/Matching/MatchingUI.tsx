import React, { useState, useEffect } from "react";
import TarotCard from "../../assets/Tarot_cards-removebg-preview.png";
import Calander from "../../assets/REVIEW-removebg-preview.png";
import HoverButton from "../Common/HoverButton";
import RandomMatching from "./RandomMatching";
import BookMatching from "./BookMatching";
import "../../assets/css/FadeInOut.css"; // CSS 파일을 가져옴

const Matching: React.FC = () => {
  const [shiftDirection, setShiftDirection] = useState<
    "none" | "left" | "right"
  >("none");
  const [fade, setFade] = useState<boolean>(true);

  // 버튼 레이블
  const randomLabel = shiftDirection === "right" ? "돌아가기" : "실시간타로";
  const bookLabel = shiftDirection === "left" ? "돌아가기" : "예약하기";

  // 버튼 클릭 핸들러
  const handleButtonClick = (direction: "left" | "right") => {
    if (shiftDirection === "none") {
      setShiftDirection(direction);
    } else if (shiftDirection === "right" || direction === "left") {
      setShiftDirection("none");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className={`absolute inset-0 transition-transform duration-500 ${
          shiftDirection === "right" ? "translate-x-[50%]" : ""
        } ${shiftDirection === "left" ? "translate-x-[-50%]" : ""}
        ${shiftDirection === "none" ? "translate-x-[0%]" : ""}
        `}
      >
        {/* 왼쪽 부분 */}
        <div className="w-full h-full bg-gray-900 absolute left-[-50%]">
          {shiftDirection === "right" && (
            <div className="absolute top-1/4 left-40">
              <RandomMatching />
            </div>
          )}
          <img
            src={TarotCard}
            alt="Tarot Card"
            className="absolute right-0 -top-1/4 mt-60 w-1/3 h-auto"
          />
          <div className="absolute right-20 bottom-1/4 mt-10">
            <HoverButton
              label={randomLabel} // 동적 레이블
              color="bg-gray-300"
              hoverColor="bg-gray-500"
              hsize="h-12"
              wsize="w-48"
              fontsize="text-lg"
              onClick={() => handleButtonClick("right")}
            />
          </div>
        </div>

        {/* 오른쪽 부분 */}
        <div className="w-full h-full bg-gray-700 absolute right-[-50%]">
          {shiftDirection === "left" && (
            <div
              className={`absolute top-1/4 right-40 ${fade} ? 'fade-in-onload' : 'fade-out-clear'`}
            >
              <BookMatching />
            </div>
          )}
          <img
            src={Calander}
            alt="Calander"
            className="absolute left-0 w-1/3 -top-1/4 h-auto mt-60"
          />
          <div className="absolute left-20 bottom-1/4 mt-10">
            <HoverButton
              label={bookLabel} // 동적 레이블
              color="bg-gray-300"
              hoverColor="bg-gray-500"
              hsize="h-12"
              wsize="w-48"
              fontsize="text-lg"
              onClick={() => handleButtonClick("left")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matching;
