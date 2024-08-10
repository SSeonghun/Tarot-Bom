import React from 'react';

interface SelectProps {
  options: string[];
  selectedOption: string[];
  onSelect: (option: string) => void;
  isButtonActive: (option: string) => boolean; // 버튼 활성화 상태를 결정하는 함수
  activeButtons: string[]; // 활성화할 버튼 목록 추가
}

const Select: React.FC<SelectProps> = ({
  options,
  selectedOption,
  onSelect,
  isButtonActive,
  activeButtons,
}) => {
  return (
    <div className="flex flex-wrap mb-4">
      {options.map((option) => {
        // 버튼 활성화 여부를 결정하는 함수
        const canSelect = isButtonActive(option) || activeButtons.includes(option);

        return (
          <button
            key={option}
            className={`rounded-full px-4 py-1 m-1 ${
              selectedOption.includes(option)
                ? 'border-[1.5px] border-gray-400 text-black'
                : 'bg-gray-400 text-black border-gray-400 border-[1.5px]'
            }`}
            onClick={() => canSelect && onSelect(option)}
            style={{
              opacity: canSelect ? 1 : 0.5,
              cursor: canSelect ? 'pointer' : 'not-allowed',
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
