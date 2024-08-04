// PrivateLink.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../stores/store';

interface PrivateLinkProps {
  to: string;
  children: React.ReactNode;
}

const PrivateLink: React.FC<PrivateLinkProps> = ({ to, children }) => {
  const Store = useStore();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 링크 클릭 동작 방지
    if (Store.isLoggedIn) {
      navigate(to); // 로그인 상태일 때 해당 페이지로 이동
    } else {
      navigate('/login'); // 로그인되지 않았을 때 로그인 페이지로 이동
    }
  };

  return (
    <a href={to} onClick={handleClick} className="text-white hover:text-gray-400">
      {children}
    </a>
  );
};

export default PrivateLink;
