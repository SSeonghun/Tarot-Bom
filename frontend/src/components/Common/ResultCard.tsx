import React from "react";
import TarotImg1 from "../../assets/tarot_images - 복사본/m06.jpg";
import TarotImg2 from "../../assets/tarot_images - 복사본/m07.jpg";
import TarotImg3 from "../../assets/tarot_images - 복사본/m08.jpg";

// ResultCard의 props 타입 정의
interface ResultCardProps {
  imgNum: number;
  title: string;
}

// props를 받아서 사용할 ResultCard 컴포넌트
const ResultCard: React.FC<ResultCardProps> = ({ imgNum, title }) => {
  // 이미지 번호에 따라 이미지를 선택
  const getImage = (num: number) => {
    switch (num) {
      case 1:
        return TarotImg1;
      case 2:
        return TarotImg2;
      case 3:
        return TarotImg3;
    }
  };

  return (
    <div>
      <div className="p-2 bg-black rounded">
        <img src={getImage(imgNum)} alt={`타로결과 이미지 ${imgNum}`} />
      </div>
      <div>{title}</div>
    </div>
  );
};

export default ResultCard;
