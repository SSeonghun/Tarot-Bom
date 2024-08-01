import React, { useState } from 'react';
import Select from '../Common/SelectMany'; // 경로 수정

const Category: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categoryOptions = ['연애운', '직장운', '재물운', '건강운', '가족운', '기타'];

  const handleSelect = (option: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((category) => category !== option)
        : [...prevSelected, option]
    );
  };

  return (
    <div className="mb-4">
      <h2 className="text-white text-lg mb-2">카테고리</h2>
      <Select options={categoryOptions} selectedOption={selectedCategories} onSelect={handleSelect} />
    </div>
  );
};

export default Category;
