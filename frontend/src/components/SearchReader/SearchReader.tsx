import React, { useState, useEffect } from 'react';
import Sphere from '../../assets/img/sphere.png';
import Category from './item/Category';
import ReaderCard from './item/ReaderCard';
import LinkButton from '../login_signup/LinkButton';
import { useNavigate } from 'react-router-dom';

// API 호출 함수 임포트
const { readerList } = require('../../API/api');
const { likeList } = require('../../API/userApi');

const Labels = [
  { name:'전체', keyword:""},
  { name:'찜한 리더', keyword:"like"},
  { name: '연애운',keyword: "G01" },
  { name: '재물운',keyword: "G02" },
  { name: '건강운',keyword: "G03" },
  { name: '가족운',keyword: "G04" },
  { name: '기타',keyword: "G05" },
];
const SerchReader: React.FC = () => {
  const navigate = useNavigate();

  // 리더 리스트 상태 정의
  const [readers, setReaders] = useState<any[]>([]);
  const [readers1, setReaders1] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // 검색
  const [filteredReaders, setFilteredReaders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  // API 호출
  useEffect(() => {
    const loadReaders = async () => {
      try {
        const [response, response1] = await Promise.all([readerList(), likeList()]) // API 함수 호출
        console.log(response1.data)
        // console.log(response1.data)
        setReaders(response.data); // API 호출 후 데이터를 상태에 설정
        setReaders1(response1.data)
        setFilteredReaders(response.data); // 초기 상태는 모든 리더가 필터링된 상태
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
    navigate(`/reader-profile/${readerId}`);
  };

  const handleSearch = () => {
    let filtered = readers;
    console.log(selectedKeyword)
    if (selectedKeyword) {
      if (selectedKeyword === 'like') {
        filtered = readers1
      } else {
        filtered = filtered.filter(reader =>
          reader.keyword && reader.keyword.includes(selectedKeyword) // category가 존재하는지 확인
        );
      }
    }
    
    if (searchTerm) {
      filtered = filtered.filter(reader =>
        reader.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredReaders(filtered);
  };
  // 카테고리 선택 핸들러
  const handleCategorySelect = (label: { name: string }) => {
    const keyword = Labels.find(l => l.name === label.name)?.keyword || null;
    setSelectedKeyword(keyword);// 선택된 카테고리 이름 설정
  };
  
  useEffect(() => {
    console.log(selectedKeyword)
    handleSearch();// 카테고리 선택 후 검색 수행
  }, [selectedKeyword]);
  
  return (
    <div className="container p-4 mx-auto relative min-h-[700px]">
      {/* 배경 이미지 */}
      <img
        src={Sphere}
        alt="sphere"
        className="absolute object-cover right-10 bottom-0 max-w-[450px] h-auto z-0"
      />

      {/* 제목과 수평선 */}
      <div className="flex justify-between items-end mt-10">
        <h1 className="text-6xl font-bold text-white mb-10 mt-5">리더 검색</h1>
        <div className="mb-5">
          <form onSubmit={(e)=>{
            e.preventDefault();
            handleSearch();
          }} className="flex flex-row items-center">
            <input
              type="text"
              placeholder="리더를 검색해보세요"
              className="p-2 rounded me-3 flex-grow-3"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <div className="w-28">
              <button  type="submit" className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 focus:outline-none">
                검색  
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr className="relative border-white z-10" />

      <div className="grid grid-cols-12 gap-4 mt-10">
        {/* 첫 번째 열 (2/12) */}
        <div className="col-span-2 text-white p-4 z-10">
          <Category items={Labels} 
           onSelect={handleCategorySelect}
          />
        </div>

        {/* 두 번째 열 (10/12) */}
        <div className="col-span-10 text-black p-4 z-10">
          <div className="grid grid-cols-4 gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              filteredReaders.map((reader) => (
                <ReaderCard
                  key={reader.memberId}
                  name={reader.name}
                  detail={reader.intro}
                  rating={reader.rating} // 리뷰 데이터가 없으면 기본값 0
                  category={['Category1']} // 카테고리 예시
                  // TODO : 이미지처리
                  imgUrl={ reader.profileUrl } // 더미 이미지 URL
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
