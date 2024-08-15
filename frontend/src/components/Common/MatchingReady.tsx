// src/components/Common/MatchingConfirmationModal.tsx

import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import Giphy from "../../assets/img/giphy.webp";

interface MatchingConfirmationModalProps {
  isOpen: boolean;
  matchData: any; // 실제 데이터 타입으로 변경 필요
  onClose: () => void;
}

const MatchingConfirmationModal: React.FC<MatchingConfirmationModalProps> = ({
  isOpen,
  matchData,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[400px] flex flex-col justify-center items-center z-[100]">
        <h2 className="text-[30px] font-bold mb-4 text-black">수락 완료!</h2>
        <img src={Giphy} alt="" className="w-[170px]" />
        <p className="mt-4">상대방의 확인을 기다리고 있습니다.</p>
      </div>
    </div>
  );
};

export default MatchingConfirmationModal;
