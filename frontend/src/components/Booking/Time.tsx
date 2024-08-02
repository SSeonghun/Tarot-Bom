import React, { useState, useEffect } from 'react';
import Select from '../Common/SelectTime'; // 경로 수정

interface TimeProps {
  selectedDate: Date | null;
  onTimeSelect: (timeWithDate: { time: string; date: Date | null }[]) => void;
}

const Time: React.FC<TimeProps> = ({ selectedDate, onTimeSelect }) => {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const timeOptions: string[] = [];
  const [savedButtons, setSavedButtons] = useState<string[]>([]); // 저장된 버튼 배열 추가

  // 기본 시간 옵션 생성 (10:00부터 13:00까지, 16:00부터 18:00까지)
  for (let hour = 10; hour <= 13; hour++) {
    timeOptions.push(`${hour}:00`, `${hour}:30`);
  }
  for (let hour = 16; hour <= 18; hour++) {
    timeOptions.push(`${hour}:00`, `${hour}:30`);
  }

  // 초기 활성화 상태 설정
  useEffect(() => {
    setActiveButtons(timeOptions);
  }, [timeOptions]);

  const handleSelect = (time: string) => {
    const updatedSelectedTimes = selectedTimes.includes(time)
      ? selectedTimes.filter(t => t !== time)
      : [...selectedTimes, time];

    setSelectedTimes(updatedSelectedTimes);
    updateActiveButtons(updatedSelectedTimes); // 활성화된 버튼 상태 업데이트

    const timeWithDate = updatedSelectedTimes.map(t => ({ time: t, date: selectedDate }));
    onTimeSelect(timeWithDate);
  };

  const updateActiveButtons = (selected: string[]) => {
    const selectedInMinutes = selected.map(time => {
      const [hour, minute] = time.split(':').map(Number);
      return hour * 60 + minute;
    });

    // 등차수열 확인
    const isInSequence = selectedInMinutes.every((time, index) => {
      if (index === 0) return true; // 첫 번째 요소는 항상 true
      return time - selectedInMinutes[index - 1] === 30; // 30분 간격 확인
    });

    if (isInSequence) {
      setSavedButtons(selected); // 등차수열이 유지될 때 저장
      setActiveButtons(selected); // 선택된 버튼 활성화
    } else {
      // 등차수열이 깨진 경우, 저장된 버튼만 활성화하고 나머지는 비활성화
      setActiveButtons(timeOptions.filter(option => savedButtons.includes(option)));
    }
  };

  const isButtonActive = (option: string): boolean => {
    return activeButtons.includes(option); // 활성화된 버튼만 활성화
  };

  return (
    <div className="mb-4">
      <Select 
        options={timeOptions} 
        selectedOption={selectedTimes} 
        onSelect={handleSelect} 
        isButtonActive={isButtonActive} 
        activeButtons={activeButtons} // 활성화된 버튼 목록 전달
      />
    </div>
  );
};

export default Time;
