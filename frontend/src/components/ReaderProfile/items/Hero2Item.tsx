import React from "react";
import { useCountUp } from "../../Common/useCountUI";

interface Hero2ItemProps {
  title: string;
  value: number;
  subValue: string;
}

const Hero2Item: React.FC<Hero2ItemProps> = ({ title, value, subValue }) => {
  const count = useCountUp({ start: 0, end: value, duration: 2000 });

  return (
    <div className="m-3 h-[130px] rounded-lg border border-2 bg-white bg-opacity-10 backdrop:filter backdrop-blur-sm border-white border-opacity-60 flex flex-col justify-center items-center">
      <div className="text-center flex flex-row items-end">
        <h1 className="text-[45px] font-bold text-white">{count}</h1>
        <h3 className="text-white ms-2">{subValue}</h3>
      </div>
      <div className="text-center mt-2">
        <h3 className="text-[15px] text-white">{title}</h3>
      </div>
    </div>
  );
};

export default Hero2Item;
