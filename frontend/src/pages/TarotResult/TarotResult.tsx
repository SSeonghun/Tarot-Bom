// TarotResult.tsx
import React, { useEffect, useState } from "react";
import Title from "../../components/TarotResult/Title";
import ResultSummary from "../../components/TarotResult/ResultSummary";
import { useLocation } from "react-router-dom";

const { cardInfo } = require("../../API/api");

interface TarotResultState {
  selectedCard: number[];
  worry: string;
  category: string;
}

interface CardData {
  name: string;
  desc: string;
  imgUrl: string;
}

const TarotResult: React.FC = () => {
  const location = useLocation();
  const state = location.state as TarotResultState;
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    const loadCardData = async () => {
      try {
        const cardDetails: CardData[] = [];

        for (const cardId of state.selectedCard) {
          const response = await cardInfo(cardId + 1); // Assuming cardId needs an increment
          cardDetails.push({
            imgUrl: response.data.imageUrl,
            name: response.data.cardName,
            desc: response.data.description,
          });
        }

        setCards(cardDetails); // Update state after all cards are fetched
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    if (state.selectedCard.length > 0) {
      loadCardData();
    } else {
    }
  }, [state.selectedCard]);

  // `selectedCard`, `worry`, `category`가 전달되지 않았을 경우 처리
  if (!state || !state.selectedCard || !state.worry || !state.category) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className="relative w-screen min-h-screen bg-black">
      <Title selectedCard={cards} />
      {/* 결과 요약 */}
      <ResultSummary
        selectedCard={cards}
        worry={state.worry}
        category={state.category}
      />
    </div>
  );
};

export default TarotResult;
