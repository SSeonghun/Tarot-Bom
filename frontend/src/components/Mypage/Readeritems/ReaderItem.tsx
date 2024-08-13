import React, { useState } from "react";

import Consulting from "./Consulting";
import Matching from "./Matching";
import Reservation from "./Reservation";
import Review from "./Review";
import Summary from "./Summary";
import Toggle from "../../Common/Toggle";
import Offline from "../Offline/Offline";
import useStore from "../../../stores/store";

interface ReaderItemProps {
  data: any;
  onMatchingSelection: (
    selectedCategory: string | null,
    selectedMethod: string | null
  ) => void; // 부모로부터 받을 콜백 함수 타입 정의
}

const ReaderItem: React.FC<ReaderItemProps> = ({
  data,
  onMatchingSelection,
}) => {
  const store = useStore();
  const [activeComponent, setActiveComponent] = useState<string>("Summary");
  console.log(data);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Summary":
        return <Summary mainData={data} />;
      case "Matching":
        return <Matching onSelection={handleMatchingSelection} />;
      case "Review":
        return <Review mainData={data} />;
      case "Reservation":
        return <Reservation />;
      case "Consulting":
        return <Consulting />;
      case "Offline":
        return <Offline shopInfo={data.shopInfo} />;
      default:
        return <Summary mainData={data} />;
    }
  };

  const handleMatchingSelection = (
    selectedCategory: string | null,
    selectedMethod: string | null
  ) => {
    // 부모 컴포넌트로 선택된 값 전달
    onMatchingSelection(selectedCategory, selectedMethod);
  };

  return (
    <div>
      <div className="m-4 bg-gray-200 rounded-lg">
        <div className="grid grid-cols-12 h-[835px]">
          <div className="col-span-2 flex flex-col justify-around items-center">
            <div>
              <div className="flex flex-row">
                <div className="m-8 border-[3px] border-black rounded-full shadow-lg">
                  <img
                    src={store.userInfo?.profileImg}
                    className="rounded-full w-full h-full"
                    alt="리더 프로필 이미지"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-[30px] text-black font-bold">
                  {store.userInfo?.nickname}
                </h1>
                <p className="text-[15px] text-black font-bold">
                  {store.userInfo?.email}
                </p>
              </div>
            </div>
            <ol className="mb-[100px]">
              {[
                "Summary",
                "Matching",
                "Review",
                "Consulting",
                "Reservation",
                "Offline",
              ].map((item) => (
                <li
                  key={item}
                  className={`text-black text-[20px] text-center font-bold mt-4 mb-2 cursor-pointer ${
                    activeComponent === item
                      ? "bg-gray-500 rounded-sm text-white"
                      : ""
                  }`}
                  onClick={() => setActiveComponent(item)}
                >
                  {item === "Summary" && "요약"}
                  {item === "Matching" && "매칭"}
                  {item === "Review" && "리뷰"}
                  {item === "Consulting" && "최근내역"}
                  {item === "Reservation" && "예약일정"}
                  {item === "Offline" && "타로점 관리"}
                </li>
              ))}
            </ol>
          </div>
          <div className="col-span-10 bg-white">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ReaderItem;
