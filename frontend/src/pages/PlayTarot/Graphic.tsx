import React, { useEffect, useState } from 'react';
import './Graphic.css';
import cardBackImage from '../../assets/card-back.png';
import { useLocation, useNavigate } from 'react-router-dom';
import './Shuffle.css';

import '../../assets/css/FlipCard2.css';
import Sample from '../../assets/sample.png';

interface MatchingState {
  selectReader: string | null;
  selectedLabel: string | null;
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

const Graphic: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [matchingState, setMatchingState] = useState<MatchingState | null>(null);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [cardImages, setCardImages] = useState<Record<number, number>>({});
  const [removingCards, setRemovingCards] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<number[]>([]); // `selectedCard`를 상태로 관리
  const [animationClass, setAnimationClass] = useState<string[]>(Array(78).fill('card'));
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set()); // 뒤집힌 카드 상태

  useEffect(() => {
    console.log('타로 페이지');
    const tarotCards = document.querySelectorAll('.tarot');

    // 딜레이를 두고 새로운 ani 클래스를 추가
    tarotCards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add(`ani${i}`);
      }, i * 20); // 순차적으로 애니메이션을 실행
    });
  }, []); // 빈 배열을 의존성으로 하여 컴포넌트가 처음 렌더링될 때만 실행

  useEffect(() => {
    const state = location.state as MatchingState;
    if (!state) {
      navigate('/'); // 상태가 없을 경우 리디렉션
    } else {
      setMatchingState(state);
    }
  }, [location.state, navigate]);

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
    console.log('Random Card:', randomCard);

    // 여기에 카드 뒤집기

    // 상태 업데이트 삭제를 위한
    setSelectedCards((prevSelectedCards) => [...prevSelectedCards, index]);
    setCardImages((prevCardImages) => ({
      ...prevCardImages,
      [index]: randomCard,
    }));

    // 뽑힌 카드 저장
    setSelectedCard((prevSelectedCard) => [...prevSelectedCard, randomCard]); // `selectedCard` 상태 업데이트

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
  };

  // 모달 열기
  const openModal = () => setIsModalOpen(true);

  // 모달 닫기
  const closeModal = () => setIsModalOpen(false);

  const shuffle = () => {
    const tarotCards = document.querySelectorAll('.tarot');

    // 각 요소에 대해 클래스네임을 변경하는 로직
    tarotCards.forEach((card, i) => {
      console.log('ani' + i);
      setTimeout(() => {
        card.className = `tarot ani${i}`;
      }, i * 20);
    });
  };

  const shuffle2 = () => {
    const tarotCards = document.querySelectorAll('.tarot');

    // 모든 카드에서 ani 클래스를 제거합니다.
    tarotCards.forEach((card) => {
      card.classList.remove(...Array.from(card.classList).filter((cls) => cls.startsWith('ani')));
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
    navigate('/tarot-result', {
      state: {
        selectedCard: selectedCard,
        worry: matchingState.worry, // worry 전달
        category: matchingState.selectedLabel || '기본 카테고리', // category 전달, 기본값 설정
      },
    });
  };

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
        <div className="relative-container w-screen h-screen">
          {Array.from(
            { length: 78 },
            (_, index) =>
              !selectedCards.includes(index) && (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)} // 클릭 핸들러 추가
                  className={`tarot w-[100px] h-[150px] border-[3px] border-black bg-cover bg-center rounded-lg absolute transition-transform duration-150 ease-in-out transform hover:scale-110
                     ${flippedCards.has(index) ? '' : ''}
                     ${removingCards.includes(index) ? 'animate-card-remove' : ''}`} // 애니메이션 클래스 추가
                  style={{
                    backgroundImage: `url(${cardBackImage})`,
                    // top: `${(index % 3) * 200}px`, // Vertical offset based on the row
                    // left: `${Math.floor(index / 3) * 25}px`, // Horizontal offset based on the column
                  }}
                />
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
          <button onClick={submitClick} className=" bg-blue-500 text-white px-4 py-2 rounded">
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
