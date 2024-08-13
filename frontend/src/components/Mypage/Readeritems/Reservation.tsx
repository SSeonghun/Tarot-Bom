import React from "react";
import Calendar from "../../Common/Calendar";

interface Props {
  reservationData: any;
}

const Reservation: React.FC<Props> = ({ reservationData }) => {
  const highlightDates = [
    new Date(2024, 6, 31), // 2024년 7월 15일
    new Date(2024, 7, 20), // 2024년 7월 20일
    new Date(2024, 7, 25), // 2024년 7월 25일
  ];
  return (
    <div className="min-h-screen p-10">
      <div>
        <h1 className="text-black text-[50px] font-bold">예약 일정</h1>
        <hr className="border-black border-[2px]" />
      </div>
      <div className="mt-[100px]">
        <Calendar highlightDates={highlightDates} layout="row" />
      </div>
    </div>
  );
};

export default Reservation;
