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
    <div className="relative flex items-center justify-center">
      <div className="bg-black w-[280px] h-[460px] bg-opacity-40 font-semibold text-center rounded-3xl border shadow-lg p-3 max-w-xs bg-cover bg-center hover:scale-105 hover:bg-opacity-80 transition-transform duration-300">
        <img
          className="mb-3 w-[250px] h-45 shadow-lg mx-auto rounded-xl"
          src={imgUrl}
          alt="Card Img"
        />
        {/* 텍스트를 감싸는 div */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 rounded-3xl transition-opacity duration-300 opacity-0 hover:opacity-100">
          <h1 className="text-center text-[30px] font-bold text-purple-400">
            {name}
          </h1>
          <h3 className="text-center text-md w-[200px] text-gray-200 mt-2">
            {detail}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TarotResult;
