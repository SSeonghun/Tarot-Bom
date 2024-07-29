// src/components/PlayTarot/Memo.tsx
import React, { useState } from 'react';

const Memo: React.FC = () => {
  const [memo, setMemo] = useState('');

  return (
    <div className="w-full p-4 bg-gray-700 bg-opacity-70 rounded-lg shadow-lg">
      <textarea
        className="w-full h-32 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="Write your memo here..."
      ></textarea>
    </div>
  );
};

export default Memo;
