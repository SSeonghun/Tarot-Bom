import React, { useState } from 'react';
import HoverButton from '../../Common/HoverButton';
import Hero1 from './Hero1';
import Hero2 from './Hero2';
import ResultSummary from '../../Common/ResultSummary';
import Toggle from '../../Common/Toggle';
import { Link } from 'react-router-dom';




interface SeekerItemProps {
  data: {
    name: string;
    email: string;
    reservationList: any[]; // 예약 리스트의 타입에 맞게 수정
    totalConsulting: number;
    analyze: {
      categories: {}; // categories의 구조에 맞게 수정
    };
    favoriteReaderList: any[]; // 찜리스트의 타입에 맞게 수정
    tarotResults: any[]; // 타로 결과의 타입에 맞게 수정
    reader: boolean; // 리더 여부
  }
}

const SeekerItem: React.FC<SeekerItemProps> = ({ data }) => {
  const [visibleResults, setVisibleResults] = useState(6); // 초기 보이는 타로 결과 수
  const recentTarotResults = data.tarotResults.slice(0, visibleResults);


  // 더보기 버튼 클릭 시 호출되는 함수
  const handleLoadMore = () => {
    setVisibleResults(prev => prev + 3); // 3개씩 추가
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-black font-bold text-[50px] m-4">{data.name}님 마이페이지</h1>
        <div className="m-4">
          {/* data.reader가 true일 때 Toggle, false일 때 HoverButton을 렌더링 */}
          {data.reader ? (
            <></>
          ) : (
            <Link to="/create-reader">
              <HoverButton
                label="리더 프로필 만들기"
                color="bg-gray-300"
                hoverColor="bg-gray-500"
                hsize="h-12"
                wsize="w-48"
                fontsize="text-lg"
              />
            </Link>
          )}
        </div>
      </div>
      <hr className="border-black border-[2px]" />

      <div className="mt-3">
        <Hero1
          reservationList={data.reservationList}
          totalConsulting={data.totalConsulting}
          Categories={data.analyze.categories}
          favoriteReaderList={data.favoriteReaderList}
        />
      </div>

      <h1 className="text-black font-bold text-[50px] mt-[100px] ms-4 me-4 mb-4">최근 타로 내역</h1>
      <hr className="border-black border-[2px]" />
      
      <div className="mt-3">
        <div className="grid grid-cols-12 gap-4">
          {recentTarotResults.map((result, index) => (
            <div key={index} className="col-span-4 border border-gray-600 mt-4 rounded-lg">
              <ResultSummary
                date={new Date(result.date)} // 날짜
                cards={result.cards} // 카드 데이터
                keyword={result.keyword} // 키워드
                music={result.music} // 음악 제목
                readerId={result.readerId} // 리더 ID
                summary={result.summary} // 요약
                resultId={result.resultId}
              /> {/* 결과의 구조에 맞게 수정 */}
            </div>
          ))}
        </div>
      </div>

      {/* 더보기 버튼 */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleLoadMore}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105"        >
          더보기
        </button>
      </div>
    </div>
  );
};

export default SeekerItem;
