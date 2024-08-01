import React from 'react';

const Name: React.FC = () => {
  return (
    <div className="flex items-center mb-6">
      <img src="https://via.placeholder.com/50" alt="Profile" className="rounded-full mr-2" />
      <div>
        <h1 className="text-white text-2xl">김싸피</h1>
        <p className="text-gray-300">TAROT READER</p>
      </div>
    </div>
  );
};

export default Name;
