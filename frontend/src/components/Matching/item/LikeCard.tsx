import React from 'react';

const LikeCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-2">
      <div className="bg-black text-center rounded-xl border shadow-lg p-4 w-40 h-40 bg-cover bg-center hover:scale-105 transition-transform duration-300">
        <img
          className="mb-2 w-15 h-15 rounded-full shadow-lg mx-auto"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt="popular reader"
        />
        <h1 className="text-sm text-white">John Doe</h1>
        <h3 className="text-[10px] text-gray-400">Creative Director</h3>
      </div>
    </div>
  );
};

export default LikeCard;
