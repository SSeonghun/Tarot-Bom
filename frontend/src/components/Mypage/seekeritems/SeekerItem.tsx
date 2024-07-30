import React from "react";
import HoverButton from "../../Common/HoverButton";
import Hero1 from "./Hero1";
import Hero2 from "./Hero2";
import Hero3 from "./Hero3";

const ReaderMypage: React.FC = () => {
  return (
    <div className="container p-4 mx-auto">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-black font-bold text-[50px] m-4">
          김싸피님 마이페이지
        </h1>
        <div className="m-4">
          <HoverButton
            label="리더 프로필 만들기"
            color="bg-gray-300"
            hoverColor="bg-gray-500"
            hsize="h-12"
            wsize="w-48"
            fontsize="text-lg"
          ></HoverButton>
        </div>
      </div>
      <hr className="border-black border-[2px]" />
      <div className="mt-3">
        <Hero1 />
      </div>
      <h1 className="text-black font-bold text-[50px] mt-[100px] ms-4 me-4 mb-4">
        최근 타로 내역
      </h1>
      <hr className="border-black border-[2px]" />
      <div className="mt-3">
        <Hero2 />
      </div>
      <div className="mt-3">
        <Hero3 />
      </div>
    </div>
  );
};

export default ReaderMypage;
