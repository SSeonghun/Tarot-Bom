import React from 'react';


interface CardProps {
    name: string;
    detail: string;
    category: string[];
    imgUrl: string;
    hsize: string;
    wsize: string;
  }
  
const TarotResult: React.FC<CardProps> = ({ name, detail, category, imgUrl, hsize, wsize }) => {
  return (
    <div className="flex items-center justify-center">
      <div 
        className="bg-white bg-opacity-40 font-semibold text-center rounded-3xl border shadow-lg p-3 max-w-xs bg-cover bg-center hover:scale-105 hover:bg-opacity-80 transition-transform duration-300" 
      >
        <img
          className="mb-3 w-40 h-45  shadow-lg mx-auto"
          src={imgUrl}
          alt="Card Img"
        />
        <h1 className="text-xl text-white">{name}</h1>
        <h3 className="text-md text-gray-400">{detail}</h3>
        
      </div>
    </div>
  );
}

export default TarotResult;
