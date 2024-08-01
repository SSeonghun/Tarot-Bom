import React, { useState } from "react";
import Profile from "../../../assets/img/reviewprofile.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ConsultationItem {
  title: string;
  user: string;
  date: string;
  duration: string;
}

const consultationItems: ConsultationItem[] = [
  {
    title: "Career Guidance",
    user: "김싸피",
    date: "2024-07-30",
    duration: "1시간",
  },
  {
    title: "Personal Development",
    user: "이싸피",
    date: "2024-07-29",
    duration: "45분",
  },
  {
    title: "Relationship Advice",
    user: "박싸피",
    date: "2024-07-28",
    duration: "2시간",
  },
  {
    title: "Financial Planning",
    user: "최싸피",
    date: "2024-07-27",
    duration: "1시간 30분",
  },
  {
    title: "Health Consultation",
    user: "정싸피",
    date: "2024-07-26",
    duration: "1시간",
  },
  {
    title: "Spiritual Guidance",
    user: "하싸피",
    date: "2024-07-25",
    duration: "1시간",
  },
  {
    title: "Career Counseling",
    user: "고싸피",
    date: "2024-07-24",
    duration: "1시간 30분",
  },
  {
    title: "Relationship Counseling",
    user: "강싸피",
    date: "2024-07-23",
    duration: "2시간",
  },
  {
    title: "Stress Management",
    user: "조싸피",
    date: "2024-07-22",
    duration: "45분",
  },
  {
    title: "Mindfulness Training",
    user: "서싸피",
    date: "2024-07-21",
    duration: "1시간",
  },
];

const itemsPerPage = 4;

const Consulting: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  // 페이지별 데이터 추출
  const startIndex = currentPage * itemsPerPage;
  const currentItems = consultationItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const pageCount = Math.ceil(consultationItems.length / itemsPerPage);

  // 페이지 버튼 범위 계산
  const pageRange = 5;
  const startPage = Math.max(0, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(pageCount - 1, startPage + pageRange - 1);

  return (
    <div className="min-h-screen p-10">
      <div>
        <h1 className="text-black text-[50px] font-bold">상담내역</h1>
        <hr className="border-black border-[2px]" />
      </div>
      <div className="flex flex-row justify-center items-center my-6">
        <img
          src={"https://cdn3d.iconscout.com/3d/premium/thumb/tarot-cards-11858327-9666345.png?f=webp"}
          alt="타로 카드 이미지"
          className="w-[200px] h-auto m-4"
        />
        <h1 className="text-[30px] text-black font-bold">
          나의 상담 내역을 확인 해 보세요!
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                유저
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                제목
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                날짜
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                소요시간
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } border-b`}
              >
                <td className="py-3 px-6 text-sm text-gray-800">
                  <div className="flex items-center">
                    <img
                      src={Profile}
                      alt="프로필 이미지"
                      className="w-[40px] h-[40px] rounded-full mr-2"
                    />
                    {item.user}
                  </div>
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  {item.title}
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">{item.date}</td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  {item.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        {startPage > 0 && (
          <>
            <button
              onClick={() => handlePageClick(0)}
              className="px-4 py-2 mx-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              1
            </button>
            {startPage > 1 && (
              <span className="px-4 py-2 mx-2 text-gray-800">...</span>
            )}
          </>
        )}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 mx-2 rounded-lg ${
              page === currentPage
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-gray-300`}
          >
            {page + 1}
          </button>
        ))}
        {endPage < pageCount - 1 && (
          <>
            {endPage < pageCount - 2 && (
              <span className="px-4 py-2 mx-2 text-gray-800">...</span>
            )}
            <button
              onClick={() => handlePageClick(pageCount - 1)}
              className="px-4 py-2 mx-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              {pageCount}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === pageCount - 1}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Consulting;
