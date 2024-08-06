/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import MusicPlayer from '../components/Common/MusicPlayer';

const Offline: React.FC = () => {
  const width = 600; // 원하는 width 값
  const height = 150; // 원하는 height 값
  const searchQuery = "밤편지 아이유"; // 검색할 쿼리

  return (
    <div className='flex justify-center min-h-screen bg-gray-900'>
      <div className='my-auto mx-auto'>
        <MusicPlayer width={width} height={height} searchQuery={searchQuery} />
      </div>

    </div>
  );
}

export default Offline;
