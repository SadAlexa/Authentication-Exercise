import { Navigate, Route, Routes, useNavigate } from "react-router";
import LoginPage from "../../presentation/pages/LoginPage";
import RegisterPage from "../../presentation/pages/RegisterPage";
import DashboardPage from "../../presentation/pages/DashboardPage";
import { useAuth } from "../hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRoutes = () => {
  const navigate = useNavigate();
  const user = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
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
          <ProtectedRoute user={user.isAuthenticated()}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
