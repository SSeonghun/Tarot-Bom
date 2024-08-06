import React from 'react';
import Title from '../../components/TarotResult/Title';
import ResultSummary from '../../components/TarotResult/ResultSummary';
import scriptImg from '../../assets/REVIEW-removebg-preview.png';
import musicImg from '../../assets/music_notes-removebg-preview-1.png';

// TODO : axios로 받아서 props 전달 알죠?
const TarotResult: React.FC = () => {
  return (
    <div className="relative w-screen min-h-screen bg-black">
      {/* 제목 */}
      <Title />

      {/* 결과 요약 */}
      <ResultSummary />
    </div>
  );
};

export default TarotResult;
