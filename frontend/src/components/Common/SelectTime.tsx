import React from 'react';

interface SelectProps {
  options: string[];
  selectedOption: string[]; // 배열로 변경
  onSelect: (option: string) => void;
  selectedTimes: string[]; // 추가된 프로퍼티
}

const Select: React.FC<SelectProps> = ({ options, selectedOption, onSelect, selectedTimes }) => {
  return (
    <div className="flex flex-wrap mb-4">
      {options.map((option) => {
        // 선택된 시간 이후와 30분 간격으로 활성화
        const isAvailable = selectedTimes.length === 0 || selectedTimes.some(t => {
          const [selectedHour, selectedMinute] = t.split(':').map(Number);
          const [optionHour, optionMinute] = option.split(':').map(Number);
          
          // 선택된 시간보다 이후인지 확인
          const isAfterSelected = (optionHour > selectedHour) || 
                                  (optionHour === selectedHour && optionMinute >= selectedMinute);
          
          // 선택된 시간의 30분 후 시간 계산
          const thirtyMinutesLaterHour = selectedHour + Math.floor((selectedMinute + 30) / 60);
          const thirtyMinutesLaterMinute = (selectedMinute + 30) % 60;

          // 선택된 시간 이후의 시간 활성화
          return isAfterSelected && 
                 (optionHour > thirtyMinutesLaterHour || 
                  (optionHour === thirtyMinutesLaterHour && optionMinute >= thirtyMinutesLaterMinute));
        });

        const canSelect = isAvailable; // 선택 가능 여부

        return (
          <button 
            key={option}
            className={`rounded-full px-4 py-1 m-1 ${selectedOption.includes(option) ? 'bg-red-500 text-white' : 'bg-pink-400 text-white'}`}
            onClick={() => canSelect && onSelect(option)} // 클릭 가능할 때만 onSelect 호출
            style={{
              opacity: canSelect ? 1 : 0.5, // 선택 가능 여부에 따라 투명도 조정
              cursor: canSelect ? 'pointer' : 'not-allowed'
            }}
            disabled={!canSelect} // 선택 불가능한 시간 버튼 비활성화
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Select;
