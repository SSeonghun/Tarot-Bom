import React from "react";
import Comfirm from "../../assets/img/confirm.webp";
import CommonButton from "./CommonButton";

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
      <div className="bg-white p-4 rounded-lg shadow-lg w-[400px] flex flex-col justify-center items-center ">
        <h2 className="text-[30px] font-bold mb-4">매칭 완료!</h2>
        <img src={Comfirm} alt="" className="w-[170px] m-4" />
        <h1 className="text-[20px] font-bold"> 수락 버튼을 눌러주세요!</h1>
        <div className="mt-4">
          <CommonButton
            label="수락"
            color="bg-green-500"
            hoverColor="hover:bg-green-700"
            hsize="h-12"
            wsize="w-36"
            textColor="text-white"
            hoverTextColor="hover:text-white"
            rounded={true}
            fontsize="text-lg"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchingConfirmationModal;
