// TarotResult.tsx
import React, { useEffect, useState } from "react";
import Title from "../../components/TarotResult/Title";
import ResultSummary from "../../components/TarotResult/ResultSummary";

//TODO: result_get에 보낼 resultId 받아 오기
const { cardInfo,result_get } = require("../../API/api");

interface ResultData {
  summary: string;
  keyword: string;
  cards: {
    cardId: number;
    sequence: number;
    direction: string;
  }[];
}
interface CardData {
  name: string;
  desc: string;
  imgUrl: string;
}

const TarotResult: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  useEffect(() => {
    const fetchAndLoadData = async () => {
      try {
        const fetchedResultData: ResultData = await result_get(1);
        setResultData(fetchedResultData);
        const cardDetails: CardData[] = [];
        console.log(fetchedResultData)
        for (const card of fetchedResultData.cards) {
          const response = await cardInfo(card.cardId); // Assuming cardId needs an increment
          cardDetails.push({
            imgUrl: response.data.imageUrl,
            name: response.data.cardName,
            desc: response.data.description,
          });
        }

        setCards(cardDetails); // Update state after all cards are fetched
    }catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
      fetchAndLoadData()
  
  }, []);


  if (!resultData) {
    return <div>잘못된 접근입니다.</div>; // resultData가 null일 때 이 메시지를 보여줍니다.
  }
  return (
   
    <div className="relative w-screen min-h-screen bg-black">
      <Title selectedCard={cards} />
      {/* 결과 요약 */}
      <ResultSummary
        selectedCard={cards}
        worry={resultData.summary}
        category={resultData.keyword}
      />
    </div>
  );
};

export default TarotResult;
  // `selectedCard`, `worry`, `category`가 전달되지 않았을 경우 처리
  // if (!state || !state.selectedCard || !state.worry || !state.category) {
  //   return <div>잘못된 접근입니다.</div>;
  // }
  // if (state && state.selectedCard && state.selectedCard.length > 0) {
  // } else {
  //} 
  //else{
  // return <div>잘못된 접근입니다.</div>;
  //}
  //if (resultData) {
  // console.log(setState)
  // if (state) {
  //   console.log(state){}
  //const location = useLocation();
  // const state = location.state as TarotResultState |null;
  // interface TarotResultState {
  //   selectedCard: number[];
  //   worry: string;
  //   category: string;
  // }
  //import { useLocation } from "react-router-dom";