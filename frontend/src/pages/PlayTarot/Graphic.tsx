import React, { useEffect, useState } from "react";
import "./Graphic.css";
import cardBackImage from "../../assets/card-back.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./Shuffle.css";
import dask from "../../assets/img/wooden-natural-floor-decoration-concept.jpg";
import dasks from "../../../public/tarot_images/0.jpg";

import Sample from "../../assets/sample.png";

interface MatchingState {
  readerType: string | null;
  payload: Payload;
}

interface Payload {
  keyword: string;
  memeberId: number;
  roomStyle: string;
  worry: string;
}

// 카드 info에서 전체 반환

// 비복원 추출을 위한 유틸리티 함수
const getRandomCard = (excludeCards: number[]): number => {
  const availableCards = Array.from({ length: 79 }, (_, index) => index).filter(
    (card) => !excludeCards.includes(card)
  );
  const randomIndex = Math.floor(Math.random() * availableCards.length);
  return availableCards[randomIndex];
};

// TODO: 메모장 추가 및 props

const Graphic: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [matchingState, setMatchingState] = useState<MatchingState | null>(
    null
  );
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [cardImages, setCardImages] = useState<Record<number, number>>({});
  const [removingCards, setRemovingCards] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<number[]>([]); // `selectedCard`를 상태로 관리
  const [animationClass, setAnimationClass] = useState<string[]>(
    Array(78).fill("card")
  );
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set()); // 뒤집힌 카드 상태

  useEffect(() => {
    console.log("타로 페이지");
    const tarotCards = document.querySelectorAll(".tarot");

    // 딜레이를 두고 새로운 ani 클래스를 추가
    tarotCards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add(`ani${i}`);
      }, i * 20); // 순차적으로 애니메이션을 실행
    });
  }, []); // 빈 배열을 의존성으로 하여 컴포넌트가 처음 렌더링될 때만 실행

  useEffect(() => {
    const state = location.state as MatchingState;
    console.log(state);
    console.log(state);
    if (!state) {
      navigate("/"); // 상태가 없을 경우 리디렉션
    } else {
      setMatchingState(state);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 클릭한 카드와 랜덤 카드 상태를 관리
  const handleCardClick = (index: number) => {
    // 랜덤 카드 선택
    const randomCard = getRandomCard([...selectedCard, index]);
    console.log(index);
    if (selectedCard.length >= 78 || selectedCard.includes(randomCard)) return; // 최대 3개까지만 선택 가능, 이미 선택된 카드 클릭 방지

    console.log("Random Card:", randomCard);

    // 여기에 카드 뒤집기
    // 카드 뒤집기 및 이동 애니메이션을 위해 클래스 추가
    const cardElement = document.querySelector(`.ani${index}`); // 특정 카드 선택
    if (cardElement) {
      // card-selected 클래스를 추가합니다.
      cardElement.classList.add("card-selected");
      cardElement.classList.add("z-index");

      setTimeout(() => {
        cardElement.classList.add("card-remove");
      }, 1000); // 1초 후에 클래스 제거 (애니메이션 시간과 맞추기)
    }

    // 상태 업데이트 삭제를 위한
    // 삭제 대신 움직이기
    setSelectedCard((prevSelectedCards) => [...prevSelectedCards, index]);
    setCardImages((prevCardImages) => ({
      ...prevCardImages,
      [index]: randomCard,
    }));

    // 뽑힌 카드 저장
    // setSelectedCard((prevSelectedCard) => [...prevSelectedCard, randomCard]); // `selectedCard` 상태 업데이트

    // 카드 뒤집기 상태 업데이트
    setFlippedCards((prev) => {
      const newFlippedCards = new Set(prev);
      if (newFlippedCards.has(index)) {
        newFlippedCards.delete(index);
      } else {
        newFlippedCards.add(index);
      }
      return newFlippedCards;
    });

    // 여기에 카드 ani{index} 클래스제거
  };

  // 모달 열기
  const openModal = () => setIsModalOpen(true);

  // 모달 닫기
  const closeModal = () => setIsModalOpen(false);

  const shuffle2 = () => {
    const tarotCards = document.querySelectorAll(".tarot");

    // 모든 카드에서 ani 클래스를 제거합니다.
    tarotCards.forEach((card) => {
      card.classList.remove(
        ...Array.from(card.classList).filter((cls) => cls.startsWith("ani"))
      );
    });

    // 딜레이 후 애니메이션 클래스를 추가합니다.
    tarotCards.forEach((card, i) => {
      // 애니메이션 클래스를 순차적으로 추가합니다.
      setTimeout(() => {
        card.classList.add(`ani${i}`);
      }, 1000 + i * 20); // 각 카드의 애니메이션을 순차적으로 실행합니다. (딜레이 조정)
    });
  };

  if (!matchingState) {
    return <div>로딩 중...</div>;
  }

  const submitClick = () => {
    // `selectedCard`, `worry`, `category`를 TarotResult로 전달
    const state = location.state as MatchingState;
    navigate("/tarot-result", {
      state: {
        reader: state.readerType,
        selectedCard: selectedCard,
        worry: state.payload.worry, // worry 전달
        category: state.payload.keyword || "기본 카테고리", // category 전달, 기본값 설정
      },
    });
  };

  const getCardImage = (index: number[]): string => {
    console.log(index.length);
    const lastIndex = index[index.length - 1];
    return `/tarot_images/${lastIndex}.jpg`;
  };

  return (
    <div className="flex items-center relative justify-center min-h-screen p-4 page">
      <div className="">
        <img
          src={dask}
          alt=""
          className="absolute -bottom-[120px] dask rounded-lg h-[900px]"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative w-full max-w-4xl p-4 mb-auto mt-16 mr-auto ml-36">
        {/* Display selected numbers */}
        <div className="absolute top-0 p-4 right-0">
          <ul className="text-white">
            {selectedCards.map((card, idx) => (
              <li key={idx}>카드 {cardImages[card]}</li>
            ))}
          </ul>
        </div>
        {/* Container for the cards */}
        <div className="relative-container w-screen h-screen -bottom-[120px] background">
          {Array.from(
            { length: 78 },
            (_, index) =>
              !selectedCards.includes(index) && (
                <div key={index} className="tarot-container">
                  <div
                    className={`tarot rounded-lg ${
                      flippedCards.has(index) ? "is-flipped" : ""
                    }`}
                  >
                    <div
                      onClick={() => handleCardClick(index)}
                      className="tarotcard"
                    >
                      <div className={`tarot-face tarot-front`}>
                        <img src={cardBackImage} alt="Card Front" />
                      </div>
                      <div className="tarot-face tarot-back">
                        <img
                          src={getCardImage(selectedCard)}
                          alt={`Card Back ${index}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        {/* 모달 및 버튼 */}
        <div className="flex flex-row justify-between fixed bottom-0 right-0 gap-4 m-4">
          <button
            onClick={shuffle2}
            className=" bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
          >
            SHUFFLE
          </button>
          <button
            onClick={openModal}
            className=" bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
          >
            열기
          </button>
          <button
            onClick={submitClick}
            className=" bg-blue-500 text-white px-4 py-2 rounded"
          >
            결과보기
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 w-11/12 h-11/12 relative overflow-auto">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors duration-300"
              >
                닫기
              </button>
              <h2 className="text-black text-2xl mb-4">선택된 카드</h2>
              {/* 모달 내용 - 3열 레이아웃 */}
              <div className="grid grid-cols-12 gap-4">
                {selectedCard.map((cardIndex) => (
                  <div
                    key={cardIndex}
                    className="w-28 h-48 col-span-1 bg-cover bg-center rounded-lg"
                    style={{
                      backgroundImage: `url(/tarot_images/${cardImages[cardIndex]}.jpg)`, // 랜덤 카드 인덱스에 따른 이미지 경로
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Graphic;
