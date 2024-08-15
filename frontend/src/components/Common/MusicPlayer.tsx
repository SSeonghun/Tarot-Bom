import React, { useEffect, useState, useRef } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';

const { youtubeMusic } = require('../../API/api');

interface MusicPlayerProps {
  width: number;
  height: number;
  searchQuery: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ width, height, searchQuery }) => {
  const [videoId, setVideoId] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        setLoading(true);
        const musicData = await youtubeMusic(searchQuery);
        const videoId = musicData.id.videoId;
        const thumbnail = musicData.snippet.thumbnails.default.url;
        const title = musicData.snippet.title;
  
        setVideoId(videoId);
        setThumbnail(thumbnail);
        setTitle(title);
      } catch (error) {
        console.error('비디오 데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [searchQuery]);

  useEffect(() => {
    if (isPlaying && playerRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(playerRef.current!.getCurrentTime());
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isPlaying]);

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      mute: 1,
    },
  };

  const onReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
    setDuration(playerRef.current.getDuration());
    setIsPlaying(true);

    // 0.5초 후에 음소거 해제 및 볼륨 설정
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.unMute();
        playerRef.current.setVolume(100); // 볼륨을 100으로 설정 (최대 볼륨)
      }
    }, 500);
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      const playerState = playerRef.current.getPlayerState();
      if (playerState === 1) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="music-player">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {videoId && (
            <YouTube videoId={videoId} opts={opts} onReady={onReady} style={{ display: 'none' }} />
          )}
          <div className="music-info flex items-center mt-5">
            <img src={thumbnail} alt="thumbnail" width={50} className='mr-3'/>
            <p className='text-xs'>{searchQuery}</p>
          </div>
          <div className="controls flex justify-center mt-2">
            <button onClick={handlePlayPause} className="play-pause-button">
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleTimeChange}
            />
            
            <div className="time-display ml-1">
              <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
