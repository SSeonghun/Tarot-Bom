import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">입장하시겠습니까?</h2>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="mr-4 px-4 py-2 bg-gray-300 text-black rounded-lg"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
