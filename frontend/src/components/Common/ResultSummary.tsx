import React, { useState } from 'react';
import Slider from 'react-slick';
import CalendarImo from '../../assets/img/달력.png';
import ResultCard from './ResultCard';
import MusicPlayer from './MusicPlayerCopy';
import { useNavigate } from 'react-router-dom';
import ReviewModal from '../Mypage/seekeritems/ReviewModal'; // 경로를 맞게 수정하세요

interface ResultSummaryProps {
  date: Date;
  cards: { imgNum: number; name: string; imageUrl: string; resultId: number; }[];
  keyword: string;
  music: string;
  readerId: number;
  summary: string;
  resultId: number;
  seekerId: number;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({
  date,
  cards,
  keyword,
  music,
  readerId,
  summary,
  resultId,
  seekerId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 슬라이드 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleCardClick = (resultId: number) => {
    navigate(`/result/search/${resultId}`);
  };

  const handleSubmit = () => {
    // 완료 버튼 클릭 시 처리할 로직
    console.log("리뷰 제출 완료");
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className=''>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <img src={CalendarImo} alt="달력 이모티콘" className="ms-4" />
          <div className="text-lg font-semibold">{formattedDate}</div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2 py-1 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 mx-5"
        >
          리뷰 작성
        </button>
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
      <div className="mt-4">
        <MusicPlayer title={music} />
      </div>

      {/* 모달 컴포넌트 추가 */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        readerId={readerId} // 추가된 부분
        resultId={resultId} // 추가된 부분
        seekerId={seekerId} // 추가된 부분
      />
    </div>
  );
};

export default ResultSummary;
