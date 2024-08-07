import React, { useEffect, useState } from 'react';



const { youtubeMusic } = require('../../API/api')
// props 타입 정의

interface MusicPlayerProps {
  width: number; // width
  height: number; // height
  searchQuery: string; // 검색 쿼리
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  width,
  height,
  searchQuery,
}) => {
  const [videoSrc, setVideoSrc] = useState<string>("");

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        // const videoData = await youtubeMusic(searchQuery); // searchQuery를 인자로 전달
        // setVideoSrc(videoData); // 비디오 URL을 상태로 설정
      } catch (error) {
        console.error("비디오 데이터 가져오기 실패:", error);
      }
    };

    fetchMusic();
  }, [searchQuery]); // searchQuery가 변경될 때마다 fetchMusic 호출

  return (
    // <iframe
    //   title="music"
    //   width={width} // props에서 받은 width 사용
    //   height={height} // props에서 받은 height 사용
    //   src={videoSrc} // 상태에서 가져온 비디오 URL
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //   allowFullScreen
    // ></iframe>
    <div></div>
  );
};

export default MusicPlayer;
