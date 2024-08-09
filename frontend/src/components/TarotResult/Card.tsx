import React from "react";

// interface CardProps {
//   name: string;
//   detail: string;
//   category: string[];
//   imgUrl: string;
//   hsize: string;
//   wsize: string;
// }

interface CardProps {
  key: number;
  name: string;
  detail: string;
  imgUrl: string;
  hsize: string;
  wsize: string;
}

// : 타로 결과 받아서 뿌려주기 + S3 이미지 데이터 가져오기

const TarotResult: React.FC<CardProps> = ({
  name,
  detail,
  imgUrl,
  hsize,
  wsize,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-black w-[300px] bg-opacity-40 font-semibold text-center rounded-3xl border shadow-lg p-3 max-w-xs bg-cover bg-center hover:scale-105 hover:bg-opacity-80 transition-transform duration-300">
        <img
          className="mb-3 w-[250px] h-45  shadow-lg mx-auto"
          src={imgUrl}
          alt="Card Img"
        />
        <h1 className="text-end text-[30px] font-bold text-purple-400">
          {name}
        </h1>
        <h3 className="text-end text-md text-gray-200">{detail}</h3>
      </div>
    </div>
  );
};

export default TarotResult;
