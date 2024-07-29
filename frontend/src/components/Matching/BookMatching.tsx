import React, { useState, useEffect } from "react";
// 컴포넌트
import LikeCard from "../Cards/LikeCard"; // 좋아요 카드 컴포넌트
import HoverButton from "../Common/HoverButton"; // 호버 버튼 컴포넌트
import Slider from "react-slick"; // 슬라이더 컴포넌트
// css
import "slick-carousel/slick/slick.css"; // 슬릭 슬라이더 기본 스타일
import "slick-carousel/slick/slick-theme.css"; // 슬릭 슬라이더 테마 스타일
import "../../assets/css/FadeInOut.css"; // 사용자 정의 애니메이션 CSS 파일

// 슬라이더 설정
const settings = {
  dots: true, // 슬라이더 하단의 점 표시
  infinite: true, // 슬라이더 무한 반복
  speed: 500, // 슬라이드 전환 속도 (밀리초 단위)
  slidesToShow: 5, // 한 화면에 표시할 슬라이드 수
  slidesToScroll: 1, // 슬라이드 스크롤 시 이동할 슬라이드 수
  autoplay: true, // 자동 재생 활성화
  autoplaySpeed: 2000, // 자동 재생 속도 (밀리초 단위)
  arrows: true, // 좌우 화살표 표시
};

const BookMatching: React.FC = () => {
  // 10개의 카드 예시 데이터 생성
  const likeReaders = Array.from({ length: 10 });

  // 상태 추가: 선택된 버튼의 레이블과 두 번째 입력 필드의 표시 여부를 제어
  const [showSecondInput, setShowSecondInput] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>("fade-out");
  const [onLoad, setOnLoad] = useState<boolean>(false); // 처음에 컴포넌트 띄울때 에니메이션

  /*
   * 애니메이션 종료 후 상태 업데이트
   * 'showSecondInput'이 false일 때 'fade-out' 클래스를 설정하여 애니메이션 효과를 적용합니다.
   */
  useEffect(() => {
    if (!showSecondInput) {
      setAnimationClass("fade-out");
    }
  }, [showSecondInput]);

  /*
   * 컴포넌트가 마운트될 때 버튼에 애니메이션 적용
   * 컴포넌트가 처음 로드될 때 'buttonsLoaded'를 true로 설정합니다.
   */
  useEffect(() => {
    setOnLoad(true);
  }, []);

  return (
    <div
      className={`bg-white w-[700px] h-[500px] -mt-20 relative flex-col items-center overflow-x-auto rounded-md button-fade-in`}
    >
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center">TOP 리더</h2>

      <div className="w-full h-[250px]" style={{ overflow: "hidden" }}>
        {/* 슬라이더 컴포넌트 */}
        <Slider {...settings}>
          {/* 10개의 LikeCard 컴포넌트를 슬라이드에 표시 */}
          {likeReaders.map((_, index) => (
            <div key={index} className="p-2">
              <LikeCard />
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex flex-col items-center mt-5">
        <h2 className="text-2xl font-bold mb-4">리더 검색하기</h2>
        <div className="flex flex-row gap-4">
          {/* 검색하기 버튼 */}
          <HoverButton
            label="검색하기"
            color="bg-red-500"
            hoverColor="bg-red-300"
            hsize="h-10"
            wsize="w-40"
            fontsize="text-base"
          />
          {/* 찜리스트 버튼 */}
          <HoverButton
            label="찜리스트"
            color="bg-red-500"
            hoverColor="bg-red-300"
            hsize="h-10"
            wsize="w-40"
            fontsize="text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default BookMatching;
