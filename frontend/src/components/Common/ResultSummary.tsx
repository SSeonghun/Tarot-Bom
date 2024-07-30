import React from "react";
import Slider from "react-slick";
import CalendarImo from "../../assets/img/달력.png";
import ResultCard from "./ResultCard";
import MusicPlayer from "./MusicPlayer";

interface ResultSummaryProps {
  date: Date;
}

// ResultCard에 전달할 데이터 배열 정의
const resultCards = [
  { imgNum: 1, title: "THE FOOL" },
  { imgNum: 2, title: "THE MAGICIAN" },
  { imgNum: 3, title: "THE HIGH PRIESTESS" },
  { imgNum: 1, title: "THE EMPRESS" },
  { imgNum: 2, title: "THE EMPEROR" },
  { imgNum: 3, title: "THE HIEROPHANT" },
  { imgNum: 1, title: "THE LOVERS" },
];

const ResultSummary: React.FC<ResultSummaryProps> = ({ date }) => {
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

  return (
    <div>
      <div className="flex items-center space-x-4 mt-4">
        <img src={CalendarImo} alt="달력 이모티콘" className="ms-4" />
        <div className="text-lg font-semibold">{formattedDate}</div>
      </div>
      <div className="m-7">
        <Slider {...settings}>
          {resultCards.map((card, index) => (
            <div key={index} className="p-1">
              <ResultCard imgNum={card.imgNum} title={card.title} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="p-4">
        <h1 className="text-black text-[25px] font-bold">요약</h1>
        <p className="text-gray-800 text-[14px]">
          이 세 가지 카드는 당신이 새로운 시작을 맞이하고 있으며, 이를
          성공적으로 이끌기 위한 능력과 자원을 가지고 있음을 나타냅니다. 그러나
          단순히 외부의 자원만이 아니라, 내면의 지혜와 직감을 따르는 것이
          중요합니다. The Fool은 당신이 새로운 길을 떠날 준비가 되어 있음을, The
          Magician은 당신이 성공할 능력과 자원을 가지고 있음을, 그리고 The High
          Priestess는 직감과 내면의 지혜를 따르는 것이 중요하다는 것을
          말해줍니다. 따라서, 새로운 기회를 맞이하며 자신감을 가지고 도전하되,
          내면의 목소리를 듣고 신중하게 행동하는 것이 좋겠습니다.
        </p>
      </div>
      <div className="mt-4">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default ResultSummary;
