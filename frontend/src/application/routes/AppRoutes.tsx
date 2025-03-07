import { Navigate, Route, Routes, useNavigate } from "react-router";
import LoginPage from "../../presentation/pages/LoginPage";
import RegisterPage from "../../presentation/pages/RegisterPage";
import DashboardPage from "../../presentation/pages/DashboardPage";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import { useEffect, useState } from "react";
import { User } from "../../domain/entities/User";

const AppRoutes = () => {
  const navigate = useNavigate();
  const { isAuthenticated, fetchUserData, token, logout } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchUserData(token || "")
        .then((data) => {
          if (data) {
            setUserData(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isAuthenticated, fetchUserData, token]);

  return (
    <AuthProvider>
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
            <ProtectedRoute user={isAuthenticated()}>
              <DashboardPage
                onClick={() => logout()}
                user={
                  userData || {
                    name: "Pippo",
                    surname: "Pippone",
                    email: "pippo@pippo.com",
                    password: "",
                  }
                }
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
