// src/components/Common/LoadingModal.tsx

import React from 'react';

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">매칭 중...</h2>
        <p>잠시만 기다려 주세요.</p>
        {/* 여기에 로딩 애니메이션을 추가할 수 있습니다 */}
      </div>
    </div>
  );
};

export default LoadingModal;
