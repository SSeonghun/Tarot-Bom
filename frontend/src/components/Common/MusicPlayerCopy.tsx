import React, { useState, useEffect } from "react";

interface Music {
  title: string;
}

const MusicPlayer: React.FC<Music> = ({ title }) => {

  // TODO : 뮤직 플레이어 이름 까지는 가져옴
  return (
    <div className="rounded-lg drop-shadow p-4 dark:bg-black dark:shadow-white">
      <div className="flex items-center justify-center">
        <div className="ml-4">
          <p className="font-semibold text-md text-gray-300">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
