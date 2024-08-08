// src/components/Common/LoadingModal.tsx

import React from "react";
import HoverButton from "./HoverButton";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingModalProps {
  isOpen: boolean;
  onCancel: () => void; // onCancel prop 추가
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onCancel }) => {
  // onCancel prop 추가
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">매칭 중...</h2>
        <p>잠시만 기다려 주세요.</p>
        {/* 여기에 로딩 애니메이션을 추가할 수 있습니다 */}

        <LoadingSpinner />

        <HoverButton
          label="매칭 취소"
          color="bg-gray-300"
          hoverColor="bg-gray-500"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
          onClick={onCancel} // 클릭 시 onCancel 호출
        />
      </div>
    </div>
  );
};

export default LoadingModal;
