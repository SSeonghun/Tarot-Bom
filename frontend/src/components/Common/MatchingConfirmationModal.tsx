import React from "react";

// MatchData 정의
interface MatchData {
  data: {
    memberDto: {
      keyword: string;
      roomStyle: string;
      matchedTime: string;
      memberType: string;
      memberId: number;
      inConfirm: boolean;
      worry: string;
    };
    candidateDto: {
      keyword: string;
      roomStyle: string;
      matchedTime: string;
      memberType: string;
      memberId: number;
      inConfirm: boolean;
      worry: string;
    };
    status: string;
  };
}

// MatchingConfirmationModalProps 정의
interface MatchingConfirmationModalProps {
  isOpen: boolean;
  matchData: MatchData | null;
  onClose: () => void;
  onMatchConfirmed: (data: MatchData) => void;
}

const MatchingConfirmationModal: React.FC<MatchingConfirmationModalProps> = ({
  isOpen,
  matchData,
  onClose,
  onMatchConfirmed,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (matchData) {
      // matchData의 status를 'accepted'로 설정
      const updatedMatchData: MatchData = {
        ...matchData,
        data: {
          ...matchData.data,
          status: "accepted",
        },
      };

      onMatchConfirmed(updatedMatchData); // 수정된 데이터 전달
    }
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">매칭 완료!</h2>
        <p>매칭된 정보:</p>
        <pre>{JSON.stringify(matchData, null, 2)}</pre>
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
