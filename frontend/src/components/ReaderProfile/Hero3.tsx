import React from 'react';
import CardBackground from '../../assets/img/card.png';
import Hero3item from './items/Hero3item';

const SeekerMypage: React.FC = () => {
  return (
    <div className="container p-4 mx-auto relative flex flex-col justify-center items-center">
      <img src={CardBackground} alt="카드이미지" className="object-cover opacity-40 mt-5 z-0" />
      <div className="absolute top-[140px]">
        <h1 className="text-white text-[50px] font-bold z-10">리더의 자기소개</h1>
      </div>
      <div className="absolute top-[450px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 bg-white bg-opacity-30 rounded-lg border border-white border-opacity-80">
        <p className="text-white text-xl font-bold mx-28 my-10 ">
          안녕하세요! 저는 연애운 전문 타로 리더 김싸피입니다. 타로 카드의 신비로운 세계에서 사랑과
          관계에 대한 깊은 통찰을 제공하는 것을 제 사명으로 삼고 있어요. 타로 카드를 통해 여러분의
          연애운을 살펴보고, 현재의 사랑, 미래의 인연, 관계의 문제 등을 다룰 수 있는 상담을
          제공합니다. 사랑은 우리 삶에서 가장 중요한 부분 중 하나이기 때문에, 저는 여러분이 진정한
          행복을 찾을 수 있도록 돕고 싶어요. 제 리딩은 여러분의 현재 상황을 이해하고, 미래의
          방향성을 제시하며, 내면의 지혜와 연결될 수 있도록 도와드려요. 사랑과 관계에 대한 고민이
          있으시다면, 언제든지 저와 함께 타로 카드를 펼쳐보세요. 여러분의 사랑 이야기에 새로운 장이
          열릴 수 있도록 최선을 다하겠습니다. 사랑과 빛을 전하며, 김싸피
        </p>
      </div>
      <div className="absolute top-[700px]">
        <Hero3item />
      </div>
    </div>
  );
};

export default SeekerMypage;
