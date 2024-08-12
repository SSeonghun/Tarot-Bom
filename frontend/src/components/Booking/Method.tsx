import React, { useState, useEffect } from "react";
import Select from "../Common/Select"; // 수정된 Select 컴포넌트 임포트

interface MethodProps {
  onMethodChange: (method: string | null) => void; // 선택된 방법을 부모에게 전달할 함수
}

const Method: React.FC<MethodProps> = ({ onMethodChange }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const methodOptions = ["그래픽", "카드"];

  // 선택된 방법을 부모 컴포넌트에 전달
  useEffect(() => {
    onMethodChange(selectedMethod);
  }, [selectedMethod, onMethodChange]);

  return (
    <div className="mb-4">
      <h2 className="text-white text-lg mb-2">방식</h2>
      <Select
        options={methodOptions}
        selectedOption={selectedMethod}
        onSelect={setSelectedMethod}
      />
    </div>
  );
};

export default Method;
