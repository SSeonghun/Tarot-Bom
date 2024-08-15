import React from 'react';
import Categoryitem from './Categoryitem';

interface CategoryProps {
  items: { name: string }[];
  selectedCategory: string | null;
  onSelect: (label: { name: string }) => void;
}

const Category: React.FC<CategoryProps> = ({ items, selectedCategory, onSelect }) => {
  return (
    <ul className="space-y-2">
      {items.map(item => (
        <Categoryitem
          key={item.name}
          name={item.name}
          selected={
            (selectedCategory === null && item.name === '전체') || selectedCategory === item.name
          } // "전체"를 기본 선택
          onClick={() => onSelect(item)}
        />
      ))}
    </ul>
  );
};

export default Category;
