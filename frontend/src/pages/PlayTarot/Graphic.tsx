import React, { useEffect, useState } from 'react';
import './Graphic.css';
import cardBackImage from '../../assets/card-back.png';

// TODO : 타로 결과를 위한 axios로 서버로 넘겨주기
// 비복원 추출을 위한 유틸리티 함수
const getRandomCard = (excludeCards: number[]): number => {
  const availableCards = Array.from({ length: 78 }, (_, index) => index).filter(
    (card) => !excludeCards.includes(card)
  );
  const randomIndex = Math.floor(Math.random() * availableCards.length);
  return availableCards[randomIndex];
};

const Graphic: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [cardImages, setCardImages] = useState<Record<number, number>>({});
  const [removingCards, setRemovingCards] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 클릭한 카드와 랜덤 카드 상태를 관리
  const handleCardClick = (index: number) => {
    if (selectedCards.length >= 3 || selectedCards.includes(index)) return; // 최대 3개까지만 선택 가능, 이미 선택된 카드 클릭 방지

    // 랜덤 카드 선택
    const randomCard = getRandomCard([...selectedCards, index]);

    // 선택된 카드와 랜덤 카드 상태 업데이트
    setSelectedCards([...selectedCards, index]);
    setCardImages((prev) => ({ ...prev, [index]: randomCard }));

    // 카드가 뽑히는 애니메이션 후 카드 제거 애니메이션
    setTimeout(() => {
      setRemovingCards([...removingCards, index]); // 클릭한 카드만 제거 상태 업데이트
    }, 3000);

    console.log(`Selected card number: ${randomCard}`);
  };

  // 모달 열기
  const openModal = () => setIsModalOpen(true);

  // 모달 닫기
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 page">
      <div className="relative w-full max-w-4xl p-4 mb-auto mt-16 mr-auto ml-36">
        {/* Display selected numbers */}
        <div className="absolute top-0 p-4 right-0">
          <h2 className="text-white text-lg">선택된 카드:</h2>
          <ul className="text-white">
            {selectedCards.map((card, idx) => (
              <li key={idx}>카드 {cardImages[card]}</li>
            ))}
          </ul>
        </div>
        {/* Container for the cards */}
        <div className="absolute inset-0 grid grid-cols-1 gap-4">
          {Array.from(
            { length: 78 },
            (_, index) =>
              !selectedCards.includes(index) && (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)} // 클릭 핸들러 추가
                  className={`w-24 h-36 bg-cover bg-center rounded-lg absolute transition-transform duration-300 ease-in-out transform hover:scale-125 ${
                    removingCards.includes(index) ? 'animate-card-remove' : ''
                  }`} // 애니메이션 클래스 추가
                  style={{
                    backgroundImage: `url(${cardBackImage})`,
                    top: `${(index % 3) * 200}px`, // Vertical offset based on the row
                    left: `${Math.floor(index / 3) * 25}px`, // Horizontal offset based on the column
                  }}
                />
              )
          )}
        </div>
        {/* 모달 및 버튼 */}
        <button
          onClick={openModal}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          열기
        </button>
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
              <div className="grid grid-cols-3 gap-2">
                {selectedCards.map((cardIndex) => (
                  <div
                    key={cardIndex}
                    className="w-28 h-48 bg-cover bg-center rounded-lg"
                    style={{
                      backgroundImage: `url(/tarot_images/${cardImages[cardIndex]}.jpg)`, // 랜덤 카드 인덱스에 따른 이미지 경로
                    }}
                  />
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
