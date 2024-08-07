import React, {useEffect, useState} from 'react';
import HomeCard from './component/HomeCard'; // HomeCard 컴포넌트 경로에 맞게 수정
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Rank from '../../assets/img/rank.webp';
import { useNavigate } from 'react-router-dom';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5, // 한 번에 6개의 카드가 보이도록 수정
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

// TODO : 금주의 탑리더 axios로 데이터 받아오기

const { readerTop } = require('../../API/api');

const Hero3: React.FC = () => {

  const [readers, setReaders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // 원하는 개수만큼 HomeCard를 반복해서 생성하기 위해 배열을 사용
  const homeCards = Array.from({ length: 10 }); // 카드의 개수를 10개로 설정

  useEffect(() => {
    const loadReaders = async () => {
      try {
        const response = await readerTop(); // API 함수 호출
        setReaders(response.data); // API 호출 후 데이터를 상태에 설정
      } catch (error) {
        setError('탑 리더 목록을 가져오는 데 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadReaders();
  }, []);

  const handleCardClick = (readerId: number) => {
    navigate(`/reader-profile?id=${readerId}`);
  };

  return (
    <div className="relative w-screen max-h-max flex-col bg-gray-900 flex items-center overflow-x-auto">
      <img src={Rank} alt="" className="w-[200px]" />
      <h1 className="text-white text-5xl font-bold mb-[50px] mt-[50px]">
        금주의 Top 리더를 확인해 보세요!
      </h1>

      {/* TODO : 클릭시 해당 리더로 이동하게 연결 */}
      <div className="w-[1200px] mb-10" style={{ overflow: 'hidden' }}>
        <Slider {...settings}>
        {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              readers.map((reader) => (
                <HomeCard
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
          
        </Slider>
      </div>

      {/* 카드 아래 공간 추가 */}
      <div className="mb-20" style={{ height: '50px' }}></div>
    </div>
  );
};

export default Hero3;
