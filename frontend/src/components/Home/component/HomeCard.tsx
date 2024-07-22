import React from 'react';
import HoverButton from './HoverButton';
import CardImg from './CardImg.png';

interface HomeCard {
    name: string;
    detail: string;
    review: number;
    category: [];
    imgUrl: string;
    hsize: string;
    wsize: string;
}

const HomeCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-black to-black">
      <div 
        className="bg-black font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs bg-cover bg-center hover:scale-105" 
        style={{ backgroundImage: `url(${CardImg})` }}
      >
        <img
          className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt="popular reader"
        />
        <h1 className="text-lg text-white">John Doe</h1>
        <h3 className="text-sm text-gray-400">Creative Director</h3>
        <p className="text-xs mb-3 text-gray-400 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <HoverButton label="detail" color="bg-red-500" hoverColor='bg-red-300' hsize='h-10' wsize='w-40' fontsize='text-base'></HoverButton>
      </div>
    </div>
  );
}

export default HomeCard;
