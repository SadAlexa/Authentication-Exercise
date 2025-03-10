import { Navigate, Route, Routes, useNavigate } from "react-router";
import LoginPage from "../../presentation/pages/LoginPage";
import RegisterPage from "../../presentation/pages/RegisterPage";
import DashboardPage from "../../presentation/pages/DashboardPage";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <RoutesComponents />
    </AuthProvider>
  );
};

const RoutesComponents = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userData, logout } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="login"
        element={
          <LoginPage
            onSuccess={() => {
              navigate("/dashboard");
            }}
          />
        }
      />
      <Route
        path="register"
        element={
          <RegisterPage
            onSuccess={() => {
              navigate("/login");
            }}
          />
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute user={isLoggedIn}>
            <DashboardPage onClick={() => logout()} user={userData} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
