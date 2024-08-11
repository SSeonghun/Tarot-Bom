import React from 'react';

interface LikeCardProps {
  intro: string; // 소개 텍스트
  name: string; // 이름
  profileUrl: string; // 프로필 이미지 URL
}

const LikeCard: React.FC<LikeCardProps> = ({ intro, name, profileUrl }) => {
  return (
    <div className="flex items-center justify-center p-2">
      <div className="bg-black text-center rounded-xl border shadow-lg p-4 w-40 h-50 bg-cover bg-center hover:scale-105 transition-transform duration-300">
        <img
          className="mb-2 w-15 h-15 rounded-full shadow-lg mx-auto"
          src={profileUrl} // props로 받은 프로필 URL 사용
          alt={name} // 이름을 alt로 사용
        />
        <h1 className="text-sm text-white">{name}</h1> {/* props로 받은 이름 사용 */}
        <h3 className="text-[10px] text-gray-400">{intro}</h3>
        {/* props로 받은 intro를 표시 */}
      </div>
    </div>
  );
};

export default LikeCard;
