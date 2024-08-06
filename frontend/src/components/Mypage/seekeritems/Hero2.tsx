import React from 'react';
import ResultSummary from '../../Common/ResultSummary';

// TODO : props로 받아서 뿌려주기
const Hero1: React.FC = () => {
  const date1 = new Date(2024, 4, 15);
  const date2 = new Date(2024, 4, 16);
  const date3 = new Date(2024, 4, 17);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4 border border-gray-600 mt-4 rounded-lg">
        <ResultSummary date={date1} />
      </div>
      <div className="col-span-4 border border-gray-600 mt-4 rounded-lg">
        <ResultSummary date={date2} />
      </div>
      <div className="col-span-4 border border-gray-600 mt-4 rounded-lg">
        <ResultSummary date={date3} />
      </div>
    </div>
  );
};

export default Hero1;
