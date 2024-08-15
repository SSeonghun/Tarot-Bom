import React, { useState } from "react";
import CommonButton from "../../Common/CommonButton";

import Heart from "../../../assets/img/heart.webp";
import Healthy from "../../../assets/img/heathy.webp";
import Course from "../../../assets/img/course.webp";
import Money from "../../../assets/img/money.webp";
import Etc from "../../../assets/img/question.webp";
import Cam from "../../../assets/img/cam.webp";
import Tarot from "../../../assets/img/tarot.webp";

// 부모 컴포넌트로부터 전달받는 `onSelection` 함수의 타입 정의
interface IncomeProps {
  onSelection: (
    selectedCategory: string | null,
    selectedMethod: string | null
  ) => void;
}

const Income: React.FC<IncomeProps> = ({ onSelection }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const handleMethodClick = (method: string) => {
    setSelectedMethod((prevMethod) => (prevMethod === method ? null : method));
  };

  const handleButtonClick = () => {
    // 부모 컴포넌트로 선택된 카테고리와 리딩 방법을 전달
    onSelection(selectedCategory, selectedMethod);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center mx-8">
      <p className="text-center font-bold">카테고리를 선택하세요</p>
      <div className="grid grid-cols-5 gap-4 m-2">
        {[
          { id: "G01", image: Heart, label: "연애운" },
          { id: "G02", image: Course, label: "진로운" },
          { id: "G03", image: Money, label: "금전운" },
          { id: "G04", image: Healthy, label: "건강운" },
          { id: "G05", image: Etc, label: "기타" },
        ].map((item) => (
          <div
            key={item.id}
            className={`relative col-span-1 h-[250px] rounded-lg flex flex-col justify-center items-center cursor-pointer ${
              selectedCategory === item.id ? "bg-gray-500" : "bg-gray-200"
            }`}
            onClick={() => handleCategoryClick(item.id)}
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-[150px] h-[150px]"
            />
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 rounded-lg">
              <h3 className="text-[25px] font-bold text-white text-center">
                {item.label}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center font-bold mt-4">리딩 방법을 선택하세요</p>
      <div className="grid grid-cols-2 gap-4 m-2 ">
        <div
          className={`relative col-span-1 h-[150px] rounded-lg flex flex-row items-center justify-center cursor-pointer ${
            selectedMethod === "CAM"
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => handleMethodClick("CAM")}
        >
          <img src={Cam} alt="캠으로 리딩하기" className="h-[120px] me-4" />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 rounded-lg"></div>
          <h3 className="text-[25px] font-bold  text-center z-10">
            캠으로 리딩하기
          </h3>
        </div>
        <div
          className={`relative col-span-1 h-[150px] rounded-lg flex flex-row items-center justify-center cursor-pointer ${
            selectedMethod === "GFX"
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => handleMethodClick("GFX")}
        >
          <img
            src={Tarot}
            alt="그래픽으로 리딩하기"
            className="h-[120px] me-4"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 rounded-lg"></div>
          <h3 className="text-[25px] font-bold  text-center z-10">
            그래픽으로 리딩하기
          </h3>
        </div>
      </div>

      <div className="grid justify-center items-center mt-10">
        <CommonButton
          label="시작하기"
          color="bg-blue-500"
          textColor="text-white"
          hoverColor="hover:bg-blue-600"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default Income;
