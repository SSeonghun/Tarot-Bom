import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import PieChart from '../../Common/PieChart';
import Calendar from '../../Common/Calendar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Hero1: React.FC = () => {
  const data = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        label: '2023년 상담 수',
        data: [12, 19, 3, 5, 2, 3, 9, 7, 14, 10, 6, 8],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const labels = ['연애운', '금전운', '취업운', '가족운', '직장운'];
  const pie_data = [300, 200, 100, 50, 30];

  const highlightDates = [
    new Date(2024, 6, 31), // 2024년 7월 15일
    new Date(2024, 7, 20), // 2024년 7월 20일
    new Date(2024, 7, 25), // 2024년 7월 25일
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        text: '2023년 상담 통계',
      },
    },
  };

  return (
    <div className="m-10 grid grid-cols-12 gap-4">
      <div className="col-span-7">
        <div>
          <h1 className="text-[40px] font-bold text-black">요약</h1>
          <h2 className="text-[25px] font-bold text-black">2023년 상담</h2>
        </div>
        <div className="mt-10 w-[500px] h-[250px] ms-auto me-auto">
          <Bar data={data} options={options} />
        </div>
        <h1 className="text-[25px] font-bold text-black mt-10">나의 상담 카테고리</h1>
        <div className="mt-10 grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <PieChart labels={labels} data={pie_data} width={300} height={300} />
          </div>
          <div className="col-span-6 flex justify-center">
            <div className="flex flex-col justify-between mb-10">
              <div>
                <h1 className="text-[50px] text-black font-bold">{pie_data[0]}%</h1>
                <h3 className="text-end text-[25px] text-black font-bold">{labels[0]}</h3>
              </div>
              <div className="text-end">
                <h1 className="text-[20px] text-black font-bold">
                  {pie_data[1]}% {labels[1]}{' '}
                </h1>
                <h1 className="text-[20px] text-black font-bold">
                  {pie_data[2]}% {labels[2]}{' '}
                </h1>
                <h1 className="text-[20px] text-black font-bold">
                  {pie_data[3]}% {labels[3]}{' '}
                </h1>
                <h1 className="text-[20px] text-black font-bold">
                  {pie_data[4]}% {labels[4]}{' '}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-5 bg-gray-600 rounded-lg">
        <Calendar highlightDates={highlightDates} />
      </div>
    </div>
  );
};

export default Hero1;
