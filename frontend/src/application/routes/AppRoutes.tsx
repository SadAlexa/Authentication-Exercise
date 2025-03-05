import { Navigate, Route, Routes, useNavigate } from "react-router";
import LoginPage from "../../presentation/pages/LoginPage";
import RegisterPage from "../../presentation/pages/RegisterPage";
import DashboardPage from "../../presentation/pages/DashboardPage";
import { useAuth } from "../hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import { useEffect, useState } from "react";
import { User } from "../../domain/entities/User";

const AppRoutes = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (user.isAuthenticated()) {
      user
        .fetchUserData(user.token || "")
        .then((data) => {
          if (data) {
            setUserData(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

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
            <DashboardPage
              onClick={() => user.logout()}
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
  );
};

export default AppRoutes;
