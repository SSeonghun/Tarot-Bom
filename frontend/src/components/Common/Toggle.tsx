import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Change from "../../assets/img/change.webp";

interface Hero1Props {
  initialProfile: boolean; // props로 받을 초기값의 타입 정의
}

const Hero1: React.FC<Hero1Props> = ({ initialProfile }) => {
  const [isReaderProfile, setIsReaderProfile] = useState(initialProfile); // props로 초기값 설정
  const navigate = useNavigate();

  const handleToggleChange = () => {
    setIsReaderProfile(!isReaderProfile);
    if (!isReaderProfile) {
      navigate("/reader-mypage"); // 리더 페이지로 이동
    } else {
      navigate("/seeker-mypage"); // 시커 페이지로 이동
    }
  };

  return (
    <img
      src={Change}
      alt=""
      className="w-[40px] h-auto me-2"
      title="시커전환"
      onClick={handleToggleChange}
    />
  );
};

export default Hero1;
