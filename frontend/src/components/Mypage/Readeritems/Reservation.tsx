import React, { useEffect, useState } from "react";
import Calendar from "../../Common/Calendar";

interface ReservationData {
  startTime: string; // 예약 시작 시간
}

interface Props {
  reservationData: ReservationData[];
}

const Reservation: React.FC<Props> = ({ reservationData }) => {
  const [highlightDates, setHighlightDates] = useState<Date[]>([]);

  // 날짜와 시간을 포맷팅하는 함수
  const formatDateTime = (dateTimeString: string): Date => {
    const date = new Date(dateTimeString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  useEffect(() => {
    if (reservationData) {
      const dates = reservationData.map((reservation) =>
        formatDateTime(reservation.startTime)
      );
      setHighlightDates(dates);
    }
  }, [reservationData]);

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
