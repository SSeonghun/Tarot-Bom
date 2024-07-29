import React from "react";
import Calendar from "../../Common/Calendar";
import Fortune from "../../../assets/img/재물운.png";
import PieChart from "../../Common/PieChart";
import { useCountUp } from "../../Common/useCountUI";
import TarotCard from "../../../assets/tarot_images - 복사본/c01.jpg";
import LikeCard from "../../Cards/LikeCard";
import HoverButton from "../../Common/HoverButton";

const Hero1: React.FC = () => {
  const count = useCountUp({ start: 0, end: 30, duration: 1500 });
  // 하이라이트할 날짜 배열을 지정합니다.
  // 정렬된게 들어와야 함
  // 넘길때 예약정보를 같이 넘겨야할듯
  const highlightDates = [
    new Date(2024, 6, 31), // 2024년 7월 15일
    new Date(2024, 7, 20), // 2024년 7월 20일
    new Date(2024, 7, 25), // 2024년 7월 25일
  ];
  const likeCards = Array(6).fill(<LikeCard />);

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <div className="border border-black rounded-lg">
            <h1 className="text-black text-[40px] font-bold text-center mt-3">
              예약내역
            </h1>
            <div>
              <Calendar highlightDates={highlightDates} />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div>
            <div className="relative">
              <img
                src={Fortune}
                alt="카테고리 이미지"
                className="object-cover w-full h-full rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <h1 className="text-black text-[70px] mx-10 my-5 font-bold">
                  {count}%
                </h1>
                <div className="ms-12">
                  <p className="text-black">
                    최근 30개의 타로 결과를 종합해 봤을때
                  </p>
                  <p className="text-black text-[30px] font-bold">"금전운"</p>
                  <p className="text-black">카테고리가 제일 많았습니다.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border mt-4 p-4 border-black rounded-lg h-fit">
            <PieChart />
          </div>
        </div>
        <div className="col-span-4">
          <div className="border border-black rounded-lg grid grid-cols-12 p-4">
            <div className="col-span-4">
              <img src={TarotCard} alt="오늘의 타로점" />
            </div>
            <div className="col-span-8">
              <h1 className="text-black text-[30px] text-center font-bold">
                오늘의 타로점
              </h1>
              <p className="text-black text-[20px] text-start ms-4 mt-4">
                희망과 치유의 날 입니다. 새로운 기회가 생기고, 긍정적인 에너지가
                넘치는 하루가 될 것 입니다.
              </p>
            </div>
          </div>
          <div className="border border-black rounded-lg mt-2">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-black font-bold m-2 text-[30px] text-center">
                리더 찜리스트
              </h1>
              <div className="me-3">
                <HoverButton
                  label="모두 보기"
                  color="bg-gray-300"
                  hoverColor="bg-gray-500"
                  hsize="h-8"
                  wsize="w-24"
                  fontsize="text-sm"
                ></HoverButton>
              </div>
            </div>
            <div className="grid grid-cols-12 p-2">
              {likeCards.slice(0, 3).map((card, index) => (
                <div key={index} className="col-span-4">
                  {card}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-12 p-2">
              {likeCards.slice(3, 6).map((card, index) => (
                <div key={index} className="col-span-4">
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
