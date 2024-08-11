import React from "react";
import HoverButton from "../Common/HoverButton";
import PrivateLink from "../Common/PrivateLink";
import CommonButton from "../Common/CommonButton";
import Witch from "../../assets/img/witch.webp";
import Meteo from "../Common/Meteo";
import MainBack from "../../assets/img/MainBack.jpg";

// Main Section 1
const Hero1: React.FC = () => {
  return (
    <div className="relative w-screen h-[860px]  bg-gray-900 z-99 ">
      <Meteo />
      <img
        className="w-full h-full object-cover opacity-50"
        src={MainBack}
        alt="Main Background"
        style={{ objectPosition: "bottom" }}
      />
      <img
        src={Witch}
        alt=""
        className="absolute left-[200px] top-[200px] w-[500px]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col right-[300px] items-end justify-center text-end text-white px-4">
        <p className="text-9xl mb-4 font-bold" style={{ color: "#EBCB8B" }}>
          타로 : 봄
        </p>
        <p className="text-[20px] mb-8" style={{ color: "#EBCB8B" }}>
          타로:봄은 실시간 타로 리딩 플랫폼으로, <br />
          랜덤 매칭이나 AI 타로를 통해 즉시 답을 얻을 수 있습니다. <br />
          예약 시스템을 통해 원하는 타로 리더와 심층 상담도 가능합니다. <br />
          언제 어디서나 통찰을 받을 수 있습니다.
        </p>
        <div className="space-y-6 space-x-4">
          <PrivateLink to="/online">
            <CommonButton
              label="지금 만나보세요!"
              color="bg-gray-300"
              hoverColor="bg-gray-500"
              hsize="h-12"
              wsize="w-48"
              fontsize="text-lg"
            />
          </PrivateLink>
        </div>
      </div>

      {/* <div className="absolute inset-x-0 bottom-0 bg-white opacity-20 z-0 flex flex-col items-end h-20"></div> */}
    </div>
  );
};

export default Hero1;
