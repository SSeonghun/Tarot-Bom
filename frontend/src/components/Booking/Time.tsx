import React, { useState } from 'react';
import Select from '../Common/SelectTime'; // 경로 수정

interface TimeProps {
  selectedDate: Date | null;
  onTimeSelect: (timeWithDate: { time: string; date: Date | null }[]) => void; // 날짜와 시간을 객체 배열로 전달
}

const Time: React.FC<TimeProps> = ({ selectedDate, onTimeSelect }) => {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]); // 선택된 시간을 배열로 관리
  const timeOptions: string[] = [];

  // 기본 시간 옵션 생성 (10:00부터 13:00까지, 16:00부터 18:00까지)
  for (let hour = 10; hour <= 13; hour++) {
    timeOptions.push(`${hour}:00`);
    timeOptions.push(`${hour}:30`);
  }
  for (let hour = 16; hour <= 18; hour++) {
    timeOptions.push(`${hour}:00`);
    timeOptions.push(`${hour}:30`);
  }

  const handleSelect = (time: string) => {
    const updatedSelectedTimes = selectedTimes.includes(time)
      ? selectedTimes.filter(t => t !== time) // 이미 선택된 시간이라면 제거
      : [...selectedTimes, time]; // 선택되지 않은 시간이라면 추가

    // 선택된 시간을 오름차순으로 정렬
    updatedSelectedTimes.sort((a, b) => {
      const [aHour, aMinute] = a.split(':').map(Number);
      const [bHour, bMinute] = b.split(':').map(Number);
      return aHour - bHour || aMinute - bMinute; // 시간과 분을 기준으로 정렬
    });

    setSelectedTimes(updatedSelectedTimes);

    // 날짜와 함께 선택된 시간을 부모 컴포넌트로 전달
    const timeWithDate = updatedSelectedTimes.map(t => ({ time: t, date: selectedDate }));
    onTimeSelect(timeWithDate);
  };

  return (
    <div className="mb-4">
      <Select options={timeOptions} selectedOption={selectedTimes} onSelect={handleSelect} selectedTimes={selectedTimes} />
    </div>
  );
};

export default Time;
