// components/AdminRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../stores/store";

interface AdminRouteProps {
  element: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  const location = useLocation();
  const { isLoggedIn, userInfo } = useUserStore();

  // 로그인 여부와 권한 체크
  if (!isLoggedIn || !userInfo?.isAdmin) {
    // 로그인 하지 않았거나 admin이 아닌 경우, 로그인 페이지로 리다이렉트
    return <Navigate to="/error" state={{ from: location }} replace />;
  }

  // admin 권한이 있는 경우, 요청한 컴포넌트 렌더링
  return <>{element}</>;
};

export default AdminRoute;
