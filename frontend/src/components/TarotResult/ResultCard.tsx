// ResultCard.tsx
import React from "react";
import Card from "./Card";

interface CardData {
  name: string;
  desc: string;
  imgUrl: string;
}

interface ResultCardProps {
  selectedCard: CardData[];
}

const ResultCard: React.FC<ResultCardProps> = ({ selectedCard }) => {
  return (
    <div className="col-span-10 text-black p-4 z-10 flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {selectedCard.map((card, index) => (
          <Card
            key={index}
            name={card.name}
            detail={card.desc}
            imgUrl={card.imgUrl}
            hsize="h-10" // 임시 값; 필요에 따라 조정
            wsize="w-40" // 임시 값; 필요에 따라 조정
          />
        ))}
      </div>
    </div>
  );
};

export default ResultCard;
