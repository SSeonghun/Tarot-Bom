import React from 'react';
import Card from './Card';
import cardImg from '../../assets/tarot_images - 복사본/c01.jpg';

// interface CardData {
//   id: number;
//   name: string;
//   detail: string;
//   category: string[];
//   imgUrl: string;
//   hsize: string;
//   wsize: string;
// }

// const TarotResult: React.FC = () => {
//   const [cards, setCards] = useState<CardData[]>([]);

//   useEffect(() => {
//     // 데이터 fetch 예제 (API 엔드포인트를 실제로 사용 가능)
//     const fetchData = async () => {
//       try {
//         // 예제 API 호출 (실제 API 엔드포인트로 대체)
//         const response = await fetch('/api/cards');
//         const data = await response.json();
//         setCards(data);
//       } catch (error) {
//         console.error('Error fetching card data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//
const cards = Array.from({ length: 3 }, (_, index) => ({
  id: index,
  name: `ACE & CUPS`,
  detail: `야호 야호 야호 야호 야호 야호 야호 야호 야호 야호 야호 `,
  category: ['금전운'], // 더미 카테고리
  imgUrl: cardImg,
  hsize: 'h-10',
  wsize: 'w-40',
}));

const TarotResult: React.FC = () => {
  return (
    <div className=" col-span-10 text-black p-4 z-10 flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            detail={card.detail}
            category={card.category}
            imgUrl={card.imgUrl}
            hsize={card.hsize}
            wsize={card.wsize}
          />
        ))}
      </div>
    </div>
  );
};

export default TarotResult;
