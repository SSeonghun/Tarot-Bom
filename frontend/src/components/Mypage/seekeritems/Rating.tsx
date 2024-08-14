import React, { useState } from 'react';

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({ value, onChange }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={`${i}-full`}
          className={`relative cursor-pointer text-3xl ${value >= i ? 'text-red-500' : 'text-gray-300'}`}
        >
          &#9733;
          {value >= i - 0.5 && value < i && (
            <span
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: '50%' }}
            >
              <span className="text-red-500">&#9733;</span>
            </span>
          )}
        </span>
      );
    }
    return stars;
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="flex items-center">
      {renderStars()}
      <select
        className="ml-4 p-1 border border-gray-300 rounded"
        value={value}
        onChange={handleDropdownChange}
      >
        {[...Array(11)].map((_, i) => (
          <option key={i} value={i * 0.5}>
            {(i * 0.5).toFixed(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Rating;
