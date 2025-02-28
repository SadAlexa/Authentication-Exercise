import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  user: boolean;
  redirectPath?: string;
  children: React.ReactNode;
};

export const ProtectedRoute = ({
  user,
  children,
  redirectPath,
}: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath || "/login"} replace />;
  }

  return children;
};
