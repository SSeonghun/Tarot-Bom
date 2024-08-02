import React, { useState } from 'react';
import Select from '../Common/Select'; // Select 컴포넌트 임포트

const Method: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const methodOptions = ['그래픽', '진짜 카드'];

  return (
    <div className="mb-4">
      <h2 className="text-white text-lg mb-2">방식</h2>
      <Select options={methodOptions} selectedOption={selectedMethod} onSelect={setSelectedMethod} />
    </div>
  );
};

export default Method;
