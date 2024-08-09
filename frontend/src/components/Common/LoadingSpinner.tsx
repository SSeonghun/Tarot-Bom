import React from "react";

// 랜덤으로 표시할 문장 배열
const messages = [
  "귀하의 위대한 매칭이 시작되었습니다.",
  "귀하의 환상적인 매칭이 시작되었습니다.",
  "매칭이 성공적으로 시작되었습니다.",
  "환상적인 매칭이 시작되었습니다.",
  "당신의 매칭 여정이 시작되었습니다.",
];

const LoadingSpinner: React.FC = () => {
  // 랜덤으로 문장 선택
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="flex space-x-2">
        <div className="h-4 w-4 rounded-full bg-blue-500 animate-bounce"></div>
        <div className="h-4 w-4 rounded-full bg-blue-500 animate-bounce2"></div>
        <div className="h-4 w-4 rounded-full bg-blue-500 animate-bounce"></div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">{randomMessage}</p>
        <p className="text-sm text-gray-500">Your Matching is on its way!</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
