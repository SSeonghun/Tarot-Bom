import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PieChart from "../../Common/PieChart";
import Calendar from "../../Common/Calendar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  reservationData: any;
  mainData: any;
}

const Summary: React.FC<Props> = ({ reservationData, mainData }) => {
  const [highlightDates, setHighlightDates] = useState<Date[]>([]);

  // 날짜와 시간을 포맷팅하는 함수
  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString); // 시간을 유지한 채로 Date 객체를 생성
  };

  useEffect(() => {
    if (reservationData) {
      const dates = reservationData.map((reservation: any) =>
        formatDateTime(reservation.startTime)
      );
      setHighlightDates(dates);
    }
  }, [reservationData]);

  function extractValues(obj: { [key: number]: number }): number[] {
    return Object.keys(obj).map((key) => obj[Number(key)]);
  }

  const data = {
    labels: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    datasets: [
      {
        label: "2024년 상담 수",
        data: extractValues(mainData ? mainData.monthlyanalyze.categories : {}),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Categories 객체의 타입 정의
  type CategoriesType = { [key: string]: number };

  // Categories 객체 선언
  const Categories: CategoriesType = mainData
    ? mainData.categoryanalyze.categories
    : {};

  // 객체를 배열로 변환하고, 값을 기준으로 내림차순 정렬
  const sortedArray: [string, number][] = Object.entries(Categories).sort(
    (a, b) => b[1] - a[1]
  );
  const valuesArray: number[] = sortedArray.map((item) => item[1]);
  const keysArray: string[] = sortedArray.map((item) => item[0]);

  const mapping: { [key: string]: string } = {
    G01: "연애운",
    G02: "진로운",
    G03: "금전운",
    G04: "건강운",
    G05: "기타운",
  };
  const mappedArray: string[] = keysArray.map((key) => mapping[key]);
  const labels = mappedArray;
  const pie_data = valuesArray;
  const total: number = pie_data.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  function calculatePercentage(value: number, total: number): number {
    if (total === 0) {
      return 0; // 총합이 0일 경우 0% 반환
    }
    return Math.round((value / total) * 100);
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        text: "2024년 상담 통계",
      },
    },
  };

  return (
    <div className="m-10 grid grid-cols-12 gap-4">
      <div className="col-span-7">
        <div>
          <h1 className="text-[40px] font-bold text-black">요약</h1>
          <h2 className="text-[25px] font-bold text-black">2024년 상담</h2>
        </div>
        <div className="mt-10 w-[400px] h-[200px] ms-auto me-auto">
          <Bar data={data} options={options} />
        </div>
        <h1 className="text-[25px] font-bold text-black mt-10">
          나의 상담 카테고리
        </h1>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 h-[100px]">
            <PieChart
              labels={labels}
              data={pie_data}
              width={300}
              height={300}
            />
          </div>
          <div className="col-span-6 flex justify-center">
            <div className="flex flex-col justify-between mb-10">
              <div>
                <h1 className="text-[50px] text-black font-bold">
                  {calculatePercentage(pie_data[0], total)}%
                </h1>
                <h3 className="text-end text-[25px] text-black font-bold">
                  {labels[0]}
                </h3>
              </div>
              <div className="text-end">
                <h1 className="text-[20px] text-black font-bold">
                  {calculatePercentage(pie_data[1], total)}% {labels[1]}{" "}
                </h1>
                <h1 className="text-[20px] text-black font-bold">
                  {calculatePercentage(pie_data[2], total)}% {labels[2]}{" "}
                </h1>
                <h1 className="text-[20px] text-black font-bold">
                  {calculatePercentage(pie_data[3], total)}% {labels[3]}{" "}
                </h1>
                <h1 className="text-[20px] text-black font-bold">
                  {calculatePercentage(pie_data[4], total)}% {labels[4]}{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-5 bg-gray-200 rounded-lg">
        <Calendar highlightDates={highlightDates} layout="col" />
      </div>
    </div>
  );
};

export default Summary;
