import React, { useState } from "react";
import Sample from "../../assets/sample.png";
import BackGround from "./component/background";
import Intro from "./component/intro";

import homeCard1 from "../../assets/img/homehero1.png";
import HomeCard2 from "../../assets/img/homehero2.png";
import "../../assets/css/FlipCard.css"; // CSS 파일을 가져옵니다.

// Main Section 2
const Hero2: React.FC = () => {
  const [isFlipped1, setIsFlipped1] = useState<boolean>(false);
  const [isFlipped2, setIsFlipped2] = useState<boolean>(false);

  return (
    <div className="relative w-screen min-h-screen bg-slate-950 flex flex-col items-center">
      <div className="flex items-start justify-between w-full max-w-full-lg px-4 z-0">
        <div className="pt-[100px]">
          <BackGround />
        </div>
      </div>
      <div className="flex flex-row absolute space-x-10 ms-[50px] mt-[250px]">
        <div
          className="card-container"
          onClick={() => setIsFlipped1(!isFlipped1)}
        >
          <div className={`card ${isFlipped1 ? "is-flipped" : ""}`}>
            <div className="card-face card-front">
              <img src={homeCard1} alt="Front" className="w-[200px] " />
            </div>
            <div className="card-face card-back">
              {/* <img src={Sample} alt="Back" className="w-[800px] h-[507px]" />
               */}
              <Intro />
            </div>
          </div>
        </div>
        {/* <div
          className="card-container"
          onClick={() => setIsFlipped2(!isFlipped2)}
        >
          <div className={`card ${isFlipped2 ? "is-flipped" : ""}`}>
            <div className="card-face card-front">
              <img
                src={HomeCard2}
                alt="Front"
                className="w-[300px] h-[477px]"
              />
            </div>
            <div className="card-face card-back">
              <img src={Sample} alt="Back" className="w-[300px] h-[477px]" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero2;
