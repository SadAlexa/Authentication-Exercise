import { Navigate, Route, Routes, useNavigate } from "react-router";
import LoginPage from "../../presentation/pages/LoginPage";
import RegisterPage from "../../presentation/pages/RegisterPage";
import DashboardPage from "../../presentation/pages/DashboardPage";

const AppRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* TODO: remove */}
      <Route path="/" element={<Navigate to="/register" replace />} />
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
      <Route path="dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default AppRoutes;
