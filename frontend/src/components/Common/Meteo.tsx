import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const MeteorKeyframe = (
  direction: "left" | "right",
  angle: number
) => keyframes`
    0% {
        top: -10vh;
        transform: translateX(0px);
        opacity: 1;
    }
    100% {
        top: 90vh;
        transform: translateX(${direction === "left" ? "-" : "+"}${
  120 / Math.tan((angle * Math.PI) / 180)
}vh);
        opacity: 1;
    }
`;

interface MeteorLayoutProps {
  $direction: "left" | "right";
  $angle: number;
}

const MeteorEffectLayout = styled.div<MeteorLayoutProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #222222;

  .star {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: white;
    animation: ${(props) => MeteorKeyframe(props.$direction, props.$angle)} 4s
      ease-in infinite;
    opacity: 0;
  }

  .star::after {
    position: absolute;
    top: calc(50% - 1px);
    left: -950%;
    width: 2000%;
    height: 2px;
    background: linear-gradient(to left, #fff0, #ffffff);
    content: "";
    transform: ${(props) =>
        props.$direction === "left"
          ? `rotateZ(-${props.$angle}deg)`
          : `rotateZ(-${180 - props.$angle}deg)`}
      translateX(50%);
  }

  .star:nth-child(2) {
    transform: translateX(300px);
    animation-delay: 5.1s;
  }

  .star:nth-child(3) {
    transform: translateX(450px);
    animation-delay: 1s;
  }
`;

interface MeteorEffectProps {
  count?: number;
  white?: boolean;
  maxDelay?: number;
  minSpeed?: number;
  maxSpeed?: number;
  angle?: number;
  direction?: "left" | "right";
}

const MAX_STAR_COUNT = 50;
const colors = ["#c77eff", "#f6ff7e", "#ff8d7e", "#ffffff"];

const MeteorEffect: React.FC<MeteorEffectProps> = ({
  count = 12,
  white = false,
  maxDelay = 15,
  minSpeed = 2,
  maxSpeed = 4,
  angle = 30,
  direction = "right",
}) => {
  const starCount = count < MAX_STAR_COUNT ? count : MAX_STAR_COUNT;
  const [starInterval, setStarInterval] = useState<number>(0);

  useEffect(() => {
    const calcStarInterval = () => {
      let innerWidth = window.innerWidth;
      setStarInterval(Math.floor((innerWidth * 1.5) / (count * 5)));
    };
    calcStarInterval();
    window.addEventListener("resize", calcStarInterval);
    return () => {
      window.removeEventListener("resize", calcStarInterval);
    };
  }, [count]);

  return (
    <MeteorEffectLayout $direction={direction} $angle={angle}>
      {new Array(starCount).fill(0).map((_, idx) => {
        const left =
          direction === "left"
            ? `${Math.random() * count * 5 * starInterval}px`
            : `${
                window.innerHeight - Math.random() * count * 5 * starInterval
              }px`;
        const animationDelay = `${Math.random() * maxDelay}s`;
        const animationDuration =
          maxSpeed > minSpeed
            ? `${minSpeed + Math.random() * maxSpeed}s`
            : `${2 + Math.random() * 4}s`;
        const colorIndex = Math.floor(Math.random() * colors.length); // 별 색상
        const size = `${2 + Math.floor(Math.random() * 5)}px`; // 별 크기
        const boxShadow = `0px 0px 10px 3px ${colors[colorIndex]}`;

        return (
          <div
            key={idx}
            style={{
              left,
              animationDelay,
              animationDuration,
              boxShadow,
              width: size,
              height: size,
            }}
            className="star"
          ></div>
        );
      })}
    </MeteorEffectLayout>
  );
};

export default MeteorEffect;
