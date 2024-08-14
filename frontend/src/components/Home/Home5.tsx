import React from "react";
import Book from "../../assets/img/book.webp";
import Tarot from "../../assets/img/tarot2.webp";

// Main Section 1
const Hero1: React.FC = () => {
  return (
    <div className="relative w-screen h-[700px] bg-black z-99">
      <div className="h-full w-full flex flex-row justify-center items-center">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-6">
            <div className="w-[500px] h-[400px] text-end rounded-lg text-black animate-slide-up justify-center items-center">
              <h3 className="font-bold text-[25px] text-violet-600">접근성</h3>
              <h1 className="font-bold text-white text-[55px]">누구나</h1>
              <h1 className="font-bold text-white text-[55px]">타로 리더</h1>
              <p className="highlight text-gray-200 font-bold text-[20px] mt-3">
                타로 리더가 되는 기능은 누구나 타로 상담사로 참여할 수 있도록
                하여, 사용자에게 다양한 시각에서의 조언과 통찰을 제공합니다.
                이를 통해 사용자는 여러 리더와의 상담을 통해 문제를 새로운
                방향에서 분석하고 해답을 찾을 수 있습니다. 이 기능은 타로 상담의
                깊이를 더하고, 사용자에게 풍부한 경험을 제공하며, 리더에게는
                자신의 통찰력을 공유할 기회를 제공합니다.
              </p>
            </div>
          </div>
          <div className="relative grid col-span-6">
            <img
              src={Book}
              alt=""
              className="absolute inset-0 z-99 top-[70px]"
            />
            <img
              src={Tarot}
              alt=""
              className="relative z-100 -top-[50px]  ms-auto me-auto right-[25px]"
              style={{
                width: "70%", // 원하는 너비 비율로 조절
                height: "auto", // 자동 높이 조절
                objectFit: "contain", // 비율 유지하면서 잘림 방지
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
