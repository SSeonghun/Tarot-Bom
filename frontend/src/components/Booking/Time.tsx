import React, { useState, useEffect } from 'react';
import Select from '../Common/SelectTime'; // 경로 수정

interface TimeProps {
  selectedDate: Date | null;
  onTimeSelect: (timeWithDate: { time: string; date: Date | null }[]) => void;
}

const Time: React.FC<TimeProps> = ({ selectedDate, onTimeSelect }) => {
  console.log('time mounted');

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [savedButtons, setSavedButtons] = useState<string[]>([]);

  // 기본 시간 옵션 생성 (10:00부터 13:00까지, 16:00부터 24:00까지)
  const timeOptions: string[] = [];
  for (let hour = 10; hour <= 13; hour++) {
    timeOptions.push(`${hour}:00`, `${hour}:30`);
  }
  for (let hour = 16; hour <= 24; hour++) {
    timeOptions.push(`${hour}:00`, `${hour}:30`);
  }

  // 컴포넌트 마운트 시 활성화 상태 설정
  useEffect(() => {
    updateActiveButtons([selectedTime].filter(Boolean) as string[]);
  }, [selectedTime]); // selectedTime이 변경될 때만 실행

  // 시간 선택 핸들러
  const handleSelect = (time: string) => {
    if (selectedTime === time) {
      // 이미 선택된 시간 클릭 시 선택 해제
      setSelectedTime(null);
    } else {
      // 새 시간 선택
      setSelectedTime(time);
    }

    const timeWithDate = [{ time, date: selectedDate }];
    onTimeSelect(timeWithDate);
  };

  // 버튼 활성화 상태 업데이트
  const updateActiveButtons = (selected: string[]) => {
    const selectedInMinutes = selected.map((time) => {
      const [hour, minute] = time.split(':').map(Number);
      return hour * 60 + minute;
    });

    const isInSequence = selectedInMinutes.every((time, index) => {
      if (index === 0) return true; // 첫 번째 요소는 항상 true
      return time - selectedInMinutes[index - 1] === 30; // 30분 간격 확인
    });

    if (isInSequence) {
      setSavedButtons(selected); // 등차수열이 유지될 때 저장
      setActiveButtons(timeOptions); // 모든 시간 옵션 활성화
    } else {
      setActiveButtons(timeOptions.filter((option) => savedButtons.includes(option)));
    }
  };

  // 버튼 활성화 여부 확인
  const isButtonActive = (option: string): boolean => {
    return activeButtons.includes(option);
  };

  return (
    <div className="mb-4">
      <Select
        options={timeOptions}
        selectedOption={[selectedTime].filter(Boolean) as string[]}
        onSelect={handleSelect}
        isButtonActive={isButtonActive}
        activeButtons={activeButtons}
      />
    </div>
  );
};

export default Time;
