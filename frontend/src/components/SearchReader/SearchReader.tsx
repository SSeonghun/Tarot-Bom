import React, { useState, useEffect } from 'react';
import Sphere from '../../assets/img/sphere.png';
import Category from './item/Category';
import ReaderCard from './item/ReaderCard';
import LinkButton from '../login_signup/LinkButton';
import { useNavigate } from 'react-router-dom';

// API 호출 함수 임포트
const { readerList } = require('../../API/api');

const Labels = [
  { name: '연애운' },
  { name: '직장운' },
  { name: '재물운' },
  { name: '건강운' },
  { name: '가족운' },
  { name: '기타' },
];

const SerchReader: React.FC = () => {
  const navigate = useNavigate();

  // 리더 리스트 상태 정의
  const [readers, setReaders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API 호출
  useEffect(() => {
    const loadReaders = async () => {
      try {
        const response = await readerList(); // API 함수 호출
        setReaders(response.data); // API 호출 후 데이터를 상태에 설정
      } catch (error) {
        setError('리더 목록을 가져오는 데 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadReaders();
  }, []);

  // 클릭 핸들러 함수 정의
  const handleCardClick = (readerId: number) => {
    navigate(`/reader-profile?id=${readerId}`);
  };

  return (
    <div className="container p-4 mx-auto relative min-h-[700px]">
      {/* 배경 이미지 */}
      <img
        src={Sphere}
        alt="sphere"
        className="absolute object-cover right-10 bottom-0 max-w-[450px] h-auto z-0"
      />

      {/* 제목과 수평선 */}
      <div className="flex justify-between items-end">
        <h1 className="text-6xl font-bold text-white mb-10 mt-5">리더 검색</h1>
        <div className="mb-5">
          <form action="" className="flex flex-row">
            <input
              type="text"
              placeholder="리더를 검색해보세요"
              className="p-2 rounded me-3 w-60"
            />
            <div className="w-28">
              <LinkButton to="#" text="검색"></LinkButton>
            </div>
          </form>
        </div>
      </div>

      <hr className="relative border-white z-10" />

      <div className="grid grid-cols-12 gap-4 mt-10">
        {/* 첫 번째 열 (2/12) */}
        <div className="col-span-2 text-white p-4 z-10">
          <Category items={Labels} />
        </div>

        {/* 두 번째 열 (10/12) */}
        <div className="col-span-10 text-black p-4 z-10">
          <div className="grid grid-cols-4 gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              readers.map((reader) => (
                <ReaderCard
                  key={reader.memberId}
                  name={reader.name}
                  detail={reader.intro}
                  review={0} // 리뷰 데이터가 없으면 기본값 0
                  category={['Category1']} // 카테고리 예시
                  // TODO : 이미지처리
                  imgUrl="https://via.placeholder.com/150" // 더미 이미지 URL
                  hsize="h-10"
                  wsize="w-40"
                  onClick={() => handleCardClick(reader.memberId)} // 클릭 핸들러 전달
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerchReader;
