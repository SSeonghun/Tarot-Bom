// components/ReaderRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../stores/store";

interface ReaderRouteProps {
  element: React.ReactNode;
}

const ReaderRoute: React.FC<ReaderRouteProps> = ({ element }) => {
  const location = useLocation();
  const { isLoggedIn, userInfo } = useUserStore();

  // 로그인 여부와 리더 권한 체크
  if (!isLoggedIn || !userInfo?.isReader) {
    // 로그인 하지 않았거나 리더가 아닌 경우, 접근 차단
    return <Navigate to="/error" state={{ from: location }} replace />;
  }

  // 리더 권한이 있는 경우, 요청한 컴포넌트 렌더링
  return <>{element}</>;
};

export default ReaderRoute;
