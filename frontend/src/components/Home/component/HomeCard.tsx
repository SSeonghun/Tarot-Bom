import React from 'react';
import HoverButton from '../../Common/HoverButton';
import CardImg from './CardImg.png';
import PrivateLink from '../../Common/PrivateLink';

const categoryMap: { [key: string]: string } = {
  G01: '연애',
  G02: '진로',
  G03: '금전',
  G04: '건강',
  G05: '기타',
};

interface HomeCard {
  name: string;
  detail: string;
  // review: number;
  rating: number;
  category: string[];
  imgUrl: string;
  hsize: string;
  wsize: string;
  readerId: number;
  // onClick: () => void;
}

const HomeCard: React.FC<HomeCard> = ({
  name,
  detail,
  // review,
  rating,
  category,
  imgUrl,
  hsize,
  wsize,
  // onClick,
  readerId,
}) => {
  const categoryArray = Array.isArray(category) ? category : [category];
  const categoryNames = categoryArray.map((cat) => categoryMap[cat] || cat).join(', ');

  return (
    <div className="flex items-center justify-center m-2 w- bg-gradient-to-br from-black rounded-3xl to-black ">
      <div
        className="bg-black font-semibold text-center relative h-[400px] rounded-3xl border shadow-lg p-10 max-w-xs bg-cover bg-center hover:scale-105"
        style={{ backgroundImage: `url(${CardImg})` }}
      >
        <img
          className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
          src={imgUrl}
          alt="popular reader"
        />
        <h1 className="text-lg text-white">{name}</h1>
        <h3 className="text-sm text-gray-400">{categoryNames}</h3>
        <h3 className="text-sm text-gray-400">{rating}</h3>
        {/* <p className="text-xs mb-3 text-gray-400 mt-4">{`Review Count: ${review}`}</p> */}
        <p className="text-xs mb-3 text-gray-400 mt-4 line-clamp-2">{detail}</p>
        <div className="absolute bottom-[50px] left-[60px] ">
          <PrivateLink to={`/reader-profile/${readerId}`}>
            <HoverButton
              label="detail"
              color="bg-violet-300"
              hoverColor="bg-violet-500"
              hsize="h-[40px]"
              wsize="w-[100px]"
              fontsize="text-base"
              // onClick={onClick}
            ></HoverButton>
          </PrivateLink>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
