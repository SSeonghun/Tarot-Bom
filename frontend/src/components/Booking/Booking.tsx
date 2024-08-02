import React, { useState } from 'react';
import Calendar from './Calendar';
import Name from './Name';
import Time from './Time';
import Category from './Category';
import Method from './Method';
import Content from './Content';

interface TimeWithDate {
  time: string;
  date: Date | null;
}

const Booking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<TimeWithDate[]>([]); // 선택된 시간을 객체 배열로 관리
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimes([]); // 날짜 선택 시 선택된 시간 초기화
    setIsTimeModalOpen(true);
  };

  const closeTimeModal = () => {
    setIsTimeModalOpen(false);
  };

  const confirmTimeSelection = () => {
    closeTimeModal();
  };

  const handleTimeSelect = (timeWithDate: TimeWithDate[]) => {
    console.log(timeWithDate);
    setSelectedTimes(timeWithDate); // 선택된 날짜와 시간을 업데이트
  };

  const handleCancelSelection = () => {
    setSelectedTimes([]); // 선택된 시간 초기화
    closeTimeModal(); // 모달 닫기
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-purple-800 p-6 rounded-lg shadow-lg max-w-6xl w-full mx-4">
        <div className="flex flex-col items-center">
          <Name />
        </div>
        
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-1">
            <Calendar onDateSelect={handleDateSelect} />
          </div>
          <div className="flex-1">
            {/* 선택한 날짜 */}
            {selectedTimes.length > 0 && selectedDate && (
              <div className="text-white text-lg mb-4">
                {selectedDate.toLocaleDateString()} 
                {selectedTimes.map(item => (
                  <span key={item.time}> {item.time}</span>
                ))}
              </div>
            )}
            <Category />
            <Method />
            <Content />
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-pink-500 text-white rounded-lg px-4 py-2 mt-4 w-1/4">예약</button>
        </div>
      </div>

      {isTimeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-lg mb-4">시간 선택</h2>
            <Time selectedDate={selectedDate} onTimeSelect={handleTimeSelect} />
            <div className="flex justify-between mt-4">
              <button onClick={handleCancelSelection} className="bg-gray-500 text-white rounded-lg px-4 py-2">취소</button>
              <button onClick={confirmTimeSelection} className="bg-blue-500 text-white rounded-lg px-4 py-2">확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
