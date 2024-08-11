import React, { useState } from "react";
import ConfirmationModal from "./Modal"; // Adjust the path as needed

const { deleteTarotshop } = require("../../../API/tarotShopApi");

interface DeleteProps {
  shopId: number | null; // Ensure this matches the type being passed
}

const Delete: React.FC<DeleteProps> = ({ shopId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (shopId === null) {
      alert("Invalid shop ID.");
      return;
    }

    try {
      await deleteTarotshop(shopId);
      alert("타로샵이 성공적으로 삭제되었습니다.");
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error("타로샵 삭제 실패:", error);
      alert("타로샵 삭제에 실패했습니다.");
    } finally {
      setIsModalOpen(false); // Close the modal
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleDeleteClick}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
        disabled={shopId === null} // Disable button if shopId is null
      >
        타로점 삭제하기
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="정말로 삭제하시겠습니까?"
      />
    </div>
  );
};

export default Delete;
