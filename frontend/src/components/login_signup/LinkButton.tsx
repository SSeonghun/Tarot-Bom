import React from 'react';
import { Link } from 'react-router-dom';

interface LinkButtonProps {
  to: string;
  text: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ to, text }) => {
  return (
    <Link to={to} className="block w-full">
      <button
        type="button"
        className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 focus:outline-none"
      >
        {text}
      </button>
    </Link>
  );
};

export default LinkButton;
