import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold"><Link to="/" className="text-white hover:text-gray-400">Home</Link></div>
        <div className="space-x-4">
          <Link to="/online" className="text-white hover:text-gray-400">온라인 타로</Link>
          <Link to="/offline" className="text-white hover:text-gray-400">오프라인 타로</Link>
          <Link to="/serch-reader" className="text-white hover:text-gray-400">리더 검색</Link>
          <Link to="/community" className="text-white hover:text-gray-400">커뮤니티</Link>
          <Link to="/SignIn">
            <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">
            SignIn
            </button>
          </Link>        </div>
      </div>
    </nav>
  );
}

export default Navbar;
