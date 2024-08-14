import React from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "../assets/img/404.webp";
import Empty from "../assets/img/empty.webp";

const Error: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900"
      style={{
        backgroundImage: 'url("https://example.com/background-image.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-10 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          권한이 없거나 에러가 발생했습니다
        </h1>
        <img src={Empty} alt="" className="w-[300px] mt-[20px] rounded-lg" />
        <button
          onClick={handleHomeClick}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors mt-[20px]"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default Error;
