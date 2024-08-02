import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 bg-transparent fixed top-0 left-0 w-full z-50">
      <div className="container flex items-center justify-between mx-auto">
        <div className="font-bold text-white">
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
        </div>
        <div className="space-x-4">
          <Link to="/booking" className="text-white hover:text-gray-400">타로예약</Link>
          <Link to="/tarot-result" className="text-white hover:text-gray-400">타로결과</Link>
          <Link to="/online" className="text-white hover:text-gray-400">온라인 타로</Link>
          <Link to="/offline" className="text-white hover:text-gray-400">오프라인 타로</Link>
          <Link to="/serch-reader" className="text-white hover:text-gray-400">리더 검색</Link>
          <Link to="/community" className="text-white hover:text-gray-400">커뮤니티</Link>
          <Link to="/login">
            <button className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
