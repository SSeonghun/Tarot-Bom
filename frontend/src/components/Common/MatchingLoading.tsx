// src/components/Common/LoadingModal.tsx

import React from 'react';
import HoverButton from './HoverButton';
import LoadingSpinner from './LoadingSpinner';
import CommonButton from './CommonButton';

import LoadingImg from '../../assets/img/loading1.webp';

interface LoadingModalProps {
  isOpen: boolean;
  onCancel: () => void; // onCancel prop 추가
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onCancel }) => {
  // onCancel prop 추가
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <h2 className="text-[30px] text-black font-bold mb-4">매칭 중</h2>
        {/* 여기에 로딩 애니메이션을 추가할 수 있습니다 */}
        <img src={LoadingImg} alt="" className="w-[130px] mt-4 rounded-lg" />
        <LoadingSpinner />
        <div className="justify-center items-center">
          <CommonButton
            label="매칭 취소"
            color="bg-gray-300"
            hoverColor="hover:bg-gray-400"
            hsize="h-12"
            wsize="w-48"
            fontsize="text-lg"
            onClick={onCancel} // 클릭 시 onCancel 호출
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
