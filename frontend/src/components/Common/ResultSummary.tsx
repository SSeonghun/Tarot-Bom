import React from 'react';
import Slider from 'react-slick';
import CalendarImo from '../../assets/img/달력.png';
import ResultCard from './ResultCard';
import MusicPlayer from './MusicPlayerCopy';
import { useNavigate } from 'react-router-dom';

interface ResultSummaryProps {
  date: Date;
  cards: { imgNum: number; name: string; imageUrl: string; resultId: number; }[]; // 카드 데이터 배열
  keyword: string; // 키워드
  music: string; // 음악 제목
  readerId: number; // 리더 ID
  summary: string; // 요약
  resultId: number;
}

// TODO : 각각 원하는 결과 뿌려주기 props로 받아서

const ResultSummary: React.FC<ResultSummaryProps> = ({
  date,
  cards,
  keyword,
  music,
  readerId,
  summary,
  resultId,
}) => {

  const navigate = useNavigate();

  // 슬라이드 설정
  const settings = {
    dots: true, // 슬라이드 하단의 점 표시
    infinite: true, // 무한 반복
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 3, // 한 화면에 표시할 슬라이드 수
    slidesToScroll: 1, // 슬라이드 전환 시 이동할 슬라이드 수
    responsive: [
      {
        breakpoint: 1024, // 화면 너비가 1024px 이하일 때
        settings: {
          slidesToShow: 2, // 슬라이드 2개
        },
      },
      {
        breakpoint: 600, // 화면 너비가 600px 이하일 때
        settings: {
          slidesToShow: 1, // 슬라이드 1개
        },
      },
    ],
  };

  // 날짜를 포맷팅
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleCardClick = (resultId: number) => {
    console.log(11)
    navigate(`/result/search/${resultId}`);
  };
  console.log(resultId)
  return (
    <div onClick={() => handleCardClick(resultId)}>
      <div className="flex items-center space-x-4 mt-4" >
        <img src={CalendarImo} alt="달력 이모티콘" className="ms-4" />
        <div className="text-lg font-semibold">{formattedDate}</div>
      </div>
      <div className="m-7">
        <Slider {...settings}>
          {cards.map((card, index) => (
            <div key={index} className="p-1">
              <ResultCard
              imgNum={card.imgNum} 
              title={card.name} 
              img={card.imageUrl}
               />
            </div>
          ))}
        </Slider>
      </div>
      <div className="p-4">
        <h1 className="text-black text-[25px] font-bold">요약</h1>
        <p className="text-gray-800 text-[14px]">
          {summary}  
        </p>
      </div>
      {/* TODO : YOUTUBE API 안됨 */}
      <div className="mt-4">
        <MusicPlayer title="" />
      </div>
    </div>
  );
};

export default ResultSummary;
