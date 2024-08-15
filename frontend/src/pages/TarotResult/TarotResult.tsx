import React, { useEffect, useState } from "react";
import Title from "../../components/TarotResult/Title";
import ResultSummary from "../../components/TarotResult/ResultSummary";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const { cardInfo } = require("../../API/api");

interface TarotResultState {
  reader: string;
  selectedCard: number[];
  worry: string;
  category: string;
  candidateId:number;
}

interface CardData {
  cardId: number;
  name: string;
  desc: string;
  imgUrl: string;
}

const TarotResult: React.FC = () => {
  const location = useLocation();
  const state = location.state as TarotResultState;
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(state)
  useEffect(() => {
    const loadCardData = async () => {
      try {
        const cardDetails: CardData[] = [];

        for (const cardId of state.selectedCard) {
          const response = await cardInfo(cardId + 1); // Assuming cardId needs an increment
          cardDetails.push({
            cardId: cardId + 1,
            imgUrl: response.data.imageUrl,
            name: response.data.cardName,
            desc: response.data.description,
          });
        }

        setCards(cardDetails); // Update state after all cards are fetched
        setLoading(false); // Set loading to false after all data is loaded
      } catch (error) {
        console.error("Error fetching card data:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    if (state.selectedCard.length > 0) {
      loadCardData();
    }
  }, [state.selectedCard]);

  // 유효하지 않은 state 처리
  if (!state || !state.selectedCard || !state.worry || !state.category) {
    return <div>잘못된 접근입니다.</div>;
  }

  // PDF 저장 기능 함수
  const saveAsPDF = async () => {
    const input = document.getElementById("tarot-result") as HTMLElement;

    if (!input) {
      console.error("Element not found!");
      return;
    }

    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("tarot-result.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div id="tarot-result" className="relative w-screen min-h-screen bg-black">
      <Title selectedCard={cards} />
      {!loading && (
        <ResultSummary
          readerType={state.reader}
          selectedCard={cards}
          worry={state.worry}
          category={state.category}
          candidateId={state.candidateId}
        />
      )}

      {loading && (
        <div className="absolute bottom-4 right-4 text-white">
          결과를 불러오는 중입니다...
        </div>
      )}
    </div>
  );
};

export default TarotResult;
