import React from 'react';
import Title from '../../components/TarotResult/Title';
import ResultSummary from '../../components/TarotResult/ResultSummary'
import scriptImg from '../../assets/movie_script-removebg-preview-1.png'
import musicImg from '../../assets/music_notes-removebg-preview-1.png'


const TarotResult: React.FC = () => {
  return (

    <div className="relative w-screen min-h-screen bg-black">

        {/* 제목 */}
        <Title />
    
        {/* 결과 요약 */}
        <ResultSummary />
        
        
   </div>
  );
}

export default TarotResult;
