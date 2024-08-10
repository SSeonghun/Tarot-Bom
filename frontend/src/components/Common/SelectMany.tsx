import React from 'react';

interface SelectProps {
  options: string[];
  selectedOption: string[]; // 배열로 변경
  onSelect: (option: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="flex flex-wrap mb-4 ">
      {options.map((option) => (
        <button
          key={option}
          className={`rounded-xl px-4 py-1 m-1 ${
            selectedOption.includes(option)
              ? 'bg-purple-300 text-gray-700 border-[1.5px] border-purple-300'
              : 'border-[1.5px] border-purple-300 text-white'
          }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Select;
