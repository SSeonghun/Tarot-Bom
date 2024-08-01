import React from 'react';

interface SelectProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="flex flex-wrap mb-4">
      {options.map((option) => (
        <button
          key={option}
          className={`rounded-full px-4 py-1 m-1 ${selectedOption === option ? 'bg-red-500 text-white' : 'bg-pink-400 text-white'}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Select;
