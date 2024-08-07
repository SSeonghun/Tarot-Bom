import React from 'react';
import HoverButton from '../../Common/HoverButton';
import CardImg from './CardImg.png';
import PrivateLink from '../../Common/PrivateLink';

interface HomeCard {
  name: string;
  detail: string;
  review: number;
  category: string[];
  imgUrl: string;
  hsize: string;
  wsize: string;
  onClick: () => void;
}

const HomeCard: React.FC<HomeCard> = ({
  name,
  detail,
  review,
  category,
  imgUrl,
  hsize,
  wsize,
}) => {
  return (
    <div className="flex items-center justify-center w- bg-gradient-to-br from-black rounded-3xl to-black">
      <div
        className="bg-black font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs bg-cover bg-center hover:scale-105"
        style={{ backgroundImage: `url(${CardImg})` }}
      >
        <img
          className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt="popular reader"
        />
        <h1 className="text-lg text-white">{name}</h1>
        <h3 className="text-sm text-gray-400">Creative Director</h3>
        <p className="text-xs mb-3 text-gray-400 mt-4">
          {detail}
        </p>

        {/* <PrivateLink to="/reader-profile"> */}
          <HoverButton
            label="detail"
            color="bg-violet-300"
            hoverColor="bg-violet-500"
            hsize="h-[40px]"
            wsize="w-[100px]"
            fontsize="text-base"
          ></HoverButton>
        {/* </PrivateLink> */}
      </div>
    </div>
  );
};

export default HomeCard;
