import React from "react";
import HoverButton from "../../Common/HoverButton";

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
      <hr className="border-black" />
    </div>
  );
};

export default ReaderMypage;
