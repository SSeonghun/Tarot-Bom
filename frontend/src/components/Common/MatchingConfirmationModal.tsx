import React from "react";

interface MatchingConfirmationModalProps {
  isOpen: boolean;
  matchData: any; // 실제 데이터 타입으로 변경 필요
  onClose: () => void;
  onMatchConfirmed: (data: any) => void; // 매칭 확인 콜백 함수 추가
}

const MatchingConfirmationModal: React.FC<MatchingConfirmationModalProps> = ({
  isOpen,
  matchData,
  onClose,
  onMatchConfirmed,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onMatchConfirmed(matchData); // 매칭 확인 콜백 함수 호출
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">매칭 완료!</h2>
        <p>매칭된 정보:</p>
        <pre>{JSON.stringify(matchData, null, 2)}</pre>{" "}
        {/* 매칭된 정보를 적절히 포맷하여 표시 */}
        <button
          onClick={handleConfirm}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default MatchingConfirmationModal;
