import React from 'react';
import HoverButton from '../../Common/HoverButton';

interface HomeCardProps {
  name: string;
  detail: string;
  review: number;
  category: string[];
  imgUrl: string;
  hsize: string;
  wsize: string;
  onClick: () => void;
}

const HomeCard: React.FC<HomeCardProps> = ({
  name,
  detail,
  review,
  category,
  imgUrl,
  hsize,
  wsize,
  onClick,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-white relative bg-opacity-40 font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs bg-cover bg-center hover:scale-105 hover:bg-opacity-80 transition-transform duration-300 h-full w-full"
        onClick={onClick}
      >
        <img
          className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
          src={imgUrl}
          alt="popular reader"
        />
        <h1 className="text-[20px] text-white">{name}</h1>
        <h3 className="text-sm text-gray-300 mb-5 line-clamp-2">{detail}</h3>
        {/* <p className="text-xs mb-3 text-gray-400 mt-4">{`Review Count: ${review}`}</p> */}
        <div className="absolute bottom-3">
          <HoverButton
            label="Detail"
            color="bg-red-500"
            hoverColor="bg-red-300"
            hsize={hsize}
            wsize={wsize}
            fontsize="text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
