import React from "react";
import SSAFY from "../assets/img/ssafy-removebg-preview.png";
import Github from "../assets/img/github.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={SSAFY} className="h-[80px]" alt="Flowbite Logo" />
            <div className="flex flex-col justify-center items-start">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                SSAFY11기
              </span>
              <span>광주 공통2반</span>
            </div>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0 gap-1">
            <li className="flex flex-col justify-center items-center">
              <a href="https://github.com/Choi-H-Seok">
                <img src={Github} alt="" className="w-[50px]" />
                <p>최현석</p>
              </a>
            </li>
            <li className="flex flex-col justify-center items-center">
              <a href="https://github.com/jaeeun-kwak">
                <img src={Github} alt="" className="w-[50px]" />
                <p>곽재은</p>
              </a>
            </li>
            <li className="flex flex-col justify-center items-center">
              <a href="https://github.com/abp1234">
                <img src={Github} alt="" className="w-[50px]" />
                <p>나경준</p>
              </a>
            </li>
            <li className="flex flex-col justify-center items-center">
              <a href="https://github.com/SSeonghun">
                <img src={Github} alt="" className="w-[50px]" />
                <p>임성훈</p>
              </a>
            </li>
            <li className="flex flex-col justify-center items-center">
              <a href="https://github.com/jiiiyoung">
                <img src={Github} alt="" className="w-[50px]" />
                <p>정지영</p>
              </a>
            </li>
            <li className="flex flex-col justify-center items-center">
              <a href="https://github.com/JsooAh">
                <img src={Github} alt="" className="w-[50px]" />
                <p>주수아</p>
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto" />
        <span className="block text-sm text-gray-400 sm:text-center">
          © 2024{" "}
          <a
            href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp"
            className="hover:underline text-gray-300"
          >
            삼성 청년 SW 아카데미
          </a>
          . 11기 광주
        </span>
      </div>
    </footer>
  );
};

export default Footer;
