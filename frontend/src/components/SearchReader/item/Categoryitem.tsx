import React from 'react';

interface CategoryitemProps {
  name: string;
  selected: boolean;  // 선택 여부를 확인할 수 있는 prop
  onClick: () => void;
}

const Categoryitem: React.FC<CategoryitemProps> = ({ name, selected, onClick }) => {
  return (
    <li
      className={`flex space-x-4 items-center cursor-pointer p-2 rounded ${
        selected ? 'text-indigo-300' : 'hover:text-indigo-300'
      }`}
      onClick={onClick}
    >
      {name}
    </li>
  );
};

export default Categoryitem;
