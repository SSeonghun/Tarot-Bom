import React, { useState } from "react";

interface CalendarComponentProps {
  highlightDates?: Date[]; // 하이라이트할 날짜 배열을 받는 props
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  highlightDates = [],
}) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // 날짜 계산 로직
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

  // 날짜 배열을 set으로 변환하여 효율적으로 확인할 수 있도록 합니다.
  const highlightedDatesSet = new Set(
    highlightDates
      .filter(
        (date) =>
          date.getFullYear() === currentYear && date.getMonth() === currentMonth
      )
      .map((date) => date.getDate())
  );

  // 하이라이트 날짜를 확인하는 함수
  const isHighlighted = (dayNumber: number) => {
    return (
      dayNumber > 0 &&
      dayNumber <= daysInMonth &&
      highlightedDatesSet.has(dayNumber)
    );
  };

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="max-w-sm w-full shadow-lg">
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
                            }`}
                          >
                            {dayNumber > 0 && dayNumber <= daysInMonth ? (
                              <p
                                className={`text-base font-medium ${
                                  isHighlighted(dayNumber)
                                    ? "text-black"
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
        <div className="dark:bg-gray-700 bg-white bg-opacity-30 pb-4 rounded-b">
          <div>
            <h1 className="text-black text-[30px] font-bold text-center">
              다가오는 일정
            </h1>
          </div>
          <div className="my-2 mx-6 p-4 border border-gray-200">
            여기에 일정내용
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
