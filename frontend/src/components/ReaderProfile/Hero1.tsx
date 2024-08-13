import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 임포트합니다.
import HoverButton from "../Common/HoverButton";
import ReaderProfile1 from "../../assets/img/ReaderProfile1.png";
import useStore from '../../stores/store';

interface Hero1Props {
  id: string;
  name: string;
  profileUrl: string;
  grade: string;
}

const { like, unlike, likeList } = require('../../API/userApi');

const Hero1: React.FC<Hero1Props> = ({ id, name, profileUrl, grade }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 생성합니다.
  const store = useStore();
  const userId = store.userInfo?.memberId;
  const [favoriteList, setFavoriteList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchData = await likeList();
        setFavoriteList(fetchData.data);
      } catch (error) {
        console.error("Failed to fetch favorite list", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleButtonClick = (id: string, name: string, profileUrl: string) => {
    console.log(id, "예약하기");
    navigate("/booking", { state: { id, name, profileUrl } });
  };

  const handleLikeClick = async () => {
    try {
      const isLiked = favoriteList.some(fav => fav.memberId === Number(id));
      if (isLiked) {
        // 이미 좋아요를 누른 상태이면 좋아요 해제
        await unlike(id);
        setFavoriteList(favoriteList.filter(fav => fav.memberId !== Number(id)));
      } else {
        // 좋아요를 누르지 않은 상태이면 좋아요 설정
        await like(id, userId);
        const newFavorite = { memberId: Number(id), name, profileUrl, grade }; // 필요한 정보만 임시로 추가
        setFavoriteList([...favoriteList, newFavorite]);
      }
    } catch (error) {
      console.error("Failed to toggle like status", error);
    }
  };

  // grade를 매핑하는 객체
  const gradeMapping: { [key: string]: string } = {
    C01: "새싹",
    C02: "중수",
    C03: "마스터",
  };

  // grade에 따라 표시할 텍스트를 결정
  const gradeText = gradeMapping[grade] || grade; // 매핑된 값이 없으면 원래 값 사용

  // 아이콘 URL 설정
  const likedIcon = "https://cdn3d.iconscout.com/3d/premium/thumb/like-11733116-9571546.png?f=webp";
  const notLikedIcon = "https://cdn3d.iconscout.com/3d/premium/thumb/like-3d-icon-download-in-png-blend-fbx-gltf-file-formats--finger-heart-love-followers-pack-network-communication-icons-10051556.png?f=webp";

  const isLiked = favoriteList.some(fav => fav.memberId === Number(id));

  return (
    <div className="relative bg-black bg-opacity-70">
      <img
        src={ReaderProfile1}
        alt="ReaderProfile1"
        className="object-cover w-full h-[400px] opacity-60 z-0"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="bg-black bg-opacity-50 p-2 rounded-full backdrop-filter backdrop-blur-sm">
          <img
            src={profileUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
        </div>
        <div className="flex flex-row items-end">
          <div className="w-auto h-10">{gradeText}</div>{" "}
          {/* 매핑된 텍스트 사용 */}
          <h1 className="text-5xl text-white mt-5 font-bold">{name}</h1>
        </div>
        <div className="flex">
          <p className="text-[15px] mt-3 text-white font-semibold mr-1">
            TAROT READER
          </p>

          {/* 조건부 렌더링으로 좋아요 아이콘 표시 */}
          {userId !== Number(id) && (
          <img
            src={isLiked ? likedIcon : notLikedIcon}
            alt={isLiked ? "좋아요" : "좋아요 눌러줘"}
            width={40}
            className="mt-1 cursor-pointer"
            onClick={handleLikeClick} // 아이콘 클릭 시 like/unlike 동작 처리
          />
        )}
        </div>
        <div className="mt-5">
          <HoverButton
            label="예약하기"
            color="bg-gray-300"
            hoverColor="bg-gray-500"
            hsize="h-12"
            wsize="w-48"
            fontsize="text-lg"
            onClick={() => handleButtonClick(id, name, profileUrl)} // 수정된 함수 호출
          />
        </div>
      </div>
    </div>
  );
};

export default Hero1;
