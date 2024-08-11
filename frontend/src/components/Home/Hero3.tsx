import React, { useEffect, useState, useRef } from "react";
import HomeCard from "./component/HomeCard"; // HomeCard 컴포넌트 경로에 맞게 수정
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rank from "../../assets/img/rank.webp";
import { useNavigate } from "react-router-dom";
import "./component/HomeHero3.css"; // 추가된 CSS 파일

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

const { readerTop } = require("../../API/api");

const Hero3: React.FC = () => {
  const [readers, setReaders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null); // 슬라이더 참조 생성

  useEffect(() => {
    const loadReaders = async () => {
      try {
        const response = await readerTop();
        setReaders(response.data);
      } catch (error) {
        setError("탑 리더 목록을 가져오는 데 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadReaders();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // 슬라이더 및 문구가 보이도록 설정
        }
      },
      {
        threshold: 0.5, // 30%가 보일 때 트리거
      }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  const handleCardClick = (readerId: number) => {
    navigate(`/reader-profile?id=${readerId}`);
  };

  return (
    <div className="relative w-screen max-h-max flex-col bg-black flex items-center overflow-x-auto">
      <img
        src={Rank}
        alt=""
        className={`w-[200px] ${isVisible ? "fade-in" : "fade-out"}`}
      />
      <h1
        className={`text-white text-5xl font-bold mb-[50px] mt-[50px] ${
          isVisible ? "fade-in" : "fade-out"
        }`}
      >
        Top 리더를 확인해 보세요!
      </h1>
      <div
        ref={sliderRef}
        className={`w-[1200px] mb-10 ${isVisible ? "slide-in" : "slide-out"}`}
        style={{ overflow: "hidden" }}
      >
        <Slider {...settings}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            readers.map((reader) => (
              <HomeCard
                key={reader.memberId}
                name={reader.nickname}
                detail={reader.intro}
                category={reader.keyword}
                rating={reader.rating}
                imgUrl={reader.profileUrl}
                hsize="h-10"
                wsize="w-40"
                readerId={reader.readerId}
                // onClick={() => handleCardClick(reader.readerId)}
              />
            ))
          )}
        </Slider>
      </div>
      <div className="mb-20" style={{ height: "50px" }}></div>
    </div>
  );
};

export default Hero3;
