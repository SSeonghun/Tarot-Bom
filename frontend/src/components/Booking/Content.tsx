import React from 'react';

const Content: React.FC = () => {
  return (
    <div className="mb-4">
      <h2 className="text-white text-lg mb-2">고민</h2>
      <textarea className="w-full p-2 rounded-lg text-gray-800" placeholder="상담할 내용을 적어주세요." rows={4}></textarea>
    </div>
  );
};

export default Content;
