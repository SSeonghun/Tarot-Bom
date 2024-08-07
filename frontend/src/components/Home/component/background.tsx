import React from 'react';

// 이미지 가져오기
import planet1 from '../../../assets/img/planet1.jpg';
import planet2 from '../../../assets/img/planet2.jpg';
import planet3 from '../../../assets/img/planet3.jpg';
import planet4 from '../../../assets/img/planet4.jpg';
import planet5 from '../../../assets/img/planet5.jpg';
import sunshine from '../../../assets/img/sunshine.png';
import shine1 from '../../../assets/img/shine.png';
import shine2 from '../../../assets/img/shine2.png';

import { CSSProperties } from 'react';

const Hero1: React.FC = () => {
  return (
    <div className="relative bg-cover w-screen h-[600px] ">
      <img
        src={sunshine}
        alt="sunlens"
        className="rotate-90 w-[1000px] absolute right-0 -top-[300px] z-0 opacity-90"
      />
      <img src={planet4} alt="" className="absolute -right-[20px] -bottom-[70px]" />
      <img
        src={planet1}
        alt=""
        className="w-[100px] opacity-80 absolute top-[125px] left-[350px]"
      />
      <img src={planet2} alt="" className="w-[400px] absolute left-[100px] -bottom-[20px]" />
      <img src={planet3} alt="" className="opacity-60 w-[30px] absolute left-[30px] top-[30px]" />
      <img src={planet5} alt="" className="w-[80px] absolute left-[100px] top-[90px] opacity-70" />
      <img src={shine1} alt="" className="w-[150px] absolute top-[200px] opacity-80" />
      <img src={shine2} alt="" className="w-[150px] absolute left-[300px] -top-[50px] opacity-70" />
    </div>
  );
};

export default Hero1;
