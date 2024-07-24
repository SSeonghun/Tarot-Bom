import React from 'react';
import Categoryitem from './Categoryitem';

interface CategoryProps {
  items: { name: string }[];
}

const Category: React.FC<CategoryProps> = ({ items }) => {
  return (
    <nav className="rounded-md w-44 h-fit flex flex-col justify-between">
      <div className="h-fit">
        <div className="flex justify-center shadow-sm pr-4">
          <div className="pl-2">
            <p className="text-4xl font-bold text-indigo-300">READER</p>
            <span className="text-lg block text-center text-gray-400">CATEGORY</span>
          </div>
        </div>
        <div className="pl-10">
          <ul className="space-y-8 pt-10">
            {items.map((item, index) => (
              <Categoryitem key={index} name={item.name} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Category;
