import React, { useState } from "react";
import Button from './CommonButton';

interface CalendarComponentProps {
  highlightDates?: Date[]; // 하이라이트할 날짜 배열을 받는 props
  layout?: "row" | "col" | "col-single"; // 레이아웃 유형을 설정하는 props
  hsize: number;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  highlightDates = [],
  layout = "row",
  hsize
}) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Date | null>(null);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const startDay = getStartDayOfMonth(currentMonth, currentYear);

  const highlightedDatesSet = new Set(
    highlightDates
      .filter(
        (date) =>
          date.getFullYear() === currentYear && date.getMonth() === currentMonth
      )
      .map((date) => date.getDate())
  );

  const isHighlighted = (dayNumber: number) => {
    return (
      dayNumber > 0 &&
      dayNumber <= daysInMonth &&
      highlightedDatesSet.has(dayNumber)
    );
  };

  const isToday = (dayNumber: number) => {
    const today = new Date();
    return (
      today.getDate() === dayNumber &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return highlightDates
      .filter(
        (date) =>
          date.getFullYear() === currentYear &&
          date.getMonth() === currentMonth &&
          date > now // 현재 시간 이후의 일정만 포함
      )
      .sort((a, b) => a.getTime() - b.getTime()); // 시간까지 고려하여 정렬
  };

  const handleOpenModal = (eventDate: Date) => {
    setSelectedEvent(eventDate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleConfirmEntry = () => {
    handleCloseModal();
  };

  const isWithin30Minutes = (eventDate: Date) => {
    const now = new Date();
    const thirtyMinutesBefore = new Date(now.getTime() + 30 * 60000); // 현재 시간 기준으로 30분 후
    return now <= eventDate && eventDate <= thirtyMinutesBefore;
  };

const renderUpcomingEvents = () => {
  const upcomingEvents = getUpcomingEvents();

  // 30분 이하 남은 일정과 나머지 일정 분리
  const urgentEvents = upcomingEvents.filter(isWithin30Minutes);
  const futureEvents = upcomingEvents.filter(event => !isWithin30Minutes(event));

  if (layout === "col-single") {
    return urgentEvents.length ? (
      <div>
        <strong>{urgentEvents[0].toLocaleString()}</strong>: 다가오는 일정
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleOpenModal(urgentEvents[0])}
        >
          입장
        </button>
      </div>
    ) : (
      <div>다가오는 일정</div>
    );
  } else {
    return (
      <>
        {urgentEvents.length ? (
          <div>
            <h2 className="text-lg font-bold text-red-500">예약 입장</h2>
            {urgentEvents.map((event, index) => (
              <div key={index}>
                <strong>{event.toLocaleString()}</strong>
                <button
                  className="ml-4 px-4 py-2 bg-pink-400 hover:bg-pink-300 text-white rounded"
                  onClick={() => handleOpenModal(event)}
                >
                  입장
                </button>
              </div>
            ))}
          </div>
        ) : null}
        {futureEvents.length ? (
          <div>
            <h2 className="text-lg font-bold text-gray-800">예약 리스트</h2>
            <div style={{ maxHeight: `${hsize}px`, overflowY: 'auto' }}> {/* 스크롤 추가 */}
            {futureEvents.map((event, index) => (
              <div key={index}>
                <strong>{event.toLocaleString()}</strong>
              </div>
            ))}
          </div>
          </div>
        ) : (
          <div>다가오는 일정이 없습니다.</div>
        )}
      </>
    );
  }
};


  return (
    <div
      className={`flex ${
        layout === "row" ? "flex-row" : "flex-col"
      } items-start justify-center py-8 px-4`}
    >
      <div
        className={`w-full max-w-sm shadow-lg ${
          layout === "row" ? "flex-1" : "w-full"
        }`}
      >
        <div className="md:p-4 p-2 dark:bg-gray-800 bg-white bg-opacity-30 rounded-t">
          <div className="px-4 flex items-center justify-between">
            <span
              tabIndex={0}
              className="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800"
            >
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentYear}
            </span>
            <div className="flex items-center">
              <button
                aria-label="calendar backward"
                className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
                onClick={handlePreviousMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button
                aria-label="calendar forward"
                className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
                onClick={handleNextMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-right"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
          <hr className="border border-gray-700 mt-3" />

          <div className="flex items-center justify-between overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                    <th key={day}>
                      <div className="w-full flex justify-center">
                        <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                          {day}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, weekIndex) => (
                  <tr key={weekIndex}>
                    {[...Array(7)].map((_, dayIndex) => {
                      const dayNumber = weekIndex * 7 + dayIndex - startDay + 1;
                      return (
                        <td key={dayIndex} className="pt-6">
                          <div
                            className={`px-2 py-2 cursor-pointer flex w-full justify-center ${
                              isHighlighted(dayNumber)
                                ? "bg-red-300 bg-opacity-60 text-black rounded-full"
                                : ""
                            } ${isToday(dayNumber) ? "text-blue-500 font-bold" : ""}`}
                          >
                            {dayNumber > 0 && dayNumber <= daysInMonth ? (
                              <p
                                className={`text-base font-medium ${
                                  isHighlighted(dayNumber)
                                    ? "text-black"
                                    : isToday(dayNumber)
                                    ? "text-blue-500 font-bold"
                                    : "text-gray-500 dark:text-gray-100"
                                }`}
                              >
                                {dayNumber}
                              </p>
                            ) : null}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr className="border border-gray-700 mt-3" />
        </div>
        {(layout === "col" || layout === "col-single") && (
          <div className="dark:bg-gray-700 bg-white bg-opacity-30 pb-4 rounded-b">
            <div>
              <h1 className="text-black text-[30px] font-bold text-center">
                다가오는 일정
              </h1>
            </div>
            <div className="my-2 mx-6 p-4 border border-gray-200">
              {renderUpcomingEvents()}
            </div>
          </div>
        )}
      </div>

      {layout === "row" && (
        <div className="ms-4 w-full max-w-sm shadow-lg flex-1">
          <div className="dark:bg-gray-700 bg-white bg-opacity-30 pb-4 rounded-b">
            <div>
              <h1 className="text-black text-[30px] font-bold text-center">
                다가오는 일정
              </h1>
            </div>
            <div className="my-2 mx-6 p-4 border border-gray-200">
              {renderUpcomingEvents()}
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>예약 방에 입장하시겠습니까?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmEntry}
              >
                입장
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
