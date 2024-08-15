import React, { useState } from "react";

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null); // 기본 선택 날짜를 null로 초기화
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1); // 어제 날짜

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
    setSelectedDate(null); // 월 변경 시 선택된 날짜 초기화
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
    setSelectedDate(null); // 월 변경 시 선택된 날짜 초기화
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    if (newDate < yesterday) return; // 어제 이전 날짜 클릭 시 아무 작업도 하지 않음

    if (selectedDate === day) {
      setSelectedDate(null); // 선택된 날짜가 클릭되면 취소
    } else {
      setSelectedDate(day); // 날짜 선택
      onDateSelect(newDate); // 선택된 날짜를 부모 컴포넌트에 전달
    }
  };

  const renderDays = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const startDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const days = [];

    // 빈 공간 추가 (일요일 시작)
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const isSelected = selectedDate === i;
      const isPastDate = newDate < yesterday; // 어제 이전 날짜 확인
      const dateStyle = isPastDate
        ? " text-black font-bold cursor-not-allowed"
        : " text-white cursor-pointer"; // 색상 및 커서 설정

      days.push(
        <div
          key={i}
          className={`p-2 rounded-lg ${
            isSelected ? "bg-purple-300 text-gray-700" : dateStyle
          }`}
          onClick={() => handleDateClick(i)}
          style={{ opacity: isPastDate ? 0.7 : 1 }} // 연하게 표시
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-white">
          ◀
        </button>
        <h2 className="text-white text-xl">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={handleNextMonth} className="text-white">
          ▶
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-white text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
