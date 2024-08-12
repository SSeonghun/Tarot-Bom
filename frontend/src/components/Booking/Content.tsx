import React, { useState, useEffect } from "react";

interface ContentProps {
  onWorryChange: (worry: string) => void; // 부모에게 worry 값을 전달할 함수
}

const Content: React.FC<ContentProps> = ({ onWorryChange }) => {
  const [worry, setWorry] = useState<string>(""); // 초기 상태는 빈 문자열로 설정

  useEffect(() => {
    onWorryChange(worry); // worry 상태가 변경될 때마다 부모 컴포넌트로 전달
  }, [worry, onWorryChange]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorry(event.target.value);
  };

  return (
    <div className="mb-4">
      <h2 className="text-white text-lg mb-2">고민</h2>
      <textarea
        className="w-full p-2 rounded-lg text-gray-800"
        placeholder="상담할 내용을 적어주세요."
        rows={4}
        value={worry}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default Content;
