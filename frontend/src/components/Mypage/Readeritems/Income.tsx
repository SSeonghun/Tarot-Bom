import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Money from "../../../assets/money.png";
import Profile from "../../../assets/img/reviewprofile.png";
import { useCountUp } from "../../Common/useCountUI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Monthly Income",
      data: [500, 700, 800, 600, 900, 1100, 1300, 1200, 1500, 1400, 1700, 1800], // 예시 데이터
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const, // 타입을 'top'으로 명시적으로 설정
    },
    title: {},
  },
};

type IncomeItem = {
  name: string;
  email: string;
  amount: number;
};

const incomeItems: IncomeItem[] = [
  { name: "김싸피", email: "kimssafy@email.com", amount: 3000 },
  { name: "이싸피", email: "leessafy@email.com", amount: 2000 },
  { name: "박싸피", email: "parkssafy@email.com", amount: 4000 },
  { name: "최싸피", email: "choissafy@email.com", amount: 5000 },
  { name: "정싸피", email: "jeongssafy@email.com", amount: 3500 },
];

// 총 금액 계산
const totalIncome = incomeItems.reduce((acc, item) => acc + item.amount, 0);

const Income: React.FC = () => {
  const total = useCountUp({ start: 0, end: totalIncome, duration: 1000 });
  const percent = useCountUp({ start: 0, end: 58, duration: 1000 });

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div>
        <h1 className="text-[50px] font-bold text-black m-4">수입</h1>
        <hr className="border-black mx-4 border-[2px]" />
      </div>
      <div className="container grid grid-rows-2 flex-grow">
        <div className="row-span-1 flex justify-center items-center">
          <div className="grid grid-cols-12 w-full">
            <div className="col-span-3 flex justify-center items-center ms-5">
              <img
                src={Money}
                alt="돈 이미지"
                className="w-[200px] h-[200px]"
              />
            </div>
            <div className="col-span-9 p-4 m-4 h-[330px] flex flex-col justify-center items-center">
              <h1 className="text-black text-[30px] font-bold">나의 수입</h1>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
        <div className="row-span-1 bg-gray-100">
          <div className="grid grid-cols-12 h-full p-10 gap-4">
            <div className="col-span-7 bg-white rounded-lg">
              <h1 className="text-[30px] text-black font-bold m-4">
                최근 수입 내역
              </h1>
              <div className="h-[200px] overflow-y-auto">
                <ol>
                  {incomeItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-row justify-between m-4"
                    >
                      <div className="flex flex-row">
                        <img src={Profile} alt="수입 시커 프로필" />
                        <div className="ml-4">
                          <h3 className="text-black text-[20px] font-bold">
                            {item.name}
                          </h3>
                          <p className="text-black text-[15px]">{item.email}</p>
                        </div>
                      </div>
                      <h3 className="text-black text-[20px] font-bold">
                        {item.amount} 원
                      </h3>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="col-span-5 bg-white rounded-lg">
              <div className="bg-white">
                <h1 className="text-[30px] text-black font-bold m-4">총금액</h1>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-[50px] text-black font-bold m-4">
                    {total} 원
                  </div>
                  <div className="flex flex-row justify-end items-center ms-10">
                    <h1 className="text-[40px]">🥳</h1>
                    <h1 className="text-[30px] text-black font-bold">
                      상위 {percent}%
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
