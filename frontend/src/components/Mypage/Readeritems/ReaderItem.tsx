import React, { useState } from "react";

import Consulting from "./Consulting";
import Income from "./Income";
import Reservation from "./Reservation";
import Review from "./Review";
import Summary from "./Summary";
import Toggle from "../../Common/Toggle";
import Profile from "../../../assets/img/profile2.png";
import Seed from "../../../assets/img/seed.png";
import useStore from "../../../stores/store";


interface ReaderItemProps {
  data: any
}


const ReaderItem: React.FC<ReaderItemProps> = ({data}) => {
  const store = useStore();
  const [activeComponent, setActiveComponent] = useState<string>("Summary");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Summary":
        return <Summary mainData={data}/>;
      case "Income":
        return <Income />;
      case "Review":
        return <Review mainData={data}/>;
      case "Reservation":
        return <Reservation />;
      case "Consulting":
        return <Consulting />;
      default:
        return <Summary mainData={data}/>;
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-4">
        <h1 className="text-black text-[50px] font-bold">리더 대시 보드</h1>
        <Toggle />
      </div>
      <hr className="m-4 border-black border-[2px]" />
      <div className="m-4 bg-gray-200 rounded-lg">
        <div className="grid grid-cols-12  h-[835px]">
          <div className="col-span-2 flex flex-col justify-around items-center">
            <div>
              <div className="flex flex-row">
                <img src={store.userInfo?.profileImg} alt="리더 프로필 이미지" />
                <img src={Seed} alt="리더 등급" className="object-contain" />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-[30px] text-black font-bold">{store.userInfo?.nickname}</h1>
                <p className="text-[15px] text-black font-bold">
                  {store.userInfo?.email}
                </p>
              </div>
            </div>
            <ol className="mb-[100px]">
              {["Summary", "Income", "Review", "Consulting", "Reservation"].map(
                (item) => (
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
                    {item === "Income" && "수입"}
                    {item === "Review" && "리뷰"}
                    {item === "Consulting" && "최근내역"}
                    {item === "Reservation" && "예약일정"}
                  </li>
                )
              )}
            </ol>
          </div>
          <div className="col-span-10 bg-white">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ReaderItem;
