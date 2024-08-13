import React from 'react';
import Calendar from '../../Common/Calendar';
import Money from '../../../assets/img/재물운.png';
import Hite from '../../../assets/img/진로.png';
import Health from '../../../assets/img/건강.png';
import Love from '../../../assets/img/연애.png';
import Guitar from '../../../assets/img/기타.png';
import Nothing from '../../../assets/img/nothing.webp';
import PieChart from '../../Common/PieChart';
import TarotCard from '../../../assets/tarot_images - 복사본/c01.jpg';
import LikeCard from '../../Cards/LikeCard';
import HoverButton from '../../Common/HoverButton';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../assets/img/loading1.webp';

const defaultProfileUrl =
  'https://cdn3d.iconscout.com/3d/premium/thumb/avatar-profile-7377413-5979215.png?f=webp';

interface Reservation {
  startTime: string;
}

type Categories = {
  [key: string]: number;
};

interface FavoriteReader {
  intro: string;
  profileUrl: string | null;
  name: string;
  memberId: string;
}

interface Hero1Props {
  reservationList: Reservation[];
  totalConsulting: number;
  Categories: Categories;
  favoriteReaderList: FavoriteReader[];
}

const categoryMapping: { [key: string]: string } = {
  G01: '연애운',
  G02: '진로운',
  G03: '금전운',
  G04: '건강운',
  G05: '기타운',
};

const categoryImages: { [key: string]: string } = {
  연애운: Love,
  진로운: Hite,
  금전운: Money,
  건강운: Health,
  기타운: Guitar,
};

const getMaxCategory = (categories: Categories) => {
  let maxKey: string | null = null;
  let maxValue = -1;

  for (const [key, value] of Object.entries(categories)) {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  }

  return {
    name: maxKey ? categoryMapping[maxKey] || '알 수 없음' : '알 수 없음',
    value: maxValue,
  };
};

const Hero1: React.FC<Hero1Props> = ({
  reservationList,
  totalConsulting,
  Categories,
  favoriteReaderList,
}) => {
  const navigate = useNavigate();
  const highlightDates = reservationList.map((reservation) => new Date(reservation.startTime));
  const handleClick = () => {
    navigate(`/search-reader`);
  };

  // favoriteReaderList를 기반으로 likeCards 생성
  const likeCards = favoriteReaderList.map((reader) => (
    <LikeCard
      key={reader.memberId}
      intro={reader.intro}
      name={reader.name}
      profileUrl={reader.profileUrl ? reader.profileUrl : defaultProfileUrl}
      readerId={reader.memberId}
    />
  ));

  const maxCategory = getMaxCategory(Categories);
  const labels = Object.values(categoryMapping);
  const data =
    maxCategory.value === 0
      ? []
      : [Categories.G01, Categories.G02, Categories.G03, Categories.G04, Categories.G05];

  const selectedCategoryImage =
    maxCategory.value === 0 ? Nothing : categoryImages[maxCategory.name] || Money;

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <div className="border border-black rounded-lg">
            <h1 className="text-black text-[40px] font-bold text-center mt-3">예약내역</h1>
            <div>
              <Calendar highlightDates={highlightDates} layout="col" />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div>
            <div className="relative">
              <img
                src={selectedCategoryImage}
                alt="카테고리 이미지"
                className="object-cover w-full h-full rounded-lg opacity-30"
              />

              {maxCategory.value !== 0 ? (
                <div className="absolute top-4 left-4">
                  <h1 className="text-black text-[70px] mx-10 my-5 font-bold">
                    {Math.round((maxCategory.value / totalConsulting) * 100)}%
                  </h1>
                  <div className="ms-12">
                    <p className="text-gray-700 font-bold">
                      최근 {totalConsulting}개의 타로 결과를 종합해 봤을 때
                    </p>
                    <p className="text-black text-[30px] font-bold">"{maxCategory.name}"</p>
                    <p className="text-gray-700 font-bold">카테고리가 제일 많았습니다.</p>
                  </div>
                </div>
              ) : (
                <div className="absolute bottom-2 left-4">
                  <h1 className="text-black text-[30px] mx-10 my-5 font-bold">
                    상담 내역이 없어요..
                  </h1>
                </div>
              )}
            </div>
          </div>
          {maxCategory.value !== 0 ? (
            <div className="border mt-4 p-4 border-black rounded-lg h-fit flex justify-center items-center">
              <PieChart labels={labels} data={data} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="col-span-4">
          <div className="border border-black rounded-lg grid grid-cols-12 p-4">
            <div className="col-span-4">
              <img src={TarotCard} alt="오늘의 타로점" />
            </div>
            <div className="col-span-8">
              <h1 className="text-black text-[30px] text-center font-bold">오늘의 타로점</h1>
              <p className="text-black text-[20px] text-start ms-4 mt-4">
                희망과 치유의 날 입니다. 새로운 기회가 생기고, 긍정적인 에너지가 넘치는 하루가 될
                것입니다.
              </p>
            </div>
          </div>
          <div className="border border-black rounded-lg mt-2">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-black font-bold m-2 text-[30px] text-center">리더 찜리스트</h1>
              <div className="me-3">
                <HoverButton
                  label="모두 보기"
                  color="bg-gray-300"
                  hoverColor="bg-gray-500"
                  hsize="h-8"
                  wsize="w-24"
                  fontsize="text-sm"
                  onClick={handleClick}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 p-2">
              {favoriteReaderList.length > 0 ? (
                likeCards.slice(0, 6).map((card, index) => (
                  <div className="col-span-4" key={index}>
                    {card}
                  </div>
                ))
              ) : (
                <div className="col-span-12 relative flex flex-col justify-center items-center">
                  <img src={Loading} alt="" className="opacity-40 rounded-lg w-[400px]" />
                  <p className="text-center text-black absolute inset-0 top-1/2 text-[30px] font-bold">
                    찜한 리더가 없어요..
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
