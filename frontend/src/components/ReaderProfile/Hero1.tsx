import React from 'react';
import HoverButton from '../Common/HoverButton';
import ReaderProfile1 from '../../assets/img/ReaderProfile1.png';

interface Hero1Props {
  name: string; // String -> string으로 수정
  profileUrl: string;
  grade: string;
}

const Hero1: React.FC<Hero1Props> = ({
  name,
  profileUrl,
  grade,
}) => {
  // grade를 매핑하는 객체
  const gradeMapping: { [key: string]: string } = {
    C01: '새싹',
    C02: '중수',
    C03: '마스터',
  };

  // grade에 따라 표시할 텍스트를 결정
  const gradeText = gradeMapping[grade] || grade; // 매핑된 값이 없으면 원래 값 사용

  return (
    <div className="relative bg-black bg-opacity-70">
      <img
        src={ReaderProfile1}
        alt="ReaderProfile1"
        className="object-cover w-full h-[400px] opacity-60 z-0"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="bg-black bg-opacity-50 p-2 rounded-full backdrop-filter backdrop-blur-sm">
          <img src={profileUrl} alt="Profile" className="w-32 h-32 rounded-full" />
        </div>
        <div className="flex flex-row items-end">
          <div className="w-auto h-10">{gradeText}</div> {/* 매핑된 텍스트 사용 */}
          <h1 className="text-5xl text-white mt-5 font-bold">{name}</h1>
        </div>
        <p className="text-[15px] mt-3 text-white font-semibold">TAROT READER</p>
        <div className="mt-5">
          <HoverButton
            label="예약하기"
            color="bg-gray-300"
            hoverColor="bg-gray-500"
            hsize="h-12"
            wsize="w-48"
            fontsize="text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero1;
