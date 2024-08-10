import React from "react";

// ResultCard의 props 타입 정의
interface ResultCardProps {
  imgNum: number;
  title: string;
  img: string;
}

// props를 받아서 사용할 ResultCard 컴포넌트
const ResultCard: React.FC<ResultCardProps> = ({ 
  imgNum, 
  title, 
  img, 
}) => {

  return (
    <div>
      <div className="p-2 bg-black rounded">
        <img src={img} alt={`타로결과 이미지 ${imgNum}`} />
      </div>
      <div>{title}</div>
    </div>
  );
};

export default ResultCard;
