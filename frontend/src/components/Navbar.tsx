// Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PrivateLink from './Common/PrivateLink'; // PrivateLink 가져오기
import useStore from '../stores/store';





const Navbar: React.FC = () => {
 
  const navigate = useNavigate();
  const store = useStore();
  return (
    <nav className="p-4 bg-transparent fixed top-0 left-0 w-full z-50">
      <div className="container flex items-center justify-between mx-auto">
        <div className="font-bold text-white">
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
        </div>
        <div className="space-x-4">
          <PrivateLink to="/booking">타로예약</PrivateLink>
          <PrivateLink to="/tarot-result">타로결과</PrivateLink>
          <PrivateLink to="/online">온라인 타로</PrivateLink>
          <PrivateLink to="/offline">오프라인 타로</PrivateLink>
          <PrivateLink to="/serch-reader">리더 검색</PrivateLink>
          <PrivateLink to="/community">커뮤니티</PrivateLink>
          {store.isLoggedIn ? (<button
            onClick={() => {
              store.logoutUser(); // 로그아웃 함수 호출
                  navigate("/")
                  }}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-gray-700"
                >
                  로그아웃
                </button>) : (
              <Link to="/login">
              <button className="px-4 py-2 text-white bg-gray-900 rounded hover:bg-gray-700">
              Login
              </button>
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;






