// Navbar.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PrivateLink from './Common/PrivateLink'; // PrivateLink 가져오기
import useStore from '../stores/store';
import imgg from '../assets/Witch_On_Broom-removebg-preview.png';

// TODO : 홈 바꾸기

const { logout } = require('../API/userApi');

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const store = useStore();
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태

  const userInfo = store.userInfo;

  const handleLogout = async () => {
    try {
      const result = await logout();
      console.log("로그아웃 성공", result);
      store.logoutUser();
      navigate("/");

    } catch (error) {
      console.error("로그아웃 중 오류 발생", error);
    }
  };

  // 드롭다운 열기/닫기 함수
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
    console.log(userInfo?.nickname);
  };

  // 클릭 시 드롭다운 닫기
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (dropdownOpen && !target.closest('.dropdown')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // 문서에 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // 내 정보 클릭 시 드롭다운 닫기
  const handleMyPageClick = () => {
    setDropdownOpen(false);
    // navigate('/seeker-mypage'); // 내 정보 페이지로 이동
  };

  return (
    <nav className="p-4 bg-transparent fixed top-0 left-0 w-full z-50">
      <div className="container flex items-center justify-between mx-auto">
        <div className="font-bold text-white">
          <Link to="/" className="text-white hover:text-gray-400">
            타로 : 봄
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <PrivateLink to="/online">온라인 타로</PrivateLink>
          <PrivateLink to="/offline">오프라인 타로</PrivateLink>
          <PrivateLink to="/serch-reader">리더 검색</PrivateLink>
          <PrivateLink to="/community">커뮤니티</PrivateLink>

          {store.isLoggedIn ? (
            <div className="relative inline-block text-left dropdown">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <img src={userInfo?.profileImg} alt="마이페이지" style={{ width: '40px', height: '40px' }} className="cursor-pointer" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 w-48 mt-2 bg-gray-300 rounded-md shadow-lg">
                  <div className="flex items-center px-4 py-3">
                    <div>
                      <img src={userInfo?.profileImg} alt="마이페이지" style={{ width: '40px', height: '40px' }} className="cursor-pointer" />
                    </div>
                    <div className='flex flex-col'>
                      <span className="block text-xs text-gray-900 dark:text-white">{ userInfo?.nickname }</span>
                      <span className="block text-xs text-gray-500 truncate dark:text-gray-400">{ userInfo?.email }</span>
                    </div>
                  </div>
                  <hr className='border-black'></hr>
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link
                      to={`seeker-mypage?name=${encodeURIComponent(userInfo?.nickname || '')}&isReader=${userInfo?.isReader}`}
                      // to="/seeker-mypage"
                      onClick={handleMyPageClick} // 클릭 시 드롭다운 닫기
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    >
                      내 정보
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
