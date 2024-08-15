import React from 'react';
import Hero2Item from './items/Hero2Item';
import FireWork from '../../assets/img/firework.png';

interface Hero2Props {
  name: String;
  reviews: string[];
  allConsultings: number;
  allReservations: number;
  afterReader: number;
}
// Hero2Item에 보낼때 props로 보내면 됨
const Hero2: React.FC<Hero2Props> = ({
  name,
  reviews,
  allConsultings,
  allReservations,
  afterReader
}) => {
  return (
    <div className="container p-4 mx-auto">
      <hr />

      <div className="grid grid-cols-12 gap-4 mt-10">
        <div className="col-span-6">
          <div className="grid grid-cols-2 gap-2">
            <Hero2Item title="리뷰" value={reviews.length} subValue="번" />
            <Hero2Item title="총 상담 횟수" value={allConsultings} subValue="번" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Hero2Item title="총 예약 횟수" value={allReservations} subValue="번" />
            <Hero2Item title="리더가 된지" value={afterReader} subValue="일" />
          </div>
        </div>
        <div className="col-span-6 flex flex-col justify-center items-center">
          <div className="flex flex-row">
            <h1 className="text-[80px] text-white font-bold">안녕하세요</h1>
            <img src={FireWork} alt="폭죽" className="h-auto w-32 ms-4" />
          </div>
          <div>
            <h3 className="text-[40px] text-white">
              리더 <strong>{name}</strong>님의 프로필 입니다!!
            </h3>
          </div>
        </div>
      </div>
      <hr className="mt-10" />
    </div>
  );
};

export default Hero2;
