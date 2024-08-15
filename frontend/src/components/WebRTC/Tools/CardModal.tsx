import React from 'react';

interface CardModalProps {
    isVisible: boolean;
    card: {
        id: number;
        name: string;
        detail: string;
        category: string[];
        imgUrl: string;
        hsize: string;
        wsize: string;
    } | null; // 카드 객체가 없을 수 있으므로 null 허용
    onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ isVisible, card, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
                <h2 className="text-2xl font-bold mb-2">{card?.name}</h2>
                <img src={card?.imgUrl} alt={card?.name} className="w-full h-auto mb-4" />
                <p className="text-gray-700 mb-4">{card?.detail}</p>
                <button 
                    className="bg-teal-500 text-white py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CardModal;
