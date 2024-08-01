import React, { useState } from 'react';
import cardBg from '../../assets/img/card.png';
import moneyImg from '../../assets/money.png';
import HoverButton from '../../components/Common/HoverButton';
import OpenAI from '../Common/OpenAI';
import Loading from '../Common/Loading';

const category = '금전운';

interface CardData {
  id: number;
  name: string;
  detail: string;
}

const cards: CardData[] = Array.from({ length: 3 }, (_, index) => ({
  id: index,
  name: `ACE & CUPS`,
  detail: `야호 야호 야호 야호 야호 야호 야호 야호 야호 야호 야호 `,
}));

const ResultSummary: React.FC = () => {
  const [summary, setSummary] = useState<string>('');

  const handleSummaryGenerated = (generatedSummary: string) => {
    setSummary(generatedSummary);
  };

  return (
    <div className="relative flex flex-col items-center p-10">
      {/* OpenAI 컴포넌트는 한번만 호출됩니다 */}
      <OpenAI cards={cards.map(card => ({ name: card.name, category }))} onSummaryGenerated={handleSummaryGenerated} />

      <div className="relative w-full max-w-3xl">
        <img src={cardBg} alt="Background" className="w-full h-auto object-cover" />
        <div className="absolute inset-12 bg-white bg-opacity-20 border shadow-lg p-3 bg-cover"></div>
       
            {summary ? (
              // summary 있을 때
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="text-4xl font-bold text-white p-4 rounded-lg flex flex-row">
                    <img src={moneyImg} alt="moneyImg" className="w-8 h-8 mr-2" />
                    AI {category} 요약
                  </div>
                <div className="mt-8 border border-white p-6 rounded-lg max-w-xl bg-black bg-opacity-60">
              <p className="text-white text-s" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }}></p>
              </div>
              <p className="mt-5 text-lg font-bold text-white">타로 결과에 어울리는 음악을 들어보세요!</p>
            </div>
            ) : (
              // summary 없을 때
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="flex flex-col items-center">
                  <p className="text-white text-3xl">결과를 기다리고 있습니다...</p>
                  {/* 로딩 표시기 */}
                  < Loading />
                </div>
              </div>
            )}
          
      </div>

      <div className="relative mt-8 flex items-center gap-10">
        <HoverButton
          label="공유하기"
          color="bg-gray-500"
          hoverColor="bg-gray-300"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
        />
        <HoverButton
          label="이미지 저장"
          color="bg-gray-500"
          hoverColor="bg-gray-300"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
        />
        <HoverButton
          label="리더 프로필"
          color="bg-gray-500"
          hoverColor="bg-gray-300"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
        />
      </div>
    </div>
  );
};

export default ResultSummary;
