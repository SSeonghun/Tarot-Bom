import React from 'react';

interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 focus:outline-none"
    >
      {text}
    </button>
  );
};

export default SubmitButton;

