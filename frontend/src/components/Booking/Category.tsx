import React, { useState, useEffect } from "react";
import Select from "../Common/Select"; // 단일 선택을 위한 Select 컴포넌트

interface CategoryProps {
  onCategoryChange: (category: string | null) => void; // 선택된 카테고리를 부모에게 전달할 함수
}

const Category: React.FC<CategoryProps> = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categoryOptions = ["연애운", "진로운", "금전운", "건강운", "기타"];

  const handleSelect = (option: string) => {
    setSelectedCategory(option);
    onCategoryChange(option); // 선택된 카테고리를 부모에게 전달
  };

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 선택된 카테고리 초기값 전달
    onCategoryChange(selectedCategory);
  }, []); // 빈 배열은 이 effect가 처음 렌더링 시 한 번만 실행됨을 의미

  return (
    <div className="mb-4">
      <h2 className="text-white text-lg mb-2">카테고리</h2>
      <Select
        options={categoryOptions}
        selectedOption={selectedCategory} // 단일 선택을 위한 처리
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Category;
