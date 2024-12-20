import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Question from '../../../assets/img/question.webp';
import Card from '../../../assets/img/card.png';

import CardIn1 from '../../../assets/tarot_images - 복사본/c01.jpg';
import CardIn2 from '../../../assets/tarot_images - 복사본/c02.jpg';
import CardIn3 from '../../../assets/tarot_images - 복사본/c03.jpg';
import CardIn4 from '../../../assets/tarot_images - 복사본/c04.jpg';
import CardIn5 from '../../../assets/tarot_images - 복사본/c05.jpg';
import CardIn6 from '../../../assets/tarot_images - 복사본/c06.jpg';
import CardIn7 from '../../../assets/tarot_images - 복사본/c07.jpg';
import CardIn8 from '../../../assets/tarot_images - 복사본/c08.jpg';
import CardIn9 from '../../../assets/tarot_images - 복사본/c09.jpg';
import CardIn10 from '../../../assets/tarot_images - 복사본/c10.jpg';
// Import other card images as needed

const Hero1: React.FC = () => {
  // Array of card images (adjust paths as per your project structure)
  const cardImages = [
    CardIn1,
    CardIn2,
    CardIn3,
    CardIn4,
    CardIn5,
    CardIn6,
    CardIn7,
    CardIn8,
    CardIn9,
    CardIn10,
  ];

  // Slick settings for the slideshow
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust autoplay speed as needed
    arrows: false,
  };

  return (
    <div className="relative bg-black rounded-lg w-full h-full">
      <img src={Card} alt="" className="absolute inset-0 object-cover w-fit h-fit rounded-lg" />
      <div className="relative top-[100px] left-[90px] w-[230px]">
        {/* <div className="absolute inset-0 z-10">
          <img src={Question} alt="" className="opacity-80" />
          <h1 className="text-[30px] text-center font-bold text-white">지금바로 확인</h1>
        </div> */}
        <Slider {...settings}>
          {cardImages.map((cardImage, index) => (
            <div key={index}>
              <img
                src={cardImage}
                alt={`Card ${index + 1}`}
                className="object-cover w-[230px]  rounded-lg opacity-50"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero1;
