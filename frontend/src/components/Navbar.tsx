import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <div className="font-bold text-white"><Link to="/" className="text-white hover:text-gray-400">Home</Link></div>
        <div className="space-x-4">
          <Link to="/online" className="text-white hover:text-gray-400">온라인 타로</Link>
          <Link to="/offline" className="text-white hover:text-gray-400">오프라인 타로</Link>
          <Link to="/serch-reader" className="text-white hover:text-gray-400">리더 검색</Link>
          <Link to="/community" className="text-white hover:text-gray-400">커뮤니티</Link>
          <Link to="/Login">
            <button className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700">
            LogIn
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
