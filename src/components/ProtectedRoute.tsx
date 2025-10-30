import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Redirect to login, remembering where the user was trying to go
  // ✅ When authenticated, render nested routes via Outlet
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
