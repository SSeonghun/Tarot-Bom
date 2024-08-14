import React, { useState, useEffect } from 'react';
import HoverButton from '../../Common/HoverButton';
import Hero1 from './Hero1';
import ResultSummary from '../../Common/ResultSummary';
import { Link } from 'react-router-dom';
import { seekerReview } from '../../../API/api';

interface SeekerItemProps {
  data: {
    name: string; // 이름
    email: string; // 이메일
    reservationList: any[]; // 예약 리스트
    totalConsulting: number; // 총 상담 횟수
    analyze: {
      categories: {}; // 분석 카테고리
    };
    favoriteReaderList: any[]; // 찜리스트
    tarotResults: any[]; // 타로 결과
    reader: boolean; // 리더 여부
  }
}

const SeekerItem: React.FC<SeekerItemProps> = ({ data }) => {
  const [visibleResults, setVisibleResults] = useState(6); // 초기 보이는 타로 결과 수
  const [reviewResultIds, setReviewResultIds] = useState<number[]>([]); // 리뷰 resultId 배열 상태
  const recentTarotResults = data.tarotResults.slice(0, visibleResults); // 최근 타로 결과

  useEffect(() => {
    const fetchData = async () => {
      // 타로 결과가 존재할 때만 API 호출
      if (recentTarotResults.length > 0) {
        try {
          const response = await seekerReview(recentTarotResults[0].seekerId); // API 호출
          console.log(response); // 응답 데이터 확인

          // 응답에서 reviewSeekers 배열 추출
          const reviewSeekers = response.reviewSeekers;

          // reviewSeekers가 배열인지 확인
          if (Array.isArray(reviewSeekers)) {
            // resultId 추출 및 상태 업데이트
            const resultIds = reviewSeekers.map((review: any) => review.resultId);
            setReviewResultIds(resultIds);
          } else {
            console.error("예상치 못한 응답 형식:", response);
          }
        } catch (error) {
          console.error("리뷰 가져오기 실패", error);
        }
      }
    };
    fetchData();
  }, [recentTarotResults[0]?.seekerId]); // 최근 타로 결과가 변경될 때마다 호출

  // 더보기 버튼 클릭 시 호출되는 함수
  const handleLoadMore = () => {
    setVisibleResults(prev => prev + 3); // 3개씩 추가
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-black font-bold text-[50px] m-4">{data.name}님 마이페이지</h1>
        <div className="m-4">
          {/* data.reader가 true일 때는 아무 것도 렌더링하지 않음, false일 때는 HoverButton 렌더링 */}
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
                seekerId={result.seekerId} // 구직자 ID
                summary={result.summary} // 요약
                resultId={result.resultId} // 결과 ID
                reviewResultIds={reviewResultIds} // 리뷰 resultId 배열
              />
            </div>
          ))}
        </div>
      </div>

      {/* 더보기 버튼 */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleLoadMore}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105"
        >
          더보기
        </button>
      </div>
    </div>
  );
};

export default SeekerItem;
