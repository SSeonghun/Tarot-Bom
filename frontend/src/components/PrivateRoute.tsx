// PrivateRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useStore from '../stores/store';

interface PrivateRouteProps {
  element: React.ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const Store = useStore();

  return (
    <Route
      path={path}
      element={Store.isLoggedIn ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
