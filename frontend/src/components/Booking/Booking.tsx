import React, { useState } from 'react';
import Calendar from './Calendar';
import Name from './Name';
import Time from './Time'; // Uncommented this line
import Category from './Category';
import Method from './Method';
import Content from './Content';
import Swal from 'sweetalert2';

interface TimeWithDate {
  time: string;
  date: Date | null;
}

const Booking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<TimeWithDate[]>([]);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  const handleDateSelect = (date: Date) => {
    console.log('Date selected:', date);
    setSelectedDate(date);
    setSelectedTimes([]); // 날짜 선택 시 선택된 시간 초기화
    setIsTimeModalOpen(true); // 모달 열기
  };

  const closeTimeModal = () => {
    console.log('Closing time modal');
    setIsTimeModalOpen(false); // 모달 닫기
  };

  const confirmTimeSelection = () => {
    console.log('Confirming time selection');
    closeTimeModal(); // 모달 닫기
  };

  const handleTimeSelect = (timeWithDate: TimeWithDate[]) => {
    console.log('Time selected:', timeWithDate);
    setSelectedTimes(timeWithDate); // 선택된 날짜와 시간을 업데이트
  };

  const handleCancelSelection = () => {
    console.log('Cancelling selection');
    setSelectedTimes([]); // 선택된 시간 초기화
    closeTimeModal(); // 모달 닫기
  };

  const submitClick = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '예약 완료',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-6xl w-full mx-4 z-10">
        <div className="flex flex-col items-center">
          <Name />
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-1">
            <Calendar onDateSelect={handleDateSelect} />
          </div>
          <div className="flex-1">
            {selectedTimes.length > 0 && selectedDate && (
              <div className="text-white text-lg mb-4">
                {selectedDate.toLocaleDateString()}
                {selectedTimes.map((item) => (
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
          <button
            onClick={submitClick}
            className="border-[2px] border-purple-300 text-white rounded-lg px-4 py-2 mt-4 w-1/4 hover:bg-purple-300 hover:text-gray-700"
          >
            예약
          </button>
        </div>
      </div>

      {isTimeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-lg mb-4">시간 선택</h2>
            <Time selectedDate={selectedDate} onTimeSelect={handleTimeSelect} />{' '}
            {/* Uncommented this line */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCancelSelection}
                className="bg-gray-500 text-white rounded-lg px-4 py-2"
              >
                취소
              </button>
              <button
                onClick={confirmTimeSelection}
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
