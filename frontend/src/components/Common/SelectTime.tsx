import React from 'react';

interface SelectProps {
  options: string[];
  selectedOption: string[];
  onSelect: (option: string) => void;
  isButtonActive: (option: string) => boolean; // 버튼 활성화 상태를 결정하는 함수
  activeButtons: string[]; // 활성화할 버튼 목록 추가
} 

const Select: React.FC<SelectProps> = ({ options, selectedOption, onSelect, isButtonActive, activeButtons }) => {
  return (
    <div className="flex flex-wrap mb-4">
      {options.map((option) => {
        const canSelect = isButtonActive(option) || activeButtons.includes(option); // 버튼 활성화 상태 확인

        return (
          <button 
            key={option}
            className={`rounded-full px-4 py-1 m-1 ${selectedOption.includes(option) ? 'bg-red-500 text-white' : 'bg-pink-400 text-white'}`}
            onClick={() => canSelect && onSelect(option)}
            style={{
              opacity: canSelect ? 1 : 0.5,
              cursor: canSelect ? 'pointer' : 'not-allowed'
            }}
            disabled={!canSelect}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Select;
