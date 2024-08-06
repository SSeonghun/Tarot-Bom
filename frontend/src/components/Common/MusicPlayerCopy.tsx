import React, { useState, useEffect } from "react";

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 1;
        });
      }, 1000); // update progress every second
    } else if (!isPlaying && progress !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // cleanup interval on component unmount
  }, [isPlaying]);

  return (
    <div className="rounded-lg drop-shadow p-4 dark:bg-black dark:shadow-white">
      <div className="flex items-center justify-center">
        <img
          className="rounded-lg aspect-square w-16"
          src="https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d5/37/f0/d537f0d1-5cfd-ce67-d7ac-0c4151f63f70/23UMGIM17915.rgb.jpg/1200x1200bb.jpg"
          alt="Album cover"
        />
        <div className="ml-4">
          <p className="font-semibold text-md text-gray-600">I ain't worried</p>
          <p className="font-semibold text-xs text-gray-600">One Republic</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-4">
        <div className="flex items-center w-full">
          <button
            onClick={handlePlayPause}
            className="ml-4 aspect-square me-3 bg-gray-300 flex justify-center items-center rounded-full p-2 shadow-lg dark:bg-gray-800"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path fill="#131313" d="M3 22h6V2H3v20zm12-20v20h6V2h-6z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#131313"
                  d="M133 440a35.37 35.37 0 0 1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0 1 35.77.45l247.85 148.36a36 36 0 0 1 0 61l-247.89 148.4A35.5 35.5 0 0 1 133 440"
                />
              </svg>
            )}
          </button>
          <input
            type="range"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="rounded-lg overflow-hidden appearance-none bg-gray-300 h-1 w-full custom-range"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
